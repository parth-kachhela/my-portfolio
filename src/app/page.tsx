"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  AnimatePresence,
} from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  GraduationCap,
  ChevronDown,
  Terminal,
  Cpu,
  Globe,
  Database,
  Layers,
  Phone,
  Sparkles,
  ArrowUpRight,
  MousePointer2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const FloatingParticles = () => {
  const [particles, setParticles] = useState<
    Array<{
      x: number;
      y: number;
      duration: number;
      delay: number;
      yEnd: number;
    }>
  >([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 50 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
        yEnd: Math.random() * -500 - 100,
      })),
    );
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-500/30 rounded-full"
          initial={{ x: p.x, y: p.y }}
          animate={{
            y: [null, p.yEnd],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

const MagneticButton = ({
  children,
  className = "",
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const { x, y } = position;

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 350, damping: 15, mass: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return content;
};

const TextReveal = ({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <span ref={ref} className={`inline-block overflow-hidden ${className}`}>
      <motion.span
        className="inline-block"
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : { y: "100%" }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
};

const GlitchText = ({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) => {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute inset-0 text-blue-500 z-0"
        animate={{
          x: [0, -2, 2, 0],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 0.15,
          repeat: Infinity,
          repeatDelay: 5,
        }}
      >
        {children}
      </motion.span>
      <motion.span
        className="absolute inset-0 text-purple-500 z-0"
        animate={{
          x: [0, 2, -2, 0],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 0.15,
          repeat: Infinity,
          repeatDelay: 5,
          delay: 0.05,
        }}
      >
        {children}
      </motion.span>
    </span>
  );
};

const ParallaxText = ({
  children,
  baseVelocity = 5,
}: {
  children: string;
  baseVelocity?: number;
}) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const directionFactor = useRef(1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap">
      <motion.div className="flex whitespace-nowrap flex-nowrap" style={{ x }}>
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="text-8xl md:text-[12rem] font-bold text-white/5 mx-4"
          >
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ["about", "projects", "skills", "education", "contact"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/5 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <MagneticButton>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer"
          >
            <motion.img
              src="/logo.png"
              alt="PK Logo"
              className="h-15 w-15 object-contain"
              whileHover={{ rotate: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </motion.div>
        </MagneticButton>

        <div className="hidden md:flex items-center gap-1">
          {["About", "Projects", "Skills", "Education", "Contact"].map(
            (item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.3 }}
                className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                  activeSection === item.toLowerCase()
                    ? "text-white"
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                {activeSection === item.toLowerCase() && (
                  <motion.span
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-white/10 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{item}</span>
              </motion.a>
            ),
          )}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <MagneticButton>
              <a
                href="/Parth_Kachhela_Resume.pdf"
                download="Parth_Kachhela_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="ml-4 rounded-full border-white/10 hover:bg-white hover:text-black transition-all group"
                >
                  Resume
                  <motion.span
                    className="ml-2"
                    initial={{ x: 0, y: 0 }}
                    whileHover={{ x: 2, y: -2 }}
                  >
                    <ArrowUpRight size={16} />
                  </motion.span>
                </Button>
              </a>
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={ref}
      id="about"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(139,92,246,0.1),transparent_50%)]" />

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ x: mousePosition.x * 2, y: mousePosition.y * 2 }}
          className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-blue-600/20 to-purple-600/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          style={{ x: mousePosition.x * -2, y: mousePosition.y * -2 }}
          className="absolute bottom-1/4 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-purple-600/20 to-pink-600/10 rounded-full blur-[100px]"
        />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      </div>

      <motion.div
        style={{ opacity, scale, y }}
        className="container mx-auto px-6 relative z-10 text-center"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Badge className="mb-8 py-2 px-5 rounded-full bg-white/5 border-white/10 text-blue-400 backdrop-blur-sm hover:bg-white/10 transition-all cursor-default">
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="inline-block mr-2"
              >
                <Sparkles size={14} />
              </motion.span>
              Available for new opportunities
            </Badge>
          </motion.div>

          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.33, 1, 0.68, 1],
                delay: 0.3,
              }}
              className="text-6xl md:text-9xl font-bold tracking-tighter text-white"
            >
              Parth
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.33, 1, 0.68, 1],
                delay: 0.4,
              }}
              className="text-6xl md:text-9xl font-bold tracking-tighter"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient bg-[length:200%_auto]">
                Kachhela
              </span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Full Stack Developer specializing in the{" "}
            <span className="text-white font-medium">MERN Stack</span>, building
            dynamic and scalable web applications with a focus on{" "}
            <span className="text-blue-400">user experience</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <MagneticButton>
              <Button
                size="lg"
                className="rounded-full px-10 py-7 text-lg bg-white text-black hover:bg-zinc-100 group relative overflow-hidden"
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Projects
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <ArrowUpRight size={20} />
                  </motion.span>
                </span>
              </Button>
            </MagneticButton>

            <div className="flex items-center gap-3">
              {[
                { icon: Github, href: "https://github.com/parth-kachhela" },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/kachhela-parth-987a91323/",
                },
                { icon: Mail, href: "mailto:parthkachhela78@gmail.com" },
              ].map(({ icon: Icon, href }, i) => (
                <MagneticButton key={i} href={href}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + i * 0.1, type: "spring" }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
                  >
                    <Icon size={22} />
                  </motion.div>
                </MagneticButton>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-zinc-600 uppercase tracking-widest">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <MousePointer2 size={20} className="text-zinc-500" />
        </motion.div>
      </motion.div>
    </section>
  );
};

const SectionHeading = ({
  title,
  subtitle,
  icon: Icon,
}: {
  title: string;
  subtitle: string;
  icon?: React.ElementType;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="mb-20">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 mb-6"
      >
        {Icon && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ type: "spring", delay: 0.2 }}
            className="p-2 rounded-lg bg-blue-500/10"
          >
            <Icon className="text-blue-500" size={20} />
          </motion.div>
        )}
        <span className="text-sm font-bold tracking-widest uppercase text-blue-500">
          {title}
        </span>
      </motion.div>
      <div className="overflow-hidden">
        <motion.h2
          initial={{ y: 80 }}
          animate={isInView ? { y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold text-white"
        >
          {subtitle}
        </motion.h2>
      </div>
    </div>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Mantatech-system",
      description:
        "A fully dynamic and SEO-optimized IT services website with a custom admin panel for appointment management.",
      tags: ["React", "Tailwind CSS", "Node.js", "PostgreSQL", "TypeScript"],
      link: "https://mantratech.netlify.app/",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      color: "from-blue-500/20 to-purple-500/20",
    },
    {
      title: "Invito",
      description:
        "Full-stack event management platform featuring QR code generation, email automation, and real-time guest check-ins.",
      tags: ["React", "Node.js", "MongoDB", "TypeScript", "Express"],
      link: "https://github.com/parth-kachhela/Invito",
      image:
        "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800",
      color: "from-purple-500/20 to-pink-500/20",
    },
    {
      title: "Denta-care",
      description:
        "Denta-Care Denta-Care is a full-stack dental clinic management system designed to enhance patient care and streamline clinical workflows. This project includes a user-facing website for appointment booking and an admin dashboard where doctors can manage patient visits, maintain medical history, and provide personalized treatments",
      tags: ["Next.js", "Framer Motion", "Tailwind"],
      link: "https://denta-care-kkxm.vercel.app/",
      image:
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
      color: "from-pink-500/20 to-orange-500/20",
    },
  ];

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section id="projects" className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <ParallaxText baseVelocity={-2}>PARTH KACHHELA</ParallaxText>
      </div>

      <div ref={containerRef} className="container mx-auto px-6 relative z-10">
        <SectionHeading
          title="Selected Works"
          subtitle="Featured Projects"
          icon={Code2}
        />

        <div className="space-y-32">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`flex flex-col ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-12 items-center`}
              >
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="flex-1 relative group"
                >
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${project.color} rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  <div className="relative overflow-hidden rounded-2xl border border-white/10">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full aspect-video object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                      <div className="flex gap-4">
                        <MagneticButton href={project.link}>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="p-4 rounded-full bg-white text-black hover:bg-blue-500 hover:text-white transition-all"
                          >
                            <ExternalLink size={20} />
                          </motion.div>
                        </MagneticButton>
                        <MagneticButton href="https://github.com/parth-kachhela">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="p-4 rounded-full bg-white text-black hover:bg-blue-500 hover:text-white transition-all"
                          >
                            <Github size={20} />
                          </motion.div>
                        </MagneticButton>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="flex-1 space-y-6"
                >
                  <span className="text-blue-500 font-mono text-sm">
                    0{index + 1}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold text-white">
                    {project.title}
                  </h3>
                  <p className="text-zinc-400 text-lg leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {project.tags.map((tag, i) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 + 0.3 }}
                      >
                        <Badge
                          variant="secondary"
                          className="bg-white/5 text-zinc-300 text-xs uppercase tracking-wider px-4 py-2 hover:bg-white/10 transition-all"
                        >
                          {tag}
                        </Badge>
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      icon: Globe,
      skills: [
        "React.js",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Bootstrap",
        "HTML5",
        "CSS3",
      ],
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Backend",
      icon: Terminal,
      skills: [
        "Node.js",
        "Express.js",
        "REST APIs",
        "Authentication",
        "MERN Stack",
      ],
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Database",
      icon: Database,
      skills: ["PostgreSQL", "MongoDB", "SQL/NoSQL"],
      gradient: "from-orange-500 to-red-500",
    },
    {
      title: "Tools & Others",
      icon: Cpu,
      skills: [
        "Git",
        "GitHub",
        "Linux",
        "Docker",
        "DevOps Foundations",
        "Java",
        "Python",
      ],
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  const containerRef = useRef(null);

  return (
    <section id="skills" className="py-32 bg-zinc-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.1),transparent_50%)]" />

      <div ref={containerRef} className="container mx-auto px-6 relative z-10">
        <SectionHeading
          title="Expertise"
          subtitle="Technical Arsenal"
          icon={Layers}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative"
            >
              <div
                className={`absolute inset-0 bg-linear-to-br ${cat.gradient} opacity-0 group-hover:opacity-10 rounded-3xl blur-xl transition-opacity duration-500`}
              />
              <div className="relative p-8 md:p-10 rounded-3xl bg-white/2 border border-white/5 hover:border-white/10 transition-all backdrop-blur-sm">
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <motion.div
                      className={`inline-flex p-3 rounded-2xl bg-linear-to-br ${cat.gradient} mb-4`}
                      whileHover={{
                        rotate: [0, -10, 10, 0],
                        transition: { duration: 0.5 },
                      }}
                    >
                      <cat.icon className="text-white" size={24} />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white">
                      {cat.title}
                    </h3>
                  </div>
                  <span className="text-6xl font-bold text-white/5">
                    0{i + 1}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  {cat.skills.map((skill, j) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: j * 0.05 + 0.2 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-4 py-2 rounded-full bg-white/5 text-zinc-300 text-sm border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Education = () => {
  const items = [
    {
      title: "Bsc IT",
      org: "Atmiya University Rajkot",
      date: "June 2023 - Present",
      description:
        "Gained strong foundational knowledge in programming languages like C, Java, DSA, and Python.",
      icon: "🎓",
    },
    {
      title: "100xDevs Cohort",
      org: "Web Development & DevOps",
      date: "Oct 2024 - Running",
      description:
        "Intensive training in Full-stack, DevOps (Docker, K8s, CI/CD), and Web3 foundations.",
      icon: "💻",
    },
    {
      title: "Delta Full Stack",
      org: "Apna College",
      date: "2024",
      description:
        "Certified Full Stack Web Development course covering MERN stack extensively.",
      icon: "📜",
    },
  ];

  return (
    <section id="education" className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <ParallaxText baseVelocity={3}>EDUCATION</ParallaxText>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading
          title="Learning Path"
          subtitle="Education & Certifications"
          icon={GraduationCap}
        />

        <div className="max-w-4xl mx-auto">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="relative pl-12 pb-12 last:pb-0"
            >
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-transparent" />

              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 + 0.2, type: "spring" }}
                className="absolute left-[-20px] top-0 w-10 h-10 rounded-full bg-zinc-900 border-2 border-blue-500 flex items-center justify-center text-lg"
              >
                {item.icon}
              </motion.div>

              <motion.div
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <Badge
                    variant="outline"
                    className="w-fit text-blue-400 border-blue-500/30 text-xs"
                  >
                    {item.date}
                  </Badge>
                </div>
                <p className="text-lg text-zinc-300 mb-2">{item.org}</p>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section
      id="contact"
      ref={containerRef}
      className="py-32 bg-zinc-950 relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(59,130,246,0.15),transparent_60%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      </div>

      <motion.div
        style={{ scale, opacity }}
        className="container mx-auto px-6 relative z-10"
      >
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <span className="text-sm font-bold tracking-widest uppercase text-blue-500 mb-4 block">
              Get in touch
            </span>
          </motion.div>

          <div className="overflow-hidden mb-8">
            <motion.h2
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              className="text-4xl md:text-7xl font-bold text-white"
            >
              Let's build something
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h2
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                ease: [0.33, 1, 0.68, 1],
                delay: 0.1,
              }}
              className="text-4xl md:text-7xl font-bold"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 italic">
                extraordinary
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-xl text-zinc-400 max-w-2xl mx-auto"
          >
            I'm always open to discussing new projects, creative ideas or
            opportunities to be part of your visions.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-20">
          {[
            {
              icon: Mail,
              label: "parthkachhela78@gmail.com",
              href: "mailto:parthkachhela78@gmail.com",
            },
            { icon: Phone, label: "+91 8200197878", href: null },
            {
              icon: Github,
              label: "@parth-kachhela",
              href: "https://github.com/parth-kachhela",
            },
          ].map(({ icon: Icon, label, href }, i) => (
            <MagneticButton key={i} href={href || undefined}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.5 }}
                whileHover={{ y: -5 }}
                className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all flex flex-col items-center gap-4 cursor-pointer group"
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  className="p-4 rounded-2xl bg-blue-500/10 group-hover:bg-blue-500/20 transition-all"
                >
                  <Icon className="text-blue-500" size={28} />
                </motion.div>
                <span className="text-white font-medium text-center">
                  {label}
                </span>
              </motion.div>
            </MagneticButton>
          ))}
        </div>

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div className="text-zinc-600 text-sm">
            © {new Date().getFullYear()} Parth Kachhela. Crafted with passion.
          </div>
          <div className="flex gap-8">
            {[
              {
                name: "LinkedIn",
                url: "https://www.linkedin.com/in/kachhela-parth-987a91323/",
              },
              {
                name: "Instagram",
                url: "https://www.instagram.com/parth.kachhela.21/",
              },
              {
                name: "GitHub",
                url: "https://github.com/parth-kachhela",
              },
            ].map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="text-zinc-500 hover:text-white transition-colors text-sm"
              >
                {link.name}
              </motion.a>
            ))}
          </div>
        </motion.footer>
      </motion.div>
    </section>
  );
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-2 border-white/20 border-t-blue-500 rounded-full mx-auto mb-6"
              />
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-white/60 text-sm tracking-widest uppercase"
              >
                Loading
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="bg-black min-h-screen text-white selection:bg-blue-500/30 overflow-x-hidden">
        <FloatingParticles />
        <Navbar />
        <Hero />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>

      <style jsx global>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </>
  );
}
