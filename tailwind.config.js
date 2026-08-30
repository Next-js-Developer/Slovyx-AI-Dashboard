/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F5F6FA",
        ink: "#10131F",
        indigo: {
          DEFAULT: "#3654FF",
          dim: "#EBEEFF",
        },
        teal: {
          DEFAULT: "#12B886",
          dim: "#E4F9F1",
        },
        amber: {
          DEFAULT: "#F5A623",
          dim: "#FDF1DD",
        },
        coral: {
          DEFAULT: "#E5484D",
          dim: "#FCE8E9",
        },
        line: "#E3E5EE",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
    },
  },
  plugins: [],
};
