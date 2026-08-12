import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Modal from '../components/Modal';
import { inr } from '../components/CourseCard';
import { COURSES, REVIEWS } from '../data/courses';
import { MENTORS } from '../data/mentors';
import { useStore } from '../store';
import NotFound from './NotFound';

export default function CourseDetail() {
  const { id } = useParams();
  const course = COURSES.find((c) => c.id === id);
  const { state, enroll, toast } = useStore();
  const [checkout, setCheckout] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const enrolled = course ? state.enrolled.includes(course.id) : false;
  const resumeBuy = (location.state as { intent?: string } | null)?.intent === 'buy';

  // guest clicked Buy, registered, and came back: reopen checkout where they left off
  useEffect(() => {
    if (resumeBuy && course && state.user && !enrolled) {
      setCheckout(true);
      navigate(location.pathname, { replace: true });
    }
  }, [resumeBuy, course, state.user, enrolled, navigate, location.pathname]);

  if (!course) return <NotFound />;

  const progress = state.progress[course.id] ?? 0;
  const mentor = MENTORS.find((m) => m.focus.includes(course.category.split(' ')[0])) ?? MENTORS[0];

  const buy = () => {
    if (!state.user) {
      toast('Create a free account — checkout reopens right here when you return.');
      navigate('/register', { state: { returnTo: `/course/${course.id}`, intent: 'buy' } });
      return;
    }
    setCheckout(true);
  };

  const pay = () => {
    enroll(course.id);
    setCheckout(false);
    toast('Payment successful — course added to your dashboard.');
    navigate('/dashboard');
  };

  return (
    <section className="sec">
      <div className="wrap">
        <div className="split">
          <div>
            <h1 className="display" style={{ fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', margin: '0 0 12px' }}>
              {course.title}
            </h1>
            <p className="lede" style={{ marginBottom: 12 }}>
              {course.excerpt}
            </p>
            <p className="dataline">
              {course.code} · {course.category} · {course.level} · {course.rating.toFixed(1)} rating ·{' '}
              {course.lessons} lessons · {course.hours} hours · Instructor: {mentor.name}
            </p>

            <h2 className="sec-title" style={{ fontSize: '1.35rem', margin: '38px 0 16px' }}>
              What Will I Learn
            </h2>
            <ul className="checklist">
              {course.learn.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>

            <h2 className="sec-title" style={{ fontSize: '1.35rem', margin: '38px 0 16px' }}>
              Curriculum
            </h2>
            {course.curriculum.map((t) => (
              <div className="topic" key={t.title}>
                <div className="topic__head">
                  <span>{t.title}</span>
                  <span className="meta mono">{t.items.length} items</span>
                </div>
                <ul>
                  {t.items.map((it) => (
                    <li key={it.name}>
                      <span className={`k${it.kind === 'assignment' ? ' k--assignment' : ''}`}>{it.kind}</span>
                      {it.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <h2 className="sec-title" style={{ fontSize: '1.35rem', margin: '38px 0 16px' }}>
              Requirements
            </h2>
            <ul className="checklist">
              {course.reqs.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>

            <h2 className="sec-title" style={{ fontSize: '1.35rem', margin: '38px 0 16px' }}>
              Reviews
            </h2>
            <div className="grid" style={{ gap: 12 }}>
              {REVIEWS.map((r) => (
                <div className="panel" key={r.name}>
                  <p style={{ fontSize: '0.94rem' }}>“{r.text}”</p>
                  <p className="meta" style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span className="rating">
                      <Star size={13} aria-hidden />
                      {r.stars}.0
                    </span>
                    — {r.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="sticky">
            <div className="panel panel--flex" style={{ borderWidth: '1.5px', borderColor: 'var(--ink)' }}>
              <span className="course-card__code" style={{ fontSize: '0.9rem' }}>
                {course.code}
              </span>
              <div className="price" style={{ fontSize: '1.8rem' }}>
                {inr(course.price)}
              </div>
              <ul className="checklist" style={{ gap: 7 }}>
                <li>{course.lessons} video lessons</li>
                <li>Quizzes in every module</li>
                <li>Assignments with mentor feedback</li>
                <li>Counts toward real-project allocation</li>
              </ul>
              {enrolled ? (
                <>
                  <div
                    className="meter"
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`Progress ${progress}%`}
                  >
                    <i style={{ transform: `scaleX(${progress / 100})` }} />
                  </div>
                  <p className="meta mono">{progress}% complete</p>
                  <Link className="btn btn--block" to="/dashboard">
                    Continue in Dashboard
                  </Link>
                </>
              ) : (
                <>
                  <button className="btn btn--block" onClick={buy}>
                    Buy Now — {inr(course.price)}
                  </button>
                  <p className="meta" style={{ textAlign: 'center' }}>
                    Secure checkout · Razorpay (preview)
                  </p>
                </>
              )}
            </div>
          </aside>
        </div>
      </div>

      {checkout && (
        <Modal onClose={() => setCheckout(false)}>
          <h3>Checkout</h3>
          <div className="orow">
            <span>{course.title}</span>
            <span className="price">{inr(course.price)}</span>
          </div>
          <div className="orow">
            <span>Payment method</span>
            <span>Razorpay · UPI / Card</span>
          </div>
          <div className="orow orow--total">
            <span>Total</span>
            <span className="price">{inr(course.price)}</span>
          </div>
          <div className="note" style={{ margin: '16px 0' }}>
            Preview build — no money moves and no card details are asked for. The production site takes real ₹ payments
            through Razorpay.
          </div>
          <button className="btn btn--block" onClick={pay}>
            Simulate successful payment
          </button>
        </Modal>
      )}
    </section>
  );
}
