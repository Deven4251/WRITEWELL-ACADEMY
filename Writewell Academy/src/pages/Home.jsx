/* eslint-disable no-unused-vars */
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { PenLine, Sparkles, Feather, Wand2, ArrowRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { getThemeColors } from "../theme/colors";
import { useNavigate } from "react-router-dom";
import "./home.css";

// Random stagger generator
const randomDelay = (min = 0.08, max = 0.35) => {
  return Math.random() * (max - min) + min;
};

// Random fade animation
const randomFade = {
  hidden: { opacity: 0, y: 35, rotate: Math.random() * 4 - 2 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      delay: randomDelay() * i,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

// Floating handwriting animation
const handwritingFloat = {
  hidden: { x: -10, rotate: -3 },
  visible: {
    x: 10,
    rotate: 3,
    transition: {
      repeat: Infinity,
      repeatType: "reverse",
      duration: 2.5,
      ease: "easeInOut",
    },
  },
};

// Floating decorative icons
const floatEffect = {
  hidden: { y: 0 },
  visible: {
    y: [-8, 8, -8],
    transition: {
      repeat: Infinity,
      duration: 3,
      ease: "easeInOut",
    },
  },
};

// Underline reveal animation
const underlineAnimation = {
  hidden: { width: "0%" },
  visible: {
    width: "70%",
    transition: { duration: 5.2, ease: "easeOut" },
  },
};

// ⭐ WORD-BY-WORD TYPING COMPONENT ⭐
const WordByWord = ({ text, delay = 120, style }) => {
  const words = text.split(" ");

  return (
    <div style={style}>
      {words.map((word, i) => (
        <span
          key={i}
          className="word-reveal"
          style={{ animationDelay: `${i * delay}ms` }}
        >
          {word}&nbsp;
        </span>
      ))}
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  const benefits = [
    {
      title: "Boosts Academic Performance",
      description: "Good handwriting helps students write faster, stay organized, and express answers clearly — leading to better exam scores and fewer mistakes.",
    },
    {
      title: "Enhances Brain Development",
      description: "Handwriting activates brain areas linked to memory, creativity, and learning — improving cognitive processing more than typing.",
    },
    {
      title: "Builds Confidence & Personality",
      description: "Neat handwriting reflects discipline and clarity. Students feel more confident when their writing looks clean, readable, and expressive.",
    },
    {
      title: "Improves Focus & Patience",
      description: "Handwriting practice trains students to stay calm, focused, and mindful. It builds patience and fine motor control.",
    },
    {
      title: "Strengthens Motor Skills",
      description: "Proper writing posture and pen control strengthen finger muscles and improve coordination for smoother handwriting.",
    },
  ];

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="hero-section" data-theme={theme}>
        <div className="container">
          <div className="row align-items-center min-vh-75">
            {/* LEFT SIDE CONTENT */}
            <div className="col-lg-6 text-center text-lg-start mb-5 mb-lg-0">
              <motion.div
                initial="hidden"
                animate="visible"
                transition={{
                  staggerChildren: randomDelay(0.1, 0.4),
                }}
              >
                {/* Tagline */}
                {/* Header */}
                <motion.h1
                  variants={randomFade}
                  custom={2}
                  className="hero-title"
                  style={{ color: colors.textDark }}
                >
                  Welcome to Writewell Academy
                </motion.h1>

                {/* Underline */}
                <motion.div
                  variants={underlineAnimation}
                  initial="hidden"
                  animate="visible"
                  className="hero-underline"
                  style={{ backgroundColor: colors.accent }}
                ></motion.div>

                {/* Paragraph 1 */}
                <motion.div
                  variants={randomFade}
                  custom={3}
                  className="hero-text-cursive"
                  style={{ color: colors.textDark }}
                >
                  <WordByWord
                    text="Handwriting is more than lines on paper — it's your personality, clarity, and confidence. At Writewell Academy, we help students master beautiful scripts through mindful writing practice."
                    delay={110}
                  />
                </motion.div>

                <motion.div
                  variants={randomFade}
                  custom={4}
                  className="hero-text"
                  style={{ color: colors.textMuted }}
                >
                  <WordByWord
                    text="Learn proper grip, posture, pen control, and structured drills that build rhythm and muscle memory. Our handwriting sessions transform messy writing into clean, confident, elegant strokes—perfect for students, teachers, and competitive exam aspirants."
                    delay={85}
                  />
                </motion.div>

                {/* BUTTONS */}
                <motion.div
                  variants={randomFade}
                  custom={5}
                  className="hero-buttons mt-5"
                >
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary"
                    style={{
                      background: colors.gradient.primary,
                      color: '#fff',
                    }}
                    onClick={() => navigate("/contact")}
                  >
                    <PenLine className="me-2" size={18} />
                    Join a Class
                    <ArrowRight className="ms-2" size={18} />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-secondary"
                    style={{
                      border: `2px solid ${colors.primary}`,
                      color: colors.primary,
                      background: 'transparent',
                    }}
                    onClick={() => navigate("/classes")}
                  >
                    View Schedule
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>

            {/* RIGHT SIDE IMAGE */}
            <div className="col-lg-6 text-center">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={handwritingFloat}
                className="hero-image-wrapper"
              >
                <img
                  src="./LOGO.jpg"
                  alt="Writewell Academy Logo"
                  className="hero-logo"
                />
                {/* Floating Pen */}
                <motion.div
                  variants={floatEffect}
                  className="floating-icon floating-pen"
                >
                  <Feather size={32} color={colors.accent} />
                </motion.div>

                {/* Floating Sparkle */}
                <motion.div
                  variants={floatEffect}
                  className="floating-icon floating-sparkle"
                >
                  <Wand2 size={30} color={colors.primary} />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      
      {/* Benefits Section */}
      <section className="benefits-section" data-theme={theme}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-5"
          >
            <h2 className="section-title" style={{ color: colors.textDark }}>
              ✨ Advantages of Good Handwriting
            </h2>
            <div
              className="section-divider"
              style={{ background: colors.gradient.primary }}
            ></div>
          </motion.div>

          <div className="benefits-list">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="benefit-item"
                style={{
                  borderBottom: index < benefits.length - 1 ? `1px solid ${colors.border}` : 'none',
                }}
              >
                <h3 className="benefit-title" style={{ color: colors.textDark }}>
                  ✨ {benefit.title}
                </h3>
                <p className="benefit-description" style={{ color: colors.textMuted }}>
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
