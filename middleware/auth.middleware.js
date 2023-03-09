const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;
const { User, RefreshToken } = require('../models');

// 로그인 성공시 res.locals.user = user
const authMiddleware = async (req, res, next) => {
    const { accessToken, refreshToken } = req.cookies;

    //토큰 존재 확인

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

    ////검증 후, expired 만료시
    // 만료가 되면 재발급
    // if(!accessTokenValidate) {
    //     const payload = jwt.verify(accessToken, JWT_SECRET_KEY) //accessToken에 payload에 loginId가져오고 싶음
    //     console.log(payload)

    // }
    //accessTokenValidate.message === 'jwt expired'
    //이렇게 하니까 에러는 안 뜨는데 payload 콘솔에 안찍힘
    //아래처럼 해야 토큰만료됬을때? 토큰 만료 에러가 안뜨고 payload도 잘 찍힘
    if (!accessTokenValidate) {
        const payload = jwt.verify(accessToken, JWT_SECRET_KEY, { ignoreExpiration: true });

        console.log('payload', payload);

        //1.refreshToken 가져오기?
        //db에 저장된 token 가져와야
        const getRefreshToken = await RefreshToken.findOne({ where: { token: refreshToken } });

        console.log('getRefreshToken', { getRefreshToken });

        // //2.refreshToken이 없으면
        if (!getRefreshToken) {
            return next(); //??
        }

        // //3.서버에서 가져온 refreshToken이랑 현재 refreshToken이랑 다르면??
        // //db에서 가져온 refreshToken이랑 현재 refreshToken이랑 다르면??
        if (getRefreshToken.token !== refreshToken) {
            return next();
            // res.send({"message":"refresh토큰 다름"})
        }

        // //4. refreshToken 검증
        const refreshTokenValidate = validateRefresh(refreshToken);

        ////검증 후, expired 만료시
        // 만료가 되면 재발급
        // if(!accessTokenValidate) {
        //     const payload = jwt.verify(accessToken, JWT_SECRET_KEY) //accessToken에 payload에 loginId가져오고 싶음
        //     console.log(payload)

        // }
        //accessTokenValidate.message === 'jwt expired'
        //이렇게 하니까 에러는 안 뜨는데 payload 콘솔에 안찍힘
        //아래처럼 해야 토큰만료됬을때? 토큰 만료 에러가 안뜨고 payload도 잘 찍힘
        if (!accessTokenValidate) {
            const payload = jwt.verify(accessToken, JWT_SECRET_KEY, { ignoreExpiration: true });

            console.log('payload', payload);

            //1.refreshToken 가져오기?
            //db에 저장된 token 가져와야
            const getRefreshToken = await RefreshToken.findOne({ where: { token: refreshToken } });

            console.log('getRefreshToken', { getRefreshToken });

            // //2.refreshToken이 없으면
            if (!getRefreshToken) {
                return next(); //??
            }

            // //3.서버에서 가져온 refreshToken이랑 현재 refreshToken이랑 다르면??
            // //db에서 가져온 refreshToken이랑 현재 refreshToken이랑 다르면??
            if (getRefreshToken.token !== refreshToken) {
                return next();
                // res.send({"message":"refresh토큰 다름"})
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
            if (!refreshTokenValidate) {
                return { message: 'refreshToken 만료' };

                // return true
            }

            //6. 새로운 accessToken 생성
            const { loginId } = payload;
            const newAccessToken = jwt.sign({ payload }, JWT_SECRET_KEY, { expiresIn: '10s' });

            //7.회원 유무
            console.log('loginId', { loginId });
            const user = await User.findOne({ where: { loginId } });
            console.log('user', user);

            if (!user) {
                throw new Error('없는 회원');
            }

            res.locals.user = user.userId;
            console.log('res.locals.user', res.locals.user);

            //새로 발급한 accessToken 쿠키로 보내기
            res.cookie('accessToken', newAccessToken);
            return next();
        }

        //access토큰이 있다면
        const { loginId } = payload;
        const user = await User.findOne({ where: { loginId } });
        if (!user) {
            throw new Error('없는 회원');
        }

        return next();
    }
};
module.exports = authMiddleware;
