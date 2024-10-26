const express = require("express");
const cors = require("cors");
const compression = require("compression");
const cc = require("node-console-colors");
const bodyParser = require('body-parser');

// EXCEPTION HANDLING MIDDLEWARES
process.on('uncaughtException', function (error) {
  console.log(cc.set("fg_yellow", "Crashable UnHandled Exception", error.stack));
});
process.on('unhandledRejection', (reason, promise) => {
  console.log(cc.set("fg_yellow", 'Crashable UnHandled Rejection', reason.stack || reason));
  // Recommended: send the information to sentry.io
})

const app = express();

const allowedOrigins = [process.env.ORIGIN, "http://localhost:5173", "http://localhost:3000", "https://shardeum-academy.vercel.app", "https://university.shardeum.org", "http://university.shardeum.org", "https://dash.university.shardeum.org", "http://dash.university.shardeum.org", "https://cms.university.shardeum.org", "http://cms.university.shardeum.org"];

var corsOptions = {
  origin: "*",
};
app.use(express.json());
app.use(cors(corsOptions));
app.use(compression());
app.use(bodyParser.json());

// app.use(cors(corsOptions));


// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

require("./db");
// require('./middlewares')
// routes
require("./routes/authRoutes")(app);
require("./routes/userRoutes")(app);
require("./routes/courseRoutes")(app);
require("./routes/adminRoutes")(app);
require("./routes/contestRoutes")(app);
require("./routes/solcRoutes")(app);
require("./routes/cohertRoutes")(app);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to backend of shardeum academy" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
