class TokenRepository {
    constructor(UserModel, RefreshTokenModel) {
        this.userModel = UserModel;
        this.refreshTokenModel = RefreshTokenModel;
    }

    findUserId = async (userId) => {
        return await this.userModel.findOne({ where: { userId } });
    };
}

module.exports = TokenRepository;
