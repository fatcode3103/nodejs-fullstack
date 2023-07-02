import { raw } from "body-parser";
import db from "../models";

const handleGetTopDoctorHome = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                where: { roleId: "R2" },
                limit: limit,
                order: [["createdAt", "DESC"]],
                attributes: {
                    exclude: ["password"],
                },
                include: [
                    {
                        model: db.Allcode,
                        as: "positionData", ///Khi truy cập vào mô hình User,
                        //bạn có thể sử dụng biệt danh này để truy cập vào thông tin từ mô hình Allcode
                        attributes: ["valueEn", "valueVi"],
                    },
                    {
                        model: db.Allcode,
                        as: "genderData",
                        attributes: ["valueEn", "valueVi"],
                    },
                ],
                raw: true,
                nest: true,
            });
            resolve({
                errorCode: 0,
                message: "Success !",
                data: users,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const handleGetAllDoctor = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleId: "R2" },
                attributes: {
                    exclude: ["password"],
                },
            });
            resolve({
                errorCode: 0,
                message: "Get data doctor success !",
                data: doctors,
            });
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};

const handlePostInfoDoctor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.doctorId || !data.contentHTML || !data.contentMarkdown) {
                resolve({
                    errorCode: -2,
                    message: "missing parameter",
                });
            } else {
                await db.Markdown.create({
                    contentHTML: data.contentHTML,
                    contentMarkdown: data.contentMarkdown,
                    description: data.description,
                    doctorId: data.doctorId,
                });
            }
            resolve({
                errorCode: 0,
                message: "save info doctor success !",
            });
        } catch (e) {
            reject(e);
        }
    });
};

const handleGetDetailDoctorById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errorcode: 1,
                    message: "Missing parameters",
                });
            } else {
                let res = await db.User.findOne({
                    where: {
                        id: id,
                    },
                    attributes: {
                        exclude: ["password"],
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: [
                                "description",
                                "contentHTML",
                                "contentMarkdown",
                            ],
                        },
                        {
                            model: db.Allcode,
                            as: "positionData",
                            attributes: ["valueEn", "valueVi"],
                        },
                    ],
                    raw: true,
                    nest: true,
                });
                if (res && res.image) {
                    res.image = new Buffer(res.image, "base64").toString(
                        "binary"
                    );
                }
                resolve({
                    errorCode: 0,
                    message: "get detail doctor success !",
                    data: res,
                });
            }
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};

const handleUpdateDetailDoctor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = await db.Markdown.findOne({
                where: { doctorId: data.doctorId },
                raw: false,
            });
            if (res) {
                await res.update({
                    contentHTML: data.contentHTML,
                    contentMarkdown: data.contentMarkdown,
                    description: data.description,
                    updateAt: new Date(),
                });
                await res.save();
                resolve({
                    errorCode: 0,
                    message: "Update detail doctor success !",
                });
            }
            resolve({
                errorCode: 1,
                message: "Update failed",
            });
        } catch (e) {
            reject(e);
        }
    });
};

const handleGetAllCodeHours = (type) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = await db.Allcode.findAll({
                where: { type: type },
            });
            if (res) {
                resolve({
                    errorCode: 0,
                    message: "Get time from allcode success !",
                    data: res,
                });
            } else {
                resolve({ errorCode: 1, message: "Not found" });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const handlePostBulkCreateSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let MAX_NUMBER = 10;
            data = data.map((item) => {
                item.maxNumber = MAX_NUMBER;
                return item;
            });
            await db.Schedule.bulkCreate(data);
            resolve({
                errorCode: 0,
                message: "Post bulk create schedule success !",
            });
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};

const handleGetScheduleDoctorByDate = async (idInput, dateInput) => {
    try {
        let res = await db.Schedule.findAll({
            where: { doctorId: idInput, date: dateInput },
            include: [
                {
                    model: db.Allcode,
                    as: "timeData",
                    attributes: ["valueVi", "valueEn"],
                },
            ],
            raw: false,
            nest: true,
        });
        if (res) {
            return {
                errorCode: 0,
                message: "Get schedule successfully !",
                data: res,
            };
        } else {
            return {
                errorCode: 1,
                message: "Get schedule failed !",
            };
        }
    } catch (e) {
        return e;
    }
};

export {
    handleGetTopDoctorHome,
    handleGetAllDoctor,
    handlePostInfoDoctor,
    handleGetDetailDoctorById,
    handleUpdateDetailDoctor,
    handleGetAllCodeHours,
    handlePostBulkCreateSchedule,
    handleGetScheduleDoctorByDate,
};
