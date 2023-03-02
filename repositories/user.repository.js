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

    findReservationsByUserId = async (userId) => {
        const query = `SELECT h.name as hospitalName ,d.name as doctorName, r.date,r.id,r.status FROM reservations AS r 
        inner join doctors AS d on r.doctorId =d.doctorId
        inner join hospitals AS h on d.hospitalId = d.hospitalId`;

        const reservations = await sequelize.query(query, { type: QueryTypes.SELECT });
        return reservations;
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

    findUsers = async () => {
        const users = await this.userModel.findAll({});
        return users;
    };
}

module.exports = UserRepository;
