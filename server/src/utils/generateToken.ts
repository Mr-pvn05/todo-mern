import Jwt from "jsonwebtoken";

const generatetokenAndSetCookie = (userId: any, res:any) => {
    const token = Jwt.sign({userId}, process.env.JWT_SECRET as any, {expiresIn: '7d'});
    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 100,
        httpOnly: true,
        sameSite: "strict"
    })
}

export default generatetokenAndSetCookie;