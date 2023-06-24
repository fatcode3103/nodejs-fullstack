import * as userService from "../services/userService"

let handleLogin = async(req, res) => {

    let {email, password} = req.body

    //check email
    // cmp password

    if(!email || !password){
        return res.status("500").json({
            errCode: 1,
            errorMessage: "Missing input parameter",
        })
    }

    let userData = await userService.handleUserLogin(email, password);

    return res.status(200).json({
        ...userData,
        user: userData ? userData : {}
    })
}

let getAllUser = async(req, res) => {
    let {id} = req.query

    if(!id){
        return res.status(200).json({
        errCode: 1,
        errMessage: "Missing required parameters",
        users: {},
    })
    }

    let users = await userService.handleGetAllUser(id)
    return res.status(200).json({
        errCode: 0,
        errMessage: "ok",
        users: users,
    })
}

let createNewUser = async (req, res) => {
    let message = await userService.handleCreateNewUser(req.body)
    return res.status(200).json(message)
}

let deleteUser = async(req, res) => {
    let message = await userService.handleDeleteUser(req.body.id)
    return res.status(200).json(message)
}

let editUser = async(req, res) => {
    let data = req.body
    let message = await userService.handleEditUser(data)
    return res.status(200).json(message)
}

 let getAllCode = async(req, res) => {
        const {type} = req.query
        let data = await userService.handleGetAllCode(type)
        return res.status(200).json(data)
 }

export {
    handleLogin, getAllUser, createNewUser, deleteUser, editUser, getAllCode
}