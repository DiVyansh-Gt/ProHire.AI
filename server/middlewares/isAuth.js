import jwt from "jsonwebtoken"


const isAuth = async (req,res,next) => {
    try {
        let {token} = req.cookies
        console.log("🔍 Auth Check - Cookies received:", req.cookies);
        console.log("🔍 Auth Check - Token:", token ? "Present" : "Missing");

        if(!token){
            const authHeader = req.headers.authorization || "";
            token = authHeader.startsWith("Bearer ") ? authHeader.replace("Bearer ", "") : null;
        }

        if(!token){
            return res.status(401).json({message:"user does not have a token"})
        }

        const verifyToken = jwt.verify(token , process.env.JWT_SECRET)
        
        if(!verifyToken){
            return res.status(401).json({message:"user does not have a valid token"})
        }
        req.userId = verifyToken.userId
        console.log("✅ Auth Check - User ID:", req.userId);

        next()
   

    } catch (error) {
        console.error("❌ Auth Check Error:", error.message);
        return res.status(500).json({message:`isAuth error ${error.message}`})
    }
    
}

export default isAuth