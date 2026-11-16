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
    <section id="top" className="relative overflow-hidden bg-white">
      <div className="relative mx-auto max-w-6xl px-5 pb-4 pt-12 lg:px-8 lg:pb-10 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <h1 className="text-[2.5rem] font-semibold leading-[1.06] tracking-[-0.03em] text-[#181D27] sm:text-5xl lg:text-[3.6rem]">
              One accountable
              <br className="hidden sm:block" /> people partner for
              <br className="hidden sm:block" />{" "}
              <span className="text-[#B56314]">employers in Ghana.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#535862]">
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

            <p className="mt-5 text-sm text-[#535862]">
              Tell us the role, the timeline and the budget.
            </p>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-[#D5D7DA] bg-[#EDECEB] shadow-[0_30px_60px_-45px_rgba(24,23,22,0.55)] sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src="/images/people-outsourcing-image-one.jpg"
                alt="A Kimberly Ryan team meeting with clients in an office"
                fill
                priority
                sizes="(min-width: 1024px) 44vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-1 gap-x-10 gap-y-6 border-t border-[#D5D7DA] py-8 sm:grid-cols-3">
          {GHANA_STATS.map((stat) => (
            <div key={stat.lead}>
              <dt className="text-base font-semibold text-[#181D27]">
                {stat.lead}
              </dt>
              <dd className="text-[15px] text-[#535862]">{stat.rest}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default GhanaHero;
