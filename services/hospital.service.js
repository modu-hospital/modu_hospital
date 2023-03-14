const AWS = require('aws-sdk');
const fs = require('fs');

const env = process.env;

const s3 = new AWS.S3({
    endpoint: env.AWS_END_POINT,
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
});

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

    findNearHospitals = async (rightLongitude, rightLatitude, leftLongitude, leftLatitude) => {
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

            // return hospital

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
            let hospitalId = hospitaldata.hospitalId;
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

    findAllDoctor = async (userId) => {
        try {
            const hospitaldata = await this.hospitalRepository.findOneHospital(userId);
            let hospitalId = hospitaldata.hospitalId;
            const doctorAlldata = await this.hospitalRepository.findAllDoctor(hospitalId);
            return doctorAlldata;
        } catch (err) {
            throw err;
        }
    };

    findOneDoctor = async (doctorId) => {
        try {
            const doctordata = await this.hospitalRepository.findOneDoctor(doctorId);
            return doctordata;
        } catch (err) {
            throw err;
        }
    };

    registerdoctor = async (userId, name, file, contents, categories) => {
        try {
            const hospitaldata = await this.hospitalRepository.findOneHospital(userId);
            if (!hospitaldata) {
                const error = new Error('해당 병원이 존재하지 않습니다.');
                error.name = 'Hospital Not found';
                error.status = 400;
                throw error;
            }
            let hospitalId = hospitaldata.hospitalId;
            const image = await this.uploadToS3(file);
            const doctordata = await this.hospitalRepository.registerdoctor(
                hospitalId,
                name,
                image,
                contents
            );

            // map 함수를 사용해서 categories 배열을 순회하면서 findOrcreate을 호출함.
            // 그래서 이것을 category 배열에 저장하는 코드
            const department = await Promise.all(
                categories.map(async (department) => {
                    const categorydata = await this.hospitalRepository.findOrCreate(department);

                    return categorydata.id;
                })
            );

            const mappings = await Promise.all(
                department.map(async (department) => ({
                    categoryId: department,
                    doctorId: doctordata.doctorId,
                }))
            );

            await this.hospitalRepository.categoriesInstance(mappings);

            return doctordata;
        } catch (err) {
            console.error(err); // 에러 로그 확인
            throw err;
        }
    };

    editdoctor = async (doctorId, name, file, contents) => {
        try {
            const image = await this.uploadToS3(file);
            const doctordata = await this.hospitalRepository.editdoctor(
                doctorId,
                name,
                image,
                contents
            );
            return doctordata;
        } catch (err) {
            console.error(err); // 에러 로그 확인
            throw err;
        }
    };

    // 이미지 업로드 함수
    uploadToS3 = async (file) => {
        const fileContent = fs.readFileSync(file.path);
        const filename = `${Date.now()}_${file.originalname}`;
        const params = {
            Bucket: env.AWS_BUCKET_NAME,
            // endpoint:'moduhospital.s3.ap-northeast-2.amazonaws.com',
            Key: `doctors/${filename}`,
            Body: fileContent,
            ContentType: file.mimetype,
        };

        try {
            const data = await s3.upload(params).promise();
            fs.unlinkSync(file.path);
            return data.Location;
        } catch (err) {
            console.error(err);
            throw new Error('Failed to upload image to S3');
        }
    };
}

module.exports = HospitalService;
