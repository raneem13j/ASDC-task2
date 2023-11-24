import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import { userAuth } from "./middlewares/auth.js";

dotenv.config();
await connectDB();

const PORT = process.env.PORT || 5000;
const app = new express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(express.json());
app.use(cors());


//routes gose here
app.use("/user", userRoute);

//authintication to
app.get("/basic", userAuth, (req, res) => res.send("User Route"));

app.get("/", (req, res) => res.send("server is on :)"));

app.listen(
  PORT,
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}!!!`)
);
