const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const tripRoutes = require("./routes/tripRoutes");
const stopRoutes = require("./routes/stopRoutes");
const activityRoutes =
  require("./routes/activityRoutes");
const budgetRoutes =
  require("./routes/budgetRoutes");
const publicRoutes =
  require("./routes/publicRoutes");



app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/stops", stopRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/public", publicRoutes);

app.get("/", (req, res) => {
  res.send("Traveloop API Running...");
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected");

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.log(err);
});