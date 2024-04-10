import jwt, { JwtPayload } from "jsonwebtoken"
import User from "../models/user.model.ts";
import { Response } from "express";

const protectRoute = async (req: any, res: Response, next: any) => {

    try {
        const token = req.cookies.jwt;

        if(!token) return res.status(401).json({error: "Unauthorized - No token Provided"});

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

        if(!decoded) return res.status(401).json({error: "Unauthorized - Invalid token"})

        const user = await User.findById(decoded.userId).select("-password");  // Select all fields except password

        if(!user) return res.status(401).json({error: "User not found"});

        req.user = user;

        next();

    } catch (error: any) {
        console.log("Error in protect route : ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

export default protectRoute;