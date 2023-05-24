import db from "../models"
import bcrypt from "bcrypt"

let handleUserLogin = (email, password) => {
    return new Promise(async(resolve, reject) => {
        try{
            let userData = {}
            let isExist = await handleCheckEmail(email)
            if(isExist){
                let user = await db.User.findOne({
                    where: {email: email},
                    attributes: ['email', 'roleId', 'password'],
                    raw: true
                })
                if(user){
                    let checkPass = await bcrypt.compareSync(password, user.password)
                    if(checkPass){
                        userData.errorCode = 0;
                        userData.errorMessage = "Ok"
                        delete user.password
                        userData.user = user
                    }else{
                        userData.errorCode = 3;
                        userData.errorMessage = "Wrong password"
                    }
                }else{
                    userData.errorCode = 2;
                    userData.errorMessage = "User is not found"
                }
            }else{
                userData.errorCode = 1;
                userData.errorMessage = "Your email does not exist in the system. Please try other enmail"
            }
            resolve(userData)
        }catch(e){
            reject(e)
        }
    })
}

let handleCheckEmail = (email) => {
    return new Promise(async(resolve, reject) => {
        try{
            let user = await db.User.findOne({
                where: {
                    email: email
                }
            })
            if(user){
                resolve(true)
            }else{
                resolve(false)
            }
        }catch(e){
            reject(e)
        }
    })
}

export{
    handleUserLogin,
}