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
})

const app = express();

const allowedOrigins = [process.env.FRONT_END_URL, "http://localhost:5173", "http://localhost:3000", "https://decentraclasses.com", "https://www.decentraclasses.com", "https://shardeum-academy.vercel.app"];

var corsOptions = {
  origin: "*",
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(compression());
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

require("./db");
require("./routes/authRoutes")(app);
require("./routes/userRoutes")(app);
require("./routes/courseRoutes")(app);
require("./routes/adminRoutes")(app);
require("./routes/contestRoutes")(app);
require("./routes/solcRoutes")(app);
require("./routes/cohertRoutes")(app);
require("./routes/externalCourseRoute")(app);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to backend of Decentra Classes - Now why are you here? go back to decentraclasses.com, you got no business here" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
