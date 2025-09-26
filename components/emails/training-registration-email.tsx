import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
  Row,
  Column,
} from "@react-email/components";
import { formatFormDataForEmail } from "@/lib/email";

interface TrainingRegistrationEmailProps {
  firstName: string;
  lastName: string;
  personalEmail: string;
  workEmail: string;
  phoneNumber?: string;
  organization?: string;
  jobRole: string;
  yearsOfExperience: number;
  formData: Record<string, any>;
  formFields: Array<{
    fieldName: string;
    label: string;
    fieldType: string;
    required: boolean;
  }>;
  trainingTitle: string;
  registrationFormTitle: string;
  submissionDate: string;
  submissionId?: string;
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
}

const TrainingRegistrationEmail = ({
  firstName,
  lastName,
  personalEmail,
  workEmail,
  phoneNumber,
  organization,
  jobRole,
  yearsOfExperience,
  formData,
  formFields,
  trainingTitle,
  registrationFormTitle,
  submissionDate,
  submissionId,
  ipAddress,
  userAgent,
  referrer,
}: TrainingRegistrationEmailProps) => {
  const formattedDate = new Date(submissionDate).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });

  const formattedFormData = formatFormDataForEmail(formData, formFields);
  const primaryEmail = workEmail || personalEmail;

  return (
    <Html>
      <Head />
      <Preview>
        New training registration for {trainingTitle} - {firstName} {lastName}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={h1}>New Training Registration</Heading>
            <Text style={headerSubtext}>
              Someone has registered for training on the Kimberly Ryan website
            </Text>
          </Section>

          {/* Training Information */}
          <Section style={section}>
            <Heading style={h2}>Training Information</Heading>
            <Row style={infoRow}>
              <Column style={labelColumn}>
                <Text style={label}>Training Program:</Text>
              </Column>
              <Column style={valueColumn}>
                <Text style={value}>{trainingTitle}</Text>
              </Column>
            </Row>
            <Row style={infoRow}>
              <Column style={labelColumn}>
                <Text style={label}>Registration Form:</Text>
              </Column>
              <Column style={valueColumn}>
                <Text style={value}>{registrationFormTitle}</Text>
              </Column>
            </Row>
          </Section>

          <Hr style={hr} />

          {/* Registrant Information */}
          <Section style={section}>
            <Heading style={h2}>Registrant Information</Heading>
            <Row style={infoRow}>
              <Column style={labelColumn}>
                <Text style={label}>Name:</Text>
              </Column>
              <Column style={valueColumn}>
                <Text style={value}>
                  {firstName} {lastName}
                </Text>
              </Column>
            </Row>
            <Row style={infoRow}>
              <Column style={labelColumn}>
                <Text style={label}>Primary Email:</Text>
              </Column>
              <Column style={valueColumn}>
                <Text style={value}>
                  <a href={`mailto:${primaryEmail}`} style={link}>
                    {primaryEmail}
                  </a>
                </Text>
              </Column>
            </Row>
            {workEmail && workEmail !== personalEmail && (
              <Row style={infoRow}>
                <Column style={labelColumn}>
                  <Text style={label}>Work Email:</Text>
                </Column>
                <Column style={valueColumn}>
                  <Text style={value}>
                    <a href={`mailto:${workEmail}`} style={link}>
                      {workEmail}
                    </a>
                  </Text>
                </Column>
              </Row>
            )}
            {personalEmail && personalEmail !== workEmail && (
              <Row style={infoRow}>
                <Column style={labelColumn}>
                  <Text style={label}>Personal Email:</Text>
                </Column>
                <Column style={valueColumn}>
                  <Text style={value}>
                    <a href={`mailto:${personalEmail}`} style={link}>
                      {personalEmail}
                    </a>
                  </Text>
                </Column>
              </Row>
            )}
            {phoneNumber && (
              <Row style={infoRow}>
                <Column style={labelColumn}>
                  <Text style={label}>Phone:</Text>
                </Column>
                <Column style={valueColumn}>
                  <Text style={value}>
                    <a href={`tel:${phoneNumber}`} style={link}>
                      {phoneNumber}
                    </a>
                  </Text>
                </Column>
              </Row>
            )}
            {organization && (
              <Row style={infoRow}>
                <Column style={labelColumn}>
                  <Text style={label}>Organization:</Text>
                </Column>
                <Column style={valueColumn}>
                  <Text style={value}>{organization}</Text>
                </Column>
              </Row>
            )}
            <Row style={infoRow}>
              <Column style={labelColumn}>
                <Text style={label}>Job Role:</Text>
              </Column>
              <Column style={valueColumn}>
                <Text style={value}>{jobRole}</Text>
              </Column>
            </Row>
            <Row style={infoRow}>
              <Column style={labelColumn}>
                <Text style={label}>Years of Experience:</Text>
              </Column>
              <Column style={valueColumn}>
                <Text style={value}>{yearsOfExperience} years</Text>
              </Column>
            </Row>
          </Section>

          {/* Form Responses */}
          {formattedFormData.length > 0 && (
            <>
              <Hr style={hr} />
              <Section style={section}>
                <Heading style={h2}>Form Responses</Heading>
                {formattedFormData.map((item, index) => (
                  <Row key={index} style={infoRow}>
                    <Column style={labelColumn}>
                      <Text style={label}>{item.label}:</Text>
                    </Column>
                    <Column style={valueColumn}>
                      {item.fieldType === "textarea" ? (
                        <Text style={textareaValue}>{item.value}</Text>
                      ) : (
                        <Text style={value}>{item.value}</Text>
                      )}
                    </Column>
                  </Row>
                ))}
              </Section>
            </>
          )}

          <Hr style={hr} />

          {/* Submission Details */}
          <Section style={section}>
            <Heading style={h2}>Submission Details</Heading>
            <Row style={infoRow}>
              <Column style={labelColumn}>
                <Text style={label}>Submission Date:</Text>
              </Column>
              <Column style={valueColumn}>
                <Text style={value}>{formattedDate}</Text>
              </Column>
            </Row>
            {submissionId && (
              <Row style={infoRow}>
                <Column style={labelColumn}>
                  <Text style={label}>Submission ID:</Text>
                </Column>
                <Column style={valueColumn}>
                  <Text style={value}>{submissionId}</Text>
                </Column>
              </Row>
            )}
            {ipAddress && ipAddress !== "unknown" && (
              <Row style={infoRow}>
                <Column style={labelColumn}>
                  <Text style={label}>IP Address:</Text>
                </Column>
                <Column style={valueColumn}>
                  <Text style={value}>{ipAddress}</Text>
                </Column>
              </Row>
            )}
            {referrer && (
              <Row style={infoRow}>
                <Column style={labelColumn}>
                  <Text style={label}>Referrer:</Text>
                </Column>
                <Column style={valueColumn}>
                  <Text style={value}>{referrer}</Text>
                </Column>
              </Row>
            )}
          </Section>

          {/* Technical Details (Collapsible-like section) */}
          {userAgent && (
            <>
              <Hr style={hr} />
              <Section style={section}>
                <Heading style={h2}>Technical Information</Heading>
                <Row style={infoRow}>
                  <Column style={labelColumn}>
                    <Text style={label}>User Agent:</Text>
                  </Column>
                  <Column style={valueColumn}>
                    <Text style={technicalValue}>{userAgent}</Text>
                  </Column>
                </Row>
              </Section>
            </>
          )}

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              This email was automatically generated from a training
              registration submission on the Kimberly Ryan website.
            </Text>
            <Text style={footerText}>
              Please respond to this email to contact the registrant directly.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "600px",
};

const header = {
  padding: "32px 24px",
  backgroundColor: "#7c3aed",
  textAlign: "center" as const,
};

const h1 = {
  color: "#ffffff",
  fontSize: "28px",
  fontWeight: "bold",
  margin: "0 0 8px",
  lineHeight: "1.3",
};

const headerSubtext = {
  color: "#ddd6fe",
  fontSize: "16px",
  lineHeight: "1.4",
  margin: "0",
};

const section = {
  padding: "24px",
};

const h2 = {
  color: "#181d27",
  fontSize: "20px",
  fontWeight: "600",
  margin: "0 0 16px",
};

const infoRow = {
  marginBottom: "12px",
};

const labelColumn = {
  width: "140px",
  verticalAlign: "top" as const,
};

const valueColumn = {
  verticalAlign: "top" as const,
};

const label = {
  color: "#6b7280",
  fontSize: "14px",
  fontWeight: "500",
  margin: "0",
  lineHeight: "1.4",
};

const value = {
  color: "#181d27",
  fontSize: "14px",
  margin: "0",
  lineHeight: "1.4",
};

const textareaValue = {
  color: "#181d27",
  fontSize: "14px",
  margin: "0",
  lineHeight: "1.5",
  padding: "8px",
  backgroundColor: "#f8fafc",
  borderRadius: "4px",
  border: "1px solid #e2e8f0",
  whiteSpace: "pre-wrap" as const,
};

const technicalValue = {
  color: "#6b7280",
  fontSize: "12px",
  margin: "0",
  lineHeight: "1.4",
  fontFamily: "monospace",
  wordBreak: "break-all" as const,
};

const link = {
  color: "#7c3aed",
  textDecoration: "none",
};

const hr = {
  borderColor: "#e6e6e6",
  margin: "20px 0",
};

const footer = {
  padding: "24px",
  backgroundColor: "#f8fafc",
  borderTop: "1px solid #e2e8f0",
};

const footerText = {
  color: "#6b7280",
  fontSize: "12px",
  lineHeight: "1.4",
  margin: "0 0 8px",
  textAlign: "center" as const,
};

export { TrainingRegistrationEmail };
export default TrainingRegistrationEmail;
