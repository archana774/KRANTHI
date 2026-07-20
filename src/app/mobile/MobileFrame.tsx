import { useState, type ReactNode, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, MapPin } from "lucide-react";
import svgPaths from "../../imports/Frame1/svg-45i862k53t";
import imgRectangle32 from "../../imports/Frame1/5c4eaf3a1102d49df614519474acf21d3398fd4c.png";
import imgRectangle34 from "../../imports/Frame1/45499396be3a390a96f5099dbc189d8b2b77eb12.png";
import imgGecLogo2 from "../../imports/Frame1/82d51feb224dd91aae210a15c04fad096bbf15d8.png";
import imgKranthiPoster from "../../imports/Frame1/kranthi-about-poster.jpg";
import imgRectangle35 from "../../imports/Frame1/eb58194fa5ddc18d5936b5417f313afe61eb4fa6.png";
import imgEllipse7 from "../../imports/Frame1/1e9d098cb778eb196081c590c4afcc1fe0d6878b.png";
import { eventCards, EventCardData } from '../data/events';
import gallery1 from "../../assets/gallery/img1.jpg";
import gallery2 from "../../assets/gallery/img2.jpg";
import gallery3 from "../../assets/gallery/img3.jpg";
import gallery4 from "../../assets/gallery/img4.jpg";
import gallery5 from "../../assets/gallery/img5.jpg";
import imgScreenshot202605281922511 from "../../imports/Frame1/e4bed0a206dbd27dc4d4cebcf40bf349b5c4ee69.png";
import img00212 from "../../imports/Frame1/b2ee47414b20a78384a9c932ebcfa0df761d6406.png";
import imgPlaceholder1 from "../../imports/Frame1/db67e5187b552b6a4bed177eb2b7f4c348159e2e.png";
import StatCounter from "../components/StatCounter";
import FluidGlass from "../components/FluidGlass";
import RobotHandCanvas from "../components/RobotHandCanvas";

// ---------------------------------------------------------------------------
// Mobile-first rebuild of the KRANTHI'26 landing page.
// Every section here is laid out with normal document flow (flex/grid) so it
// reflows naturally at any width, instead of scaling down the fixed 1440px
// desktop canvas. Visual language (colors, fonts, glass/glow accents) matches
// the desktop version; only the layout mechanics differ.
// ---------------------------------------------------------------------------

function MobileHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative z-20 flex items-start justify-between px-5 pt-6 pointer-events-none"
    >
      <div className="flex flex-col gap-0.5 max-w-[62%]">
        <p className="font-['Orbitron',sans-serif] text-[#f5f7fa] text-[13px] leading-snug">
          INDIAN SOCIETY FOR TECHNICAL EDUCATION
        </p>
        <p className="font-['Orbitron',sans-serif] text-[#f5f7fa]/80 text-[10px] leading-snug">
          Government Engineering College Thrissur
        </p>
        <p className="font-['Orbitron',sans-serif] text-[#f5f7fa]/80 text-[10px] leading-snug">
          KE0001
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0 pointer-events-auto">
        <div className="relative w-9 h-9">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 78.2167 78.2167">
            <g>
              <path clipRule="evenodd" d={svgPaths.p20d55b00} fill="var(--fill-0, #0F0F0F)" fillRule="evenodd" />
              <path clipRule="evenodd" d={svgPaths.p20d55b00} fill="var(--fill-0, white)" fillRule="evenodd" />
            </g>
          </svg>
        </div>
        <div className="relative w-9 h-[33.4px]">
          <div
            className="absolute inset-0 bg-[#fffcfc] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[100%_100%]"
            style={{ maskImage: `url("${imgGecLogo2}")` }}
          />
        </div>
      </div>
    </motion.header>
  );
}

function MobileHero() {
  return (
    <section className="relative z-10 px-5 pt-10 pb-14 flex flex-col items-center text-center pointer-events-none">
      {/* Ambient glow, scaled down and centered for mobile */}
      <div
        className="absolute left-1/2 top-10 -translate-x-1/2 w-[320px] h-[220px] rounded-full mix-blend-screen pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(224,41,158,0.18) 0%, rgba(224,41,158,0) 70%)" }}
      />


      {/* Spacer to push elements down and preserve layout */}
      <div className="h-[120px] pointer-events-none" />



      <motion.h1
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full font-['Carbon',sans-serif] text-white leading-none [text-shadow:0px_4px_4px_rgba(0,0,0,0.5)] tracking-[-0.06em] z-10"
        style={{ fontSize: "clamp(1.6rem, 8.2vw, 3rem)" }}
      >
        KRANTHI'26
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
        className="relative font-['Orbitron',sans-serif] text-[#f5f7fa] text-[5.2vw] mt-3 max-w-[320px]"
      >
        Through the Glass of Innovation
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="relative font-['Orbitron',sans-serif] text-[#ef8ff6] text-[3.8vw] mt-3"
      >
        20 JULY 2026 - 1 AUG 2026
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        className="relative z-10 mt-6"
      >
        <GlassLabel className="!mx-auto !max-w-none scale-90 sm:scale-100">Welcome to KRANTHI'26</GlassLabel>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
        className="relative mt-8 mx-auto w-full max-w-[260px] rounded-[32px] overflow-hidden aspect-[4/5] border border-[rgba(239,143,246,0.5)] shadow-[0_0_30px_rgba(239,143,246,0.4)]"
      >
        <img
          loading="lazy"
          decoding="async"
          alt="KRANTHI Poster"
          className="absolute w-full h-full object-cover pointer-events-none"
          src={imgKranthiPoster}
        />
        <div className="absolute inset-0 bg-[rgba(42,35,110,0.2)]" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7 }}
        className="relative z-10 mt-12 font-['Orbitron',sans-serif] text-white text-[15px] leading-relaxed tracking-wide text-center max-w-[440px] mx-auto"
      >
        KRANTHI'26 is the flagship technical fest of ISTE GECT, bringing
        together innovators, creators, and problem-solvers through a series of
        engaging workshops, technical competitions, and hands-on experiences.
        Designed to inspire learning and foster innovation, KRANTHI serves as a
        platform for students to explore emerging technologies, develop
        practical skills, and showcase their talents in a dynamic and
        collaborative environment.
      </motion.p>
    </section>
  );
}

function GlassLabel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6 }}
      className={`glass-capsule-wrapper relative mx-auto w-fit max-w-[90vw] ${className}`}
      style={{ position: "relative" }}
    >
      <div className="glass-capsule-lens overflow-hidden" style={{ borderRadius: "999px" }} />
      <p
        className="font-['Carbon',sans-serif] text-[#f5f7fa] text-[clamp(14px,4.5vw,18px)] text-center px-5 py-2.5 whitespace-normal break-words"
        style={{ position: "relative", zIndex: 30, textShadow: "0 0 10px rgba(255,255,255,1), 0 0 20px rgba(0,255,255,0.8), 0 0 30px rgba(255,100,0,0.6)" }}
      >
        {children}
      </p>
    </motion.div>
  );
}

function MobileAbout() {
  const stats = [
    { end: 9, suffix: "+", label: "TECHNICAL EVENTS" },
    { value: "200+", label: "PARTICIPANTS", end: 200 },
    { end: 9, suffix: "+", label: "DEPARTMENTS" },
    { value: "2", label: "WEEKS" },
  ];

  return (
    <section className="relative z-10 px-5 py-14">
      <GlassLabel>About KRANTHI'26</GlassLabel>

      {/* Stats grid: 2x2 on phones, matches the four glass tiles on desktop */}
      <div className="relative mt-10 max-w-[420px] mx-auto z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#ef8ff6] opacity-25 blur-[70px] rounded-[100%] pointer-events-none -z-10 mix-blend-screen scale-110" />
        <div className="grid grid-cols-2 gap-4 relative z-10">
          {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="rounded-[28px] bg-[rgba(15,8,35,0.75)] border border-[rgba(239,143,246,0.7)] shadow-[0_0_30px_rgba(239,143,246,0.3)] py-6 px-3 flex flex-col items-center justify-center gap-1"
          >
            <span className="font-['Orbitron',sans-serif] text-white text-[32px] leading-none">
              {s.end ? <StatCounter end={s.end} suffix={s.suffix ?? "+"} /> : s.value}
            </span>
            <span className="font-['Orbitron',sans-serif] text-white text-[10px] tracking-wide">
              {s.label}
            </span>
          </motion.div>
        ))}
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mt-10 font-['Orbitron',sans-serif] text-white text-[15px] leading-relaxed tracking-wide text-center max-w-[440px] mx-auto"
      >
        KRANTHI 2026 is ISTE GECT's premier technical fest, featuring
        workshops, expert sessions, competitions, and exciting fun events
        organized across all nine departments. Designed to foster innovation,
        collaboration, and skill development, KRANTHI brings together students
        from diverse disciplines to learn, compete, and shape the future.
      </motion.p>
    </section>
  );
}


function MobileEventCard({ card, index }: { card: EventCardData; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08 }}
      className="h-full rounded-[28px] bg-[#090914]/20 border border-white/5 overflow-hidden flex flex-col active:scale-[0.98] transition-transform"
    >
      <div className="w-full aspect-[196/245] relative">
        <img loading="lazy" decoding="async" alt="" className="absolute inset-0 w-full h-full object-cover" src={card.image || imgRectangle35} />
        <div aria-hidden className="absolute inset-0 border border-black" />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <p className="font-['Orbitron',sans-serif] text-white text-[13px] text-center font-bold tracking-wide uppercase">{card.title}</p>
        <p className="font-['Orbitron',sans-serif] text-white/70 text-[9px] text-center -mt-1 uppercase">{card.sub}</p>
        
        <p className="font-sans font-light text-[11px] text-[#e0e5ed] mt-1 mb-2 leading-relaxed text-center min-h-[48px]">
          {card.desc}
        </p>

        <div className="font-['Orbitron',sans-serif] text-white/90 text-[11px] flex flex-col gap-1.5 mt-1 text-left">
          <div className="flex items-start gap-2"><span className="shrink-0 w-4">📅</span><span className="leading-snug">{card.date}</span></div>
          <div className="flex items-start gap-2"><span className="shrink-0 w-4">⏰</span><span className="leading-snug">{card.time}</span></div>
          <div className="flex items-start gap-2"><span className="shrink-0 w-4">📍</span><span className="leading-snug">{card.venue}</span></div>
          {card.teamSize && <div className="flex items-start gap-2"><span className="shrink-0 w-4">👥</span><span className="leading-snug">{card.teamSize}</span></div>}
          <div className="flex items-start gap-2"><span className="shrink-0 w-4">🏆</span><span className="leading-snug">{card.prize}</span></div>
          <div className="flex items-start gap-2"><span className="shrink-0 w-4">🎟️</span><span className="leading-snug">{card.fee}</span></div>
        </div>
        <a 
          href={card.link || "https://forms.gle/mhEFdYK5fUqobBSz8"} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="mt-3 block w-full text-center rounded-full bg-[rgba(42,35,110,0.35)] border border-white/10 py-3 font-['Orbitron',sans-serif] text-white text-[13px] active:scale-95 transition-all hover:bg-[rgba(239,143,246,0.3)] hover:border-[rgba(239,143,246,0.5)] z-20 relative pointer-events-auto"
        >
          REGISTER NOW
        </a>
      </div>
    </motion.div>
  );
}

function MobileEvents() {
  return (
    <section className="relative z-10 px-5 py-14">
      <GlassLabel>EVENTS</GlassLabel>
      <div className="mt-8 flex flex-col md:flex-row md:flex-wrap md:justify-center gap-5 max-w-[440px] md:max-w-[1000px] mx-auto">
        {eventCards.map((c, i) => (
          <div key={i} className="w-full md:w-[calc(50%-10px)] flex">
            <div className="w-full h-full">
              <MobileEventCard card={c} index={i} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const speakers = [
  { icon: "\ud83d\udc68\u200d\ud83d\udcbb" },
  { icon: "\ud83e\udd16" },
  { icon: "\ud83c\udfa8" },
  { icon: "\ud83d\udee1\ufe0f" },
  { icon: "\ud83d\ude80" },
];

function MobileSpeakers() {
  return (
    <section className="relative z-10 px-5 py-14">
      <GlassLabel>MEET THE SPEAKERS</GlassLabel>
      {/* Horizontal snap-scroll carousel: natural touch pattern for a row of cards on mobile */}
      <div className="mt-8 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {speakers.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileTap={{ scale: 0.98 }}
            className="snap-center shrink-0 w-[180px] h-[230px] rounded-[24px] flex flex-col items-center justify-center gap-3"
            style={{
              background: "linear-gradient(160deg, rgba(20,15,40,0.6), rgba(40,20,60,0.6))",
              backdropFilter: "blur(20px) saturate(160%)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 20px 40px -10px rgba(0,0,0,0.6)",
            }}
          >
            <div
              className="w-[76px] h-[76px] rounded-full flex items-center justify-center text-[2rem]"
              style={{ background: "radial-gradient(circle at 35% 30%, rgba(224,41,158,0.9), rgba(54,232,224,0.7))" }}
            >
              {s.icon}
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="font-['Orbitron',sans-serif] font-extrabold tracking-wide uppercase text-[13px] text-white">NAME</span>
              <span className="font-['Orbitron',sans-serif] tracking-wide uppercase text-[10px] text-[#36e8e0] mt-1">POSITION</span>
            </div>
          </motion.div>
        ))}
      </div>
      <p className="text-center text-white/40 text-[11px] mt-2 font-['Orbitron',sans-serif]">swipe to see more →</p>
    </section>
  );
}

function MobileGallery() {
  const galleryImages = [
    gallery1,
    gallery2,
    gallery3,
    gallery4,
    gallery5,
  ];

  return (
    <section className="relative z-10 px-5 py-14">
      <GlassLabel>GALLERY</GlassLabel>
      <div className="mt-8 flex items-center gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {galleryImages.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileTap={{ scale: 0.98 }}
            className="snap-center shrink-0 w-[280px] aspect-[4/3] rounded-[20px] overflow-hidden border-2 border-white/20 relative shadow-[0_15px_30px_rgba(0,0,0,0.5)] bg-black/40"
          >
            <img loading="lazy" decoding="async" alt={`Gallery item ${i + 1}`} className="w-full h-full block object-cover select-none pointer-events-none" src={img} />
            {/* Viewfinder Crop corners */}
            <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/60 pointer-events-none" />
            <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/60 pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/60 pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/60 pointer-events-none" />
          </motion.div>
        ))}
      </div>
      <p className="text-center text-white/40 text-[11px] mt-2 font-['Orbitron',sans-serif]">swipe to see more →</p>
    </section>
  );
}

const faqs = [
  {
    question: "Who can participate for Kranthi'26?",
    answer: "Kranthi'26 is open to all college students with a valid ID card.",
  },
  {
    question: "How is the Registration process and fees?",
    answer: "Registration can be done online through our official portal. Fees vary per event.",
  },
  {
    question: "Will I get a certificate for participation?",
    answer: "Yes, all verified participants will receive an official e-certificate.",
  },
  {
    question: "Is registration free?",
    answer: "Registration is free for ISTE GEC members. Non-members may need to pay a fee depending on the event. Please check the respective event details.",
  },
];

function MobileFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative z-10 px-5 py-14">
      <GlassLabel className="text-center">FREQUENTLY ASKED QUESTIONS</GlassLabel>
      <div className="mt-8 flex flex-col gap-4 max-w-[440px] mx-auto">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="flex flex-col w-full">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full min-h-[64px] rounded-[22px] bg-[rgba(42,35,110,0.3)] border border-white/10 flex items-center justify-between px-5 py-3 text-left"
                style={{
                  backdropFilter: "blur(12px) saturate(180%)",
                  boxShadow: isOpen
                    ? "inset 0 0 20px rgba(0,255,255,0.2), 0 10px 30px rgba(0,0,0,0.5)"
                    : "inset 0 0 10px rgba(0,255,255,0.05), 0 4px 10px rgba(0,0,0,0.5)",
                }}
              >
                <h3 className="font-['Orbitron',sans-serif] text-[15px] text-white m-0 tracking-wide pr-4">
                  {faq.question}
                </h3>
                <span
                  className="text-white text-xl font-light shrink-0 flex items-center justify-center size-7 rounded-full border border-white/20 bg-black/20 transition-transform"
                  style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                >
                  +
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <div
                      className="p-5 rounded-[18px] bg-[rgba(20,15,60,0.5)] border border-white/5"
                      style={{ backdropFilter: "blur(20px)" }}
                    >
                      <p className="font-['Orbitron',sans-serif] text-[13px] text-[#e0e5ed] m-0 leading-relaxed tracking-wide">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function MobileFindUs() {
  return (
    <section className="relative z-10 px-5 py-14">
      <GlassLabel>FIND US HERE</GlassLabel>
      <motion.a
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6 }}
        href="https://maps.app.goo.gl/NL43GvkRBYZMyBf87?g_st=ac"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 block max-w-[440px] mx-auto rounded-[24px] overflow-hidden active:scale-[0.98] transition-transform"
      >
        <div className="w-full aspect-[739/494] relative">
          <img loading="lazy" decoding="async" alt="Map to Government Engineering College Thrissur" className="absolute inset-0 w-full h-full object-cover" src={imgScreenshot202605281922511} />
        </div>
        <div className="flex items-center gap-3 px-4 py-4 bg-black/30">
          <MapPin className="text-[#ef8ff6] shrink-0" size={22} />
          <div>
            <p className="font-['Orbitron',sans-serif] text-white text-[14px]">
              Government Engineering College Thrissur
            </p>
            <p className="font-['Orbitron',sans-serif] text-white/70 text-[12px] mt-0.5">
              Ramavaramapuram, Thrissur, 680009
            </p>
          </div>
        </div>
      </motion.a>
    </section>
  );
}

function IconLinkedin() {
  return (
    <svg className="size-full" fill="none" viewBox="0 0 36.7188 35.9375">
      <path d={svgPaths.p16d4bd80} fill="white" />
    </svg>
  );
}
function IconInstagram() {
  return (
    <svg className="size-full" fill="none" viewBox="0 0 35.25 35.25">
      <path clipRule="evenodd" d={svgPaths.p367c4800} fill="white" fillRule="evenodd" />
    </svg>
  );
}
function IconWhatsapp() {
  return (
    <svg className="size-full" fill="none" viewBox="0 0 46.7877 47">
      <path d={svgPaths.p1380ff00} fill="white" />
    </svg>
  );
}

function MobileFooter() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative z-10 bg-[#010101] px-5 pt-10 pb-8 flex flex-col gap-8 text-center"
    >
      <div>
        <p className="font-['Orbitron',sans-serif] font-bold text-[#94a3b8] text-[16px]">ISTE GECT</p>
        <p className="font-['Orbitron',sans-serif] text-[#94a3b8] text-[12px] mt-2 max-w-[280px] mx-auto leading-relaxed">
          ISTE Student Chapter at Government Engineering College Thrissur
        </p>
      </div>

      <div className="h-px w-full bg-white/10" />

      <div>
        <p className="font-['Orbitron',sans-serif] font-bold text-[#94a3b8] text-[14px] uppercase">Contact &amp; Address</p>
        <p className="font-['Orbitron',sans-serif] text-[#94a3b8] text-[12px] mt-2 leading-relaxed">
          Ramavarmapuram Engineering College P.O.,
          <br />
          Thrissur, Kerala, India - 680009
        </p>
      </div>

      <div>
        <p className="font-['Orbitron',sans-serif] font-bold text-[#94a3b8] text-[14px] uppercase">Follow Us</p>
        <div className="flex items-center justify-center gap-6 mt-3">
          <a href="https://www.linkedin.com/company/iste-gec-students-chapter/" target="_blank" rel="noopener noreferrer" aria-label="Visit ISTE GECT LinkedIn" className="w-9 h-9 block active:scale-90 transition-transform">
            <IconLinkedin />
          </a>
          <a href="https://www.instagram.com/iste_gect?igsh=dmNkbWo5cGNldDlu" target="_blank" rel="noopener noreferrer" aria-label="Visit ISTE GECT Instagram" className="w-9 h-9 block active:scale-90 transition-transform">
            <IconInstagram />
          </a>
          <a href="https://iste.gectcr.ac.in" target="_blank" rel="noopener noreferrer" aria-label="Visit ISTE GECT Website" className="w-9 h-9 block active:scale-90 transition-transform">
            <Globe className="size-full text-white" strokeWidth={1.5} />
          </a>
        </div>
      </div>

      <div>
        <p className="font-['Orbitron',sans-serif] font-bold text-[#94a3b8] text-[14px] uppercase">Developed By</p>
        <div className="font-['Orbitron',sans-serif] text-[#94a3b8] text-[12px] mt-2 flex flex-col gap-1">
          <p>Afeef Rahman</p>
          <p>Archana</p>
          <p>Jany</p>
          <p>Adithyan V</p>
        </div>
      </div>

      <div className="h-px w-full bg-white/10" />

      <p className="font-['Orbitron',sans-serif] text-[#94a3b8] text-[12px]">
        © 2026 ISTE GECT. All Rights Reserved.
      </p>
    </motion.footer>
  );
}

export default function MobileFrame() {
  const HIDE_SPEAKERS = true;
  return (
    <div className="bg-black relative w-full overflow-x-hidden">
      {/* Background art layers, reused from desktop but simplified for mobile */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute left-0 top-[520px] w-full h-[900px] pointer-events-none">
        <img loading="lazy" decoding="async" alt="" className="absolute inset-0 w-full h-full object-cover opacity-70" src={imgRectangle32} />
        <div className="absolute inset-x-0 top-0 h-[250px] bg-gradient-to-b from-black to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[250px] bg-gradient-to-t from-black to-transparent" />
      </div>
      <div className="absolute left-0 top-[1500px] w-full h-[1400px] overflow-hidden pointer-events-none">
        <img loading="lazy" decoding="async" alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" src={imgRectangle34} />
        <div className="absolute inset-x-0 top-0 h-[250px] bg-gradient-to-b from-black to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[250px] bg-gradient-to-t from-black to-transparent" />
      </div>


      <div className="relative">
        {/* Interactive 3D Robot Hand positioned absolutely behind the header and hero */}
        <div className="absolute top-0 left-0 w-full h-[620px] z-0 pointer-events-none">
          <Suspense fallback={null}>
            <RobotHandCanvas isMobile={true} />
          </Suspense>
        </div>

        <MobileHeader />
        <MobileHero />
        <MobileAbout />
        <MobileEvents />
        {!HIDE_SPEAKERS && <MobileSpeakers />}
        <MobileGallery />
        <MobileFAQ />
        <MobileFindUs />
        <MobileFooter />
      </div>
    </div>
  );
}
