import { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity";
import { TrainingRegistrationForm } from "@/types/sanity";
import DynamicTrainingRegistrationForm from "@/components/specific/dynamic-training-registration-form";

interface TrainingRegistrationPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Enable ISR - revalidate every 300 seconds (5 minutes)
export const revalidate = 300;

async function getRegistrationForm(
  slug: string
): Promise<TrainingRegistrationForm | null> {
  const query = `
    *[_type == "trainingRegistrationForm" && slug.current == $slug && active == true][0] {
      _id,
      title,
      slug,
      description,
      training-> {
        _id,
        title,
        slug,
        subtitle
      },
      formFields[] {
        fieldName,
        label,
        fieldType,
        placeholder,
        required,
        options,
        validation {
          minLength,
          maxLength,
          min,
          max,
          pattern,
          errorMessage
        },
        displayOrder,
        width
      },
      settings {
        submitButtonText,
        successMessage,
        redirectUrl,
        notificationEmail
      },
      active,
      publishedAt,
      expiresAt,
      maxSubmissions
    }
  `;

  try {
    const registrationForm = await client.fetch<TrainingRegistrationForm>(
      query,
      { slug }
    );

    // Check if form has expired
    if (
      registrationForm?.expiresAt &&
      new Date(registrationForm.expiresAt) < new Date()
    ) {
      return null;
    }

    return registrationForm;
  } catch (error) {
    console.error("Error fetching registration form:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: TrainingRegistrationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const registrationForm = await getRegistrationForm(slug);

  if (!registrationForm) {
    return {
      title: "Registration Form Not Found",
      description: "The requested registration form could not be found.",
    };
  }

  return {
    title: `${registrationForm.title} - Registration`,
    description:
      registrationForm.description ||
      `Register for ${registrationForm.training.title}`,
    openGraph: {
      title: `${registrationForm.title} - Registration`,
      description:
        registrationForm.description ||
        `Register for ${registrationForm.training.title}`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${registrationForm.title} - Registration`,
      description:
        registrationForm.description ||
        `Register for ${registrationForm.training.title}`,
    },
  };
}

export default async function TrainingRegistrationPage({
  params,
}: TrainingRegistrationPageProps) {
  const { slug } = await params;
  const registrationForm = await getRegistrationForm(slug);

  if (!registrationForm) {
    notFound();
  }

  return (
    <DynamicTrainingRegistrationForm registrationForm={registrationForm} />
  );
}

// Generate static params for known registration forms
export async function generateStaticParams() {
  const query = `
    *[_type == "trainingRegistrationForm" && active == true] {
      "slug": slug.current
    }
  `;

  try {
    const registrationForms = await client.fetch<{ slug: string }[]>(query);

    return registrationForms.map((form) => ({
      slug: form.slug,
    }));
  } catch (error) {
    console.error(
      "Error generating static params for registration forms:",
      error
    );
    return [];
  }
}
