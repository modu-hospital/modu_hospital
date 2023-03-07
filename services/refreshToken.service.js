const RefreshTokenRepository = require('../repositories/refreshToken.repository');
const { Refreshtoken } = require('../models/refreshtoken');

class RefreshTokenService {
    refreshTokenRepository = new RefreshTokenRepository(Refreshtoken);

    createToken = async (userId, token) => {
        const user = await this.refreshTokenRepository.findUserId(userId);
        return await this.refreshTokenRepository.createRefreshToken(user, token);
    };
}

module.exports = RefreshTokenService;
