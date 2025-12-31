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

  const goNext = () => setGalleryIndex((g) => (g + 1) % galleryItems.length);
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
    <section id="insights" className="insights-section py-5" data-theme={theme}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-5"
        >
          <h1 className="insights-title" style={{ color: colors.textDark }}>
            Insights
          </h1>
          <p className="insights-subtitle" style={{ color: colors.textMuted }}>
            Tips for Better Handwriting & Student Transformations
          </p>
        </motion.div>

        {/* TIPS SECTION */}
        <div className="row g-4 mb-5">
          <div className="col-12">
            <h2
              className="section-heading h3"
              style={{ color: colors.textDark }}
            >
              Handwriting Tips
            </h2>
          </div>
          <div className="tips-grid">
            {tips.map((tip, i) => (
              <motion.div
                key={i}
                className="tip-item-card"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: theme === "dark" ? "#ffffff05" : "#f8f9fa",
                  borderLeft: `4px solid ${colors.accent}`,
                }}
              >
                <Lightbulb
                  size={20}
                  className="me-2"
                  style={{ color: colors.accent }}
                />
                <p className="mb-0" style={{ color: colors.textMuted }}>
                  {tip}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* TRANSFORMATIONS CAROUSEL */}
        <div className="transformations-wrapper py-5">
          <div className="text-center mb-4">
            <h2 className="h3 fw-bold" style={{ color: colors.textDark }}>
              Results
            </h2>
            <p style={{ color: colors.textMuted }}>
              Real improvements achieved through expert guidance.
            </p>
          </div>
          <div className="minimal-carousel position-relative px-md-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={galleryIndex}
                className="image-pair-grid"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <div className="image-box">

                  <img
                    src={galleryItems[galleryIndex].before}
                    onClick={() =>
                      setZoomImage(galleryItems[galleryIndex].before)
                    }
                    alt="Before"
                    className="img-fluid rounded-3"
                  />
                </div>
                <div className="image-box">

                  <img
                    src={galleryItems[galleryIndex].after}
                    onClick={() =>
                      setZoomImage(galleryItems[galleryIndex].after)
                    }
                    alt="After"
                    className="img-fluid rounded-3"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
            <button className="nav-btn left" onClick={goPrev}>
              <ChevronLeft />
            </button>
            <button className="nav-btn right" onClick={goNext}>
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {zoomImage && (
          <motion.div
            className="zoom-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomImage(null)}
          >
            <motion.img
              src={zoomImage}
              className="zoom-content"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            />
            <button className="zoom-close">
              <X size={30} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Insights;
