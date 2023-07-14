const {
    registerAdmin,
    updateAdmin,
    deleteAdmin,
    loginAdmin,
    getAdmin,
    getAdminById,
    resetPassword,
} = require("../../../controllers/adminController");

const { authenticateAdmin } = require("../../../plugins/auth");

module.exports = function (fastify, options, next) {
    fastify.post("/", { preHandler: authenticateAdmin }, registerAdmin);
    fastify.post("/login", loginAdmin);
    fastify.get("/find", { preHandler: authenticateAdmin }, getAdmin);
    fastify.get("/find/:id", { preHandler: authenticateAdmin }, getAdminById);
    fastify.put("/:id", { preHandler: authenticateAdmin }, updateAdmin);
    fastify.delete("/:id", { preHandler: authenticateAdmin }, deleteAdmin);
    fastify.put("/reset/:id", { preHandler: authenticateAdmin }, resetPassword);
    next();
};
