const ReservationRepository = require('../repositories/reservation.repository');
const HospitalRepository = require('../repositories/hospital.repository')

class ReservationService {
    reservationRepository = new ReservationRepository();
    hospitalRepository = new HospitalRepository()


    cancelReservation = async (id) => {
        const canceledReservation = await this.reservationRepository.cancelReservationById(id)
        return canceledReservation
    }

    createReview = async (reservationId, star, contents) => {
        const hospitalIdAndUserId = await this.reservationRepository.findHospitalIdAndUserIdByReservationId(reservationId)
        console.log(hospitalIdAndUserId)
        const hospitalId = hospitalIdAndUserId.hospitalId
        const userId = hospitalIdAndUserId.userId

        const review = await this.reservationRepository.createReview(reservationId, hospitalId, userId, star, contents)
        return review
    }

}

module.exports = ReservationService;
