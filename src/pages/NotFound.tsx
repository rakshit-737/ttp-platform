import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="sec">
      <div className="wrap" style={{ textAlign: 'center', padding: '90px 24px' }}>
        <h2 className="sec-title" style={{ margin: '0 0 14px' }}>
          404 — page not found
        </h2>
        <p className="lede" style={{ margin: '0 auto 26px' }}>
          That link doesn't exist. Head back home to continue.
        </p>
        <Link className="btn" to="/">
          Go to Home
        </Link>
      </div>
    </section>
  );
}
