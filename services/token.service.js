const TokenRepository = require('../repositories/token.repository');
const { Refreshtoken } = require('../models/refreshtoken');

class TokenService {
    tokenRepository = new TokenRepository(Refreshtoken);

    findUserId = async (loginId) => {
        return await this.tokenRepository.findUserId(loginId);
    };
}

module.exports = TokenService;
