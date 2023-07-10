const Admin = require("../models/Admin");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/jwtUtils");
const { generateSalt, hashPassword, comparePassword } = require("../utils/passwordUtils");

const registerAdmin = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const createdBy = decoded.username;
        const modifiedBy = createdBy;
        const salt = await generateSalt();
        const hash = await hashPassword(req.body.password, salt);
        await Admin.create({ ...req.body, hash, salt, createdBy, modifiedBy });
        return res.status(200).send({ message: "Successfully registered!" });
    } catch (err) {
        return res.status(500).send(err);
    }
};
const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin.findOne({ username: username });
        const token = generateToken(admin, "admin");
        if (await comparePassword(password, admin.hash)) {
            return {
                ...admin._doc,
                token,
            };
        } else {
            throw new Error("Invalid password");
        }
    } catch (err) {
        return res.status(500).send(err);
    }
};
const updateAdmin = async (req, res) => {
    try {
        const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
        if (isValidId) {
            const validId = new mongoose.Types.ObjectId(req.params.id);
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const modifiedBy = decoded.username;
            const updatedAdmin = await Admin.findByIdAndUpdate(validId, { ...req.body, modifiedBy });
            if (!updatedAdmin) {
                return res.status(404).send({ message: "Admin not found" });
            }
            return res.status(200).send({ message: "Successfully updated!", qweqwe: req.params.id });
        } else {
            return res.status(404).send("Invalid ID");
        }
    } catch (err) {
        return res.status(500).send(err);
    }
};
const deleteAdmin = async (req, res) => {
    try {
        const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
        if (isValidId) {
            const validId = new mongoose.Types.ObjectId(req.params.id);
            if (await Admin.findByIdAndDelete(validId)) {
                return res.status(200).send({ message: "Successfully deleted" });
            } else {
                return res.status(404).send({ message: "Admin not found" });
            }
        } else {
            return res.status(404).send("Invalid ID");
        }
    } catch (err) {
        return res.status(500).send(err);
    }
};

const getAdmin = async (req, res) => {
    try {
        const admins = await Admin.find().sort({ username: 1 });
        return res.status(200).send(admins);
    } catch (err) {
        return res.status(500).send(err);
    }
};

const getAdminById = async (req, res) => {
    try {
        const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
        if (isValidId) {
            const validId = new mongoose.Types.ObjectId(req.params.id);
            const admin = await Admin.findById(validId);
            if (!admin) {
                return res.status(404).send({ message: "Admin not found" });
            }
            return res.status(200).send({ ...admin._doc });
        } else {
            return res.status(404).send("Invalid ID");
        }
    } catch (err) {
        return res.status(500).send(err);
    }
};

const resetPassword = async (req, res) => {
    try {
        const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
        if (isValidId) {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const modifiedBy = decoded.username;
            const validId = new mongoose.Types.ObjectId(req.params.id);
            const { newPassword } = req.body;
            const salt = await generateSalt();
            const hash = await hashPassword(newPassword, salt);

            const updatedAdmin = await Admin.findByIdAndUpdate(validId, { salt, hash, modifiedBy });

            if (!updatedAdmin) {
                return res.status(404).send("Not found");
            }
            return res.status(200).send("Password reset successfully");
        }
    } catch (err) {
        return res.status(500).send(err);
    }
};

module.exports = { registerAdmin, loginAdmin, updateAdmin, deleteAdmin, getAdmin, getAdminById, resetPassword };
