import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  GHANA_BTN_PRIMARY,
  GHANA_BTN_SECONDARY,
  GHANA_STATS,
  CV_SUBMISSION_URL,
} from "./constants";

const GhanaHero = () => {
  return (
    <section id="top" className="relative overflow-hidden bg-[#FCF9F4]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-0 h-[28rem] w-[28rem] rounded-full bg-[#F8E3C9] opacity-70 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-5 pb-4 pt-12 lg:px-8 lg:pb-10 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-[#E7D9C4] bg-white/70 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#82450B]">
              <span
                className="h-1.5 w-1.5 rounded-full bg-[#EB821D]"
                aria-hidden="true"
              />
              Human capital partner since 1999
            </p>

            <h1 className="mt-6 text-[2.5rem] font-semibold leading-[1.06] tracking-[-0.03em] text-[#181716] sm:text-5xl lg:text-[3.6rem]">
              One accountable
              <br className="hidden sm:block" /> people partner for
              <br className="hidden sm:block" />{" "}
              <span className="text-[#A85A12]">employers in Ghana.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#53504D]">
              Kimberly Ryan has supported employers since 1999. In Ghana we run
              payroll, recruitment, training and HR advisory for organisations
              that want one accountable partner.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="#contact" className={GHANA_BTN_PRIMARY}>
                Request a proposal
                <ArrowRight size={16} />
              </Link>
              <Link
                href={CV_SUBMISSION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={GHANA_BTN_SECONDARY}
              >
                Submit your CV
              </Link>
            </div>

            <p className="mt-5 text-sm text-[#6B6661]">
              Tell us the role, the timeline and the budget.
            </p>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-[#E4DCCF] bg-[#EDE6DA] shadow-[0_30px_60px_-45px_rgba(27,14,3,0.65)] sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src="/images/people-outsourcing-image-one.jpg"
                alt="A Kimberly Ryan team meeting with clients in an office"
                fill
                priority
                sizes="(min-width: 1024px) 44vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-6 left-4 right-4 rounded-lg border border-[#E4DCCF] bg-white p-4 shadow-lg sm:left-6 sm:right-auto sm:max-w-[19rem]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A85A12]">
                Accra office
              </p>
              <p className="mt-1 text-sm font-semibold text-[#181716]">
                12 Nii Amaah Ollenu Street
              </p>
              <p className="text-sm text-[#6B6661]">Airport West, Accra</p>
            </div>

            <div className="absolute -top-4 right-4 rounded-md bg-[#1B0E03] px-4 py-3 text-white shadow-lg sm:right-6">
              <p className="text-[10px] uppercase tracking-[0.16em] text-[#C8B9A6]">
                On the ground in
              </p>
              <p className="text-lg font-semibold leading-tight">
                6 countries
              </p>
            </div>
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-1 gap-x-10 gap-y-6 border-t-2 border-[#181716] py-8 sm:grid-cols-2 lg:grid-cols-4">
          {GHANA_STATS.map((stat) => (
            <div key={stat.lead}>
              <dt className="text-base font-semibold text-[#181716]">
                {stat.lead}
              </dt>
              <dd className="text-[15px] text-[#595553]">{stat.rest}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default GhanaHero;
