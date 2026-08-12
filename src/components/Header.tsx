import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { useStore } from '../store';

const ITEMS = [
  { to: '/', label: 'Home' },
  { to: '/courses', label: 'Courses' },
  { to: '/projects', label: 'Real Projects' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/mentors', label: 'Mentors' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const { state } = useStore();
  const [open, setOpen] = useState(false);

  return (
    <header className="hdr">
      <div className="wrap hdr__in">
        <Link className="brand" to="/">
          <span className="brand__mark">TTP</span>
          <span>Teacher Training Programme</span>
        </Link>
        <button
          className="menu-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
        </button>
        <nav className={`nav${open ? ' open' : ''}`} aria-label="Primary">
          <ul>
            {ITEMS.map((it) => (
              <li key={it.to}>
                <NavLink
                  to={it.to}
                  end={it.to === '/'}
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
                  onClick={() => setOpen(false)}
                >
                  {it.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hdr__cta">
          {state.user ? (
            <>
              <Link className="hdr__login" to="/dashboard">
                Dashboard
              </Link>
              <Link className="btn btn--sm" to="/dashboard">
                {state.user.name.split(' ')[0]}
              </Link>
            </>
          ) : (
            <>
              <Link className="hdr__login" to="/login">
                Login
              </Link>
              <Link className="btn btn--sm" to="/register">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
