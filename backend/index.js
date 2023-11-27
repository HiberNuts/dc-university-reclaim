const express = require("express");
const cors = require("cors");

const app = express();

// const allowedOrigins = [process.env.ORIGIN, "http://localhost:5173", "https://shardeum-academy.vercel.app"];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

var corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

// app.use(cors(corsOptions));

app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

require("./db");
// require('./middlewares')
// routes
require("./routes/authRoutes")(app);
require("./routes/userRoutes")(app);
require("./routes/courseRoutes")(app);
require("./routes/adminRoutes")(app);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to backend of shardeum academy" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
