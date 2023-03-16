const TokenRepository = require('../repositories/token.repository');
const { RefreshToken, User } = require('../models');
class TokenService {
    tokenRepository = new TokenRepository(User, RefreshToken);
    findUserId = async (userId) => {
        console.log('서비스서비스서비스서비스', userId);

        // if (!refreshToken) {
        //     res.clearCookie('accessToken');
        //     res.clearCookie('refreshToken');
        //     res.send('로그인 다시 하세요');
        // }

        // const refreshTokenVerify = jwt.verify(refreshToken, JWT_SECRET_KEY);

        // if (refreshTokenVerify) {
        //     const newAccessToken = jwt.sign({ loginId: user.loginId }, process.env.JWT_SECRET_KEY, {
        //         expiresIn: '10',
        //     });
        //     return res.json({ newAccessToken });
        // } else {
        //     res.clearCookie('accessToken');
        //     res.clearCookie('refreshToken');
        //     res.send('로그인 다시 하세요');
        // }

        return await this.tokenRepository.findUserId(userId);
    };
}

module.exports = TokenService;
