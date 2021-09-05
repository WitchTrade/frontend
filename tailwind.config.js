module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      textColor: {
        "wt-default": "var(--wt-text)",
        "wt-opposite": "var(--wt-opposite)",
        "wt-accent-400": "var(--wt-accent-400)",
        "wt-accent-500": "var(--wt-accent-500)",
        "wt-200-o": "var(--wt-200-o)",
        "wt-300-o": "var(--wt-300-o)",
        "wt-400-o": "var(--wt-400-o)",
        "wt-500-o": "var(--wt-500-o)",
        "wt-600-o": "var(--wt-600-o)",
        "wt-700-o": "var(--wt-700-o)",
        "wt-800-o": "var(--wt-800-o)",
      },
      backgroundColor: {
        "wt-200": "var(--wt-200)",
        "wt-300": "var(--wt-300)",
        "wt-400": "var(--wt-400)",
        "wt-500": "var(--wt-500)",
        "wt-600": "var(--wt-600)",
        "wt-700": "var(--wt-700)",
        "wt-800": "var(--wt-800)",
        "wt-accent-400": "var(--wt-accent-400)",
        "wt-accent-500": "var(--wt-accent-500)"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
