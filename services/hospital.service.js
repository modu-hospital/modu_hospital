const HospitalRepository = require('../repositories/hospital.repository');
const {
    Reservation,
    Hospital,
    Review,
    Doctor,
    Category,
    DoctorCategoryMapping,
} = require('../models/index.js');

class HospitalService {
    hospitalRepository = new HospitalRepository(
        Reservation,
        Hospital,
        Review,
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

    findNearHospitalsInfo = async (rightLongitude, rightLatitude, leftLongitude, leftLatitude) => {
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
        const hospitals = await this.hospitalRepository.findNearHospitalsInfo(longitude, latitude);

        const infos = hospitals.map((hospital) => {
            const doctors = hospital.doctors.map((doctor) => {
                const department = doctor.doctorCategoryMappings.map((category) => {
                    return { department: category.categories.department };
                });
                return { doctor: doctor.name, department };
            });
            return {
                name: hospital.name,
                address: hospital.address,
                doctors,
            };
        });

        return infos;
    };

    searchHospitalInfo = async (id) => {
        const hospital = await this.hospitalRepository.searchHospitalInfo(id)


            const doctors = hospital.doctors.map((doctor) => {
                const department = doctor.doctorCategoryMappings.map((category) => {
                    return { department: category.categories.department };
                });
                return { doctor: doctor.name, department };
            });

        return {
            hospitalId : hospital.hospitalId,
            hospitalName : hospital.name,
            hospitalAddress : hospital.address,
            hospitalphone : hospital.phone,
            doctors
        }
    }

    findHospitalsThatFitsDepartment = async (department) => {
        const hospitals = await this.hospitalRepository.findHospitalsThatFitsDepartment(department)

        return hospitals
    }

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
