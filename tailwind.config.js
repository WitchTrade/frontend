module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      textColor: {
        "wt-5": "var(--text-wt-5)"
      },
      backgroundColor: {
        "wt-4": "var(--bg-wt-4)",
        "wt-5": "var(--bg-wt-5)",
        "wt-6": "var(--bg-wt-6)",
        "wt-accent-4": "var(--bg-wt-accent-4)"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
