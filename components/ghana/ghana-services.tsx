import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { GHANA_SECTION_LINK, GHANA_SERVICES } from "./constants";

const GhanaServices = () => {
  return (
    <section
      id="services"
      className="scroll-mt-20 border-t border-[#EDECEB] bg-white py-16 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#535862]">
            What we do
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-[#181D27] sm:text-4xl">
            What we do for Ghanaian employers
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#535862]">
            Four services, one team. Use one, or combine them.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {GHANA_SERVICES.map((service, index) => (
            <article
              key={service.title}
              className="group flex flex-col rounded-lg bg-[#FAFAFA] p-7 transition-shadow duration-300 hover:shadow-[0_18px_40px_-32px_rgba(24,23,22,0.45)]"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-semibold text-[#181D27]">
                  {service.title}
                </h3>
                <span className="text-xs font-semibold tabular-nums text-[#535862]">
                  0{index + 1}
                </span>
              </div>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[#535862]">
                {service.description}
              </p>
              <Link href={service.href} className={`${GHANA_SECTION_LINK} mt-6`}>
                {service.cta}
                <ArrowUpRight size={15} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GhanaServices;
