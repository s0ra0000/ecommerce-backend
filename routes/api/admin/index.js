const {
    registerAdmin,
    updateAdmin,
    deleteAdmin,
    loginAdmin,
    getAdmin,
    getAdminById,
    resetPassword,
} = require("../../../controllers/adminContoller");

const auth = require("../../../plugins/auth");

module.exports = function (fastify, options, next) {
    fastify.post("/", { preHandler: auth }, registerAdmin);
    fastify.post("/login", loginAdmin);
    fastify.get("/find", { preHandler: auth }, getAdmin);
    fastify.get("/find/:id", { preHandler: auth }, getAdminById);
    fastify.put("/:id", { preHandler: auth }, updateAdmin);
    fastify.delete("/:id", { preHandler: auth }, deleteAdmin);
    fastify.put("/reset/:id", { preHandler: auth }, resetPassword);
    next();
};
