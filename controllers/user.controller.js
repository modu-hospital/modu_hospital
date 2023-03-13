const UserService = require('../services/user.service.js');
const ReservationService = require('../services/reservation.service');
const Validation = require('../lib/validation');
const jwt = require('jsonwebtoken');

class UserController {
    userService = new UserService();
    reservationService = new ReservationService();
    validation = new Validation();

    // (admin) all role 조회 + pagination
    getAllPagination = async (req, res, next) => {
        try {
            const pageNum = req.query.page || 1;
            const type = req.query.type;
            const PaginationByRole = await this.userService.PaginationByRole(pageNum, type);
            return res.status(200).json(PaginationByRole);
        } catch (err) {
            next(err);
        }
    };

    // (admin) role별 조회
    getRoleUser = async (req, res, next) => {
        try {
            const { role } = req.params;
            const pageNum = req.query.page || 1;
            const type = req.query.type;

            const roleUserInfo = await this.userService.findUserRole(role, pageNum, type);
            return res.status(200).send(roleUserInfo);
        } catch (err) {
            next(err);
        }
    };

    // (admin) defalutDelete
    defalutDelete = async (req, res, next) => {
        try {
            const { userId } = req.params;
            const sequenceDelete = await this.userService.userHospitalDoctorDelete(userId);
            return res.status(200).json(sequenceDelete);
        } catch (err) {
            next(err);
        }
    };

    // (admin) 파트너승인
    roleUpdate = async (req, res, next) => {
        try {
            const { userId } = req.params;
            const { role } = req.body;
            const roleUpdate = await this.userService.roleUpdate(userId, role);
            return res.status(200).json(roleUpdate);
        } catch (err) {
            next(err);
        }
    };

    //mypage

    getUserProfile = async (req, res, next) => {
        try {
            const userId = req.params;
            const userProfile = await this.userService.getUserProfile(userId.userId);
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
            return res.status(201);
        } catch (err) {
            next(err);
        }
    };
    getApprovedReservation = async (req, res, next) => {
        try {
            const { userId, page } = req.query;
            const approved = await this.userService.getApprovedReservation(userId, page);
            return res.status(200).json(approved);
        } catch (err) {
            next(err);
        }
    };

    getWaitingReservation = async (req, res, next) => {
        try {
            const { userId, page } = req.query;
            const waiting = await this.userService.getWaitingReservation(userId, page);
            return res.status(200).json(waiting);
        } catch (err) {
            next(err);
        }
    };

    getDoneOrReviewedReservation = async (req, res, next) => {
        try {
            const { userId, page } = req.query;
            const doneOrReviewed = await this.userService.getDoneOrReviewedReservation(
                userId,
                page
            );
            return res.status(200).json(doneOrReviewed);
        } catch (err) {
            next(err);
        }
    };
    getCanceledReservation = async (req, res, next) => {
        try {
            const { userId, page } = req.query;
            const canceled = await this.userService.getCanceledReservation(userId, page);
            return res.status(200).json(canceled);
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
            return res.status(201);
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

        const { name, loginId, password, confirm, phone, idNumber } =
            await this.validation.signupValidation.validateAsync(req.body);
        const user = await this.userService.signup(name, loginId, password, phone, idNumber, role);
        res.json(user);

        // try {
        //     const { name, loginId, password, confirm, phone, idNumber } =
        //         await this.validation.signupValidation.validateAsync(req.body);
        //     const user = await this.userService.signup(
        //         name,
        //         loginId,
        //         password,
        //         phone,
        //         idNumber,
        //         role
        //     );
        //     res.json(user);
        // } catch (err) {
        //     if (err.isJoi) {
        //         return res.status(422).json({ message: err.details[0].message });
        //     }
        //     res.status(500).json({ message: err.message });
        // }
    };
    customerSignup = async (req, res) => {
        const role = 'customer';
        try {
            const { name, loginId, password, confirm, phone, idNumber } =
                await this.validation.signupValidation.validateAsync(req.body);
            const user = await this.userService.signup(
                name,
                loginId,
                password,
                phone,
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

    login = async (req, res, next) => {
        const { loginId, password } = req.body;

        console.log('컨트롤러러');

        //service에서 쓰여진 accessToken, refreshToken를 가져오기 위해 객체분해할당
        const user = await this.userService.login(loginId, password);
        console.log('user', user.userId); //왜 유저가 null로 찍히는지

        //토큰 생성 컨트롤러에서
        const accessToken = jwt.sign({ loginId: user.userId }, process.env.JWT_SECRET_KEY, {
            expiresIn: '10s',
        });

        const refreshToken = jwt.sign({}, process.env.JWT_SECRET_KEY, {
            expiresIn: '7d',
        });

        res.cookie('accessToken', accessToken);
        res.cookie('refreshToken', refreshToken);

        await this.userService.saveToken(user.userId, refreshToken);

        res.status(200).json({ accessToken, refreshToken });
    };

    logout = async (req, res) => {
        res.clearCookie(); //res.cookie('accessToken', '')
        return res.status(200).json({ message: '로그아웃 되었습니다.' });
    };
}

module.exports = UserController;
