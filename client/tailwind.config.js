/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xxs: "400px",
      },
      colors: {
        "primary-color": "black",
        "secondary-color": "#353935",
        whitesmoke: {
          100: "#f8f9fa",
          200: "#f5f5f5",
          300: "#f4f4f4",
        },
        black: "#000",
        orange: "#f9a825",
        white: "#fff",
        shardeumBlue: "#3A4CFF",
        shardeumOrange: "#FF8743",
        shardeumPurple: "rgba(195, 200, 255, 1)",
        shardeumGreen: "rgba(164, 255, 0, 1)",
        shardeumWhite: "rgba(252, 250, 239, 1)",
        shardeumPink: "#FFDFCD",
        shardeumTeelGreen: "rgba(202, 255, 239, 1)",
        shardeumRed: "#FF4C0F",
        dimgray: "#666",
        gray: "#fafafa",
        aliceblue: "#eff2f7",
        darkslategray: {
          100: "#495057",
          200: "#333",
        },
        slategray: "#808191",
        skyblue: "#70c4cf",
        royalblue: "#3d5ee1",
        gainsboro: "#d9d9d9",
        deepskyblue: "#03a9f4",
      },
      fontFamily: {
        body: "'satoshi'",
        // heading: "helvetica",
        "futura-hv-bt": "'Futura Hv BT'",
        roboto: "Roboto",
        "font-awesome-5-free": "'Font Awesome 5 Free'",
        "source-sans-pro": "'Source Sans Pro'",
        // helvetica: "Helvetica",
        mdsans: "DM Sans",
        "helvetica-neue-bold": ["helvetica-neue-bold"],
        "helvetica-neue-md": ["helvetica-neue-md"],
        "helvetica-neue-roman": ["helvetica-neue-roman"],

      },
      borderRadius: {
        xl: "20px",
        mini: "15px",
        "smi-5": "12.5px",
        "31xl": "50px",
      },
    },
    fontSize: {
      xl: "20px",
      mini: "15px",
      sm: "14px",
      lg: "18px",
      "2xs": "11px",
      xs: "12px",
      "5xl": "24px",
    },
    animation: {
      run: "run 10s 0s linear infinite",
    },
    keyframes: {
      run: {
        from: {
          transform: "translateX(10%)",
        },
      },
    },
  },
};
