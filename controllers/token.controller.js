const TokenService = require('../services/token.service');
const Validation = require('../lib/validation');
const jwt = require('jsonwebtoken');

class TokenController {
    tokenService = new TokenService();
    validation = new Validation();

    // 리프레시 토큰이 만료가 되면 로그아웃
    // api로 엑세스 토큰 새로만드는 기능 
    // 미드웨어에서는 검증할때만

    newAccessToken = async (req, res) => {

        const refreshToken = req.cookies.refreshToken
        if(!refreshToken) {
            res.send("로그인 다시 하세요")
        }

        console.log(refreshToken)

        // const user = await this.tokenService.findUserId(loginId)

        // const newAccessToken = jwt.sign({refreshToken}, process.env.JWT_SECRET_KEY)

//refreshToken이 아니라 현재 로그인이 된 id
        const newAccessToken = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY, (err, decode) => {
            if(err) {
                res.send("로그인 다시 하세요")
            } else {
                const newAccessToken = jwt.sign({loginId: user.loginId}, process.env.JWT_SECRET_KEY)
                //재발급할때 그냥 refreshToken으로 재발급하는지
                res.send(newAccessToken)
            }
        })
        res.status(200).json({"message":"newAccessToken 발급 성공", newAccessToken});
    };
}

module.exports = TokenController;

//auth에서 토큰 존재 유무, 검증, 재발급,

// access token과 refresh token의 존재 유무를 체크합니다.
// access token 검증 -> expired여야 함.
// access token 디코딩하여 user의 정보를 가져옵니다.
// 디코딩 결과가 없으면 권한이 없음을 응답.
