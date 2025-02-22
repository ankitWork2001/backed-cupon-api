import jwt from "jsonwebtoken";
import User from "../models/User.js";
export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    req.body.email = decoded.email;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server error" });
  }
};

export const checkAdmin = async (req, res, next) => {
  const email = req.body.email;
  const user = await User.findOne({email});
    if(user.role === 'admin'){
        next();
    }
    else{
        res.status(403).json({message:"User not authorised"});
    }
};
