const HospitalService = require('../services/hospital.service');

const Validation = require('../lib/validation');


class HospitalController {
    hospitalService = new HospitalService();
    validation = new Validation();

    findNearHospital = async (req, res) => {
        const { rightLongitude, rightLatitude, leftLongitude, leftLatitude } = req.body;

        const hospitals = await this.hospitalService.findNearHospital(
            rightLongitude,
            rightLatitude,
            leftLongitude,
            leftLatitude
        );
        res.json({hospitals});
    };

    findNearHospitalsInfo = async (req, res) => {
        const { rightLongitude, rightLatitude, leftLongitude, leftLatitude } = req.body;

        const hospitals = await this.hospitalService.findNearHospitalsInfo(
            rightLongitude,
            rightLatitude,
            leftLongitude,
            leftLatitude
        );
        res.json({ hospitals });
    };

    searchHospitalInfo = async (req, res) => {
        const {id} = req.params

        const info = await this.hospitalService.searchHospitalInfo(id)

        res.json(info)
    }

    findHospitalsThatFitsDepartment = async (req, res) => {
        const {department} = req.query
        const hospitals = await this.hospitalService.findHospitalsThatFitsDepartment(department)

        res.json(hospitals)
    }


    // 예약관리 조회
    findAllReservation = async (req, res, next) => {
        try {
            const data = await this.hospitalService.findAllReservation();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    // 예약관리 예약날짜 수정
    editReservation = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { date } = await this.validation.reservationDateUpdateValidation.validateAsync(req.body);
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
            const { status } = await this.validation.reservationStatusUpdateValidation.validateAsync(req.body);
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
            const doctorId = await this.validation.doctoerIdValidateSchema.validateAsync(req.params.doctorId);
            const waitingdata = await this.hospitalService.getWaitedReservation(doctorId);
            res.status(200);
            if (waitingdata.length === 0) {
                return res.json({ success: true, message: '예약 대기중인 목록이 없습니다.' });
            }

            return res.json({ success: true, data: waitingdata });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    //병원 정보 등록
    registerHospital = async (req, res, next) => {
        // const { currentUser } = res.locals;
        // cosnt userId = currentUser.id;
        const { userId, name, address, phone, longitude, latitude } = req.body;
        try {
            await this.validation.hospitalRegisterValidateSchema.validateAsync(req.body);

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
            if (error.name === 'ValidationError') {
                error.status = 412;
                error.message = error.details[0].message;
                error.type = error.details[0].type;
                error.path = error.details[0].path[0];
                error.success = false;

                if (error.path === 'phone') {
                    switch (error.type) {
                        case 'string.pattern.base':
                            error.message = '숫자만 입력이 가능합니다. ';
                            break;
                        case 'string.max':
                        case 'string.min':
                            error.message =
                                '전화번호는 숫자 10자 이상과 16자 이하로만 입력 가능합니다';
                            break;
                        case 'any.required':
                        case 'string.empty':
                            error.message = '전화번호를 적어주세요';
                            break;
                    }
                }

                if (error.path === 'address') {
                    switch (error.type) {
                        case 'any.required':
                        case 'string.empty':
                            error.message = '주소를 적어주세요.';
                            break;
                    }
                }
            }
            console.log(error);
            return res
                .status(error.status)
                .json({ success: error.success, message: error.message });
        }
    };

    //병원 정보 수정
    registerEditHospital = async (req, res, next) => {
        // const { currentUser } = res.locals;
        // cosnt userId = currentUser.id;

        try {
            const { userId, name, address, phone, longitude, latitude } =
                await hospitalRegisterUpdateValidateSchema.validateAsync(req.body);
            const registerEditdata = await this.hospitalService.registerEditHospital(
                userId,
                name,
                address,
                phone,
                longitude,
                latitude
            );
            res.status(201).json({ data: registerEditdata });
        } catch (error) {
            if (error.name === 'ValidationError') {
                error.status = 412;
                error.message = error.details[0].message;
                error.type = error.details[0].type;
                error.path = error.details[0].path[0];
                error.success = false;

                if (error.path === 'phone') {
                    switch (error.type) {
                        case 'string.pattern.base':
                            error.message = '숫자만 입력이 가능합니다. ';
                            break;
                        case 'string.max':
                        case 'string.min':
                            error.message =
                                '전화번호는 숫자 10자 이상과 16자 이하로만 입력 가능합니다';
                            break;
                        case 'any.required':
                        case 'string.empty':
                            error.message = '전화번호를 적어주세요';
                            break;
                    }
                }

                if (error.path === 'address') {
                    switch (error.type) {
                        case 'any.required':
                        case 'string.empty':
                            error.message = '주소를 적어주세요.';
                            break;
                    }
                }
            }
            console.log(error);
            return res
                .status(error.status)
                .json({ success: error.success, message: error.message });
        }
    };

    //리뷰 전체 조회
    getAllreviews = async (req, res, next) => {
        try {
            const data = await this.hospitalService.getAllreviews();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
}

module.exports = HospitalController;
