module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        "wt-light": "var(--wt-light)",
        "wt-dark": "var(--wt-dark)",
        "wt-text": "var(--wt-text)",
        "wt-selected": "var(--wt-selected)",
        "wt-disabled": "var(--wt-disabled)",
        "wt-surface": "var(--wt-surface)",
        "wt-hover": "var(--wt-hover)",
        "wt-surface-dark": "var(--wt-surface-dark)",
        "wt-accent-light": "var(--wt-accent-light)",
        "wt-accent": "var(--wt-accent)",
        "wt-verified": "var(--wt-verified)",
        "wt-info": "var(--wt-info)",
        "wt-info-dark": "var(--wt-info-dark)",
        "wt-info-light": "var(--wt-info-light)",
        "wt-success": "var(--wt-success)",
        "wt-success-dark": "var(--wt-success-dark)",
        "wt-success-light": "var(--wt-success-light)",
        "wt-warning": "var(--wt-warning)",
        "wt-warning-dark": "var(--wt-warning-dark)",
        "wt-warning-light": "var(--wt-warning-light)",
        "wt-error": "var(--wt-error)",
        "wt-error-dark": "var(--wt-error-dark)",
        "wt-error-light": "var(--wt-error-light)",
        "wt-chartbg": "var(--wt-chartbg)",
      },
      height: {
        "wideNewTrade": "500px",
        "smallNewTrade": "884px"
      }
    },
  },
  variants: {
    extend: {
      display: ['group-hover'],
      backgroundColor: ['disabled'],
      cursor: ['disabled']
    },
  },
  plugins: [],
};
