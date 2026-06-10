const docs = [
  {
    cls:   "pptx",
    icon:  "📊",
    title: "KRSR 2025 Impact Report",
    desc:  "A comprehensive presentation covering our vision, school engagements, student feedback, facilitator profiles, and 5-year impact goals.",
    dl:    "Download PPTX",
    href:  "#", // Replace with hosted file URL
  },
  {
    cls:   "docx",
    icon:  "📄",
    title: "KRSR Career Pathway 360 — Impact Highlight 2025–2026",
    desc:  "A detailed document covering all 6 schools, session design, student quotes, feedback data, and the road ahead.",
    dl:    "Download DOCX",
    href:  "#", // Replace with hosted file URL
  },
];

const DownloadIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const Documents = () => (
  <section className="documents" id="resources">
    <div className="stag">Resources</div>
    <h2 className="stitle">Download Our Reports</h2>
    <p className="ssub">
      Explore the full story behind our impact — from detailed programme reports to
      highlights and metrics.
    </p>
    <div className="dgrid">
      {docs.map((d) => (
        <div className="dcard" key={d.title}>
          <div className={`dicon ${d.cls}`}>{d.icon}</div>
          <div className="dinfo">
            <h4>{d.title}</h4>
            <p>{d.desc}</p>
            <div className="dbtns">
              <a href={d.href} className="bdl"><DownloadIcon />{d.dl}</a>
              <a href={d.href} className="bdl bout">View Online</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Documents;
