import React, { useState, useEffect } from 'react';
import { 
  Sun, Moon, Code2, Users, User, ShieldCheck, CheckCircle2, 
  Clock, GitPullRequest, GitBranch, ArrowRight, Check, X,
  ExternalLink, Terminal, Sparkles, Filter, ChevronDown, 
  Award, Play, Pause, RotateCcw, FastForward, CheckCheck, Lock, AlertCircle, RefreshCw,
  Star, GraduationCap, TrendingUp, Briefcase, Building2, DollarSign, Sliders, Calendar, FileCheck, Share2
} from 'lucide-react';

const LinkedInIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.68 1.68 0 0 0-1.68 1.68c0 .93.75 1.69 1.68 1.69a1.69 1.69 0 0 0 1.69-1.69c0-.93-.76-1.68-1.69-1.68Z" />
  </svg>
);

// --- DATA STRUCTURES ---

const DURATION_FILTERS = [
  { id: 'all', label: 'All Durations', count: 6 },
  { id: '1-month', label: '⚡ 1 Month (Fast-Track)', count: 2 },
  { id: '2-month', label: '🚀 2 Months (Standard)', count: 2 },
  { id: '6-month', label: '🏆 6 Months (Enterprise Mastery)', count: 2 },
];

const PROGRAMS = [
  {
    id: 1,
    title: 'Fullstack Microservices & REST API',
    duration: '1-month',
    durationLabel: '1 Month Sprint',
    mode: 'Solo & Group',
    desc: 'Construct and containerize resilient REST APIs with JWT session rotation, rate-limiting, and PostgreSQL under intensive trainer review.',
    tech: ['Node.js', 'TypeScript', 'Docker', 'PostgreSQL'],
    trainer: { name: 'Marcus Shaw', role: 'Staff API Architect', initials: 'MS' },
    color: 'from-amber-500/20 to-orange-500/20',
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30'
  },
  {
    id: 2,
    title: 'Next.js 15 & React Enterprise SaaS',
    duration: '2-month',
    durationLabel: '2 Months Foundation',
    mode: 'Solo & Group',
    desc: 'Build a production multi-tenant SaaS with React Server Components, Stripe billing, Supabase authentication, and strict weekly code critiques.',
    tech: ['Next.js 15', 'React', 'Supabase', 'Tailwind CSS'],
    trainer: { name: 'Elena Lin', role: 'Frontend Lead', initials: 'EL' },
    color: 'from-blue-500/20 to-indigo-500/20',
    badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30'
  },
  {
    id: 3,
    title: 'Cloud Native DevOps & Kubernetes',
    duration: '6-month',
    durationLabel: '6 Months Deep Mastery',
    mode: 'Group Recommended',
    desc: 'Multi-region enterprise infrastructure: Terraform IaC, AWS ECS/EKS clusters, CI/CD automated test pipelines, and Prometheus monitoring.',
    tech: ['Kubernetes', 'AWS', 'Terraform', 'Helm'],
    trainer: { name: 'Rohan Verma', role: 'DevOps Architect', initials: 'RV' },
    color: 'from-emerald-500/20 to-teal-500/20',
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
  },
  {
    id: 4,
    title: 'Generative AI & LLM Agent Systems',
    duration: '1-month',
    durationLabel: '1 Month Sprint',
    mode: 'Solo Track',
    desc: 'Develop autonomous LLM workflows, RAG pipelines with Pinecone vector search, and custom tool-calling agents deployed via FastAPI.',
    tech: ['Python', 'LangChain', 'Pinecone', 'FastAPI'],
    trainer: { name: 'Dr. Aanya Kapoor', role: 'AI Research Trainer', initials: 'AK' },
    color: 'from-purple-500/20 to-violet-500/20',
    badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30'
  },
  {
    id: 5,
    title: 'Cybersecurity & Ethical Penetration Testing',
    duration: '2-month',
    durationLabel: '2 Months Foundation',
    mode: 'Solo & Group',
    desc: 'Hands-on network vulnerability probing, OWASP Top 10 mitigation, secure code auditing, and mentor-evaluated exploit defense reports.',
    tech: ['Wireshark', 'Burp Suite', 'Linux', 'OWASP'],
    trainer: { name: 'Thomas Nguyen', role: 'InfoSec Trainer', initials: 'TN' },
    color: 'from-red-500/20 to-rose-500/20',
    badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30'
  },
  {
    id: 6,
    title: 'Cross-Platform Fintech (Flutter & Go)',
    duration: '6-month',
    durationLabel: '6 Months Deep Mastery',
    mode: 'Group Track',
    desc: 'Design a high-concurrency mobile banking app with Bloc architecture, real-time WebSockets, Go microservices, and gRPC endpoints.',
    tech: ['Flutter', 'Dart', 'Golang', 'gRPC'],
    trainer: { name: 'Sofia Zhang', role: 'Mobile Systems Lead', initials: 'SZ' },
    color: 'from-cyan-500/20 to-sky-500/20',
    badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30'
  }
];

const CODE_DIFFS = {
  'auth.middleware.ts': {
    lang: 'TypeScript',
    path: 'src / middleware / auth.middleware.ts',
    lines: [
      { num: 18, sign: ' ', type: 'ctx', text: 'export async function verifySession(req: Request, res: Response) {' },
      { num: 19, sign: '-', type: 'del', text: '  const token = req.cookies["session_token"]; // vulnerable to stale cookies' },
      { num: 19, sign: '+', type: 'add', text: '  const authHeader = req.headers.authorization;' },
      { num: 20, sign: '+', type: 'add', text: '  if (!authHeader?.startsWith("Bearer ")) return res.status(401).json({ error: "Missing token" });' },
      { num: 21, sign: '+', type: 'add', text: '  const token = authHeader.split(" ")[1];' },
      { num: 22, sign: '+', type: 'add', text: '  const decoded = await verifyJwtAndCheckRedisBlacklist(token);' },
      { num: 23, sign: ' ', type: 'ctx', text: '  req.user = decoded;' },
      { num: 24, sign: ' ', type: 'ctx', text: '  return next();' },
      { num: 25, sign: ' ', type: 'ctx', text: '}' }
    ]
  },
  'db.connection.ts': {
    lang: 'TypeScript',
    path: 'src / database / db.connection.ts',
    lines: [
      { num: 10, sign: ' ', type: 'ctx', text: 'export const pool = new Pool({' },
      { num: 11, sign: '-', type: 'del', text: '  max: 10, idleTimeoutMillis: 5000' },
      { num: 11, sign: '+', type: 'add', text: '  max: 25, idleTimeoutMillis: 30000, connectionTimeoutMillis: 2000,' },
      { num: 12, sign: '+', type: 'add', text: '  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: true } : false' },
      { num: 13, sign: ' ', type: 'ctx', text: '});' }
    ]
  },
  'auth.test.ts': {
    lang: 'Jest',
    path: 'tests / unit / auth.test.ts',
    lines: [
      { num: 1, sign: '+', type: 'add', text: 'describe("AuthMiddleware Security Suite", () => {' },
      { num: 2, sign: '+', type: 'add', text: '  it("should reject requests with blacklisted tokens in Redis", async () => {' },
      { num: 3, sign: '+', type: 'add', text: '    const res = await request(app).get("/api/v1/protected").set("Authorization", "Bearer revoked");' },
      { num: 4, sign: '+', type: 'add', text: '    expect(res.status).toBe(401);' },
      { num: 5, sign: '+', type: 'add', text: '  });' },
      { num: 6, sign: '+', type: 'add', text: '});' }
    ]
  }
};

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [activeDuration, setActiveDuration] = useState('all');
  const [heroActiveRole, setHeroActiveRole] = useState('individual');
  const [selectedFile, setSelectedFile] = useState('auth.middleware.ts');
  const [prStatus, setPrStatus] = useState('pending'); // 'pending' | 'approved' | 'rejected'
  const [rubric, setRubric] = useState({
    arch: false,
    sec: false,
    tests: false,
    docs: false
  });
  const [feedbackNote, setFeedbackNote] = useState('');
  const [authModalRole, setAuthModalRole] = useState(null); // null | 'individual' | 'group' | 'trainer' | 'admin'
  const [activePortalTab, setActivePortalTab] = useState('trainer');
  const [toast, setToast] = useState(null);

  // --- TRAINER CONSOLE CONTINUOUS LIVE VIDEO / ARROW DEMO ENGINE ---
  const [simRunning, setSimRunning] = useState(true);
  const [simSpeed, setSimSpeed] = useState(1); // 1, 1.5, 2
  const [simTimer, setSimTimer] = useState(0); // 0 to 18000 ms
  const [isManualMode, setIsManualMode] = useState(false);
  const [clickEffect, setClickEffect] = useState(false);

  const FULL_CYCLE = 22000;
  const FULL_FEEDBACK = 'Excellent job implementing Redis blacklist validation and rotating tokens cleanly. All unit tests pass with zero regressions.';

  // Continuous loop timer
  useEffect(() => {
    if (!simRunning || isManualMode) return;
    const interval = setInterval(() => {
      setSimTimer((prev) => {
        const next = prev + 100 * simSpeed;
        return next >= FULL_CYCLE ? 0 : next;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [simRunning, simSpeed, isManualMode]);

  // Synchronize simulation timeline with console visual state
  useEffect(() => {
    if (isManualMode) return;

    // Trigger brief click pulse on milestone interactions
    const clickPoints = [2000, 4200, 8400, 9600, 10800, 12000, 16000];
    const isClicking = clickPoints.some(pt => Math.abs(simTimer - pt) < 170);
    setClickEffect(isClicking);

    if (simTimer < 2000) {
      // Phase 0: Reset & file 1
      setPrStatus('pending');
      setSelectedFile('auth.middleware.ts');
      setRubric({ arch: false, sec: false, tests: false, docs: false });
      setFeedbackNote('');
    } else if (simTimer < 4000) {
      // Phase 1: Switch to db.connection.ts
      setSelectedFile('db.connection.ts');
    } else if (simTimer < 5200) {
      // Phase 2: Back to auth.middleware.ts
      setSelectedFile('auth.middleware.ts');
    } else if (simTimer < 8000) {
      // Phase 3: Code diff scan
      setSelectedFile('auth.middleware.ts');
    } else if (simTimer < 9200) {
      // Phase 4a: Rubric 1 checked
      setRubric(r => ({ ...r, arch: true }));
    } else if (simTimer < 10400) {
      // Phase 4b: Rubric 2 checked
      setRubric(r => ({ ...r, arch: true, sec: true }));
    } else if (simTimer < 11600) {
      // Phase 4c: Rubric 3 checked
      setRubric(r => ({ ...r, arch: true, sec: true, tests: true }));
    } else if (simTimer < 12800) {
      // Phase 4d: Rubric 4 checked
      setRubric({ arch: true, sec: true, tests: true, docs: true });
    } else if (simTimer < 15400) {
      // Phase 5: Typewriter remarks
      const typePct = Math.min(1, Math.max(0, (simTimer - 12800) / 2400));
      const charCount = Math.floor(typePct * FULL_FEEDBACK.length);
      setFeedbackNote(FULL_FEEDBACK.substring(0, charCount));
    } else if (simTimer < 16200) {
      // Pre-approval
      setFeedbackNote(FULL_FEEDBACK);
    } else {
      // Phase 6: Code Approved, celebration & holographic certificate display!
      setPrStatus('approved');
      setRubric({ arch: true, sec: true, tests: true, docs: true });
      setFeedbackNote(FULL_FEEDBACK);
    }
  }, [simTimer, isManualMode]);

  // Compute animated virtual cursor coordinates and label
  const getSimCursor = () => {
    if (simTimer < 2000) {
      return { x: 13, y: 28, label: 'Inspecting auth.middleware.ts (+24 lines)' };
    } else if (simTimer < 4000) {
      return { x: 13, y: 35, label: 'Checking db.connection.ts (+12 lines)' };
    } else if (simTimer < 5200) {
      return { x: 13, y: 28, label: 'Returning to auth.middleware.ts' };
    } else if (simTimer < 6600) {
      return { x: 48, y: 36, label: '🔍 Scanning OWASP Bearer Token Sanitization (Pass)' };
    } else if (simTimer < 8000) {
      return { x: 52, y: 45, label: '⚡ Validating Redis JWT Blacklist Logic (Pass)' };
    } else if (simTimer < 9200) {
      return { x: 78, y: 31, label: 'Checking Clean Architecture Rubric ✓' };
    } else if (simTimer < 10400) {
      return { x: 78, y: 38, label: 'Checking Security & OWASP Rubric ✓' };
    } else if (simTimer < 11600) {
      return { x: 78, y: 45, label: 'Checking Unit & Integration Tests (14/14 Pass) ✓' };
    } else if (simTimer < 12800) {
      return { x: 78, y: 52, label: 'Checking Documentation & PR Description ✓' };
    } else if (simTimer < 15400) {
      return { x: 80, y: 68, label: '✍️ Writing Senior Trainer Feedback Notes...' };
    } else if (simTimer < 16400) {
      return { x: 80, y: 92, label: '🚀 Confirming Code Approval & Issuing Credential...' };
    } else {
      return { x: 50, y: 50, label: '🎉 PR #204 Approved! Verified Certificate Issued' };
    }
  };

  const cursorInfo = getSimCursor();
  const simProgressPct = Math.min(100, Math.round((simTimer / FULL_CYCLE) * 100));

  const jumpToPhase = (phase) => {
    setIsManualMode(false);
    setSimRunning(true);
    if (phase === 'files') setSimTimer(500);
    else if (phase === 'diff') setSimTimer(5300);
    else if (phase === 'rubric') setSimTimer(8100);
    else if (phase === 'remarks') setSimTimer(12900);
    else if (phase === 'approve') setSimTimer(15500);
  };

  // Sync theme class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    showToast(`Switched to ${nextTheme.toUpperCase()} mode`, 'info');
  };

  const handleApproveCode = () => {
    setIsManualMode(true);
    setPrStatus('approved');
    setRubric({ arch: true, sec: true, tests: true, docs: true });
    setFeedbackNote(FULL_FEEDBACK);
    showToast('🎉 Code approved by Trainer Dr. David Keller! PR Merged & Verified Certificate Issued.', 'success');
  };

  const handleRequestChanges = () => {
    setIsManualMode(true);
    setPrStatus('rejected');
    showToast('⚠️ Changes requested. Trainer remarks sent back to student Aarav Sharma.', 'info');
  };

  const filteredPrograms = activeDuration === 'all' 
    ? PROGRAMS 
    : PROGRAMS.filter(p => p.duration === activeDuration);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0d14] text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans relative selection:bg-indigo-500 selection:text-white">
      
      {/* Dynamic Ambient Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-[120px] animate-glow" />
        <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-600/10 rounded-full blur-[130px] animate-glow" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-10 left-10 w-[550px] h-[550px] bg-cyan-500/10 dark:bg-cyan-600/10 rounded-full blur-[140px] animate-glow" style={{ animationDelay: '5s' }} />
      </div>

      {/* ==========================================================================
          NAVBAR
          ========================================================================== */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-[#0a0d14]/80 border-b border-slate-200/80 dark:border-white/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group flex-shrink-0 mr-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <Code2 className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white font-heading">
              Nexus<span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">Intern</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            <a href="#durations" className="whitespace-nowrap text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Internship Tracks
            </a>
            <a href="#roles" className="whitespace-nowrap text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Roles & Portals
            </a>
            <a href="#codeReviewStudio" className="whitespace-nowrap text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Trainer Review Demo
            </a>
            <a href="#portalSimulator" className="whitespace-nowrap text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Live Dashboards
            </a>
            <a href="#workflow" className="whitespace-nowrap text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              How It Works
            </a>
          </nav>

          {/* Nav Actions */}
          <div className="flex items-center gap-3">
            {/* Dark / Light Mode Switcher */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Dark and Light Mode"
              className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-white/10 transition-all hover:rotate-12 cursor-pointer"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
            </button>

            {/* Switch Role / Login Button */}
            <button
              onClick={() => setAuthModalRole('individual')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-white/10 hover:border-indigo-500/40 transition-all cursor-pointer"
            >
              <User className="w-4 h-4 text-indigo-500" />
              Switch Role / Login
            </button>

            {/* Main CTA */}
            <a
              href="#durations"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              Explore Tracks
            </a>
          </div>
        </div>
      </header>

      {/* ==========================================================================
          HERO SECTION
          ========================================================================== */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Hero Text */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Pulse Announcement Pill */}
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span>Cohort 2026 Open • Flexible 1, 2 & 6 Month Durations</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                Build Real Software. <br />
                Get Code Approved by <br />
                <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Elite Industry Trainers.
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                The premier online internship platform with dedicated portals for <strong>Individual Students</strong>, <strong>Collaborative Groups</strong>, <strong>Trainers</strong>, and <strong>Admins</strong>. Submit PRs, receive line-by-line code reviews, and earn verifiable certifications.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#durations"
                  className="px-6 py-3.5 rounded-xl text-base font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:-translate-y-0.5 transition-all flex items-center gap-2 group"
                >
                  <span>Apply for Online Internship</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="#codeReviewStudio"
                  className="px-6 py-3.5 rounded-xl text-base font-semibold bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 hover:border-indigo-500/40 transition-all flex items-center gap-2 shadow-sm"
                >
                  <Play className="w-4 h-4 text-indigo-500 fill-indigo-500" />
                  <span>Trainer Review Demo</span>
                </a>
              </div>

              {/* Key Metrics / Highlights */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200 dark:border-white/10">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
                    1, 2, 6 <span className="text-sm text-indigo-500 font-semibold">Mo</span>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
                    Custom Durations
                  </div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
                    4 Roles
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
                    Student, Group, Trainer, Admin
                  </div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-500 dark:text-emerald-400 font-heading">
                    100%
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
                    Verified Code Approvals
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Interactive Role Preview Card */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-3xl bg-white/90 dark:bg-[#111726]/90 border border-slate-200/90 dark:border-white/10 backdrop-blur-xl shadow-2xl relative group">
                
                {/* Header with terminal dots */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                    <span className="ml-2 text-xs font-mono text-slate-500 dark:text-slate-400">nexus-ecosystem.sh</span>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    ● Real-Time Sync
                  </span>
                </div>

                {/* Role Switcher Tabs */}
                <div className="grid grid-cols-2 gap-2 mb-5">
                  {[
                    { id: 'individual', icon: User, label: 'Individual', desc: 'Solo roadmap' },
                    { id: 'group', icon: Users, label: 'Group / Team', desc: 'Collaborative repo' },
                    { id: 'trainer', icon: Code2, label: 'Trainer', desc: 'Review & approve' },
                    { id: 'admin', icon: ShieldCheck, label: 'Admin', desc: 'Cohorts & certs' }
                  ].map(tab => {
                    const Icon = tab.icon;
                    const isActive = heroActiveRole === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setHeroActiveRole(tab.id)}
                        className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                          isActive 
                            ? 'bg-indigo-50 dark:bg-indigo-500/15 border-indigo-500/50 shadow-sm' 
                            : 'bg-slate-50 dark:bg-white/5 border-slate-200/70 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'}`} />
                          <span>{tab.label}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          {tab.desc}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Dynamic Role Snapshot Preview */}
                <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 font-mono text-xs space-y-3">
                  <div className="flex items-center justify-between text-slate-400 text-[11px]">
                    <span className="font-semibold text-indigo-400">
                      {heroActiveRole === 'individual' && 'PR #1042: Token Rate Limiter'}
                      {heroActiveRole === 'group' && 'Team Alpha Sprint: Stripe Webhooks'}
                      {heroActiveRole === 'trainer' && 'Trainer Queue: 3 PRs Waiting'}
                      {heroActiveRole === 'admin' && 'Cohort 2026-B: Verified Cert Key'}
                    </span>
                    <span className="text-emerald-400">✓ CI Passing</span>
                  </div>

                  <div className="p-3 rounded-lg bg-black/60 border border-white/5 overflow-x-auto text-[11px] leading-relaxed">
                    {heroActiveRole === 'individual' && (
                      <>
                        <span className="text-slate-500">// Individual 2-Month Milestone</span>
                        <div className="text-emerald-400">+ const rateLimiter = new RateLimiter(&#123; windowMs: 900000 &#125;);</div>
                        <div className="text-emerald-400">+ app.use("/api/v1/", rateLimiter);</div>
                      </>
                    )}
                    {heroActiveRole === 'group' && (
                      <>
                        <span className="text-slate-500">// Group Branch: feature/payment-gateway</span>
                        <div className="text-emerald-400">+ await db.transaction(async (tx) =&gt; &#123;</div>
                        <div className="text-emerald-400">+   await processOrderTeam(tx, event.data.object);</div>
                        <div className="text-emerald-400">+ &#125;);</div>
                      </>
                    )}
                    {heroActiveRole === 'trainer' && (
                      <>
                        <span className="text-slate-500">// Trainer Inline Code Feedback</span>
                        <div className="text-amber-300">★ Approved with distinction: clean types & 100% test coverage.</div>
                        <div className="text-slate-400">&gt; Status: Ready to Merge and issue credential.</div>
                      </>
                    )}
                    {heroActiveRole === 'admin' && (
                      <>
                        <span className="text-slate-500">// Admin Verification Audit Trail</span>
                        <div className="text-indigo-300">&#123; "certId": "NEXUS-2026-904", "status": "ISSUED" &#125;</div>
                        <div className="text-emerald-400">&#123; "blockchainHash": "0x7f4b8c...1a" &#125;</div>
                      </>
                    )}
                  </div>

                  {/* Reviewer Status Row */}
                  <div className="flex items-center justify-between pt-1 text-slate-300 text-[11px]">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-indigo-500 text-white font-bold flex items-center justify-center text-[10px]">
                        DK
                      </div>
                      <span>Trainer Dr. David Keller</span>
                    </div>
                    <span className="text-emerald-400 font-bold">Approved ✓</span>
                  </div>
                </div>

                {/* Quick login trigger */}
                <button
                  onClick={() => setAuthModalRole(heroActiveRole)}
                  className="w-full mt-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-600 transition-all cursor-pointer"
                >
                  Test {heroActiveRole.toUpperCase()} Portal →
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================================================
          PORTALS & ROLES ARCHITECTURE (Individual, Group, Trainer, Admin)
          ========================================================================== */}
      <section id="roles" className="py-20 bg-slate-100/60 dark:bg-white/[0.02] border-y border-slate-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border border-indigo-500/20">
              Role Ecosystem
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
              One Architecture, Four Powerful Portals
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
              Engineered for seamless collaboration: learners can work independently or in high-velocity teams, guided directly by expert trainers and monitored by portal admins.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Individual */}
            <div className="p-7 rounded-3xl bg-white dark:bg-[#111726] border border-slate-200 dark:border-white/10 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <User className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-500 mb-1">Solo Learner Track</span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Individual Student</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-grow leading-relaxed">
                Work at your personal pace with customized 1, 2, or 6-month milestones. Get direct 1-on-1 code reviews from your assigned technical trainer.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Choose 1, 2, or 6 months duration</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Direct trainer PR feedback & diff view</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Independent GitHub portfolio repository</span>
                </li>
              </ul>
              <button 
                onClick={() => setAuthModalRole('individual')}
                className="w-full py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 transition-colors cursor-pointer"
              >
                Access Individual Portal
              </button>
            </div>

            {/* Card 2: Group / Team */}
            <div className="p-7 rounded-3xl bg-white dark:bg-[#111726] border border-slate-200 dark:border-white/10 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col group">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-500 mb-1">Collaborative Track</span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Group / Team</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-grow leading-relaxed">
                Form a squad of 2 to 5 peers or get matched. Experience real Agile sprints, peer code reviews, branch merge conflicts, and team demos.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Shared Git repository & Kanban workspace</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Peer branch approvals before trainer review</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Joint final capstone defense session</span>
                </li>
              </ul>
              <button 
                onClick={() => setAuthModalRole('group')}
                className="w-full py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 transition-colors cursor-pointer"
              >
                Access Group Portal
              </button>
            </div>

            {/* Card 3: Trainer / Mentor */}
            <div className="p-7 rounded-3xl bg-white dark:bg-[#111726] border border-slate-200 dark:border-white/10 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Code2 className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-500 mb-1">Code Reviewer</span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Trainer & Mentor</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-grow leading-relaxed">
                Senior engineering mentors inspect student code diffs line-by-line, test edge cases, grade against enterprise rubrics, and approve merges.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Interactive syntax & diff inspection</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>1-Click Code Approval & certificate trigger</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Rubric grading: Arch, Security, Tests</span>
                </li>
              </ul>
              <button 
                onClick={() => setAuthModalRole('trainer')}
                className="w-full py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 transition-colors cursor-pointer"
              >
                Access Trainer Console
              </button>
            </div>

            {/* Card 4: Portal Admin */}
            <div className="p-7 rounded-3xl bg-white dark:bg-[#111726] border border-slate-200 dark:border-white/10 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col group">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-500 mb-1">Command Center</span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Portal Admin</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-grow leading-relaxed">
                Full governance: allocate trainers to cohorts, configure 1, 2, or 6-month timelines, track review turnaround SLAs, and issue digital credentials.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Cohort management & trainer assignment</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Trainer review SLA & velocity analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Cryptographically verified certificate keys</span>
                </li>
              </ul>
              <button 
                onClick={() => setAuthModalRole('admin')}
                className="w-full py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:bg-amber-600 hover:text-white dark:hover:bg-amber-600 transition-colors cursor-pointer"
              >
                Access Admin Portal
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================================================
          INTERNSHIP PROGRAMS & DURATION FILTER (1, 2, 6 MONTHS)
          ========================================================================== */}
      <section id="durations" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border border-indigo-500/20">
              Flexible Timelines
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
              Online Internships by Duration
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
              Whether you need a concentrated <strong>1-Month Fast Track</strong>, an in-depth <strong>2-Month Standard</strong>, or an intensive <strong>6-Month Enterprise Mastery</strong>, each program features verified code approvals.
            </p>
          </div>

          {/* Duration Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {DURATION_FILTERS.map(filter => {
              const isActive = activeDuration === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveDuration(filter.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/25 scale-105'
                      : 'bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-indigo-500/40'
                  }`}
                >
                  <span>{filter.label}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400'}`}>
                    {filter.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Programs Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.map(prog => (
              <div 
                key={prog.id}
                className="p-7 rounded-3xl bg-white dark:bg-[#111726] border border-slate-200 dark:border-white/10 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col group relative overflow-hidden"
              >
                {/* Duration Badge & Mode */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${prog.badgeColor}`}>
                    {prog.durationLabel}
                  </span>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    {prog.mode}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-500 transition-colors">
                  {prog.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-grow leading-relaxed">
                  {prog.desc}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {prog.tech.map((t, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/5 text-slate-700 dark:text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Footer with Trainer and Apply Button */}
                <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white font-bold flex items-center justify-center text-xs">
                      {prog.trainer.initials}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">{prog.trainer.name}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">{prog.trainer.role}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      showToast(`Applied for ${prog.title} (${prog.durationLabel})`, 'success');
                      setAuthModalRole('individual');
                    }}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-sm cursor-pointer"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==========================================================================
          TRAINER CODE REVIEW & APPROVAL STUDIO (CONTINUOUS RUNNING VIDEO DEMO)
          ========================================================================== */}
      <section id="codeReviewStudio" className="py-20 bg-slate-100/60 dark:bg-[#0e1320] border-y border-slate-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Demonstration & Continuous Arrow Walkthrough
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
              Trainer Code Review & Approval Console
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
              Watch the animated trainer cursor continuously inspect files, scan code diffs line-by-line, validate rubric checkboxes, type feedback, and approve the PR to issue the verified certificate!
            </p>
          </div>

          {/* Video Player Control Toolbar */}
          <div className="mb-4 p-3 sm:p-4 rounded-2xl bg-white dark:bg-[#111726] border border-slate-200 dark:border-white/10 shadow-lg flex flex-wrap items-center justify-between gap-3">
            
            {/* Live Indicator & Status */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-bold">
                <span className={`w-2.5 h-2.5 rounded-full ${simRunning && !isManualMode ? 'bg-rose-500 animate-ping' : 'bg-slate-400'}`} />
                <span className="text-slate-900 dark:text-white">
                  {isManualMode ? 'MANUAL TEST MODE' : simRunning ? 'LIVE VIDEO DEMO' : 'PAUSED'}
                </span>
              </div>

              <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                <span className="font-semibold text-slate-800 dark:text-slate-200">{cursorInfo.label}</span>
              </div>
            </div>

            {/* Jump-to-Phase Buttons */}
            <div className="hidden lg:flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-black/30 border border-slate-200 dark:border-white/5 text-xs">
              {[
                { id: 'files', label: '1. Files' },
                { id: 'diff', label: '2. Code Scan' },
                { id: 'rubric', label: '3. Rubrics' },
                { id: 'remarks', label: '4. Remarks' },
                { id: 'approve', label: '5. Approve & Cert' },
              ].map(phase => (
                <button
                  key={phase.id}
                  onClick={() => jumpToPhase(phase.id)}
                  className="px-2.5 py-1 rounded-lg hover:bg-white dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium transition-colors cursor-pointer"
                >
                  {phase.label}
                </button>
              ))}
            </div>

            {/* Controls: Play/Pause, Replay, Speed, Manual Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (isManualMode) {
                    setIsManualMode(false);
                    setSimRunning(true);
                  } else {
                    setSimRunning(!simRunning);
                  }
                }}
                className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/30 transition-colors cursor-pointer"
                title={simRunning && !isManualMode ? 'Pause Animation' : 'Play Continuous Animation'}
              >
                {simRunning && !isManualMode ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <button
                onClick={() => {
                  setSimTimer(0);
                  setIsManualMode(false);
                  setSimRunning(true);
                }}
                className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
                title="Restart Demonstration"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <div className="flex items-center bg-slate-100 dark:bg-white/5 rounded-xl p-0.5 border border-slate-200 dark:border-white/10 text-[11px] font-bold">
                {[1, 1.5, 2].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setSimSpeed(spd)}
                    className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                      simSpeed === spd
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>

              <button
                onClick={() => setIsManualMode(!isManualMode)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  isManualMode
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                    : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
                }`}
              >
                {isManualMode ? '▶ Resume Auto Video' : '✋ Test Manually'}
              </button>
            </div>

          </div>

          {/* Continuous Loop Scrub Bar */}
          <div className="w-full h-1.5 bg-slate-200 dark:bg-white/10 rounded-full mb-4 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 transition-all duration-100"
              style={{ width: `${simProgressPct}%` }}
            />
          </div>

          {/* Manual Mode Banner Alert */}
          {isManualMode && (
            <div className="mb-4 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>You are in <strong>Manual Control Mode</strong>. Click any file, toggle rubrics, or click Approve.</span>
              </div>
              <button
                onClick={() => {
                  setIsManualMode(false);
                  setSimRunning(true);
                }}
                className="px-2.5 py-1 rounded-lg bg-amber-500 text-white font-bold hover:bg-amber-600 transition-colors cursor-pointer text-[11px]"
              >
                Resume Auto Demo
              </button>
            </div>
          )}

          {/* The Live Review Studio Card (Relative container for cursor and popups) */}
          <div className="relative rounded-3xl bg-white dark:bg-[#111726] border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden">
            
            {/* Animated Virtual Cursor (Arrow Pointer) */}
            {!isManualMode && (
              <div 
                className="pointer-events-none absolute z-50 transition-all duration-700 ease-out flex flex-col items-start"
                style={{
                  left: `${cursorInfo.x}%`,
                  top: `${cursorInfo.y}%`,
                  transform: 'translate(-4px, -4px)',
                }}
              >
                {/* Ripple Click Effect */}
                {clickEffect && (
                  <div className="absolute -top-3 -left-3 w-12 h-12 rounded-full border-2 border-emerald-400 bg-emerald-400/20 animate-cursor-ripple pointer-events-none" />
                )}

                {/* Radar Pulse Ring */}
                <div className="absolute -top-1 -left-1 w-6 h-6 rounded-full border border-indigo-400/50 animate-radar-ring pointer-events-none" />

                {/* SVG Pointer Arrow */}
                <svg 
                  className={`w-7 h-7 drop-shadow-2xl transition-transform duration-150 ${clickEffect ? 'scale-90' : 'scale-100'}`} 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M3 3L10.07 19.97L12.58 13.58L18.97 11.07L3 3Z" 
                    fill="url(#cursorGradient)" 
                    stroke="#ffffff" 
                    strokeWidth="1.6" 
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient id="cursorGradient" x1="3" y1="3" x2="19" y2="20" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#6366f1" />
                      <stop offset="1" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Trainer Floating Label Pill with smart edge positioning */}
                <div className={`-mt-2 px-2.5 py-1 rounded-full bg-slate-900/95 dark:bg-black/90 backdrop-blur-md border border-white/20 text-white shadow-2xl flex items-center gap-2 select-none ${
                  cursorInfo.x > 65 ? '-ml-3 -translate-x-full' : 'ml-5'
                }`}>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[11px] font-bold whitespace-nowrap">
                    {cursorInfo.label}
                  </span>
                </div>
              </div>
            )}

            {/* Top Toolbar */}
            <div className="p-4 sm:p-5 bg-slate-50 dark:bg-white/[0.03] border-b border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border transition-all ${
                  prStatus === 'approved'
                    ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                    : prStatus === 'rejected'
                    ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                    : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    prStatus === 'approved' ? 'bg-emerald-400' : prStatus === 'rejected' ? 'bg-rose-400' : 'bg-amber-400 animate-pulse'
                  }`}></span>
                  <span>
                    {prStatus === 'approved' && 'PR #204: Approved & Merged by Trainer ✓'}
                    {prStatus === 'rejected' && 'PR #204: Changes Requested (Re-submission Needed)'}
                    {prStatus === 'pending' && 'PR #204: Pending Trainer Review'}
                  </span>
                </span>

                <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
                  Submitted by: <strong className="text-slate-800 dark:text-slate-200">Aarav Sharma</strong> (2-Month Fullstack Track)
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRequestChanges}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-rose-500 hover:text-white dark:hover:bg-rose-600 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Request Changes</span>
                </button>

                <button
                  onClick={handleApproveCode}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-md cursor-pointer ${
                    prStatus === 'approved'
                      ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                      : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:brightness-110 shadow-emerald-500/25'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{prStatus === 'approved' ? '✓ Approved & Certified' : 'Approve & Issue Certificate'}</span>
                </button>
              </div>
            </div>

            {/* 3-Column Studio Grid: File Tree, Diff Viewer, Reviewer Panel */}
            <div className="grid lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-white/10 min-h-[480px] relative">
              
              {/* Left Column: Files Tree (3 cols) */}
              <div className="lg:col-span-3 p-5 bg-slate-50/50 dark:bg-white/[0.01] flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
                    <span>Changed Files (3)</span>
                    <span className="text-emerald-500">+74 -6</span>
                  </div>

                  <div className="space-y-1">
                    {Object.keys(CODE_DIFFS).map(fileName => {
                      const isSelected = selectedFile === fileName;
                      return (
                        <button
                          key={fileName}
                          onClick={() => {
                            setSelectedFile(fileName);
                            setIsManualMode(true);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono flex items-center justify-between transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-500/30 shadow-sm'
                              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
                          }`}
                        >
                          <span className="truncate">{fileName}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 ml-2">
                            {fileName === 'auth.middleware.ts' ? '+24' : fileName === 'db.connection.ts' ? '+12' : '+38'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-2xl bg-white dark:bg-black/30 border border-slate-200 dark:border-white/5 text-xs space-y-2">
                  <div className="font-mono text-slate-400">
                    Commit: <span className="text-indigo-500 font-bold">8f9b2d1</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                    "Implemented Redis JWT blacklist token rotation and fixed connection pooling."
                  </p>
                  <div className="text-emerald-500 font-semibold text-[11px] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>CI Automated Tests: 14/14 Pass</span>
                  </div>
                </div>
              </div>

              {/* Center Column: Code Diff Table with Scanning Laser & Holographic Certificate (6 cols) */}
              <div className="lg:col-span-6 bg-[#090d16] text-slate-200 font-mono text-xs flex flex-col overflow-hidden relative">
                
                {/* Header info */}
                <div className="px-5 py-3 border-b border-white/10 bg-black/40 flex items-center justify-between text-slate-400 text-[11px]">
                  <span>{CODE_DIFFS[selectedFile].path}</span>
                  <div className="flex items-center gap-2">
                    {simTimer >= 4600 && simTimer < 7200 && !isManualMode && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 text-[10px] font-bold animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        Scanning AST & OWASP rules...
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded bg-white/10 text-slate-300">
                      {CODE_DIFFS[selectedFile].lang}
                    </span>
                  </div>
                </div>

                {/* Laser scan line overlay during Step 2 */}
                {simTimer >= 4600 && simTimer < 7200 && !isManualMode && (
                  <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] pointer-events-none animate-laser-scan z-20" />
                )}

                {/* Code Diff Table */}
                <div className="p-4 overflow-x-auto flex-grow leading-relaxed relative">
                  <table className="w-full border-collapse">
                    <tbody>
                      {CODE_DIFFS[selectedFile].lines.map((line, idx) => {
                        const isScannedActive = simTimer >= 4600 && simTimer < 7200 && (idx === 2 || idx === 3 || idx === 4 || idx === 5);
                        return (
                          <tr 
                            key={idx}
                            className={`transition-all duration-300 ${
                              isScannedActive
                                ? 'bg-emerald-500/30 text-emerald-200 shadow-[inset_0_0_12px_rgba(16,185,129,0.2)]'
                                : line.type === 'add'
                                ? 'bg-emerald-500/15 text-emerald-300'
                                : line.type === 'del'
                                ? 'bg-rose-500/15 text-rose-300'
                                : 'text-slate-300'
                            }`}
                          >
                            <td className="w-10 text-right pr-3 select-none text-slate-600 text-[11px] py-0.5">{line.num}</td>
                            <td className="w-4 text-center font-bold select-none text-[11px] py-0.5">{line.sign}</td>
                            <td className="pl-2 whitespace-pre py-0.5">{line.text}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Holographic Verified Certificate Popup Overlay upon Approval */}
                {prStatus === 'approved' && (
                  <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-6 z-30 animate-modal-backdrop">
                    <div className="max-w-md w-full p-6 rounded-3xl bg-gradient-to-b from-[#161d31] to-[#0c101c] border-2 border-emerald-500/40 shadow-2xl shadow-emerald-500/20 text-center space-y-4 animate-cert-stamp">
                      <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                        <Award className="w-8 h-8" />
                      </div>
                      
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                          Credential Verified & Minted
                        </span>
                        <h4 className="text-xl font-extrabold text-white mt-2 font-heading">
                          Certificate of Internship Excellence
                        </h4>
                        <p className="text-xs text-slate-400 mt-1">
                          Conferred to <strong className="text-white">Aarav Sharma</strong> for Fullstack Track
                        </p>
                      </div>

                      <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-left space-y-1 font-mono">
                        <div className="text-slate-400 flex justify-between">
                          <span>Verification Hash:</span>
                          <span className="text-emerald-400 font-bold">#NX-8F9B2D1-CERT</span>
                        </div>
                        <div className="text-slate-400 flex justify-between">
                          <span>Trainer Sign-off:</span>
                          <span className="text-slate-200">Dr. David Keller ✓</span>
                        </div>
                        <div className="text-slate-400 flex justify-between">
                          <span>Evaluation Score:</span>
                          <span className="text-emerald-400 font-bold">100% (4/4 Rubrics)</span>
                        </div>
                      </div>

                      <div className="flex gap-2 justify-center pt-2">
                        <button
                          onClick={() => showToast('📥 Certificate downloaded to local machine!', 'success')}
                          className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-colors cursor-pointer"
                        >
                          Download Verified PDF
                        </button>
                        <button
                          onClick={() => {
                            setSimTimer(0);
                            setPrStatus('pending');
                          }}
                          className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-slate-300 transition-colors cursor-pointer"
                        >
                          Replay Animation
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Right Column: Reviewer Checklist & Rubric (3 cols) */}
              <div className="lg:col-span-3 p-5 bg-slate-50/50 dark:bg-white/[0.01] flex flex-col justify-between">
                <div>
                  {/* Trainer Profile Card */}
                  <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-200 dark:border-white/10">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold flex items-center justify-center text-sm shadow-md">
                      DK
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">Dr. David Keller</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Assigned Senior Trainer</div>
                    </div>
                  </div>

                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
                    <span>Trainer Review Rubric</span>
                    <span className="text-emerald-500 text-[11px] font-mono">
                      {Object.values(rubric).filter(Boolean).length}/4 Checked
                    </span>
                  </div>

                  {/* Rubric Checkboxes */}
                  <div className="space-y-2 mb-5">
                    {[
                      { key: 'arch', label: 'Clean Architecture & TypeScript Types' },
                      { key: 'sec', label: 'Security & OWASP Sanitization' },
                      { key: 'tests', label: 'Unit & Integration Tests Pass (100%)' },
                      { key: 'docs', label: 'Documentation & PR Description' }
                    ].map(item => (
                      <label 
                        key={item.key}
                        className={`flex items-start gap-2.5 text-xs p-1.5 rounded-lg transition-colors cursor-pointer select-none ${
                          rubric[item.key] ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={rubric[item.key]}
                          onChange={(e) => {
                            setIsManualMode(true);
                            setRubric({ ...rubric, [item.key]: e.target.checked });
                          }}
                          className="mt-0.5 w-4 h-4 rounded text-indigo-600 border-slate-300 dark:border-white/20 focus:ring-indigo-500 cursor-pointer"
                        />
                        <span>{item.label}</span>
                      </label>
                    ))}
                  </div>

                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
                    <span>Trainer Remarks</span>
                    {simTimer >= 11700 && simTimer < 13800 && !isManualMode && (
                      <span className="text-indigo-400 text-[10px] animate-pulse">Typing live...</span>
                    )}
                  </div>
                  <textarea
                    value={feedbackNote}
                    onChange={(e) => {
                      setIsManualMode(true);
                      setFeedbackNote(e.target.value);
                    }}
                    rows={3}
                    className={`w-full p-2.5 rounded-xl text-xs bg-white dark:bg-black/30 border text-slate-800 dark:text-slate-200 focus:outline-none resize-none transition-all ${
                      simTimer >= 11700 && simTimer < 13800 && !isManualMode
                        ? 'border-indigo-500 ring-2 ring-indigo-500/30'
                        : 'border-slate-200 dark:border-white/10'
                    }`}
                    placeholder="Enter mentor remarks..."
                  />
                </div>

                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/10">
                  <button
                    onClick={handleApproveCode}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer ${
                      simTimer >= 13800 && simTimer < 14400 && !isManualMode
                        ? 'bg-emerald-500 text-white scale-105 shadow-emerald-500/50 ring-4 ring-emerald-400/40'
                        : prStatus === 'approved'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-emerald-600/25'
                    }`}
                  >
                    Confirm Code Approval
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ==========================================================================
          LIVE ROLE DASHBOARD SIMULATOR (Interactive Tabbed View)
          ========================================================================== */}
      <section id="portalSimulator" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border border-indigo-500/20">
              Interactive Dashboard Preview
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
              Experience the Four Role Workspaces
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
              Click through the tabs below to explore what students, team leads, trainers, and admins see inside their dedicated dashboards.
            </p>
          </div>

          {/* Simulator Tabs */}
          <div className="flex justify-center mb-8">
            <div className="p-1.5 rounded-2xl bg-slate-200/80 dark:bg-white/5 border border-slate-300 dark:border-white/10 flex flex-wrap gap-1">
              {[
                { id: 'individual', label: 'Individual Student', icon: User },
                { id: 'group', label: 'Group / Team Sprint', icon: Users },
                { id: 'trainer', label: 'Trainer Review Hub', icon: Code2 },
                { id: 'admin', label: 'Admin Command', icon: ShieldCheck }
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = activePortalTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActivePortalTab(tab.id)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                      isActive
                        ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Simulated Screen Container */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#111726] border border-slate-200 dark:border-white/10 shadow-xl">
            
            {/* 1. Individual Student Simulator */}
            {activePortalTab === 'individual' && (
              <div className="space-y-8 animate-fadeIn">
                {/* Header & Overall Student Completion Stats */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        5,420+ Certified Graduates
                      </span>
                      <span className="text-xs text-slate-400">• 98.4% Course Completion Rate</span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1.5 font-heading">
                      Aarav Sharma — Fullstack Engineering Graduate
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      2-Month Fast-Track Sprint • Final Pull Request Approved & Blockchain Credential Issued
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => showToast('🎓 Certificate PDF downloaded for Aarav Sharma (#NX-2026-8F9B)', 'success')}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/25 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Award className="w-4 h-4" />
                      <span>View Official Certificate</span>
                    </button>
                    <button 
                      onClick={() => showToast('🔗 Certificate verification link copied to clipboard', 'info')}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share Credential</span>
                    </button>
                  </div>
                </div>

                {/* 4 Metric Summary Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-1">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>Total Users Completed</span>
                      <GraduationCap className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-heading">5,420+</div>
                    <div className="text-[11px] text-emerald-500 font-semibold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>+142 finished this week</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-1">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>Pull Requests Approved</span>
                      <GitPullRequest className="w-4 h-4 text-indigo-500" />
                    </div>
                    <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-heading">8 / 8 PRs</div>
                    <div className="text-[11px] text-indigo-400 font-medium">100% of tasks completed</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-1">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>Trainer Review Score</span>
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    </div>
                    <div className="text-2xl font-extrabold text-emerald-500 font-heading">98.6%</div>
                    <div className="text-[11px] text-slate-500">Graduated with High Honors</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-1">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>Placement Status</span>
                      <Briefcase className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="text-sm font-bold text-purple-400 mt-1 truncate">Placed at Microsoft</div>
                    <div className="text-[11px] text-slate-500">Software Engineer Intern</div>
                  </div>
                </div>

                {/* Successful Student Completions Showcase */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                        Recent Students Who Completed Successfully
                      </h4>
                      <p className="text-xs text-slate-500">Every graduate below verified 100% code rubrics with senior trainers</p>
                    </div>
                    <span className="text-xs font-semibold text-indigo-500 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                      92% Placed in 90 Days
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3.5">
                    {[
                      {
                        name: 'Aarav Sharma',
                        track: '2-Month Fullstack Track',
                        avatar: 'AS',
                        score: '98.6%',
                        trainer: 'Dr. David Keller',
                        placed: 'Microsoft • SWE Intern',
                        certId: '#NX-2026-8F9B',
                        date: 'Completed Oct 2026'
                      },
                      {
                        name: 'Ananya Patel',
                        track: '6-Month Cloud DevOps Track',
                        avatar: 'AP',
                        score: '99.2%',
                        trainer: 'Rohan Verma',
                        placed: 'Amazon AWS • Cloud Associate',
                        certId: '#NX-2026-4C12',
                        date: 'Completed Oct 2026'
                      },
                      {
                        name: 'Kavya Nair',
                        track: '1-Month Generative AI Track',
                        avatar: 'KN',
                        score: '97.8%',
                        trainer: 'Elena Lin',
                        placed: 'Razorpay • AI Platform Dev',
                        certId: '#NX-2026-9E33',
                        date: 'Completed Sep 2026'
                      },
                      {
                        name: 'Siddharth Roy',
                        track: '2-Month React SaaS Track',
                        avatar: 'SR',
                        score: '100%',
                        trainer: 'Marcus Shaw',
                        placed: 'Swiggy • Frontend Engineer',
                        certId: '#NX-2026-1B77',
                        date: 'Completed Sep 2026'
                      }
                    ].map((student, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-slate-50/70 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 flex flex-col justify-between hover:border-indigo-500/30 transition-all group">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold flex items-center justify-center text-sm shadow-md flex-shrink-0">
                              {student.avatar}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-slate-900 dark:text-white">{student.name}</span>
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                                  {student.score}
                                </span>
                              </div>
                              <div className="text-xs text-slate-500 dark:text-slate-400">{student.track}</div>
                            </div>
                          </div>
                          <span className="text-[11px] font-mono text-indigo-400">{student.certId}</span>
                        </div>

                        <div className="mt-3 pt-3 border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                            <Building2 className="w-3.5 h-3.5 text-purple-400" />
                            <strong className="text-slate-800 dark:text-slate-200">{student.placed}</strong>
                          </div>
                          <button
                            onClick={() => showToast(`Verified Certificate ${student.certId} for ${student.name} confirmed on ledger!`, 'success')}
                            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <span>Verify</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sprints Roadmap Completed */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/5">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
                    <span>Aarav's 4 Sprints — All Successfully Approved & Merged</span>
                    <span className="text-emerald-500 font-mono text-[11px]">4 / 4 Completed ✓</span>
                  </div>
                  <div className="grid sm:grid-cols-4 gap-2 text-xs">
                    {[
                      { num: 'Sprint 1', title: 'REST API & PostgreSQL', status: 'Approved ✓' },
                      { num: 'Sprint 2', title: 'Redis Cache & JWT Auth', status: 'Approved ✓' },
                      { num: 'Sprint 3', title: 'OWASP Security & Tests', status: 'Approved ✓' },
                      { num: 'Sprint 4', title: 'Stripe Webhooks & Capstone', status: 'Approved ✓' }
                    ].map((sp, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">{sp.num}</div>
                          <div className="text-[11px] text-slate-500 truncate max-w-[140px]">{sp.title}</div>
                        </div>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. Group / Team Sprint Simulator */}
            {activePortalTab === 'group' && (
              <div className="space-y-8 animate-fadeIn">
                {/* Header & Overall Group Completion Stats */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-purple-500/15 text-purple-400 border border-purple-500/30 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        1,280+ Teams Successfully Completed
                      </span>
                      <span className="text-xs text-slate-400">• 100% Code Approved & Production Deployed</span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1.5 font-heading">
                      Team Alpha: Cloud DevOps & Infrastructure Mastery
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      6-Month Mastery Track • 4 Developers Collaborative Sprint • All 4 Certified & Deployed
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => showToast('🚀 Deployed app: https://fintech-alpha.nexusintern.dev (Live)', 'success')}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/25 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live App URL</span>
                    </button>
                    <button 
                      onClick={() => showToast('📁 Team Capstone Git Repository & PRs opened', 'info')}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <GitBranch className="w-3.5 h-3.5" />
                      <span>Team Repo</span>
                    </button>
                  </div>
                </div>

                {/* 4 Group Metrics Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-1">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>Teams Certified</span>
                      <Users className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-heading">1,280+</div>
                    <div className="text-[11px] text-emerald-500 font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>4,800+ Engineers Graduated</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-1">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>Sprint Velocity</span>
                      <TrendingUp className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div className="text-2xl font-extrabold text-indigo-400 font-heading">44 Pts / Sprint</div>
                    <div className="text-[11px] text-slate-500">+18% above enterprise baseline</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-1">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>Peer Approvals</span>
                      <CheckCheck className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="text-2xl font-extrabold text-emerald-400 font-heading">34 / 34</div>
                    <div className="text-[11px] text-slate-500">2 peer checks per PR enforced</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-1">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>Production Uptime</span>
                      <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div className="text-2xl font-extrabold text-cyan-400 font-heading">99.98%</div>
                    <div className="text-[11px] text-slate-500">Kubernetes cluster on AWS</div>
                  </div>
                </div>

                {/* Successful Groups Showcase */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                        Recent Teams Who Completed Sprints Successfully
                      </h4>
                      <p className="text-xs text-slate-500">Multi-student squads building real-world enterprise software together</p>
                    </div>
                    <span className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      100% Group Certifications
                    </span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-3.5">
                    {[
                      {
                        team: 'Team Alpha',
                        members: ['PS', 'RK', 'AM', 'DL'],
                        count: '4 Devs',
                        track: '6-Month Cloud DevOps',
                        project: 'Multi-Region Kubernetes Terraform Cluster',
                        score: '99.1% Honors',
                        outcome: 'All 4 Hired at Cisco & Oracle',
                        badge: 'Enterprise Award'
                      },
                      {
                        team: 'ByteCraft Squad',
                        members: ['EL', 'TK', 'MS'],
                        count: '3 Devs',
                        track: '2-Month Next.js SaaS',
                        project: 'Multi-Tenant Billing Engine with Stripe Webhooks',
                        score: '98.4% Honors',
                        outcome: 'All 3 Hired at Zepto & Flipkart',
                        badge: 'Fastest Sprint'
                      },
                      {
                        team: 'AI Agents Crew',
                        members: ['VK', 'NJ', 'SA', 'RD'],
                        count: '4 Devs',
                        track: '1-Month GenAI Track',
                        project: 'Autonomous LangChain Multi-Agent Reasoning Bot',
                        score: '100% Perfect',
                        outcome: 'All 4 Hired at Zomato & Razorpay',
                        badge: 'Innovation Winner'
                      }
                    ].map((item, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-slate-50/70 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 flex flex-col justify-between hover:border-purple-500/30 transition-all">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-sm text-slate-900 dark:text-white">{item.team}</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                              {item.badge}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex items-center -space-x-1.5">
                              {item.members.map((m, mIdx) => (
                                <div key={mIdx} className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-bold flex items-center justify-center text-[10px] border border-white dark:border-[#111726]">
                                  {m}
                                </div>
                              ))}
                            </div>
                            <span className="text-xs text-slate-500 font-medium">({item.count})</span>
                            <span className="text-xs text-slate-400">• {item.track}</span>
                          </div>

                          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                            {item.project}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-xs">
                          <span className="text-emerald-500 font-bold">{item.score}</span>
                          <span className="text-[11px] text-slate-500 font-medium">{item.outcome}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Team Git branches & Collaboration Workflow */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
                    <div className="text-xs font-bold text-slate-400 mb-2 flex items-center justify-between">
                      <span>Team Git Branches</span>
                      <span className="text-emerald-400 text-[10px]">Active CI/CD</span>
                    </div>
                    <div className="space-y-1.5 text-xs font-mono text-indigo-400">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>main (Protected & Tested)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                        <span>feature/redis-token-rotation</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                        <span>feature/stripe-webhooks</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
                    <div className="text-xs font-bold text-slate-400 mb-2">Mandatory Peer Approvals</div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      Every Pull Request requires 2 fellow student peer reviews before escalating to Senior Trainer review queue.
                    </p>
                    <div className="mt-2 text-[11px] text-emerald-500 font-semibold">✓ 100% Peer review compliance</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
                    <div className="text-xs font-bold text-slate-400 mb-2">Team Lead & Demo</div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">Priya S. (Lead Architect)</div>
                    <p className="text-[11px] text-slate-500 mt-1">Live demo and architectural defense scheduled every Friday</p>
                    <button
                      onClick={() => showToast('🎉 Group Certificate & Capstone Artifacts verified!', 'success')}
                      className="mt-2.5 text-xs font-bold text-indigo-500 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Download Team Certificate</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Trainer Review Hub Simulator */}
            {activePortalTab === 'trainer' && (
              <div className="space-y-8 animate-fadeIn">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        Senior Trainers Available for Code Reviews
                      </span>
                      <span className="text-xs text-slate-400">• SLA: 3.2 Hours Avg Turnaround Time</span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1.5 font-heading">
                      Assigned Technical Mentors & Code Reviewers
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Staff engineers from Google, Meta, and AWS inspect every commit, guide architectural decisions, and sign off on credentials.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => showToast('📬 Code review requested from Dr. David Keller!', 'success')}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/25 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Code2 className="w-4 h-4" />
                      <span>Request Code Review</span>
                    </button>
                  </div>
                </div>

                {/* Available Senior Trainers with LinkedIn, Reviews, and Profiles */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                      Featured Industry Trainers (Available Now)
                    </h4>
                    <span className="text-xs text-slate-500">42 Certified Trainers on Active Duty</span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      {
                        name: 'Dr. David Keller',
                        role: 'Staff Systems Architect',
                        company: 'ex-Google • 12 Years Exp',
                        avatar: 'DK',
                        status: 'Available Today (4 Slots Left)',
                        statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
                        rating: '5.0',
                        reviewsCount: '482',
                        linkedin: 'https://linkedin.com/in/david-keller-phd',
                        handle: 'in/david-keller-phd',
                        reviewQuote: '"Dr. Keller caught subtle JWT concurrency bugs that helped me ace my system design round at Microsoft."',
                        reviewerName: 'Aarav Sharma (Fullstack Intern)',
                        prsReviewed: '1,420+ PRs Reviewed',
                        satisfaction: '99.4% Student Rating'
                      },
                      {
                        name: 'Elena Lin',
                        role: 'Principal Frontend Engineer',
                        company: 'ex-Meta • React Core Contributor',
                        avatar: 'EL',
                        status: 'Available Now (2 Slots Left)',
                        statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
                        rating: '4.9',
                        reviewsCount: '394',
                        linkedin: 'https://linkedin.com/in/elena-lin-frontend',
                        handle: 'in/elena-lin-frontend',
                        reviewQuote: '"Her code critiques on React Server Components and state management were world-class."',
                        reviewerName: 'Siddharth Roy (Frontend Intern)',
                        prsReviewed: '1,180+ PRs Reviewed',
                        satisfaction: '98.8% Student Rating'
                      },
                      {
                        name: 'Rohan Verma',
                        role: 'Staff Cloud DevOps Architect',
                        company: 'AWS Certified Solutions Architect Pro',
                        avatar: 'RV',
                        status: 'In Review Session (Next Slot in 35m)',
                        statusColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
                        rating: '5.0',
                        reviewsCount: '512',
                        linkedin: 'https://linkedin.com/in/rohan-verma-devops',
                        handle: 'in/rohan-verma-devops',
                        reviewQuote: '"Rohan guided our team through Kubernetes failure scenarios that felt like working at Netflix."',
                        reviewerName: 'Ananya Patel (Cloud Intern)',
                        prsReviewed: '1,640+ PRs Reviewed',
                        satisfaction: '99.7% Student Rating'
                      },
                      {
                        name: 'Sofia Zhang',
                        role: 'Mobile & Go Systems Lead',
                        company: 'ex-Stripe • Flutter & gRPC Specialist',
                        avatar: 'SZ',
                        status: 'Available Today (3 Slots Left)',
                        statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
                        rating: '4.9',
                        reviewsCount: '318',
                        linkedin: 'https://linkedin.com/in/sofia-zhang-tech',
                        handle: 'in/sofia-zhang-tech',
                        reviewQuote: '"Her feedback on gRPC stream serialization made our fintech app lightning fast."',
                        reviewerName: 'Priya S. (Team Lead)',
                        prsReviewed: '910+ PRs Reviewed',
                        satisfaction: '99.2% Student Rating'
                      }
                    ].map((tr, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 flex flex-col justify-between hover:border-indigo-500/30 transition-all">
                        <div>
                          {/* Top Row: Avatar, Name, Availability, LinkedIn */}
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold flex items-center justify-center text-base shadow-md flex-shrink-0">
                                {tr.avatar}
                              </div>
                              <div>
                                <h5 className="font-bold text-base text-slate-900 dark:text-white">{tr.name}</h5>
                                <div className="text-xs font-semibold text-indigo-500">{tr.role}</div>
                                <div className="text-[11px] text-slate-500">{tr.company}</div>
                              </div>
                            </div>

                            {/* LinkedIn Button */}
                            <a
                              href={tr.linkedin}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => {
                                e.preventDefault();
                                showToast(`🔗 Opening ${tr.name}'s verified LinkedIn profile (${tr.handle})`, 'info');
                              }}
                              className="px-2.5 py-1.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 border border-blue-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                              title="View LinkedIn Profile"
                            >
                              <LinkedInIcon className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">LinkedIn</span>
                            </a>
                          </div>

                          {/* Availability Badge & Rating */}
                          <div className="mt-3 flex flex-wrap items-center gap-2">
                            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${tr.statusColor}`}>
                              ● {tr.status}
                            </span>
                            <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
                              <Star className="w-3.5 h-3.5 fill-amber-400" />
                              <span>{tr.rating}</span>
                              <span className="text-slate-500 font-normal">({tr.reviewsCount} reviews)</span>
                            </div>
                            <span className="text-[11px] text-slate-400">• {tr.prsReviewed}</span>
                          </div>

                          {/* Student Review Quote */}
                          <div className="mt-3.5 p-3 rounded-xl bg-white dark:bg-black/30 border border-slate-200 dark:border-white/5 text-xs space-y-1">
                            <p className="italic text-slate-700 dark:text-slate-300 leading-relaxed">
                              {tr.reviewQuote}
                            </p>
                            <div className="text-[10px] text-indigo-400 font-semibold text-right">
                              — {tr.reviewerName}
                            </div>
                          </div>
                        </div>

                        {/* Bottom Action Bar */}
                        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-xs">
                          <span className="text-emerald-500 font-medium text-[11px]">{tr.satisfaction}</span>
                          <button
                            onClick={() => showToast(`📅 Requested 1-on-1 code architecture review with ${tr.name}!`, 'success')}
                            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-sm transition-colors cursor-pointer"
                          >
                            Book Code Review
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* PR Inspection Queue */}
                <div className="space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                    <span>Live Pull Request Review Queue</span>
                    <span className="text-amber-400 font-mono text-[11px]">3 In Progress</span>
                  </div>

                  {[
                    { id: 'PR #204', student: 'Aarav Sharma', track: '2-Mo Fullstack', commit: '8f9b2d1', status: 'Pending Review', color: 'text-amber-500 bg-amber-500/10 border-amber-500/20' },
                    { id: 'PR #198', student: 'Team Alpha', track: '6-Mo DevOps', commit: '4c12a0f', status: 'Approved ✓', color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' },
                    { id: 'PR #195', student: 'Neha Gupta', track: '1-Mo AI Agent', commit: '77b89e2', status: 'Revisions Requested', color: 'text-rose-500 bg-rose-500/10 border-rose-500/20' }
                  ].map(row => (
                    <div key={row.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <GitPullRequest className="w-4 h-4 text-indigo-500" />
                        <span className="font-mono font-bold text-slate-900 dark:text-white">{row.id}</span>
                        <span className="text-slate-700 dark:text-slate-200 font-semibold">{row.student}</span>
                        <span className="text-slate-400 hidden sm:inline font-mono">({row.commit})</span>
                        <span className="text-slate-500 hidden md:inline">• {row.track}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full font-bold border ${row.color}`}>{row.status}</span>
                        <a 
                          href="#codeReviewStudio" 
                          className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-semibold hover:bg-indigo-100 transition-colors"
                        >
                          Open Diff
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Admin Command Simulator */}
            {activePortalTab === 'admin' && (
              <div className="space-y-8 animate-fadeIn">
                {/* Header & High-level Institutional Stats */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-rose-500/15 text-rose-400 border border-rose-500/30 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Admin Superuser Command & Accreditation
                      </span>
                      <span className="text-xs text-slate-400">• Cohort 2026-Alpha Global Controls</span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1.5 font-heading">
                      Enterprise Admin Control Center
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Configure automated discount policies, manage protected day-wise SOPs, balance trainer review quotas, and batch-issue credentials.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => showToast('📊 Complete Institutional Accreditation Report exported with SHA-256 signatures!', 'success')}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/25 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <FileCheck className="w-4 h-4" />
                      <span>Export Accreditation Audit</span>
                    </button>
                    <button 
                      onClick={() => showToast('🎓 Batch Certificate Engine: 48 new certificates signed and synced to blockchain ledger!', 'success')}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Award className="w-4 h-4" />
                      <span>Batch Issue Credentials</span>
                    </button>
                  </div>
                </div>

                {/* 4 Primary Admin Metrics Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-1">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>Total Tuition Processed</span>
                      <DollarSign className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-heading">$482,500</div>
                    <div className="text-[11px] text-emerald-500 font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>Stripe & Razorpay settled</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-1">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>Active Interns & Teams</span>
                      <Users className="w-4 h-4 text-indigo-500" />
                    </div>
                    <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-heading">1,480 / 86</div>
                    <div className="text-[11px] text-slate-500">1,480 Students across 86 Teams</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-1">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>Certificates Minted</span>
                      <Award className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="text-2xl font-extrabold text-purple-400 font-heading">5,420+</div>
                    <div className="text-[11px] text-slate-500">Immutable blockchain hashes</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-1">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>Avg Assessment Discount</span>
                      <TrendingUp className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div className="text-2xl font-extrabold text-cyan-400 font-heading">38.4% OFF</div>
                    <div className="text-[11px] text-slate-500">Rewarding high-score students</div>
                  </div>
                </div>

                {/* 4 Real Admin Interactive Feature Modules */}
                <div className="grid md:grid-cols-2 gap-4">
                  
                  {/* Feature 1: Assessment-Based Discount Rule Engine */}
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sliders className="w-4 h-4 text-indigo-500" />
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">Assessment-Based Discount Policy Engine</h4>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        Active Policy
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Automated discount brackets applied immediately when a student passes the 15-question technical assessment:
                    </p>

                    <div className="space-y-2 text-xs">
                      {[
                        { bracket: 'Score ≥ 90% in Assessment', discount: '40% Tuition Discount', interns: '412 interns unlocked' },
                        { bracket: 'Score 75% - 89% in Assessment', discount: '25% Tuition Discount', interns: '680 interns unlocked' },
                        { bracket: 'Score 60% - 74% in Assessment', discount: '15% Tuition Discount', interns: '290 interns unlocked' }
                      ].map((b, i) => (
                        <div key={i} className="p-2.5 rounded-xl bg-white dark:bg-black/30 border border-slate-200 dark:border-white/5 flex items-center justify-between">
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white">{b.bracket}</div>
                            <div className="text-[11px] text-slate-500">{b.interns}</div>
                          </div>
                          <span className="font-bold text-emerald-500 font-mono">{b.discount}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex justify-between items-center text-xs">
                      <span className="text-[11px] text-slate-400">Rule Engine: Express Middleware Adapter</span>
                      <button 
                        onClick={() => showToast('⚙️ Discount policy rules updated & synced to payment gateways!', 'success')}
                        className="text-xs font-semibold text-indigo-500 hover:underline cursor-pointer"
                      >
                        Edit Discount Rules →
                      </button>
                    </div>
                  </div>

                  {/* Feature 2: Day-Wise Schedule & Protected SOP Manager */}
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-purple-500" />
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">Day-Wise Schedule & Protected SOP Manager</h4>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                        DRM Protected
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Manage published daily curriculums, unlock milestones sequentially, and protect proprietary SOP documentation:
                    </p>

                    <div className="space-y-2 text-xs font-mono">
                      <div className="p-2.5 rounded-xl bg-white dark:bg-black/30 border border-slate-200 dark:border-white/5 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">Days 1 - 15: Core API Architecture</div>
                          <div className="text-[11px] text-slate-500 font-sans">Fullstack & DevOps Cohorts</div>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold">Published ✓</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white dark:bg-black/30 border border-slate-200 dark:border-white/5 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">Days 16 - 30: Redis & JWT Security</div>
                          <div className="text-[11px] text-slate-500 font-sans">SOP Protected with dynamic student watermark</div>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold">Published ✓</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white dark:bg-black/30 border border-slate-200 dark:border-white/5 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">Days 31 - 60: Capstone & Production CI/CD</div>
                          <div className="text-[11px] text-slate-500 font-sans">Unlocks after Sprint 2 Trainer Sign-off</div>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 text-[10px] font-bold">Scheduled</span>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-between items-center text-xs">
                      <button 
                        onClick={() => showToast('🔒 SOP Watermarking & anti-leak protection enabled across all PDFs', 'info')}
                        className="text-xs font-semibold text-purple-500 hover:underline cursor-pointer"
                      >
                        Toggle DRM Watermark
                      </button>
                      <button 
                        onClick={() => showToast('🚀 Published next 10-day roadmap module to Cohort 2026-Alpha!', 'success')}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors cursor-pointer"
                      >
                        Publish Next Days
                      </button>
                    </div>
                  </div>

                  {/* Feature 3: Trainer Allocation & Workload Monitor */}
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-cyan-500" />
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">Trainer Workload & Queue Rebalancer</h4>
                      </div>
                      <button
                        onClick={() => showToast('⚖️ Rebalanced PR queues across 42 senior trainers. Maximum review turnaround now 2.8 hours!', 'success')}
                        className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 text-xs font-bold border border-cyan-500/30 transition-colors cursor-pointer"
                      >
                        Auto-Rebalance Queues
                      </button>
                    </div>

                    <div className="space-y-2 text-xs">
                      {[
                        { name: 'Dr. David Keller', capacity: '12 / 15 Students (80%)', speed: '2.4h turnaround', bar: 'w-4/5 bg-emerald-500' },
                        { name: 'Elena Lin', capacity: '9 / 15 Students (60%)', speed: '3.1h turnaround', bar: 'w-3/5 bg-indigo-500' },
                        { name: 'Rohan Verma', capacity: '14 / 15 Students (93%)', speed: '2.8h turnaround', bar: 'w-[93%] bg-amber-500' }
                      ].map((t, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-white dark:bg-black/30 border border-slate-200 dark:border-white/5 space-y-1.5">
                          <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                            <span>{t.name}</span>
                            <span className="font-normal text-slate-500">{t.capacity}</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                            <div className={`h-full ${t.bar} rounded-full`} />
                          </div>
                          <div className="text-[10px] text-slate-400 text-right">{t.speed}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Feature 4: Payment Gateway Adapter & Plan Pricing */}
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-emerald-500" />
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">Payment Gateway Adapter & Plan Rates</h4>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        Multi-Gateway
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-white dark:bg-black/30 border border-slate-200 dark:border-white/5 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">Stripe Adapter (USD / International)</div>
                          <div className="text-[11px] text-emerald-500">Live • Auto-Webhooks verified</div>
                        </div>
                        <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">Production</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white dark:bg-black/30 border border-slate-200 dark:border-white/5 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">Razorpay Adapter (INR / UPI / NetBanking)</div>
                          <div className="text-[11px] text-emerald-500">Live • Instant Settlement</div>
                        </div>
                        <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">Production</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white dark:bg-black/30 border border-slate-200 dark:border-white/5 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">Plan Base Fees (1, 2, 6 Months)</div>
                          <div className="text-[11px] text-slate-500">Configurable tier pricing with automated scholarship deductions</div>
                        </div>
                        <button 
                          onClick={() => showToast('💳 Pricing tier matrix updated!', 'success')}
                          className="px-2 py-1 rounded bg-indigo-600 text-white text-[11px] font-bold cursor-pointer"
                        >
                          Configure
                        </button>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-between items-center text-xs">
                      <span className="text-[11px] text-slate-400">Security: PCI-DSS Compliant</span>
                      <button 
                        onClick={() => showToast('🧪 Payment Gateway Webhook test ping succeeded (HTTP 200 OK)', 'success')}
                        className="text-xs font-semibold text-emerald-500 hover:underline cursor-pointer"
                      >
                        Test Webhook Ping →
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* ==========================================================================
          HOW IT WORKS (TIMELINE WORKFLOW)
          ========================================================================== */}
      <section id="workflow" className="py-20 bg-slate-100/60 dark:bg-white/[0.02] border-y border-slate-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border border-indigo-500/20">
              Clear Roadmap
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
              How Online Internships Work
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
              A transparent, highly structured 4-step engineering journey designed to ensure mastery and verified output.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Enroll & Choose Duration',
                desc: 'Select your track and choose between 1, 2, or 6 months. Pick whether to intern solo or form a collaborative squad.'
              },
              {
                step: '02',
                title: 'Dedicated Workspace',
                desc: 'Receive private GitHub repositories, production starter templates, and an assigned Senior Technical Trainer.'
              },
              {
                step: '03',
                title: 'Trainer Code Review',
                desc: 'Submit milestone Pull Requests. Trainers check syntax, run test suites, leave inline comments, and ensure code excellence.'
              },
              {
                step: '04',
                title: 'Approval & Certification',
                desc: 'Once all trainer criteria pass, your PR is merged and your accredited digital certificate is cryptographically verified.'
              }
            ].map((st, i) => (
              <div 
                key={i}
                className="p-7 rounded-3xl bg-white dark:bg-[#111726] border border-slate-200 dark:border-white/10 shadow-lg text-center flex flex-col items-center hover:-translate-y-1 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-extrabold flex items-center justify-center text-lg mb-6 shadow-md shadow-indigo-500/30">
                  {st.step}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{st.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==========================================================================
          FAQ ACCORDION SECTION
          ========================================================================== */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-14 space-y-4">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border border-indigo-500/20">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
              Everything You Need to Know
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Can I switch between 1, 2, and 6-month durations after enrolling?',
                a: 'Yes! If you initially enroll in a 1-month fast-track sprint and wish to expand your project into a full 2-month or 6-month enterprise capstone, your Portal Admin can adjust your track with mentor approval without losing past PR progress.'
              },
              {
                q: 'How does the Group / Team internship operate compared to Individual?',
                a: 'In an Individual internship, you work solo with your assigned trainer. In a Group internship (2 to 5 members), you share a team git repository, conduct peer reviews on branches, assign team roles (Backend, Frontend, DevOps), and hold collaborative sprint demos with your trainer.'
              },
              {
                q: 'What occurs if a trainer requests changes on my code?',
                a: 'Trainers leave detailed inline feedback directly on your code diff. You can push updated commits to the same pull request branch. Once updated, the trainer re-reviews and approves it. There are no penalty limits on revisions.'
              },
              {
                q: 'What controls does the Admin role maintain?',
                a: 'Admins oversee batch cohorts, allocate trainers to specific students/groups, configure curriculum timelines, monitor trainer review turnaround times (SLAs), and generate tamper-proof digital certificates.'
              }
            ].map((faq, idx) => (
              <details key={idx} className="group p-5 rounded-2xl bg-white dark:bg-[#111726] border border-slate-200 dark:border-white/10 shadow-sm transition-all">
                <summary className="font-bold text-sm sm:text-base text-slate-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                  <span>{faq.q}</span>
                  <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" />
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-white/5 pt-3">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>

        </div>
      </section>

      {/* ==========================================================================
          CTA BANNER
          ========================================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 p-8 sm:p-14 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading">
              Ready to Build Production-Grade Code?
            </h2>
            <p className="text-sm sm:text-base text-indigo-100 leading-relaxed">
              Join thousands of student engineers building real software with dedicated trainer code reviews. Fast-track your career with flexible 1, 2, or 6-month online internships.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <button
                onClick={() => setAuthModalRole('individual')}
                className="px-6 py-3 rounded-xl text-sm font-bold bg-white text-indigo-700 hover:bg-indigo-50 shadow-lg transition-all cursor-pointer"
              >
                Join as Individual Student
              </button>
              <button
                onClick={() => setAuthModalRole('group')}
                className="px-6 py-3 rounded-xl text-sm font-bold bg-emerald-500 text-white hover:bg-emerald-400 shadow-lg transition-all cursor-pointer"
              >
                Create a Group Team
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================================================
          FOOTER
          ========================================================================== */}
      <footer className="border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c101a] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            
            <div className="col-span-2 md:col-span-1 space-y-3">
              <a href="#" className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                  <Code2 className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white font-heading">
                  Nexus<span className="text-indigo-500">Intern</span>
                </span>
              </a>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                The premier online internship platform connecting aspiring engineers with rigorous trainer code reviews and industry-recognized credentials.
              </p>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">Durations</div>
              <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
                <li><button onClick={() => setActiveDuration('1-month')} className="hover:text-indigo-500">1 Month Fast-Track</button></li>
                <li><button onClick={() => setActiveDuration('2-month')} className="hover:text-indigo-500">2 Months Foundation</button></li>
                <li><button onClick={() => setActiveDuration('6-month')} className="hover:text-indigo-500">6 Months Mastery</button></li>
                <li><span className="text-slate-400">University Cohorts</span></li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">Portals</div>
              <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
                <li><button onClick={() => setAuthModalRole('individual')} className="hover:text-indigo-500">Individual Portal</button></li>
                <li><button onClick={() => setAuthModalRole('group')} className="hover:text-indigo-500">Group Portal</button></li>
                <li><button onClick={() => setAuthModalRole('trainer')} className="hover:text-indigo-500">Trainer Console</button></li>
                <li><button onClick={() => setAuthModalRole('admin')} className="hover:text-indigo-500">Admin Command</button></li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">Features</div>
              <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
                <li><a href="#codeReviewStudio" className="hover:text-indigo-500">PR Diff Inspection</a></li>
                <li><a href="#codeReviewStudio" className="hover:text-indigo-500">1-Click Code Approval</a></li>
                <li><a href="#workflow" className="hover:text-indigo-500">CI/CD Automated Tests</a></li>
                <li><a href="#durations" className="hover:text-indigo-500">Verifiable Credentials</a></li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>© 2026 NexusIntern Portal. All rights reserved. React + Tailwind CSS v4 Theme.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-indigo-500">Privacy Policy</a>
              <a href="#" className="hover:text-indigo-500">Terms of Service</a>
              <a href="#" className="hover:text-indigo-500">Security Architecture</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ==========================================================================
          ROLE LOGIN & DEMO MODAL
          ========================================================================== */}
      {authModalRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md p-6 rounded-3xl bg-white dark:bg-[#111726] border border-slate-200 dark:border-white/10 shadow-2xl relative">
            
            <button 
              onClick={() => setAuthModalRole(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                ⚡
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                Portal Authentication
              </h3>
            </div>

            {/* Role Switcher Pills inside Modal */}
            <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 mb-4">
              {[
                { id: 'individual', label: 'Solo' },
                { id: 'group', label: 'Group' },
                { id: 'trainer', label: 'Trainer' },
                { id: 'admin', label: 'Admin' }
              ].map(r => (
                <button
                  key={r.id}
                  onClick={() => setAuthModalRole(r.id)}
                  className={`py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    authModalRole === r.id
                      ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-xs text-indigo-700 dark:text-indigo-300 mb-4 leading-relaxed">
              {authModalRole === 'individual' && '👤 Solo Student: Track milestone reviews, check code diffs & download certificate.'}
              {authModalRole === 'group' && '👥 Group Member: Access shared repository, peer review pull requests & manage team sprints.'}
              {authModalRole === 'trainer' && '⚡ Technical Trainer: Review PRs, execute test suites & approve code submissions.'}
              {authModalRole === 'admin' && '🛡️ Portal Admin: Configure 1, 2, 6-mo cohorts, allocate trainers & sign credentials.'}
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              showToast(`🚀 Logged into ${authModalRole.toUpperCase()} Portal successfully!`, 'success');
              setAuthModalRole(null);
            }} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Email / Portal ID
                </label>
                <input
                  type="email"
                  defaultValue={
                    authModalRole === 'individual' ? 'aryan.sharma@nexusintern.dev' :
                    authModalRole === 'group' ? 'team.alpha.lead@nexusintern.dev' :
                    authModalRole === 'trainer' ? 'trainer.david.keller@nexusintern.dev' :
                    'admin.director@nexusintern.dev'
                  }
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  defaultValue="••••••••••••"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {authModalRole === 'group' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Team Code
                  </label>
                  <input
                    type="text"
                    defaultValue="TEAM-NEXUS-ALPHA-2026"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full mt-2 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all cursor-pointer"
              >
                Enter as {authModalRole.toUpperCase()}
              </button>
            </form>

          </div>
        </div>
      )}

      {/* ==========================================================================
          TOAST FEEDBACK NOTIFICATION
          ========================================================================== */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-slideUp">
          <div className={`px-4 py-3 rounded-2xl shadow-2xl border flex items-center gap-3 text-xs sm:text-sm font-semibold ${
            toast.type === 'success'
              ? 'bg-slate-900 text-white border-emerald-500/50 shadow-emerald-500/20'
              : 'bg-slate-900 text-white border-indigo-500/50 shadow-indigo-500/20'
          }`}>
            <span className="text-base">{toast.type === 'success' ? '✓' : 'ℹ️'}</span>
            <span>{toast.message}</span>
          </div>
        </div>
      )}

    </div>
  );
}
