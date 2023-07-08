const jwt = require("jsonwebtoken")

const generateToken = (payload) => {
    return jwt.sign(payload,process.env.SECRET_KEY);
}

const verifyToken = (token) => {
    try{
        return jwt.verify(token,process.env.SECRET_KEY);
    }
    catch(err){
        throw new Error("Invalid token");
    }
}

module.exports = {generateToken,verifyToken};