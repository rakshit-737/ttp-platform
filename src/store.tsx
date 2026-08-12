import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type { AppState, ContactEntry, TaskRecord } from './types';
import { PROJECTS } from './data/projects';

const BLANK: AppState = {
  user: null,
  enrolled: [],
  progress: {},
  allocated: [],
  projProgress: {},
  tasks: {},
  qa: [],
  entries: [],
};

const KEY = 'ttp-state-v2';

function load(): AppState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return BLANK;
    return { ...BLANK, ...(JSON.parse(raw) as Partial<AppState>) };
  } catch {
    return BLANK;
  }
}

interface Store {
  state: AppState;
  toast: (msg: string) => void;
  login: (name: string, email: string) => void;
  logout: () => void;
  seedDemo: () => void;
  enroll: (courseId: string) => void;
  bumpProgress: (courseId: string) => number;
  allocate: (projectId: string) => void;
  submitTask: (taskId: string, submission: string) => void;
  sendQa: (text: string) => void;
  addEntry: (entry: ContactEntry) => void;
}

const Ctx = createContext<Store | null>(null);

export function useStore(): Store {
  const s = useContext(Ctx);
  if (!s) throw new Error('useStore outside provider');
  return s;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(load);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* private mode — state stays in memory */
    }
  }, [state]);

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToastMsg(null), 2800);
  }, []);

  const login = useCallback((name: string, email: string) => {
    setState((s) => ({ ...s, user: { name, email } }));
  }, []);

  const logout = useCallback(() => setState({ ...BLANK }), []);

  const seedDemo = useCallback(() => {
    setState({
      user: { name: 'Demo Participant', email: 'demo@ttp.in' },
      enrolled: ['startup-fundamentals', 'digital-marketing'],
      progress: { 'startup-fundamentals': 100, 'digital-marketing': 60 },
      allocated: ['abc-edtech'],
      projProgress: { 'abc-edtech': 45 },
      tasks: {
        t1: {
          status: 'approved',
          submission:
            'Compared BYJU’S, Unacademy, Vedantu, Physics Wallah and Toppr on pricing tiers and channel mix. Sheet attached.',
          feedback:
            'Good coverage of all five competitors. Sharpen the pricing comparison into one table and add each brand’s main acquisition channel.',
          marks: '8 / 10',
        },
        t2: {
          status: 'submitted',
          submission: 'Surveyed 12 parents; main blocker is unclear pricing on the website. Summary attached.',
        },
      },
      qa: [
        { from: 'me', text: 'Sir, for the marketing plan should I focus on paid ads or organic first?' },
        {
          from: 'mentor',
          text: 'Start organic — the site’s conversion problem must be fixed before paying for traffic. Bring your funnel sketch to Friday’s session.',
        },
      ],
      entries: [],
    });
  }, []);

  const enroll = useCallback((courseId: string) => {
    setState((s) => ({
      ...s,
      enrolled: s.enrolled.includes(courseId) ? s.enrolled : [...s.enrolled, courseId],
      progress: courseId in s.progress ? s.progress : { ...s.progress, [courseId]: 0 },
    }));
  }, []);

  const bumpProgress = useCallback(
    (courseId: string) => {
      let next = 0;
      setState((s) => {
        next = Math.min(100, (s.progress[courseId] ?? 0) + 10);
        return { ...s, progress: { ...s.progress, [courseId]: next } };
      });
      return next;
    },
    [],
  );

  const allocate = useCallback((projectId: string) => {
    setState((s) => ({
      ...s,
      user: s.user ?? { name: 'Participant', email: '' },
      allocated: s.allocated.includes(projectId) ? s.allocated : [...s.allocated, projectId],
      projProgress: projectId in s.projProgress ? s.projProgress : { ...s.projProgress, [projectId]: 5 },
    }));
  }, []);

  const submitTask = useCallback((taskId: string, submission: string) => {
    setState((s) => {
      const rec: TaskRecord = { status: 'submitted', submission };
      const proj = PROJECTS.find((p) => p.tasks.some((t) => t.id === taskId));
      const projProgress = proj
        ? { ...s.projProgress, [proj.id]: Math.min(100, (s.projProgress[proj.id] ?? 0) + 15) }
        : s.projProgress;
      return { ...s, tasks: { ...s.tasks, [taskId]: rec }, projProgress };
    });
  }, []);

  const sendQa = useCallback((text: string) => {
    setState((s) => ({ ...s, qa: [...s.qa, { from: 'me', text }] }));
  }, []);

  const addEntry = useCallback((entry: ContactEntry) => {
    setState((s) => ({ ...s, entries: [...s.entries, entry] }));
  }, []);

  const value = useMemo(
    () => ({ state, toast, login, logout, seedDemo, enroll, bumpProgress, allocate, submitTask, sendQa, addEntry }),
    [state, toast, login, logout, seedDemo, enroll, bumpProgress, allocate, submitTask, sendQa, addEntry],
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      {toastMsg && (
        <div className="toast" role="status">
          {toastMsg}
        </div>
      )}
    </Ctx.Provider>
  );
}
