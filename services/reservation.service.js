const ReservationRepository = require('../repositories/reservation.repository');
const CreateError = require('../lib/errors');
const {sequelize} = require('../models')

class ReservationService {
    reservationRepository = new ReservationRepository(sequelize)
    createError = new CreateError();

    cancelReservation = async (id) => {
        const reservation = await this.reservationRepository.findReservationById(id);
        if (reservation.status == 'done' || reservation.status == 'reviewed') {
            const err = await this.createError.reservationAlreadyDone(); 
            throw err
        }
        if (reservation.status == 'canceled') {
            const err = await this.createError.reservationAlreadyCanceled();
            throw err;
        }
        //추가예정 : token의 userId와 reservation.userId가 일치하는지 확인
        const canceledReservation = await this.reservationRepository.editReservationStatusById(
            id,
            'canceled'
        );
        return canceledReservation;
    };

    createReview = async (reservationId, star, contents) => {
        const reservation = await this.reservationRepository.findReservationById(reservationId);
        if (reservation.status === 'reviewed') {
            const err = this.createError.reviewAlreadyCreated();
            throw err;
        }
        if (reservation.status != 'done') {
            const err = this.createError.reservationStatusIsNotDone();
            throw err;
        }
        //추가예정 : token의 userId와 reservation.userId가 일치하는지 확인
        const hospital = await this.reservationRepository.findHospitalByReservationId(
            reservationId
        );
        const hospitalId = hospital.hospitalId;
        const userId = reservation.userId;

        const review = await this.reservationRepository.createReview(
            reservationId,
            hospitalId,
            userId,
            star,
            contents
        );
        return review;
    };
}

module.exports = ReservationService;
