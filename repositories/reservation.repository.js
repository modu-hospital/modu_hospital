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
        const query = `
        SELECT h.name as hospitalName ,d.name as doctorName, d.image as doctorImage, r.date,r.id,r.status from reservations as r 
        inner join doctors as d on r.doctorId = d.doctorId
        inner join hospitals as h on d.hospitalId = h.hospitalId
        WHERE r.userId = ${userId} and r.status = "approved"
        ORDER BY r.date DESC
        LIMIT ${reservationsPerPage * (page - 1)}, ${page * reservationsPerPage};
        `;
        const approved = await this.sequelize.query(query, {
            type: this.sequelize.QueryTypes.SELECT,
        });
        return approved;
    };
    getWaitingReservation = async (userId, page) => {
        const reservationsPerPage = 3;
        const query = `
        SELECT h.name as hospitalName ,d.name as doctorName, d.image as doctorImage, r.date,r.id,r.status from reservations as r 
        inner join doctors as d on r.doctorId = d.doctorId
        inner join hospitals as h on d.hospitalId = h.hospitalId
        WHERE r.userId = ${userId} and r.status = 'waiting'
        ORDER BY r.date DESC
        LIMIT ${reservationsPerPage * (page - 1)}, ${page * reservationsPerPage};
        `;
        const waiting = await this.sequelize.query(query, {
            type: this.sequelize.QueryTypes.SELECT,
        });
        return waiting;
    };
    getDoneOrReviewedReservation = async (userId, page) => {
        const reservationsPerPage = 3;
        const query = `
        SELECT h.name as hospitalName ,d.name as doctorName, d.image as doctorImage, r.date,r.id,r.status from reservations as r 
        inner join doctors as d on r.doctorId = d.doctorId
        inner join hospitals as h on d.hospitalId = h.hospitalId
        WHERE r.userId = ${userId} and r.status = "done" or r.status = 'reviewed'
        ORDER BY r.date DESC
        LIMIT ${reservationsPerPage * (page - 1)}, ${page * reservationsPerPage};
        `;
        const doneOrReviewed = await this.sequelize.query(query, {
            type: this.sequelize.QueryTypes.SELECT,
        });
        return doneOrReviewed;
    };
    getCanceledReservation = async (userId, page) => {
        const reservationsPerPage = 3;
        const query = `
        SELECT h.name as hospitalName ,d.name as doctorName, d.image as doctorImage, r.date,r.id,r.status from reservations as r 
        inner join doctors as d on r.doctorId = d.doctorId
        inner join hospitals as h on d.hospitalId = h.hospitalId
        WHERE r.userId = ${userId} and r.status = 'canceled'
        ORDER BY r.date DESC
        LIMIT ${reservationsPerPage * (page - 1)}, ${page * reservationsPerPage};
        `;
        const doneOrReviewed = await this.sequelize.query(query, {
            type: this.sequelize.QueryTypes.SELECT,
        });
        return doneOrReviewed;
    };

    findHospitalByReservationId = async (reservationId) => {
        const query = `SELECT DISTINCT h.hospitalId, h.userId, h.name, h.address, h.phone, h.createdAt, h.updatedAt FROM reservations as r 
        inner join doctors as d on r.doctorId = d.doctorId 
        inner join hospitals as h on d.hospitalId  = h.hospitalId 
        WHERE r.id = ${reservationId}`;
        const hospitalIdAndUserId = await this.sequelize.query(query, {
            type: this.sequelize.QueryTypes.SELECT,
        });

        return hospitalIdAndUserId[0];
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
        selfwrite,
        name,
        idnumber,
        phone,
        address,
        reservationdate,
        reservationtime
    ) => {
        const registerData = await this.models.Reservation.create({
            doctorId: doctorId,
            userId: userId,
            relationship: relationship,
            selfwrite: selfwrite,
            name: name,
            idnumber: idnumber,
            phone: phone,
            address: address,
            reservationdate: reservationdate,
            reservationtime: reservationtime,
        });
        return registerData;
    };
}

module.exports = ReservationRepository;
