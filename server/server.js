// Importing necessary packages and modules for the server.
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import roomRoute from "./routes/roomRoute.js";
import messageRoute from "./routes/messageRoute.js";
import { userAuth } from "./middlewares/auth.js";

// Configuring environment variables and connecting to the database.
dotenv.config();
await connectDB();

// Setting up the server on the specified port or defaulting to 5000.
const PORT = process.env.PORT || 5000;
const app = new express();

// Configuring middleware for request and response handling.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Logging requests during development.
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Configuring cookie parser, JSON parsing, and CORS.
app.use(cookieParser());
app.use(express.json());
app.use(cors());

// Defining routes for user, room, and message handling.
app.use("/user", userRoute);
app.use("/room", roomRoute);
app.use("/message", messageRoute);

// Example authentication-protected route.
app.get("/basic", userAuth, (req, res) => res.send("User Route"));

// Default route for server status.
app.get("/", (req, res) => res.send("Server is on :)"));

// Starting the server and logging its status.
app.listen(
  PORT,
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}!!!`)
);
