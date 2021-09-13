module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "wt-light": "var(--wt-light)",
        "wt-dark": "var(--wt-dark)",
        "wt-text": "var(--wt-text)",
        "wt-selected-light": "var(--wt-selected-light)",
        "wt-selected": "var(--wt-selected)",
        "wt-surface": "var(--wt-surface)",
        "wt-hover": "var(--wt-hover)",
        "wt-hover-light": "var(--wt-hover-light)",
        "wt-surface-dark": "var(--wt-surface-dark)",
        "wt-selected-dark": "var(--wt-selected-dark)",
        "wt-accent-light": "var(--wt-accent-light)",
        "wt-accent": "var(--wt-accent)",
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
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['disabled'],
      cursor: ['disabled']
    },
  },
  plugins: [],
};
