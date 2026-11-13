import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import {
  GHANA_BTN_OUTLINE,
  GHANA_COMPLIANCE_POINTS,
} from "./constants";

const GhanaCompliance = () => {
  return (
    <section
      id="compliance"
      className="scroll-mt-20 bg-[#1B0E03] py-16 text-[#F5EFE7] lg:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20 lg:px-8">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#EB821D]">
            Ghana compliance
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
            Payroll and HR that{" "}
            <span className="text-[#EB821D]">follow Ghanaian rules</span>
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-[#C8B9A6]">
            Statutory deductions and employment law change. We keep your payroll
            and HR documents current so audits are not a worry.
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {["PAYE", "SSNIT Tier 2 & 3", "Labour Act"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#4A3520] px-3 py-1 text-xs font-medium text-[#E7DCCE]"
              >
                {tag}
              </span>
            ))}
          </div>

          <Link
            href="#contact"
            className={`${GHANA_BTN_OUTLINE} mt-9 border-[#EB821D] text-[#F5EFE7] hover:text-[#1B0E03]`}
          >
            Talk to our payroll team
            <ArrowRight size={16} />
          </Link>
        </div>

        <ul className="divide-y divide-[#3B2917] border-y border-[#3B2917]">
          {GHANA_COMPLIANCE_POINTS.map((point) => (
            <li key={point} className="flex items-start gap-4 py-5">
              <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#EB821D]/15 text-[#EB821D]">
                <Check size={14} strokeWidth={3} />
              </span>
              <span className="text-[15px] leading-relaxed text-[#E7DCCE]">
                {point}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default GhanaCompliance;
