const HospitalRepository = require('../repositories/hospital.repository');
const { Reservation, Hospital } = require('../models/index.js');

class HospitalService {
    hospitalRepository = new HospitalRepository(Reservation, Hospital);

    findNearHospital = async (rightLongitude, rightLatitude, leftLongitude, leftLatitude) => {
        const longitude = [];
        const latitude = [];
        longitude.push(leftLongitude, rightLongitude);
        latitude.push(rightLatitude, leftLatitude);
        longitude.sort((a, b) => {
            return a - b;
        });
        latitude.sort((a, b) => {
            return a - b;
        });
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
}

module.exports = HospitalService;
