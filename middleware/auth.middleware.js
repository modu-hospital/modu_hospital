const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;
const { User, RefreshToken } = require('../models');
const createError = require('../lib/errors');

const authMiddleware = async (req, res, next) => {

    //쿠키를 가져온다
    let { accessToken, refreshToken } = req.cookies;

    //토큰 존재 확인
    //토큰이 없으면 로그인 되면 안됨 다시 로그인 버튼 누르게끔
    if (!accessToken || !refreshToken) {
        return next();
        // return {message:"로그인 다시 해주세요"}
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

    // refreshToken 만료시
    if (!refreshTokenValidate) {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return res.status(400).json({ message: 'refreshToken 만료' });
    }

    //accessToken만료시
    if (!accessTokenValidate) {
        // const err = await createError.TokenNotFound();
        // throw err;

        res.clearCookie('accessToken');

        return 
        //원래 코드 한줄만 있었음
        return res.status(401).json({ message: 'accessToken 만료' });

        //이 메세지값을 error.message, error.status===400
    }

  
    const { userId } = accessTokenValidate;

    const user = await User.findByPk(userId);

    res.locals.user = user;

    next();
};
module.exports = authMiddleware;
