import db from "../models"   // db chua cac modelname: user,...
import * as CRUDSevice from "../services/CRUDSevice"

let getHomePage = async(req, res) => {
    try{
        let data = await db.User.findAll()
        return res.render('homePage.ejs', {data: data})
    }catch(e){
        console.log(">>>error: ", e)
    }
}

let getCrud = (req, res) => {
    return res.render('crud.ejs')
}

let postCRUD = async (req, res) => {
    await CRUDSevice.createNewUser(req.body)
    return res.redirect('/crud');
}

let displayCrud = async(req, res) => {
    let data = await CRUDSevice.getUsers()
    return res.render('getCrud.ejs', {data: data})
}

let getEditCrud = async(req, res) => {
    const {id} = req.query
    if(id){
        let userData = await CRUDSevice.getUserInfoById(id)
        return res.render('editCrud.ejs', {data: userData})
    }else{
        return res.send('User not found !')
    }
}

let putCRUD = async(req, res) => {
    let data = req.body
    await CRUDSevice.updateUser(data)
    return res.redirect("/get-crud")
}

let deleteCRUD = async(req, res) => {
    let {id} = req.query
    await CRUDSevice.deleteUserById(id)
    return res.redirect("/get-crud")
}

export {
    getHomePage, getCrud, postCRUD, displayCrud, getEditCrud, putCRUD, deleteCRUD
}