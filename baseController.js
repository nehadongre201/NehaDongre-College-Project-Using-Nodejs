import userModel from "../models/user.js"
import dataModel from "../models/datamodel.js"
import bcrypt from 'bcrypt'
class baseController {

static admin = (req , res)=>{
    res.render('admin');
}

    static home = (req, res) => {
        res.render('index', { 'title': 'Home' })
    }

    static login = (req, res) => {
        res.render('Login', { 'title': 'login' })
    }

    static register = (req, res) => {
        res.render('register', { 'title': 'register' })
    }
    
    static contact = (req, res) => {
        res.render('contact', { 'title': 'Contact' })
    }

    static choclate = (req, res) => {
        dataModel.find({} , function(error , items){
            items = items.filter((item)=>{return item.type == "choclate"})
            res.render('choclate', { 'title': 'Buy Choclate', itemlist : items })
        })
    }
    static devices = (req, res) => {
        dataModel.find({} , function(error , items){
            items = items.filter((item)=>{return item.type == "devices"})
              res.render('Devices', { 'title': 'Buy Devices' , itemlist : items })
        })
    }
    static footwear = (req, res) => {
        dataModel.find({} , function(error , items){
            items = items.filter((item)=>{return item.type == "footwear" || item.type == "mfoot" || item.type == "lfoot" || item.type == "kfoot"})
            res.render('footwear', { 'title': 'Buy Footwear'  , itemlist : items })
        })
    }

    static gift = (req, res) => {
        dataModel.find({} , function(error , items){
            items = items.filter((item)=>{return item.type == "gift"})
          res.render('Gift', { 'title': 'Buy Gift', itemlist : items  })   
        })
    }
    static grocery = (req, res) => {
        dataModel.find({} , function(error , items){
            items = items.filter((item)=>{return item.type == "grocery"})
            res.render('Grocery', { 'title': 'Buy Grocery', itemlist : items })
        })
        
    }
    static kids = (req, res) => {
        dataModel.find({} , function(error , items){
            items = items.filter((item)=>{return item.type =="kids"||item.type == "kshirt" || item.type == "ktraditional" || item.type == "kpant" || item.type =="ksports"})
            res.render('kids', { 'title': 'Buy for kids' , itemlist : items })
        })
    }

    static lfashion = (req, res) => {

        dataModel.find({} , function(error , items){
            items = items.filter((item)=>{return item.type =="lshirt"||item.type == "lpants" || item.type == "ltraditional" || item.type == "saree" || item.type =="onepiece"})
            res.render('lfashion', { 'title': 'Lfashion' , itemlist:items})

        })
    }
    static mfashion = async(req, res) => {
        dataModel.find({},function(error , items){
            items = items.filter((item)=>{return item.type == "mshirt" || item.type == "mpant" || item.type == "mshort" || item.type == "traditional"})
            res.render('mfashion', { 'title':'Mashion',    itemlist : items })
        })

       
        
    }

    static data = (req , res)=>{
        res.render('data' ,{'title':'Data'} )
    }

   

}

export default baseController