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
import Batches from "../components/batches";

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
    <section id="classes" className="classes-pro-section py-4 position-relative overflow-hidden" data-theme={theme}>
      {/* Decorative Background Blob */}
      <div className="bg-blob"
        style={{
          background: colors.gradient.primary,
          opacity: theme === "dark" ? 0.15 : 0.08,
        }}
      ></div>

      <div className="container position-relative">
        <h2
          className="display-5 fw-bold mb-4 text-center"
          style={{ color: colors.textDark }}
        >
          Master the Art of{" "}
          <span style={{ color: colors.highlight }}>Beautiful</span> Writing
        </h2>

        <Batches />
        {/* Features Grid */}
        <div className="row g-3 mt-3">
          <div className="col-12">
            <div className="row g-3">
              {features.map((item, index) => (
                <motion.div
                  key={index}
                  className="col-md-6 col-lg-4"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="feature-mini-card p-3 rounded-4 h-100" style={{ background: theme === 'dark' ? '#ffffff05' : '#ffffff', border: `1px solid ${colors.border}` }}>
                    <div className="icon-box mb-2" style={{ color: colors.primary }}>{item.icon}</div>
                    <h5 className="fw-bold" style={{ color: colors.textDark }}>{item.title}</h5>
                    <p className="small mb-0" style={{ color: colors.textMuted }}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Classes;
