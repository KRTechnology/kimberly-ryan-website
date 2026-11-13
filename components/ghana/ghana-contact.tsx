import { Mail, MessageCircle, Phone } from "lucide-react";
import {
  GHANA_EMAIL,
  GHANA_PHONE_DISPLAY,
  GHANA_PHONE_TEL,
  GHANA_WHATSAPP_URL,
  GHANA_BTN_SECONDARY,
} from "./constants";
import GhanaContactForm from "./ghana-contact-form";

const GhanaContact = () => {
  return (
    <section
      id="contact"
      className="scroll-mt-20 border-t border-[#EDECEB] bg-white py-16 lg:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#535862]">
            Contact
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-[#181D27] sm:text-4xl">
            Let&rsquo;s talk about your people priorities
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#535862]">
            Tell us what you are trying to solve. We will come back with a clear
            scope, a named contact and a proposal.
          </p>

          <div className="mt-8 space-y-5 border-t border-[#EDECEB] pt-7">
            <div className="flex gap-3.5">
              <Phone
                size={18}
                className="mt-0.5 flex-shrink-0 text-[#EB821D]"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-semibold text-[#181D27]">Phone</p>
                <a
                  href={`tel:${GHANA_PHONE_TEL}`}
                  className="mt-1 inline-block text-sm text-[#535862] underline-offset-4 hover:text-[#181D27] hover:underline"
                >
                  {GHANA_PHONE_DISPLAY}
                </a>
              </div>
            </div>

            <div className="flex gap-3.5">
              <Mail
                size={18}
                className="mt-0.5 flex-shrink-0 text-[#EB821D]"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-semibold text-[#181D27]">Email</p>
                <a
                  href={`mailto:${GHANA_EMAIL}`}
                  className="mt-1 inline-block text-sm text-[#535862] underline-offset-4 hover:text-[#181D27] hover:underline"
                >
                  {GHANA_EMAIL}
                </a>
              </div>
            </div>
          </div>

          <a
            href={GHANA_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${GHANA_BTN_SECONDARY} mt-7`}
          >
            <MessageCircle size={16} />
            Chat on WhatsApp
          </a>
        </div>

        <div className="lg:pt-2">
          <GhanaContactForm />
        </div>
      </div>
    </section>
  );
};

export default GhanaContact;
