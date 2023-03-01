const { where, or, op, QueryTypes } = require('sequelize');
const { sequelize } = require('../models');
const db = require('../models');

class ReservationRepository {
    findReservationsByUserId = async (userId) => {
        const query = `SELECT h.name as hospitalName ,d.name as doctorName, r.date,r.id,r.status FROM reservations AS r 
        inner join doctors AS d on r.doctorId =d.doctorId
        inner join hospitals AS h on d.hospitalId = d.hospitalId`;

        const reservations = await sequelize.query(query, { type: QueryTypes.SELECT });
        return reservations;
    };

    findHospitalIdAndUserIdByReservationId = async (reservationid) => {
        const query = `SELECT DISTINCT h.hospitalId, r.userId  FROM reservations as r 
        inner join doctors as d on r.doctorId = d.doctorId 
        inner join hospitals as h on d.hospitalId  = h.hospitalId 
        `;
        const hospitalIdAndUserId = await sequelize.query(query, { type: QueryTypes.SELECT });

        return hospitalIdAndUserId[0];
    };

    cancelReservationById = async (id) => {
        const canceledReservation = db.Reservation.update(
            { status: 'canceled' },
            { where: { id: id } }
        );
        return canceledReservation;
    };
    createReview = async (reservationId, hospitalId, userId, star, contents) => {
        const review = db.Review.create({
            hospitalId,
            userId,
            star,
            contents,
        });
        const reviewedReservation = db.Reservation.update(
            {
                status: 'reviewed',
            },
            { where: { id: reservationId } }
        );

        return review;
    };
}

module.exports = ReservationRepository;
