const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;
const { User, RefreshToken } = require('../models');

const authMiddleware = async (req, res, next) => {
    const { accessToken, refreshToken } = req.cookies;

    //토큰 존재 확인
    if (!accessToken || !refreshToken) { //다시 로그인해서 토큰 재발급
        return {message:"로그인 다시 해주세요"}
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

    // access 검증 후, expired 만료시
    // 만료가 되면 재발급

    //accessTokenValidate.message === 'jwt expired'
    //이렇게 하니까 에러는 안 뜨는데 payload 콘솔에 안찍힘
    //아래처럼 해야 토큰만료됬을때? 토큰 만료 에러가 안뜨고 payload도 잘 찍힘
    if (!accessTokenValidate) {
        
        //1.refreshToken 가져오기?
        //db에 저장된 token 가져와야
        const getRefreshToken = await RefreshToken.findOne({ where: { token: refreshToken } });

        // console.log('getRefreshToken', { getRefreshToken });

        // //2.refreshToken이 없으면 //accessToken과 refreshToken 모두 만료 상태? 
        if (!getRefreshToken) {
            return res.send({message:"로그인 다시 해주세요"}); //다시 로그인해서 토큰 재발급
        }

        // 3.db에서 가져온 refreshToken이랑 현재 refreshToken이랑 다르면?? //이것도 로그인 다시 해야...?
        if (getRefreshToken.token !== refreshToken) {
            return next();
            // res.send({"message":"refresh토큰 다름"})
        }

        // //4. refreshToken 검증 //refresh토큰이 있는 경우
        const refreshTokenValidate = validateRefresh(refreshToken);

        function validateRefresh(refreshToken) {
            try {
                const vertify = jwt.verify(refreshToken, JWT_SECRET_KEY);
                return vertify;
            } catch (err) {
                return false;
            }
        }

        // console.log(refreshTokenValidate.loginId)

        //5. refreshToken 만료시
        // //res.send가 아니고 message만 보내주고 싶을때?
        if (!refreshTokenValidate) { //access 만료, refresh만료 로그인으로 토큰 재발급
            return next() //로그인 다시 하세요

            // return true
        }

        
        return next();
    }

    //있다면 payload를 출력해주는
    const payload = jwt.verify(accessToken, JWT_SECRET_KEY);

    console.log('##############payload', payload);

    //access토큰이 있다면

    //7.
    console.log('#############loginId', { loginId }); //안 찍힘
    const user = await User.findOne({ where: { loginId } });
    console.log('유저유저유저유저user', user); //안 찍힘

    console.log("@@@@@@@@@user.userId", user.userId) 
    //안 찍힘

    res.locals.user = user.userId;
    // console.log('res.locals.user', res.locals.user);


    return next();
}

module.exports = authMiddleware;
