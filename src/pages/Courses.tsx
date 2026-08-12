import { useState } from 'react';
import CourseCard from '../components/CourseCard';
import { CATEGORIES, COURSES } from '../data/courses';

export default function Courses() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<string>('All');

  const list = COURSES.filter(
    (c) =>
      (cat === 'All' || c.category === cat) &&
      (q === '' || `${c.title} ${c.excerpt} ${c.category} ${c.code}`.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec__head">
          <h1 className="sec-title">Courses</h1>
          <p className="lede">
            Browse, search and filter. Every course is built from short video lessons, quizzes and practical
            assignments — and completing one is your ticket to a real project.
          </p>
        </div>
        <input
          className="search-input"
          type="search"
          placeholder="Search by name, code or topic…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search courses"
        />
        <div className="filterbar" role="group" aria-label="Filter by category">
          {['All', ...CATEGORIES].map((c) => (
            <button key={c} className={cat === c ? 'on' : undefined} aria-pressed={cat === c} onClick={() => setCat(c)}>
              {c}
            </button>
          ))}
        </div>
        {list.length > 0 ? (
          <div className="grid grid--3">
            {list.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        ) : (
          <p className="lede">No courses match that search yet. Clear the search to see the full catalogue.</p>
        )}
      </div>
    </section>
  );
}
