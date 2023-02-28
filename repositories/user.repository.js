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

        const query = `SELECT h.name as hospitalName ,d.name as doctorName, r.date,r.id,r.status  FROM reservations AS r 
        inner join doctors AS d on r.doctorId =d.doctorId
        inner join hospitals AS h on d.hospitalId = d.hospitalId 
        
        `
        const reservations = sequelize.query(query, {type:QueryTypes.SELECT})
        return reservations;
    };

    signup = async (name, phone, loginId, password, idNumber) => {
        return await this.userModel.create({name, phone, loginId, password, idNumber})
    }

    findUser = async (loginId) => {
        return await this.userModel.findAll({where: {loginId}})
    }


}

module.exports = UserRepository;
