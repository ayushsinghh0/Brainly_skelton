import dotenv from "dotenv" 
dotenv.config();
console.log(process.env.MONGODB_URL);
const MONGODB_URL=process.env.MONGODB_URL

import { ContentModel, UserModel } from "./routes/db.js";
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import zod from "zod";
import jwt from "jsonwebtoken"
import { authorization } from "./middlewares.js";
import { userInfo } from "node:os";
const SECRET =process.env.SECRET as string;

const app=express();

app.use(express.json());

app.post("/user/signUp",async function(req,res){
    const neededBody=zod.object({
        username:zod.string(),
        password:zod.string()
    })
    const valid=neededBody.safeParse(req.body);
    if(!valid.success){
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

app.post("/user/signin",async function(req,res){
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
     const token=jwt.sign({
                id:user._id
            },SECRET);
    
            res.json({
                 msg: "Signin successful",
                token
            })
    
    
})



app.post("/content",authorization,async function (req,res) {
    const title=req.body.title;
    const link=req.body.link;
    const tags=req.body.tags;
    
    try {await ContentModel.create({
        title,
        link,
        tags,
        userId:(req as any).userId
    })
    res.json({
        msg : "content Created"
    })

}
    catch(e){
        return res.json({
            msg:"something happens"
        })
    }
    
})

app.get("/content",authorization,async function(req,res){
    const userId =(req as any).userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId","username")
    res.json({
        content
    })
})

app.delete("/content/delte",authorization,async (req,res)=>{
    const contentId=req.body.contentId;
    await ContentModel.deleteMany({
        contentId,
        userId:(req as any).userId
    })
})


async function main() {
    await mongoose.connect(MONGODB_URL!)
    app.listen(3000);
}

main();