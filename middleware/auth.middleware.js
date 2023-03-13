const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;
const { User, RefreshToken } = require('../models');

const authMiddleware = async (req, res, next) => {

    try{
        //쿠키를 가져온다
        const { accessToken, refreshToken } = req.cookies;

        //토큰 존재 확인
        if (!accessToken || !refreshToken) { //다시 로그인해서 토큰 재발급
            return next()
            // return {message:"로그인 다시 해주세요"} //next()
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

        // //4. refreshToken 검증
        const refreshTokenValidate = validateRefresh(refreshToken);
        function validateRefresh(refreshToken) {
            try {
                const vertify = jwt.verify(refreshToken, JWT_SECRET_KEY);
                return vertify;
            } catch (err) {
                return false;
            }
        }

         //5. refreshToken 만료시
        // //res.send가 아니고 message만 보내주고 싶을때?
        if (!refreshTokenValidate) { //access 만료, refresh만료 로그인으로 토큰 재발급
            res.clearCookie('accessToken')
            res.clearCookie('refreshToken')
            return next() //로그인 다시 하세요

            // return true
        }     

        // access 검증 후, expired 만료시
        // 만료가 되면 재발급

        //accessTokenValidate.message === 'jwt expired'
        //이렇게 하니까 에러는 안 뜨는데 payload 콘솔에 안찍힘
        //아래처럼 해야 토큰만료됬을때? 토큰 만료 에러가 안뜨고 payload도 잘 찍힘
        if (!accessTokenValidate) {
            // //2.refreshToken이 없으면 //accessToken과 refreshToken 모두 만료 상태? 
            // refreshToken payload loginId가져다가  없으면 쿠키 지우고 다시 로그인

            //리프레시 토큰의 userId의 페이로드.loginId값
            const getrefreshToken = await RefreshToken.findOne({where: {token: refreshToken}})
            console.log(getrefreshToken)
            //현재로그인이 된 아이디 값고 refreshToken에 들어있는 아이디 값은 refreshToken
            //payload의loginId가 현재 로그인된 loginId

            if(!getrefreshToken) {
                res.clearCookie('accessToken')
                res.clearCookie('refreshToken')
                return next() //다시 로그인
            }
            if(getrefreshToken !== refreshToken) {
                res.clearCookie('accessToken')
                res.clearCookie('refreshToken')
                return next() //다시 로그인
            }

            //refreshToken이 있으면 재발급 ..token controller로 알아서 이동하는지..
            return next()
        }

        //있다면 payload를 출력해주는
        const payload = jwt.verify(accessToken, JWT_SECRET_KEY);

        console.log('##############payload', payload);

        //7.
        const user = await User.findOne({ where: { loginId } });
        console.log('유저유저유저유저user', user); //안 찍힘

        console.log("@@@@@@@@@user.userId", user.userId) 
        //안 찍힘

        res.locals.user = user.userId;
        // console.log('res.locals.user', res.locals.user);
    } catch(err) {
        res.cookie('accessToken', '')
        res.cookie('refreshToken', '')
        next(err)
    }
}

module.exports = authMiddleware;
