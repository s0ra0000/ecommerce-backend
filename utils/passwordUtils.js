const crypto = require("crypto");

const generateSalt = () => {
    return crypto.randomBytes(10).toString("hex");
};

const hashPassword = (password, salt) => {
    return crypto.pbkdf2Sync(password, salt.toString(), 1000, 64, "sha512").toString("hex");
};

const comparePassword = (password, hashedPassword, salt) => {
    const newHashedPassword = hashPassword(password, salt);
    return newHashedPassword === hashedPassword;
};

module.exports = { generateSalt, hashPassword, comparePassword };
