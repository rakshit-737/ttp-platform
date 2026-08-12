import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Course } from '../types';

export const inr = (n: number) => '₹' + n.toLocaleString('en-IN');

export default function CourseCard({ course }: { course: Course }) {
  return (
    <article className="course-card">
      <div className="course-card__top">
        <span className="course-card__code">{course.code}</span>
        <span className="course-card__cat">{course.category}</span>
      </div>
      <h3>
        <Link to={`/course/${course.id}`}>{course.title}</Link>
      </h3>
      <p className="ex">{course.excerpt}</p>
      <div className="course-card__row">
        <span className="rating" aria-label={`Rated ${course.rating.toFixed(1)} out of 5`}>
          <Star size={13} aria-hidden />
          {course.rating.toFixed(1)}
        </span>
        <span>
          {course.hours}h · {course.level}
        </span>
      </div>
      <div className="course-card__row" style={{ borderTop: 'none', paddingTop: 0 }}>
        <span className="price">{inr(course.price)}</span>
        <Link className="btn btn--ghost btn--sm" to={`/course/${course.id}`}>
          View Course
        </Link>
      </div>
    </article>
  );
}
