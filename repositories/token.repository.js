const { where, or, op, QueryTypes } = require('sequelize');
const { sequelize } = require('../models');

class TokenRepository {
    constructor(UserModel, RefreshTokenModel) {
        this.userModel = UserModel;
        this.refreshTokenModel = RefreshTokenModel;
    }

    findUserId = async (loginId) => {
        return await this.userModel.findOne({ where: { loginId } });
    };
}

module.exports = TokenRepository;
