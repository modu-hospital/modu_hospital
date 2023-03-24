const { where, Op, QueryTypes } = require('sequelize');
const { sequelize } = require('../models');

const formatterdDate = '%Y-%m-%d %H:%i';

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

    editReservation = async (id, date) => {
        try {
            const updated = await this.reservationModel.update({ date }, { where: { id } });
            return updated;
        } catch (error) {
            throw new Error(error);
        }
    };

    approvedReservation = async (id, status) => {
        try {
            return await this.reservationModel.update({ status }, { where: { id } });
        } catch (error) {
            throw new Error(error.message);
        }
    };

    findOneReservation = async (id) => {
        try {
            const finddata = await this.reservationModel.findByPk(id);
            return finddata;
        } catch (error) {
            throw new Error(error);
        }
    };

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

    registerImagehospital = async (url) => {
        try {
            const ImageFile = await this.hospitalImageFileModel.bulkCreate(url);
            return ImageFile;
        } catch (error) {
            throw new Error(error);
        }
    };

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

    registerdoctor = async (hospitalId, name, image, contents) => {
        try {
            return await this.doctorModel.create({ hospitalId, name, image, contents });
        } catch (error) {
            throw new Error(error);
        }
    };

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

    categoriesInstance = async (mappings) => {
        await this.doctorCategoryMappingModel.bulkCreate(mappings);
    };

    createWorkingTime = async (workigtime) => {
        const data = await this.workingTimeModel.bulkCreate(workigtime);
        return data;
    };

    // 화면 위치 기준 병원 찾기
    findNearHospitals = async (rightLongitude, rightLatitude, leftLongitude, leftLatitude) => {
        try {
            const hospitals = await this.hospitalModel.findAll({
                where: {
                    longitude: {
                        [Op.and]: [{ [Op.gte]: leftLongitude }, { [Op.lte]: rightLongitude }],
                    },
                    latitude: {
                        [Op.and]: [{ [Op.gte]: leftLatitude }, { [Op.lte]: rightLatitude }],
                    },
                },
                attributes: ['hospitalId', 'address'],
            });
            return hospitals;
        } catch (err) {
            throw err;
        }
    };

    // 화면 위치 기준 병원 정보
    findNearHospitalsInfo = async (rightLongitude, rightLatitude, leftLongitude, leftLatitude) => {
        try {
            const hospitals = await this.hospitalModel.findAll({
                where: {
                    longitude: {
                        [Op.and]: [{ [Op.gte]: leftLongitude }, { [Op.lte]: rightLongitude }],
                    },
                    latitude: {
                        [Op.and]: [{ [Op.gte]: leftLatitude }, { [Op.lte]: rightLatitude }],
                    },
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
                        required: false,
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

    //hospitalId 값에 해당하는 병원 상세 정보
    getHospitalInfo = async (id) => {
        try {
            return await this.hospitalModel.findByPk(id, {
                include: [
                    {
                        model: this.hospitalImageFileModel,
                        as: 'hospitalImageFiles',
                    },
                    {
                        model: this.doctorModel,
                        as: 'doctors',
                        paranoid: false,
                        required: false,
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

    //병원별 리뷰조회
    findReview = async (hospitalId) => {
        try {
            return await this.reviewsModel.findAll({
                where: { hospitalId },
                include: [
                    {
                        model: this.userModel,
                        attributes: ['name'],
                        as: 'users',
                    },
                ],
            });
        } catch (err) {
            throw err;
        }
    };
}

module.exports = HospitalRepository;
