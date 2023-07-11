const jwt = require("../utils/jwtUtils");

const authenticateAdmin = (req, res, done) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            const decodedToken = jwt.verifyToken(token);
            if (!decodedToken || decodedToken.role !== "admin") {
                return res.status(401).send({
                    message: "Invalid token",
                });
            }
            done();
        } else {
            return res.status(401).send({
                message: "Unauthorized",
            });
        }
    } catch (err) {
        return res.status(500).send(err);
    }
    done();
};

const authenticateUser = (req, res, done) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            const decodedToken = jwt.verifyToken(token);
            if (!decodedToken || decodedToken.role !== "user") {
                return res.status(401).send({
                    message: "Invalid token",
                });
            }
            done();
        } else {
            return res.status(401).send({
                message: "Unauthorized",
            });
        }
    } catch (err) {
        return res.status(500).send(err);
    }
    done();
};

module.exports = { authenticateAdmin, authenticateUser };
