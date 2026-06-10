const testimonials = [
  { q: "I left feeling really inspired and motivated. The speakers made everything feel possible.",                       a: "NUTM Postgraduate Student", s: "National University of Technology & Management" },
  { q: "You didn't just talk at us — you connected with us. I'm leaving with a clearer vision and more confidence.",     a: "NUTM Student",              s: "National University of Technology & Management" },
  { q: "The letter from my 70-year-old self opened my mind to possibilities and gave me the motivation to keep pushing.",a: "Bells University Attendee",  s: "Bells University of Technology" },
  { q: "One thing that stuck with me was that I have to be AUDACIOUS when it comes to my goals.",                        a: "NUTM Student",              s: "National University of Technology & Management" },
  { q: "I didn't expect it to be this interesting. The speakers really know how to engage young people.",                a: "Bells University Student",  s: "Bells University of Technology" },
  { q: "The speakers shared real-life stuff that made me think — this is actually useful.",                              a: "Bells University Student",  s: "Bells University of Technology" },
];

const Testimonials = () => (
  <section className="testimonials">
    <div className="stag">Student Voices</div>
    <h2 className="stitle">What They Said</h2>
    <p className="ssub">
      Post-event feedback from students across all KRSR Career Clinics — consistent,
      inspired, and hungry for more.
    </p>
    <div className="qgrid">
      {testimonials.map((t, i) => (
        <div className="qcard" key={i}>
          <p>"{t.q}"</p>
          <div className="qauthor">{t.a}</div>
          <div className="qschool">{t.s}</div>
        </div>
      ))}
    </div>
  </section>
);

export default Testimonials;
