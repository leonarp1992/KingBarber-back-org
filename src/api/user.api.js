import { Router } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";
import bcrypt, { hash } from "bcrypt";

const userApi = Router();

userApi.get('/', async (req, res) => {
  try {
    const users = await User.find();
    return res.json({success: true, users})
  } catch (error) {
    res.status(500).json({success: false, message: error});
  }
});

userApi.get('/barbers', async (req, res) => {
  const withService = req.query;
  if(withService){
    try {
      const users = await User.find({rol: 'barber'}).populate("services");
      return res.json({success: true, users})
    } catch (error) {
      res.status(500).json({success: false, message: error});
    }
  }else{
    try {
      const users = await User.find({rol: 'barber'});
      return res.json({success: true, users})
    } catch (error) {
      res.status(500).json({success: false, message: error});
    }
  }
});

userApi.post('/create', async (req, res) => {
  try {
    const {name, email, password} = req.body;
    
    let user = await User.findOne({email});
    console.log({user});
    if (user) {
      return res.json({success: false, message: 'Email no disponible'});
    }
    const salt = await bcrypt.genSalt(10);
    const password1 = await bcrypt.hash(password, salt);
    user = new User({name, email, password:password1, rol:"user"});
    await user.save();
    jwt.sign(JSON.stringify(user), config.JWT_SECRET, {}, (error, token)=>{
      if(error){
        throw error;
      }else{
        return res.json({success: true, user, token}); 
      }
    });
  } catch (error) {
    res.status(500).json({success: false, message: error});
    console.log(error)
  }
});

userApi.post('/createBarber', async (req, res) => {
  try {
    const {name, email, password, services} = req.body;
    
    let user = await User.findOne({email});
    console.log({user});
    if (user) {
      return res.json({success: false, message: 'Email no disponible'});
    }
    user = new User({name, email, password, rol: 'barber', services});
    await user.save();
    return res.json({success: true, user});
  } catch (error) {
    res.status(500).json({success: false, message: error});
  }
});

userApi.post('/delete', async (req, res) => {
  try {
    const {email} = req.body;
    
    let user = await User.findOne({email});
    console.log({user});
    if (user) {
      return res.json({success: false, message: 'Email no disponible'});
    }
    await user.delete();
    return res.json({success: true, user});
  } catch (error) {
    res.status(500).json({success: false, message: error});
  }
});


export default userApi;