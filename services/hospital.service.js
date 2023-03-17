const CreateError = require('../lib/errors');
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
    WorkingTime,
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
        HospitalImageFile,
        WorkingTime
    );
    createError = new CreateError();

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
            if (!userId) {
                const err = this.createError.requestExpired();
                throw err;
            }
            const hospitaldata = await this.hospitalRepository.findOneHospital(userId);
            if (!hospitaldata) {
                const err = this.createError.hospitalNotFound();
                throw err;
            }

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
                const err = this.createError.reservationNotFound();
                throw err;
            }
            return await this.hospitalRepository.editReservation(id, date);
        } catch (error) {
            throw new Error(error);
        }
    };

    approvedReservation = async (id, status) => {
        try {
            const findOneReservation = await this.hospitalRepository.findOneReservation(id);
            if (!findOneReservation) {
                const err = this.createError.reservationNotFound();
                throw err;
            }
            return await this.hospitalRepository.approvedReservation(id, status);
        } catch (error) {
            throw new Error(error);
        }
    };

    getWaitedReservation = async (userId) => {
        try {
            if (!userId) {
                const err = this.createError.requestExpired();
                throw err;
            }
            const hospitaldata = await this.hospitalRepository.findOneHospital(userId);
            if (!hospitaldata) {
                const err = this.createError.hospitalNotFound();
                throw err;
            }
            let hospitalId = hospitaldata.hospitalId;
            const waitingdata = this.hospitalRepository.getWaitedReservation(hospitalId);
            return waitingdata;
        } catch (err) {
            throw new Error(error);
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
            new Error(error);
        }
    };

    registerEditHospital = async (userId, name, address, phone, longitude, latitude) => {
        try {
            const findOneHospital = await this.hospitalRepository.findOneHospital(userId);
            if (!findOneHospital) {
                const err = this.createError.hospitalNotFound();
                throw err;
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
            new Error(error);
        }
    };

    getAllreviews = async (userId) => {
        try {
            if (!userId) {
                const err = this.createError.requestExpired();
                throw err;
            }
            const hospitaldata = await this.hospitalRepository.findOneHospital(userId);
            if (!hospitaldata) {
                const err = this.createError.hospitalNotFound();
                throw err;
            }
            let hospitalId = hospitaldata.hospitalId;
            const data = await this.hospitalRepository.getAllreviews(hospitalId);
            return data;
        } catch (error) {
            throw new Error(error);
        }
    };

    getapprovedReservation = async (userId) => {
        try {
            if (!userId) {
                const err = this.createError.requestExpired();
                throw err;
            }
            const hospitaldata = await this.hospitalRepository.findOneHospital(userId);
            if (!hospitaldata) {
                const err = this.createError.hospitalNotFound();
                throw err;
            }
            let hospitalId = hospitaldata.hospitalId;
            const waitingdata = this.hospitalRepository.getapprovedReservation(hospitalId);
            return waitingdata;
        } catch (error) {
            throw new Error(error);
        }
    };

    findOneHospital = async (userId) => {
        try {
            if (!userId) {
                const err = this.createError.requestExpired();
                throw err;
            }
            const hospitaldata = await this.hospitalRepository.findOneHospital(userId);
            return hospitaldata;
        } catch (error) {
            throw new Error(error);
        }
    };

    findAllDoctor = async (userId) => {
        if (!userId) {
            const err = this.createError.requestExpired();
            throw err;
        }
        try {
            const hospitaldata = await this.hospitalRepository.findOneHospital(userId);
            if (!hospitaldata) {
                const err = this.createError.hospitalNotFound();
                throw err;
            }
            let hospitalId = hospitaldata.hospitalId;
            const doctorAlldata = await this.hospitalRepository.findAllDoctor(hospitalId);
            return doctorAlldata;
        } catch (error) {
            throw new Error(error);
        }
    };

    findOneDoctor = async (doctorId) => {
        try {
            const doctordata = await this.hospitalRepository.findOneDoctor(doctorId);
            return doctordata;
        } catch (error) {
            throw new Error(error);
        }
    };

    registerdoctor = async (userId, name, file, contents, categories) => {
        try {
            const hospitaldata = await this.hospitalRepository.findOneHospital(userId);
            if (!hospitaldata) {
                const err = this.createError();
                throw err;
            }
            let hospitalId = hospitaldata.hospitalId;
            const image = await this.uploadToS3(file);
            const doctordata = await this.hospitalRepository.registerdoctor(
                hospitalId,
                name,
                image,
                contents
            );

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
        } catch (error) {
            throw new Error(error);
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
        } catch (error) {
            throw new Error(error);
        }
    };

    uploadToS3 = async (file) => {
        const fileContent = fs.readFileSync(file.path);
        const filename = `${Date.now()}_${file.originalname}`;
        const params = {
            Bucket: env.AWS_BUCKET_NAME,
            Key: `doctors/${filename}`,
            Body: fileContent,
            ContentType: file.mimetype,
        };

        try {
            const data = await s3.upload(params).promise();
            fs.unlinkSync(file.path);
            return data.Location;
        } catch (error) {
            throw new Error('Failed to upload image to S3', error);
        }
    };

    createWorkingTime = async (workigTimeData) => {
        const workigtime = [];
        for (let i = 0; i < workigTimeData.workingTimes.length; i++) {
            const data = {
                doctorId: parseInt(workigTimeData.doctorId),
                dayOfTheWeek: parseInt(workigTimeData.workingTimes[i].dayOfTheWeek),
                startTime: workigTimeData.workingTimes[i].startTime,
                endTime: workigTimeData.workingTimes[i].endTime,
                startDate: workigTimeData.workingTimes[i].startDate,
                endDate: workigTimeData.workingTimes[i].endDate,
            };
            workigtime.push(data);
        }
        try {
            const doctorWorkingTimeData = await this.hospitalRepository.createWorkingTime(
                workigtime
            );
            return doctorWorkingTimeData;
        } catch (error) {
            throw new Error(error);
        }
    };

    registerImagehospital = async (userId, files) => {
        const promises = files.map((file, index) => {
            const fileContent = fs.readFileSync(file.path);
            const filename = `${Date.now()}_${file.originalname}`;
            const params = {
                Bucket: env.AWS_BUCKET_NAME,
                Key: `doctors/${filename}`,
                Body: fileContent,
                ContentType: file.mimetype,
            };
            return new Promise((resolve, reject) => {
                s3.upload(params, (err, data) => {
                    if (err) {
                        console.error(err);
                        reject(new Error(`Failed to upload image ${index + 1} to S3`));
                    } else {
                        console.log(`File ${index + 1} uploaded successfully. ${data.Location}`);
                        fs.unlinkSync(file.path);
                        resolve(data.Location);
                    }
                });
            });
        });

        const imageurls = await Promise.all(promises);
        console.log(imageurls);

        try {
            const hospitaldata = await this.hospitalRepository.findOneHospital(userId);
            if (!hospitaldata) {
                const err = this.createError.hospitalNotFound();
                throw err;
            }
            let hospitalId = hospitaldata.hospitalId;

            const url = [];
            for (let i = 0; i < imageurls.length; i++) {
                const data = {
                    hospitalId: hospitalId,
                    url: imageurls[i],
                };
                url.push(data);
            }
            const ImageFile = await this.hospitalRepository.registerImagehospital(url);

            return ImageFile;
        } catch (error) {
            throw new Error(error);
        }
    };

    getOneHospital = async (id) => {
        try {
            const oneHospital = await this.hospitalRepository.getHospitalInfo(id);
            if (!oneHospital) {
                return {};
            }

            //리뷰는 따로 가져와서 프론트에, workingTime
            //workingTime은 따로 가져와야되는지
            const doctors = oneHospital.doctors.map((doctor) => {
                const department = doctor.doctorCategoryMappings.map((category) => {
                    return category.categories.department;
                });

                //workingTime은 함수가 아니라서?..
                //categories는..
                const workTime = doctor.workingTimes.map((work) => {
                    return {
                        day: work.dayOfTheWeek,
                        start: work.startTime,
                        end: work.endTime,
                    };
                });

                return {
                    doctors: doctor.name,
                    doctorImage: doctor.image,
                    doctorContent: doctor.contents,
                    department: department.join(','),
                    workTime: workTime,
                };
            });
            return {
                hospitalId: oneHospital.hospitalId,
                hospitalName: oneHospital.name,
                hospitalAddress: oneHospital.address,
                hospitalphone: oneHospital.phone,
                hospitalImage: !oneHospital.hospitalImageFiles[0]
                    ? '이미지 준비중'
                    : oneHospital.hospitalImageFiles[0].url,
                doctors,
            };
        } catch (err) {
            throw err;
        }
    };
}

module.exports = HospitalService;
