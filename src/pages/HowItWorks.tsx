const STEPS: [string, string][] = [
  ['Register', 'Create your TTP account with Get Started.'],
  ['View courses', 'Browse the catalogue and pick your track.'],
  ['Buy a course', 'Pay securely in ₹ through Razorpay.'],
  ['Learn', 'Short video lessons at your own pace.'],
  ['Complete modules', 'Each module: video → quiz/assignment.'],
  ['Get TTP guidance', 'Q&A with your mentor inside every course.'],
  ['Real project assigned', 'TTP allocates you to a suitable startup project.'],
  ['Work on the real problem', 'Join the project team and take ownership.'],
  ['Submit work', 'Upload your work against each task deadline.'],
  ['Get feedback', 'Your mentor reviews, grades and guides revisions.'],
  ['Complete the project', 'Finish every milestone with mentor approval.'],
  ['Receive your certificate', 'Verified certificate with a unique ID.'],
];

export default function HowItWorks() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec__head">
          <h2 className="sec-title">How It Works</h2>
          <p className="lede">Twelve steps from first login to certified real-project experience — in this exact order.</p>
        </div>
        <ol className="rail">
          {STEPS.map(([b, d]) => (
            <li key={b}>
              <b>{b}</b>
              <p>{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
