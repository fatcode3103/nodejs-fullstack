import * as userService from "../services/userService"

let handleLogin = async(req, res) => {

    let {email, password} = req.body

    //check email
    // cmp password

    if(!email || !password){
        return res.status("500").json({
            errCode: 1,
            message: "missing input parameter",
        })
    }

    let userData = await userService.handleUserLogin(email, password);

    return res.status(200).json({
        ...userData,
        user: userData ? userData : {}
    })
}

export {
    handleLogin,
}