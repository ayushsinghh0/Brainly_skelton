import mongoose,{Model, Schema} from "mongoose";
import { ref } from "node:process";

const UserSchema=new Schema({
     username: {type: String,unique: true},
     password: String
})

export const UserModel=new Model("user",UserSchema);

const ContentSchema = new Schema({
     title: String,
     link: String,
     tags: [{type:  mongoose.Types.ObjectId, ref: 'Tag'}],
     userId: {type:mongoose.Types.ObjectId,ref: 'User',required: true}
     
})

export const ContentModel= new Model()