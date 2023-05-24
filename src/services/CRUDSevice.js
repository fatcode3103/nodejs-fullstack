import db from "../models" 
import bcrypt from "bcrypt"

const saltRounds = 10;

const createNewUser = async (data) => {
    const hashPass = await hashPassword(data.password).then(pass => pass) 
    //.then không có tác dụng vì hashPassword đã được khai báo dưới dạng một hàm async.
    db.User.create({
        email: data.email,
        password: hashPass,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        gender: data.gender === '1' ? true : false,
        roleId: data.roleId,
        phoneNumber: data.phoneNumber,
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

const getUsers = () => {
    return new Promise(async(resolve, reject) => {
        try{    
            let users = await db.User.findAll({
                raw: true,
            })
            resolve(users)
        }catch(e){
            reject(e)
        }
    })
}


let getUserInfoById = (id) => {
    return new Promise(async (resolve, reject) => {
        try{
            let userId = await db.User.findOne({
                where:{id: id}, 
                raw:true
            });
            resolve(userId)
        }catch(e){
            reject(e)
        }
    })
}

let updateUser = (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            let user = await db.User.findOne({
                where: {id: data.id},
            })
            if(user){
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.email = data.email;
                user.address = data.address;
                user.password = data.password;
                user.gender = data.gender;
                user.roleId = data.roleId;
                user.phoneNumber = data.phoneNumber;
                await user.save();
            }
            resolve();
        }catch(e){
            reject(e)
        }
    })
}

let deleteUserById = async(id) => {
    try{
        let user = await db.User.findOne({
            where: {id: id},
        })
        if(user){
            await user.destroy();
        }
    }catch(e){
        console.log(e)
    }
}

export {createNewUser, getUsers, getUserInfoById, updateUser, deleteUserById}