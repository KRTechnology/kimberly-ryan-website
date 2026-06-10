const goals = [
  ["50,000+", "Students reached through in-person and digital career clinics"],
  ["50+",     "Partner schools — from secondary schools to postgraduate programmes"],
  ["500+",    "Career clinic events hosted, including digital sessions"],
  ["1",       "Flagship KRSR mentorship cohort with top-performing alumni"],
  ["∞",       "Structured internship referral programme and digital community platform"],
  ["🌍",      "Expand beyond South-west to every Nigerian state and across Africa"],
];

const Goals = () => (
  <section className="goals">
    <div className="stag">Looking Ahead</div>
    <h2 className="stitle" style={{ color: "#fff" }}>Our 5-Year Impact Goals</h2>
    <p className="ssub">
      This is just the beginning. KRSR is committed to deepening its reach and building
      structured mentorship pipelines.
    </p>
    <div className="ggls">
      {goals.map(([n, d]) => (
        <div className="gcard" key={n}>
          <div className="gnum">{n}</div>
          <p>{d}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Goals;
