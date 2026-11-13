import { Quote } from "lucide-react";

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
      className="text-[#C0B5A3]"
    >
      {marks[index % marks.length]}
    </svg>
  );
};

const GhanaTrust = () => {
  return (
    <section className="border-y border-[#EDE6DA] bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#A85A12]">
              Our clients
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-[#181716] sm:text-4xl">
              Trusted by organisations across Africa
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-[#6B6661] md:text-right">
            Client names and logos are shown with permission.
          </p>
        </div>

        <ul className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {LOGO_PLACEHOLDERS.map((index) => (
            <li
              key={index}
              className="flex h-24 items-center justify-center gap-2.5 rounded-md border border-dashed border-[#D9D1C4] bg-[#FBF7F1] px-4"
              aria-label="Client logo placeholder"
            >
              <LogoMark index={index} />
              <span className="text-xs font-medium uppercase tracking-[0.14em] text-[#6B6661]">
                Client logo
              </span>
            </li>
          ))}
        </ul>

        <figure className="mt-10 grid gap-5 rounded-lg border border-[#E4DCCF] border-l-[3px] border-l-[#EB821D] bg-[#FCF9F4] p-6 sm:p-8 md:grid-cols-[auto_1fr] md:items-start md:gap-7">
          <Quote
            size={34}
            className="text-[#EB821D]"
            aria-hidden="true"
            strokeWidth={1.4}
          />
          <div>
            <blockquote className="text-lg leading-relaxed text-[#3C3835] sm:text-xl">
              “Add a short testimonial from a Ghana client here, describing the
              difference our team made to their organisation.”
            </blockquote>
            <figcaption className="mt-4 text-sm font-medium text-[#6B6661]">
              Client name, role, company
              <span className="ml-2 rounded-sm bg-[#F1E8DA] px-2 py-0.5 text-[11px] uppercase tracking-wide text-[#8C5A2A]">
                To be confirmed
              </span>
            </figcaption>
          </div>
        </figure>
      </div>
    </section>
  );
};

export default GhanaTrust;
