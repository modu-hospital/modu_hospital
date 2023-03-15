const TokenRepository = require('../repositories/token.repository');
const { RefreshToken, User } = require('../models');
class TokenService {
    tokenRepository = new TokenRepository(User, RefreshToken);
    findUserId = async (userId) => {
        console.log('서비스서비스서비스서비스', userId);

        return await this.tokenRepository.findUserId(userId);
    };
}

module.exports = TokenService;
