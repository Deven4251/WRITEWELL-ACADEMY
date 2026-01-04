/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Send, MapPin } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { getThemeColors } from "../theme/colors";
import api from "../api/axios";
import "./contact.css";
import Footer from "../components/Footer";

const Contact = () => {
    const { theme } = useTheme();
    const colors = getThemeColors(theme);
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });


    const sendMessage = async () => {
        if (!form.name || !form.email || !form.phone || !form.message) {
            alert("❌ Please fill in all fields.");
            return;
        }
        setLoading(true);
        try {
            const res = await api.post("/api/inquiry", form);
            if (res.data.ok) {
                setStatus("success");
                setForm({ name: "", email: "", phone: "", message: "" });
            }
        } catch (err) {
            setStatus("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <section
            id="contact"
            className="contact-pro-section py-5 position-relative overflow-hidden"
            data-theme={theme}
        >
            <div
                className="contact-bg-blob"
                style={{ background: colors.gradient.primary }}
            ></div>
            <div className="container position-relative">
                <div className="row g-5">
                    {/* LEFT: INFO CARD */}
                    <motion.div
                        className="col-lg-5"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2
                            className="display-6 fw-bold mb-4"
                            style={{ color: colors.textDark }}
                        >
                            Get in <span style={{ color: colors.primary }}>Touch</span>
                        </h2>
                        <p className="mb-5" style={{ color: colors.textMuted }}>
                            Schedule a free consultation or learn more about our handwriting
                            classes.
                        </p>

                        <div className="contact-info-stack">
                            {[
                                {
                                    icon: <Mail size={24} />,
                                    label: "Email",
                                    val: "contact@handwritingchampions.in",
                                    link: "mailto:contact@handwritingchampions.in",
                                },
                                {
                                    icon: <Phone size={24} />,
                                    label: "Phone",
                                    val: "+91 9980799621",
                                    link: "tel:+919980799621",
                                },
                            ].map((item, idx) => (
                                <motion.a
                                    key={idx}
                                    href={item.link}
                                    className="contact-info-card p-3 mb-3 d-flex align-items-center gap-3 text-decoration-none rounded-4 border"
                                    whileHover={{ x: 10 }}
                                    style={{
                                        background: theme === "dark" ? "#ffffff05" : "#fff",
                                        color: "inherit",
                                    }}
                                >
                                    <div className="info-icon" style={{ color: colors.primary }}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <span className="small opacity-75 d-block">
                                            {item.label}
                                        </span>
                                        <span
                                            className="fw-bold"
                                            style={{ color: colors.textDark }}
                                        >
                                            {item.val}
                                        </span>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* RIGHT: FUTURISTIC FORM */}
                    <motion.div
                        className="col-lg-7"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div
                            className="form-glass-container p-4 p-md-5 rounded-4 border shadow-lg"
                            style={{
                                background: theme === "dark" ? "rgba(30, 41, 59, 0.7)" : "rgba(255, 255, 255, 0.8)",
                                backdropFilter: "blur(10px)",
                            }}
                        >
                            <h3 className="text-center pb-4" >
                                Please Fill The Form
                            </h3>
                            <div className="row g-4">
                                <div className="col-md-6 form-floating-group">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder=" "
                                        className="pro-input"
                                        style={{ background: colors.background, color: colors.textDark }}
                                    />
                                    <label htmlFor="name" style={{ color: colors.textMuted }}>Full Name</label>
                                </div>


                                <div className="col-md-6 form-floating-group">
                                    <input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        placeholder=" "
                                        className="pro-input"
                                        style={{ background: colors.background, color: colors.textDark }}
                                    />
                                    <label htmlFor="phone" style={{ color: colors.textMuted }}>Phone Number</label>
                                </div>


                                <div className="col-12 form-floating-group">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder=" "
                                        className="pro-input"
                                        style={{ background: colors.background, color: colors.textDark }}
                                    />
                                    <label htmlFor="email" style={{ color: colors.textMuted }}>Email Address</label>
                                </div>


                                <div className="col-12 form-floating-group">
                                    <textarea
                                        name="message"
                                        id="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder=" "
                                        rows="4"
                                        className="pro-input"
                                        style={{ background: colors.background, color: colors.textDark, height: 'auto' }}
                                    />
                                    <label htmlFor="message" style={{ color: colors.textMuted }}>Your Message</label>
                                </div>


                                <div className="col-12">
                                    <motion.button
                                        className="btn w-100 pro-submit-btn py-3 fw-bold"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={sendMessage}
                                        disabled={loading}
                                        style={{
                                            background: colors.gradient.primary,
                                            color: "#fff",
                                            border: 'none'
                                        }}
                                    >
                                        {loading ? "Sending..." : "Send Message"}
                                        <Send size={18} className="ms-2" />
                                    </motion.button>
                                    {status === "success" && (
                                        <p className="mt-3 text-success small text-center fw-bold">
                                            ✔ Message sent successfully !!!!!
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
        <Footer />
    </>
    );
};

export default Contact;
