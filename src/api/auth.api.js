import { Router } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config";

const authApi = Router();

authApi.post('/', async (req, res) => {
    try {
      const {email, password} = req.body
      const user = await User.findOne({email});
      if(!user){
        return res.json({success: false, message:'Email o contraseña incorrecta'});
      }else{
            const isMatch = await bcrypt.compare(password, user.password )
            if(!isMatch){
                return res.json({success: false, message:'Email o contraseña incorrecta'});
            }
            jwt.sign(JSON.stringify(user), config.JWT_SECRET, {}, (error, token)=>{
                if(error){
                  throw error;
                }else{
                  return res.json({success: true, user, token}); 
                
                }
            })
        }
    } catch (error) {
      res.status(500).json({success: false, message: error});
      console.log(error)
    }
  });

export default authApi;