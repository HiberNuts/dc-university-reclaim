require("dotenv").config();
const config = process.env;

const mongoose = require("mongoose");
const db = require("./models/index");
const Role = db.role;

const MONGO_URI = config.MONGO_URI;

db.mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "shardeum",
  })
  .then(() => {
    console.log("Connected to MongoDB");
    initial();
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

async function initial() {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count === 0) {
      await Promise.all([
        new Role({ name: "user" }).save(),
        new Role({ name: "moderator" }).save(),
        new Role({ name: "admin" }).save(),
      ]);

      console.log("Roles have been initialized.");
    }
  } catch (error) {
    console.error("Error initializing roles:", error);
  }
}
