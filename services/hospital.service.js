const HospitalRepository = require('../repositories/hospital.repository');
const {
    Reservation,
    Hospital,
    Doctor,
    Category,
    DoctorCategoryMapping,
} = require('../models/index.js');

class HospitalService {
    hospitalRepository = new HospitalRepository(
        Reservation,
        Hospital,
        Doctor,
        Category,
        DoctorCategoryMapping
    );

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

    editReservation = async (id, date, status) => {
        try {
            const updateReservation = await this.hospitalRepository.editReservation(
                id,
                date,
                status
            );
            return updateReservation;
        } catch (err) {
            throw err;
        }
    };
}

module.exports = HospitalService;
