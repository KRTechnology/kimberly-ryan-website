import { Globe2 } from "lucide-react";
import Image from "next/image";

const reasons = [
  {
    title: "Local team, regional reach",
    description:
      "Accra-based consultants backed by offices in Nigeria, the UK, Kenya, Uganda and Sierra Leone. Expanding across borders? We hire and onboard in each market.",
  },
  {
    title: "Solutions built around you",
    description:
      "We do not believe in one size fits all. Every engagement starts with your people strategy.",
  },
  {
    title: "Trust and transparency",
    description:
      "Clear scopes, clear pricing and a named contact for every client.",
  },
];

const GhanaWhyUs = () => {
  return (
    <section
      id="why-us"
      className="scroll-mt-20 bg-[#FCF9F4] py-16 lg:py-24"
    >
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-5 lg:grid-cols-[1fr_0.9fr] lg:gap-20 lg:px-8">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#A85A12]">
            Why us
          </p>
          <h2 className="mt-3 max-w-lg text-3xl font-semibold tracking-[-0.02em] text-[#181716] sm:text-4xl">
            Why Ghanaian organisations choose us
          </h2>

          <div className="mt-9 space-y-7">
            {reasons.map((reason, index) => (
              <div
                key={reason.title}
                className="grid grid-cols-[2.25rem_1fr] gap-4 border-t border-[#E4DCCF] pt-6 first:border-t-0 first:pt-0"
              >
                <span className="pt-0.5 text-sm font-semibold tabular-nums text-[#A85A12]">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-[#181716]">
                    {reason.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-[#595553]">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative lg:pt-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[#E4DCCF]">
            <Image
              src="/images/people-outsourcing-image-two.jpg"
              alt="Consultants collaborating in a Kimberly Ryan office"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="relative z-10 -mt-8 ml-6 mr-6 rounded-lg border border-[#E4DCCF] bg-white p-5 shadow-[0_20px_45px_-35px_rgba(27,14,3,0.6)] sm:ml-10 sm:mr-10">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#FEE7DE] text-[#A85A12]">
                <Globe2 size={18} />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#181716]">
                  One team across six markets
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[#6B6661]">
                  Ghana, Nigeria, the UK, Kenya, Uganda and Sierra Leone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GhanaWhyUs;
