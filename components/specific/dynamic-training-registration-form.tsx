"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import {
  TrainingRegistrationForm,
  TrainingRegistrationFormField,
} from "@/types/sanity";

interface DynamicTrainingRegistrationFormProps {
  registrationForm: TrainingRegistrationForm;
}

// Create dynamic Zod schema based on form fields
const createDynamicSchema = (fields: TrainingRegistrationFormField[]) => {
  const schemaFields: Record<string, z.ZodTypeAny> = {};

  // All fields are dynamic
  fields.forEach((field) => {
    let fieldSchema: z.ZodTypeAny;

    switch (field.fieldType) {
      case "email":
        fieldSchema = z
          .string()
          .email(`Please enter a valid ${field.label.toLowerCase()}`);
        break;
      case "number":
        let numberSchema = z.number({
          required_error: `${field.label} is required`,
          invalid_type_error: `${field.label} must be a number`,
        });
        if (field.validation?.min !== undefined) {
          numberSchema = numberSchema.min(
            field.validation.min,
            `${field.label} must be at least ${field.validation.min}`
          );
        }
        if (field.validation?.max !== undefined) {
          numberSchema = numberSchema.max(
            field.validation.max,
            `${field.label} must be at most ${field.validation.max}`
          );
        }
        fieldSchema = numberSchema;
        break;
      case "select":
      case "radio":
        fieldSchema = z
          .string()
          .min(1, `Please select ${field.label.toLowerCase()}`);
        break;
      default:
        let stringSchema = z.string();
        if (field.validation?.minLength) {
          stringSchema = stringSchema.min(
            field.validation.minLength,
            `${field.label} must be at least ${field.validation.minLength} characters`
          );
        }
        if (field.validation?.maxLength) {
          stringSchema = stringSchema.max(
            field.validation.maxLength,
            `${field.label} must be at most ${field.validation.maxLength} characters`
          );
        }
        if (field.validation?.pattern) {
          stringSchema = stringSchema.regex(
            new RegExp(field.validation.pattern),
            field.validation.errorMessage || `${field.label} format is invalid`
          );
        }
        fieldSchema = stringSchema;
        break;
    }

    if (!field.required) {
      fieldSchema = fieldSchema.optional();
    } else {
      if (fieldSchema instanceof z.ZodString) {
        fieldSchema = fieldSchema.min(1, `${field.label} is required`);
      }
    }

    schemaFields[field.fieldName] = fieldSchema;
  });

  return z.object(schemaFields);
};

const DynamicTrainingRegistrationForm = ({
  registrationForm,
}: DynamicTrainingRegistrationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [dropdownStates, setDropdownStates] = useState<Record<string, boolean>>(
    {}
  );

  const dynamicSchema = createDynamicSchema(registrationForm.formFields);
  type FormData = z.infer<typeof dynamicSchema>;

  // Create default values for all dynamic fields
  const defaultValues: Partial<FormData> = {};

  registrationForm.formFields.forEach((field) => {
    if (field.fieldType === "number") {
      defaultValues[field.fieldName as keyof FormData] = 0 as any;
    } else {
      defaultValues[field.fieldName as keyof FormData] = "" as any;
    }
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(dynamicSchema),
    defaultValues,
  });

  const toggleDropdown = (fieldName: string) => {
    setDropdownStates((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  const closeAllDropdowns = () => {
    setDropdownStates({});
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(""); // Clear any previous errors

    try {
      // Extract required core fields from the dynamic data
      // Try to map common field name variations to core fields
      const dataAny = data as any;
      const coreFieldMapping = {
        firstName:
          dataAny.firstName ||
          dataAny.first_name ||
          dataAny.firstname ||
          dataAny.name ||
          "",
        lastName:
          dataAny.lastName ||
          dataAny.last_name ||
          dataAny.lastname ||
          dataAny.surname ||
          "",
        personalEmail:
          dataAny.personalEmail ||
          dataAny.personal_email ||
          dataAny.email ||
          dataAny.personal_email_address ||
          "",
        workEmail:
          dataAny.workEmail ||
          dataAny.work_email ||
          dataAny.business_email ||
          dataAny.company_email ||
          dataAny.personalEmail ||
          dataAny.personal_email ||
          dataAny.email ||
          "",
        phoneNumber:
          dataAny.phoneNumber ||
          dataAny.phone_number ||
          dataAny.phone ||
          dataAny.mobile ||
          dataAny.mobileNumber ||
          dataAny.mobile_number ||
          dataAny.contact ||
          dataAny.contactNumber ||
          dataAny.contact_number ||
          "",
        organization:
          dataAny.organization ||
          dataAny.company ||
          dataAny.employer ||
          dataAny.workplace ||
          dataAny.business ||
          "",
        jobRole:
          dataAny.jobRole ||
          dataAny.job_role ||
          dataAny.position ||
          dataAny.title ||
          dataAny.job_title ||
          dataAny.role ||
          "",
        yearsOfExperience: Number(
          dataAny.yearsOfExperience ||
            dataAny.years_of_experience ||
            dataAny.experience ||
            dataAny.years_experience ||
            dataAny.work_experience ||
            0
        ),
      };

      // Validate required IDs before submission
      if (!registrationForm._id || !registrationForm.training?._id) {
        console.error("Missing required form or training ID");
        throw new Error(
          "Registration form configuration error. Please contact support."
        );
      }

      const submissionData = {
        registrationFormId: registrationForm._id,
        trainingId: registrationForm.training._id,
        firstName: coreFieldMapping.firstName,
        lastName: coreFieldMapping.lastName,
        personalEmail: coreFieldMapping.personalEmail,
        workEmail: coreFieldMapping.workEmail,
        phoneNumber: coreFieldMapping.phoneNumber,
        organization: coreFieldMapping.organization,
        jobRole: coreFieldMapping.jobRole,
        yearsOfExperience: coreFieldMapping.yearsOfExperience,
        formData: data, // Send all form data
        metadata: {
          userAgent: navigator.userAgent,
          referrer: document.referrer,
        },
      };

      const response = await fetch("/api/training-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitSuccess(true);
        if (registrationForm.settings.redirectUrl) {
          setTimeout(() => {
            window.location.href = registrationForm.settings.redirectUrl!;
          }, 2000);
        }
      } else {
        throw new Error(result.error || "Submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);

      // Set error state instead of showing alert
      const errorMessage =
        error instanceof Error
          ? error.message
          : "There was an error submitting your registration. Please try again.";

      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: TrainingRegistrationFormField) => {
    const fieldValue = watch(field.fieldName as keyof FormData);
    const error = errors[field.fieldName as keyof FormData];

    const baseClasses = `w-full px-4 py-3 border rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200 ${
      error ? "border-red-500" : "border-gray-200"
    }`;

    switch (field.fieldType) {
      case "select":
        return (
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown(field.fieldName)}
              className={
                baseClasses + " text-left flex items-center justify-between"
              }
            >
              <span className={fieldValue ? "text-[#181D27]" : "text-gray-500"}>
                {fieldValue ||
                  field.placeholder ||
                  `Select ${field.label.toLowerCase()}`}
              </span>
              <ChevronDown size={16} className="text-gray-400" />
            </button>

            {dropdownStates[field.fieldName] && (
              <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {field.options?.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setValue(
                        field.fieldName as keyof FormData,
                        option as any
                      );
                      closeAllDropdowns();
                    }}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors duration-200"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        );

      case "textarea":
        return (
          <textarea
            {...register(field.fieldName as keyof FormData)}
            placeholder={field.placeholder}
            className={baseClasses}
            rows={4}
          />
        );

      case "radio":
        return (
          <div className="space-y-3">
            {field.options?.map((option) => (
              <label key={option} className="flex items-center">
                <input
                  {...register(field.fieldName as keyof FormData)}
                  type="radio"
                  value={option}
                  className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                />
                <span className="ml-2 text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      case "checkbox":
        return (
          <div className="space-y-3">
            {field.options?.map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="checkbox"
                  value={option}
                  className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                />
                <span className="ml-2 text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      case "number":
        return (
          <input
            {...register(field.fieldName as keyof FormData, {
              valueAsNumber: true,
            })}
            type="number"
            placeholder={field.placeholder}
            className={baseClasses}
            min={field.validation?.min}
            max={field.validation?.max}
          />
        );

      default:
        return (
          <input
            {...register(field.fieldName as keyof FormData)}
            type={field.fieldType}
            placeholder={field.placeholder}
            className={baseClasses}
          />
        );
    }
  };

  const getFieldWidth = (width: string) => {
    switch (width) {
      case "half":
        return "md:col-span-1";
      case "third":
        return "md:col-span-1 lg:col-span-1";
      case "two-thirds":
        return "md:col-span-2";
      default:
        return "md:col-span-2";
    }
  };

  if (submitSuccess) {
    return (
      <section className="py-16 lg:py-24 bg-slate-50 min-h-screen">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="text-2xl lg:text-3xl font-semibold text-[#181D27] mb-4">
                Registration Successful!
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                {registrationForm.settings.successMessage}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  // Sort fields by display order
  const sortedFields = [...registrationForm.formFields].sort(
    (a, b) => a.displayOrder - b.displayOrder
  );

  return (
    <section
      className="py-16 lg:py-24 bg-slate-50 min-h-screen"
      onClick={closeAllDropdowns}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-8 lg:p-12"
          >
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl lg:text-3xl font-semibold text-[#181D27] mb-2">
                {registrationForm.title}
              </h1>
              {registrationForm.description && (
                <p className="text-gray-600 text-lg leading-relaxed">
                  {registrationForm.description}
                </p>
              )}
            </div>

            {/* Error Message */}
            {submitError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
              >
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-red-600 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <h4 className="text-red-800 font-medium">
                      Registration Error
                    </h4>
                    <p className="text-red-700 text-sm mt-1">{submitError}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSubmitError("")}
                    className="ml-auto text-red-600 hover:text-red-800"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* All Fields are Dynamic */}

              {sortedFields.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sortedFields.map((field) => (
                    <div
                      key={field.fieldName}
                      className={getFieldWidth(field.width)}
                    >
                      <label className="block text-sm font-medium text-[#181D27] mb-2">
                        {field.label}{" "}
                        {field.required && (
                          <span className="text-orange-500">*</span>
                        )}
                      </label>
                      {renderField(field)}
                      {errors[field.fieldName as keyof FormData] && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors[
                            field.fieldName as keyof FormData
                          ]?.message?.toString()}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium text-lg mt-8"
              >
                {isSubmitting
                  ? "Processing..."
                  : registrationForm.settings.submitButtonText}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DynamicTrainingRegistrationForm;
