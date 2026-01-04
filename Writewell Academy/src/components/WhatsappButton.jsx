/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { MessageCircleMore } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { getThemeColors } from "../theme/colors";
import { useEffect, useState } from "react";

const FloatingWhatsAppButton = ({
    phone = "919980799621",
    message = "Hello handwriting-champions Team, I would like to schedule a free consultation for your handwriting classes program.",
}) => {
    const { theme } = useTheme();
    const colors = getThemeColors(theme);

    const [bottomOffset, setBottomOffset] = useState(24);

    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
        message
    )}`;

    useEffect(() => {
        const footer = document.querySelector(".footer-component");
        if (!footer) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setBottomOffset(footer.offsetHeight + 24);
                } else {
                    setBottomOffset(24);
                }
            },
            { threshold: 0.01 }
        );

        observer.observe(footer);

        return () => observer.disconnect();
    }, []);

    return (
        <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            animate={{ bottom: bottomOffset }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{
                position: "fixed",
                right: "24px",
                zIndex: 9999,
                width: "58px",
                height: "58px",
                borderRadius: "50%",
                background: colors.whatsapp,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
                cursor: "pointer",
                textDecoration: "none",
            }}
            aria-label="Chat on WhatsApp"
        >
            <MessageCircleMore size={26} />
        </motion.a>
    );
};

export default FloatingWhatsAppButton;
