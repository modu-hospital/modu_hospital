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

    signup = async (name, phone, loginId, password, idNumber, role) => {
        return await this.userModel.create({ name, phone, loginId, password, idNumber, role });
    };

    findUser = async (loginId) => {
        return await this.userModel.findOne({ loginId });
    };

    findUserRole = async (role) => {
        return await this.userModel.findAll({ where: { role } });
    };

    findAllUser = async () => {
        return await this.userModel.findAll({});
    };

    userDeleteOne = async (userId) => {
        return await this.userModel.destroy({ where: { userId } });
    };

    findUserId = async (userId) => {
        const a = await this.userModel.findOne({ where: { userId } });
        console.log(a);
        return a;
    };

    // emailPasswordCheck = async (loginId) => {
    //     return await this.userModel.findAll({ where: { loginId } });
    // };
}

module.exports = UserRepository;
