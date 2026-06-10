const topics = [
  "Time Management & Personal Branding",
  "Developing a Growth Mindset",
  "Interview Techniques & CV Development",
  "Career Development & Choosing a Path",
  "Employability Skills for the Future",
  "Overcoming Career Challenges",
];

const Topics = () => (
  <section className="topics">
    <div className="stag">What We Teach</div>
    <h2 className="stitle" style={{ color: "#fff" }}>Topics That Transform</h2>
    <p className="ssub">
      Every KRSR Career Clinic follows a carefully designed experience arc — blending
      expert insight, interactive activities, and personal reflection.
    </p>
    <div className="tgrid">
      {topics.map((t, i) => (
        <div className="tcard" key={t}>
          <div className="tnum">{String(i + 1).padStart(2, "0")}</div>
          <h4>{t}</h4>
        </div>
      ))}
    </div>
  </section>
);

export default Topics;
