const { where, Op } = require('sequelize');
const { sequelize } = require('../models');

class HospitalRepository {
    constructor(ReservationModel, HospitalModel) {
        this.reservationModel = ReservationModel;
        this.hospitalModel = HospitalModel;
    }

    findHospitalIdAndUserIdByReservationId = async(reservationid) => {
        const query = `SELECT h.hospitalId, r.userId  FROM reservations as r 
        inner join doctors as d on r.doctorId = d.doctorId 
        inner join hospitals as h on d.hospitalId  = h.hospitalId 
        `
        const hospitalIdAndUserId = await sequelize.query(query, { type: QueryTypes.SELECT });

        return hospitalIdAndUserId
    }

    //예약관리 조회
    findAllReservation = async () => {
        try {
            const data = await this.reservationModel.findAll({
                attributes: {
                    include: [
                        'id',
                        [
                            sequelize.fn('DATE_FORMAT', sequelize.col('date'), '%d-%m-%Y %H:%i:%s'),
                            'date',
                        ],
                    ],
                },
            });
            return data;
        } catch (error) {
            throw new Error(error);
        }
    };

    //예약관리 수정
    editReservation = async (id, date, status) => {
        try {
            const updated = await this.reservationModel.update({ date, status }, { where: { id } });
            if (updated) {
                const updateReservation = await this.reservationModel.findByPk(id);
                return updateReservation;
            }
            throw new Error('Reservation not found');
        } catch (error) {
            throw new Error(error.message);
        }
    };

    //예약관리 삭제
    deleteReservation = async (id) => {
        try {
            const deleted = await this.reservationModel.destroy({ where: { id } });
            if (deleted) {
                return true;
            }
            throw new Error('Reservation not Found');
        } catch (error) {
            throw new Error(error);
        }
    };

    //예약 승인대기 목록 불러오기
    getWaitedReservation = async () => {
        try {
            const waitdata = await this.reservationModel.findByPk(id);
            return waitdata;
        } catch (error) {
            throw new Error(error);
        }
    };

    //리뷰 조회

    //병원 정보 등록
    registerHospital = async (userId, name, address, phone, location) => {
        try {
            const hospitaldata = await this.hospitalModel.create({
                userId,
                name,
                address,
                phone,
                location,
            });
            return hospitaldata;
        } catch (error) {
            throw new Error(error);
        }
    };

    //병원 정보 수정

    // 화면 위치 기준 병원 찾기
    findNearHospitals = async (longitude, latitude) => {
        const hospitals = await this.hospitalModel.findAll({
            where: { longitude: { [Op.between]: longitude }, latitude: { [Op.between]: latitude } },
        });
        return hospitals;
    };
}

module.exports = HospitalRepository;
