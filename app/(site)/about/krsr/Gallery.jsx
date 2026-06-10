const galleryLabels = [
  "Featured photo",
  "Event photo",
  "Event photo",
  "Event photo",
  "Event photo",
];

const Gallery = () => (
  <section className="gallery" id="gallery">
    <div className="gintro">
      <div className="stag">Event Gallery</div>
      <h2 className="stitle">Moments That Matter</h2>
      <p className="ssub">Scenes from our Career Clinics across institutions.</p>
    </div>
    <div className="ggrid">
      {galleryLabels.map((label, i) => (
        <div className="gcell" key={i}>
          {/* Replace this div contents with <img src="./images/gallery-N.jpg" alt="KRSR Event" /> when ready */}
          <svg
            width={i === 0 ? 30 : 22}
            height={i === 0 ? 30 : 22}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span>{label}</span>
        </div>
      ))}
    </div>
  </section>
);

export default Gallery;
