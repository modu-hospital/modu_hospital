const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;
const { User, RefreshToken } = require('../models');

const authMiddleware = async (req, res, next) => {
    let { accessToken, refreshToken } = req.cookies;

    if (!accessToken || !refreshToken) {
        return next();
    }

    //accessToken 검증
    const accessTokenValidate = validateAccess(accessToken);
    function validateAccess(accessToken) {
        try {
            const vertify = jwt.verify(accessToken, JWT_SECRET_KEY);
            return vertify;
        } catch (err) {
            return false;
        }
    }

    //refreshToken 검증
    const refreshTokenValidate = validateRefresh(refreshToken);

    function validateRefresh(refreshToken) {
        try {
            const vertify = jwt.verify(refreshToken, JWT_SECRET_KEY);
            return vertify;
        } catch (err) {
            return false;
        }
    }

    if (!refreshTokenValidate) {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return next();
    }

    if (!accessTokenValidate) {
        const { userId } = await RefreshToken.findOne({
            where: { token: refreshToken },
        });

        const token = userId;

        accessToken = jwt.sign(token, JWT_SECRET_KEY);
    }
    const { userId } = accessTokenValidate;

    const user = await User.findByPk(userId);

    res.locals.user = user;

    next();
};
module.exports = authMiddleware;
