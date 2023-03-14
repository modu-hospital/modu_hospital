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

            console.log(id);

            const info = await this.hospitalService.searchHospitalInfo(id);

            res.json(info);
        } catch (err) {
            next(err);
        }
    };

    // 예약관리 조회
    findAllReservation = async (req, res, next) => {
        try {
            // 로그인시 미들웨어 통해서 userId 정보를 받고
            // userId를 통해서 hospitals테이블에서 hospitalId를 가져옴(서비스에서 구현)
            //  hospitalId를 통해 해당 병원의 예약목록을 가져옴
            // 추가로 생각해볼 에러처리 => role = "파트너"가 아니면 "파트너만 사용가능합니다" 메시지 출력하기
            // const { currentUser } = res.locals;
            // const userId = currentUser.id;
            const userId = 91; // 현재 임시로 들어간 값
            const reservationdata = await this.hospitalService.findAllReservation(userId);
            res.status(200).json({
                reservationdata: reservationdata,
            });
        } catch (error) {
            res.status(500).json({
                success: true,
                message: error.message,
            });
        }
    };

    // 예약관리 예약날짜 수정
    editReservation = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { date } = await this.validation.reservationDateUpdateValidation.validateAsync(
                req.body
            );
            const updateDateReservation = await this.hospitalService.editReservation(id, date);
            res.status(200).json({ data: updateDateReservation });
        } catch (error) {
            if (error.name === 'ValidationError') {
                error.status = 412;
                error.success = false;
                error.message = '데이터 형식이 올바르지 않습니다.';
            }
            return res
                .status(error.status)
                .json({ success: error.success, message: error.message });
        }
    };

    // 예약관리 승인하기 수정
    approvedReservation = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { status } =
                await this.validation.reservationStatusUpdateValidation.validateAsync(req.body);
            const updateTimeReservation = await this.hospitalService.approvedReservation(
                id,
                status
            );
            res.status(200).json({ data: updateTimeReservation });
        } catch (error) {
            if (error.name === 'ValidationError') {
                error.status = 412;
                error.success = false;
                error.message = '데이터 형식이 올바르지 않습니다.';
            }
            return res
                .status(error.status)
                .json({ success: error.success, message: error.message });
        }
    };

    //예약 승인대기 목록 불러오기
    getWaitedReservation = async (req, res, next) => {
        try {
            // 로그인시 미들웨어 통해서 userId 정보를 받고
            // userId를 통해서 hospitals테이블에서 hospitalId를 가져옴(서비스에서 구현)
            //  hospitalId를 통해 해당 병원의 예약목록을 가져옴
            // 추가로 생각해볼 에러처리 => role = "파트너"가 아니면 "파트너만 사용가능합니다" 메시지 출력하기
            // const { currentUser } = res.locals;
            // const userId = currentUser.id;
            const userId = 91;
            const waitingdata = await this.hospitalService.getWaitedReservation(userId);
            res.status(200);
            if (waitingdata.length === 0) {
                return res.json({ success: true, message: '예약 대기중인 목록이 없습니다.' });
            }

            return res.json({ success: true, waitingdata: waitingdata });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    //예약 승인완료 목록 불러오기
    getapprovedReservation = async (req, res, next) => {
        try {
            // 로그인시 미들웨어 통해서 userId 정보를 받고
            // userId를 통해서 hospitals테이블에서 hospitalId를 가져옴(서비스에서 구현)
            //  hospitalId를 통해 해당 병원의 예약목록을 가져옴
            // 추가로 생각해볼 에러처리 => role = "파트너"가 아니면 "파트너만 사용가능합니다" 메시지 출력하기
            // const { currentUser } = res.locals;
            // const userId = currentUser.id;
            const userId = 91;
            const approveddata = await this.hospitalService.getapprovedReservation(userId);
            res.status(200).json({ success: true, approveddata: approveddata });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    //병원 정보 수정
    registerEditHospital = async (req, res, next) => {
        // const { currentUser } = res.locals;
        // cosnt userId = currentUser.id;
        const userId = 91;
        const { name, address, phone } = req.body;
        // 주소 값이 없는 경우에 대한 예외 처리
        if (!req.hospitalLocation) {
            try {
                const registerEditdata = await this.hospitalService.registerEditHospital(
                    userId,
                    name,
                    address,
                    phone
                );
                res.status(201).json({
                    data: registerEditdata,
                });
            } catch (error) {
                return res.status(error.status).json({
                    success: error.success,
                    message: error.message,
                });
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
            res.status(201).json({
                data: registerEditdata,
            });
        } catch (error) {
            return res.status(error.status).json({
                success: error.success,
                message: error.message,
            });
        }
    };

    //리뷰 전체 조회
    getAllreviews = async (req, res, next) => {
        try {
            // const { currentUser } = res.locals;
            // const userId = currentUser.id;
            const userId = 91;
            const data = await this.hospitalService.getAllreviews(userId);
            res.status(200).json({ data: data });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    //내 병원 정보
    findOneHospital = async (req, res, next) => {
        try {
            // const { currentUser } = res.locals;
            // const userId = currentUser.id;
            const userId = 91;
            const data = await this.hospitalService.findOneHospital(userId);
            res.status(200).json({ data: data });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    // 병원지도 검색 api
    findHospitalLocation = async (req, res, next) => {
        const { address } = req.body;
        if (!address) {
            //address값이 없는 경우
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

            req.hospitalLocation = { location, address_name }; // 중요 부분!

            return next(); // 다음 미들웨어로 넘어감
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    };

    // 병원 정보 등록api
    registerHospital = async (req, res, next) => {
        // const { currentUser } = res.locals;
        // cosnt userId = currentUser.id;
        const userId = 91;
        const { name, address, phone } = req.body;
        const { location, address_name } = req.hospitalLocation; // 중요 부분!
        const longitude = location.longitude;
        const latitude = location.latitude;

        try {
            const registerdata = await this.hospitalService.registerHospital(
                userId,
                name,
                address,
                phone,
                longitude,
                latitude
            );

            return res.status(201).json({ data: registerdata });
        } catch (error) {
            return res
                .status(error.status)
                .json({ success: error.success, message: error.message });
        }
    };

    // 의사 정보 등록
    registerdoctor = async (req, res, next) => {
        // userId = 3;
        console.log(req);
        const userId = 91;
        const { name, contents, categories } = req.body;

        const unique = Array.from(new Set(categories)); // 배열에서 중복된 값 제거
        const replaceCategories = await Promise.all(
            unique.map((categories) => categories.replace(/\s/g, ''))
        );
        // map() 함수를 이용해서 unuque 배열의 공백 제거, replace() 함수 이용해서 새로운 문자열 만들기 => /\s/g, "" 문자열 내 모든 공백 찾기위한 패턴
        // replaceCategories
        // console.log('#####replaceCategories',replaceCategories);
        try {
            const file = req.file; //업로드된 파일 정보
            const { doctor } = await this.hospitalService.registerdoctor(
                userId,
                name,
                file,
                contents,
                replaceCategories
            );
            return res.status(201).json({ data: doctor });
        } catch (error) {
            console.error(error);
        }
    };

    // 소속 병원 의사 정보 수정하기
    editdoctor = async (req, res, next) => {
        // const doctorId = 22;
        // const name = "주호민";
        // const contents = "안녕하세요 주펄입니다.";
        let doctorId = parseInt(req.params.doctorId);
        const { name, contents } = req.body;
        try {
            const file = req.file; //업로드된 파일 정보
            const doctor = await this.hospitalService.editdoctor(doctorId, name, file, contents);
            return res.json({ data: doctor });
        } catch (error) {
            console.error(error);
        }
    };

    // 소속 병원 의사들 정보 불러오기
    findAllDoctor = async (req, res, next) => {
        // const { currentUser } = res.locals;
        // cosnt userId = currentUser.id;
        const userId = 91;
        try {
            const doctorAlldata = await this.hospitalService.findAllDoctor(userId);
            return res.json(doctorAlldata);
        } catch (error) {
            next(error);
        }
    };

    // 의사 한명 정보 불러오기 => 의사 상세페이지 => 수정하려고 만듦
    findOneDoctor = async (req, res, next) => {
        let doctorId = parseInt(req.params.doctorId);
        try {
            const doctordata = await this.hospitalService.findOneDoctor(doctorId);
            return res.json(doctordata);
        } catch (error) {
            next(error);
        }
    };
}

module.exports = HospitalController;
