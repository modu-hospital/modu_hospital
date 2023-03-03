const ReservationRepository = require('../repositories/reservation.repository');
const HospitalRepository = require('../repositories/hospital.repository');
const CreateError = require('../lib/errors')


class ReservationService {
    reservationRepository = new ReservationRepository();
    hospitalRepository = new HospitalRepository();
    createError = new CreateError()
    
    cancelReservation = async (id) => {
        const reservation = await this.reservationRepository.findReservationById(id);
        if (reservation.status == 'done' || reservation.status == 'reviewed') {
            // return { message: '이미 진료가 완료된 예약건입니다' };

            // const a = Error('이미 진료 완료됨')
            // a.name = "ReservationAlreadyDone"
            // a.status = 412
            // console.log(a)


            const err = await this.createError.reservationAlreadyDone()
            console.log(err)
            throw err
        }
        if (reservation.status == 'canceled') {
            return { message: '이미 취소가 완료된 예약건입니다' };
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
        console.log(reservation.status)
        if (reservation.status != 'done') {
            return { message: '진료가 완료되지 않은 예약입니다.' };
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
