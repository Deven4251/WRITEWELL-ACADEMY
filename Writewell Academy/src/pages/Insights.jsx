/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import Avatar from "../components/Avatar";
import { Lightbulb, X, Send, ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { getThemeColors } from "../theme/colors";
import Confetti from "../utils/confetti";
import api from "../api/axios";
import "./insights.css";

const galleryItems = [
  {
    before: "/images/img1.jpg",
    after: "/images/img2.jpg",
    title: "Grade 5 Improvement",
    description: "Remarkable progress in letter formation and spacing",
  },
  {
    before: "/images/img3.jpg",
    after: "/images/img5.jpg",
    title: "Grade 7 Transformation",
    description:
      "Consistent handwriting style achieved through dedicated practice",
  },
  {
    before: "/images/tanya.jpg",
    after: "/images/tanya2.jpg",
    title: "Grade 9 Transformation",
    description: "Improved speed and clarity for better exam performance",
  },
  {
    before: "/images/aniket3rd.jpg",   // ensure file names match your public/images
    after: "/images/img6after.jpg",
    title: "Grade 11 Transformation",
    description: "Professional handwriting ready for competitive exams",
  },
];

const tips = [
  "Practice slow strokes first — speed increases automatically later.",
  "Use a relaxed grip; do not apply too much pressure on the pen.",
  "Maintain consistent spacing between letters and words.",
  "Always keep your wrist free, not stiff.",
  "Rewrite one to two pages daily to build flow.",
  "For improving neatness, use single-ruled books.",
];

const Insights = () => {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  const [galleryIndex, setGalleryIndex] = useState(0);
  const [zoomImage, setZoomImage] = useState(null);
  const [feedbackList, setFeedbackList] = useState([]);
  const [fbName, setFbName] = useState("");
  const [fbMessage, setFbMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const mounted = useRef(true);

  // Load feedback from backend
  const loadFeedback = async () => {
    try {
      const res = await api.get("/api/feedback");
      if (!mounted.current) return;
      const data = (res.data.feedback || []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setFeedbackList(data);
    } catch (err) {
      console.error("❌ Error fetching feedback:", err);
    } finally {
      if (mounted.current) setLoading(false);
    }
  };

  useEffect(() => {
    mounted.current = true;
    loadFeedback();
    return () => {
      mounted.current = false;
    };
  }, []);

  // Submit new feedback
  const submitFeedback = async () => {
    if (!fbName.trim() || !fbMessage.trim()) return;
    setSubmitting(true);

    const temp = {
      _id: `temp-${Date.now()}`,
      name: fbName.trim(),
      message: fbMessage.trim(),
      createdAt: new Date().toISOString(),
      like: 0,
      love: 0,
      wow: 0,
    };

    setFeedbackList((s) => [temp, ...s]);
    setFbName("");
    setFbMessage("");

    const form = {
      name: temp.name,
      message: temp.message,
    };

    try {
      const res = await api.post("/api/feedback", form);
      const saved = res.data.feedback || res.data || null;

      if (saved && saved._id) {
        setFeedbackList((s) =>
          s.map((f) => (f._id === temp._id ? saved : f))
        );
      } else {
        loadFeedback();
      }
    } catch (err) {
      console.error("❌ Feedback submit failed:", err);
      setFeedbackList((s) => s.filter((f) => f._id !== temp._id));
    } finally {
      setSubmitting(false);
    }
  };

  // Reaction helpers
  const getUserReactions = () => {
    try {
      return JSON.parse(localStorage.getItem("reactions") || "{}");
    } catch {
      return {};
    }
  };

  const getUserReaction = (id) => getUserReactions()[id] || null;

  const setUserReaction = (id, type) => {
    const obj = getUserReactions();
    obj[id] = type;
    localStorage.setItem("reactions", JSON.stringify(obj));
  };

  const doConfetti = () => Confetti.fullscreen();
  const doEmojiBurst = (emoji = "❤️") =>
    Confetti.emojiBurst({ emoji, count: 18 });

  const addReaction = async (id, type) => {
    const previous = getUserReaction(id);
    if (previous === type) return;

    // Optimistic UI update
    setFeedbackList((prev) =>
      prev.map((fb) => {
        if (fb._id !== id) return fb;
        const updated = { ...fb };
        if (previous) {
          updated[previous] = Math.max((updated[previous] || 1) - 1, 0);
        }
        updated[type] = (updated[type] || 0) + 1;
        return updated;
      })
    );

    setUserReaction(id, type);

    if (type === "love") {
      doConfetti();
      doEmojiBurst("❤️");
    } else if (type === "wow") {
      doEmojiBurst("😮");
    } else if (type === "like") {
      doEmojiBurst("👍");
    }

    try {
      await api.post(`/api/feedback/react/${id}`, { type, previous });
    } catch (err) {
      console.error("Reaction error:", err);
      // Revert UI on error
      setFeedbackList((prev) =>
        prev.map((fb) => {
          if (fb._id !== id) return fb;
          const updated = { ...fb };
          updated[type] = Math.max((updated[type] || 1) - 1, 0);
          if (previous) updated[previous] = (updated[previous] || 0) + 1;
          return updated;
        })
      );
      const obj = getUserReactions();
      if (previous) obj[id] = previous;
      else delete obj[id];
      localStorage.setItem("reactions", JSON.stringify(obj));
    }
  };

  // Carousel controls
  const goNext = () =>
    setGalleryIndex((g) => (g + 1) % galleryItems.length);

  const goPrev = () =>
    setGalleryIndex((g) => (g - 1 + galleryItems.length) % galleryItems.length);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <Header />

      <main className="insights-main" data-theme={theme}>
        {/* HERO */}
        <section className="insights-hero">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="insights-title" style={{ color: colors.textDark }}>
                Insights
              </h1>
              <p
                className="insights-subtitle"
                style={{ color: colors.textMuted }}
              >
                Tips for Better Handwriting · Before–After · Success Stories
              </p>
            </motion.div>
          </div>
        </section>

        {/* TIPS */}
        <section className="tips-section" data-theme={theme}>
          <div className="container">
            <h2 className="section-heading" style={{ color: colors.textDark }}>
              Handwriting Tips
            </h2>
            <div className="tips-list">
              {tips.map((tip, i) => (
                <motion.div
                  key={i}
                  className="tip-item"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  style={{
                    borderLeft: `4px solid ${colors.accent}`,
                    borderBottom:
                      i < tips.length - 1
                        ? `1px solid ${colors.border}`
                        : "none",
                  }}
                >
                  <Lightbulb
                    size={24}
                    style={{ color: colors.accent, flexShrink: 0 }}
                  />
                  <p style={{ color: colors.textMuted, margin: 0 }}>{tip}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAROUSEL */}
        <section className="carousel-section" data-theme={theme}>
          <div className="container">
            <h2
              className="section-heading text-center"
              style={{ color: colors.textDark }}
            >
              Student Transformations
            </h2>

            <div className="carousel-static-header">
              <h3
                className="carousel-title"
                style={{ color: colors.textDark }}
              >
                Student Progress Showcase
              </h3>
              <p
                className="carousel-description"
                style={{ color: colors.textMuted }}
              >
                Witness the remarkable transformations achieved through
                dedicated practice and expert guidance.
              </p>
            </div>

            <div className="minimal-carousel">
              <AnimatePresence mode="wait">
                <motion.div
                  key={galleryIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="carousel-slide"
                >
                  <div className="carousel-content">
                    <div className="carousel-images">
                      <div className="image-pair">
                        <div className="image-container">
                          <p
                            className="image-label"
                            style={{ color: colors.textMuted }}
                          >
                            {`Slide ${galleryIndex + 1} of ${galleryItems.length
                              }`}
                          </p>
                          <motion.img
                            src={galleryItems[galleryIndex].before}
                            alt={galleryItems[galleryIndex].title + " - Before"}
                            className="transformation-image"
                            onClick={() =>
                              setZoomImage(galleryItems[galleryIndex].before)
                            }
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>

                        <div className="image-container">
                          <p
                            className="image-label"
                            style={{ color: colors.textMuted }}
                          >
                            {`Slide ${galleryIndex + 1} of ${galleryItems.length
                              }`}
                          </p>
                          <motion.img
                            src={galleryItems[galleryIndex].after}
                            alt={galleryItems[galleryIndex].title + " - After"}
                            className="transformation-image"
                            onClick={() =>
                              setZoomImage(galleryItems[galleryIndex].after)
                            }
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <button
                className="carousel-nav carousel-nav-left"
                onClick={goPrev}
                aria-label="Previous slide"
                style={{ color: colors.primary }}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className="carousel-nav carousel-nav-right"
                onClick={goNext}
                aria-label="Next slide"
                style={{ color: colors.primary }}
              >
                <ChevronRight size={24} />
              </button>

              <div className="carousel-dots">
                {galleryItems.map((_, i) => (
                  <button
                    key={i}
                    className={`carousel-dot ${i === galleryIndex ? "active" : ""
                      }`}
                    onClick={() => setGalleryIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    style={{
                      background:
                        i === galleryIndex ? colors.primary : colors.border,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ZOOM MODAL */}
        <AnimatePresence>
          {zoomImage && (
            <motion.div
              className="zoom-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setZoomImage(null)}
              style={{
                background:
                  theme === "dark"
                    ? "rgba(0,0,0,0.9)"
                    : "rgba(0,0,0,0.8)",
              }}
            >
              <motion.img
                src={zoomImage}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="zoom-image"
              />
              <button
                onClick={() => setZoomImage(null)}
                className="zoom-close"
                style={{ color: "#fff" }}
              >
                <X size={32} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FEEDBACK SECTION */}
        <section className="feedback-section" data-theme={theme}>
          <div className="container">
            <div className="feedback-header">
              <h2
                className="section-heading"
                style={{ color: colors.textDark }}
              >
                Parents Feedback
              </h2>
              <span
                className="feedback-count"
                style={{ color: colors.textMuted }}
              >
                {feedbackList.length} entries
              </span>
            </div>

            {loading && (
              <div className="loading-state">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: "linear",
                  }}
                  className="loading-spinner"
                  style={{
                    borderColor: colors.border,
                    borderTopColor: colors.primary,
                  }}
                />
                <p style={{ color: colors.textMuted }}>Loading feedback…</p>
              </div>
            )}

            <div className="feedback-list">
              {feedbackList.map((fb, i) => {
                const current = getUserReaction(fb._id);
                return (
                  <motion.div
                    key={fb._id}
                    className="feedback-item"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45 }}
                    style={{
                      borderBottom:
                        i < feedbackList.length - 1
                          ? `1px solid ${colors.border}`
                          : "none",
                    }}
                  >
                    <div className="feedback-avatar">
                      <Avatar name={fb.name} size={60} />
                    </div>
                    <div className="feedback-content">
                      <div className="feedback-header-item">
                        <div>
                          <h4
                            className="feedback-name"
                            style={{ color: colors.textDark }}
                          >
                            {fb.name}
                          </h4>
                          <p
                            className="feedback-message"
                            style={{ color: colors.textMuted }}
                          >
                            "{fb.message}"
                          </p>
                        </div>
                        <div className="feedback-meta">
                          <span
                            className="feedback-date"
                            style={{ color: colors.textMuted }}
                          >
                            {fb.createdAt
                              ? new Date(
                                fb.createdAt
                              ).toLocaleDateString()
                              : ""}
                          </span>
                          <div className="feedback-reactions">
                            <motion.button
                              whileTap={{ scale: 1.2 }}
                              className={`reaction-btn ${current === "like" ? "active" : ""
                                }`}
                              onClick={() => addReaction(fb._id, "like")}
                              style={{
                                opacity: current === "like" ? 1 : 0.6,
                              }}
                            >
                              👍 {fb.like || 0}
                            </motion.button>
                            <motion.button
                              whileTap={{ scale: 1.2 }}
                              className={`reaction-btn ${current === "love" ? "active" : ""
                                }`}
                              onClick={() => addReaction(fb._id, "love")}
                              style={{
                                opacity: current === "love" ? 1 : 0.6,
                              }}
                            >
                              ❤️ {fb.love || 0}
                            </motion.button>
                            <motion.button
                              whileTap={{ scale: 1.2 }}
                              className={`reaction-btn ${current === "wow" ? "active" : ""
                                }`}
                              onClick={() => addReaction(fb._id, "wow")}
                              style={{
                                opacity: current === "wow" ? 1 : 0.6,
                              }}
                            >
                              😮 {fb.wow || 0}
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* FEEDBACK FORM */}
            <motion.div
              className="feedback-form"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{
                borderTop: `2px solid ${colors.border}`,
                paddingTop: "32px",
                marginTop: "48px",
              }}
            >
              <h3
                className="section-heading"
                style={{ color: colors.textDark }}
              >
                Write Your Feedback
              </h3>
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="form-input"
                  value={fbName}
                  onChange={(e) => setFbName(e.target.value)}
                  style={{
                    background:
                      theme === "dark"
                        ? colors.surface + "60"
                        : colors.background,
                    border: `1px solid ${colors.border}`,
                    color: colors.textDark,
                  }}
                />
                <textarea
                  placeholder="Your Message"
                  className="form-textarea"
                  rows="3"
                  value={fbMessage}
                  onChange={(e) => setFbMessage(e.target.value)}
                  style={{
                    background:
                      theme === "dark"
                        ? colors.surface + "60"
                        : colors.background,
                    border: `1px solid ${colors.border}`,
                    color: colors.textDark,
                  }}
                />
              </div>
              <button
                onClick={submitFeedback}
                disabled={submitting}
                className="submit-btn"
                style={{
                  background: colors.gradient.primary,
                  color: "#fff",
                }}
              >
                <Send size={18} />
                {submitting ? "Submitting..." : "Submit Feedback"}
              </button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Insights;
