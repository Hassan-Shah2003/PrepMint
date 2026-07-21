import jwt from "jsonwebtoken";
import blacklistModel from "../model/blacklist.model.js";

export const authMiddleware = async(req,res,next)=>{
    try {
        const token=req.cookies.token;

        if(!token){
            return res.status(401).json({
                message:"Unauthorized"
            });
        }
        const isBlacklisted = await blacklistModel.findOne({token});
        if(isBlacklisted){
            return res.status(401).json({
                message:"Token is invalidated, please login again",
            })
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message:"Unauthorized",
        });
    }
}