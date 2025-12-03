// Theme-aware color system
const getThemeColors = (theme = 'light') => {
  if (theme === 'dark') {
    return {
      primary: '#818cf8', // Lighter indigo for dark mode
      secondary: '#a78bfa', // Lighter purple
      accent: '#22d3ee', // Brighter cyan
      background: '#0f172a', // Dark slate
      surface: '#1e293b', // Slightly lighter dark
      textDark: '#f1f5f9', // Light text
      textMuted: '#cbd5e1', // Muted light text
      border: '#334155', // Dark border
      divider: '#1e293b', // Divider color
      gradient: {
        primary: 'linear-gradient(135deg, #818cf8 0%, #a78bfa 100%)',
        secondary: 'linear-gradient(135deg, #f472b6 0%, #fb7185 100%)',
        accent: 'linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%)',
        warm: 'linear-gradient(135deg, #fb7185 0%, #fbbf24 100%)',
        cool: 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)',
      },
    };
  }

  // Light theme (default)
  return {
    primary: '#6366f1', // Modern indigo
    secondary: '#8b5cf6', // Purple
    accent: '#06b6d4', // Cyan
    background: '#f8fafc', // Soft gray background
    surface: '#ffffff', // White surface
    textDark: '#1e293b', // Soft dark blue-gray
    textMuted: '#64748b', // Muted blue-gray
    border: '#e2e8f0', // Light border
    divider: '#e2e8f0', // Divider color
    gradient: {
      primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      accent: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      warm: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      cool: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    },
  };
};

// Export default for backward compatibility (will use light theme)
const colors = getThemeColors('light');

export default colors;
export { getThemeColors };
