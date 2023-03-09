const RefreshTokenService = require('../services/refreshToken.service');
const Validation = require('../lib/validation');

class RefreshTokenController {
    refreshTokenService = new RefreshTokenService();
    validation = new Validation();

    createToken = async (req, res) => {
        //서버에 저장되어 있는 쿠키를 db에 저장???

        console.log(res.locals.user)
        const token = req.cookies.refreshtoken;
        console.log('refresh', token);

        //현재 로그인되어 있는 아이디와 일치한 userId 저장
        // const {id: userId} = res.locals

        // console.log('payload', payload)
        //payload에 loginId 값 = res.locals.user
        //=> jwt.verify(token, JWT_SECRET_KEY).loginId

        const userId = res.locals.user
        
        // console.log('userId', userId);

        await this.refreshTokenService.createToken(userId, token);

        res.json({"message":"토큰 컨트롤러"},userId, token);

        //auth에서 토큰은 있는데 accessTokenValidate 없음
        //유효성 검사사
    };
}

module.exports = RefreshTokenController;

//auth에서 토큰 존재 유무, 검증, 재발급,

// access token과 refresh token의 존재 유무를 체크합니다.
// access token 검증 -> expired여야 함.
// access token 디코딩하여 user의 정보를 가져옵니다.
// 디코딩 결과가 없으면 권한이 없음을 응답.
