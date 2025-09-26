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
import {
  getHumanReadableServiceName,
  getHumanReadableHowDidYouHear,
} from "@/lib/email";

interface ContactSubmissionEmailProps {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  howDidYouHear: string;
  serviceInterested: string;
  message: string;
  agreeToPrivacy: boolean;
  submissionDate: string;
  submissionId?: string;
}

const ContactSubmissionEmail = ({
  firstName,
  lastName,
  email,
  phone,
  howDidYouHear,
  serviceInterested,
  message,
  agreeToPrivacy,
  submissionDate,
  submissionId,
}: ContactSubmissionEmailProps) => {
  const formattedDate = new Date(submissionDate).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });

  return (
    <Html>
      <Head />
      <Preview>
        New contact form submission from {firstName} {lastName} -{" "}
        {getHumanReadableServiceName(serviceInterested)}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={h1}>New Contact Form Submission</Heading>
            <Text style={headerSubtext}>
              A new contact form has been submitted on the Kimberly Ryan website
            </Text>
          </Section>

          {/* Contact Information */}
          <Section style={section}>
            <Heading style={h2}>Contact Information</Heading>
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
                <Text style={label}>Email:</Text>
              </Column>
              <Column style={valueColumn}>
                <Text style={value}>
                  <a href={`mailto:${email}`} style={link}>
                    {email}
                  </a>
                </Text>
              </Column>
            </Row>
            {phone && (
              <Row style={infoRow}>
                <Column style={labelColumn}>
                  <Text style={label}>Phone:</Text>
                </Column>
                <Column style={valueColumn}>
                  <Text style={value}>
                    <a href={`tel:${phone}`} style={link}>
                      {phone}
                    </a>
                  </Text>
                </Column>
              </Row>
            )}
          </Section>

          <Hr style={hr} />

          {/* Inquiry Details */}
          <Section style={section}>
            <Heading style={h2}>Inquiry Details</Heading>
            <Row style={infoRow}>
              <Column style={labelColumn}>
                <Text style={label}>Service Interested:</Text>
              </Column>
              <Column style={valueColumn}>
                <Text style={value}>
                  {getHumanReadableServiceName(serviceInterested)}
                </Text>
              </Column>
            </Row>
            <Row style={infoRow}>
              <Column style={labelColumn}>
                <Text style={label}>How did they hear about us:</Text>
              </Column>
              <Column style={valueColumn}>
                <Text style={value}>
                  {getHumanReadableHowDidYouHear(howDidYouHear)}
                </Text>
              </Column>
            </Row>
          </Section>

          <Hr style={hr} />

          {/* Message */}
          <Section style={section}>
            <Heading style={h2}>Message</Heading>
            <Text style={messageText}>{message}</Text>
          </Section>

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
            <Row style={infoRow}>
              <Column style={labelColumn}>
                <Text style={label}>Privacy Policy:</Text>
              </Column>
              <Column style={valueColumn}>
                <Text style={value}>
                  {agreeToPrivacy ? "Agreed" : "Not Agreed"}
                </Text>
              </Column>
            </Row>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              This email was automatically generated from the contact form
              submission on the Kimberly Ryan website.
            </Text>
            <Text style={footerText}>
              Please respond to this email to contact the submitter directly.
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
  backgroundColor: "#ea580c",
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
  color: "#fed7aa",
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

const link = {
  color: "#ea580c",
  textDecoration: "none",
};

const messageText = {
  color: "#181d27",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "0",
  padding: "16px",
  backgroundColor: "#f8fafc",
  borderRadius: "6px",
  border: "1px solid #e2e8f0",
  whiteSpace: "pre-wrap" as const,
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

export { ContactSubmissionEmail };
export default ContactSubmissionEmail;
