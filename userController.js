import dotenv from 'dotenv'
dotenv.config()
import userModel from "../models/user.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { storeToken } from '../Public/js/localStorageToken.js'
import dataModel from '../models/datamodel.js'


   class userController{

    static loggedUserData = [];

    static getLoggedUserData = (result , email)=>{
        this.loggedUserData.push(result);
        // this.loggedUserData.filter((item)=>{return item.email == email})
        return this.loggedUserData 

    }

     static sendLogindetails = async (req , res)=>{
        res.send(this.loggedUserData[this.loggedUserData.length-1]);
    //     const {token} = req.body;
        
    //     var data = JSON.parse(Buffer.from(token.split('.')[1],'base64').toString);
    //     // function parseJwt (token) {
    //     //     return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    //     // }
    // //     const { userID } =   jwt.verify(token , process.env.SECRET);
    // //    var userDetail = await userModel.findById(userID);
    // console.log(data);
    //    res.send({"detail" : data});
     }
    static save = async(req , res)=>{
        
        console.log("posted user" + JSON.stringify(req.body));
        const hashPassword = await bcrypt.hash(req.body.password , 10);
        // create a customer
        const {email} = req.body;
        const user = new userModel({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
    
        })
    console.log("trying to save in db...........");
        // save a customer in mongoDB
        //  await user.save().then(data=>{res.send(data)}).catch(e=>{res.send({message : e.message})})
        await user.save();
        console.log("saved doc");
        const registeredUser = await userModel.findOne({email : email})
         console.log("registered succesfully" + registeredUser);

        const token = jwt.sign({userID : registeredUser._id},process.env.SECRET , {expiresIn : '5d'})
       console.log(token);
        // storeToken(token)
       res.send({"token" : token});
    //     res.send(token)
    //     console.log("res sended success");
        // .then(data=>{
        //     res.send(data);
        // }).catch(e=>{res.status(500).send({message:err.message})})
    
    }

    static verifyLogin = async(req , res)=>{
        
        var verifyObj = {};
        console.log("posted data for login verification : " + JSON.stringify(req.body));
        const {email , password} = req.body
        // verifying customer
        const result = await userModel.findOne({email:email});
       this.getLoggedUserData(result , result.email);
        console.log(result);
        if (result!=null) {
            const isPasswordMatch = await bcrypt.compare(password , result.password);
            const isEmailMatch = email == result.email ? true : false;
            const token = jwt.sign({userID : result._id},process.env.SECRET , {expiresIn : '5d'})
            // storeToken(token)
           verifyObj["email"] = isEmailMatch;
           verifyObj["password"] = isPasswordMatch;
           verifyObj["token"] = token;
           verifyObj["Email"] = result.email;
           res.send(verifyObj);
           console.log("login succesfully");
        }
        else{
            console.log("result is empty");
        }
    }

    static addData = async(req , res)=>{
        console.log("posted data" + JSON.stringify(req.body));
        //create data
        const {title ,type , url , amount , details} = req.body;
        const data = new dataModel({
            title:title,
            type:type,
            url:url,
            amount:amount,
            details : details
        })
        console.log("trying to save in db.........");
        await data.save();
        console.log("data saved successfully");
        res.send({"message":"data created"})
    }

    static addDataThroughAdmin = async(req , res)=>{
        console.log("started");
        const {title , type , url , amount , details}=req.body;
        const datamodel = new dataModel({
            title:title,
            type:type,
            url:url,
            amount:amount,
            details : details
        })
        await datamodel.save();
        res.send({"message":"data posted throeugh admin"})
    }

   

   }
    

export default userController