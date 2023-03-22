const UserService = require('../services/user.service.js');
const ReservationService = require('../services/reservation.service');
const Validation = require('../lib/validation');
const jwt = require('jsonwebtoken');
const CreateError = require('../lib/errors');

class UserController {
    userService = new UserService();
    reservationService = new ReservationService();
    validation = new Validation();
    createError = new CreateError();

    // (admin) all role 조회 + pagination
    getAllPagination = async (req, res, next) => {
        try {
            const pageNum = req.query.page || 1;
            const type = req.query.type;
            console.log('컨트롤러의: pageNum: ', pageNum, 'type: ', type);
            const PaginationByRole = await this.userService.PaginationByRole(pageNum, type);
            return res.status(200).json(PaginationByRole);
        } catch (err) {
            next(err);
        }
    };

    // (admin) role별 조회
    // getRoleUser = async (req, res, next) => {
    //     try {
    //         const { role } = req.params;
    //         const pageNum = req.query.page || 1;
    //         const type = req.query.type;

    //         const roleUserInfo = await this.userService.findUserRole(role, pageNum, type);
    //         return res.status(200).send(roleUserInfo);
    //     } catch (err) {
    //         next(err);
    //     }
    // };

    getAllSearch = async (req, res) => {
        const search = req.query.search;
        const pageNum = req.query.page || 1;
        const type = req.query.type;
        console.log('컨트롤러의 search: : ', search, 'pageNum: ', pageNum, 'type: ', type);
        const getSearchList = await this.userService.getSearchList(search, pageNum, type);
        return res.status(200).json(getSearchList);
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
            const userId = await jwt.decode(req.cookies.accessToken, process.env.JWT_SECRET_KEY)
                .userId;
            const userProfile = await this.userService.getUserProfile(userId);
            return res.status(200).json(userProfile);
        } catch (err) {
            next(err);
        }
    };

    editUserProfile = async (req, res, next) => {
        try {
            const userId = await jwt.decode(req.cookies.accessToken, process.env.JWT_SECRET_KEY)
                .userId;
            const { name, phone, address } = await this.validation.editProfile.validateAsync(
                req.body
            );
            const editedProfile = await this.userService.editUserProfile(
                userId,
                address,
                phone,
                name
            );
            return res.status(201).json({ message: '내 정보 수정이 완료되었습니다.' });
        } catch (err) {
            next(err);
        }
    };
    getApprovedReservation = async (req, res, next) => {
        try {
            const { page } = req.query;
            const userId = await jwt.decode(req.cookies.accessToken, process.env.JWT_SECRET_KEY)
                .userId;
            const approved = await this.userService.getApprovedReservation(userId, page);
            return res.status(200).json(approved);
        } catch (err) {
            next(err);
        }
    };

    getWaitingReservation = async (req, res, next) => {
        try {
            const { page } = req.query;
            const userId = await jwt.decode(req.cookies.accessToken, process.env.JWT_SECRET_KEY)
                .userId;
            const waiting = await this.userService.getWaitingReservation(userId, page);
            return res.status(200).json(waiting);
        } catch (err) {
            next(err);
        }
    };

    getDoneOrReviewedReservation = async (req, res, next) => {
        try {
            const { page } = req.query;
            const userId = await jwt.decode(req.cookies.accessToken, process.env.JWT_SECRET_KEY)
                .userId;
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
            const { page } = req.query;
            const userId = await jwt.decode(req.cookies.accessToken, process.env.JWT_SECRET_KEY)
                .userId;
            const canceled = await this.userService.getCanceledReservation(userId, page);
            return res.status(200).json(canceled);
        } catch (err) {
            next(err);
        }
    };

    cancelReservation = async (req, res, next) => {
        try {
            const reservationId = req.params.id;
            const accessToken = await jwt.decode(
                req.cookies.accessToken,
                process.env.JWT_SECRET_KEY
            );
            const reservation = await this.reservationService.findReservationById(reservationId);
            if (reservation.userId != accessToken.userId) {
                throw this.createError.notAuthorized();
            }

            const canceledReservation = await this.reservationService.cancelReservation(
                reservationId
            );
            return res.status(201).json({ message: '예약 취소가 완료되었습니다.' });
        } catch (err) {
            next(err);
        }
    };

    createReview = async (req, res, next) => {
        try {
            const reservationId = req.params.id;

            const accessToken = await jwt.decode(
                req.cookies.accessToken,
                process.env.JWT_SECRET_KEY
            );
            const reservation = await this.reservationService.findReservationById(reservationId);
            console.log(reservation.userId != accessToken.userId);
            if (reservation.userId != accessToken.userId) {
                throw this.createError.notAuthorized();
            }
            const { star, contents } = await this.validation.createReview.validateAsync(req.body);
            const reviewedReservation = await this.reservationService.createReview(
                reservationId,
                star,
                contents
            );
            return res.status(201).json({ message: '리뷰 작성이 완료되었습니다.' });
        } catch (err) {
            next(err);
        }
    };

    partnerSignup = async (req, res) => {
        const role = 'waiting';

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
            return res.json(user);
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
            return res.json({ user });
        } catch (err) {
            if (err.isJoi) {
                return res.status(422).json({ message: err.details[0].message });
            }
            res.status(500).json({ message: err.message });
        }
    };

    login = async (req, res, next) => {
        try {
            const { loginId, password } = req.body;
            const user = await this.userService.login(loginId, password);

            const accessToken = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET_KEY, {
                expiresIn: '10h',
            });

            const refreshToken = jwt.sign({}, process.env.JWT_SECRET_KEY, {
                expiresIn: '7d',
            });

            res.cookie('accessToken', accessToken, {
                secure: false,
                httpOnly: true,
            }); //쿠키 저장은 프론트에서 저장
            res.cookie('refreshToken', refreshToken, {
                secure: false,
                httpOnly: true,
            });

            const save = await this.userService.saveToken(user.userId, refreshToken);

            return res.status(200).json({ accessToken, refreshToken, save });
        } catch (err) {
            next(err);
        }

        // catch (err) {
        //     if (err.isJoi) {
        //         return res.status(422).json({ message: err.details[0].message });
        //     }
        //     res.status(500).json({ message: err.message });
        // }
    };

    logout = async (req, res) => {
        try {
            res.cookie('accessToken', '');
            res.status(200).json({ message: '로그아웃 되었습니다.' });
        } catch (error) {
            res.status(500).json(error);
        }
    };

    // sendEmailForCertification = async (req,res,next) => {
    //    try {
    //     const email = req.body.email
    //      const sendEmail = await this.userService.sendEmailForCertification(email)
    //      return res.status(200).json({message:'인증번호가 발송되었습니다'})
    //    } catch (err) {
    //     next(err)
    //    }
    // }

    sendEmailForResetPassword = async (req, res, next) => {
        try {
            const { email } = req.query;
            const sendEmail = await this.userService.sendEmailForResetPassword(email);
            return res.status(200).json({ message: '이메일이 발송되었습니다.' });
        } catch (err) {
            next(err);
        }
    };
    resetPassword = async (req, res, next) => {
        try {
            const { email, password, confirm, token } =
                await this.validation.resetUserPassword.validateAsync(req.body);
            const passwordReset = await this.userService.resetPassword(
                email,
                password,
                confirm,
                token
            );
            return res.status(201).json({ message: '비밀번호 재설정이 완료되었습니다.' });
        } catch (err) {
            next(err);
        }
    };
    findResetCase = async (req, res, next) => {
        try {
            const { token } = req.params;
            const isCaseExist = await this.userService.findResetCase(token);
            return res.status(200).json({ isCaseExist });
        } catch (err) {
            next(err);
        }
    };
    editUserPassword = async (req, res, next) => {
        try {
            const userId = await jwt.decode(req.cookies.accessToken, process.env.JWT_SECRET_KEY)
                .userId;
            const { password, confirm } = await this.validation.editUserPassword.validateAsync(
                req.body
            );
            await this.userService.editPassword(userId, password, confirm);
            return res.status(201).json({ message: '비밀번호 변경이 완료되었습니다' });
        } catch (err) {
            next(err);
        }
    };

    reservaionInput = async (req, res, next) => {
        try {
            const { doctorId } = req.params;
            const { userId } = res.locals.user;
            const {
                relationship,
                name,
                idnumber,
                phone,
                reservationdate,
                reservationtime,
                contents,
                proxyName,
                address,
            } = req.body;

            const reservaionInputData = await this.reservationService.reservaionInputData(
                doctorId,
                userId,
                relationship,
                name,
                idnumber,
                phone,
                address,
                reservationdate,
                reservationtime,
                contents,
                proxyName,
                address
            );

            res.status(201).json({ result: 'success', data: reservaionInputData });
        } catch (err) {
            next(err);
        }
    };
}

module.exports = UserController;
