const { where, Op } = require('sequelize');
const { sequelize } = require('../models');

class HospitalRepository {
    constructor(ReservationModel, HospitalModel) {
        this.reservationModel = ReservationModel;
        this.hospitalModel = HospitalModel;
    }

    //병원페이지 전체 예약관리 조회
    findAllReservation = async () => {
        try {
            const data = await this.reservationModel.findAll({
                attributes: {
                    include: [
                        'id',
                        [
                            sequelize.fn('DATE_FORMAT', sequelize.col('date'),'%Y-%m-%d %H:%i:%s'),
                            'date',
                        ],
                        [
                            sequelize.fn('DATE_FORMAT', sequelize.col('updatedAt'),'%Y-%m-%d %H:%i:%s'),
                            'updatedAt', 
                        ],
                        [
                            sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'),'%Y-%m-%d %H:%i:%s'),
                            'createdAt', 
                        ],
                    ],
                },
            });
            return data;
        } catch (error) {
            throw new Error(error);
        }
    };

    //병원페이지 예약 승인대기 목록 불러오기
    getWaitedReservation = async (doctorId) => {
        try {
            const waitdata = await this.reservationModel.findAll({
                order: [['createdAt', 'DESC']],
                where: {
                    doctorId,
                    status: 'waiting'
                },
                attributes:{
                    include: [
                        'doctorId',
                        [
                            sequelize.fn('DATE_FORMAT', sequelize.col('date'),'%Y-%m-%d %H:%i:%s'),
                            'date',
                        ],
                        [
                            sequelize.fn('DATE_FORMAT', sequelize.col('updatedAt'),'%Y-%m-%d %H:%i:%s'),
                            'updatedAt', 
                        ],
                        [
                            sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'),'%Y-%m-%d %H:%i:%s'),
                            'createdAt', 
                        ],
                    ],
                }
            })
            return waitdata;
        } catch (error) {
            error.name = 'DB 에러',
            error.message = '해당 요청을 처리하지 못했습니다.',
            error.status = 400;
            throw error;
        }
    };

    //병원페이지 예약관리 날짜 변경
    editReservation = async (id, date) => {
        try {
            await this.reservationModel.update({ date}, { where: { id } });
            return { status: 200, success:true, message: '예약이 변경되었습니다.'}; 
        } catch (error) {
            throw new Error(error.message);
        }
    };

    //병원페이지 예약관리 승인하기
    approvedReservation = async (id, status) => {
        try {
            await this.reservationModel.update({ status }, { where: { id } });
            return { status: 200, success: true, message: '승인이 변경되었습니다.'}
        } catch (error) {
            throw new Error(error.message);
        }
    };
    

    //해당 예약이 존재하는지 찾기
    findOneReservation = async (id) => {
        try {
            const finddata = await this.reservationModel.findByPk(id);
            return finddata; 
        } catch (error) {
            error.name = 'DB 에러',
            error.message = '해당 요청을 처리하지 못했습니다.',
            error.status = 400;
            throw error;
        }
    } 

    //리뷰 조회

    //병원 정보 등록
    registerHospital = async (userId, name, address, phone, longitude, latitude) => {
        try {
            await this.hospitalModel.create({
                userId,
                name,
                address,
                phone,
                longitude,
                latitude,
            });
            return {
                status:200,
                success:true,
                message:'병원 등록을 하였습니다.',
            }
        } catch (error) {
             error.name = 'DB 에러',
             error.message = '해당 요청을 처리하지 못했습니다.',
             error.status = 400;
            throw error;
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
