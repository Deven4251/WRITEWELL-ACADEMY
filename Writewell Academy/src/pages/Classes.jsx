/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  CheckCircle,
  Sparkles,
  Calendar,
  PenLine,
  Feather,
  Wand2,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { getThemeColors } from "../theme/colors";
import "./classes.css";

const SmallStat = ({ label, value, colors }) => (
  <div className="stat-item">
    <div className="stat-label" style={{ color: colors.textMuted }}>
      {label}
    </div>
    <div className="stat-value" style={{ color: colors.textDark }}>
      {value}
    </div>
  </div>
);

const Classes = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  const batchTimings = [
    { batch: "MONDAY THURSDAY", time: "4:30 PM - 5:15 PM" },
    { batch: "WEDNESDAY FRIDAY", time: "5:00 PM - 5:45 PM" },
  ];

  const features = [
    {
      title: "15+ Years Experience",
      desc: "Expertise for every age group.",
      icon: <CheckCircle size={24} />,
    },
    {
      title: "100+ Students",
      desc: "Results backed by real progress.",
      icon: <PenLine size={24} />,
    },
    {
      title: "Small Batches",
      desc: "Dedicated attention and corrections.",
      icon: <Feather size={24} />,
    },
    {
      title: "Personalized",
      desc: "Unique style analysis.",
      icon: <Wand2 size={24} />,
    },
    {
      title: "Safe Environment",
      desc: "Encouraging learning atmosphere.",
      icon: <Sparkles size={24} />,
    },
    {
      title: "Easy improvements",
      desc: "Encouraging Students minds.",
      icon: <Clock size={24} />,
    },
  ];

  const mistakes = [
    {
      problem: "❌ Uneven Letter Size",
      fix: "✔ Height drills",
      result: "✨ Consistency",
    },
    {
      problem: "❌ Words Too Close",
      fix: "✔ Spacing sheets",
      result: "✨ Readability",
    },
    {
      problem: "❌ Wrong Grip",
      fix: "✔ Grip correction",
      result: "✨ Smoothness",
    },
  ];

  return (
    <section id="classes" className="classes-pro-section py-5 position-relative overflow-hidden" data-theme={theme}>

      {/* Decorative Background Blob */}
      <div className="bg-blob" style={{ background: colors.gradient.primary, opacity: theme === 'dark' ? 0.15 : 0.08 }}></div>

      <div className="container position-relative text-center">
        <h2 className="display-5 fw-bold mb-4" style={{ color: colors.textDark }}>
          Master the Art of <span style={{ color: colors.highlight }}>Beautiful </span>Writing
        </h2>

        <div className="row g-5 align-items-start">

          {/* LEFT: Class Context & Teacher Glass-Card */}
          <div className="col-lg-5">
            <div className="teacher-glass-card p-4 rounded-4 shadow-sm" style={{ border: `1px solid ${colors.border}` }}>
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="avatar-circle" style={{ background: colors.gradient.primary }}>JT</div>
                <div>
                  <h4 className="mb-0 fw-bold" style={{ color: colors.textDark }}>Jyoti Tiwari</h4>
                  <p className="small mb-0 text-uppercase tracking-wider" style={{ color: colors.primary }}>Lead Instructor</p>
                </div>
              </div>
              <p className="teacher-quote italic" style={{ color: colors.textMuted }}>
                "Handwriting is the mirror of the mind. My 15+ years of experience is dedicated to making that mirror clear and beautiful."
              </p>
            </div>
            <motion.div
              className="schedule-info-card mt-5 p-4 rounded-4 overflow-hidden position-relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                background: colors.gradient.primary,
                color: '#fff',
                border: 'none'
              }}
            >
              {/* Decorative element for that "glassy/premium" feel */}
              <div className="card-decoration" style={{ opacity: 0.1, position: 'absolute', right: '-20px', top: '-20px' }}>
                <Clock size={120} />
              </div>

              <div className="position-relative">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div
                    className="icon-circle d-flex align-items-center justify-content-center rounded-circle"
                    style={{ background: 'rgba(255, 255, 255, 0.2)', width: '50px', height: '50px' }}
                  >
                    <Calendar size={24} />
                  </div>
                  <div className="flex-grow-1">
                    <h4 className="mb-0 fw-bold text-dark animated-title">
                      Enrollment Schedule
                    </h4>

                    <p className="small mb-0 opacity-75 text-uppercase tracking-wider fw-bold animated-para">Available Batches</p>
                  </div>
                </div>

                {/* Table Layout */}
                <div className="table-responsive">
                  <table className="table table-borderless mb-0" style={{ color: '#fff' }}>
                    <thead>
                      <tr className="border-bottom border-white border-opacity-25">
                        <th className="ps-0 py-2 opacity-75 fw-medium">Days</th>
                        <th className="py-2 opacity-75 fw-medium">Time Slot</th>
                        <th className="pe-0 py-2 text-end opacity-75 fw-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="align-middle">
                        <td className="ps-0 py-3 fw-semibold">Mon - Thu</td>
                        <td className="py-3">4:30 PM - 5:15 PM</td>
                        <td className="pe-0 py-3 text-end">
                          <div className="d-inline-flex align-items-center gap-2">
                            <span className="pulse-dot" style={{ width: '8px', height: '8px', background: '#4ade80', borderRadius: '50%' }}></span>

                            <span className="badge rounded-pill bg-white text-primary px-3">Enrolling</span>
                          </div>
                        </td>
                      </tr>
                      <tr className="align-middle">
                        <td className="ps-0 py-3 fw-semibold">Wed - Fri</td>
                        <td className="py-3">5:00 PM - 5:45 PM</td>
                        <td className="pe-0 py-3 text-end">
                          <div className="d-inline-flex align-items-center gap-2">
                            <span className="pulse-dot" style={{ width: '8px', height: '8px', background: '#4ade80', borderRadius: '50%' }}></span>

                            <span className="badge rounded-pill bg-white text-primary px-3">Enrolling</span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Grid of "Small Cards" Features */}
          <div className="col-lg-7">
            <div className="row g-3">
              {features.map((item, index) => (
                <motion.div
                  key={index}
                  className="col-md-6"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div className="feature-mini-card p-4 rounded-4 h-100" style={{ background: theme === 'dark' ? '#ffffff05' : '#ffffff', border: `1px solid ${colors.border}` }}>
                    <div className="icon-box mb-3" style={{ color: colors.primary }}>{item.icon}</div>
                    <h5 className="fw-bold" style={{ color: colors.textDark }}>{item.title}</h5>
                    <p className="small mb-0" style={{ color: colors.textMuted }}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM: Schedule & CTA Bar */}

      </div>
    </section>
  );
};

export default Classes;
