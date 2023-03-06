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

    // (관리자) role = "deleted" 가 아닌 all 유저 조회
    findUsers = async () => {
        const allUserList = await this.userModel.findAll({});
        const filterList = await allUserList.filter((obj) => obj.role !== 'deleted');
        return filterList;
    };

    // (관리자) role 변경 (삭제 또는 수정)
    userRoleUpdate = async (userId, role) => {
        const userRoleUpdate = await this.userModel.update(
            {
                role: role,
            },
            {
                where: { userId },
            }
        );
        return userRoleUpdate;
    };
}

module.exports = UserRepository;
