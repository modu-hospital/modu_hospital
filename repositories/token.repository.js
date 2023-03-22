class TokenRepository {
    constructor(UserModel, RefreshTokenModel) {
        this.userModel = UserModel;
        this.refreshTokenModel = RefreshTokenModel;
    }

    findUserId = async (userId) => {
        return await this.userModel.findOne({ where: { userId } });
    };

    findToken = async (token) => {
        return await this.refreshTokenModel.findOne({ where: {token}})
    }
}

module.exports = TokenRepository;
