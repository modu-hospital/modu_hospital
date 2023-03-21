const TokenService = require('../services/token.service');
const Validation = require('../lib/validation');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;

class TokenController {
    tokenService = new TokenService();
    validation = new Validation();

    // 프론트 로그인에 토큰 api 연결하기 전까지 주석 유지:)
    // 리프레시 토큰이 만료가 되면 로그아웃
    // refreshToken이 살아있고 accessToken만 만료시 api로 엑세스 토큰 새로만드는 기능
    // 미드웨어에서는 검증할때만
    newAccessToken = async (req, res) => {
        //엑세스 토큰이 만료 되었을 때(프론트에서 ajax로 Access Denied..에러가 날 때)
        //새로운 엑세스 토큰을 만드는 api(api/token)를
        //프론트에서 연결

        //res.cookie를 그니까 쿠키 저장하는걸 프론트에서 하자고해서 저장 안했음
        //그러면 프론트에서 헤더에 저장? 하고
        //이 토큰 api를 실행시켜서 refreshToken값을 가져오게 만들어야하는지

        //refreshToken verify 하려면 refreshToken이 필요한데
        // res.cookies 로 저장 안해줬는데 어떻게 refreshToken을 가져올지
        //가 아니라 일단 프론트 연결 해보기
        //프론트에서 로그인하는 api 연결하면 refreshToken이 넘어오는건가?...

        const refreshToken = req.cookies.refreshToken;
        //res.cookie 저장했음
        //userId를 파람스로 받아서 (로그인 시도한 userId 값으로)
        //유저 테이블에서 userId로 loginId 받아 오기

        const { userId } = req.params;

        if (!refreshToken) {
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            res.send('로그인 다시 하세요');
        }

        console.log('컨트롤러', refreshToken);
        const user = await this.tokenService.findUserId(userId);
        console.log(user)

        console.log(user.loginId);

        const refreshTokenVerify = jwt.verify(refreshToken, JWT_SECRET_KEY);
        console.log(refreshTokenVerify);
        if (refreshTokenVerify) {
            const newAccessToken = jwt.sign({ loginId: user.loginId }, process.env.JWT_SECRET_KEY, {
                expiresIn: '10',
            });
            return res.json({ newAccessToken });
        } else {
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            res.send('로그인 다시 하세요');
        }

        res.status(200).json({ message: 'newAccessToken 발급 성공' });
    };
}

module.exports = TokenController;

//auth에서 토큰 존재 유무, 검증, 재발급,
