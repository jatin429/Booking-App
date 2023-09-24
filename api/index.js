const express = require("express");
const app = express();
const database = require("./config/database");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const hotelsRoute = require("./routes/hotels");
const roomsRoute = require("./routes/rooms");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();

app.listen(4000, () => {
  console.log("Connected to backend!");
});

// database connection
database.connect();

// middlewares
app.use(cors({
  origin: "http://localhost:3000", // Replace with your frontend's origin
  // Other options, if needed
}));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/users", usersRoute);
app.use("/api/rooms", roomsRoute);
