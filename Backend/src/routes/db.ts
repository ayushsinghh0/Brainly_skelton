import mongoose,{model, Schema} from "mongoose";
import { ref, title } from "node:process";

const UserSchema=new Schema({
     username: {type: String,unique: true},
     password: String
})

export const UserModel= model("user",UserSchema);

const ContentSchema = new Schema({
     title: String,
     link: String,
     tags: [{type:  mongoose.Types.ObjectId, ref: 'Tag'}],
     userId: {type:mongoose.Types.ObjectId,ref: 'user',required: true}
     
})

export const ContentModel=  model("content",ContentSchema);

const LinkSchema=new Schema({
     hash:String,
     userId:{type: mongoose.Types.ObjectId, ref: 'user',required:true}
})

export const LinkModel=model("Link",LinkSchema);




const tag=new Schema({
     title:String,
     

})