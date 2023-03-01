const HospitalRepository = require('../repositories/hospital.repository');
const { Reservation, Hospital, Review } = require('../models/index.js');

class HospitalService {
    hospitalRepository = new HospitalRepository(Reservation, Hospital, Review);

    findNearHospital = async (right, left, right1, left1) => {
        const longitude = [];
        const latitude = [];
        longitude.push(left);
        longitude.push(right);
        latitude.push(right1);
        latitude.push(left1);
        const hospitals = await this.hospitalRepository.findNearHospitals(longitude, latitude);

        return hospitals;
    };

    findAllReservation = async () => {
        try {
            const data = await this.hospitalRepository.findAllReservation();
            return data;
        } catch (error) {
            throw new Error(error);
        }
    };

    editReservation = async (id, date) => {
        try {
            const findOneReservation = await this.hospitalRepository.findOneReservation(id);
            if (!findOneReservation) {
                const error = new Error('해당 예약이 존재하지 않습니다.');
                error.name = 'Reservation Not found';
                error.status = 400;
                throw error;
            }
            return await this.hospitalRepository.editReservation(id, date);
        } catch (err) {
            throw err;
        }
    };

    approvedReservation = async (id, status) => {
        try {
            const findOneReservation = await this.hospitalRepository.findOneReservation(id);
            if (!findOneReservation) {
                const error = new Error('해당 예약이 존재하지 않습니다.');
                error.name = 'Reservation Not found';
                error.status = 400;
                throw error;
            }
            return await this.hospitalRepository.approvedReservation(id, status);
        } catch (err) {
            throw err;
        }
    };

    getWaitedReservation = async (doctorId) => {
        try {
            const waitingdata = this.hospitalRepository.getWaitedReservation(doctorId);
            return waitingdata;
        } catch (err) {
            throw err;
        }
    };

    registerHospital = async (userId, name, address, phone, longitude, latitude) => {
        try {
            const registalHospitalData = await this.hospitalRepository.registerHospital(
                userId,
                name,
                address,
                phone,
                longitude,
                latitude
            );

            return {
                userId: registalHospitalData.userId,
                name: registalHospitalData.name,
                address: registalHospitalData.address,
                phone: registalHospitalData.phone,
                longitude: registalHospitalData.longitude,
                latitude: registalHospitalData.latitude,
            };
        } catch (error) {
            throw error;
        }
    };

    registerEditHospital = async (userId, name, address, phone, longitude, latitude) => {
        try {
            const findOneHospital = await this.hospitalRepository.findOneHospital(userId);
            if (!findOneHospital) {
                const error = new Error('해당 병원이 존재하지 않습니다.');
                error.name = 'Hospital Not found';
                error.status = 400;
                throw error;
            }
            return await this.hospitalRepository.registerEditHospital(
                userId,
                name,
                address,
                phone,
                longitude,
                latitude
            );
        } catch (error) {
            throw error;
        }
    };

    getAllreviews = async () => {
        try {
            const data = await this.hospitalRepository.getAllreviews();
            return data;
        } catch (error) {
            throw new Error(error);
        }
    };
}

module.exports = HospitalService;
