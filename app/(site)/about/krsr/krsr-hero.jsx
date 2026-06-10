const Hero = () => (
  <section className="hero">
    <div className="htag">Kimberly Ryan Social Responsibility</div>
    <h1>
      Shaping Careers.<br />
      <span>Building Futures.</span><br />
      Changing Lives.
    </h1>
    <p>
      The KRSR initiative empowers Nigerian students with career clarity, professional
      knowledge, and mentorship connections to thrive in today's dynamic job market.
    </p>
    <div className="stats">
      {[
        ["2,000+", "Students Reached"],
        ["6",      "Schools Visited"],
        ["7.9/10", "Avg Inspiration Score"],
        ["8",      "Upcoming Projects"],
      ].map(([n, l]) => (
        <div className="si" key={l}>
          <div className="sn">{n}</div>
          <div className="sl">{l}</div>
        </div>
      ))}
    </div>
  </section>
);

export default Hero;
