/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageSquare, Heart, ThumbsUp, Star } from "lucide-react";
import Avatar from "../components/Avatar";
import { useTheme } from "../context/ThemeContext";
import { getThemeColors } from "../theme/colors";
import Confetti from "../utils/confetti";
import api from "../api/axios";
import FloatingWhatsAppButton from "../components/WhatsappButton";
import "./testimonials.css";
import "./insights.css";

// --- Helper Functions for Local Storage Reactions ---
const getUserReactions = () => {
    try {
        return JSON.parse(localStorage.getItem("testimonial-reactions") || "{}");
    } catch { return {}; }
};
const getUserReaction = (id) => getUserReactions()[id] || null;
const setUserReaction = (id, type) => {
    const obj = getUserReactions();
    obj[id] = type;
    localStorage.setItem("testimonial-reactions", JSON.stringify(obj));
};
const removeUserReaction = (id) => {
    const obj = getUserReactions();
    delete obj[id];
    localStorage.setItem("testimonial-reactions", JSON.stringify(obj));
};

const Testimonials = () => {
    const { theme } = useTheme();
    const colors = getThemeColors(theme);

    const [feedbackList, setFeedbackList] = useState([]);
    const [fbName, setFbName] = useState("");
    const [fbMessage, setFbMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const mounted = useRef(true);

    const loadFeedback = async () => {
        try {
            const res = await api.get("/api/feedback");
            if (!mounted.current) return;
            setFeedbackList(
                (res.data.feedback || []).sort((a, b) => (b.like || 0) - (a.like || 0))
            );
        } finally {
            if (mounted.current) setLoading(false);
        }
    };

    useEffect(() => {
        mounted.current = true;
        loadFeedback();
        return () => { mounted.current = false; };
    }, []);

    const submitFeedback = async () => {
        if (!fbName.trim() || !fbMessage.trim()) return;
        setSubmitting(true);
        try {
            await api.post("/api/feedback", { name: fbName, message: fbMessage });
            setFbName("");
            setFbMessage("");
            loadFeedback();
            Confetti.emojiBurst({ emoji: "✨", count: 15 });
        } finally {
            setSubmitting(false);
        }
    };

    const addReaction = async (id, type) => {
        const previous = getUserReaction(id);
        if (previous === type) return;

        setFeedbackList((prev) =>
            prev.map((fb) => {
                if (fb._id !== id) return fb;
                const updated = { ...fb };
                if (previous) updated[previous] = Math.max((updated[previous] || 1) - 1, 0);
                updated[type] = (updated[type] || 0) + 1;
                return updated;
            })
        );

        setUserReaction(id, type);
        const emojis = { like: "👍", love: "❤️", wow: "😮" };
        Confetti.emojiBurst({ emoji: emojis[type], count: 10 });

        try {
            await api.post(`/api/feedback/react/${id}`, { type, previous });
        } catch {
            loadFeedback(); // Simple rollback
        }
    };

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 },
        hover: { y: -5, boxShadow: "0px 10px 30px rgba(0,0,0,0.1)" }
    };

    return (
        <main className="insights-main" data-theme={theme} style={{ background: colors.background }}>
            <section className="feedback-section">
                <div className="container">
                    <header className="testimonial-header">
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="insights-title text-center"
                            style={{ color: colors.textDark }}
                        >
                            Testimonials
                        </motion.h1>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="insights-subtitle text-center" style={{ color: colors.textMuted }}>
                            What parents and students are saying about us.
                        </motion.p>
                    </header>
                    <motion.div
                        className="feedback-grid"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <AnimatePresence mode='popLayout'>
                            {feedbackList.map((fb) => {
                                const current = getUserReaction(fb._id);
                                const date = fb.createdAt ? new Date(fb.createdAt).toLocaleDateString("en-GB") : "";

                                return (
                                    <motion.div
                                        layout
                                        key={fb._id}
                                        className="testimonial-card-v2"
                                        variants={cardVariants}
                                        whileHover="hover"
                                        exit={{ opacity: 0, scale: 0.8 }}
                                    >
                                        <div className="card-top">
                                            <div className="user-meta">
                                                <span className="user-name ">{fb.name}</span>
                                                <span className="post-date ">{date}</span>
                                            </div>
                                            <Star className="quote-icon" size={20} fill="#FFD700" color="#FFD700" />
                                        </div>

                                        <div className="card-body">
                                            <p>“{fb.message}”</p>
                                        </div>

                                        <div className="card-actions">
                                            <button className={`react-pill ${current === "like" ? "active" : ""}`} onClick={() => addReaction(fb._id, "like")}>
                                                <ThumbsUp size={14} /> {fb.like || 0}
                                            </button>
                                            <button className={`react-pill ${current === "love" ? "active" : ""}`} onClick={() => addReaction(fb._id, "love")}>
                                                <Heart size={14} /> {fb.love || 0}
                                            </button>
                                            <button className={`react-pill ${current === "wow" ? "active" : ""}`} onClick={() => addReaction(fb._id, "wow")}>
                                                😮 {fb.wow || 0}
                                            </button>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </motion.div>

                    {/* Floating Action Form */}
                    <motion.div
                        className="feedback-form-v2"
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className="form-header">

                            <h3><MessageSquare size={24} />  Share Your Feedback</h3>
                        </div>

                        <div className="form-inputs">
                            <input
                                className="modern-input"
                                placeholder="Name"
                                value={fbName}
                                onChange={(e) => setFbName(e.target.value)}
                            />
                            <textarea
                                className="modern-textarea"
                                placeholder="Write a message..."
                                value={fbMessage}
                                onChange={(e) => setFbMessage(e.target.value)}
                            />
                            <button
                                className="modern-submit"
                                onClick={submitFeedback}
                                disabled={submitting}
                            >
                                {submitting ? "..." : <Send size={20} />}
                                <span>{submitting ? "Sending" : "Post Feedback"}</span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            <FloatingWhatsAppButton />
        </main>
    );
};

export default Testimonials;
