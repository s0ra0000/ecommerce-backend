const bcrypt = require("bcrypt");

const generateSalt = async () => {
    const salt = await bcrypt.genSalt(10);
    return salt;
};

const hashPassword = async (password, salt) => {
    return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

module.exports = { generateSalt, hashPassword, comparePassword };
