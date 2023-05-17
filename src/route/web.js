import express from "express";

let router  = express.Router()

let initWebRouter = (app) => {    /// tao tat ca cac router cho website
    router.get("/", (req, res) => {
        return res.send('hello')
    })

    return app.use("/", router)
}

export default initWebRouter