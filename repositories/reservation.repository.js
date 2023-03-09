const { where, or, op, QueryTypes } = require('sequelize');
const { sequelize } = require('../models');
const db = require('../models');

class ReservationRepository {
    constructor(reservationModel) {
        this.reservationModel = reservationModel;
    }
    findReservationById = async (id) => {
        const reservation = await this.reservationModel.findOne({ where: { id } });
        return reservation;
    };

    // findReservationsByUserId = async (userId) => {
    //     const query = `SELECT h.name as hospitalName ,d.name as doctorName, d.image as doctorImage, r.date,r.id,r.status FROM reservations AS r
    //     inner join doctors AS d on r.doctorId =d.doctorId
    //     inner join hospitals AS h on d.hospitalId = h.hospitalId
    //     WHERE r.userId = ${userId}`;

    //     const reservations = await sequelize.query(query, { type: QueryTypes.SELECT });
    //     return reservations;
    // };
    getApprovedReservation = async (userId, page) => {
        const query = `
        SELECT h.name as hospitalName ,d.name as doctorName, d.image as doctorImage, r.date,r.id,r.status from reservations as r 
        inner join doctors as d on r.doctorId = d.doctorId
        inner join hospitals as h on d.hospitalId = h.hospitalId
        WHERE r.userId = ${userId} and r.status = "approved"
        ORDER BY r.date DESC
        LIMIT ${3 * (page - 1)}, ${page * 3};
        `;
        const approved = await sequelize.query(query, { type: QueryTypes.SELECT });
        return approved;
    };
    getWaitingReservation = async (userId, page) => {
        const query = `
        SELECT h.name as hospitalName ,d.name as doctorName, d.image as doctorImage, r.date,r.id,r.status from reservations as r 
        inner join doctors as d on r.doctorId = d.doctorId
        inner join hospitals as h on d.hospitalId = h.hospitalId
        WHERE r.userId = ${userId} and r.status = 'waiting'
        ORDER BY r.date DESC
        LIMIT ${3 * (page - 1)}, ${page * 3};
        `;
        const waiting = await sequelize.query(query, { type: QueryTypes.SELECT });
        return waiting;
    };
    getDoneOrReviewedReservation = async (userId, page) => {
        const query = `
        SELECT h.name as hospitalName ,d.name as doctorName, d.image as doctorImage, r.date,r.id,r.status from reservations as r 
        inner join doctors as d on r.doctorId = d.doctorId
        inner join hospitals as h on d.hospitalId = h.hospitalId
        WHERE r.userId = ${userId} and r.status = "done" or r.status = 'reviewed'
        ORDER BY r.date DESC
        LIMIT ${3 * (page - 1)}, ${page * 3};
        `;
        const doneOrReviewed = await sequelize.query(query, { type: QueryTypes.SELECT });
        return doneOrReviewed;
    };

    findHospitalByReservationId = async (reservationId) => {
        const query = `SELECT DISTINCT h.hospitalId, h.userId, h.name, h.address, h.phone, h.createdAt, h.updatedAt FROM reservations as r 
        inner join doctors as d on r.doctorId = d.doctorId 
        inner join hospitals as h on d.hospitalId  = h.hospitalId 
        WHERE r.id = ${reservationId}`;
        const hospitalIdAndUserId = await sequelize.query(query, { type: QueryTypes.SELECT });

        return hospitalIdAndUserId[0];
    };

    editReservationStatusById = async (id, status) => {
        const editedReservation = this.reservationModel.update(
            { status: status },
            { where: { id: id } }
        );
        return editedReservation;
    };
    createReview = async (reservationId, hospitalId, userId, star, contents) => {
        const review = db.Review.create({
            hospitalId,
            userId,
            star,
            contents,
        });
        const reviewedReservation = this.reservationModel.update(
            {
                status: 'reviewed',
            },
            { where: { id: reservationId } }
        );

        return review;
    };
}

module.exports = ReservationRepository;
