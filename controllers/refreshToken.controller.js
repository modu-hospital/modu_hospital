const RefreshTokenService = require('../services/refreshToken.service');
const Validation= require('../lib/validation');

class RefreshTokenController {
    refreshTokenService = new RefreshTokenService();
    validation = new Validation()

    createToken = async(req, res)=> {
        // userId => ...res.local.user에서?
        // re

        const token = req.cookie.refreshToken

        const {id: userId} = res.locals.user

        await this.refreshTokenService.createToken(userId, token)
    }

}

module.exports = RefreshTokenController;

//auth에서 토큰 존재 유무, 검증, 재발급, 

// access token과 refresh token의 존재 유무를 체크합니다.
 // access token 검증 -> expired여야 함.
 // access token 디코딩하여 user의 정보를 가져옵니다.
  // 디코딩 결과가 없으면 권한이 없음을 응답.