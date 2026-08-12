import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store';

export default function Auth({ mode }: { mode: 'login' | 'register' }) {
  const isReg = mode === 'register';
  const { login, seedDemo, toast } = useStore();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const finalName = isReg ? name : email.split('@')[0] || 'Participant';
    login(finalName.charAt(0).toUpperCase() + finalName.slice(1), email);
    toast(isReg ? 'Account created — welcome to TTP.' : 'Logged in.');
    navigate('/dashboard');
  };

  return (
    <section className="sec sec--wash" style={{ minHeight: '62vh' }}>
      <div className="wrap">
        <div className="auth-card">
          <h2 className="sec-title" style={{ marginBottom: 4 }}>
            {isReg ? 'Get Started' : 'Login'}
          </h2>
          <p className="meta" style={{ marginBottom: 20 }}>
            {isReg ? 'Create your TTP participant account.' : 'Welcome back to TTP.'}
          </p>
          <form className="form-stack" onSubmit={submit}>
            {isReg && (
              <label className="field">
                Full name
                <input required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
              </label>
            )}
            <label className="field">
              Email
              <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label className="field">
              Password
              <input
                type="password"
                required
                minLength={4}
                autoComplete={isReg ? 'new-password' : 'current-password'}
                value={pw}
                onChange={(e) => setPw(e.target.value)}
              />
            </label>
            <button className="btn btn--block" type="submit">
              {isReg ? 'Create account' : 'Login'}
            </button>
          </form>
          <p className="meta" style={{ margin: '16px 0 10px', textAlign: 'center' }}>
            {isReg ? (
              <>
                Already have an account? <Link to="/login">Login</Link>
              </>
            ) : (
              <>
                New to TTP? <Link to="/register">Get Started</Link>
              </>
            )}
          </p>
          <hr style={{ border: 'none', borderTop: '1px solid var(--line)', margin: '14px 0' }} />
          <button
            className="btn btn--ghost btn--block"
            onClick={() => {
              seedDemo();
              toast('Demo participant loaded.');
              navigate('/dashboard');
            }}
          >
            Preview as demo participant
          </button>
          <p className="meta" style={{ marginTop: 10, textAlign: 'center' }}>
            Loads a sample account with a course in progress and a live project allocation.
          </p>
        </div>
      </div>
    </section>
  );
}
