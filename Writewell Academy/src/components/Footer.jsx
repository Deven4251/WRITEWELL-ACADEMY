import "./common.css"
import { useTheme } from "../context/ThemeContext";
import { getThemeColors } from "../theme/colors";

const Footer = () => {
    const { theme } = useTheme();
    const colors = getThemeColors(theme);

    return (
        <div
            className="footer-component py-4"
            data-theme={theme}
            style={{
                borderTop: `1px solid ${colors.border}`,
                background: theme === 'dark'
                    ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)'
                    : 'linear-gradient(135deg, rgba(248, 250, 252, 0.95) 0%, rgba(241, 245, 249, 0.95) 100%)',
                transition: 'all 0.3s ease'
            }}
        >
            <div className="container text-center">
                <p className="mb-2" style={{
                    fontWeight: 600,
                    color: colors.textDark,
                    fontSize: '1.1rem'
                }}>
                    © {new Date().getFullYear()} Handwriting Champions
                </p>

                <ul className="list-inline mb-0">
                    <li className="list-inline-item">
                        <a className="text-decoration-none footer-link" href="#" style={{ color: colors.textMuted }}>Home</a>
                    </li>
                    <li className="list-inline-item mx-2" style={{ color: colors.textMuted }}>•</li>
                    <li className="list-inline-item">
                        <a className="text-decoration-none footer-link" href="#" style={{ color: colors.textMuted }}>Classes</a>
                    </li>
                    <li className="list-inline-item mx-2" style={{ color: colors.textMuted }}>•</li>
                    <li className="list-inline-item">
                        <a className="text-decoration-none footer-link" href="#" style={{ color: colors.textMuted }}>Feedbacks</a>
                    </li>
                    <li className="list-inline-item mx-2" style={{ color: colors.textMuted }}>•</li>
                    <li className="list-inline-item">
                        <a className="text-decoration-none footer-link" href="#" style={{ color: colors.textMuted }}>Contact</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Footer;
