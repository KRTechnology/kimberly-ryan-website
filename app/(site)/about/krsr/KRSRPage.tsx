// KRSRPage.tsx
// Place this file in your components/ folder.
// Then create app/krsr/page.tsx and import this component there.
// No separate CSS file needed — all styles use Tailwind utility classes.

import React from "react";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
interface School {
  badge: string;
  name: string;
  checks: string[];
}

interface Testimonial {
  q: string;
  a: string;
  s: string;
}

interface Goal {
  num: string;
  desc: string;
}

interface DocItem {
  title: string;
  desc: string;
  dl: string;
  href: string;
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const schools: School[] = [
  {
    badge: "University",
    name: "Bells University",
    checks: [
      "105 registered participants across multiple levels",
      "Pre-event survey captured career interests & goals",
      "Interactive career discovery with HR professionals",
      "Strong demand for mentorship and internship opportunities",
    ],
  },
  {
    badge: "University",
    name: "Covenant University",
    checks: [
      "Large-scale career clinic with undergraduate students",
      "Sessions on talent, leadership & career navigation",
      "Networking activities and career pathway exercises",
      "Students connected with KRSR team on social media",
    ],
  },
  {
    badge: "Postgraduate",
    name: "NUTM",
    checks: [
      "MSc & MBA students in an executive-level session",
      "Topics: mid-career transitions & executive presence",
      "Strategic Career Mapping workshop",
      "Roundtable Q&A with senior practitioners",
    ],
  },
  {
    badge: "Secondary",
    name: "Saint Gregory's College",
    checks: [
      "Career awareness & professional discovery session",
      "Top-tier speakers sharing real-world journeys",
      "Students engaged in mentorship discussions",
      "Social media follow-up and community building",
    ],
  },
  {
    badge: "Secondary",
    name: "Holy Child Secondary School",
    checks: [
      "Early career awareness for secondary students",
      "Interactive games and career exploration exercises",
      "Introduced students to professional pathways",
      "High energy engagement and post-event connections",
    ],
  },
  {
    badge: "Secondary",
    name: "CMS Grammar School",
    checks: [
      "Career awareness and professional discovery session",
      "Top-tier speakers sharing real-world journeys",
      "Students engaged in mentorship Q&A",
      "Ongoing social media community building",
    ],
  },
];

const topics: string[] = [
  "Time Management & Personal Branding",
  "Developing a Growth Mindset",
  "Interview Techniques & CV Development",
  "Career Development & Choosing a Path",
  "Employability Skills for the Future",
  "Overcoming Career Challenges",
];

const testimonials: Testimonial[] = [
  {
    q: "I left feeling really inspired and motivated. The speakers made everything feel possible.",
    a: "NUTM Postgraduate Student",
    s: "National University of Technology & Management",
  },
  {
    q: "You didn't just talk at us — you connected with us. I'm leaving with a clearer vision and more confidence.",
    a: "NUTM Student",
    s: "National University of Technology & Management",
  },
  {
    q: "The letter from my 70-year-old self opened my mind to possibilities and gave me the motivation to keep pushing.",
    a: "Bells University Attendee",
    s: "Bells University of Technology",
  },
  {
    q: "One thing that stuck with me was that I have to be AUDACIOUS when it comes to my goals.",
    a: "NUTM Student",
    s: "National University of Technology & Management",
  },
  {
    q: "I didn't expect it to be this interesting. The speakers really know how to engage young people.",
    a: "Bells University Student",
    s: "Bells University of Technology",
  },
  {
    q: "The speakers shared real-life stuff that made me think — this is actually useful.",
    a: "Bells University Student",
    s: "Bells University of Technology",
  },
];

const goals: Goal[] = [
  { num: "50,000+", desc: "Students reached through in-person and digital career clinics" },
  { num: "50+",     desc: "Partner schools — from secondary schools to postgraduate programmes" },
  { num: "500+",    desc: "Career clinic events hosted, including digital sessions" },
  { num: "1",       desc: "Flagship KRSR mentorship cohort with top-performing alumni" },
  { num: "∞",       desc: "Structured internship referral programme and digital community platform" },
  { num: "🌍",      desc: "Expand beyond South-west to every Nigerian state and across Africa" },
];

const docs: DocItem[] = [
  {
    title: "KRSR 2025 Impact Report",
    desc: "A comprehensive presentation covering our vision, school engagements, student feedback, facilitator profiles, and 5-year impact goals.",
    dl: "Download PPTX",
    href: "https://mega.nz/file/JNBkCBJa#_RqOnaOyUMQkkkIffzK1ULHzqnkvo-3WYh8xdunZrV4",
  },
  {
    title: "KRSR Career Pathway 360 — Impact Highlight 2025–2026",
    desc: "A detailed document covering all 6 schools, session design, student quotes, feedback data, and the road ahead.",
    dl: "Download DOCX",
    href: "https://mega.nz/file/YZwRHQyR#F1FFYCXUanyoQ6zAuZ2kqNJqx6uSSCMSBzLOg6qed30",
  },
];


// ─────────────────────────────────────────────
// SMALL SHARED COMPONENTS
// ─────────────────────────────────────────────
const ImagePlaceholder: React.FC<{ label: string; className?: string }> = ({
  label,
  className = "",
}) => (
  <div
    className={`flex flex-col items-center justify-center gap-3 rounded-2xl bg-[#F4F2EE] text-[#b0a89e] ${className}`}
  >
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      className="opacity-30"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
    <span className="text-xs font-medium">{label}</span>
  </div>
);

const GalleryIcon: React.FC<{ size?: number }> = ({ size = 22 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    className="opacity-30"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

// ─────────────────────────────────────────────
// SECTION COMPONENTS
// ─────────────────────────────────────────────
const Hero: React.FC = () => (
  <section className="relative overflow-hidden bg-[#3A3530] px-10 pb-16 pt-20 md:px-16">
    {/* decorative ring */}
    <div className="pointer-events-none absolute -right-16 -top-16 h-80 w-80 rounded-full border-[60px] border-[#E87722]/[0.07]" />

    <span className="mb-5 inline-block rounded-full bg-[#E87722]/20 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[2px] text-[#E87722]">
      Kimberly Ryan Social Responsibility
    </span>

    <h1 className="mb-4 max-w-2xl font-sans text-4xl font-bold leading-tight text-white md:text-5xl">
      Shaping Careers.
      <br />
      <span className="text-[#E87722]">Building Futures.</span>
      <br />
      Changing Lives.
    </h1>

    <p className="max-w-lg text-sm leading-relaxed text-white/70 md:text-base">
      The KRSR initiative empowers Nigerian students with career clarity, professional
      knowledge, and mentorship connections to thrive in today&apos;s dynamic job market.
    </p>

    {/* stats strip */}
    <div className="mt-10 grid grid-cols-2 gap-5 border-t border-white/10 pt-8 sm:grid-cols-4">
      {(
        [
          ["2,000+", "Students Reached"],
          ["6",      "Schools Visited"],
          ["7.9/10", "Avg Inspiration Score"],
          ["8",      "Upcoming Projects"],
        ] as [string, string][]
      ).map(([num, label]) => (
        <div key={label}>
          <p className="font-sans text-3xl font-bold text-[#E87722]">{num}</p>
          <p className="mt-1 text-[0.68rem] uppercase tracking-wide text-white/50">{label}</p>
        </div>
      ))}
    </div>
  </section>
);

const About: React.FC = () => (
  <section id="about" className="bg-white px-10 py-20 md:px-16">
    <div className="grid items-center gap-16 md:grid-cols-2">
      <div>
        <p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[2px] text-[#E87722]">
          About KRSR
        </p>
        <h2 className="mb-4 font-sans text-3xl font-bold leading-tight text-[#2C2A27] md:text-4xl">
          Bridging the Gap Between Campus &amp; Career
        </h2>
        <p className="mb-7 max-w-lg text-sm leading-relaxed text-[#5A5550]">
          Nigeria&apos;s youth face a critical gap between academic preparation and career
          readiness. KRSR was born to bridge this gap — bringing world-class career
          professionals directly into campuses and classrooms.
        </p>

        <div className="flex flex-col gap-5">
          {(
            [
              ["💼", "Career Clinic",                "Helping students gain clarity, confidence, and direction in choosing and preparing for their future careers."],
              ["🌍", "Pro Bono Speaking Engagements", "Collaborate with NGOs, community groups, and corporate organizations to speak at special events."],
              ["🎓", "Student Internship",            "Providing internships, mentorship, and practical experiences that enhance employability and career growth."],
            ] as [string, string, string][]
          ).map(([icon, title, desc]) => (
            <div key={title} className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E87722]/10 text-base">
                {icon}
              </div>
              <div>
                <h4 className="mb-1 text-sm font-semibold text-[#2C2A27]">{title}</h4>
                <p className="text-xs leading-relaxed text-[#5A5550]">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Replace with <Image src="..." alt="..." fill className="object-cover" /> when ready */}
      <ImagePlaceholder label="Event photo goes here" className="h-80 md:h-[380px]" />
    </div>
  </section>
);

const highlights = [
  {
    name: "Bells University",
    badge: "University",
    stat: "105 Students",
    desc: "Pre-event surveys, interactive career discovery sessions, and strong demand for mentorship and internship opportunities.",
  },
  {
    name: "NUTM",
    badge: "Postgraduate",
    stat: "MSc & MBA",
    desc: "Executive-level career mapping sessions with mid-career professionals exploring transitions and leadership presence.",
  },
  {
    name: "CMS Grammar School",
    badge: "Secondary",
    stat: "Future Leaders",
    desc: "Early career awareness, professional discovery, and mentorship Q&A introducing students to real-world pathways.",
  },
];

const Schools: React.FC = () => (
  <section id="schools" className="bg-[#F4F2EE] px-10 py-20 md:px-16">
    <p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[2px] text-[#E87722]">
      Where We&apos;ve Been
    </p>
    <h2 className="mb-3 font-sans text-3xl font-bold text-[#2C2A27] md:text-4xl">
      The Mission.
    </h2>
    <p className="mb-10 max-w-lg text-sm leading-relaxed text-[#5A5550]">
      From university halls to secondary school classrooms, KRSR has carried its message
      of career empowerment across Lagos and beyond — and we&apos;re just getting started.
    </p>

    {/* stat banner */}
    <div className="mb-12 flex flex-wrap items-center gap-6 rounded-2xl bg-[#3A3530] px-8 py-6">
      <div className="flex items-end gap-3">
        <span className="font-sans text-5xl font-bold text-[#E87722]">6+</span>
        <span className="mb-1.5 text-sm font-semibold text-white">Schools &amp; Counting</span>
      </div>
      <div className="h-10 w-px bg-white/10 max-sm:hidden" />
      <p className="max-w-md text-sm leading-relaxed text-white/60">
        We&apos;ve visited universities, postgraduate institutions, and secondary schools — 
        with more partnerships being confirmed every week.
      </p>
    </div>

    {/* highlight cards */}
    <div className="grid gap-5 sm:grid-cols-3">
      {highlights.map((h) => (
        <div
          key={h.name}
          className="rounded-2xl bg-white p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md"
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="rounded-full bg-[#E87722] px-3 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-white">
              {h.badge}
            </span>
            <span className="text-xs font-semibold text-[#E87722]">{h.stat}</span>
          </div>
          <h3 className="mb-2 font-sans text-base font-bold text-[#2C2A27]">{h.name}</h3>
          <p className="text-xs leading-relaxed text-[#5A5550]">{h.desc}</p>
        </div>
      ))}
    </div>

    <p className="mt-8 text-center text-xs text-[#b0a89e]">
      Institutions visited include Bells University, Covenant University, NUTM, 
      Saint Gregory&apos;s College, Holy Child Secondary School, and CMS Grammar School.
    </p>
  </section>
);

const Topics: React.FC = () => (
  <section className="bg-[#3A3530] px-10 py-20 md:px-16">
    <p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[2px] text-[#E87722]">
      What We Teach
    </p>
    <h2 className="mb-3 font-sans text-3xl font-bold text-white md:text-4xl">
      Topics That Transform
    </h2>
    <p className="mb-12 max-w-lg text-sm leading-relaxed text-white/60">
      Every KRSR Career Clinic follows a carefully designed experience arc — blending expert
      insight, interactive activities, and personal reflection.
    </p>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {topics.map((topic, i) => (
        <div
          key={topic}
          className="rounded-xl border border-white/[0.08] bg-white/[0.05] p-6 transition-colors duration-200 hover:border-[#E87722]/30 hover:bg-[#E87722]/10"
        >
          <p className="mb-3 font-sans text-2xl font-bold text-[#E87722]/30">
            {String(i + 1).padStart(2, "0")}
          </p>
          <h4 className="text-sm font-semibold leading-snug text-white">{topic}</h4>
        </div>
      ))}
    </div>
  </section>
);

const Testimonials: React.FC = () => (
  <section className="bg-white px-10 py-20 md:px-16">
    <p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[2px] text-[#E87722]">
      Student Voices
    </p>
    <h2 className="mb-3 font-sans text-3xl font-bold text-[#2C2A27] md:text-4xl">
      What They Said
    </h2>
    <p className="mb-12 max-w-lg text-sm leading-relaxed text-[#5A5550]">
      Post-event feedback from students across all KRSR Career Clinics — consistent,
      inspired, and hungry for more.
    </p>

    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((t, i) => (
        <div key={i} className="relative rounded-2xl bg-[#F4F2EE] p-7">
          <span className="pointer-events-none absolute left-5 top-2 font-sans text-6xl leading-none text-[#E87722]/20">
            &ldquo;
          </span>
          <p className="relative z-10 mt-5 text-xs italic leading-relaxed text-[#2C2A27]">
            &ldquo;{t.q}&rdquo;
          </p>
          <p className="mt-4 text-xs font-bold text-[#E87722]">{t.a}</p>
          <p className="mt-0.5 text-[0.68rem] text-[#5A5550]">{t.s}</p>
        </div>
      ))}
    </div>
  </section>
);

const Gallery: React.FC = () => (
  <section id="gallery" className="bg-[#F4F2EE] px-10 py-20 md:px-16">
    <p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[2px] text-[#E87722]">
      Event Gallery
    </p>
    <h2 className="mb-3 font-sans text-3xl font-bold text-[#2C2A27] md:text-4xl">
      Moments That Matter
    </h2>
    <p className="mb-10 max-w-lg text-sm leading-relaxed text-[#5A5550]">
      Scenes from our Career Clinics across institutions.
    </p>

    {/* grid: featured cell spans 2 cols × 2 rows */}
    <div className="grid grid-cols-2 grid-rows-2 gap-3 md:grid-cols-4" style={{ gridAutoRows: "200px" }}>
      {/* featured */}
      <div className="col-span-2 row-span-2 flex flex-col items-center justify-center gap-3 rounded-2xl bg-[#e2ddd7] text-[#a09890]">
        {/* Replace with <Image src="..." alt="..." fill className="object-cover rounded-2xl" /> */}
        <GalleryIcon size={32} />
        <span className="text-xs font-medium">Featured photo</span>
      </div>

      {["Event photo", "Event photo", "Event photo", "Event photo"].map((label, i) => (
        <div
          key={i}
          className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-[#e2ddd7] text-[#a09890]"
        >
          {/* Replace with <Image src="..." alt="..." fill className="object-cover rounded-2xl" /> */}
          <GalleryIcon size={22} />
          <span className="text-xs font-medium">{label}</span>
        </div>
      ))}
    </div>
  </section>
);

const Goals: React.FC = () => (
  <section className="bg-[#3A3530] px-10 py-20 md:px-16">
    <p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[2px] text-[#E87722]">
      Looking Ahead
    </p>
    <h2 className="mb-3 font-sans text-3xl font-bold text-white md:text-4xl">
      Our 5-Year Impact Goals
    </h2>
    <p className="mb-12 max-w-lg text-sm leading-relaxed text-white/60">
      This is just the beginning. KRSR is committed to deepening its reach and building
      structured mentorship pipelines.
    </p>

    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {goals.map((g) => (
        <div
          key={g.num}
          className="rounded-r-2xl border-l-4 border-[#E87722] bg-white/5 p-7 transition-colors duration-200 hover:bg-white/[0.08]"
        >
          <p className="mb-2 font-sans text-4xl font-bold text-[#E87722]">{g.num}</p>
          <p className="text-sm leading-relaxed text-white/70">{g.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

const Documents: React.FC = () => (
  <section id="resources" className="bg-[#F4F2EE] px-10 py-20 md:px-16">
    <p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[2px] text-[#E87722]">
      Resources
    </p>
    <h2 className="mb-3 font-sans text-3xl font-bold text-[#2C2A27] md:text-4xl">
      Download Our Reports
    </h2>
    <p className="mb-12 max-w-lg text-sm leading-relaxed text-[#5A5550]">
      Explore the full story behind our impact — from detailed programme reports to
      highlights and metrics.
    </p>

    <div className="grid gap-6 md:grid-cols-2">
      {docs.map((d) => (
        <div
          key={d.title}
          className="rounded-2xl bg-white p-7 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md"
        >
          <h4 className="mb-2 text-sm font-bold text-[#2C2A27]">{d.title}</h4>
          <p className="mb-4 text-xs leading-relaxed text-[#5A5550]">{d.desc}</p>
          <a
            href={d.href}
            className="inline-flex items-center gap-1.5 rounded bg-[#E87722] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#F5A44A]"
          >
            ↓ {d.dl}
          </a>
        </div>
      ))}
    </div>
  </section>
);

const CTA: React.FC = () => (
  <section className="bg-[#E87722] px-10 py-20 text-center md:px-16">
    <h2 className="mb-4 font-sans text-3xl font-bold text-white md:text-4xl">
      Partner With Us to Shape Nigeria&apos;s Future
    </h2>
    <p className="mx-auto mb-8 max-w-xl whitespace-pre-line text-sm leading-loose text-white/85">
      {`KRSR welcomes strategic partners committed to advancing youth development and strengthening workforce readiness across Nigeria.\n\nSponsorship opportunities can include in-kind support like learning resources, technology solutions, and placement for interns.\n\nTo explore partnership opportunities, connect with our team.`}
    </p>
    <div className="flex flex-wrap justify-center gap-4">
      <button className="rounded bg-white px-8 py-3 text-sm font-bold text-[#E87722] transition-colors hover:bg-white/90">
        Partner With Us
      </button>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// ROOT EXPORT
// ─────────────────────────────────────────────
const KRSRPage: React.FC = () => (
  <>
    <Hero />
    <About />
    <Schools />
    <Topics />
    <Testimonials />
    <Gallery />
    <Goals />
    <Documents />
    <CTA />
  </>
);

export default KRSRPage;
