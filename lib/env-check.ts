/**
 * Environment Variables Validation
 *
 * This utility checks that all required environment variables are set
 * and provides helpful error messages if any are missing.
 */

interface EnvConfig {
  // Sanity
  NEXT_PUBLIC_SANITY_PROJECT_ID: string;
  NEXT_PUBLIC_SANITY_DATASET: string;
  SANITY_API_TOKEN: string;

  // Email
  RESEND_API_KEY: string;
  RESEND_FROM_EMAIL?: string;
  MARKETING_EMAIL?: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateEnvironment(): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required environment variables
  const requiredVars: (keyof EnvConfig)[] = [
    "NEXT_PUBLIC_SANITY_PROJECT_ID",
    "NEXT_PUBLIC_SANITY_DATASET",
    "SANITY_API_TOKEN",
    "RESEND_API_KEY",
  ];

  // Check required variables
  requiredVars.forEach((varName) => {
    const value = process.env[varName];
    if (!value || value.trim() === "") {
      errors.push(`Missing required environment variable: ${varName}`);
    } else if (value.includes("your_") || value.includes("_here")) {
      warnings.push(
        `Environment variable ${varName} appears to contain placeholder text`
      );
    }
  });

  // Additional validations
  if (
    process.env.NEXT_PUBLIC_SANITY_DATASET &&
    !["production", "development"].includes(
      process.env.NEXT_PUBLIC_SANITY_DATASET
    )
  ) {
    warnings.push(
      'NEXT_PUBLIC_SANITY_DATASET should typically be "production" or "development"'
    );
  }

  if (
    process.env.RESEND_API_KEY &&
    !process.env.RESEND_API_KEY.startsWith("re_")
  ) {
    warnings.push('RESEND_API_KEY should start with "re_"');
  }

  if (process.env.RESEND_FROM_EMAIL) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(process.env.RESEND_FROM_EMAIL)) {
      warnings.push("RESEND_FROM_EMAIL should be a valid email address");
    }
  }

  if (process.env.MARKETING_EMAIL) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(process.env.MARKETING_EMAIL)) {
      warnings.push("MARKETING_EMAIL should be a valid email address");
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

export function logEnvironmentStatus(): void {
  const result = validateEnvironment();

  console.log("🔍 Environment Validation Results:");

  if (result.isValid) {
    console.log("✅ All required environment variables are set");
  } else {
    console.log("❌ Environment validation failed:");
    result.errors.forEach((error) => console.log(`  - ${error}`));
  }

  if (result.warnings.length > 0) {
    console.log("⚠️  Warnings:");
    result.warnings.forEach((warning) => console.log(`  - ${warning}`));
  }

  // Email configuration check
  const emailRecipient =
    process.env.MARKETING_EMAIL || "krmarketing@kimberly-ryan.net";
  const fromEmail = process.env.RESEND_FROM_EMAIL || "info@kimberly-ryan.com";

  console.log(`📧 Email Configuration:`);
  console.log(`  - From: ${fromEmail}`);
  console.log(`  - To: ${emailRecipient}`);
  console.log(`  - Environment: ${process.env.NODE_ENV || "development"}`);

  console.log("");
}

// Auto-run when script is executed directly
if (require.main === module) {
  logEnvironmentStatus();
}
