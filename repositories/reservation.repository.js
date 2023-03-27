const { Op } = require('sequelize');

class ReservationRepository {
    constructor(sequelize) {
        this.models = sequelize.models;
        this.sequelize = sequelize;
    }
    findReservationById = async (id) => {
        const reservation = await this.models.Reservation.findByPk(id);
        return reservation;
    };

    getApprovedReservation = async (userId, page) => {
        const reservationsPerPage = 3;
        const approved = await this.models.Reservation.findAll({
            attributes: [
                [this.sequelize.col('doctors->hospitals.hospitalId'), 'hospitalId'],
                [this.sequelize.col('doctors->hospitals.name'), 'hospitalName'],
                [this.sequelize.col('doctors.name'), 'doctorName'],
                [this.sequelize.col('doctors.image'), 'doctorImage'],
                'date',
                'id',
                'status',
            ],
            include: [
                {
                    paranoid: false,
                    model: this.models.Doctor,
                    as: 'doctors',
                    attributes: [],
                    include: [
                        {
                            paranoid: false,
                            model: this.models.Hospital,
                            as: 'hospitals',
                            attributes: [],
                        },
                    ],
                },
            ],
            where: { userId, status: 'approved' },
            order: [['date', 'DESC']],
            limit: reservationsPerPage,
            offset: reservationsPerPage * (page - 1),
        });
        return approved;
    };
    getWaitingReservation = async (userId, page) => {
        const reservationsPerPage = 3;
        const waiting = await this.models.Reservation.findAll({
            attributes: [
                [this.sequelize.col('doctors->hospitals.hospitalId'), 'hospitalId'],
                [this.sequelize.col('doctors->hospitals.name'), 'hospitalName'],
                [this.sequelize.col('doctors.name'), 'doctorName'],
                [this.sequelize.col('doctors.image'), 'doctorImage'],
                'date',
                'id',
                'status',
            ],
            include: [
                {
                    paranoid: false,
                    model: this.models.Doctor,
                    as: 'doctors',
                    attributes: [],
                    include: [
                        {
                            paranoid: false,
                            model: this.models.Hospital,
                            as: 'hospitals',
                            attributes: [],
                        },
                    ],
                },
            ],
            where: { userId, status: 'waiting' },
            order: [['date', 'DESC']],
            limit: reservationsPerPage,
            offset: reservationsPerPage * (page - 1),
        });
        return waiting;
    };
    getDoneOrReviewedReservation = async (userId, page) => {
        const reservationsPerPage = 3;
        const doneOrReviewed = await this.models.Reservation.findAll({
            attributes: [
                [this.sequelize.col('doctors->hospitals.hospitalId'), 'hospitalId'],
                [this.sequelize.col('doctors->hospitals.name'), 'hospitalName'],
                [this.sequelize.col('doctors.name'), 'doctorName'],
                [this.sequelize.col('doctors.image'), 'doctorImage'],
                'date',
                'id',
                'status',
            ],
            include: [
                {
                    paranoid: false,
                    model: this.models.Doctor,
                    as: 'doctors',
                    attributes: [],
                    include: [
                        {
                            paranoid: false,
                            model: this.models.Hospital,
                            as: 'hospitals',
                            attributes: [],
                        },
                    ],
                },
            ],
            where: {
                userId: userId,
                [Op.or]: [{ status: 'done' }, { status: 'reviewed' }],
            },
            order: [['date', 'DESC']],
            limit: reservationsPerPage,
            offset: reservationsPerPage * (page - 1),
        });
        return doneOrReviewed;
    };
    getCanceledReservation = async (userId, page) => {
        const reservationsPerPage = 3;
        const doneOrReviewed = await this.models.Reservation.findAll({
            attributes: [
                [this.sequelize.col('doctors->hospitals.hospitalId'), 'hospitalId'],
                [this.sequelize.col('doctors->hospitals.name'), 'hospitalName'],
                [this.sequelize.col('doctors.name'), 'doctorName'],
                [this.sequelize.col('doctors.image'), 'doctorImage'],
                'date',
                'id',
                'status',
            ],
            include: [
                {
                    paranoid: false,
                    model: this.models.Doctor,
                    as: 'doctors',
                    attributes: [],
                    include: [
                        {
                            paranoid: false,
                            model: this.models.Hospital,
                            as: 'hospitals',
                            attributes: [],
                        },
                    ],
                },
            ],
            where: { userId, status: 'canceled' },
            order: [['date', 'DESC']],
            limit: reservationsPerPage,
            offset: reservationsPerPage * (page - 1),
        });
        return doneOrReviewed;
    };

    findHospitalByReservationId = async (reservationId) => {
        // const query = `SELECT DISTINCT h.hospitalId, h.userId, h.name, h.address, h.phone, h.createdAt, h.updatedAt FROM reservations as r
        // inner join doctors as d on r.doctorId = d.doctorId
        // inner join hospitals as h on d.hospitalId  = h.hospitalId
        // WHERE r.id = ${reservationId}`;
        const hospital = await this.models.Reservation.findByPk(reservationId, {
            attributes: [
            [this.sequelize.col('doctors->hospitals.hospitalId'), 'hospitalId'],
            [this.sequelize.col('doctors->hospitals.userId'), 'userId'],
            [this.sequelize.col('doctors->hospitals.name'), 'name'],
            [this.sequelize.col('doctors->hospitals.address'), 'address'],
            [this.sequelize.col('doctors->hospitals.phone'), 'phone'],
            [this.sequelize.col('doctors->hospitals.createdAt'), 'createdAt'],
            [this.sequelize.col('doctors->hospitals.updatedAt'), 'updatedAt'],
        ],
            include: [
                {
                    model: this.models.Doctor,
                    as: 'doctors',
                    paranoid: false,
                    attributes: [],
                    include: [
                        {
                            model: this.models.Hospital,
                            as: 'hospitals',
                            paranoid: false,
                            attributes: [
                                'hospitalId',
                                'userId',
                                'name',
                                'address',
                                'phone',
                                'createdAt',
                                'updatedAt',
                            ],
                        },
                    ],
                },
            ],
        });
        return hospital;
    };

    editReservationStatusById = async (id, status) => {
        const editedReservation = this.models.Reservation.update(
            { status: status },
            { where: { id: id } }
        );
        return editedReservation;
    };
    createReview = async (reservationId, hospitalId, userId, star, contents) => {
        const review = this.models.Review.create({
            hospitalId,
            userId,
            star,
            contents,
        });
        const reviewedReservation = this.models.Reservation.update(
            {
                status: 'reviewed',
            },
            { where: { id: reservationId } }
        );

        return review;
    };

    reservaionInputData = async (
        doctorId,
        userId,
        relationship,
        name,
        phone,
        reservationdate,
        contents,
        idnumber,
        status,
        proxyName,
        address
    ) => {
        const registerData = await this.models.Reservation.create({
            doctorId: doctorId,
            userId: userId,
            relationship: relationship,
            name: name,
            phone: phone,
            date: reservationdate,
            contents: contents,
            idNumber: idnumber,
            status: status,
            proxyName: proxyName,
            address: address,
        });
        return registerData;
    };
}

module.exports = ReservationRepository;
