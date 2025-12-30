/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { getThemeColors } from "../theme/colors";
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
    before: "/images/aniket3rd.jpg",
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

  const goNext = () =>
    setGalleryIndex((g) => (g + 1) % galleryItems.length);

  const goPrev = () =>
    setGalleryIndex((g) => (g - 1 + galleryItems.length) % galleryItems.length);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") setZoomImage(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
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
              Tips for Better Handwriting · Student Transformations
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
                }}
              >
                <Lightbulb
                  size={22}
                  style={{ color: colors.accent, flexShrink: 0 }}
                />
                <p style={{ color: colors.textMuted }}>{tip}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSFORMATIONS */}
      <section className="carousel-section" data-theme={theme}>
        <div className="container">
          <h2
            className="section-heading text-center"
            style={{ color: colors.textDark }}
          >
            Student Transformations
          </h2>

          <div className="carousel-static-header">
            <h3 className="carousel-title" style={{ color: colors.textDark }}>
              Before & After Results
            </h3>
            <p
              className="carousel-description"
              style={{ color: colors.textMuted }}
            >
              Real improvements achieved through structured practice and expert
              guidance.
            </p>
          </div>

          <div className="minimal-carousel">
            <AnimatePresence mode="wait">
              <motion.div
                key={galleryIndex}
                className="carousel-slide"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.45 }}
              >
                <div className="image-pair">
                  <div className="image-container">
                    <p
                      className="image-label"
                      style={{ color: colors.textMuted }}
                    >
                      Before
                    </p>
                    <motion.img
                      src={galleryItems[galleryIndex].before}
                      alt="Before handwriting"
                      className="transformation-image"
                      onClick={() =>
                        setZoomImage(galleryItems[galleryIndex].before)
                      }
                      whileHover={{ scale: 1.04 }}
                    />
                  </div>

                  <div className="image-container">
                    <p
                      className="image-label"
                      style={{ color: colors.textMuted }}
                    >
                      After
                    </p>
                    <motion.img
                      src={galleryItems[galleryIndex].after}
                      alt="After handwriting"
                      className="transformation-image"
                      onClick={() =>
                        setZoomImage(galleryItems[galleryIndex].after)
                      }
                      whileHover={{ scale: 1.04 }}
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              className="carousel-nav carousel-nav-left"
              onClick={goPrev}
              aria-label="Previous"
              style={{ color: colors.primary }}
            >
              <ChevronLeft size={26} />
            </button>

            <button
              className="carousel-nav carousel-nav-right"
              onClick={goNext}
              aria-label="Next"
              style={{ color: colors.primary }}
            >
              <ChevronRight size={26} />
            </button>

            <div className="carousel-dots">
              {galleryItems.map((_, i) => (
                <button
                  key={i}
                  className={`carousel-dot ${i === galleryIndex ? "active" : ""
                    }`}
                  onClick={() => setGalleryIndex(i)}
                  style={{
                    background:
                      i === galleryIndex
                        ? colors.primary
                        : colors.border,
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
                  : "rgba(0,0,0,0.85)",
            }}
          >
            <motion.img
              src={zoomImage}
              className="zoom-image"
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
            />
            <button
              className="zoom-close"
              onClick={() => setZoomImage(null)}
            >
              <X size={34} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Insights;
