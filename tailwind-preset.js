/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-primary)", "system-ui", "sans-serif"],
        sans: ["var(--font-secondary)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      fontSize: {
        display: ["var(--text-display)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        title: ["var(--text-title)", { lineHeight: "1.25" }],
        heading: ["var(--text-heading)", { lineHeight: "1.375" }],
        body: ["var(--text-body)", { lineHeight: "1.375" }],
        "body-sm": ["var(--text-body-sm)", { lineHeight: "1.5" }],
        ui: ["var(--text-ui)", { lineHeight: "1.43" }],
        caption: ["var(--text-caption)", { lineHeight: "1.33" }],
        "mono-sm": ["var(--text-mono-sm)", { lineHeight: "1.4" }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "var(--radius-card)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        solid: "var(--shadow-solid)",
        "solid-hover": "var(--shadow-solid-hover)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--color-primary-hover))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        brand: {
          DEFAULT: "hsl(var(--color-primary))",
          hover: "hsl(var(--color-primary-hover))",
        },
        "secondary-blue": {
          DEFAULT: "hsl(var(--color-secondary-blue))",
          hover: "hsl(var(--color-secondary-blue-hover))",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95) translateY(40px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        "fade-scale-out": {
          "0%": { opacity: "1", transform: "scale(1) translateY(0)" },
          "100%": { opacity: "0", transform: "scale(0.95) translateY(40px)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-scale-in": "fade-scale-in 0.3s cubic-bezier(0.16,1,0.3,1) both",
        "fade-scale-out": "fade-scale-out 0.2s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in": "fade-in 0.2s ease-out both",
        "fade-out": "fade-out 0.2s ease-in both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
