import { NextRequest, NextResponse } from "next/server";
import { client, adminClient } from "@/lib/sanity";
import { TrainingRegistrationFormResponse } from "@/types/sanity";
import { EmailService } from "@/lib/email";

interface TrainingRegistrationFormData {
  registrationFormId: string;
  trainingId: string;
  firstName?: string;
  lastName?: string;
  personalEmail?: string;
  workEmail?: string;
  phoneNumber?: string;
  organization?: string;
  jobRole?: string;
  yearsOfExperience?: number;
  formData: Record<string, any>;
  metadata?: {
    ipAddress?: string;
    userAgent?: string;
    referrer?: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: TrainingRegistrationFormData = await request.json();

    // Validate required system fields
    const requiredSystemFields = ["registrationFormId", "trainingId"];

    const missingSystemFields = requiredSystemFields.filter(
      (field) => !(body as any)[field]
    );
    if (missingSystemFields.length > 0) {
      return NextResponse.json(
        {
          error: "Missing required system fields",
          missingFields: missingSystemFields,
        },
        { status: 400 }
      );
    }

    // Validate email formats if provided
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (body.personalEmail && !emailRegex.test(body.personalEmail)) {
      return NextResponse.json(
        { error: "Invalid personal email format" },
        { status: 400 }
      );
    }
    if (body.workEmail && !emailRegex.test(body.workEmail)) {
      return NextResponse.json(
        { error: "Invalid work email format" },
        { status: 400 }
      );
    }

    // Get client IP and user agent
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ipAddress =
      forwardedFor?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";
    const referrer = request.headers.get("referer") || "";

    // Fetch the registration form to get field definitions
    const registrationForm = await client.fetch(
      `
      *[_type == "trainingRegistrationForm" && _id == $formId][0] {
        _id,
        title,
        formFields[] {
          fieldName,
          label,
          fieldType,
          required
        },
        settings {
          notificationEmail
        },
        training-> {
          _id,
          title
        }
      }
    `,
      { formId: body.registrationFormId }
    );

    if (!registrationForm) {
      return NextResponse.json(
        { error: "Registration form not found" },
        { status: 404 }
      );
    }

    // Validate required form fields
    const requiredFormFields = registrationForm.formFields
      .filter((field: any) => field.required)
      .map((field: any) => field.fieldName);

    const missingFormFields = requiredFormFields.filter(
      (fieldName: string) => !body.formData[fieldName]
    );

    if (missingFormFields.length > 0) {
      return NextResponse.json(
        {
          error: "Missing required form fields",
          missingFormFields,
        },
        { status: 400 }
      );
    }

    // Convert form data to the expected format with unique _key for each item
    const responses: (TrainingRegistrationFormResponse & { _key: string })[] =
      Object.entries(body.formData).map(([fieldName, value], index) => {
        const fieldDef = registrationForm.formFields.find(
          (f: any) => f.fieldName === fieldName
        );
        return {
          _key: `${fieldName}_${Date.now()}_${index}`, // Generate unique key
          fieldName,
          fieldLabel: fieldDef?.label || fieldName,
          value: String(value),
          fieldType: fieldDef?.fieldType || "text",
        };
      });

    // Create the submission document
    const submissionDoc = {
      _type: "trainingRegistrationSubmission",
      registrationForm: {
        _type: "reference",
        _ref: body.registrationFormId,
      },
      training: {
        _type: "reference",
        _ref: body.trainingId,
      },
      firstName: body.firstName || "",
      lastName: body.lastName || "",
      personalEmail: body.personalEmail || "",
      workEmail: body.workEmail || body.personalEmail || "",
      phoneNumber: body.phoneNumber || "",
      organization: body.organization || "",
      jobRole: body.jobRole || "",
      yearsOfExperience: body.yearsOfExperience || 0,
      formData: {
        responses,
      },
      submissionDate: new Date().toISOString(),
      status: "new",
      source: "website",
      ipAddress: body.metadata?.ipAddress || ipAddress,
      userAgent: body.metadata?.userAgent || userAgent,
      referrer: body.metadata?.referrer || referrer,
      primaryContact:
        body.workEmail || body.personalEmail ? "work_email" : "personal_email",
      priority: "normal",
    };

    // Save to Sanity using admin client with write permissions
    const result = await adminClient.create(submissionDoc);

    // Send email notification
    try {
      await EmailService.sendTrainingRegistrationNotification({
        firstName: body.firstName || "",
        lastName: body.lastName || "",
        personalEmail: body.personalEmail || "",
        workEmail: body.workEmail || body.personalEmail || "",
        phoneNumber: body.phoneNumber,
        organization: body.organization,
        jobRole: body.jobRole || "",
        yearsOfExperience: body.yearsOfExperience || 0,
        formData: body.formData,
        formFields: registrationForm.formFields,
        trainingTitle: registrationForm.training.title,
        registrationFormTitle: registrationForm.title,
        submissionDate: new Date().toISOString(),
        submissionId: result._id,
        ipAddress: ipAddress,
        userAgent: userAgent,
        referrer: referrer,
      });
    } catch (emailError) {
      // Log email error but don't fail the API call
      console.error(
        "Failed to send training registration email notification:",
        emailError
      );
    }

    return NextResponse.json(
      {
        success: true,
        submissionId: result._id,
        message: "Registration submitted successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Training registration submission error:", error);

    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Failed to submit registration. Please try again.",
      },
      { status: 500 }
    );
  }
}

// Handle CORS preflight
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
