import dotenv from "dotenv" 
dotenv.config();
console.log(process.env.MONGODB_URL);
import { UserModel } from "./routes/db.js";
//ayush raj your heroo...
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import zod from "zod";
import jwt from "jsonwebtoken";
const SECRET =process.env.SECRET;

const app=express();

app.use(express.json());

app.post("/user/login",async function(req,res){
    const neededBody=zod.object({
        username:zod.string(),
        password:zod.string
    })
    const valid=neededBody.safeParse(req.body);
    if(!valid){
        return res.status(404).json({
            msg:"invalid context"
        })
    }

    const username=req.body.username;
    const password=req.body.password;

    const hashPassword=await bcrypt.hash(password,3);
    
    try{await UserModel.create({
        username:username,
        password:hashPassword
    })

    res.json({
        msg:"you are logged in"
    })}
    catch(e){
        return res.status(404).json({
            msg:"something wrong"
        })
    }
})

app.post("/signin",async function(req,res){
    const username=req.body.username;
    const password=req.body.password;

    const user=await UserModel.findOne({
        username:username  
    })
    if(!user?.password){
        return res.status(404).json({
            msg:"incorrect password"
        })
    }
    const check=await bcrypt.compare(password,user.password);

    if(!check){
        return res.status(404).json({
            msg:"incorrect password"
        })
    }
})
async function main() {
    await mongoose.connect(process.env.MONGO_URL!)
    app.listen(3000);
}

main();