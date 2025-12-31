import "./common.css";
import { Link } from "react-scroll";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { getThemeColors } from "../theme/colors";

const Header = () => {
    const { theme, toggleTheme } = useTheme();
    const colors = getThemeColors(theme);

    return (
        <nav
            className="navbar navbar-expand-sm header-nav "
            data-theme={theme}
            style={{
                backgroundColor: colors.background,
                borderBottom: `1px solid ${colors.border}`,
            }}
        >
            <div className="container-fluid">
                
                <Link
                    to="home"
                    smooth
                    duration={500}
                    className="navbar-brand d-flex align-items-center gap-3"
                    style={{ cursor: "pointer" }}
                >
                    <img className="img-fluid logo" src="LOGO.jpeg" alt="logo" />

                    <h4
                        className="mb-0 header-title"
                        style={{
                            background: colors.gradient.primary,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            fontWeight: 700,
                            fontSize: "1.5rem",
                        }}
                    >
                        Handwriting Champions
                    </h4>
                </Link>

                {/* Mobile Toggle */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#nav"
                    aria-controls="nav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    style={{
                        border: `1px solid ${colors.border}`,
                    }}
                >
                    <span
                        className="navbar-toggler-icon"
                        style={{
                            filter: theme === "dark" ? "invert(1)" : "none",
                        }}
                    />
                </button>

                {/* Nav Links */}
                <div className="collapse navbar-collapse justify-content-end" id="nav">
                    <ul className="navbar-nav d-flex align-items-center">
                        {[
                            { to: "home", label: "Home" },
                            { to: "classes", label: "Classes" },
                            { to: "insights", label: "Insights" },
                            { to: "testimonials", label: "Testimonials" },
                            { to: "contact", label: "Contact" },
                        ].map((item) => (
                            <li className="nav-item" key={item.to}>
                                <Link
                                    to={item.to}
                                    spy
                                    smooth
                                    offset={-70}
                                    duration={500}
                                    className="nav-link"
                                    style={{
                                        cursor: "pointer",
                                        color: colors.textDark,
                                    }}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}

                        {/* Theme Toggle */}
                        <li className="nav-item ms-3">
                            <button
                                className="theme-toggle"
                                onClick={toggleTheme}
                                aria-label="Toggle theme"
                                style={{
                                    background: "transparent",
                                    border: `1px solid ${colors.border}`,
                                    borderRadius: "8px",
                                    padding: "8px 12px",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: colors.textDark,
                                    transition: "all 0.3s ease",
                                }}
                            >
                                {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
