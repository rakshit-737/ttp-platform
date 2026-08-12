const PHASES: { title: string; steps: [string, string][] }[] = [
  {
    title: 'Enrol',
    steps: [
      ['Register', 'Create your TTP account with Get Started.'],
      ['View courses', 'Browse the catalogue and pick your track.'],
      ['Buy a course', 'Pay securely in ₹ (Razorpay in production — this preview simulates checkout).'],
    ],
  },
  {
    title: 'Learn',
    steps: [
      ['Learn', 'Short video lessons at your own pace.'],
      ['Complete modules', 'Each module: video → quiz/assignment.'],
      ['Get TTP guidance', 'Q&A with your mentor inside every course.'],
    ],
  },
  {
    title: 'Work',
    steps: [
      ['Real project assigned', 'TTP allocates you to a suitable startup project.'],
      ['Work on the real problem', 'Join the project team and take ownership.'],
      ['Submit work', 'Upload your work against each task deadline.'],
      ['Get feedback', 'Your mentor reviews, grades and guides revisions.'],
    ],
  },
  {
    title: 'Certify',
    steps: [
      ['Complete the project', 'Finish every milestone with mentor approval.'],
      ['Receive your certificate', 'Verified certificate with a unique ID.'],
    ],
  },
];

export default function HowItWorks() {
  let step = 0;
  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec__head">
          <h1 className="sec-title">How It Works</h1>
          <p className="lede">Twelve steps from first login to certified real-project experience — in this exact order.</p>
        </div>
        {PHASES.map((phase) => {
          const offset = step;
          step += phase.steps.length;
          return (
            <div key={phase.title} style={{ marginBottom: 40 }}>
              <h2 className="sec-title" style={{ fontSize: '1.25rem', marginBottom: 18 }}>
                {phase.title}
              </h2>
              <ol className="rail" style={{ counterReset: `st ${offset}` }}>
                {phase.steps.map(([b, d]) => (
                  <li key={b}>
                    <b>{b}</b>
                    <p>{d}</p>
                  </li>
                ))}
              </ol>
            </div>
          );
        })}
      </div>
    </section>
  );
}
