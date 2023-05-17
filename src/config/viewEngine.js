import express from "express"

let viewEngine = (app) => {
    app.use(express.static("./src/public"))
    app.set("view engine", "ejs")  //// dung view engine co ten la ejs
    app.set("views", "./src/views")  /// set duong link de lay view engine    
}

export default viewEngine