import express from "express";
import viewEngine from "./config/viewEngine";
import initWebRouter from "./route/web";
import connectDB from "./config/connectDB";
import cors from "cors";

require("dotenv").config();

let app = express();
app.use(cors({ origin: true }));
const port = process.env.PORT || 3001;

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));

viewEngine(app);

initWebRouter(app);

connectDB();

app.listen(port, () => {
    console.log(port);
});
