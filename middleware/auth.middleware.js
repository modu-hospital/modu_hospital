const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;
const { User } = require('../models');

// 로그인 성공시 res.locals.user = user
const authMiddleware = async (req, res, next) => {
    // let tokenObject = {};

    // const accessToken = req.cookies.accessToken;
    // const refreshToken = req.cookies.refreshToken;

    // if (!refreshToken) next(); //return res.status(400).json({"message":"refreshToken 없음"})
    // if (!accessToken) next(); //return res.status(400).json({"message":"accessToken 없음"})

    // const accessTokenValidate = validateAccess(accessToken);
    // const refreshTokenValidate = validateRefresh(refreshToken);

    // console.log(accessTokenValidate);
    // console.log(refreshTokenValidate);

    // if (!refreshTokenValidate) return res.status(419).json({ message: 'refresh토큰이 만료됨' });

    // if (!accessTokenValidate) {
    //     const accessTokenId = tokenObject[refreshToken];
    //     if (!accessTokenId) return res.status(419).json({ message: 'refresh 토큰 없음' });

    //     //accessToken이 있다면 refresh 재발급
    //     const newAccessToken = jwt.sign({ accessTokenId }, JWT_SECRET_KEY, { expiresIn: '7d' });
    //     res.cookies('accessToken', newAccessToken);
    //     return res.json({ message: 'accessToken 새로 발급함' });
    // }

    // const { id } = getAccessTokenPayload(accessToken);

    // console.log(payload)

    // return res.json({ message: `${id}의 payload를 가진 token 인증 완료` });

    // function validateAccess(accessToken) {
    //     try {
    //         jwt.verify(accessToken, JWT_SECRET_KEY);
    //         return true;
    //     } catch (err) {
    //         return false;
    //     }
    // }

    // function validateRefresh(refreshToken) {
    //     try {
    //         jwt.verify(refreshToken, JWT_SECRET_KEY);
    //         return true;
    //     } catch (err) {
    //         return false;
    //     }
    // }

    // function getAccessTokenPayload(accessToken) {
    //     try {
    //         const payload = jwt.verify(accessToken, JWT_SECRET_KEY); //jwt에서 payload를 가져옴
    //         return payload; //loginId가 담겨있음
    //     } catch (error) {
    //         return null;
    //     }
    // }

    // let tokenObject = {};

    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    // tokenObject[refreshToken] = loginId

    if (!refreshToken) return res.status(400).json({"message":"refreshToken 없음"});  //next();
    if (!accessToken) return res.status(400).json({ "message": 'accessToken 없음' }); // next();


    const accessTokenValidate =  jwt.verify(accessToken, JWT_SECRET_KEY,  function(err, decoded) {
        if (err) {
            
            const newAccessToken = jwt.sign({ accessToken }, JWT_SECRET_KEY, { expiresIn: '10s' });
            console.log(jwt.verify(newAccessToken, JWT_SECRET_KEY))
            res.cookie('accessToken', newAccessToken);
            return newAccessToken
            
        }
        
      });
      console.log(refreshToken)
    const refreshTokenValidate = jwt.verify(refreshToken, JWT_SECRET_KEY, function(err, decoded) {
        console.log("err", err)
        if (err) {

            console.log(refreshToken)
            
            const newrefreshToken = jwt.sign({ refreshToken }, JWT_SECRET_KEY, { expiresIn: '7d' });
            res.cookie('refreshToken', newrefreshToken);
            return newrefreshToken;
        }

        return refreshToken
    });
    
    // console.log('accessTokenValidate', accessTokenValidate);
    // console.log('refreshTokenValidate', refreshTokenValidate);

    if (!refreshTokenValidate) return res.status(419).json({ message: 'refresh토큰이 만료됨' });

    
    const token = jwt.verify(accessTokenValidate, JWT_SECRET_KEY);

    // console.log(jwt.verify(accessToken, JWT_SECRET_KEY));

    if (!accessTokenValidate) {
        // const accessTokenId = tokenObject[refreshToken];
        if (!refreshToken) return res.status(419).json({ message: 'refresh 토큰 없음' });

        //accessTokenId이 있다면 accessToken 새로 발급
        
    }

    const user = await User.findOne({ where: { loginId } });

    if (user) {
        res.locals.user = user;
    } else {
        return res.json({ message: '없는 유저 회원가입 하세요' });
    }

    return res.json({ message: `${loginId}의 payload를 가진 token 인증 완료` });

    if (err.name === 'TokenExpiredError') {
        return 
    }

};

module.exports = authMiddleware;
