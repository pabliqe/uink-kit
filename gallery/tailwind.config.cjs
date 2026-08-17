const path = require("node:path");
const uinkPreset = require("../tailwind-preset.js");

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [uinkPreset],
  content: [
    path.join(__dirname, "index.html"),
    path.join(__dirname, "src/**/*.{js,ts,tsx}"),
    path.join(__dirname, "../src/**/*.{js,ts,tsx}"),
  ],
};
