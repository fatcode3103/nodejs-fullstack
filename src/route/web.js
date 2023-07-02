import express from "express";
import * as homeController from "../controllers/homeController";
import * as userController from "../controllers/userController";
import * as doctorController from "../controllers/doctorController";

let router = express.Router();

let initWebRouter = (app) => {
    /// tao tat ca cac router cho website
    // home page
    router.get("/", homeController.getHomePage);
    // form crud
    router.get("/crud", homeController.getCrud);
    // users tabel
    router.get("/get-crud", homeController.displayCrud);
    // edit
    router.get("/edit-crud", homeController.getEditCrud);
    // post new user
    router.post("/post-crud", homeController.postCRUD);
    // update user
    router.post("/put-crud", homeController.putCRUD);
    // delete user
    router.get("/delete-crud", homeController.deleteCRUD);

    // api post user
    router.post("/api/login", userController.handleLogin);
    //api get users
    router.get("/api/get-all-users", userController.getAllUser);
    // api add uesr
    router.post("/api/create-new-user", userController.createNewUser);
    // api delete user
    router.delete("/api/delete-user", userController.deleteUser);
    //api edit user
    router.put("/api/edit-user", userController.editUser);
    // api get allCode
    router.get("/api/allcode", userController.getAllCode);

    // api get doctor
    router.get("/api/get-top-doctor-home", doctorController.getTopDoctorHome);
    router.get("/api/get-all-doctor", doctorController.getAllDoctor);
    router.post("/api/post-info-doctor", doctorController.postInfoDoctor);
    router.get(
        "/api/get-detail-doctor-by-id",
        doctorController.getDetailDoctorById
    );
    router.put("/api/edit-detail-doctor", doctorController.updateDetailDoctor);

    //api get allcode
    router.get("/api/get-allcode-hours", doctorController.getAllCodeHours);
    router.post(
        "/api/bulk-create-schedule",
        doctorController.postBulkCreateSchedule
    );
    router.get(
        "/api/get-schedule-doctor-by-date",
        doctorController.getScheduleDoctorByDate
    );

    return app.use("/", router);
};

export default initWebRouter;
