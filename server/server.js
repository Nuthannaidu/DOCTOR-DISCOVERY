require("dotenv").config();
const express = require("express");

const cors = require("cors");
const app = express();

const db = require("./config/db");
const doctorRoute = require("./routes/routes.doctor");

app.use(cors());
app.use(express.json());

const checkDatabaseConnection = async () => {
  try {
    await db.query("SELECT 1");
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection failed");
  }
};

checkDatabaseConnection();

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use("/api/doctors", doctorRoute);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
