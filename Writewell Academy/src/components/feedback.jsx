/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import colors from "../theme/colors";
import { MessageSquare } from "lucide-react";
import Confetti from "../utils/confetti";

const PAGE_SIZE = 6;
const API_BASE_URL = import.meta.env.VITE_API_URL;

const FeedbackList = () => {
    const [list, setList] = useState([]);
    const [visible, setVisible] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    /* --------------------------
       Local Storage Reactions
    --------------------------- */
    const getUserReaction = (id) => {
        const saved = JSON.parse(localStorage.getItem("reactions") || "{}");
        return saved[id] || null;
    };

    const setUserReaction = (id, type) => {
        const saved = JSON.parse(localStorage.getItem("reactions") || "{}");
        saved[id] = type;
        localStorage.setItem("reactions", JSON.stringify(saved));
    };

    /* --------------------------
       Initials Function
    --------------------------- */
    const getInitials = (name) => {
        if (!name) return "??";
        const parts = name.trim().split(" ");
        return parts.length === 1
            ? parts[0][0].toUpperCase()
            : (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    };

    /* --------------------------
       Confetti Effect
    --------------------------- */
    const blast = () => {
        Confetti({
            particleCount: 60,
            spread: 70,
            origin: { x: 0.7 },
        });
    };

    /* --------------------------
       Fetch Feedback
    --------------------------- */
    const fetchFeedback = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/api/feedback`);
            let data = res.data.feedback || [];

            data = data.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );

            setList(data);
            setVisible(data.slice(0, PAGE_SIZE * page));
            setLoading(false);
        } catch (err) {
            console.error("Feedback load error:", err);
        }
    };

    useEffect(() => {
        fetchFeedback();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    /* --------------------------
       Load More Pagination
    --------------------------- */
    const loadMore = () => {
        const next = page + 1;
        setPage(next);
        setVisible(list.slice(0, PAGE_SIZE * next));
    };

    /* --------------------------
       Handle Reaction (No Flicker)
    --------------------------- */
    const addReaction = async (id, type) => {
        const previous = getUserReaction(id);
        if (previous === type) return;

        // optimistic update - list
        setList((prev) =>
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

        // optimistic update - visible
        setVisible((prev) =>
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

        if (type === "love") blast();

        try {
            await axios.post(`${API_BASE_URL}/api/feedback/react/${id}`, {
                type,
                previous,
            });
        } catch (err) {
            console.error("Reaction error:", err);
        }
    };

    /* --------------------------
       Loader UI
    --------------------------- */
    if (loading) {
        return (
            <div className="text-center my-4">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    style={{
                        width: 35,
                        height: 35,
                        borderRadius: "50%",
                        border: `3px solid ${colors.border}`,
                        borderTopColor: colors.primary,
                        margin: "auto",
                    }}
                />
                <div style={{ color: colors.textMuted, marginTop: 10 }}>
                    Loading feedback…
                </div>
            </div>
        );
    }

    /* --------------------------
       MAIN RENDER
    --------------------------- */
    return (
        <div className="mt-4">
            <h3
                className="mb-3"
                style={{
                    color: colors.textDark,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                }}
            >
                <MessageSquare size={22} color={colors.primary} />
                Recent Feedback
            </h3>

            {/* FEEDBACK CARDS */}
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                {visible.map((fb) => {
                    const current = getUserReaction(fb._id);

                    return (
                        <motion.div
                            key={fb._id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35 }}
                            style={{
                                backgroundColor: colors.card,
                                border: `1px solid ${colors.border}`,
                                padding: "18px",
                                borderRadius: "14px",
                                boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                                display: "flex",
                                gap: "18px",
                            }}
                        >
                            {/* Avatar */}
                            <motion.div
                                whileHover={{ rotate: 4, scale: 1.1 }}
                                style={{
                                    width: 55,
                                    height: 55,
                                    borderRadius: "50%",
                                    backgroundColor: colors.primary,
                                    color: "white",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: 700,
                                    fontSize: "1.2rem",
                                }}
                            >
                                {getInitials(fb.name)}
                            </motion.div>

                            {/* Content */}
                            <div style={{ flex: 1 }}>
                                <strong
                                    style={{ fontSize: "1.05rem", color: colors.textDark }}
                                >
                                    {fb.name}
                                </strong>

                                <p style={{ color: colors.textMuted, marginTop: 4 }}>
                                    “{fb.message}”
                                </p>

                                <div
                                    className="small"
                                    style={{ color: colors.textMuted, marginBottom: 8 }}
                                >
                                    {new Date(fb.createdAt).toLocaleDateString()}
                                </div>

                                {/* Reactions */}
                                <div
                                    style={{
                                        display: "flex",
                                        gap: 20,
                                        fontSize: "1.45rem",
                                        cursor: "pointer",
                                        marginTop: 6,
                                    }}
                                >
                                    <motion.span
                                        whileTap={{ scale: 1.4 }}
                                        whileHover={{ scale: 1.25 }}
                                        style={{ opacity: current === "like" ? 1 : 0.4 }}
                                        onClick={() => addReaction(fb._id, "like")}
                                    >
                                        👍 {fb.like || 0}
                                    </motion.span>

                                    <motion.span
                                        whileTap={{ scale: 1.4 }}
                                        whileHover={{ scale: 1.25 }}
                                        style={{ opacity: current === "love" ? 1 : 0.4 }}
                                        onClick={() => addReaction(fb._id, "love")}
                                    >
                                        ❤️ {fb.love || 0}
                                    </motion.span>

                                    <motion.span
                                        whileTap={{ scale: 1.4 }}
                                        whileHover={{ scale: 1.25 }}
                                        style={{ opacity: current === "wow" ? 1 : 0.4 }}
                                        onClick={() => addReaction(fb._id, "wow")}
                                    >
                                        😮 {fb.wow || 0}
                                    </motion.span>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {visible.length < list.length && (
                <div className="text-center mt-3">
                    <button
                        onClick={loadMore}
                        style={{
                            padding: "8px 16px",
                            backgroundColor: colors.primary,
                            color: "white",
                            borderRadius: 8,
                            border: "none",
                        }}
                    >
                        Load more
                    </button>
                </div>
            )}
        </div>
    );
};

export default FeedbackList;
