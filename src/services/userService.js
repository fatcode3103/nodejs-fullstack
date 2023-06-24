import db from "../models"
import bcrypt from "bcrypt"

const saltRounds = 10;

let handleUserLogin = (email, password) => {
    return new Promise(async(resolve, reject) => {
        try{
            let userData = {}
            let isExist = await handleCheckEmail(email)
            if(isExist){
                let user = await db.User.findOne({
                    where: {email: email},
                    attributes: ['email', 'roleId', 'password', 'firstName', 'lastName'],
                    raw: true
                })
                if(user){
                    let checkPass = bcrypt.compareSync(password, user.password)
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

let handleGetAllUser = (userId) => {
    return new Promise(async(resolve, reject) => {
        try{
            let users = '';
            if(userId === "all"){
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if(userId && userId !== "all"){
                users = await db.User.findOne({
                    where:{
                        id: userId,
                    },
                    attributes: {
                        exclude: ['password']
                    }
                })
                console.log(users)
            }
            resolve(users)
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

let handleCreateNewUser = (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            let checkEmail = await handleCheckEmail(data.email)
            if(!checkEmail){
                const hashPass = await hashPassword(data.password)
                await db.User.create({
                    email: data.email,
                    password: hashPass,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    gender: data.gender,
                    roleId: data.roleId,
                    phoneNumber: data.phoneNumber,
                    positionId: data.positionId,
                    image: data.image
                })
                resolve({
                    errCode: 0,
                    errorMessage: "OK"
                })
            }else{
                resolve({
                    errCode: 1,
                    errorMessage: "Email exists"
                })
            }
            
        }catch(e){
            reject(e)
        }
    })
}

let handleDeleteUser = (id) => {
    return new Promise(async(resolve, reject) => {
        try{
            let user = await db.User.findOne({
                where:{id: id}, raw: false
            })
            if(user){
                await user.destroy()
                resolve({
                    errCode: 0,
                    message: "OK"
                })
            }
            resolve({
                errCode: 1,
                errorMessage: "Id not found"
            })
        }catch(e){
            reject(e)
        }
    })
}

let handleEditUser = (data) => {
    return new Promise(async(resolve, reject) => {
        try{    
            let user = await db.User.findOne({
                where: {id: data.id}, 
                raw:false
            })
            if(user){
                await user.update({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    address: data.address,
                    password: data.password,
                    gender: data.gender,
                    roleId: data.roleId,
                    phoneNumber: data.phoneNumber,
                    positionId: data.positionId,
                    image: data.image
                })
                await user.save();
                resolve({
                    errCode: 0,
                    message: "OK"
                })
            }   
            resolve({
                errCode: 1,
                errorMessage: "User not found"
            })
        }catch(e){
            reject(e)
        }
    })
}

let hashPassword = (myPlaintextPassword) => {
    return new Promise(async (resolve, reject) => {
        try{
            const hash = await bcrypt.hashSync(myPlaintextPassword, saltRounds);
            resolve(hash)
        }catch(e){
            reject(e)
        }
    })
}

let handleGetAllCode = (type) => {
    return new Promise(async(resolve, reject) => {
        try{
            let data = {}
            let allcode = await db.Allcode.findAll({
                where: {type: type}
            })
            data.errorCode = 0;
            data.data = allcode;
            resolve(data)
        }catch(e){
            reject(e)
        }    
    })
}

export{
    handleUserLogin, handleGetAllUser, handleCreateNewUser, handleDeleteUser, handleEditUser, handleGetAllCode
}