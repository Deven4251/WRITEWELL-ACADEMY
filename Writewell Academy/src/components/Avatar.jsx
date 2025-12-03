/* eslint-disable no-unused-vars */
/* src/components/Avatar.jsx */
import React from "react";
import { motion } from "framer-motion";
import colors from "../theme/colors";

const Avatar = ({ name = "User", size = 64 }) => {
  const initials = (() => {
    const parts = name.trim().split(" ").filter(Boolean);
    if (parts.length === 0) return "U";
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  })();

  return (
    <motion.div
      whileHover={{ rotate: 4, scale: 1.03 }}
      style={{ display: "flex", alignItems: "center", gap: 12 }}
    >
      {/* cartoon SVG contained inside a circle */}
      <div style={{ width: size, height: size, position: "relative", flex: "0 0 auto" }}>
        <svg viewBox="0 0 1024 1024" width={size} height={size} style={{ borderRadius: "50%", background: `${colors.primary}22`, padding: 6 }}>
          {/* Simplified friendly cartoon head (based on your earlier svg) */}
          <path fill="#FFCE8B" d="M1021 511A511 511 0 1 1 511 0 511 511 0 0 1 1021 511z" />
          <path fill="#644646" d="M810 493v315H495a317 317 0 0 1-67-7V493z" />
          <path fill="#C7F4F1" d="M759 960a511 511 0 0 1-512-9 269 269 0 0 1 512 9z" />
          <circle cx="370" cy="552" r="43" fill="#FBD1BB" />
          <circle cx="605" cy="551" r="70" fill="#F49F83" />
          <circle cx="499" cy="518" r="19" fill="#030303" />
          <circle cx="619" cy="518" r="19" fill="#030303" />
        </svg>

        {/* initials overlay small circle bottom-right */}
        <div style={{ position: "absolute", right: -6, bottom: -6, background: colors.primary, color: "#fff", width: size * 0.35, height: size * 0.35, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: size * 0.22 }}>
          {initials}
        </div>
      </div>

      {/* Full name */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ fontWeight: 700, color: colors.textDark, fontSize: "0.98rem" }}>{name}</div>
        <div style={{ fontSize: "0.78rem", color: colors.textMuted, marginTop: 2 }}>{/* optional subtitle (empty) */}</div>
      </div>
    </motion.div>
  );
};

export default Avatar;
