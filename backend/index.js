const express = require("express");
const cors = require("cors");
const compression = require("compression");
const cc = require("node-console-colors");

//EXCEPTION HANDLING MIDDLEWARES
process.on('uncaughtException', function (error) {
  console.log(cc.set("fg_yellow", "Crashable UnHandled Exception", error.stack));
});
process.on('unhandledRejection', (reason, promise) => {
  console.log(cc.set("fg_yellow", 'Crashable UnHandled Rejection', reason.stack || reason));
  // Recommended: send the information to sentry.io
})

const app = express();

const allowedOrigins = [process.env.ORIGIN, "http://localhost:5173", "https://shardeum-academy.vercel.app", "https://university.shardeum.org", "http://university.shardeum.org", "https://dash.university.shardeum.org", "http://dash.university.shardeum.org", "https://cms.university.shardeum.org", "http://cms.university.shardeum.org"];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// var corsOptions = {
//   origin: "*",
// };
app.use(cors(corsOptions));
app.use(compression());

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
