const ReservationRepository = require('../repositories/reservation.repository');
const crypter = require('../lib/encrypt');
const { TWO_WAY_ENCRYPTION } = process.env;
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
        const hospital = await this.reservationRepository.findHospitalByReservationId(
            reservationId
        );
        const hospitalId = hospital.dataValues.hospitalId;
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
        name,
        idnumber,
        phone,
        address,
        reservationdate,
        reservationtime,
        contents,
        proxyName
    ) => {
        let encryt = crypter.encrypt(idnumber, TWO_WAY_ENCRYPTION);

        // relationship 숫자형 변환
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
            throw err;
        }
        // 날짜 + 시간
        let date = reservationdate;
        let time = reservationtime;
        if (time.split(' ~ ')[0].split(':')[1] === '00') {
            time = Number(time.split(' ~ ')[0].split(':')[0]) + 9 + ':00:00';
        } else {
            time = Number(time.split(' ~ ')[0].split(':')[0]) + 9 + ':30:00';
        }

        reservationdate = new Date(date + ' ' + time);

        const status = 'waiting';

        const registerData = await this.reservationRepository.reservaionInputData(
            doctorId,
            userId,
            relationship,
            name,
            phone,
            reservationdate,
            contents,
            encryt,
            status,
            proxyName,
            address
        );

        return {
            doctorId: registerData.doctorId,
            userId: registerData.userId,
            relationship: registerData.relationship,
            name: registerData.name,
            phone: registerData.phone,
            reservationdate: registerData.reservationdate,
            contents: registerData.contents,
            encryt: registerData.encryt,
            status: registerData.status,
            proxyName: registerData.proxyName,
            address: registerData.address,
        };
    };
}

module.exports = ReservationService;
