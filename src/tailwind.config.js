import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      // สีแบรนด์: ใช้ผ่านคลาส bg-*, text-*, border-*
      colors: {
        'lightCream': "#FFFBF7",
        'cream': "#F3ECE3",
        'matcha': "#9E9957",
        'brown': "#411D03",
      },
      // ฟอนต์: ใช้ font-display สำหรับหัวเรื่อง, font-body/font-sans สำหรับเนื้อความ
      fontFamily: {
        display: ["Playfair Display", "serif"],
        body: ["Montserrat", ...defaultTheme.fontFamily.sans],
        sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
