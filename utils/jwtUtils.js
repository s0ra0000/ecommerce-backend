const jwt = require("jsonwebtoken");

const generateToken = (user, role) => {
    return jwt.sign(
        {
            role,
            userId: user._id,
            username: user.username,
        },
        process.env.SECRET_KEY,
        {
            expiresIn: "1d",
        },
    );
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
        throw new Error("Invalid token");
    }
};

module.exports = { generateToken, verifyToken };
