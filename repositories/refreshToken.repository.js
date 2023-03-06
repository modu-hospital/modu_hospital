const { where, or, op, QueryTypes } = require('sequelize');
const { sequelize } = require('../models');
const db = require('../models');

class RefreshTokenRepository {
    constructor(UserModel, RefreshTokenModel) {
        this.userModel = UserModel;
        this.refreshTokenModel = RefreshTokenModel
    }

    createRefreshToken = async(userId, token) => {
        return await this.refreshTokenModel.create({userId, token})
    }
}

module.exports = RefreshTokenRepository;
