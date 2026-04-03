import {
  AlertTriangle,
  Armchair,
  Camera,
  Car,
  ChevronDown,
  Clock,
  Eye,
  Globe,
  Instagram,
  Layers,
  Lightbulb,
  Mail,
  MapPin,
  Maximize2,
  Menu,
  Monitor,
  Music,
  Navigation,
  Palette,
  Phone,
  Shield,
  Square,
  TrendingUp,
  User,
  Wifi,
  X,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Parallax Hero Hook ───────────────────────────────────────────────────────
function useParallax(speed = 0.4) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handler = () => {
      setOffset(window.scrollY * speed);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [speed]);

  return offset;
}

// ─── Intersection Observer for Scroll Reveals ─────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

// ─── Gold Divider ─────────────────────────────────────────────────────────────
function GoldDivider() {
  return <div className="gold-divider my-0" aria-hidden="true" />;
}

// ─── Section Wrapper ─────────────────────────────────────────────────────────
function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, visible } = useReveal();
  return (
    <>
      <GoldDivider />
      <section
        id={id}
        ref={ref}
        className={`section-reveal ${visible ? "visible" : ""} py-16 md:py-24 px-6 md:px-12 lg:px-24 ${
          className
        }`}
      >
        {children}
      </section>
    </>
  );
}

// ─── Section Heading ─────────────────────────────────────────────────────────
function SectionHeading({
  number,
  title,
  subtitle,
}: {
  number: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-10 md:mb-14">
      <p className="text-gold text-xs tracking-[0.25em] font-semibold uppercase mb-2">
        {number}
      </p>
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-wider text-foreground mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-custom text-sm md:text-base tracking-wide">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── Amenity Card ─────────────────────────────────────────────────────────────
function AmenityCard({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <div className="bg-surface-2 border border-[oklch(0.25_0.006_220)] rounded p-4 flex flex-col items-center gap-3 text-center hover:border-gold-bright transition-colors duration-300">
      <Icon className="text-gold w-5 h-5 flex-shrink-0" />
      <span className="text-xs font-semibold uppercase tracking-wide text-foreground leading-relaxed">
        {label}
      </span>
    </div>
  );
}

// ─── Add-On Card ─────────────────────────────────────────────────────────────
function AddOnCard({
  name,
  price,
  icon: Icon,
}: {
  name: string;
  price: string;
  icon: React.ElementType;
}) {
  return (
    <div className="bg-surface border border-[oklch(0.22_0.005_220)] rounded p-5 flex items-center justify-between gap-4 hover:border-gold transition-colors duration-300 group">
      <div className="flex items-center gap-3">
        <Icon className="text-gold w-4 h-4 flex-shrink-0" />
        <span className="text-sm font-medium text-foreground">{name}</span>
      </div>
      <span className="text-gold font-bold text-sm whitespace-nowrap">
        {price}
      </span>
    </div>
  );
}

// ─── Policy Block ─────────────────────────────────────────────────────────────
function PolicyBlock({
  icon: Icon,
  title,
  description,
  highlight = false,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex gap-4 p-5 rounded border ${
        highlight
          ? "border-[oklch(0.60_0.12_60_/_0.5)] bg-[oklch(0.18_0.01_60_/_0.3)]"
          : "border-[oklch(0.22_0.005_220)] bg-surface"
      }`}
    >
      <Icon
        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
          highlight ? "text-destructive" : "text-gold"
        }`}
      />
      <div>
        <p className="text-sm font-bold uppercase tracking-wider text-foreground mb-1">
          {title}
        </p>
        <p className="text-sm text-muted-custom leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
function FAQItem({
  question,
  answer,
  ocid,
  toggleOcid,
}: {
  question: string;
  answer: string;
  ocid: string;
  toggleOcid: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border border-[oklch(0.22_0.005_220)] rounded overflow-hidden"
      data-ocid={ocid}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left hover:bg-surface-2 transition-colors duration-200 group"
        aria-expanded={open}
        data-ocid={toggleOcid}
      >
        <span className="text-sm md:text-base font-semibold uppercase tracking-wide text-foreground">
          {question}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gold flex-shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-5 md:px-6 pb-5 md:pb-6">
          <div className="h-px bg-[oklch(0.22_0.005_220)] mb-4" />
          <p className="text-sm text-muted-custom leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Header / Nav ─────────────────────────────────────────────────────────────
function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Access", href: "#access" },
    { label: "Amenities", href: "#amenities" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMobileOpen(false);
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [],
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[oklch(0.10_0.005_220_/_0.97)] border-b border-gold"
          : "bg-transparent border-b border-transparent"
      }`}
      data-ocid="nav.section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        {/* Wordmark */}
        <a
          href="#home"
          className="flex flex-col leading-none"
          data-ocid="nav.link"
        >
          <span className="text-gold font-black text-sm tracking-[0.3em] uppercase">
            HOMEBASE
          </span>
          <span className="text-foreground font-light text-xs tracking-[0.45em] uppercase mt-0.5">
            STUDIOS
          </span>
        </a>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-custom hover:text-gold transition-colors duration-200"
              data-ocid="nav.link"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden text-foreground hover:text-gold transition-colors"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
          data-ocid="nav.toggle"
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[oklch(0.10_0.005_220_/_0.98)] border-t border-gold">
          <nav className="flex flex-col py-4" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-custom hover:text-gold transition-colors"
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function Hero() {
  const parallaxOffset = useParallax(0.4);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      data-ocid="hero.section"
    >
      {/* Parallax background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage:
            "url('/assets/studio-019d5395-8e8c-7788-9a91-38fca4fea307.jpg')",
          transform: `translateY(${parallaxOffset}px)`,
          top: "-20%",
          height: "140%",
        }}
        aria-hidden="true"
      />

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(11,15,16,0.75) 0%, rgba(11,15,16,0.55) 50%, rgba(11,15,16,0.85) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p
          className="text-gold text-xs md:text-sm font-semibold tracking-[0.35em] uppercase mb-6 md:mb-8"
          style={{
            animation: "fade-up 0.6s ease-out 0.1s forwards",
            opacity: 0,
          }}
        >
          Quick Guide for Your Studio Rental
        </p>

        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-foreground leading-none mb-6"
          style={{
            animation: "fade-up 0.6s ease-out 0.25s forwards",
            opacity: 0,
            textShadow: "0 4px 30px rgba(0,0,0,0.8)",
          }}
        >
          HOMEBASE
          <br />
          <span className="text-gold">STUDIOS</span>
        </h1>

        {/* Gold divider */}
        <div
          className="mx-auto mb-6"
          style={{
            width: "80px",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, oklch(0.72 0.13 65), transparent)",
            animation: "fade-up 0.6s ease-out 0.4s forwards",
            opacity: 0,
          }}
          aria-hidden="true"
        />

        <p
          className="text-base md:text-xl font-bold uppercase tracking-[0.25em] text-foreground mb-3"
          style={{
            animation: "fade-up 0.6s ease-out 0.5s forwards",
            opacity: 0,
          }}
        >
          Before You Shoot: Guide &amp; Policies
        </p>

        <p
          className="text-sm md:text-base text-muted-custom tracking-widest uppercase"
          style={{
            animation: "fade-up 0.6s ease-out 0.65s forwards",
            opacity: 0,
          }}
        >
          Access &bull; Timing &bull; Amenities &bull; Add-Ons &bull; FAQs
        </p>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          style={{
            animation: "fade-up 0.6s ease-out 0.9s forwards",
            opacity: 0,
          }}
        >
          <ChevronDown className="w-6 h-6 text-gold animate-bounce" />
        </div>
      </div>
    </section>
  );
}

const checkInSteps = [
  "Check in at the front desk kiosk upon arrival.",
  "Click Visitor Check In on the kiosk screen.",
  "Enter host name: Dweh Brown.",
  "Then enter your guest name.",
  "Repeat for each visitor in your group.",
  "Make sure to check out at the kiosk after your session is done.",
];

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const amenities = [
    {
      id: "cyc",
      icon: Maximize2,
      label: "Cyclorama / Infinity Wall (14×14×12)",
    },
    {
      id: "amaran",
      icon: Lightbulb,
      label: "(2) Amaran 300C RGB LED Continuous Lights",
    },
    { id: "godox", icon: Zap, label: "(2) Godox 400W Flash Lights" },
    { id: "cstands", icon: Layers, label: "(2) C-Stands with Sandbags" },
    {
      id: "softbox",
      icon: Square,
      label: '(2) Smallrig 35"/90cm Octagon Softboxes',
    },
    { id: "changing", icon: User, label: "Private Changing Room" },
    { id: "makeup", icon: Eye, label: "LED Makeup Mirror with Vanity Counter" },
    { id: "mirror", icon: Eye, label: "Full Length LED Mirror" },
    { id: "seating", icon: Armchair, label: "Comfortable Seating Area" },
    {
      id: "props",
      icon: Armchair,
      label: "Chairs, Couches, Apple Boxes & Stools",
    },
    { id: "sonos", icon: Music, label: "Sonos Bluetooth Sound System" },
    { id: "wifi", icon: Wifi, label: "Guest Wi-Fi: VAPA Guest Wifi" },
  ];

  const addons = [
    {
      id: "projector",
      name: '4K Projector with 200" Viewing Wall',
      price: "$25",
      icon: Monitor,
    },
    {
      id: "tether",
      name: "Tethering Station (Monitor + Stand)",
      price: "$30",
      icon: Monitor,
    },
    {
      id: "backdrop-roll",
      name: "Seamless Color Backdrop (Existing Roll)",
      price: "$10",
      icon: Palette,
    },
    {
      id: "spotlight",
      name: "Amaran Spotlight with Gobo Set",
      price: "$20",
      icon: Lightbulb,
    },
    {
      id: "aputure",
      name: "Aputure 600D (Continuous LED Light)",
      price: "$40",
      icon: Zap,
    },
    {
      id: "backdrop-custom",
      name: "Custom Color Backdrop (Order)",
      price: "$110",
      icon: Palette,
    },
    { id: "tripod", name: "Heavy-Duty Tripod", price: "$15", icon: Camera },
    {
      id: "paint",
      name: "Fresh Coat of White Paint",
      price: "$100",
      icon: TrendingUp,
    },
    {
      id: "lighting-assist",
      name: "Lighting Assistance During Shoot",
      price: "$50/hr",
      icon: Lightbulb,
    },
  ];

  const faqs = [
    {
      id: "early-arrival",
      question: "Can I arrive early to setup?",
      answer:
        "No. All setup, shooting, and breakdown must be included in your booked time. There are no exceptions to this policy.",
    },
    {
      id: "extra-time",
      question: "What if I need additional time?",
      answer:
        "Additional time is $33 per 30-minute increment. Note this may not be available if another session is scheduled after yours. Please plan accordingly.",
    },
    {
      id: "furniture",
      question: "Can I move furniture or studio items?",
      answer:
        "Yes, as long as everything is returned to its original position before your booking ends. Do not drag furniture or props on the Cyc floor — any damage will be assessed to the renter.",
    },
    {
      id: "props",
      question: "Do you provide props?",
      answer:
        "Studio sessions include basic seating props. Clients are welcome to bring their own props for any session. Do not drag furniture or props on the Cyc floor. Any damage will be assessed to the renter.",
    },
    {
      id: "reschedule",
      question: "What if I need to reschedule or cancel?",
      answer:
        "Please review the Peerspace Cancellation and Refund policy, which governs all bookings made through the platform.",
    },
    {
      id: "late",
      question: "What if I'm running late?",
      answer:
        "We understand unexpected events happen. Please notify Homebase Studios in advance. Arriving late does not mean you can extend your session for free. Additional time is $33 per 30-minute increment (subject to availability).",
    },
    {
      id: "staff",
      question: "Is staff on-site during my booking?",
      answer:
        "Staff may not be on-site for all bookings. Self-guided access instructions are provided to help you access the building and studio independently.",
    },
    {
      id: "pets",
      question: "Are pets allowed?",
      answer: "Pets are not allowed in the studio.",
    },
    {
      id: "capacity",
      question: "What is the maximum number of people allowed?",
      answer:
        "Maximum occupancy is based on your Peerspace booking. Additional guests beyond your booking may require prior approval.",
    },
  ];

  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sticky Header */}
      <Header />

      {/* Hero */}
      <Hero />

      {/* ── 01. ACCESS & PARKING ── */}
      <Section id="access" className="bg-background">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            number="01"
            title="Studio Access & Parking"
            subtitle="Please review before your arrival."
          />

          {/* How to Get Here */}
          <div className="mb-6 p-6 bg-surface border border-[oklch(0.22_0.005_220)] rounded">
            <div className="flex items-center gap-3 mb-5">
              <Navigation className="text-gold w-5 h-5 flex-shrink-0" />
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gold">
                How to Get Here
              </h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                  Address
                </p>
                <p className="text-sm text-muted-custom leading-relaxed mb-4">
                  VAPA Center
                  <br />
                  700 N. Tryon St, Homebase Studios #49
                  <br />
                  Charlotte, NC 28202
                </p>
                <a
                  href="https://maps.google.com/?q=700+N+Tryon+St+Charlotte+NC+28202"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold border border-gold rounded px-4 py-2 hover:bg-gold hover:text-background transition-all duration-200"
                  data-ocid="access.directions"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Get Directions
                </a>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-foreground mb-1">
                    By Car
                  </p>
                  <p className="text-sm text-muted-custom leading-relaxed">
                    Head to 700 N. Tryon St in uptown Charlotte. Turn into the
                    VAPA Center driveway. Park anywhere inside the gated parking
                    lot &mdash; not the Sheriff&apos;s Dept side.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-foreground mb-1">
                    Once Inside
                  </p>
                  <p className="text-sm text-muted-custom leading-relaxed">
                    Homebase Studios is on the main floor of the VAPA Center. Go
                    through the door past the elevator &mdash; the studio is the
                    first door on the right.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-foreground mb-1">
                    Exit Route
                  </p>
                  <p className="text-sm text-muted-custom leading-relaxed">
                    Please exit only via Montford Point.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Guest Check-In */}
          <div className="mb-6 p-6 bg-surface border border-[oklch(0.22_0.005_220)] rounded">
            <div className="flex items-center gap-3 mb-5">
              <User className="text-gold w-5 h-5 flex-shrink-0" />
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gold">
                Guest Check-In
              </h3>
            </div>
            <ul className="space-y-3">
              {checkInSteps.map((step, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static ordered list
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full border border-gold text-gold text-[10px] font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm text-muted-custom leading-relaxed">
                    {step}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio Location */}
          <div className="mb-10 p-6 bg-surface border border-[oklch(0.22_0.005_220)] rounded">
            <div className="flex items-center gap-3 mb-5">
              <MapPin className="text-gold w-5 h-5 flex-shrink-0" />
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gold">
                Studio Location
              </h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-gold mt-1 flex-shrink-0">&bull;</span>
                <p className="text-sm text-muted-custom leading-relaxed">
                  Homebase Studios is located on the Main floor of the VAPA
                  Center.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold mt-1 flex-shrink-0">&bull;</span>
                <p className="text-sm text-muted-custom leading-relaxed">
                  Go through the door past the elevator &mdash; the studio is
                  the first door on the right.
                </p>
              </li>
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Left: paragraph */}
            <div>
              <p className="text-muted-custom leading-relaxed mb-6">
                Welcome to Homebase Studios at the VAPA Center in uptown
                Charlotte. We want your session to start smoothly &mdash; please
                review the access details above before your arrival.
              </p>
              <a
                href="https://www.instagram.com/reel/C-LOYKAJ3ma/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gold text-sm font-semibold uppercase tracking-wider hover:underline transition-all"
                data-ocid="access.link"
              >
                Watch Access Walkthrough
                <Navigation className="w-4 h-4" />
              </a>
            </div>

            {/* Right: bullets */}
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <MapPin className="text-gold w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gold mb-1">
                    Entrance
                  </p>
                  <p className="text-sm text-muted-custom leading-relaxed">
                    VAPA Center entrance is located on College Street
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <Car className="text-gold w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gold mb-1">
                    Parking
                  </p>
                  <p className="text-sm text-muted-custom leading-relaxed">
                    Park anywhere inside the gated parking lot (not the
                    Sheriff&apos;s Dept side)
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <Navigation className="text-gold w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gold mb-1">
                    Exit
                  </p>
                  <p className="text-sm text-muted-custom leading-relaxed">
                    Please exit only via Montford Point
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── 02. BOOKING TIME POLICY ── */}
      <Section id="booking" className="bg-surface">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            number="02"
            title="Booking Time Policy"
            subtitle="Your booked time covers everything."
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                id: "arrival",
                label: "On-Time Arrival",
                ocid: "booking.item.1",
              },
              { id: "setup", label: "Setup", ocid: "booking.item.2" },
              { id: "shoot", label: "Shoot Time", ocid: "booking.item.3" },
              {
                id: "breakdown",
                label: "Final Breakdown",
                ocid: "booking.item.4",
              },
            ].map((item) => (
              <div
                key={item.id}
                className="bg-background border border-[oklch(0.22_0.005_220)] rounded p-6 flex flex-col items-center gap-3 text-center hover:border-gold transition-colors duration-300"
                data-ocid={item.ocid}
              >
                <Clock className="text-gold w-6 h-6" />
                <span className="text-xs font-bold uppercase tracking-wider text-foreground leading-relaxed">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted-custom tracking-wide">
            * Final breakdown should be completed before your scheduled end
            time.
          </p>
        </div>
      </Section>

      {/* ── 03. FREE AMENITIES ── */}
      <Section id="amenities" className="bg-background">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            number="03"
            title="Free Amenities"
            subtitle="Included in your booking — no extra charge."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
            {amenities.map((item, i) => (
              <div key={item.id} data-ocid={`amenities.item.${i + 1}`}>
                <AmenityCard icon={item.icon} label={item.label} />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 04. ADD-ONS ── */}
      <Section id="addons" className="bg-surface">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            number="04"
            title="Add-Ons"
            subtitle="Optional add-ons — request in advance to ensure availability."
          />
          <div className="grid md:grid-cols-2 gap-3">
            {addons.map((item, i) => (
              <div key={item.id} data-ocid={`addons.item.${i + 1}`}>
                <AddOnCard
                  name={item.name}
                  price={item.price}
                  icon={item.icon}
                />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 05. STUDIO POLICIES ── */}
      <Section id="policies" className="bg-background">
        <div className="max-w-6xl mx-auto">
          <SectionHeading number="05" title="Studio Policies" />
          <div className="space-y-3">
            <PolicyBlock
              icon={AlertTriangle}
              title="NO Shoes on Cyc Wall"
              description="ALL guests must have shoe coverings while on the cyc wall. Use plastic bottom coverings or painter's tape on the bottom of shoes. NO exceptions. Any unnecessary scratches, scuffs, marks or damages will result in a damage fee of $100 for repaint."
              highlight
            />
            <PolicyBlock
              icon={Shield}
              title="Food & Drinks"
              description="Food and drinks are not allowed in the studio unless approved by the owner in advance."
            />
            <PolicyBlock
              icon={Music}
              title="Music"
              description="Music is allowed at moderate levels. Please be respectful of neighboring spaces."
            />
            <PolicyBlock
              icon={AlertTriangle}
              title="Damage Responsibility"
              description="Renters are responsible for any damage incurred during their booking. Please refer to your Peerspace liability coverage for details."
            />
            <PolicyBlock
              icon={Shield}
              title="Discounts & Memberships"
              description="Ask about our Membership offers for savings on future bookings."
            />
            <PolicyBlock
              icon={Clock}
              title="Minimum Hours"
              description="No minimum booking hours at this time — subject to change."
            />
          </div>
        </div>
      </Section>

      {/* ── 06. FAQ ── */}
      <Section id="faq" className="bg-surface">
        <div className="max-w-4xl mx-auto">
          <SectionHeading number="06" title="Frequently Asked Questions" />
          <div className="space-y-2" data-ocid="faq.list">
            {faqs.map((faq, i) => (
              <FAQItem
                key={faq.id}
                question={faq.question}
                answer={faq.answer}
                ocid={`faq.item.${i + 1}`}
                toggleOcid={`faq.toggle.${i + 1}`}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* ── 07. CONTACT ── */}
      <Section id="contact" className="bg-background">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            number="07"
            title="Contact"
            subtitle="Get in touch with Homebase Studios"
          />
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
            <a
              href="tel:9196857780"
              className="flex items-center gap-4 p-5 bg-surface border border-[oklch(0.22_0.005_220)] rounded hover:border-gold transition-colors duration-300 group"
              data-ocid="contact.link"
            >
              <Phone className="text-gold w-5 h-5 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gold mb-0.5">
                  Phone
                </p>
                <p className="text-sm text-muted-custom group-hover:text-foreground transition-colors">
                  (919) 685-7780
                </p>
              </div>
            </a>

            <a
              href="mailto:Homebasemg@gmail.com"
              className="flex items-center gap-4 p-5 bg-surface border border-[oklch(0.22_0.005_220)] rounded hover:border-gold transition-colors duration-300 group"
              data-ocid="contact.link"
            >
              <Mail className="text-gold w-5 h-5 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gold mb-0.5">
                  Email
                </p>
                <p className="text-sm text-muted-custom group-hover:text-foreground transition-colors">
                  Homebasemg@gmail.com
                </p>
              </div>
            </a>

            <a
              href="https://www.homebasefilms.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 bg-surface border border-[oklch(0.22_0.005_220)] rounded hover:border-gold transition-colors duration-300 group"
              data-ocid="contact.link"
            >
              <Globe className="text-gold w-5 h-5 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gold mb-0.5">
                  Website
                </p>
                <p className="text-sm text-muted-custom group-hover:text-foreground transition-colors">
                  www.homebasefilms.com
                </p>
              </div>
            </a>

            <div
              className="flex items-center gap-4 p-5 bg-surface border border-[oklch(0.22_0.005_220)] rounded"
              data-ocid="contact.card"
            >
              <MapPin className="text-gold w-5 h-5 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gold mb-0.5">
                  Address
                </p>
                <p className="text-sm text-muted-custom leading-relaxed">
                  VAPA Center, 700 N. Tryon St
                  <br />
                  Homebase Studios #49
                  <br />
                  Charlotte, NC 28202
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── FOOTER ── */}
      <GoldDivider />
      <footer className="bg-[oklch(0.09_0.004_220)] py-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
            {/* Wordmark */}
            <div className="flex flex-col leading-none">
              <span className="text-gold font-black text-xs tracking-[0.3em] uppercase">
                HOMEBASE
              </span>
              <span className="text-muted-custom font-light text-xs tracking-[0.45em] uppercase mt-0.5">
                STUDIOS
              </span>
            </div>

            {/* Social */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-custom hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="h-px bg-[oklch(0.18_0.005_220)] mb-6" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center">
            <p className="text-xs text-muted-custom tracking-wide">
              &copy; {year} Homebase Studios. All rights reserved.
            </p>
            <p className="text-xs text-muted-custom tracking-wide">
              Built with <span className="text-gold">&hearts;</span> using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
