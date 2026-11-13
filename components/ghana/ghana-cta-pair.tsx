import { ArrowRight, FileText } from "lucide-react";
import Link from "next/link";
import {
  CV_SUBMISSION_URL,
  GHANA_BTN_OUTLINE,
  GHANA_BTN_SECONDARY,
} from "./constants";

const GhanaCtaPair = () => {
  return (
    <section id="candidates" className="scroll-mt-20 bg-white py-16 lg:py-20">
      <div className="mx-auto grid max-w-6xl gap-5 px-5 md:grid-cols-2 lg:px-8">
        <div className="flex flex-col rounded-lg bg-[#FAFAFA] p-7 sm:p-9">
          <h2 className="text-2xl font-semibold tracking-[-0.01em] text-[#181D27]">
            Hiring in Ghana?
          </h2>
          <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[#535862]">
            Tell us the role, the timeline and the budget.
          </p>
          <div className="mt-7">
            <Link href="#contact" className={GHANA_BTN_OUTLINE}>
              Request a proposal
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="flex flex-col rounded-lg bg-[#FAFAFA] p-7 sm:p-9">
          <h2 className="text-2xl font-semibold tracking-[-0.01em] text-[#181D27]">
            Looking for your next role?
          </h2>
          <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[#535862]">
            Send us your CV and we will contact you when a role matches your
            experience.
          </p>
          <div className="mt-7">
            <Link
              href={CV_SUBMISSION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={GHANA_BTN_SECONDARY}
            >
              <FileText size={16} />
              Submit your CV
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GhanaCtaPair;
