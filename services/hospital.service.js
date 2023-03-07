const HospitalRepository = require('../repositories/hospital.repository');
const {
    Reservation,
    Hospital,
    Review,
    Doctor,
    Category,
    DoctorCategoryMapping,
    User,
    HospitalImageFile,
} = require('../models/index.js');

class HospitalService {
    hospitalRepository = new HospitalRepository(
        Reservation,
        Hospital,
        Review,
        Doctor,
        Category,
        DoctorCategoryMapping,
        User,
        HospitalImageFile
    );

    findNearHospital = async (rightLongitude, rightLatitude, leftLongitude, leftLatitude) => {
        try {
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
        } catch (err) {
            throw err;
        }
    };

    findNearHospitalsInfo = async (rightLongitude, rightLatitude, leftLongitude, leftLatitude) => {
        try {
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
            const hospitals = await this.hospitalRepository.findNearHospitalsInfo(
                longitude,
                latitude
            );

            // return hospitals
            const infos = hospitals.map((hospital) => {
                const doctors = hospital.doctors.map((doctor) => {
                    const department = doctor.doctorCategoryMappings.map((category) => {
                        return category.categories.department;
                    });
                    return { doctor: doctor.name, department: department.join(',') };
                });
                return {
                    hospitalId: hospital.hospitalId,
                    name: hospital.name,
                    address: hospital.address,
                    phone: hospital.phone,
                    hospitalImage: !hospital.hospitalImageFiles[0]
                        ? '이미지 준비중'
                        : hospital.hospitalImageFiles[0].url,
                };
            });
            return infos;
        } catch (err) {
            throw err;
        }
    };

    searchHospitalInfo = async (id) => {
        try {
            const hospital = await this.hospitalRepository.searchHospitalInfo(id);
            if (!hospital) {
                return {};
            }

            const doctors = hospital.doctors.map((doctor) => {
                const department = doctor.doctorCategoryMappings.map((category) => {
                    return category.categories.department;
                });
                return {
                    doctor: doctor.name,
                    doctorImage: doctor.image,
                    department: department.join(','),
                };
            });

            return {
                hospitalId: hospital.hospitalId,
                hospitalName: hospital.name,
                hospitalAddress: hospital.address,
                hospitalphone: hospital.phone,
                hospitalImage: !hospital.hospitalImageFiles[0]
                    ? '이미지 준비중'
                    : hospital.hospitalImageFiles[0].url,
                doctors,
            };
        } catch (err) {
            throw err;
        }
    };

    findAllReservation = async (userId) => {
        try {
            const hospitaldata = await this.hospitalRepository.findOneHospital(userId);
            console.log(hospitaldata);
            let hospitalId = hospitaldata.hospitalId;
            console.log(hospitalId);
            const data = await this.hospitalRepository.findAllReservation(hospitalId);
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

    getWaitedReservation = async (userId) => {
        try {
            const hospitaldata = await this.hospitalRepository.findOneHospital(userId);
            let hospitalId = hospitaldata.hospitalId;
            const waitingdata = this.hospitalRepository.getWaitedReservation(hospitalId);
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

    getAllreviews = async (userId) => {
        try {
            const hospitaldata = await this.hospitalRepository.findOneHospital(userId);
            let hospitalId = hospitaldata.hospitalId;
            const data = await this.hospitalRepository.getAllreviews(hospitalId);
            return data;
        } catch (error) {
            throw new Error(error);
        }
    };

    getapprovedReservation = async (userId) => {
        try {
            const hospitaldata = await this.hospitalRepository.findOneHospital(userId);
            let hospitalId = hospitaldata.hospitalId;
            const waitingdata = this.hospitalRepository.getapprovedReservation(hospitalId);
            return waitingdata;
        } catch (err) {
            throw err;
        }
    };

    findOneHospital = async (userId) => {
        try {
            const hospitaldata = await this.hospitalRepository.findOneHospital(userId);
            return hospitaldata;
        } catch (err) {
            throw err;
        }
    };
}

module.exports = HospitalService;
