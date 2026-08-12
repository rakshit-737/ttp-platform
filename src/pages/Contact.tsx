import { useState } from 'react';
import type { FormEvent } from 'react';
import { useStore } from '../store';

export default function Contact() {
  const { addEntry, toast } = useStore();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    addEntry(form);
    setForm({ name: '', email: '', phone: '', message: '' });
    toast('Message sent. TTP replies to your email within a working day.');
  };

  return (
    <section className="sec">
      <div className="wrap" style={{ maxWidth: 660 }}>
        <div className="sec__head">
          <h2 className="sec-title">Contact TTP</h2>
          <p className="dataline">
            Phone 9109563282 · Email teachertrainingprogramme3@gmail.com · Location Bhopal, Madhya Pradesh, India
          </p>
        </div>
        <form className="panel form-stack" onSubmit={submit}>
          <label className="field">
            Name
            <input required autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </label>
          <label className="field">
            Email
            <input
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>
          <label className="field">
            Phone
            <input
              type="tel"
              required
              autoComplete="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </label>
          <label className="field">
            Message
            <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          </label>
          <button className="btn" type="submit">
            Submit
          </button>
          <p className="meta">
            Messages go to teachertrainingprogramme3@gmail.com. (Preview build: your message is saved in this browser
            only.)
          </p>
        </form>
      </div>
    </section>
  );
}
