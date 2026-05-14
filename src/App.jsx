import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import heroImg01 from "./assets/hero-img-01-profile.png";
import heroBroll01 from "./assets/hero-broll-01.png";
import heroBroll02 from "./assets/hero-broll-02.png";
import heroBroll03 from "./assets/hero-broll-03.png";
import navProfile from "./assets/nav-profile.png";
import aboutImg03 from "./assets/about-img-03.png";

/* ------------------------------------------------------------------ */
/*  CONTENT — swap in real info when ready                            */
/* ------------------------------------------------------------------ */

const NAME = "Paulina Lozano";
const TAGLINE = "Marketing strategist & visual storyteller.";
const LOCATION = "Washington / Remote";
const EMAIL = "paulina.lozano@wallawalla.edu";
const LINKEDIN =
  "https://www.linkedin.com/in/paulina-lozano-680324201";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Results", href: "#results" },
  { label: "Contact", href: "#contact" },
];

const HERO_STATS = [
  { value: "1M+", label: "Followers grown" },
  { value: "40M+", label: "Content views" },
  { value: "150+", label: "Pieces produced" },
  { value: "3x", label: "Avg. engagement lift" },
];

const EXPERTISE = [
  {
    n: "01",
    title: "Social Media Growth",
    body: "Platform-native strategy that turns lurkers into communities — built from data, instinct, and culture.",
  },
  {
    n: "02",
    title: "Content Strategy",
    body: "Pillars, calendars, and narrative systems that keep brands consistent without ever feeling corporate.",
  },
  {
    n: "03",
    title: "Short-Form Video",
    body: "Scroll-stopping hooks, crisp cuts, and sound design tuned for TikTok, Reels, and YouTube Shorts.",
  },
  {
    n: "04",
    title: "Visual Direction",
    body: "Photography and art direction with an editorial eye — elevated, considered, and on-brand.",
  },
  {
    n: "05",
    title: "Brand Storytelling",
    body: "Voice, tone, and narrative that make a brand feel like a point of view, not a product.",
  },
  {
    n: "06",
    title: "Trend Intelligence",
    body: "Live cultural radar — so the work lands before the wave, not after it breaks.",
  },
];

const RESULTS = [
  { k: "1,000,000+", v: "Followers grown across client + personal accounts" },
  { k: "40,000,000+", v: "Organic views on short-form video" },
  { k: "Top 2%", v: "Average engagement rate vs. category benchmark" },
  { k: "12 brands", v: "Collaborations shipped — DTC, lifestyle, beauty" },
];

const SKILLS = [
  "Social Media Strategy",
  "Short-Form Video Editing",
  "Content Planning",
  "Photography",
  "Visual Storytelling",
  "Trend Research",
  "Brand Aesthetic",
  "Creative Direction",
  "Copywriting",
  "Community Building",
  "Adobe Premiere",
  "CapCut",
  "Lightroom",
  "DaVinci Resolve",
  "Notion",
  "Canva Pro",
];

const PRESS = [
  "VOGUE",
  "HIGHSNOBIETY",
  "ELLE",
  "REFINERY29",
  "NYLON",
  "HYPEBAE",
  "i-D",
  "DAZED",
];

const HERO_BROLL_IMAGES = [heroBroll01, heroBroll02, heroBroll03];

const PERSONAL_BRANDS = [
  {
    handle: "@pauocam",
    description: "Most active · recent growth",
    platform: "TikTok",
    followers: "80K+",
    milestone: "80K followers in under 12 months",
    url: "https://www.tiktok.com/@pauocam",
    clips: [
      { label: "TikTok clip", views: "2.9M views", url: "https://www.tiktok.com/@pauocam/video/7459923195206847749", palette: "from-[#F5D8CA] via-[#E09478] to-[#C2593F]" },
      { label: "TikTok clip", views: "1.9M views", url: "https://www.tiktok.com/@pauocam/video/7509256806464556295", palette: "from-[#DDD0BA] via-[#C9B89A] to-[#4A423D]" },
      { label: "TikTok clip", views: "1.4M views", url: "https://www.tiktok.com/@pauocam/video/7524514994583522567", palette: "from-[#E6C9B4] via-[#C9A882] to-[#6E645C]" },
    ],
  },
  {
    handle: "@paulina_ocampo",
    description: "First account · larger following",
    platform: "TikTok",
    followers: "1M+",
    milestone: "1 million followers in 12 months",
    url: "https://www.tiktok.com/@paulina_ocampo",
    clips: [
      { label: "TikTok clip", views: "6.9M views", url: "https://www.tiktok.com/@paulina_ocampo/video/7280597875308891434", palette: "from-[#E6C9B4] via-[#D9A88A] to-[#A8432B]" },
      { label: "TikTok clip", views: "445K views", url: "https://www.tiktok.com/@paulina_ocampo/video/7172307392334449962", palette: "from-[#1C1917] via-[#2A2420] to-[#4A423D]" },
      { label: "TikTok clip", views: "18K views", url: "https://www.tiktok.com/@paulina_ocampo/video/7210127951524842798", palette: "from-[#F2E4D2] via-[#DDD0BA] to-[#968A80]" },
    ],
  },
];

const CLIP_PALETTE_ROTATION = [
  "from-[#F5D8CA] via-[#E09478] to-[#C2593F]",
  "from-[#DDD0BA] via-[#C9B89A] to-[#4A423D]",
  "from-[#E6C9B4] via-[#C9A882] to-[#6E645C]",
  "from-[#E6C9B4] via-[#D9A88A] to-[#A8432B]",
  "from-[#1C1917] via-[#2A2420] to-[#4A423D]",
];

const padClipsToTen = (realClips) => {
  const out = realClips.map((c) => ({ ...c, placeholder: false }));
  let i = 0;
  while (out.length < 10) {
    out.push({
      label: "Video slot",
      views: "Add link",
      url: "",
      palette: CLIP_PALETTE_ROTATION[i % CLIP_PALETTE_ROTATION.length],
      placeholder: true,
    });
    i += 1;
  }
  return out;
};

/** Full-width detail page: @pauocam first (2025–2026), @paulina_ocampo (2020–2024), 10 clips each. */
const PERSONAL_BRANDS_DETAIL = [
  {
    handle: "@pauocam",
    platform: "TikTok",
    profileUrl: "https://www.tiktok.com/@pauocam",
    yearsActive: "2025–2026",
    tagline: "Where I’m posting most right now",
    followers: "80K+",
    milestone: "80K followers in under 12 months",
    paragraphs: [
      "This is the account I’m leaning into today — tighter hooks, faster experiments, and the energy of building in public while everything on short-form is still moving at full speed.",
      "Most of my day-to-day ideas, outfit and lifestyle clips, and ‘what should I post next’ tests live here first. If you’re trying to understand how I think on TikTok in 2025 and 2026, start with @pauocam.",
    ],
    clips: padClipsToTen([
      {
        label: "TikTok clip",
        views: "2.9M views",
        url: "https://www.tiktok.com/@pauocam/video/7459923195206847749",
        palette: "from-[#F5D8CA] via-[#E09478] to-[#C2593F]",
      },
      {
        label: "TikTok clip",
        views: "1.9M views",
        url: "https://www.tiktok.com/@pauocam/video/7509256806464556295",
        palette: "from-[#DDD0BA] via-[#C9B89A] to-[#4A423D]",
      },
      {
        label: "TikTok clip",
        views: "1.4M views",
        url: "https://www.tiktok.com/@pauocam/video/7524514994583522567",
        palette: "from-[#E6C9B4] via-[#C9A882] to-[#6E645C]",
      },
    ]),
  },
  {
    handle: "@paulina_ocampo",
    platform: "TikTok",
    profileUrl: "https://www.tiktok.com/@paulina_ocampo",
    yearsActive: "2020–2024",
    tagline: "The account that carried the long arc",
    followers: "1M+",
    milestone: "1 million followers in 12 months",
    paragraphs: [
      "This was home base for years — the handle where I learned pacing, storytelling, and how to show up consistently until the audience compounded into seven figures.",
      "From 2020 through 2024 this is where the bulk of the archive lives: bigger swings, older series, and the proof that the same instincts I use now were forged over a much longer runway.",
    ],
    clips: padClipsToTen([
      {
        label: "TikTok clip",
        views: "6.9M views",
        url: "https://www.tiktok.com/@paulina_ocampo/video/7280597875308891434",
        palette: "from-[#E6C9B4] via-[#D9A88A] to-[#A8432B]",
      },
      {
        label: "TikTok clip",
        views: "445K views",
        url: "https://www.tiktok.com/@paulina_ocampo/video/7172307392334449962",
        palette: "from-[#1C1917] via-[#2A2420] to-[#4A423D]",
      },
      {
        label: "TikTok clip",
        views: "18K views",
        url: "https://www.tiktok.com/@paulina_ocampo/video/7210127951524842798",
        palette: "from-[#F2E4D2] via-[#DDD0BA] to-[#968A80]",
      },
    ]),
  },
];

/* ------------------------------------------------------------------ */
/*  SMALL UI PRIMITIVES                                                */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.2, 0.65, 0.2, 1], delay: i * 0.08 },
  }),
};

const Reveal = ({ children, delay = 0, className = "", as: Tag = "div" }) => {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return <Tag className={className}>{children}</Tag>;
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      custom={delay}
    >
      {children}
    </motion.div>
  );
};

const SectionLabel = ({ index, children }) => (
  <div className="flex items-center gap-3 text-[11px] font-medium tracking-[0.22em] uppercase text-ink-500">
    <span className="font-mono text-ember-600">{index}</span>
    <span className="h-px w-8 bg-ink-400/40" />
    <span>{children}</span>
  </div>
);

const EyebrowSerif = ({ children }) => (
  <span className="font-serif italic text-ember-600">{children}</span>
);

const PillButton = ({
  href,
  to,
  children,
  variant = "solid",
  onClick,
  className = "",
}) => {
  const base =
    "group relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-500 will-change-transform";
  const styles =
    variant === "solid"
      ? "bg-ink-900 text-bone-100 hover:bg-ink-800 shadow-soft hover:-translate-y-0.5"
      : variant === "ghost"
      ? "text-ink-800 hover:text-ink-900"
      : "border border-ink-900/15 bg-white/60 backdrop-blur text-ink-800 hover:bg-white hover:border-ink-900/30 hover:-translate-y-0.5";
  const arrow = (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="transition-transform duration-500 group-hover:translate-x-1"
      aria-hidden
    >
      <path
        d="M1 7h12m0 0L7.5 1.5M13 7l-5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
  const combined = `${base} ${styles} ${className}`;
  if (to) {
    return (
      <Link to={to} onClick={onClick} className={combined}>
        <span>{children}</span>
        {arrow}
      </Link>
    );
  }
  const openInNewTab =
    typeof href === "string" && href.startsWith("https://");
  return (
    <a
      href={href}
      onClick={onClick}
      target={openInNewTab ? "_blank" : undefined}
      rel={openInNewTab ? "noopener noreferrer" : undefined}
      className={combined}
    >
      <span>{children}</span>
      {arrow}
    </a>
  );
};

/* ------------------------------------------------------------------ */
/*  PLACEHOLDER VISUAL — elegant gradient + SVG art, no external img  */
/* ------------------------------------------------------------------ */

const PlaceholderVisual = ({
  palette,
  label,
  index = 1,
  src,
  objectPosition = "center",
  imageClassName = "object-cover",
}) => (
  <div
    className={`relative h-full w-full overflow-hidden rounded-[inherit] bg-gradient-to-br ${palette}`}
  >
    {src ? (
      <>
        <img
          src={src}
          alt={label || `Portfolio image ${index}`}
          className={`h-full w-full ${imageClassName}`}
          style={{ objectPosition }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/18 via-black/[0.03] to-white/[0.08]" />
      </>
    ) : (
      <>
        {/* soft vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.35),transparent_50%)]" />
        {/* abstract strokes */}
        <svg
          className="absolute -right-10 -top-10 h-[140%] w-[140%] opacity-40 mix-blend-overlay"
          viewBox="0 0 400 400"
          fill="none"
        >
          <circle cx="300" cy="120" r="140" stroke="white" strokeOpacity="0.4" />
          <circle cx="120" cy="300" r="90" stroke="white" strokeOpacity="0.35" />
          <path
            d="M20 360 C 120 180, 260 120, 380 40"
            stroke="white"
            strokeOpacity="0.35"
            strokeWidth="1"
          />
        </svg>
      </>
    )}
    {/* subtle grain */}
    <div
      className="absolute inset-0 opacity-[0.12] mix-blend-multiply"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      }}
    />
  </div>
);

const CyclingVisual = ({ images, interval = 3200, ...props }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || images.length < 2) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, interval);

    return () => window.clearInterval(timer);
  }, [images.length, interval, prefersReduced]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[inherit]">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          className="absolute inset-0"
          initial={prefersReduced ? false : { opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={prefersReduced ? undefined : { opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.75, ease: [0.2, 0.65, 0.2, 1] }}
        >
          <PlaceholderVisual {...props} src={images[activeIndex]} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  NAV                                                                */
/* ------------------------------------------------------------------ */

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.2, 0.65, 0.2, 1], delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-6"
    >
      <div
        className={[
          "w-full max-w-6xl transition-all duration-500",
          open &&
            "max-md:overflow-hidden max-md:rounded-2xl max-md:border max-md:border-ink-900/10 max-md:bg-white/95 max-md:shadow-glass max-md:backdrop-blur-md",
          scrolled && !open && "glass rounded-full shadow-glass",
          scrolled &&
            open &&
            "md:glass md:rounded-full md:border md:border-white/60 md:shadow-glass",
          !scrolled && !open && "rounded-full bg-transparent",
          !scrolled && open && "md:rounded-full md:bg-transparent",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="flex items-center justify-between px-5 py-3 sm:px-6 sm:py-3.5">
          <Link to="/" className="group flex items-center gap-2.5">
            <span className="relative h-8 w-8 overflow-hidden rounded-full border border-white/70 bg-bone-200 shadow-glass">
              <img
                src={navProfile}
                alt={`${NAME} profile`}
                className="h-full w-full object-cover"
              />
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-ember-500" />
            </span>
            <span className="font-serif text-[17px] tracking-tight text-ink-900">
              {NAME}
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                to={`/${l.href}`}
                className="hover-underline text-[13px] font-medium text-ink-700 hover:text-ink-900"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 rounded-full border border-ink-900/10 bg-white/50 px-3 py-1.5 text-[11px] font-medium text-ink-700 backdrop-blur sm:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember-500 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-ember-500" />
              </span>
              Available for Summer ’26
            </span>
            <Link
              to="/#contact"
              className="hidden rounded-full bg-ink-900 px-4 py-2 text-[13px] font-medium text-bone-100 transition-all hover:bg-ink-800 md:inline-block"
            >
              Get in touch
            </Link>
            <button
              aria-label="Open menu"
              onClick={() => setOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-full border border-ink-900/10 bg-white/60 md:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 h-[1.5px] w-4 bg-ink-900 transition-all ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 h-[1.5px] w-4 bg-ink-900 transition-all ${
                    open ? "top-1.5 -rotate-45" : "top-2.5"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-ink-900/10 md:hidden"
            >
              <div className="flex flex-col gap-0.5 px-2 pb-3 pt-1 sm:px-4">
                {NAV_LINKS.map((l) => (
                  <Link
                    key={l.href}
                    to={`/${l.href}`}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-3 text-[15px] font-medium text-ink-800 hover:bg-bone-200/60"
                  >
                    {l.label}
                  </Link>
                ))}
                <Link
                  to="/#contact"
                  onClick={() => setOpen(false)}
                  className="mt-1 rounded-xl bg-ink-900 px-3 py-3 text-[15px] font-medium text-bone-100 text-center"
                >
                  Get in touch
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

/* ------------------------------------------------------------------ */
/*  PROGRESS BAR                                                       */
/* ------------------------------------------------------------------ */

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2,
  });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-ember-500 via-ember-600 to-ink-900"
    />
  );
};

/* ------------------------------------------------------------------ */
/*  HERO                                                               */
/* ------------------------------------------------------------------ */

const Hero = () => {
  const prefersReduced = useReducedMotion();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 600], [0, -60]);
  const y2 = useTransform(scrollY, [0, 600], [0, -30]);

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 sm:pt-36 md:pt-40 pb-20 md:pb-28"
    >
      {/* decorative warm glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[80vh] w-[100vw] -translate-x-1/2 bg-radial-soft" />
      {/* grid rule */}
      <div className="pointer-events-none absolute inset-x-0 top-24 mx-auto max-w-7xl border-t border-ink-900/[0.06]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-12 gap-6 px-5 sm:px-8 md:gap-8">
        {/* LEFT — editorial text */}
        <div className="col-span-12 md:col-span-7 lg:col-span-7">
          <Reveal>
            <div className="flex items-center gap-3 text-[11px] font-medium tracking-[0.22em] uppercase text-ink-500">
              <span className="inline-block h-px w-10 bg-ink-500/50" />
              <span>Portfolio · {new Date().getFullYear()}</span>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <h1 className="mt-6 font-serif text-[14vw] leading-[0.92] tracking-tightest text-ink-900 sm:text-[11vw] md:text-[9vw] lg:text-[128px]">
              Making brands
              <br />
              <span className="relative inline-block">
                <span className="italic text-ember-600">unscrollable</span>
                <svg
                  className="absolute -bottom-3 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  aria-hidden
                >
                  <motion.path
                    d="M2 8 C 60 2, 140 2, 298 6"
                    stroke="#C2593F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1.4,
                      ease: [0.2, 0.65, 0.2, 1],
                      delay: 0.6,
                    }}
                  />
                </svg>
              </span>
              <br />
              for a living.
            </h1>
          </Reveal>

          <Reveal delay={2}>
            <p className="mt-8 max-w-xl text-balance text-[17px] leading-relaxed text-ink-600 sm:text-lg">
              I’m {NAME} — a marketing major and creative strategist building
              culture-forward content for brands ready to feel like
              <EyebrowSerif> something</EyebrowSerif>. I turn trends into
              traction, and ideas into measurable growth.
            </p>
          </Reveal>

          <Reveal delay={3}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <PillButton href="/#results">See results</PillButton>
              <PillButton href="/#contact" variant="outline">
                Get in touch
              </PillButton>
              <a
                href="/#about"
                className="ml-1 hidden items-center gap-2 text-[13px] font-medium text-ink-600 hover:text-ink-900 sm:inline-flex"
              >
                <span className="h-px w-8 bg-ink-400" />
                Scroll to meet me
              </a>
            </div>
          </Reveal>

          <Reveal delay={4}>
            <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-ink-900/10 pt-8 sm:grid-cols-4">
              {HERO_STATS.map((s) => (
                <div key={s.label} className="group">
                  <dt className="font-serif text-4xl text-ink-900 tracking-tight sm:text-5xl">
                    {s.value}
                  </dt>
                  <dd className="mt-2 text-[12px] font-medium uppercase tracking-[0.18em] text-ink-500">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* RIGHT — layered editorial image stack */}
        <div className="col-span-12 md:col-span-5 lg:col-span-5">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-sm md:max-w-none md:aspect-auto md:h-[640px]">
            {/* large portrait card */}
            <motion.div
              style={prefersReduced ? {} : { y: y1 }}
              initial={{ opacity: 0, y: 40, rotate: -2 }}
              animate={{ opacity: 1, y: 0, rotate: -2 }}
              transition={{
                duration: 1,
                ease: [0.2, 0.65, 0.2, 1],
                delay: 0.3,
              }}
              className="absolute left-2 top-4 aspect-[889/1024] w-[82%] overflow-hidden rounded-[26px] border border-white/60 shadow-card md:w-[88%]"
            >
              <PlaceholderVisual
                palette="from-[#E6C9B4] via-[#D9A88A] to-[#8B3A2F]"
                label="Portrait — 35mm"
                index={1}
                src={heroImg01}
                objectPosition="center center"
                imageClassName="object-cover"
              />
            </motion.div>

            {/* secondary card */}
            <motion.div
              style={prefersReduced ? {} : { y: y2 }}
              initial={{ opacity: 0, y: 60, rotate: 4 }}
              animate={{ opacity: 1, y: 0, rotate: 4 }}
              transition={{
                duration: 1.1,
                ease: [0.2, 0.65, 0.2, 1],
                delay: 0.5,
              }}
              className="absolute bottom-6 right-0 h-[52%] w-[58%] overflow-hidden rounded-[22px] border border-white/60 shadow-card"
            >
              <CyclingVisual
                palette="from-[#F2E4D2] via-[#DDD0BA] to-[#6E645C]"
                label="Still life — B-roll"
                index={2}
                images={HERO_BROLL_IMAGES}
                objectPosition="center center"
                imageClassName="object-cover"
              />
            </motion.div>

            {/* floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="absolute right-3 top-2 hidden rotate-[6deg] items-center gap-3 rounded-2xl bg-ink-900 px-4 py-3 shadow-soft sm:flex"
            >
              <div className="grid h-8 w-8 place-items-center rounded-full bg-ember-500/20">
                <span className="text-ember-300">↗</span>
              </div>
              <div className="text-left">
                <div className="font-serif text-bone-100 text-lg leading-none">
                  +978K
                </div>
                <div className="text-[10px] tracking-[0.22em] text-bone-100/60 uppercase">
                  in 12 months
                </div>
              </div>
            </motion.div>

            {/* floating tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="absolute -bottom-2 left-0 glass rounded-full px-4 py-2 text-[12px] font-medium text-ink-800 shadow-glass"
            >
              <EyebrowSerif>now booking</EyebrowSerif> · summer internships
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  ABOUT                                                              */
/* ------------------------------------------------------------------ */

const About = () => (
  <section id="about" className="relative py-24 md:py-36">
    <div className="mx-auto grid max-w-7xl grid-cols-12 gap-6 px-5 sm:px-8 md:gap-10">
      <div className="col-span-12 md:col-span-4">
        <Reveal>
          <SectionLabel index="01">About</SectionLabel>
        </Reveal>
        <Reveal delay={1}>
          <div className="mt-8 space-y-6">
            <div className="relative aspect-[575/1024] overflow-hidden rounded-[28px] border border-white/60 shadow-card">
              <PlaceholderVisual
                palette="from-[#DDD0BA] via-[#C9B89A] to-[#4A423D]"
                label="Portrait — sunlit"
                index={3}
                src={aboutImg03}
                objectPosition="center center"
                imageClassName="object-cover"
              />
            </div>
            <div className="rounded-2xl border border-ink-900/10 bg-white/60 p-5 backdrop-blur">
              <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink-500">
                Based in
              </div>
              <div className="mt-1 font-serif text-2xl text-ink-900">
                {LOCATION}
              </div>
              <div className="mt-4 font-mono text-[11px] tracking-[0.2em] uppercase text-ink-500">
                Currently
              </div>
              <div className="mt-1 text-ink-800">
                Junior marketing major, applying to Summer ’26 internships.
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="col-span-12 md:col-span-8">
        <Reveal delay={1}>
          <p className="font-serif text-[40px] leading-[1.08] text-ink-900 tracking-tight sm:text-[56px] md:text-[64px]">
            <span className="text-ember-600 font-serif italic">Creative</span>{" "}
            with a{" "}
            <span className="relative whitespace-nowrap">
              strategist’s
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 10"
                fill="none"
                aria-hidden
              >
                <path
                  d="M2 6 Q 150 0 298 6"
                  stroke="#1C1917"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            brain — building content that doesn’t just look good, it{" "}
            <span className="italic">converts</span>.
          </p>
        </Reveal>

        <Reveal delay={2}>
          <div className="mt-10 grid grid-cols-1 gap-10 text-[16px] leading-relaxed text-ink-600 sm:text-[17px] md:grid-cols-2">
            <p>
              I’m a marketing major obsessed with the overlap between culture,
              aesthetics, and growth. Over the last few years I’ve grown my
              personal brands past millions of followers while producing
              short-form video campaigns for brands ready to show up with more
              clarity, style, and momentum.
            </p>
            <p>
              I think in hooks, frames, and funnels. Whether I’m storyboarding a
              Reel, styling a product shoot, or writing launch copy, my work is
              guided by one question: is this worth someone’s attention? If it
              isn’t, I keep editing.
            </p>
          </div>
        </Reveal>

        <Reveal delay={3}>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { k: "Major", v: "Marketing" },
              { k: "Focus", v: "Social + Content" },
              { k: "Tools", v: "Davinci, Lightroom +" },
              { k: "Years creating", v: "4+" },
            ].map((i) => (
              <div
                key={i.k}
                className="rounded-2xl border border-ink-900/10 bg-bone-50 p-4"
              >
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink-500">
                  {i.k}
                </div>
                <div className="mt-2 font-serif text-xl text-ink-900">{i.v}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={4}>
          <figure className="mt-14 rounded-3xl border border-ink-900/10 bg-gradient-to-br from-white/80 to-bone-50/80 p-8 md:p-10 shadow-glass backdrop-blur">
            <svg
              className="h-8 w-8 text-ember-500"
              viewBox="0 0 32 32"
              fill="currentColor"
              aria-hidden
            >
              <path d="M8 18c0-6 4-10 10-11v4c-4 1-6 4-6 7h6v10H8V18zm16 0c0-6 4-10 10-11v4c-4 1-6 4-6 7h6v10H24V18z" />
            </svg>
            <blockquote className="mt-4 font-serif text-2xl leading-snug text-ink-900 sm:text-[28px]">
              The brands I care about don’t sell — they make people{" "}
              <span className="italic text-ember-600">feel seen</span>. That’s the
              craft I’m building my career around.
            </blockquote>
            <figcaption className="mt-5 text-[12px] font-medium uppercase tracking-[0.22em] text-ink-500">
              — Personal note
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  EXPERTISE                                                          */
/* ------------------------------------------------------------------ */

const Expertise = () => (
  <section id="expertise" className="relative py-24 md:py-32">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="grid grid-cols-12 gap-6 md:gap-10">
        <div className="col-span-12 md:col-span-4">
          <Reveal>
            <SectionLabel index="02">Expertise</SectionLabel>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-6 font-serif text-5xl leading-[1.02] tracking-tight text-ink-900 md:text-[64px]">
              A toolkit built for <em className="text-ember-600">modern</em> brands.
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-6 max-w-md text-ink-600">
              Six disciplines I combine — depending on the brief — to move brands
              from invisible to unforgettable.
            </p>
          </Reveal>
        </div>

        <div className="col-span-12 md:col-span-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {EXPERTISE.map((e, i) => (
              <Reveal key={e.n} delay={i}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.4, ease: [0.2, 0.65, 0.2, 1] }}
                  className="group relative h-full overflow-hidden rounded-3xl border border-ink-900/10 bg-white/70 p-7 shadow-glass backdrop-blur transition-colors hover:bg-white"
                >
                  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-ember-100/0 blur-2xl transition-all duration-700 group-hover:bg-ember-100/70" />
                  <div className="relative flex items-center justify-between">
                    <span className="font-mono text-[11px] tracking-[0.22em] text-ink-500">
                      {e.n}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-ember-500/80 transition-transform duration-500 group-hover:scale-125" />
                  </div>
                  <h3 className="relative mt-6 font-serif text-[26px] text-ink-900 tracking-tight">
                    {e.title}
                  </h3>
                  <p className="relative mt-3 text-[15px] leading-relaxed text-ink-600">
                    {e.body}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  PERSONAL BRANDS                                                    */
/* ------------------------------------------------------------------ */

const PlayIcon = () => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    className="h-10 w-10 drop-shadow-lg"
    aria-hidden
  >
    <circle cx="24" cy="24" r="24" fill="rgba(255,255,255,0.18)" />
    <circle cx="24" cy="24" r="23" stroke="rgba(255,255,255,0.55)" strokeWidth="1" />
    <path d="M19 16.5l14 7.5-14 7.5V16.5z" fill="white" />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.67a8.18 8.18 0 0 0 4.79 1.52V6.71a4.85 4.85 0 0 1-1.02-.02z" />
  </svg>
);

/**
 * Microlink often returns image: null for bare tiktok.com/.../video/ URLs.
 * TikTok’s HTML includes og:image when ?lang=en is present — use that only
 * for the preview fetch (link href stays the original clip.url).
 */
function microlinkUrlForTikTok(pageUrl) {
  try {
    const u = new URL(pageUrl);
    if (!u.hostname.includes("tiktok.com")) return pageUrl;
    if (!u.searchParams.has("lang")) {
      u.searchParams.set("lang", "en");
    }
    return u.toString();
  } catch {
    return pageUrl;
  }
}

/** Thumbnail via Microlink; tap opens the TikTok video in a new tab. Empty url = placeholder slot. */
function TikTokClipTile({ clip, clipIndex }) {
  const isPlaceholder =
    clip.placeholder === true || !clip.url || clip.url === "#";

  const [posterUrl, setPosterUrl] = useState(null);
  const [posterLoading, setPosterLoading] = useState(!isPlaceholder);

  useEffect(() => {
    if (isPlaceholder) {
      setPosterLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const lookupUrl = microlinkUrlForTikTok(clip.url);
        const res = await fetch(
          `https://api.microlink.io/?url=${encodeURIComponent(lookupUrl)}`
        );
        if (!res.ok) return;
        const json = await res.json();
        const u = json?.data?.image?.url;
        if (!cancelled && u) setPosterUrl(u);
      } catch {
        /* network / blocked */
      } finally {
        if (!cancelled) setPosterLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [clip.url, isPlaceholder]);

  const shell =
    "relative aspect-[9/16] overflow-hidden rounded-2xl border border-ink-900/10 bg-black/5 shadow-sm";

  if (isPlaceholder) {
    return (
      <div
        className={`${shell} border-dashed border-ink-900/20 bg-bone-100/80`}
        aria-label="Empty video slot"
      >
        <PlaceholderVisual
          palette={clip.palette}
          index={clipIndex + 1}
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="rounded-full bg-black/45 px-2.5 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-white backdrop-blur-sm">
            Slot
          </span>
        </div>
        <div className="pointer-events-none absolute bottom-2 left-0 right-0 flex justify-center">
          <span className="rounded-full bg-black/40 px-2 py-0.5 text-[9px] font-medium tracking-[0.12em] text-white/90 backdrop-blur-sm">
            {clip.views}
          </span>
        </div>
      </div>
    );
  }

  return (
    <a
      href={clip.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${shell} group block`}
      aria-label={`Open TikTok clip — ${clip.views}`}
    >
      <div className="absolute inset-0">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setPosterUrl(null)}
          />
        ) : (
          <PlaceholderVisual
            palette={clip.palette}
            index={clipIndex + 1}
          />
        )}
        {posterLoading && (
          <div className="pointer-events-none absolute inset-0 animate-pulse bg-white/20" />
        )}
      </div>
      <span className="absolute inset-0 z-10 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/10">
        <PlayIcon />
      </span>
      <div className="pointer-events-none absolute bottom-2 left-0 right-0 z-10 flex justify-center">
        <span className="rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium tracking-[0.12em] text-white backdrop-blur-sm">
          {clip.views}
        </span>
      </div>
    </a>
  );
}

const PersonalBrands = () => (
  <section className="relative py-24 md:py-32">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">

      {/* header */}
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <Reveal>
            <div className="flex items-center gap-3 text-[11px] font-medium tracking-[0.22em] uppercase text-ink-500">
              <span className="font-mono text-ember-600">✦</span>
              <span className="h-px w-8 bg-ink-400/40" />
              <span>Personal Brands</span>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-5 max-w-2xl font-serif text-5xl leading-[1.02] tracking-tight text-ink-900 md:text-[64px]">
              Building audiences{" "}
              <em className="text-ember-600">from scratch</em>.
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-ink-600">
              Two TikTok accounts grown organically — I post most on the newer
              one now; the original is where the million-plus following built up
              over time.
            </p>
          </Reveal>
        </div>
      </div>

      {/* brand cards */}
      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
        {PERSONAL_BRANDS.map((brand, bi) => (
          <Reveal key={brand.handle} delay={bi}>
            <div className="flex h-full flex-col overflow-hidden rounded-[28px] border border-ink-900/10 bg-white shadow-glass">

              {/* card header */}
              <div className="flex items-start justify-between border-b border-ink-900/[0.07] px-7 py-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-900 px-2.5 py-1 text-[11px] font-medium tracking-[0.12em] text-bone-100">
                      <TikTokIcon />
                      {brand.platform}
                    </span>
                  </div>
                  <div className="mt-3 font-serif text-[28px] tracking-tight text-ink-900 leading-none">
                    {brand.handle}
                  </div>
                  <div className="mt-1 text-[13px] text-ink-500">{brand.description}</div>
                </div>
                <div className="text-right">
                  <div className="font-serif text-4xl tracking-tight text-ink-900">
                    {brand.followers}
                  </div>
                  <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-500">
                    followers
                  </div>
                </div>
              </div>

              {/* milestone badge */}
              <div className="flex items-center gap-2 border-b border-ink-900/[0.07] px-7 py-3">
                <span className="h-1.5 w-1.5 rounded-full bg-ember-500" />
                <span className="text-[12px] font-medium text-ink-600">{brand.milestone}</span>
              </div>

              {/* clip grid */}
              <div className="grid grid-cols-3 gap-2 p-4">
                {brand.clips.map((clip, ci) => (
                  <TikTokClipTile key={clip.url} clip={clip} clipIndex={ci} />
                ))}
              </div>

              {/* footer */}
              <div className="mt-auto flex items-center justify-between border-t border-ink-900/[0.07] px-7 py-5">
                <span className="text-[12px] font-medium uppercase tracking-[0.2em] text-ink-500">
                  3 clips · {brand.platform}
                </span>
                <a
                  href={brand.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 rounded-full border border-ink-900/15 bg-bone-50 px-4 py-2 text-[13px] font-medium text-ink-800 transition-all hover:bg-white hover:border-ink-900/30"
                >
                  View account
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                </a>
              </div>

            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/** Expanded case study layout for /work/personal-brands — @pauocam first, 10 clips per account. */
const PersonalBrandsDetail = () => (
  <section className="relative pb-24 pt-4 md:pb-32 md:pt-2">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <Reveal>
        <h1 className="max-w-4xl font-serif text-5xl leading-[1.02] tracking-tight text-ink-900 md:text-[64px]">
          Personal <em className="text-ember-600">brands</em>, in full.
        </h1>
      </Reveal>
      <Reveal delay={1}>
        <p className="mt-6 max-w-3xl text-[17px] leading-relaxed text-ink-600">
          Two TikTok accounts, two eras:{" "}
          <strong className="font-medium text-ink-800">@pauocam</strong> is
          where I&apos;m most active today (2025–2026) — daily posting, faster
          tests, and the front edge of what I&apos;m learning.{" "}
          <strong className="font-medium text-ink-800">@paulina_ocampo</strong>{" "}
          is the archive and proof of the long game (2020–2024) — consistency,
          compounding, and how a million-plus following actually gets built over
          years, not overnight.
        </p>
      </Reveal>

      <div className="mt-16 flex flex-col gap-14 md:gap-20">
        {PERSONAL_BRANDS_DETAIL.map((brand, bi) => (
          <Reveal key={brand.handle} delay={bi + 2}>
            <article className="overflow-hidden rounded-[28px] border border-ink-900/10 bg-white shadow-glass">
              <div className="flex flex-col gap-6 border-b border-ink-900/[0.07] px-6 py-8 sm:px-10 sm:py-10 md:flex-row md:items-start md:justify-between">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-900 px-2.5 py-1 text-[11px] font-medium tracking-[0.12em] text-bone-100">
                      <TikTokIcon />
                      {brand.platform}
                    </span>
                    <span className="rounded-full border border-ink-900/15 bg-bone-50 px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink-600">
                      {brand.yearsActive}
                    </span>
                  </div>
                  <h2 className="mt-4 font-serif text-[32px] leading-none tracking-tight text-ink-900 sm:text-[38px]">
                    {brand.handle}
                  </h2>
                  <p className="mt-2 font-serif text-lg italic text-ember-600">
                    {brand.tagline}
                  </p>
                  <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink-600">
                    {brand.paragraphs.map((p, pi) => (
                      <p key={pi}>{p}</p>
                    ))}
                  </div>
                </div>
                <div className="flex shrink-0 flex-col items-start gap-1 border-t border-ink-900/10 pt-6 md:border-t-0 md:border-l md:pl-10 md:pt-0">
                  <div className="font-serif text-5xl tracking-tight text-ink-900 sm:text-6xl">
                    {brand.followers}
                  </div>
                  <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink-500">
                    followers
                  </div>
                  <p className="mt-4 max-w-[220px] text-[12px] leading-snug text-ink-500">
                    {brand.milestone}
                  </p>
                </div>
              </div>

              <div className="border-b border-ink-900/[0.06] px-6 py-3 sm:px-10">
                <span className="font-mono text-[11px] tracking-[0.18em] text-ink-500 uppercase">
                  10 video slots · tap thumbnails with real links to open in
                  TikTok
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 p-4 sm:grid-cols-3 sm:gap-3 md:grid-cols-5 md:p-6">
                {brand.clips.map((clip, ci) => (
                  <TikTokClipTile
                    key={`${brand.handle}-${ci}`}
                    clip={clip}
                    clipIndex={ci}
                  />
                ))}
              </div>

              <div className="flex flex-col items-start justify-between gap-4 border-t border-ink-900/[0.07] px-6 py-6 sm:flex-row sm:items-center sm:px-10">
                <span className="text-[12px] font-medium uppercase tracking-[0.2em] text-ink-500">
                  {brand.handle} · {brand.platform}
                </span>
                <a
                  href={brand.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 rounded-full border border-ink-900/15 bg-bone-50 px-4 py-2 text-[13px] font-medium text-ink-800 transition-all hover:bg-white hover:border-ink-900/30"
                >
                  View full profile on TikTok
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                    →
                  </span>
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  RESULTS                                                            */
/* ------------------------------------------------------------------ */

const Results = () => (
  <section
    id="results"
    className="relative mx-3 my-12 overflow-hidden rounded-[40px] bg-ink-900 py-24 text-bone-100 md:mx-6 md:my-20 md:py-32"
  >
    <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 10%, rgba(224,148,120,0.6), transparent 40%), radial-gradient(circle at 80% 90%, rgba(194,89,63,0.5), transparent 45%)",
        }}
      />
    </div>
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.08]"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      }}
    />

    <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
      <div className="grid grid-cols-12 gap-6 md:gap-10">
        <div className="col-span-12 md:col-span-5">
          <Reveal>
            <div className="flex items-center gap-3 text-[11px] font-medium tracking-[0.22em] uppercase text-bone-100/60">
              <span className="font-mono text-ember-300">03</span>
              <span className="h-px w-8 bg-bone-100/30" />
              <span>Results & proof</span>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-6 font-serif text-5xl leading-[1.02] tracking-tight text-bone-100 md:text-[64px]">
              Numbers that{" "}
              <em className="italic text-ember-300">speak louder</em> than
              decks.
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-6 max-w-md text-bone-100/70">
              Results are the resume. Every metric below is from real campaigns,
              creator collaborations, and personal projects shipped over the last
              three years.
            </p>
          </Reveal>
          <Reveal delay={3}>
            <div className="mt-10 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/15 px-4 py-2 text-[12px] text-bone-100/80">
                Organic-first
              </span>
              <span className="rounded-full border border-white/15 px-4 py-2 text-[12px] text-bone-100/80">
                Data-informed
              </span>
              <span className="rounded-full border border-white/15 px-4 py-2 text-[12px] text-bone-100/80">
                Culture-led
              </span>
            </div>
          </Reveal>
        </div>

        <div className="col-span-12 md:col-span-7">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {RESULTS.map((r, i) => (
              <Reveal key={r.k} delay={i}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.4 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur transition-all hover:bg-white/[0.07]"
                >
                  <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-ember-500/10 blur-2xl transition-all duration-700 group-hover:bg-ember-500/20" />
                  <div className="relative break-words font-serif text-4xl tracking-tight text-bone-100 sm:text-5xl md:text-6xl">
                    {r.k}
                  </div>
                  <div className="relative mt-3 max-w-xs text-[14px] leading-relaxed text-bone-100/70">
                    {r.v}
                  </div>
                  <div className="relative mt-6 flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-ember-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-ember-300" />
                    Verified outcome
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={4}>
            <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur">
              <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                <div>
                  <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-bone-100/50">
                    Featured / earned
                  </div>
                  <div className="mt-2 font-serif text-2xl text-bone-100">
                    Client work referenced across editorial & creator circles.
                  </div>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {PRESS.slice(0, 4).map((p) => (
                    <span
                      key={p}
                      className="font-serif tracking-[0.18em] text-bone-100/70"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  SKILLS                                                             */
/* ------------------------------------------------------------------ */

const Skills = () => (
  <section id="skills" className="relative py-24 md:py-32">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="grid grid-cols-12 gap-6 md:gap-10">
        <div className="col-span-12 md:col-span-5">
          <Reveal>
            <SectionLabel index="04">Skills & Tools</SectionLabel>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-6 font-serif text-5xl leading-[1.02] tracking-tight text-ink-900 md:text-[64px]">
              The <em className="text-ember-600">craft</em>, quickly.
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-6 max-w-md text-ink-600">
              A mix of strategic disciplines and hands-on tools — everything I
              bring into a brief on day one.
            </p>
          </Reveal>
        </div>

        <div className="col-span-12 md:col-span-7">
          <Reveal delay={1}>
            <ul className="flex flex-wrap gap-2.5">
              {SKILLS.map((s, i) => (
                <motion.li
                  key={s}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    ease: [0.2, 0.65, 0.2, 1],
                    delay: i * 0.03,
                  }}
                  whileHover={{ y: -2 }}
                  className={`cursor-default rounded-full border px-4 py-2 text-[13px] font-medium transition-all ${
                    i % 5 === 0
                      ? "border-ink-900/70 bg-ink-900 text-bone-100"
                      : i % 4 === 0
                      ? "border-ember-500/40 bg-ember-50 text-ember-700"
                      : "border-ink-900/15 bg-white/70 text-ink-800 backdrop-blur hover:bg-white"
                  }`}
                >
                  {s}
                </motion.li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={2}>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { k: "Strategy", v: "Brand, content, growth" },
                { k: "Production", v: "Video, photo, design" },
                { k: "Analytics", v: "Insight → action loops" },
              ].map((b) => (
                <div
                  key={b.k}
                  className="rounded-2xl border border-ink-900/10 bg-white/60 p-5 backdrop-blur"
                >
                  <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink-500">
                    {b.k}
                  </div>
                  <div className="mt-2 font-serif text-lg text-ink-900">
                    {b.v}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  CONTACT                                                            */
/* ------------------------------------------------------------------ */

const Contact = () => (
  <section
    id="contact"
    className="relative overflow-hidden px-3 pb-10 pt-24 md:px-6 md:pt-32"
  >
    <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[40px] border border-ink-900/10 bg-gradient-to-br from-bone-50 via-white to-[#F9EDE3] p-8 shadow-card md:p-16">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-ember-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-ember-300/20 blur-3xl" />

      <div className="relative grid grid-cols-12 gap-8 md:gap-10">
        <div className="col-span-12 md:col-span-8">
          <Reveal>
            <SectionLabel index="05">Let’s work</SectionLabel>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-6 font-serif text-[44px] leading-[0.98] tracking-tight text-ink-900 sm:text-[72px] md:text-[96px]">
              Have a brand
              <br />
              worth <em className="text-ember-600">obsessing</em> over?
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-ink-600">
              I’m currently applying to Summer ’26 marketing internships and
              open to select freelance collaborations. If your team cares about
              craft as much as growth — I’d love to talk.
            </p>
          </Reveal>
          <Reveal delay={3}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <PillButton href={`mailto:${EMAIL}`}>Email me</PillButton>
              <PillButton href={LINKEDIN} variant="outline">
                LinkedIn
              </PillButton>
              <PillButton
                href="https://www.instagram.com/pau_ocam/"
                variant="outline"
              >
                Instagram
                <span className="font-normal text-ink-500">(@pau_ocam)</span>
              </PillButton>
              <PillButton to="/resume" variant="outline">
                Resume
              </PillButton>
            </div>
          </Reveal>
        </div>

        <div className="col-span-12 md:col-span-4">
          <Reveal delay={2}>
            <div className="flex h-full flex-col justify-between gap-6 rounded-3xl border border-ink-900/10 bg-white/70 p-6 backdrop-blur md:p-7">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-ink-500">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember-500 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-ember-500" />
                  </span>
                  Availability
                </div>
                <div className="mt-3 font-serif text-2xl text-ink-900">
                  Summer 2026 internships
                </div>
                <div className="mt-1 text-[14px] text-ink-600">
                  Remote or New York · Full-time or part-time
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { k: "Email", v: EMAIL, href: `mailto:${EMAIL}` },
                  { k: "Instagram", v: "@pau_ocam", href: "https://www.instagram.com/pau_ocam/" },
                  {
                    k: "LinkedIn",
                    v: "linkedin.com/in/paulina-lozano-680324201",
                    href: LINKEDIN,
                  },
                ].map((c) => (
                  <a
                    key={c.k}
                    href={c.href}
                    target={
                      typeof c.href === "string" && c.href.startsWith("https://")
                        ? "_blank"
                        : undefined
                    }
                    rel={
                      typeof c.href === "string" && c.href.startsWith("https://")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group flex items-center justify-between gap-2 rounded-2xl border border-ink-900/10 bg-bone-50/60 px-4 py-3 text-[14px] text-ink-800 transition-all hover:bg-white"
                  >
                    <div className="min-w-0">
                      <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink-500">
                        {c.k}
                      </div>
                      <div className="mt-0.5 truncate">{c.v}</div>
                    </div>
                    <span className="shrink-0 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100">
                      →
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* BIG NAME WORDMARK */}
      <Reveal delay={3}>
        <div className="relative mt-16 overflow-hidden pt-6 border-t border-ink-900/10">
          <div className="font-serif leading-none tracking-tightest text-ink-900/90 text-[22vw] md:text-[16vw]">
            {NAME.replace(/\[|\]/g, "") || "hername"}
            <span className="text-ember-600">.</span>
          </div>
        </div>
      </Reveal>
    </div>

    {/* Footer */}
    <div className="mx-auto mt-10 flex max-w-7xl flex-col items-start justify-between gap-4 px-3 pb-12 text-[12px] text-ink-500 sm:flex-row sm:items-center md:px-6">
      <div className="flex items-center gap-3">
        <span className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full border border-ink-900/15 bg-bone-200 shadow-sm">
          <img
            src={navProfile}
            alt={`${NAME} profile`}
            className="h-full w-full object-cover"
          />
        </span>
        © {new Date().getFullYear()} {NAME}. Designed with care.
      </div>
      <div className="flex items-center gap-5 font-mono tracking-[0.18em] uppercase">
        <Link to="/" className="hover-underline">
          Back to top ↑
        </Link>
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  APP / ROUTING                                                      */
/* ------------------------------------------------------------------ */

function SiteShell({ children }) {
  return (
    <div className="relative overflow-x-clip bg-bone-100">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(1200px 600px at 85% -10%, rgba(224,148,120,0.18), transparent 60%), radial-gradient(900px 500px at -10% 30%, rgba(221,208,186,0.35), transparent 55%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.06] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
      <ScrollProgress />
      <Nav />
      {children}
    </div>
  );
}

function HomePage() {
  return (
    <SiteShell>
      <main>
        <Hero />
        <About />
        <PersonalBrands />
        <Expertise />
        <Results />
        <Skills />
        <Contact />
      </main>
    </SiteShell>
  );
}

function WorkPersonalBrandsDetailPage() {
  return (
    <SiteShell>
      <main>
        <div className="mx-auto max-w-7xl px-5 pb-2 pt-28 sm:px-8 md:pt-32">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-ink-600 transition-colors hover:text-ink-900"
          >
            <span aria-hidden>←</span> Home
          </Link>
        </div>
        <PersonalBrandsDetail />
      </main>
    </SiteShell>
  );
}

/** Placeholder tiles — swap each `src` when you add images (import + pass to PlaceholderVisual). */
const PORTRAIT_GALLERY_ROWS = [
  {
    layout: "grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5",
    items: [
      {
        title: "Editorial — full length",
        category: "Editorial",
        palette: "from-[#1C1917] via-[#3D3833] to-[#6E645C]",
        aspect: "aspect-[3/4] min-h-[280px] sm:min-h-[320px]",
      },
      {
        title: "Outdoor — natural light",
        category: "Outdoor",
        palette: "from-[#DDD0BA] via-[#C9B89A] to-[#4A423D]",
        aspect: "aspect-[3/4] min-h-[280px] sm:min-h-[320px]",
      },
      {
        title: "Close portrait",
        category: "Studio",
        palette: "from-[#F2E4D2] via-[#DDD0BA] to-[#968A80]",
        aspect: "aspect-[3/4] min-h-[280px] sm:min-h-[320px]",
      },
    ],
  },
  {
    layout: "grid-cols-1 gap-4 md:grid-cols-2 md:gap-5",
    items: [
      {
        title: "Environmental — wide",
        category: "Lifestyle",
        palette: "from-[#E6C9B4] via-[#D9A88A] to-[#A8432B]",
        aspect: "aspect-[21/9] min-h-[160px] md:min-h-[200px]",
      },
      {
        title: "Film tone — low sun",
        category: "Outdoor",
        palette: "from-[#F5D8CA] via-[#E09478] to-[#C2593F]",
        aspect: "aspect-[21/9] min-h-[160px] md:min-h-[200px]",
      },
    ],
  },
  {
    layout: "grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4",
    items: [
      {
        title: "Headshot — warm",
        category: "Studio",
        palette: "from-[#E6C9B4] via-[#C9A882] to-[#6E645C]",
        aspect: "aspect-square min-h-[140px]",
      },
      {
        title: "Movement / candid",
        category: "Editorial",
        palette: "from-[#2A2420] via-[#4A423D] to-[#1C1917]",
        aspect: "aspect-square min-h-[140px]",
      },
      {
        title: "Texture & fabric",
        category: "Detail",
        palette: "from-[#DDD0BA] via-[#B8A892] to-[#8B7E72]",
        aspect: "aspect-square min-h-[140px]",
      },
      {
        title: "Night / available light",
        category: "Outdoor",
        palette: "from-[#1C1917] via-[#2A2420] to-[#4A423D]",
        aspect: "aspect-square min-h-[140px]",
      },
    ],
  },
  {
    layout: "grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5",
    items: [
      {
        title: "Two-frame story",
        category: "Editorial",
        palette: "from-[#F2E4D2] via-[#E8D5C4] to-[#C9B89A]",
        aspect: "aspect-[4/5] min-h-[300px] sm:min-h-[360px]",
      },
      {
        title: "Soft window light",
        category: "Studio",
        palette: "from-[#F5D8CA] via-[#DDD0BA] to-[#968A80]",
        aspect: "aspect-[4/5] min-h-[300px] sm:min-h-[360px]",
      },
    ],
  },
];

const PortraitPhotoSlot = ({
  palette,
  aspect,
  index,
  src,
  objectPosition = "center center",
}) => (
  <div className="group relative overflow-hidden rounded-2xl border border-ink-900/10 bg-white shadow-card">
    <div className={`relative w-full overflow-hidden rounded-[inherit] ${aspect}`}>
      <PlaceholderVisual
        palette={palette}
        index={index}
        src={src}
        objectPosition={objectPosition}
        imageClassName="object-cover"
      />
    </div>
  </div>
);

function WorkPortraitsDetailPage() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-7xl px-5 pb-28 pt-28 sm:px-8 md:pt-36">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[13px] font-medium text-ink-600 transition-colors hover:text-ink-900"
        >
          <span aria-hidden>←</span> Home
        </Link>
        <h1 className="mt-8 font-serif text-5xl leading-[1.02] tracking-tight text-ink-900 md:text-[64px]">
          Portrait <em className="text-ember-600">photography</em>
        </h1>
        <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-600">
          A growing collection of personal portrait work — outdoor, studio, and
          editorial frames. Each tile below is a placeholder until real selects
          are dropped in (same layout, swap in an image per slot).
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          {["All", "Outdoor", "Studio", "Editorial", "Lifestyle"].map((label, i) => (
            <span
              key={label}
              className={`rounded-full border px-4 py-1.5 text-[12px] font-medium transition-colors ${
                i === 0
                  ? "border-ink-900 bg-ink-900 text-bone-100"
                  : "border-ink-900/15 bg-white/70 text-ink-700"
              }`}
            >
              {label}
            </span>
          ))}
          <span className="ml-1 text-[11px] text-ink-500">
            (filters are visual for now)
          </span>
        </div>

        <div className="mt-12 space-y-10 md:space-y-14">
          {PORTRAIT_GALLERY_ROWS.map((row, ri) => (
            <div key={ri}>
              <div className={`grid ${row.layout}`}>
                {row.items.map((item, ii) => (
                  <PortraitPhotoSlot
                    key={`${ri}-${ii}`}
                    palette={item.palette}
                    aspect={item.aspect}
                    index={ri * 10 + ii + 1}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-12 max-w-2xl rounded-2xl border border-ink-900/10 bg-white/60 p-5 text-[13px] leading-relaxed text-ink-600 backdrop-blur">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500">
            For developers
          </span>
          <span className="mt-2 block">
            To add a photo: import it at the top of{" "}
            <code className="rounded bg-bone-200 px-1.5 py-0.5 font-mono text-[12px] text-ink-800">
              App.jsx
            </code>
            , extend each item in{" "}
            <code className="rounded bg-bone-200 px-1.5 py-0.5 font-mono text-[12px] text-ink-800">
              PORTRAIT_GALLERY_ROWS
            </code>{" "}
            with <code className="font-mono text-[12px]">src</code>, and pass{" "}
            <code className="font-mono text-[12px]">src</code> through{" "}
            <code className="font-mono text-[12px]">PortraitPhotoSlot</code> →{" "}
            <code className="font-mono text-[12px]">PlaceholderVisual</code>.
          </span>
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <PillButton href="/#contact">Book a session</PillButton>
          <PillButton href="/" variant="outline">
            Back home
          </PillButton>
        </div>
      </main>
    </SiteShell>
  );
}

function ResumePage() {
  useEffect(() => {
    const prev = document.title;
    document.title = `Resume — ${NAME}`;
    return () => {
      document.title = prev;
    };
  }, []);

  const resumeEmail = "paulina3101@hotmail.com";
  const instagramUrl = "https://www.instagram.com/pau_ocam/";

  const skillTags = [
    "DaVinci Resolve",
    "Graphic design",
    "Content creation",
    "Social media marketing",
    "Videography",
    "Photography",
    "Branding & marketing strategy",
    "Microsoft Word",
    "Microsoft Excel",
  ];

  const additionalPoints = [
    "Strong communication and teamwork skills",
    "Creative problem solver with leadership experience",
    "Passionate about digital marketing and visual storytelling",
    "Adaptable and fast learner in collaborative environments",
  ];

  return (
    <SiteShell>
      <main className="mx-auto max-w-3xl px-5 pb-28 pt-24 sm:px-8 md:pt-28">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[13px] font-medium text-ink-600 transition-colors hover:text-ink-900"
        >
          <span aria-hidden>←</span> Home
        </Link>

        <article className="relative mt-10 overflow-hidden rounded-[32px] border border-ink-900/10 bg-gradient-to-br from-white via-bone-50 to-[#F9EDE3] p-8 shadow-card md:p-12 md:rounded-[40px]">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-ember-200/40 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-ember-300/25 blur-3xl"
          />

          <header className="relative border-b border-ink-900/10 pb-8">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-ember-600">
              Resume
            </p>
            <h1 className="mt-3 font-serif text-[clamp(2rem,6vw,3.25rem)] leading-[1.05] tracking-tight text-ink-900">
              {NAME}
            </h1>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[14px] leading-snug text-ink-600">
              <span>College Place, WA</span>
              <span className="hidden text-ink-300 sm:inline" aria-hidden>
                |
              </span>
              <a
                href={`mailto:${resumeEmail}`}
                className="text-ink-800 underline decoration-ink-900/20 underline-offset-4 transition-colors hover:text-ember-600 hover:decoration-ember-500/40"
              >
                {resumeEmail}
              </a>
              <span className="hidden text-ink-300 sm:inline" aria-hidden>
                |
              </span>
              <span>
                Instagram:{" "}
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-ink-800 underline decoration-ink-900/20 underline-offset-4 transition-colors hover:text-ember-600 hover:decoration-ember-500/40"
                >
                  @pau_ocam
                </a>
              </span>
              <span className="hidden text-ink-300 sm:inline" aria-hidden>
                |
              </span>
              <span>Languages: English, Spanish, Italian</span>
            </div>
          </header>

          <section className="relative mt-10">
            <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-ember-600">
              Professional summary
            </h2>
            <p className="mt-4 text-pretty text-[15px] leading-relaxed text-ink-700 md:text-[16px]">
              Creative and results-driven marketing student with experience in
              social media management, content creation, branding, and digital
              marketing strategy. Skilled in Adobe Creative Suite, videography,
              photography, and audience engagement. Successfully built and
              managed online communities with over 1 million followers and
              developed content strategies that increased engagement and brand
              visibility. Passionate about storytelling, visual communication,
              and helping brands connect with their audiences.
            </p>
          </section>

          <section className="relative mt-12">
            <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-ember-600">
              Education
            </h2>
            <div className="mt-4 rounded-2xl border border-ink-900/10 bg-white/70 p-6 backdrop-blur md:p-7">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                <div>
                  <h3 className="font-serif text-xl tracking-tight text-ink-900 md:text-2xl">
                    Walla Walla University
                  </h3>
                  <p className="mt-1 text-[15px] font-medium text-ink-700">
                    Bachelor of Business Administration (BBA), Marketing
                  </p>
                </div>
                <p className="shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-500">
                  Expected 2027
                </p>
              </div>
              <p className="mt-4 text-[14px] leading-relaxed text-ink-600">
                Relevant coursework includes marketing strategy, consumer
                behavior, branding, digital media, and design-related studies.
              </p>
            </div>
          </section>

          <section className="relative mt-12">
            <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-ember-600">
              Professional experience
            </h2>
            <ul className="mt-6 space-y-6">
              <li className="rounded-2xl border border-ink-900/10 bg-white/60 p-6 backdrop-blur md:p-7">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-serif text-lg text-ink-900 md:text-xl">
                    Social Media Manager{" "}
                    <span className="font-sans text-[15px] font-normal text-ink-500">
                      — Freelance
                    </span>
                  </h3>
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-500">
                    Dec 2023 – Present
                  </p>
                </div>
                <ul className="mt-4 list-none space-y-2.5 text-[14px] leading-relaxed text-ink-700">
                  {[
                    "Built and managed social media communities reaching over 1 million followers",
                    "Successfully grew a new social media account to 80K followers",
                    "Created engaging digital content tailored to audience trends and brand identity",
                    "Developed social media strategies to increase audience engagement and online visibility",
                    "Analyzed audience behavior and content performance to improve growth and reach",
                  ].map((line) => (
                    <li key={line} className="flex gap-2.5">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ember-500/80" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="rounded-2xl border border-ink-900/10 bg-white/60 p-6 backdrop-blur md:p-7">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <h3 className="font-serif text-lg text-ink-900 md:text-xl">
                      Marketing Team — Videographer &amp; Content Creator
                    </h3>
                    <p className="mt-0.5 text-[15px] text-ink-500">
                      ASWWU Marketing
                    </p>
                  </div>
                  <p className="mt-1 shrink-0 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-500 sm:mt-0">
                    Sept 2025 – Present
                  </p>
                </div>
                <ul className="mt-4 list-none space-y-2.5 text-[14px] leading-relaxed text-ink-700">
                  {[
                    "Collaborate with marketing team members to create promotional and social media content",
                    "Produce video and graphic content using Adobe Creative Suite tools",
                    "Assist in campaign development and audience engagement strategies",
                    "Support branding efforts through photography, videography, and creative storytelling",
                    "Coordinate project testing and content validation to ensure quality and consistency",
                  ].map((line) => (
                    <li key={line} className="flex gap-2.5">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ember-500/80" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </section>

          <section className="relative mt-12">
            <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-ember-600">
              Projects
            </h2>
            <div className="mt-4 rounded-2xl border border-ink-900/10 bg-white/70 p-6 backdrop-blur md:p-7">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="font-serif text-lg text-ink-900 md:text-xl">
                  ABC Library Marketing Strategy Project
                </h3>
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-500">
                  Walla Walla, WA · Sept 2025 – Present
                </p>
              </div>
              <ul className="mt-4 list-none space-y-2.5 text-[14px] leading-relaxed text-ink-700">
                {[
                  "Developed a marketing strategy to support a small local bookstore facing financial challenges",
                  "Created promotional content and branding ideas to improve community engagement",
                  "Assisted with social media planning and audience outreach initiatives",
                  "Worked on creative solutions for businesses with limited marketing resources",
                ].map((line) => (
                  <li key={line} className="flex gap-2.5">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ember-500/80" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="relative mt-12">
            <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-ember-600">
              Technical skills
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {skillTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-ink-900/10 bg-white/80 px-3.5 py-1.5 text-[12px] font-medium text-ink-800 shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>

          <section className="relative mt-12">
            <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-ember-600">
              Additional information
            </h2>
            <ul className="mt-4 space-y-2.5 text-[14px] leading-relaxed text-ink-700">
              {additionalPoints.map((line) => (
                <li key={line} className="flex gap-2.5">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-400" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </section>

          <footer className="relative mt-12 flex flex-wrap gap-3 border-t border-ink-900/10 pt-8">
            <PillButton href={`mailto:${resumeEmail}`}>Email</PillButton>
            <PillButton href={LINKEDIN} variant="outline">
              LinkedIn
            </PillButton>
            <PillButton to="/" variant="outline">
              Back home
            </PillButton>
          </footer>
        </article>
      </main>
    </SiteShell>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/work/personal-brands"
        element={<WorkPersonalBrandsDetailPage />}
      />
      <Route path="/work/portraits" element={<WorkPortraitsDetailPage />} />
      <Route path="/resume" element={<ResumePage />} />
    </Routes>
  );
}
