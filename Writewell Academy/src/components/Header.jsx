import './common.css'
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { getThemeColors } from "../theme/colors";

const Header = () => {
    const { theme, toggleTheme } = useTheme();
    const colors = getThemeColors(theme);

    return (
        <>
            <nav className="navbar navbar-expand-sm header-nav sticky-top" data-theme={theme}>
                <div className="container-fluid">
                    <Link to={"/"} className="navbar-brand d-flex align-items-center gap-3">
                        <img
                            className="img-fluid logo"
                            src="LOGO.jpg"
                            alt="logo"
                        />
                        <h4
                            className="mb-0 header-title"
                            style={{
                                background: colors.gradient.primary,
                                fontWeight: 700,
                                fontSize: "1.5rem"
                            }}
                        >
                            Writewell Academy
                        </h4>
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav" style={{ border: 'none' }}>
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-end" id="nav">
                        <ul className="navbar-nav ul d-flex align-items-center">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Classes" className="nav-link">Classes</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Insights" className="nav-link">Insights</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Contact" className="nav-link">Contact</Link>
                            </li>
                            <li className="nav-item">
                                <button
                                    className="theme-toggle"
                                    onClick={toggleTheme}
                                    aria-label="Toggle theme"
                                    style={{
                                        background: 'transparent',
                                        border: `1px solid ${colors.border}`,
                                        borderRadius: '8px',
                                        padding: '8px 12px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: colors.textDark,
                                        transition: 'all 0.3s ease',
                                        marginLeft: '16px'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.background = colors.primary + '20';
                                        e.target.style.borderColor = colors.primary;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.background = 'transparent';
                                        e.target.style.borderColor = colors.border;
                                    }}
                                >
                                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};


export default Header;
