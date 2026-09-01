const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./configs/connectDB");
const routes = require("./routes");
const cors = require("cors")

const app = express();
connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", routes);

app.get("/", (req, res) => {
  res.status(200).json({ status: "success", message: "ok" });
});

app.use((req, res) => {
  res.status(404).json({ status: "error", message: "Route not found" });
});

module.exports = app;
