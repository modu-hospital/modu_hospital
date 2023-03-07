const { where, or, op, QueryTypes } = require('sequelize');
const { sequelize } = require('../models');
const db = require('../models');

class UserRepository {
    constructor(UserModel) {
        this.userModel = UserModel;
    }

    findUserById = async (userId) => {
        const user = await db.User.findOne({
            where: { userId: userId },
        });
        return user;
    };

    editUserProfile = async (userId, address, phone, name) => {
        const editedProfile = await db.User.update(
            {
                address: address,
                phone: phone,
                name: name,
            },
            {
                where: { userId: userId },
            }
        );
        return editedProfile;
    };

    signup = async (name, loginId, password, phone, idNumber, role) => {
        return await this.userModel.create({ name, loginId, password, phone, idNumber, role });
    };

    findUser = async (loginId) => {
        return await this.userModel.findOne({ where: { loginId } });
    };

    findUserRole = async () => {
        return await this.userModel.findAll({ where: { role } });
    };

    // (관리자) all 유저 조회
    findUsers = async () => {
        const users = await this.userModel.findAll({});
        return users;
    };

    // (관리자) role별 유저 조회
    findRoleUsers = async (role) => {
        const roleUsers = await this.userModel.findAll({ where: { role } });
        return roleUsers;
    };

    emailPasswordCheck = async (loginId) => {
        return await this.userModel.findAll({ where: { loginId } });
    };
}

module.exports = UserRepository;
