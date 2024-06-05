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

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Credentials", "true");
//   next();
// });

const allowedOrigins = [process.env.ORIGIN, "http://localhost:5173", "http://localhost:3000", "https://shardeum-academy.vercel.app", "https://university.shardeum.org", "http://university.shardeum.org", "https://dash.university.shardeum.org", "http://dash.university.shardeum.org", "https://cms.university.shardeum.org", "http://cms.university.shardeum.org"];

// const corsOptions = {
//   origin: function (origin, callback) {
//     console.log("ORIGIN", origin)
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

// const corsOptions = (req, callback) => {
//   var corsOptions;
//   if (req.method === 'OPTIONS') {
//     corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
//     callback(null, corsOptions);
//   } else {
//     // Your existing CORS logic
//     console.log("origin", req.headers.origin);
//     if (allowedOrigins.indexOf(req.header('Origin')) !== -1) {
//       corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
//     } else {
//       console.log("not allowed cors");
//       corsOptions = { origin: false } // disable CORS for this request
//     }
//     callback(null, corsOptions)
//   }
// };

// const corsOptions = function (req, callback) {
//   var corsOptions;
//   console.log("origin", req.headers.origin);
//   if (allowedOrigins.indexOf(req.header('Origin')) !== -1) {
//     corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
//   } else {
//     console.log("not allowed cors");
//     corsOptions = { origin: false } // disable CORS for this request
//   }
//   callback(null, corsOptions) // callback expects two parameters: error and options
// }

var corsOptions = {
  origin: "*",
};
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
require("./routes/solcRoutes")(app);
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to backend of shardeum academy" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
