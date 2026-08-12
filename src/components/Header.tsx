import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
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
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onPress = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.hdr')) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onPress);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onPress);
    };
  }, [open]);

  return (
    <header className="hdr">
      <a
        className="skip-link"
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('main')?.focus();
        }}
      >
        Skip to content
      </a>
      <div className="wrap hdr__in">
        <Link className="brand" to="/">
          <span className="brand__mark">TTP</span>
          <span className="brand__word">Teacher Training Programme</span>
        </Link>
        <button
          className="menu-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
        </button>
        <nav className={`nav${open ? ' open' : ''}`} id="primary-nav" aria-label="Primary">
          <ul>
            {ITEMS.map((it) => (
              <li key={it.to}>
                <NavLink to={it.to} end={it.to === '/'} className={({ isActive }) => (isActive ? 'active' : undefined)}>
                  {it.label}
                </NavLink>
              </li>
            ))}
            <li className="nav__auth">
              <NavLink to={state.user ? '/dashboard' : '/login'}>{state.user ? 'Dashboard' : 'Login'}</NavLink>
            </li>
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
