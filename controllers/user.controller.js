const UserService = require('../services/user.service.js');
const ReservationService = require('../services/reservation.service');
const Validation = require('../lib/validation');

class UserController {
    userService = new UserService();
    reservationService = new ReservationService();
    validation = new Validation();

    // (admin) all 조회
    getUserInfo = async (req, res) => {
        try {
            const UserInfo = await this.userService.findUsers();
            res.status(200).send(UserInfo);
        } catch (error) {
            return res.status(err.status).json({ message: error.message });
        }
    };

    // (admin) role별 조회
    getRoleUser = async (req, res) => {
        try {
            const { role } = req.params;
            const roleUserInfo = await this.userService.findUserRole(role);
            res.status(200).send(roleUserInfo);
        } catch (error) {
            return res.status(error.status).json({ message: error.message });
        }
    };

    // (admin) defalutDelete
    defalutDelete = async (req, res) => {
        const { userId } = req.params;
        const sequenceDelete = await this.userService.userHospitalDoctorDelete(userId);
        return res.status(200).json(sequenceDelete);
    };

    //mypage

    getUserProfile = async (req, res, next) => {
        try {
            const userId = req.params;
            const userProfile = await this.userService.showUserProfile(userId.userId);

            return res.status(200).json(userProfile);
        } catch (err) {
            next(err);
        }
    };

    editUserProfile = async (req, res, next) => {
        try {
            const userId = req.params;
            const { name, phone, address } = await this.validation.editProfile.validateAsync(
                req.body
            );
            const editedProfile = await this.userService.editUserProfile(
                userId.userId,
                address,
                phone,
                name
            );
            return res.status(201).json(editedProfile);
        } catch (err) {
            next(err);
        }
    };

    cancelReservation = async (req, res, next) => {
        try {
            const reservationId = req.params;
            // 추가예정 : token의 userId와 reservation의 userId가 같은지 확인
            const canceledReservation = await this.reservationService.cancelReservation(
                reservationId.id
            );
            return res.status(201).json(canceledReservation);
        } catch (err) {
            next(err);
        }
    };

    createReview = async (req, res, next) => {
        try {
            const reservationId = req.params;

            // 추가예정 : token의 userId와 reservation의 userId가 같은지 확인
            const { star, contents } = await this.validation.createReview.validateAsync(req.body);
            const reviewedReservation = await this.reservationService.createReview(
                reservationId.id,
                star,
                contents
            );
            return res.status(201).json(reviewedReservation);
        } catch (err) {
            next(err);
        }
    };

    partnerSignup = async (req, res) => {
        const role = 'waiting';
        try {
            const { name, phone, loginId, password, confirm, idNumber } =
                await this.validation.signupValidation.validateAsync(req.body);
            const user = await this.userService.signup(
                name,
                phone,
                loginId,
                password,
                confirm,
                idNumber,
                role
            );
            res.json(user);
        } catch (err) {
            if (err.isJoi) {
                return res.status(422).json({ message: err.details[0].message });
            }
            res.status(500).json({ message: err.message });
        }
    };
    customerSignup = async (req, res) => {
        const role = 'customer';
        try {
            const { name, phone, loginId, password, confirm, idNumber } =
                await this.validation.signupValidation.validateAsync(req.body);
            const user = await this.userService.signup(
                name,
                phone,
                loginId,
                password,
                confirm,
                idNumber,
                role
            );
            res.json(user);
        } catch (err) {
            if (err.isJoi) {
                return res.status(422).json({ message: err.details[0].message });
            }
            res.status(500).json({ message: err.message });
        }
    };

    login = async (req, res) => {
        const { loginId, password } = req.body;

        //service에서 쓰여진 accessToken, refreshToken를 가져오기 위해 객체분해할당
        const { accessToken, refreshToken } = await this.userService.login(loginId, password);

        // tokenObject[refreshToken] = loginId

        res.cookie('accessToken', accessToken);
        res.cookie('refreshToken', refreshToken);

        res.json({ accessToken, refreshToken });
    };

    logout = async (req, res) => {
        res.clearCookie(); //res.cookie('accessToken', '')
        return res.status(200).json({ message: '로그아웃 되었습니다.' });
    };
}

module.exports = UserController;
