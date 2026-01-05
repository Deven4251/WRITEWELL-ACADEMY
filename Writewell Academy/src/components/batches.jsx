/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Calendar, Clock, Monitor, User } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { getThemeColors } from "../theme/colors";

const Batches = () => {
    const { theme } = useTheme();
    const colors = getThemeColors(theme);

    const batches = [
        {
            id: "offline",
            title: "Offline Enrollment",
            subtitle: "Available Classroom Batches • HINDI & ENGLISH",
            icon: <Calendar size={24} />,
            gradient: colors.gradient.primary,
            rows: [
                {
                    days: "Mon - Thu",
                    time: "4:30 PM - 5:15 PM",
                    status: "Enrolling",
                },
                {
                    days: "Wed - Fri",
                    time: "5:00 PM - 5:45 PM",
                    status: "Enrolling",
                },
            ],
        },
        {
            id: "online",
            title: "Online Enrollment",
            subtitle: "Live Interactive Classes • HINDI & ENGLISH",
            icon: <Monitor size={24} />,
            gradient: colors.gradient.secondary,
            rows: [
                {
                    days: "Mon - Wed - Fri",
                    time: "7:00 PM - 7:45 PM",
                    status: "Enrolling",
                },
                {
                    days: "Sat - Sun",
                    time: "10:00 AM - 10:45 AM",
                    status: "Limited Seats",
                },
            ],
        },
    ];

    return (
        <div className="row g-2 align-items-stretch">
            {/* Teacher Card */}
            <div className="col-12 col-md-6 col-lg-4">
                <motion.div
                    className="teacher-glass-card p-4 rounded-4 shadow-sm h-100 d-flex flex-column"
                    style={{ border: `1px solid ${colors.border}` }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0 }}
                >
                    <div className="d-flex align-items-center gap-3 mb-2">
                        <motion.div
                            className="avatar-circle d-flex align-items-center justify-content-center"
                            style={{ background: colors.gradient.primary }}
                            animate={{
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "loop",
                                ease: "easeInOut",
                            }}
                        >
                            <motion.div
                                animate={{
                                    y: [0, -5, 0],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    ease: "easeInOut",
                                }}
                            >
                                <User size={28} color="#fff" strokeWidth={2.5} />
                            </motion.div>
                        </motion.div>
                        <div>
                            <h4 className="mb-0 fw-bold" style={{ color: colors.textDark }}>
                                Jyoti Tiwari
                            </h4>
                            <p
                                className="small mb-0 text-uppercase tracking-wider"
                                style={{ color: colors.primary }}
                            >
                                Lead Instructor
                            </p>
                        </div>
                    </div>

                    <div className="teacher-quote flex-grow-1 mb-0 d-flex flex-column gap-2">
                        <div className="d-flex align-items-start gap-4" style={{ color: colors.textMuted }}>
                            <span style={{ color: colors.primary, fontSize: "1.2rem", lineHeight: "1.2" }}>O</span>
                            <span>Handwriting is the mirror of the mind</span>
                        </div>
                        <div className="d-flex align-items-start gap-4" style={{ color: colors.textMuted }}>
                            <span style={{ color: colors.primary, fontSize: "1.2rem", lineHeight: "1.2" }}>O</span>
                            <span>15+ years of dedicated experience</span>
                        </div>
                        <div className="d-flex align-items-start gap-4" style={{ color: colors.textMuted }}>
                            <span style={{ color: colors.primary, fontSize: "1.2rem", lineHeight: "1.2" }}>O</span>
                            <span>Making that mirror clear and beautiful</span>
                        </div>
                        <div className="d-flex align-items-start gap-4" style={{ color: colors.textMuted }}>
                            <span style={{ color: colors.primary, fontSize: "1.2rem", lineHeight: "1.2" }}>O</span>
                            <span>Expert in all age groups</span>
                        </div>
                        <div className="d-flex align-items-start gap-4" style={{ color: colors.textMuted }}>
                            <span style={{ color: colors.primary, fontSize: "1.2rem", lineHeight: "1.2" }}>O</span>
                            <span>Personalized teaching approach</span>
                        </div>
                        <div className="d-flex align-items-start gap-4" style={{ color: colors.textMuted }}>
                            <span style={{ color: colors.primary, fontSize: "1.2rem", lineHeight: "1.2" }}>O</span>
                            <span>Proven track record of success</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Enrollment Cards */}
            {batches.map((batch, index) => (
                <div key={batch.id} className="col-12 col-md-6 col-lg-4">
                    <motion.div
                        className="schedule-info-card p-4 rounded-4 overflow-hidden position-relative h-100 d-flex flex-column"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (index + 1) * 0.15 }}
                        style={{
                            background: batch.gradient,
                            color: "#fff",
                            border: "none",
                        }}
                    >
                        {/* Decorative Icon */}
                        <div
                            className="card-decoration"
                            style={{
                                opacity: 0.1,
                                position: "absolute",
                                right: "-20px",
                                top: "-20px",
                            }}
                        >
                            <Clock size={120} />
                        </div>

                        <div className="position-relative d-flex flex-column flex-grow-1">
                            {/* Header */}
                            <div className="d-flex align-items-center gap-3 mb-4">
                                <div
                                    className="icon-circle d-flex align-items-center justify-content-center rounded-circle"
                                    style={{
                                        background: "rgba(255,255,255,0.2)",
                                        width: 50,
                                        height: 50,
                                    }}
                                >
                                    {batch.icon}
                                </div>

                                <div className="flex-grow-1">
                                    <h4 className="mb-0 fw-bold d-flex">
                                        {batch.title.split("").map((char, charIndex) => (
                                            <motion.span
                                                key={charIndex}
                                                animate={{
                                                    color: ["#fff", "#000", "#fff"]
                                                }}
                                                transition={{
                                                    delay: charIndex * 0.1,
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    repeatType: "loop",
                                                    ease: "easeInOut",
                                                }}
                                                style={{ display: "inline-block" }}
                                            >
                                                {char === " " ? "\u00A0" : char}
                                            </motion.span>
                                        ))}
                                    </h4>
                                    <div className="small mb-0 opacity-75 text-uppercase fw-bold d-flex flex-column" style={{ lineHeight: "1.4" }}>
                                        {batch.subtitle.split(" • ").map((part, index) => (
                                            <span key={index}>{part}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Table */}
                            <div className="table-responsive flex-grow-1 d-flex flex-column">
                                <table className="table table-borderless mb-0 text-white">
                                    <thead>
                                        <tr className="border-bottom border-white border-opacity-25">
                                            <th className="ps-0 py-2 opacity-75 fw-medium">Days</th>
                                            <th className="py-2 opacity-75 fw-medium">Time Slot</th>
                                            <th className="pe-0 py-2 text-end opacity-75 fw-medium">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {batch.rows.map((row, i) => (
                                            <tr key={i} className="align-middle">
                                                <td className="ps-0 py-3 fw-semibold">{row.days}</td>
                                                <td className="py-3">{row.time}</td>
                                                <td className="pe-0 py-3 text-end">
                                                    <div className="d-inline-flex align-items-center gap-2">
                                                        <span
                                                            className="pulse-dot"
                                                            style={{
                                                                width: 8,
                                                                height: 8,
                                                                background:
                                                                    row.status === "Limited Seats"
                                                                        ? "#facc15"
                                                                        : "#4ade80",
                                                                borderRadius: "50%",
                                                            }}
                                                        />
                                                        <span className="badge rounded-pill bg-white text-primary px-3">
                                                            {row.status}
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                </div>
            ))}
        </div>
    );
};

export default Batches;
