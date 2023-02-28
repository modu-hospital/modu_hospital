const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY } = process.env;

const authMiddleware = async (req, res, next) => {
    const { authorization = '' } = req.headers;
};
