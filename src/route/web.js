import express from "express";
import * as homeController from "../controllers/homeController";
import * as userController from "../controllers/userController"

let router  = express.Router()

let initWebRouter = (app) => {    /// tao tat ca cac router cho website
    // home page
    router.get("/", homeController.getHomePage)
    // form crud
    router.get("/crud", homeController.getCrud)
    // users tabel
    router.get("/get-crud", homeController.displayCrud)
    // edit
    router.get("/edit-crud", homeController.getEditCrud)
    // post new user
    router.post("/post-crud", homeController.postCRUD)
    // update user
    router.post("/put-crud", homeController.putCRUD)
    // delete user
    router.get("/delete-crud", homeController.deleteCRUD)

    router.post("/api/login", userController.handleLogin)

    return app.use("/", router)
}

export default initWebRouter