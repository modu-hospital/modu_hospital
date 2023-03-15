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
        HospitalImageFileModel,
        WorkingTimeModel
    ) {
        this.reservationModel = ReservationModel;
        this.hospitalModel = HospitalModel;
        this.reviewsModel = ReviewsModel;
        this.doctorModel = DoctorModel;
        this.categoryModel = CategoryModel;
        this.doctorCategoryMappingModel = DoctorCategoryMappingModel;
        this.userModel = UserModel;
        this.hospitalImageFileModel = HospitalImageFileModel;
        this.workingTimeModel = WorkingTimeModel;
    }

    //병원페이지 예약 승인대기 목록 불러오기
    getWaitedReservation = async (hospitalId) => {
        try {
            const reservationdata = await this.hospitalModel.findAll({
                where: {
                    hospitalId,
                },
                paranoid: false,
                attributes: ['hospitalId', 'name'],
                include: [
                    {
                        model: this.doctorModel,
                        as: 'doctors',
                        attributes: ['doctorId', 'name'],
                        paranoid: false,
                        include: [
                            {
                                model: this.reservationModel,
                                as: 'reservations',
                                order: [['date', 'DESC']],
                                where: {
                                    status: 'waiting',
                                },
                                attributes: [
                                    'id',
                                    'name',
                                    'idNumber',
                                    'phone',
                                    'contents',
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
                                paranoid: false,
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

    //병원페이지 승인 확정 목록
    getapprovedReservation = async (hospitalId) => {
        try {
            const reservationdata = await this.hospitalModel.findAll({
                where: {
                    hospitalId,
                },
                paranoid: false,
                attributes: ['hospitalId', 'name'],
                include: [
                    {
                        model: this.doctorModel,
                        as: 'doctors',
                        attributes: ['doctorId', 'name'],
                        paranoid: false,
                        include: [
                            {
                                model: this.reservationModel,
                                as: 'reservations',
                                order: [['date', 'DESC']],
                                where: {
                                    status: 'approved',
                                },
                                attributes: [
                                    'id',
                                    'name',
                                    'idNumber',
                                    'phone',
                                    'contents',
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
                                paranoid: false,
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
                paranoid: false,
                attributes: ['hospitalId', 'name'],
                include: [
                    {
                        model: this.doctorModel,
                        as: 'doctors',
                        attributes: ['doctorId', 'name'],
                        paranoid: false,
                        include: [
                            {
                                model: this.reservationModel,
                                as: 'reservations',
                                order: [['date', 'DESC']],
                                attributes: [
                                    'id',
                                    'name',
                                    'idNumber',
                                    'phone',
                                    'contents',
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
                                paranoid: false,
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
            return updated;
        } catch (error) {
            throw new Error(error);
        }
    };

    // 병원페이지 승인하기
    approvedReservation = async (id, status) => {
        try {
            return await this.reservationModel.update({ status }, { where: { id } });
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
            throw new Error(error);
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
            return await this.hospitalModel.create({
                userId,
                name,
                address,
                phone,
                longitude,
                latitude,
            });
        } catch (error) {
            throw new Error(error);
        }
    };

    //병원 정보 수정
    registerEditHospital = async (userId, name, address, phone, longitude, latitude) => {
        try {
            return await this.hospitalModel.update(
                {
                    name,
                    address,
                    phone,
                    longitude,
                    latitude,
                },
                { where: { userId } }
            );
        } catch (error) {
            throw new Error(error);
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
            throw new Error(error);
        }
    };

    // 의사 정보 불러오기
    findAllDoctor = async (hospitalId) => {
        try {
            const findData = await this.doctorModel.findAll({
                where: { hospitalId },
            });
            return findData;
        } catch (error) {
            throw new Error(error);
        }
    };

    // 의사 한명 정보 불러오기
    findOneDoctor = async (doctorId) => {
        try {
            const findData = await this.doctorModel.findOne({
                where: { doctorId: doctorId },
            });
            return findData;
        } catch (error) {
            throw new Error(error);
        }
    };

    // 의사 등록하기
    registerdoctor = async (hospitalId, name, image, contents) => {
        try {
            return await this.doctorModel.create({ hospitalId, name, image, contents });
        } catch (error) {
            throw new Error(error);
        }
    };

    // 의사 수정하기
    editdoctor = async (doctorId, name, image, contents) => {
        try {
            return await this.doctorModel.update(
                { name, image, contents },
                { where: { doctorId } }
            );
        } catch (error) {
            throw new Error(error);
        }
    };

    // category 찾고 없으면 생성
    findOrCreate = async (department) => {
        try {
            const [categories, created] = await this.categoryModel.findOrCreate({
                where: { department },
            });
            return categories;
        } catch (error) {
            throw new Error(error);
        }
    };

    // doctor_categories_mappings => doctorId, categoryId 넣기
    categoriesInstance = async (mappings) => {
        await this.doctorCategoryMappingModel.bulkCreate(mappings);
    };

    // 의사일하는시간 넣기

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

    //map에서 병원을 클릭하면 나오는
    //hospitalId 값에 해당하는 병원 상세 정보
    getHospitalInfo = async (id) => {
        try {
            return await this.hospitalModel.findByPk(id, {
                include: [
                    {
                        model: this.hospitalImageFileModel,
                        as: 'hospitalImageFiles',
                    },
                    // {
                    //     model: this.reviewsModel,
                    //     as:'reviews',
                    //     include: [
                    //         {
                    //             model: this.userModel,
                    //             as: 'users',
                    //             attributes:['loginId']
                    //         }
                    //     ]
                    // },
                    {
                        model: this.doctorModel,
                        as: 'doctors',
                        paranoid: false,
                        required: false,
                        where: {
                            deletedAt: { [Op.lt]: 1 },
                        },
                        attributes: ['name', 'image', 'contents'],
                        include: [
                            {
                                model: this.workingTimeModel,
                                as: 'workingTimes',
                                attributes: ['dayOfTheWeek', 'startTime', 'endTime'],
                            },
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
    // hospitalId로 해당 병원하나 찝어서 => userId, name , address, phone 가져오기 ㅇ

    // hospitalId로 역인 hospitalImageFile 테이블 (hospitalId) 에서 => url, 가져오기 ㅇ

    // hospitalId로 역인 reviews테이블 (hospitalsId)에서 => star, contents 가져오기 ㅇ

    // hospitalId에 역인 doctor테이블에서(hospitalId)=> doctorId, name, image, contents 가져오기 o
    // doctorId로 역인 workingTime테이블 doctorId에서=> datOfTheWeek, startTime, endTime 가져오기 o

    // doctorId로 역인 mapping테이블 doctorId에서
    //=> categoryId 가져오기  #####다른 사람이 인크루드한거 참고하기
    // categoryId로 i역인 category테이블 id에서
    //=> department 가져오기  #####다른 사람이 인크루드한거 참고하기
}

module.exports = HospitalRepository;
