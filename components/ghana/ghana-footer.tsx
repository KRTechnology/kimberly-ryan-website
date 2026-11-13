import { Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  GHANA_ADDRESS,
  GHANA_EMAIL,
  GHANA_PHONE_DISPLAY,
  GHANA_PHONE_TEL,
  GHANA_SERVICES,
  MAIN_SITE_URL,
} from "./constants";

const GhanaFooter = () => {
  return (
    <footer className="bg-[#1B0E03] text-[#F5EFE7]">
      <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/images/kr-logo-white.svg"
                alt="Kimberly Ryan"
                width={139}
                height={32}
                className="h-8 w-auto"
              />
              <span
                className="h-6 w-px bg-[#5A4632]"
                aria-hidden="true"
              />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C8B9A6]">
                Ghana
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#C8B9A6]">
              Human capital solutions for Ghanaian employers. Payroll,
              recruitment, learning and HR advisory from one accountable team.
            </p>
            <Link
              href="https://www.linkedin.com/company/kimberly-ryan-limited/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#E7DCCE] transition-colors hover:text-white"
            >
              <Linkedin size={16} />
              Kimberly Ryan on LinkedIn
            </Link>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C8B9A6]">
              Services
            </h2>
            <ul className="mt-4 space-y-3">
              {GHANA_SERVICES.map((service) => (
                <li key={service.title}>
                  <Link
                    href={service.href}
                    className="text-sm text-[#E7DCCE] transition-colors hover:text-white"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C8B9A6]">
              Visit or call
            </h2>
            <address className="mt-4 space-y-3 text-sm not-italic text-[#E7DCCE]">
              <p className="flex gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[#EB821D]" />
                <span>{GHANA_ADDRESS.join(", ")}</span>
              </p>
              <p className="flex gap-2.5">
                <Phone size={16} className="mt-0.5 shrink-0 text-[#EB821D]" />
                <a
                  href={`tel:${GHANA_PHONE_TEL}`}
                  className="transition-colors hover:text-white"
                >
                  {GHANA_PHONE_DISPLAY}
                </a>
              </p>
              <p className="flex gap-2.5">
                <Mail size={16} className="mt-0.5 shrink-0 text-[#EB821D]" />
                <a
                  href={`mailto:${GHANA_EMAIL}`}
                  className="transition-colors hover:text-white"
                >
                  {GHANA_EMAIL}
                </a>
              </p>
            </address>
            <p className="mt-5 text-xs leading-relaxed text-[#A8967F]">
              Prefer to talk? Send a WhatsApp message and our Accra team will
              pick it up.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-[#3B2917] pt-7 text-xs text-[#A8967F] md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Kimberly Ryan Limited. Also in
            Nigeria, United Kingdom, Kenya, Uganda and Sierra Leone.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              href={`${MAIN_SITE_URL}/privacy-policy`}
              className="transition-colors hover:text-white"
            >
              Privacy policy
            </Link>
            <Link
              href="#contact"
              className="transition-colors hover:text-white"
            >
              Contact Ghana team
            </Link>
            <Link
              href={MAIN_SITE_URL}
              className="transition-colors hover:text-white"
            >
              Kimberly Ryan global site
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default GhanaFooter;
