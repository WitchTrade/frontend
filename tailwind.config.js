module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      textColor: {
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
        "wt-accent": "var(--wt-accent)"
      },
      backgroundColor: {
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
        "wt-accent": "var(--wt-accent)"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
