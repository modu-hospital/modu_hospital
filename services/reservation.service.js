const ReservationRepository = require('../repositories/reservation.repository');
const CreateError = require('../lib/errors');
const { sequelize } = require('../models');

class ReservationService {
    reservationRepository = new ReservationRepository(sequelize);
    createError = new CreateError();

    findReservationById = async (id) => {
        const reservation = await this.reservationRepository.findReservationById(id);
        return reservation;
    };

    cancelReservation = async (id) => {
        const reservation = await this.reservationRepository.findReservationById(id);
        if (reservation.status == 'done' || reservation.status == 'reviewed') {
            const err = await this.createError.reservationAlreadyDone();
            throw err;
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
        console.log('if 이전:', relationship);
        if (relationship === '본인') {
            relationship = 1;
        } else if (relationship === '직계') {
            relationship = 2;
        } else if (relationship === '배우자 및 배우자의 직계') {
            relationship = 3;
        } else if (relationship === '형제·자매') {
            relationship = 4;
        } else if (relationship === '기타') {
            relationship = 5;
        } else {
            const err = await this.createError.notSelectRelationShip();
            console.log(err);
            throw err;
        }
        console.log('if 이후:', relationship);

        const registerData = await this.reservationRepository.reservaionInputData(
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
        );

        return {
            relationship: registerData.relationship,
            selfwrite: registerData.selfwrite,
            name: registerData.name,
            proxyname: registerData.proxyname,
            idnumber: registerData.idnumber,
            phone: registerData.phone,
            address: registerData.address,
            reservationdate: registerData.reservationdate,
            reservationtim: registerData.reservationtim,
        };
    };
}

module.exports = ReservationService;
