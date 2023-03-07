const { where, or, op, QueryTypes } = require('sequelize');
const { sequelize } = require('../models');
const db = require('../models');

class UserRepository {
    constructor(UserModel, HospitalModel, DoctorModel) {
        this.userModel = UserModel;
        this.hospitalModel = HospitalModel;
        this.doctorModel = DoctorModel;
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

    // 회원삭제
    userDeleteOne = async (userId) => {
        return await this.userModel.destroy({ where: { userId } });
    };

    // 의사삭제
    doctorDeleteOne = async (doctorId) => {
        return await this.doctorModel.destroy({ where: { doctorId } });
    };

    // 병원삭제
    HospitalDeleteOne = async (userId) => {
        return await this.hospitalModel.destroy({ where: { userId } });
    };

    // emailPasswordCheck = async (loginId) => {
    //     return await this.userModel.findAll({ where: { loginId } });
    // };
}

module.exports = UserRepository;
