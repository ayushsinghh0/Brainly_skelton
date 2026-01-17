import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const SECRET = process.env.SECRET as string;
export const authorization = (req: Request, res: Response, next: NextFunction) => {
    
    const token = req.headers.token as string;
    if (!token) {
        return res.status(401).json({
            msg: "invalid user1"
        })
    }
    const a=4;
    try{
        const valid = jwt.verify(token, SECRET) as JwtPayload;
        if(valid){
            (req as any).userId=valid.id;
            next();
          }
        else {
        return res.json({
            msg:"invalid user2"
        })
    }
    }
    catch(e){
        return res.json({
            msg:"invalid user3"
        })
    }

}