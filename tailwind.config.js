module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Montserrat: "'Montserrat', sans-serif",
        LeagueGothis: "'League Gothic', sans-serif",
      },
    },
    backgroundImage: {
      "avrt-image": "url('/public/images/avrt-image.png')",
    },
  },
  plugins: [],
};
