import userModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import blacklistModel from "../model/blacklist.model.js";

export const registerController = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "please provide all required fields",
    });
  }
  const userAlreadyExists = await userModel.findOne({
    $or:[{email},{username}]
  });
  if(userAlreadyExists){
    if(userAlreadyExists.email === email){
      return res.status(400).json({
        message: "user with this email already exists",
      });
    }
    if(userAlreadyExists.username === username){
        return res.status(400).json({
            message: "user with this username already exists",
        })
    }
  }

  const hashedPassword = await bcrypt.hash(password,10);
  const user = await userModel.create({
    username,
    email,
    password:hashedPassword,
  });

  const token  = jwt.sign({
    id:user._id,
  },process.env.JWT_SECRET,{
    expiresIn:"1d",
  });
  res.cookie("token",token,{
    // httpOnly:true,
    // secure:process.env.NODE_ENV === "production",
    // sameSite:"strict",
    // maxAge:24*60*60*1000,
  });
  res.status(201).json({
    message: "user registered successfully",
    user:{
        id:user._id,
        username:user.username,
        email:user.email,
    },
    token,
  });
};

export const loginController =async (req,res)=>{
    console.log(req.body);
    
    try {
        const {usernameOrEmail,password} = req.body;
        const user = await userModel.findOne({
            $or:[{email:usernameOrEmail},{username:usernameOrEmail}]
        });
        if(!user){
            return res.status(400).json({
                message:"invalid email or username",
            });
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(400).json({
                message:"invalid password",
            });
        }
        const token  = jwt.sign({
            id:user._id,
          },process.env.JWT_SECRET,{
            expiresIn:"1d",
          });
          res.cookie("token",token,{
            // httpOnly:true,
            // secure:process.env.NODE_ENV === "production",
            // sameSite:"strict",
            // maxAge:24*60*60*1000,
          });
          res.status(200).json({
            message: "user logged in successfully",
            user:{
                id:user._id,
                username:user.username,
                email:user.email,
            },
            token,
          });   
    } catch (error) {
        res.status(500).json({
            message: "internal server error",
        });
    }
}

export const logoutController = async (req,res)=>{
    try {
        const token = req.cookies.token;
        if(token){
            // Add the token to the blacklist
            await blacklistModel.create({token});
            res.clearCookie("token");
            res.status(200).json({
                message:"user logged out successfully",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "internal server error",
        });
    }
}
export const getMeController = async (req,res)=>{
  try {
    const user = await userModel.findById(req.user.id).select("-password");
    if(!user){
        return res.status(404).json({
            message:"user not found",
        });
    }
    res.status(200).json({
        message:"user fetched successfully",
        user:{
          id:user._id,
          username:user.username,
          email:user.email,
        },
    });
  } catch (error) {
    return res.status(500).json({
        message:"internal server error",
    });
  }
}