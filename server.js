const server = require("fastify")({ logger: true });
const mongoose = require("mongoose");
const path = require("path");
const autoload = require("@fastify/autoload");
require("dotenv").config();
server.register(autoload, {
    dir: path.join(__dirname, "./", "/routes"),
    maxDepth: 12,
});
const startServer = async () => {
    try {
        await mongoose.connect(`${process.env.CONNECT_DB}`);
        server.log.info("Connected to MongoDB");
        server.listen({ port: process.env.PORT });
        server.log.info("Server started");
    } catch (err) {
        server.log.error(err);
    }
};

startServer();
