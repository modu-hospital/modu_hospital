const HospitalService = require('../services/hospital.service');

const axios = require('axios');

const env = process.env;

const Validation = require('../lib/validation');

class HospitalController {
    hospitalService = new HospitalService();
    validation = new Validation();

    // 화면 기준 근처 병원
    findNearHospital = async (req, res, next) => {
        try {
            const { rightLongitude, rightLatitude, leftLongitude, leftLatitude } = req.body;

            const hospitals = await this.hospitalService.findNearHospitals(
                rightLongitude,
                rightLatitude,
                leftLongitude,
                leftLatitude
            );
            res.json({ hospitals });
        } catch (err) {
            next(err);
        }
    };

    // 화면 기준 근처 병원 정보
    findNearHospitalsInfo = async (req, res, next) => {
        try {
            const { rightLongitude, rightLatitude, leftLongitude, leftLatitude } = req.body;

            const hospitals = await this.hospitalService.findNearHospitalsInfo(
                rightLongitude,
                rightLatitude,
                leftLongitude,
                leftLatitude
            );
            res.json({ hospitals });
        } catch (err) {
            next(err);
        }
    };

    // 클릭한 병원의 정보
    searchHospitalInfo = async (req, res, next) => {
        try {
            const { id } = req.params;

            const info = await this.hospitalService.searchHospitalInfo(id);

            res.json(info);
        } catch (err) {
            next(err);
        }
    };

    // 예약관리 조회
    findAllReservation = async (req, res, next) => {
        try {
            const currentUser = res.locals.user;
            const userId = currentUser.userId;
            const role = currentUser.role;
            const reservationdata = await this.hospitalService.findAllReservation(userId, role);
            res.json({
                reservationdata: reservationdata,
            });
        } catch (error) {
            next(error);
        }
    };

    approvedReservation = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { status } =
                await this.validation.reservationStatusUpdateValidation.validateAsync(req.body);
            const updateTimeReservation = await this.hospitalService.approvedReservation(
                id,
                status
            );
            res.json({ data: updateTimeReservation });
        } catch (error) {
            if (error.name === 'ValidationError') {
                error.status = 412;
                error.success = false;
                error.message = '데이터 형식이 올바르지 않습니다.';
            }
            next(error);
        }
    };

    getWaitedReservation = async (req, res, next) => {
        try {
            const currentUser = res.locals.user;
            const userId = currentUser.userId;
            const role = currentUser.role;
            const waitingdata = await this.hospitalService.getWaitedReservation(userId, role);
            if (waitingdata.length === 0) {
                return res.json({ success: true, message: '예약 대기중인 목록이 없습니다.' });
            }

            return res.json({ success: true, waitingdata: waitingdata });
        } catch (error) {
            next(error);
        }
    };

    getapprovedReservation = async (req, res, next) => {
        try {
            const currentUser = res.locals.user;
            const userId = currentUser.userId;
            const role = currentUser.role;
            const approveddata = await this.hospitalService.getapprovedReservation(userId, role);
            res.json({ success: true, approveddata: approveddata });
        } catch (error) {
            next(error);
        }
    };

    registerEditHospital = async (req, res, next) => {
        const currentUser = res.locals.user;
        const userId = currentUser.userId;
        const role = currentUser.role;
        const { name, address, phone } = req.body;

        if (!req.hospitalLocation) {
            try {
                const registerEditdata = await this.hospitalService.registerEditHospital(
                    userId,
                    name,
                    address,
                    phone,
                    role
                );
                res.json({
                    data: registerEditdata,
                });
            } catch (error) {
                next(error);
            }
            return;
        }

        const { location, address_name } = req.hospitalLocation;
        const longitude = location.longitude;
        const latitude = location.latitude;

        try {
            const registerEditdata = await this.hospitalService.registerEditHospital(
                userId,
                name,
                address,
                phone,
                longitude,
                latitude
            );
            res.json({
                data: registerEditdata,
            });
        } catch (error) {
            next(error);
        }
    };

    getAllreviews = async (req, res, next) => {
        try {
            const currentUser = res.locals.user;
            const userId = currentUser.userId;
            const role = currentUser.role;
            const data = await this.hospitalService.getAllreviews(userId, role);
            res.json({ data: data });
        } catch (error) {
            next(error);
        }
    };

    findOneHospital = async (req, res, next) => {
        try {
            const currentUser = res.locals.user;
            const userId = currentUser.userId;
            const role = currentUser.role;
            const data = await this.hospitalService.findOneHospital(userId, role);
            res.json({ data: data });
        } catch (error) {
            next(error);
        }
    };

    findHospitalLocation = async (req, res, next) => {
        const { address } = req.body;
        if (!address) {
            req.hospitalLocation = null;
            return next();
        }

        try {
            const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${address}`;
            const headers = { Authorization: env.KAKAO_REST_API_KEY };
            const response = await axios.get(url, { headers });
            const api_json = response.data;
            const documents = api_json.documents;
            const address_info = documents[0].address;
            const location = {
                latitude: address_info.y,
                longitude: address_info.x,
            };
            const address_name = address_info.address_name;

            req.hospitalLocation = { location, address_name };

            return next();
        } catch (error) {
            next(error);
        }
    };

    registerHospital = async (req, res, next) => {
        const currentUser = res.locals.user;
        const userId = currentUser.userId;
        const role = currentUser.role;
        const { name, address, phone } = req.body;
        const { location, address_name } = req.hospitalLocation;
        const longitude = location.longitude;
        const latitude = location.latitude;

        try {
            const registerdata = await this.hospitalService.registerHospital(
                userId,
                name,
                address,
                phone,
                longitude,
                latitude,
                role
            );

            return res.json({ data: registerdata });
        } catch (error) {
            throw error;
        }
    };

    registerImagehospital = async (req, res, next) => {
        const currentUser = res.locals.user;
        const userId = currentUser.userId;
        const role = currentUser.role;
        try {
            const files = req.files;
            const hospital = await this.hospitalService.registerImagehospital(userId, files, role);
            return res.json({ data: hospital });
        } catch (error) {
            next(error);
        }
    };

    registerdoctor = async (req, res, next) => {
        const currentUser = res.locals.user;
        const userId = currentUser.userId;
        const role = currentUser.role;
        const { name, contents, categories } = req.body;

        const unique = Array.from(new Set(categories));
        const replaceCategories = await Promise.all(
            unique.map((categories) => categories.replace(/\s/g, ''))
        );
        try {
            const file = req.file;
            const { doctor } = await this.hospitalService.registerdoctor(
                userId,
                name,
                file,
                contents,
                replaceCategories,
                role
            );
            return res.status(201).json({ data: doctor });
        } catch (error) {
            next(error);
        }
    };

    editdoctor = async (req, res, next) => {
        let doctorId = parseInt(req.params.doctorId);
        const { name, contents } = req.body;
        try {
            const file = req.file;
            const doctor = await this.hospitalService.editdoctor(doctorId, name, file, contents);
            return res.json({ data: doctor });
        } catch (error) {
            next(error);
        }
    };

    findAllDoctor = async (req, res, next) => {
        const currentUser = res.locals.user;
        const userId = currentUser.userId;
        const role = currentUser.role;
        try {
            const doctorAlldata = await this.hospitalService.findAllDoctor(userId, role);
            return res.json(doctorAlldata);
        } catch (error) {
            next(error);
        }
    };

    findOneDoctor = async (req, res, next) => {
        let doctorId = parseInt(req.params.doctorId);
        try {
            const doctordata = await this.hospitalService.findOneDoctor(doctorId);
            return res.json(doctordata);
        } catch (error) {
            next(error);
        }
    };

    createWorkingTime = async (req, res, next) => {
        try {
            const workigTimeData = req.body;
            const workingTime = await this.hospitalService.createWorkingTime(workigTimeData);
            return res.json(workingTime);
        } catch (error) {
            next(error);
        }
    };
    //병원 상세 조회
    getOneHospital = async (req, res, next) => {
        const { id } = req.params;

        const oneHospital = await this.hospitalService.getOneHospital(id);

        res.json({oneHospital});
    };
}

module.exports = HospitalController;
