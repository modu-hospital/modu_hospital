const TokenRepository = require('../repositories/token.repository');
const { User, RefreshToken } = require('../models');
class TokenService {
    tokenRepository = new TokenRepository(User, RefreshToken);
    findUserId = async (userId) => {
        return await this.tokenRepository.findUserId(userId);
    };

    findToken = async (refreshToken) => {
        return await this.tokenRepository.findToken(refreshToken);
    };
}

module.exports = TokenService;
