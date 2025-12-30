/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import Avatar from "../components/Avatar";
import { useTheme } from "../context/ThemeContext";
import { getThemeColors } from "../theme/colors";
import Confetti from "../utils/confetti";
import api from "../api/axios";
import FloatingWhatsAppButton from "../components/WhatsappButton";
import "./testimonials.css";
import "./insights.css";


const getUserReactions = () => {
    try {
        return JSON.parse(
            localStorage.getItem("testimonial-reactions") || "{}"
        );
    } catch {
        return {};
    }
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
                (res.data.feedback || []).sort(
                    (a, b) => (b.like || 0) - (a.like || 0)
                )
            );
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


    const submitFeedback = async () => {
        if (!fbName.trim() || !fbMessage.trim()) return;
        setSubmitting(true);

        try {
            await api.post("/api/feedback", {
                name: fbName,
                message: fbMessage,
            });

            setFbName("");
            setFbMessage("");
            loadFeedback();

            Confetti.emojiBurst({ emoji: "❤️", count: 10 });
        } finally {
            setSubmitting(false);
        }
    };


    const addReaction = async (id, type) => {
        const previous = getUserReaction(id);
        if (previous === type) return; // prevent multiple clicks

        // Optimistic UI update
        setFeedbackList((prev) =>
            prev.map((fb) => {
                if (fb._id !== id) return fb;
                const updated = { ...fb };
                if (previous) {
                    updated[previous] = Math.max(
                        (updated[previous] || 1) - 1,
                        0
                    );
                }
                updated[type] = (updated[type] || 0) + 1;
                return updated;
            })
        );

        setUserReaction(id, type);

        if (type === "like") Confetti.emojiBurst({ emoji: "👍", count: 8 });
        if (type === "love") Confetti.emojiBurst({ emoji: "❤️", count: 10 });
        if (type === "wow") Confetti.emojiBurst({ emoji: "😮", count: 8 });

        try {
            await api.post(`/api/feedback/react/${id}`, { type, previous });
        } catch {
            // rollback
            setFeedbackList((prev) =>
                prev.map((fb) => {
                    if (fb._id !== id) return fb;
                    const updated = { ...fb };
                    updated[type] = Math.max(
                        (updated[type] || 1) - 1,
                        0
                    );
                    if (previous)
                        updated[previous] = (updated[previous] || 0) + 1;
                    return updated;
                })
            );
            if (previous) setUserReaction(id, previous);
            else removeUserReaction(id);
        }
    };

    return (
        <main className="insights-main" data-theme={theme}>
            <section className="feedback-section">
                <div className="container">
                    <h1
                        className="insights-title"
                        style={{ color: colors.textDark }}
                    >
                        Testimonials
                    </h1>

                    <div className="feedback-list">
                        {feedbackList.map((fb) => {
                            const current = getUserReaction(fb._id);
                            const date = fb.createdAt
                                ? new Date(fb.createdAt).toLocaleDateString("en-GB")
                                : "";

                            return (
                                <motion.div
                                    key={fb._id}
                                    className="testimonial-card"
                                    initial={{ opacity: 0, y: 18 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4 }}
                                >
                                    {/* LEFT */}
                                    <div className="testimonial-left">
                                        <div className="avatar-wrap">
                                            <Avatar name={fb.name} size={56} />
                                            <span className="avatar-badge">
                                                {fb.name?.slice(0, 2).toUpperCase()}
                                            </span>
                                        </div>

                                        <div className="testimonial-content">
                                            <h4 className="testimonial-name">{fb.name}</h4>
                                            <p className="testimonial-text">
                                                “{fb.message}”
                                            </p>
                                        </div>
                                    </div>

                                    {/* RIGHT */}
                                    <div className="testimonial-right">
                                        <span className="testimonial-date">{date}</span>

                                        <div className="testimonial-reactions">
                                            <button
                                                className={`reaction-btn ${current === "like" ? "active" : ""
                                                    }`}
                                                onClick={() => addReaction(fb._id, "like")}
                                            >
                                                👍 {fb.like || 0}
                                            </button>

                                            <button
                                                className={`reaction-btn ${current === "love" ? "active" : ""
                                                    }`}
                                                onClick={() => addReaction(fb._id, "love")}
                                            >
                                                ❤️ {fb.love || 0}
                                            </button>

                                            <button
                                                className={`reaction-btn ${current === "wow" ? "active" : ""
                                                    }`}
                                                onClick={() => addReaction(fb._id, "wow")}
                                            >
                                                😮 {fb.wow || 0}
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>


                    <div className="feedback-form">
                        <h3 className="section-heading">Write Your Feedback</h3>

                        <div className="form-row">
                            <input
                                className="form-input"
                                placeholder="Your Name"
                                value={fbName}
                                onChange={(e) => setFbName(e.target.value)}
                            />
                        </div>

                        <div className="form-row">
                            <textarea
                                className="form-textarea"
                                placeholder="Your Message"
                                value={fbMessage}
                                onChange={(e) => setFbMessage(e.target.value)}
                            />
                        </div>

                        <button
                            className="submit-btn"
                            onClick={submitFeedback}
                            disabled={submitting}
                        >
                            <Send size={18} />
                            {submitting ? "Submitting..." : "Submit Feedback"}
                        </button>
                    </div>
                </div>
            </section>

            <FloatingWhatsAppButton />
        </main>
    );
};

export default Testimonials;
