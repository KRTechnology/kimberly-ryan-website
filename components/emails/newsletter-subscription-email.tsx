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
import { getHumanReadableSourceName } from "@/lib/email";

interface NewsletterSubscriptionEmailProps {
  email: string;
  source: string;
  subscriptionDate: string;
  subscriptionId?: string;
  status: string;
  isReactivation?: boolean;
}

const NewsletterSubscriptionEmail = ({
  email,
  source,
  subscriptionDate,
  subscriptionId,
  status,
  isReactivation = false,
}: NewsletterSubscriptionEmailProps) => {
  const formattedDate = new Date(subscriptionDate).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });

  const actionText = isReactivation ? "reactivated their" : "subscribed to the";

  return (
    <Html>
      <Head />
      <Preview>
        Newsletter subscription {isReactivation ? "reactivated" : "added"} -{" "}
        {email}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={h1}>
              Newsletter Subscription {isReactivation ? "Reactivated" : "Added"}
            </Heading>
            <Text style={headerSubtext}>
              Someone has {actionText} newsletter subscription on the Kimberly
              Ryan website
            </Text>
          </Section>

          {/* Subscription Information */}
          <Section style={section}>
            <Heading style={h2}>Subscription Details</Heading>
            <Row style={infoRow}>
              <Column style={labelColumn}>
                <Text style={label}>Email Address:</Text>
              </Column>
              <Column style={valueColumn}>
                <Text style={value}>
                  <a href={`mailto:${email}`} style={link}>
                    {email}
                  </a>
                </Text>
              </Column>
            </Row>
            <Row style={infoRow}>
              <Column style={labelColumn}>
                <Text style={label}>Source:</Text>
              </Column>
              <Column style={valueColumn}>
                <Text style={value}>{getHumanReadableSourceName(source)}</Text>
              </Column>
            </Row>
            <Row style={infoRow}>
              <Column style={labelColumn}>
                <Text style={label}>Status:</Text>
              </Column>
              <Column style={valueColumn}>
                <Text style={value}>
                  <span
                    style={{
                      ...statusBadge,
                      backgroundColor:
                        status === "active" ? "#dcfce7" : "#fef3c7",
                      color: status === "active" ? "#166534" : "#92400e",
                    }}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                </Text>
              </Column>
            </Row>
            <Row style={infoRow}>
              <Column style={labelColumn}>
                <Text style={label}>Action Type:</Text>
              </Column>
              <Column style={valueColumn}>
                <Text style={value}>
                  {isReactivation ? "Reactivation" : "New Subscription"}
                </Text>
              </Column>
            </Row>
          </Section>

          <Hr style={hr} />

          {/* Timestamp and ID */}
          <Section style={section}>
            <Heading style={h2}>Submission Information</Heading>
            <Row style={infoRow}>
              <Column style={labelColumn}>
                <Text style={label}>Subscription Date:</Text>
              </Column>
              <Column style={valueColumn}>
                <Text style={value}>{formattedDate}</Text>
              </Column>
            </Row>
            {subscriptionId && (
              <Row style={infoRow}>
                <Column style={labelColumn}>
                  <Text style={label}>Subscription ID:</Text>
                </Column>
                <Column style={valueColumn}>
                  <Text style={value}>{subscriptionId}</Text>
                </Column>
              </Row>
            )}
          </Section>

          {/* Additional Information */}
          {isReactivation && (
            <>
              <Hr style={hr} />
              <Section style={section}>
                <Heading style={h2}>Reactivation Notice</Heading>
                <Text style={messageText}>
                  This email address was previously subscribed to the newsletter
                  and has now been reactivated. The subscriber will now receive
                  future newsletter communications.
                </Text>
              </Section>
            </>
          )}

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              This email was automatically generated from a newsletter
              subscription on the Kimberly Ryan website.
            </Text>
            <Text style={footerText}>
              The subscriber will be added to your newsletter mailing list and
              will receive future communications.
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
  backgroundColor: "#059669",
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
  color: "#a7f3d0",
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
  color: "#059669",
  textDecoration: "none",
};

const statusBadge = {
  padding: "4px 8px",
  borderRadius: "4px",
  fontSize: "12px",
  fontWeight: "500",
  display: "inline-block",
};

const messageText = {
  color: "#181d27",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "0",
  padding: "16px",
  backgroundColor: "#f0f9ff",
  borderRadius: "6px",
  border: "1px solid #0ea5e9",
  borderLeft: "4px solid #0ea5e9",
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

export { NewsletterSubscriptionEmail };
export default NewsletterSubscriptionEmail;
