const JOURNEY = ['Learn', 'Apply', 'Work on Real Problems', 'Get Guidance', 'Build Experience'];

export default function About() {
  return (
    <section className="sec">
      <div className="wrap" style={{ maxWidth: 800 }}>
        <div className="sec__head">
          <h1 className="sec-title">TTP is not just a platform where users watch courses.</h1>
        </div>
        <p className="lede" style={{ marginBottom: 26 }}>
          TTP helps participants learn through structured courses and then apply that knowledge to real startup
          projects, understand real business problems, receive mentorship, and gain practical experience.
        </p>
        <div className="journey" style={{ borderRadius: 10 }}>
          <div style={{ padding: '0 26px' }}>
            <ol>
              {JOURNEY.map((t, i) => (
                <li key={t}>
                  <span className="n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="t">{t}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <p className="meta mono" style={{ marginTop: 22 }}>
          TTP — Teacher Training Programme · Bhopal, Madhya Pradesh, India
        </p>
      </div>
    </section>
  );
}
