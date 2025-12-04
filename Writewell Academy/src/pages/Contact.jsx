/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Header from "../components/Header";
import ContactAnimation from "../components/ContactAnimation";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { getThemeColors } from "../theme/colors";
import "./contact.css";
import MapComponent from "../components/mapcomponent";
import api from "../api/axios";   // <<< using axios instance

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

  // ---------------------------------------------------
  // SEND MESSAGE (FINALLY CORRECT)
  // ---------------------------------------------------
  const sendMessage = async () => {
    setLoading(true);
    setStatus("");

    // Validate form before sending
    if (!form.name || !form.email || !form.phone || !form.message) {
      alert("❌ Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      console.log("📤 Sending inquiry:", form);
      console.log("API Base URL:", import.meta.env.VITE_API_URL);

      const res = await api.post("/api/inquiry", form, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log("✅ Response received:", res.data);

      if (res.data.ok) {
        alert("✔ Message sent successfully!");
        setForm({ name: "", email: "", phone: "", message: "" });
        setStatus("success");
      } else {
        alert("❌ " + (res.data.error || "Unknown error"));
        setStatus("error");
      }
    } catch (err) {
      console.error("❌ Inquiry error:", err);
      console.error("Error response:", err.response?.data);
      console.error("Error status:", err.response?.status);

      let errorMsg = "Server error. Try again later.";
      if (err.response?.data?.error) {
        errorMsg = err.response.data.error;
      } else if (err.message) {
        errorMsg = err.message;
      }

      alert("❌ " + errorMsg);
      setStatus("error");
    }

    setLoading(false);
  };

  return (
    <>
      <Header />

      <main className="contact-main" data-theme={theme}>
        {/* HERO */}
        <section className="contact-hero">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="contact-title" style={{ color: colors.textDark }}>
                Get in Touch
              </h1>
              <p className="contact-subtitle" style={{ color: colors.textMuted }}>
                Connect with us to begin your handwriting transformation journey
              </p>
            </motion.div>
          </div>
        </section>

        {/* FORM SECTION */}
        <section className="contact-form-section">
          <div className="container">
            <div className="contact-layout">

              {/* LEFT - Animation */}
              <motion.div
                className="contact-animation-wrapper"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <ContactAnimation width="100%" height="400px" />
              </motion.div>

              {/* RIGHT - Form */}
              <motion.div
                className="contact-form-wrapper"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="form-title" style={{ color: colors.textDark }}>
                  Send us a Message
                </h2>

                <div className="futuristic-form">

                  {/* Name */}
                  <div className="input-group-futuristic">
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="futuristic-input"
                      placeholder="Full Name"
                      required
                      style={{
                        background: theme === "dark" ? colors.surface + "60" : colors.background,
                        color: colors.textDark,
                      }}
                    />
                  </div>

                  {/* Phone */}
                  <div className="input-group-futuristic">
                    <input
                      type="text"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="futuristic-input"
                      placeholder="Phone Number"
                      required
                      style={{
                        background: theme === "dark" ? colors.surface + "60" : colors.background,
                        color: colors.textDark,
                      }}
                    />
                  </div>

                  {/* Email */}
                  <div className="input-group-futuristic">
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="futuristic-input"
                      placeholder="Email Address"
                      required
                      style={{
                        background: theme === "dark" ? colors.surface + "60" : colors.background,
                        color: colors.textDark,
                      }}
                    />
                  </div>

                  {/* Message */}
                  <div className="input-group-futuristic">
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      className="futuristic-input futuristic-textarea"
                      placeholder="Your Message"
                      rows="4"
                      required
                      style={{
                        background: theme === "dark" ? colors.surface + "60" : colors.background,
                        color: colors.textDark,
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    className="futuristic-submit-btn"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={sendMessage}
                    disabled={loading}
                    style={{
                      background: colors.gradient.primary,
                      color: "#fff",
                    }}
                  >
                    <Send size={20} />
                    <span>{loading ? "Transmitting..." : "Transmit Message"}</span>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CONTACT DETAILS */}
        <section className="contact-details-section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="contact-details"
            >
              <h2 className="details-title" style={{ color: colors.textDark }}>
                Contact Information
              </h2>

              <div className="details-grid">
                {/* Address */}
                <motion.div className="detail-item" whileHover={{ scale: 1.05, y: -5 }}>
                  <div className="detail-icon-wrapper" style={{ color: colors.primary }}>
                    <MapPin size={32} />
                  </div>
                  <div className="detail-content">
                    <h3 style={{ color: colors.textDark }}>Address</h3>
                    <p style={{ color: colors.textMuted }}>
                      Klassic Landmark Apartment,<br />
                      Junnasandara, Bangalore - 560035
                    </p>
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div className="detail-item" whileHover={{ scale: 1.05, y: -5 }}>
                  <div className="detail-icon-wrapper" style={{ color: colors.accent }}>
                    <Mail size={32} />
                  </div>
                  <div className="detail-content">
                    <h3 style={{ color: colors.textDark }}>Email</h3>
                    <p style={{ color: colors.textMuted }}>
                      <a href="mailto:academywritewell@gmail.com" style={{ color: colors.primary }}>
                        academywritewell@gmail.com
                      </a>
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="map-wrapper">
                <MapComponent />
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Contact;
