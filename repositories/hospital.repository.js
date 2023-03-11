const { where, Op, QueryTypes } = require('sequelize');
const { sequelize } = require('../models');

const formatterdDate = '%Y-%m-%d %H:%i'; // %Y-%m-%d %H:%i:%s => 원하는 날짜 형식 바꾸기

class HospitalRepository {
    constructor(
        ReservationModel,
        HospitalModel,
        ReviewsModel,
        DoctorModel,
        CategoryModel,
        DoctorCategoryMappingModel,
        UserModel,
        HospitalImageFileModel
    ) {
        this.reservationModel = ReservationModel;
        this.hospitalModel = HospitalModel;
        this.reviewsModel = ReviewsModel;
        this.doctorModel = DoctorModel;
        this.categoryModel = CategoryModel;
        this.doctorCategoryMappingModel = DoctorCategoryMappingModel;
        this.userModel = UserModel;
        this.hospitalImageFileModel = HospitalImageFileModel;
    }

    //병원페이지 예약 승인대기 목록 불러오기
    getWaitedReservation = async (hospitalId) => {
        try {
            const reservationwaitdata = await this.hospitalModel.findAll({
                where: {
                    hospitalId,
                },
                attributes: ['hospitalId', 'name'],
                include: [
                    {
                        model: this.doctorModel,
                        as: 'doctors',
                        attributes: ['name', 'doctorId'],
                        include: [
                            {
                                model: this.reservationModel,
                                as: 'reservations',
                                where: {
                                    status: 'waiting',
                                },
                                order: [['date', 'DESC']],
                                attributes: {
                                    include: [
                                        'id',
                                        'name',
                                        'phone',
                                        'contents',
                                        'idNumber',
                                        'status',
                                        [
                                            sequelize.fn(
                                                'DATE_FORMAT',
                                                sequelize.col('date'),
                                                '%Y-%m-%d %H:%i'
                                            ),
                                            'date',
                                        ],
                                    ],
                                },
                            },
                        ],
                    },
                ],
            });
            return reservationwaitdata;
        } catch (error) {
            throw new Error(error);
        }
    };

    //병원페이지 승인 확정 목록
    getapprovedReservation = async (hospitalId) => {
        try {
            const reservationdata = await this.hospitalModel.findAll({
                where: {
                    hospitalId,
                },
                attributes: ['hospitalId', 'name'],
                include: [
                    {
                        model: this.doctorModel,
                        as: 'doctors',
                        attributes: ['name', 'doctorId'],
                        include: [
                            {
                                model: this.reservationModel,
                                as: 'reservations',
                                where: {
                                    status: 'approved',
                                },
                                attributes: {
                                    include: [
                                        'id',
                                        'name',
                                        'phone',
                                        'contents',
                                        'idNumber',
                                        'status',
                                        [
                                            sequelize.fn(
                                                'DATE_FORMAT',
                                                sequelize.col('date'),
                                                '%Y-%m-%d %H:%i'
                                            ),
                                            'date',
                                        ],
                                    ],
                                },
                            },
                        ],
                    },
                ],
            });
            return reservationdata;
        } catch (error) {
            throw new Error(error);
        }
    };

    //병원페이지 전체 예약관리 조회
    findAllReservation = async (hospitalId) => {
        try {
            const reservationdata = await this.hospitalModel.findAll({
                where: {
                    hospitalId,
                },
                attributes: ['hospitalId', 'name'],
                include: [
                    {
                        model: this.doctorModel,
                        as: 'doctors',
                        attributes: ['name', 'doctorId'],
                        include: [
                            {
                                model: this.reservationModel,
                                as: 'reservations',
                                order: [['date', 'DESC']],
                                attributes: {
                                    include: [
                                        'id',
                                        'name',
                                        'phone',
                                        'contents',
                                        'idNumber',
                                        'status',
                                        [
                                            sequelize.fn(
                                                'DATE_FORMAT',
                                                sequelize.col('date'),
                                                '%Y-%m-%d %H:%i'
                                            ),
                                            'date',
                                        ],
                                    ],
                                },
                            },
                        ],
                    },
                ],
            });
            return reservationdata;
        } catch (error) {
            throw new Error(error);
        }
    };

    //병원페이지 예약관리 날짜 수정
    editReservation = async (id, date) => {
        try {
            const updated = await this.reservationModel.update({ date }, { where: { id } });
            return { status: 200, success: true, message: '예약이 변경되었습니다.' };
        } catch (error) {
            throw new Error(error.message);
        }
    };

    // 병원페이지 승인하기
    approvedReservation = async (id, status) => {
        try {
            await this.reservationModel.update({ status }, { where: { id } });
            return { status: 200, success: true, message: '승인이 변경되었습니다.' };
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
            (error.name = 'DB 에러'),
                (error.message = '해당 요청을 처리하지 못했습니다.'),
                (error.status = 400);
            throw error;
        }
    };

    //리뷰 조회
    getAllreviews = async (hospitalId) => {
        try {
            const data = await this.userModel.findAll({
                attributes: ['userId', 'name'],
                include: [
                    {
                        where: { hospitalId },
                        model: this.reviewsModel,
                        as: 'reviews',
                        attributes: {
                            include: [
                                'contents',
                                'star',
                                [
                                    sequelize.literal(
                                        `DATE_FORMAT(reviews.createdAt, '${formatterdDate}')`
                                    ),
                                    'reviewCreatedAt',
                                ],
                            ],
                        },
                    },
                ],
            });
            return data;
        } catch (error) {
            throw new Error(error);
        }
    };

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
                status: 200,
                success: true,
                message: '병원 등록을 하였습니다.',
            };
        } catch (error) {
            (error.name = 'DB 에러'),
                (error.message = '해당 요청을 처리하지 못했습니다.'),
                (error.status = 400);
            throw error;
        }
    };

    //병원 정보 수정
    registerEditHospital = async (userId, name, address, phone, longitude, latitude) => {
        try {
            await this.hospitalModel.update(
                {
                    name,
                    address,
                    phone,
                    longitude,
                    latitude,
                },
                { where: { userId } }
            );
            return { status: 200, success: true, message: '병원 정보를 수정했습니다.' };
        } catch (error) {
            (error.name = 'DB 에러'),
                (error.message = '해당 요청을 처리하지 못했습니다.'),
                (error.status = 400);
            throw error;
        }
    };

    // 해당 병원 찾기
    findOneHospital = async (userId) => {
        try {
            const findData = await this.hospitalModel.findOne({
                where: { userId },
            });
            return findData;
        } catch (error) {
            (error.name = 'DB 에러'),
                (error.message = '해당 요청을 처리하지 못했습니다.'),
                (error.status = 400);
            throw error;
        }
    };

    // 의사 등록하기
    registerdoctor = async (hospitalId, name, image, contents) => {
           return await this.doctorModel.create({ hospitalId, name, image, contents });
    };

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
                attributes: ['hospitalId', 'name', 'address', 'phone'],
                include: [{ model: this.hospitalImageFileModel, as: 'hospitalImageFiles' }],
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
                    { model: this.hospitalImageFileModel, as: 'hospitalImageFiles' },
                    {
                        model: this.doctorModel,
                        as: 'doctors',
                        paranoid: false,
                        required: false,
                        where: {
                            deletedAt: { [Op.lt]: 1 },
                        },
                        attributes: ['name', 'image'],
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
