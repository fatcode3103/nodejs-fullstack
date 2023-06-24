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
                    exclude: ["password", "image"],
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
                        exclude: ["password", "image"],
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

export {
    handleGetTopDoctorHome,
    handleGetAllDoctor,
    handlePostInfoDoctor,
    handleGetDetailDoctorById,
};
