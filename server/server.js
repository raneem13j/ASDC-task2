import express  from "express";
import dotenv  from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';


dotenv.config();

await connectDB();


const PORT = process.env.PORT || 5000;
const PORT2 = process.env.PORT || 3000;
const app = new express();


if (process.env.NODE_ENV === "development"){
    app.use(morgan('dev'));
  };

app.use(express.json());
app.use(cors());
const server = http.createServer(app);



app.get("/", (req, res) =>
   res.send("server is on :)")
)


app.listen(
    PORT,
    console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}!!!`)
  ); 