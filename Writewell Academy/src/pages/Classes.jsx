/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  CheckCircle,
  Sparkles,
  PenLine,
  Feather,
  Wand2,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { getThemeColors } from "../theme/colors";
import "./classes.css";

/* ---------------- SMALL STAT ---------------- */
const SmallStat = ({ label, value, colors }) => (
  <div className="stat-item">
    <div className="stat-label" style={{ color: colors.textMuted }}>{label}</div>
    <div className="stat-value" style={{ color: colors.textDark }}>{value}</div>
  </div>
);

/* ---------------- MAIN PAGE ---------------- */
const Classes = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  const handleclickNow = () => {
    navigate("/contact");
  };

  const batchTimings = [
    { batch: "MONDAY THURSDAY", time: "4:30 PM - 5:15 PM" },
    { batch: "WEDNESDAY FRIDAY", time: "5:00 PM - 5:45 PM" },
  ];

  const features = [
    { title: "15+ Years of Experience", desc: "Professional handwriting expertise for every age group.", icon: <Sparkles size={28} /> },
    { title: "1000+ Students Trained", desc: "Consistent results backed by real student progress.", icon: <PenLine size={28} /> },
    { title: "Small Batch Size", desc: "Every child gets dedicated attention and corrections.", icon: <Feather size={28} /> },
    { title: "Personalized Techniques", desc: "Unique writing style analysis and custom improvements.", icon: <Wand2 size={28} /> },
    { title: "Safe & Supportive Environment", desc: "Encouraging and positive learning atmosphere.", icon: <Sparkles size={28} /> },
  ];

  const mistakes = [
    { problem: "❌ Uneven Letter Size", fix: "✔ Height drills", result: "✨ Consistent letters" },
    { problem: "❌ Words Too Close", fix: "✔ Spacing sheets", result: "✨ Clear readability" },
    { problem: "❌ Wrong Grip / Pressure", fix: "✔ Grip correction", result: "✨ Smooth writing" },
    { problem: "❌ Misaligned Letters", fix: "✔ Baseline practice", result: "✨ Balanced writing" }
  ];

  const sessionStats = [
    { label: "Program", value: "Handwriting Mastery" },
    { label: "Frequency", value: "2 sessions/week" },
    { label: "Duration", value: "45 min/session" }
  ];

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="classes-hero" data-theme={theme}>
        <div className="container">
          <div className="row align-items-center">
            <motion.div
              className="col-lg-3 text-center mb-4 mb-lg-0"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <lottie-player
                src="https://lottie.host/842d2c57-11c3-4455-be91-6132f03968e0/L975ZnvUlY.json"
                background="transparent"
                speed="1"
                loop
                autoplay
                style={{ width: "200px", height: "200px" }}
              ></lottie-player>
            </motion.div>

            <motion.div
              className="col-lg-6 text-center"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="classes-title" style={{ color: colors.textDark }}>
                Writewell Classes
              </h1>
              <p className="classes-subtitle" style={{ color: colors.textMuted }}>
                Personalized handwriting improvement in small offline batches — Hindi & English.
              </p>
              <div className="classes-stats">
                {[
                  { label: "Program", value: "Handwriting Mastery" },
                  { label: "Duration", value: "6 months" },
                  { label: "Session", value: "45 min/session" }
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    className="stat-badge"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: 0.4 + idx * 0.1,
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={{ scale: 1.05, y: -3 }}
                    style={{
                      background: theme === 'dark' ? colors.surface + '80' : colors.background,
                      border: `1px solid ${colors.border}`
                    }}
                  >
                    <SmallStat label={stat.label} value={stat.value} colors={colors} />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="col-lg-3 text-center"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <lottie-player
                src="https://lottie.host/c752541e-c47c-4bec-96c9-dd5ff6295e4b/H52aYWV3Yc.json"
                background="transparent"
                speed="1"
                loop
                autoplay
                style={{ width: "200px", height: "200px" }}
              ></lottie-player>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Teacher Section */}
      <section className="teacher-section" data-theme={theme}>
        <div className="container">
          <motion.div
            className="teacher-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="teacher-info">
              <lottie-player
                src="https://lottie.host/5b1ff725-8af3-49c9-bb1f-9a8aa2eabbf2/WmiSL1vRdE.json"
                background="transparent"
                speed="1"
                loop
                autoplay
                style={{ width: "100px", height: "90px" }}
              ></lottie-player>
              <div className="teacher-details">
                <h3 className="teacher-name" style={{ color: colors.textDark }}>
                  Jyoti Tiwari
                </h3>
                <p className="teacher-qualification" style={{ color: colors.textMuted }}>
                  M.Sc & B.Ed — 15+ yrs experience
                </p>
                <p className="teacher-description" style={{ color: colors.textMuted }}>
                  Expert in grip correction, letter formation, spacing, alignment, and handwriting speed—skilled in identifying individual writing issues and providing personalized techniques.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" data-theme={theme}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-5"
          >
            <h2 className="section-title" style={{ color: colors.textDark }}>
              Why Choose Writewell Classes?
            </h2>
            <div
              className="section-divider"
              style={{ background: colors.gradient.primary }}
            ></div>
          </motion.div>

          <div className="features-list">
            {features.map((item, index) => (
              <motion.div
                key={index}
                className="feature-item"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                style={{
                  borderBottom: index < features.length - 1 ? `1px solid ${colors.border}` : 'none',
                }}
              >
                <div className="feature-icon-wrapper" style={{ color: colors.primary }}>
                  {item.icon}
                </div>
                <div className="feature-content">
                  <h3 className="feature-title" style={{ color: colors.textDark }}>
                    {item.title}
                  </h3>
                  <p className="feature-desc" style={{ color: colors.textMuted }}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="classes-main" data-theme={theme}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {/* Session Details */}
              <section className="content-section">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="section-header">
                    <Clock size={24} style={{ color: colors.secondary }} />
                    <h3 className="section-heading" style={{ color: colors.textDark }}>
                      Session Details
                    </h3>
                  </div>
                  <div className="stats-grid">
                    {sessionStats.map((stat, idx) => (
                      <motion.div
                        key={idx}
                        className="stat-item-wrapper"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: 0.2 + idx * 0.1,
                        }}
                        whileHover={{ scale: 1.05 }}
                        style={{
                          background: theme === 'dark' ? colors.surface + '40' : colors.background,
                          border: `1px solid ${colors.border}`
                        }}
                      >
                        <SmallStat label={stat.label} value={stat.value} colors={colors} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </section>

              {/* Mistakes & Fixes */}
              <section className="content-section">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="section-heading" style={{ color: colors.textDark }}>
                    Handwriting Problems & Fixes
                  </h3>
                  <div className="mistakes-list">
                    {mistakes.map((item, index) => (
                      <motion.div
                        key={index}
                        className="mistake-item"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.1,
                        }}
                        style={{
                          borderBottom: index < mistakes.length - 1 ? `1px solid ${colors.border}` : 'none',
                        }}
                        whileHover={{ x: 8 }}
                      >
                        <div className="mistake-problem" style={{ color: colors.textDark }}>
                          {item.problem}
                        </div>
                        <div className="mistake-fix" style={{ color: colors.accent }}>
                          {item.fix}
                        </div>
                        <div className="mistake-result" style={{ color: colors.textMuted }}>
                          {item.result}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </section>

              {/* Batch Timings */}
              <section className="content-section">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="section-heading" style={{ color: colors.textDark }}>
                    Batch Timings (Offline)
                  </h3>
                  <div className="timings-table-wrapper">
                    <table className="timings-table">
                      <thead>
                        <tr style={{ borderBottom: `2px solid ${colors.border}` }}>
                          <th style={{ color: colors.textMuted }}>Batch (DAYS)</th>
                          <th style={{ color: colors.textMuted }}>Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {batchTimings.map((b, i) => (
                          <motion.tr
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                            whileHover={{ x: 5 }}
                            style={{
                              borderBottom: i < batchTimings.length - 1 ? `1px solid ${colors.border}` : 'none',
                              color: colors.textDark
                            }}
                          >
                            <td>{b.batch}</td>
                            <td style={{ color: colors.textMuted }}>{b.time}</td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </section>

              {/* News */}
              <section className="content-section">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="section-heading" style={{ color: colors.textDark }}>
                    NEWS REGARDING ONLINE BATCH
                  </h3>
                  <p
                    className="news-text"
                    style={{
                      color: colors.textMuted,
                      borderLeft: `4px solid ${colors.accent}`,
                      paddingLeft: '20px'
                    }}
                  >
                   <b>To learn more about the online batch, feel free to contact us through the Contact page.</b> <br/>
                   Enrollment is almost full — grab your seat while you still can.
                   <br/>
                  </p>

                </motion.div>

              </section>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <motion.div
                className="enrollment-box"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{
                  background: theme === 'dark' ? colors.surface + '60' : colors.background,
                  border: `2px solid ${colors.primary}`,
                }}
              >
                <div className="enrollment-header">
                  <h4 style={{ color: colors.textDark }}>Seats Filling Fast</h4>
                  <CheckCircle size={28} style={{ color: colors.primary }} />
                </div>
                <p style={{ color: colors.textMuted, marginBottom: '24px' }}>
                  Only few seats left
                </p>
                
                <button
                  className="enroll-btn"
                  onClick={handleclickNow}
                  style={{
                    background: colors.gradient.primary,
                    color: '#fff',
                  }}
                >
                  Book Now
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Classes;
