const RefreshTokenRepository = require('../repositories/refreshToken.repository');
const {Refreshtoken} = require('../models/refreshtoken')

class RefreshTokenService {
    refreshTokenRepository = new RefreshTokenRepository(Refreshtoken);

    createToken = async (userId, token) => {
        return await this.refreshTokenRepository.createRefreshToken(userId, token)
    }

}

module.exports = RefreshTokenService;
