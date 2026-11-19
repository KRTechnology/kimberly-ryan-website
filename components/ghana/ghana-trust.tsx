import { Quote } from "lucide-react";
import Image from "next/image";
import type { GhanaClientLogo, GhanaTestimonial } from "@/types/sanity";

const LOGO_PLACEHOLDERS = [0, 1, 2, 3, 4];

const LogoMark = ({ index }: { index: number }) => {
  const marks = [
    <circle key="a" cx="18" cy="18" r="9" />,
    <rect key="b" x="9" y="9" width="18" height="18" rx="3" />,
    <path key="c" d="M18 8l10 18H8L18 8z" />,
    <path key="d" d="M8 18a10 10 0 0120 0 10 10 0 01-20 0zm5 0a5 5 0 0010 0 5 5 0 00-10 0z" />,
    <path key="e" d="M9 26V10h10a8 8 0 010 16H9z" />,
  ];

  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
      className="text-[#A39C99]"
    >
      {marks[index % marks.length]}
    </svg>
  );
};

const ClientLogoImage = ({ logo }: { logo: GhanaClientLogo }) => {
  if (!logo.logoUrl) return null;

  const alt = logo.logoAlt?.trim() || `${logo.name} logo`;

  return (
    <Image
      src={logo.logoUrl}
      alt={alt}
      fill
      sizes="(min-width: 1024px) 200px, 40vw"
      className="object-contain"
    />
  );
};

const ClientLogoTile = ({ logo }: { logo: GhanaClientLogo }) => {
  if (!logo?.logoUrl) return null;

  const content = (
    <div className="relative flex h-12 w-full items-center justify-center">
      <ClientLogoImage logo={logo} />
    </div>
  );

  return (
    <li className="flex h-24 items-center justify-center rounded-md border border-[#D5D7DA] bg-white px-6">
      {logo.websiteUrl ? (
        <a
          href={logo.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex h-12 w-full items-center justify-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB821D] focus-visible:ring-offset-4 focus-visible:ring-offset-white"
          aria-label={`${logo.name} (opens in a new tab)`}
        >
          {content}
        </a>
      ) : (
        content
      )}
    </li>
  );
};

interface GhanaTrustProps {
  clientLogos?: GhanaClientLogo[] | null;
  testimonial?: GhanaTestimonial | null;
}

const GhanaTrust = ({ clientLogos, testimonial }: GhanaTrustProps) => {
  const logos = (clientLogos ?? []).filter((logo) => logo?.logoUrl);
  const hasLogos = logos.length > 0;

  const hasTestimonial = Boolean(
    testimonial?.quote?.trim() && testimonial?.author?.trim()
  );
  // A testimonial that exists but is switched off disappears entirely, rather
  // than falling back to placeholder copy.
  const hiddenTestimonial = testimonial != null && testimonial.active === false;

  const attribution = hasTestimonial
    ? [testimonial?.author, testimonial?.position, testimonial?.company]
        .map((part) => part?.trim())
        .filter(Boolean)
        .join(", ")
    : "";

  return (
    <section className="border-y border-[#D5D7DA] bg-[#EDECEB] py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#535862]">
              Our clients
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-[#181D27] sm:text-4xl">
              Trusted by organisations across Africa
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-[#535862] md:text-right">
            Client names and logos are shown with permission.
          </p>
        </div>

        {hasLogos ? (
          <ul
            className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
            aria-label="Clients we work with"
          >
            {logos.map((logo) => (
              <ClientLogoTile
                key={logo._key ?? logo.name}
                logo={logo}
              />
            ))}
          </ul>
        ) : (
          <ul
            className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
            aria-label="Client logo placeholders"
          >
            {LOGO_PLACEHOLDERS.map((index) => (
              <li
                key={index}
                className="flex h-24 items-center justify-center gap-2.5 rounded-md border border-dashed border-[#C8C3C1] bg-white px-4"
                aria-label="Client logo placeholder"
              >
                <LogoMark index={index} />
                <span className="text-xs font-medium uppercase tracking-[0.14em] text-[#535862]">
                  Client logo
                </span>
              </li>
            ))}
          </ul>
        )}

        {!hiddenTestimonial && (
          <figure className="mt-10 grid gap-5 rounded-2xl bg-[#373433] p-6 sm:p-8 md:grid-cols-[auto_1fr] md:items-start md:gap-7">
            <Quote
              size={34}
              className="text-[#EB821D]"
              aria-hidden="true"
              strokeWidth={1.4}
            />
            <div>
              <blockquote className="text-lg leading-relaxed text-[#EDECEB] sm:text-xl">
                {hasTestimonial
                  ? `“${testimonial?.quote?.trim()}”`
                  : "“Add a short testimonial from a Ghana client here, describing the difference our team made to their organisation.”"}
              </blockquote>
              {hasTestimonial ? (
                <figcaption className="mt-4 text-sm font-medium text-[#C8C3C1]">
                  {attribution}
                </figcaption>
              ) : (
                <figcaption className="mt-4 text-sm font-medium text-[#C8C3C1]">
                  Client name, role, company
                  <span className="ml-2 rounded-sm bg-white/10 px-2 py-0.5 text-[11px] uppercase tracking-wide text-[#EDECEB]">
                    To be confirmed
                  </span>
                </figcaption>
              )}
            </div>
          </figure>
        )}
      </div>
    </section>
  );
};

export default GhanaTrust;
