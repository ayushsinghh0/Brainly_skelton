import dotenv from "dotenv" 
dotenv.config();
console.log(process.env.MONGODB_URL);
const MONGODB_URL=process.env.MONGODB_URL

import { ContentModel, LinkModel, UserModel } from "./routes/db.js";
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import zod from "zod";
import jwt from "jsonwebtoken"
import { authorization } from "./middlewares.js";
import { userInfo } from "node:os";
import { Random } from "./utlis.js";
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

app.delete("/content/delete",authorization,async (req,res)=>{
    const contentId=req.body.contentId;
    await ContentModel.deleteOne({
        _id:contentId,
        userId:(req as any).userId
    })
    return res.json({ msg: "content deleted" });
})

app.post("/brain/share",authorization,async (req,res)=>{
    const share=req.body.share;
    const hash= Random(10)
    if(share) {
        const existingLink =await LinkModel.findOne({
            userId:(req as any).userId
        })

        if(existingLink){
            return res.json({
                hash:existingLink.hash
            })
        }

         await LinkModel.create({
            userId:(req as any).userId,
            hash :  hash
        })

        return res.json({
            msg:"/share/"+hash
        })        
    }
    else {
        await LinkModel.deleteOne({
            userId:(req as any).userId
        })
        return res.json({
        msg:"uptaded deleted"
    })
    }

    
})

app.get("/brain/:shareLink",async (req,res)=>{
    const hash =  req.params.shareLink;

    const link= await LinkModel.findOne({
        hash
    })

    if(!link){
        res.status(411).json({
            message:"sorry incorrent input"
        })
        return;
    }

    const content = await ContentModel.find({
        _id:link.userId
    })

   const user = await UserModel.findOne({
    userId:link.userId
   })

   if(!user){
    res.status(411).json({
        message:"user not found , error should ideally not happer"
    })
    return;
   }

   res.json({
    username:user.username,
    conten:content
   })
})

async function main() {
    await mongoose.connect(MONGODB_URL!);
    console.log("Connected DB:", mongoose.connection.name);

    app.listen(3000);
}

main();