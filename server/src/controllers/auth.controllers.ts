import User from "../models/user.model.ts"
import bcryptjs from "bcryptjs"
import { Response } from "express";
import jwtToken from "../utils/generateToken.ts"

export const signup = async (req: any, res: Response,) => {
    try {
      const { fullname, username, password, confirmPassword} = req.body;
  
      // cheking if the password and current password are equal or not
      if (password !== confirmPassword)
        return res.status(401).json({ error: "Password don't match" });
  
      // checking if the same username is exits in the database or not
      const user = await User.findOne({ username });
      if (user) return res.status(409).json("Username already exists")
  
      // encrypt password
      const salt = await bcryptjs.genSalt(10);
      const hashPassword = bcryptjs.hashSync(password, salt);
  
      // creating a new userdata
      const newUser = new User({
        fullname,
        username,
        password: hashPassword,
      });
  
      if (newUser) {
          
        // Generate jwt token
        jwtToken(newUser._id, res)
          
        // saving the userdata to the database
        await newUser.save();
  
        res.status(201).json({
          _id: newUser._id,
          fullname: newUser.fullname,
          username: newUser.username,
        });
      }else{
          res.status(400).json({error: "Invalid user data"})
      }
    } catch (error: any) {
      console.log("Error in SignUp: ", error.message);
      res.status(500).json({ Error: "Internal server error" });
    }
  };
  
  export const login = async (req: any, res: Response) => {
  
      try {
          const {username, password} = req.body
          const user = await User.findOne({username});
          const checkPassword = await bcryptjs.compare(password, user?.password || "");
  
          if(!user || !checkPassword) return res.status(400).json({error: "Wrong credentials"})
  
            jwtToken(user._id, res);
  
          res.status(200).json({
              _id: user._id,
              fullname: user.fullname,
              username: user.username,
          })
  
      } catch (error:any) {
          console.log("Error in Login : ", error.message);
          res.status(500).json({ Error: "Internal Server Error" })
      }
  
  };
  
  export const logout = async (req:any, res: Response) => {
      try {
          res.cookie("jwt", "", {maxAge:0});
          res.status(200).json({response: "Logged out sucessfully"})
      } catch (error: any) {
          console.log("Error in Logout : ", error.message);
          res.status(500).json({ Error: "Internal Server Error" })
      }
  };
  