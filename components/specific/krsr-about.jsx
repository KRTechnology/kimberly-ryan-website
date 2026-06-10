const About = () => (
  <section className="about" id="about">
    <div className="agrid">
      <div>
        <div className="stag">About KRSR</div>
        <h2 className="stitle">Bridging the Gap Between Campus &amp; Career</h2>
        <p className="ssub">
          Nigeria's youth face a critical gap between academic preparation and career readiness.
          KRSR was born to bridge this gap — bringing world-class career professionals directly
          into campuses and classrooms.
        </p>
        <div className="pillars">
          {[
            ["💼", "Career Clinic",                "Helping students gain clarity, confidence, and direction in choosing and preparing for their future careers."],
            ["🌍", "Pro Bono Speaking Engagements", "Collaborate with NGOs, community groups, and corporate organizations to speak at special events."],
            ["🎓", "Student Internship",            "Providing internships, mentorship, and practical experiences that enhance employability and career growth."],
          ].map(([icon, title, desc]) => (
            <div className="pillar" key={title}>
              <div className="picon">{icon}</div>
              <div><h4>{title}</h4><p>{desc}</p></div>
            </div>
          ))}
        </div>
      </div>

      {/* Replace with <img src="./images/about-event.jpg" alt="KRSR Event" /> when ready */}
      <div className="img-box" style={{ height: "320px" }}>
        <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
        <span>Event photo goes here</span>
      </div>
    </div>
  </section>
);

export default About;
