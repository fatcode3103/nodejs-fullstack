import express from "express"

let viewEngine = (app) => {
    app.use(express.static("./src/public"))
    app.set("view engine", "ejs")  //// dung view engine co ten la ejs
    app.set("views", "./src/views")  /// set duong link de biet tat cac file view   
}

export default viewEngine