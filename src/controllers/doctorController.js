import * as doctorSevice from "../services/doctorSevice";

const getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) {
        limit = 10;
    }
    try {
        let mess = await doctorSevice.handleGetTopDoctorHome(+limit);
        return res.status(200).json(mess);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: -1,
            message: "Error from sevice...",
        });
    }
};

const getAllDoctor = async (req, res) => {
    try {
        let data = await doctorSevice.handleGetAllDoctor();
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: -1,
            message: "Error from the server",
        });
    }
};

const postInfoDoctor = async (req, res) => {
    try {
        let mess = await doctorSevice.handlePostInfoDoctor(req.body);
        return res.status(200).json(mess);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: -1,
            message: "Error from the server",
        });
    }
};

const getDetailDoctorById = async (req, res) => {
    try {
        let details = await doctorSevice.handleGetDetailDoctorById(
            req.query.id
        );
        return res.status(200).json(details);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errorCode: -1,
            message: "Error from the server",
        });
    }
};

export { getTopDoctorHome, getAllDoctor, postInfoDoctor, getDetailDoctorById };
