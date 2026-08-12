import { MotionConfig, motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

/* ---------------- WordsPullUp ---------------- */
interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: React.CSSProperties;
}

export const WordsPullUp = ({ text, className = '', showAsterisk = false, style }: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(' ');

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block relative"
            style={{ marginRight: isLast ? 0 : '0.25em' }}
          >
            {word}
            {showAsterisk && isLast && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]" style={{ color: '#e8720c' }}>
                *
              </span>
            )}
          </motion.span>
        );
      })}
    </div>
  );
};

/* ---------------- WordsPullUpMultiStyle ---------------- */
interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
  style?: React.CSSProperties;
}

export const WordsPullUpMultiStyle = ({ segments, className = '', style }: WordsPullUpMultiStyleProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const words: { word: string; className?: string }[] = [];
  segments.forEach((seg) => {
    seg.text.split(' ').forEach((w) => {
      if (w) words.push({ word: w, className: seg.className });
    });
  });

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-block ${w.className ?? ''}`}
          style={{ marginRight: '0.25em' }}
        >
          {w.word}
        </motion.span>
      ))}
    </div>
  );
};

/* ---------------- TTPHero ----------------
   The Prisma hero adapted to TTP's paper-and-ink identity:
   full-bleed ink panel, giant pulled-up wordmark, saffron asterisk
   footnoting the programme name, copy and CTAs bottom-right.
   No background video — the subject is coursework, not showreel. */
export const TTPHero = () => {
  return (
    <MotionConfig reducedMotion="user">
    <section className="w-full px-3 pt-3 sm:px-4 sm:pt-4">
      <div
        className="relative w-full overflow-hidden rounded-2xl md:rounded-[2rem]"
        style={{ background: '#101820', minHeight: 'min(88vh, 820px)' }}
      >
        {/* faint blueprint grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(251,250,247,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(251,250,247,0.05) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
        {/* noise overlay */}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.5] mix-blend-overlay" />
        {/* gradient overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(16,24,32,0.2), transparent 40%, rgba(0,0,0,0.35))' }}
        />

        {/* top strip */}
        <div className="absolute left-0 right-0 top-0 z-10 flex flex-wrap items-center justify-between gap-2 px-5 pt-5 sm:px-8 sm:pt-6">
          <span className="font-mono text-[10px] tracking-[0.18em] sm:text-[11px]" style={{ color: 'rgba(251,250,247,0.6)' }}>
            TEACHER TRAINING PROGRAMME
          </span>
          <span className="font-mono text-[10px] tracking-[0.18em] sm:text-[11px]" style={{ color: 'rgba(251,250,247,0.6)' }}>
            BHOPAL · MADHYA PRADESH
          </span>
        </div>

        {/* hero content — top padding keeps the wordmark clear of the mono strip on short viewports */}
        <div className="relative flex h-full min-h-[inherit] flex-col justify-end px-4 pb-4 pt-16 sm:px-6 sm:pt-20 md:px-10" style={{ minHeight: 'min(88vh, 820px)' }}>
          <div className="grid grid-cols-12 items-end gap-4">
            <div className="col-span-12 lg:col-span-7">
              <h1
                className="font-display font-extrabold leading-[0.82] tracking-[-0.06em] text-[30vw] sm:text-[26vw] lg:text-[21vw] xl:text-[19rem]"
                style={{ color: '#fbfaf7' }}
              >
                <WordsPullUp text="TTP" showAsterisk />
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="mt-1 pl-1 font-mono text-[10px] tracking-[0.14em] sm:text-[11px]"
                style={{ color: 'rgba(251,250,247,0.55)' }}
              >
                *TEACHER TRAINING PROGRAMME — FOUNDER EDUCATION, NOT JUST COURSES
              </motion.p>
            </div>

            <div className="col-span-12 flex flex-col gap-6 pb-4 lg:col-span-5 lg:pb-10">
              <div
                className="font-display text-2xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-3xl"
                style={{ color: '#fbfaf7' }}
              >
                <WordsPullUpMultiStyle
                  segments={[
                    { text: 'Learn Business. Work on' },
                    { text: 'Real Projects.', className: 'text-saffron' },
                    { text: 'Think Like a Founder.' },
                  ]}
                />
              </div>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-md text-sm sm:text-base"
                style={{ color: 'rgba(251,250,247,0.72)', lineHeight: 1.5 }}
              >
                Learn through professional courses and gain practical experience by working on real startup projects
                under expert guidance.
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-center gap-3"
              >
                <Link
                  to="/courses"
                  className="group inline-flex items-center gap-2 self-start rounded-full py-1 pl-5 pr-1 text-sm font-semibold no-underline transition-all hover:gap-3 sm:text-base"
                  style={{ background: '#fbfaf7', color: '#101820' }}
                >
                  Explore Courses
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full transition-transform group-hover:scale-110 sm:h-10 sm:w-10"
                    style={{ background: '#101820' }}
                  >
                    <ArrowRight className="h-4 w-4" style={{ color: '#e8720c' }} />
                  </span>
                </Link>
                <Link
                  to="/projects"
                  className="inline-flex items-center rounded-full border px-5 py-2.5 text-sm font-semibold no-underline sm:text-base"
                  style={{ borderColor: 'rgba(251,250,247,0.4)', color: '#fbfaf7' }}
                >
                  Explore Real Projects
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </MotionConfig>
  );
};

/* ---------------- PrismaHero (original, kept for reference/reuse) ---------------- */
const navItems = ['Our story', 'Collective', 'Workshops', 'Programs', 'Inquiries'];

const PrismaHero = () => {
  return (
    <section className="h-screen w-full">
      <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-[2rem]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
        />
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        <nav className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
          <div className="flex items-center gap-3 rounded-b-2xl bg-black px-4 py-2 sm:gap-6 md:gap-12 md:rounded-b-3xl md:px-8 lg:gap-14">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="text-[10px] transition-colors sm:text-xs md:text-sm"
                style={{ color: 'rgba(225, 224, 204, 0.8)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#E1E0CC')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(225, 224, 204, 0.8)')}
              >
                {item}
              </a>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 px-4 pb-2 sm:px-6 md:px-10">
          <div className="grid grid-cols-12 items-end gap-4">
            <div className="col-span-12 lg:col-span-8">
              <h1
                className="font-medium leading-[0.85] tracking-[-0.07em] text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw]"
                style={{ color: '#E1E0CC' }}
              >
                <WordsPullUp text="Prisma" showAsterisk />
              </h1>
            </div>

            <div className="col-span-12 flex flex-col gap-5 pb-6 lg:col-span-4 lg:pb-10">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs text-primary/70 sm:text-sm md:text-base"
                style={{ lineHeight: 1.2 }}
              >
                Prisma is a worldwide network of visual artists, filmmakers and storytellers bound not by place, status
                or labels but by passion and hunger to unlock potential through our unique perspectives.
              </motion.p>

              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="group inline-flex items-center gap-2 self-start rounded-full bg-primary py-1 pl-5 pr-1 text-sm font-medium text-black transition-all hover:gap-3 sm:text-base"
              >
                Join the lab
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
                  <ArrowRight className="h-4 w-4" style={{ color: '#E1E0CC' }} />
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { PrismaHero };
