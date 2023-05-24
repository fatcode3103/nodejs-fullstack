import express from "express"
import viewEngine from "./config/viewEngine"
import initWebRouter from "./route/web"
import connectDB from "./config/connectDB"

require('dotenv').config()

let app = express()

const port = process.env.PORT || 3001

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

viewEngine(app)

initWebRouter(app)

connectDB()

app.listen(port, () => {
    console.log(port)
})

