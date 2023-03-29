const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;
const { User, RefreshToken } = require('../models');
const createError = require('../lib/errors');
const TokenController = require('../controllers/token.controller');

tokenController = new TokenController();
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

    // access 검증 후, expired 만료시
    // 만료가 되면 재발급
    if (!accessTokenValidate) {
        //accessToken만료시

        console.log('accessToken 만료시간: ', new Date(Date.now()));
        console.log('accessToken :', accessToken, 'refreshToken :', refreshToken) 

        // return res.status(400).json({ message: 'accessToken 만료' });
        //만료시 에러를 받고
        //프론트에서 accessToken토큰만료에러시 토큰 API로 newAccessToken 발급
        //리프래시 토큰이 있다면...위에서 이미 없다면 재로그인 하게끔해둠

        // const token = await RefreshToken.findAll({ where: { userId: user.userId } })
        // //refreshToken에서 해당userId 찾기=> 로 token.token
        // //userId를 어디서 가져올껀지
        // //발급된 refreshToken의 조건으로 token를 찾는 그래서 그 해당하는 토큰의 id값과 userId 등..다 가지고 올 수 있는거

        const { userId } = refreshTokenValidate;

        const user = await User.findByPk(userId);

        const newAccessToken = jwt.sign(
            { userId: user.userId },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '10s',
            }
        );
        
        res.cookie('accessToken', newAccessToken, {
            secure: false,
            httpOnly: false,
        });

        res.locals.user = user;

        next()
        return;

        // return res.status(401).json({ message: 'accessToken 만료' });
        // return (window.location.href = '/');
        // res.clearCookie('accessToken');
        // return res.render('');
        // res.status(401).json({ message: 'accessToken 만료' });
        // return await this.tokenController.newAccessToken()

        //이 메세지값을 error.message, error.status===401
        // const newAccessToken = await tokenController.newAccessToken(req, res);
        // return newAccessToken;
    }

    //수정한것(수정안할지도)
    const { userId } = accessTokenValidate;

    const user = await User.findByPk(userId);

    res.locals.user = user;

    
    next();
};
module.exports = authMiddleware;
