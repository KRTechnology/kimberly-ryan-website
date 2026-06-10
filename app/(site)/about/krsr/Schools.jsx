const schools = [
  { badge: "University",   name: "Bells University",            checks: ["105 registered participants", "Pre-event survey captured career interests", "Interactive career discovery with HR professionals", "Strong demand for mentorship and internships"] },
  { badge: "University",   name: "Covenant University",         checks: ["Large-scale career clinic with undergraduates", "Sessions on talent, leadership & career navigation", "Networking activities and career pathway exercises", "Students connected with KRSR team on social media"] },
  { badge: "Postgraduate", name: "NUTM",                        checks: ["MSc & MBA students in executive-level session", "Mid-career transitions & executive presence", "Strategic Career Mapping workshop", "Roundtable Q&A with senior practitioners"] },
  { badge: "Secondary",    name: "Saint Gregory's College",     checks: ["Career awareness & professional discovery", "Top-tier speakers sharing real-world journeys", "Students engaged in mentorship discussions", "Social media follow-up and community building"] },
  { badge: "Secondary",    name: "Holy Child Secondary School", checks: ["Early career awareness for secondary students", "Interactive games and career exploration", "Introduced students to professional pathways", "High energy engagement and post-event connections"] },
  { badge: "Secondary",    name: "CMS Grammar School",          checks: ["Career awareness and professional discovery", "Top-tier speakers sharing real-world journeys", "Students engaged in mentorship Q&A", "Ongoing social media community building"] },
];

const PlaceholderIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const Schools = () => (
  <section className="schools" id="schools">
    <div className="stag">Where We've Been</div>
    <h2 className="stitle">The Mission.</h2>
    <p className="ssub">
      From bustling university halls to secondary school classrooms, KRSR has carried
      its message across Lagos and beyond.
    </p>
    <div className="sgrid">
      {schools.map((s) => (
        <div className="scard" key={s.name}>
          {/* Replace placeholder div with <img src="./images/school-name.jpg" /> when ready */}
          <div className="sphoto">
            <span className="sbadge">{s.badge}</span>
            <PlaceholderIcon />
            <span>{s.name}</span>
          </div>
          <div className="sbody">
            <h3>{s.name}</h3>
            <ul className="checks">
              {s.checks.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Schools;
