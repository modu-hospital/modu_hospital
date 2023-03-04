const { where, Op } = require('sequelize');
const { sequelize } = require('../models');

class HospitalRepository {
    constructor(
        ReservationModel,
        HospitalModel,
        ReviewsModel,
        DoctorModel,
        CategoryModel,
        DoctorCategoryMappingModel
    ) {
        this.reservationModel = ReservationModel;
        this.hospitalModel = HospitalModel;
        this.reviewsModel = ReviewsModel;
        this.doctorModel = DoctorModel;
        this.categoryModel = CategoryModel;
        this.doctorCategoryMappingModel = DoctorCategoryMappingModel;
    }

    //예약관리 조회

    //병원페이지 전체 예약관리 조회

    findAllReservation = async () => {
        try {
            const data = await this.reservationModel.findAll({
                attributes: {
                    include: [
                        'id',
                        [
                            sequelize.fn('DATE_FORMAT', sequelize.col('date'), '%Y-%m-%d %H:%i:%s'),
                            'date',
                        ],
                        [
                            sequelize.fn(
                                'DATE_FORMAT',
                                sequelize.col('updatedAt'),
                                '%Y-%m-%d %H:%i:%s'
                            ),
                            'updatedAt',
                        ],
                        [
                            sequelize.fn(
                                'DATE_FORMAT',
                                sequelize.col('createdAt'),
                                '%Y-%m-%d %H:%i:%s'
                            ),
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
        try {
            const hospitals = await this.hospitalModel.findAll({
                where: {
                    longitude: { [Op.between]: longitude },
                    latitude: { [Op.between]: latitude },
                },
                attributes: ['hospitalId', 'address'],
            });
            return hospitals;
        } catch (err) {
            throw err;
        }
    };

    // 화면 위치 기준 병원 정보
    findNearHospitalsInfo = async (longitude, latitude) => {
        try {
            const hospitals = await this.hospitalModel.findAll({
                where: {
                    longitude: { [Op.between]: longitude },
                    latitude: { [Op.between]: latitude },
                },
                attributes: ['name', 'address', "phone"],
                include: [
                    {
                        model: this.doctorModel,
                        as: 'doctors',
                        attributes: ['name'],
                        include: [
                            {
                                model: this.doctorCategoryMappingModel,
                                as: 'doctorCategoryMappings',
                                include: [
                                    {
                                        model: this.categoryModel,
                                        as: 'categories',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });
            return hospitals;
        } catch (err) {
            throw err;
        }
    };

    // id 값에 해당하는 병원 정보
    searchHospitalInfo = async (id) => {
        try {
            return await this.hospitalModel.findByPk(id, {
                include: [
                    {
                        model: this.doctorModel,
                        as: 'doctors',
                        attributes: ['name', "image"],
                        include: [
                            {
                                model: this.doctorCategoryMappingModel,
                                as: 'doctorCategoryMappings',
                                include: [
                                    {
                                        model: this.categoryModel,
                                        as: 'categories',
                                        attributes: ['department'],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });
        } catch (err) {
            throw err;
        }
    };
}

module.exports = HospitalRepository;
