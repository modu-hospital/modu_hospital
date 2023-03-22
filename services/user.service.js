const UserRepository = require('../repositories/user.repository.js');
const ReservationRepository = require('../repositories/reservation.repository');
const { User, Hospital, Doctor, RefreshToken, sequelize, PasswordResetCase } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const transPort = require('../lib/nodemailer');
const CreateError = require('../lib/errors');
const cryptor = require('../lib/encrypt');
const { TWO_WAY_ENCRYPTION } = process.env;
const env = process.env;

class UserService {
    userRepository = new UserRepository(
        User,
        Hospital,
        Doctor,
        RefreshToken,
        PasswordResetCase,
        sequelize
    );
    reservationRepository = new ReservationRepository(sequelize);
    createError = new CreateError();

    findAUserByUserId = async (userId) => {
        const user = await this.userRepository.findUserById(userId);
        return user;
    };

    getUserProfile = async (userId) => {
        const user = await this.findAUserByUserId(userId);
        const userData = {
            userId: user.userId,
            loginId: user.loginId,
            name: user.name,
            phone: user.phone,
            address: user.address,
        };

        return userData;
    };

    editUserProfile = async (userId, address, phone, name) => {
        const editedProfile = await this.userRepository.editUserProfile(
            userId,
            address,
            phone,
            name
        );
        return editedProfile;
    };
    getApprovedReservation = async (userId, page) => {
        const approved = await this.reservationRepository.getApprovedReservation(userId, page);
        return approved;
    };
    getWaitingReservation = async (userId, page) => {
        const waiting = await this.reservationRepository.getWaitingReservation(userId, page);
        return waiting;
    };
    getDoneOrReviewedReservation = async (userId, page) => {
        const doneOrReviewed = await this.reservationRepository.getDoneOrReviewedReservation(
            userId,
            page
        );
        return doneOrReviewed;
    };
    getCanceledReservation = async (userId, page) => {
        const canceled = await this.reservationRepository.getCanceledReservation(userId, page);
        return canceled;
    };

    signup = async (name, loginId, password, phone, idNumber, role) => {
        const existUser = await this.userRepository.findUser(loginId);

        if (existUser) {
            const err = await this.createError.UserAlreadyExist();
            throw err;
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const encryptIdNumber = cryptor.encrypt(idNumber, TWO_WAY_ENCRYPTION);
        const decrytIdNumber = cryptor.decrypt(encryptIdNumber, TWO_WAY_ENCRYPTION);

        const sign = await this.userRepository.signup(
            name,
            loginId,
            hashedPassword,
            phone,
            encryptIdNumber,
            role
        );

        return sign;
    };

    login = async (loginId, password) => {
        const user = await this.userRepository.emailPasswordCheck(loginId);

        const isPasswordCorrect = await bcrypt.compare(password, user[0].password);

        if (!user || !isPasswordCorrect) {
            const err = await this.createError.wrongEmailOrPassword();
            throw err;
        }

        // if (!isPasswordCorrect) {
        //     const err = await this.createError.wrongEmailOrPassword();
        //     throw err;
        // }

        return user[0];
    };

    findUsers = async () => {
        const allUser = await this.userRepository.findAllUser();

        return allUser.map((users) => {
            return {
                userId: users.userId,
                name: users.name,
                loginId: users.loginId,
                password: users.password,
                phone: users.phone,
                idNumber: users.idNumber,
                address: users.address,
                role: users.role,
                createdAt: users.createdAt,
            };
        });
    };

    // 회원 조회(pagenation)
    PaginationByRole = async (pageNum, type) => {
        const limit = 10;
        const offset = (pageNum - 1) * limit;
        const allUser = await this.userRepository.PaginationByAll(limit, offset, type);
        const lastPage = Math.ceil(allUser.count / limit);
        return { allUser: allUser, lastPage: lastPage };
    };

    findUserRole = async (role, pageNum, type) => {
        const limit = 10;
        const offset = (pageNum - 1) * limit;
        const allUser = await this.userRepository.getSearchList(search, limit, offset, type);
        const lastPage = Math.ceil(allUser.count / limit);
        return { allUser: allUser, lastPage: lastPage };
    };

    userHospitalDoctorDelete = async (userId) => {
        const getUserById = await this.userRepository.findUserById(userId);
        if (getUserById.role === 'partner') {
            const userDelete = await this.userRepository.userDeleteOne(userId);
            const hospitalDelete = await this.userRepository.HospitalDeleteOne(userId);
            const doctorDelete = await this.userRepository.doctorDeleteOne(userId);

            return {
                userDelete: userDelete,
                hospitalDelete: hospitalDelete,
                doctorDelete: doctorDelete,
            };
        } else {
            return await this.userRepository.userDeleteOne(userId);
        }
    };

    roleUpdate = async (userId, role) => {
        const roleUpdate = await this.userRepository.userRoleUpdate(userId, role);
        return roleUpdate;
    };

    saveToken = async (userId, token) => {
        return await this.userRepository.tokenSave(userId, token);
    };
    // sendEmailForCertification = (email) => {
    //     const generateRandom = function (min, max) {
    //         const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    //         return randomNumber;
    //     };

    //     const number = generateRandom(111111, 999999);

    //     const mailOptions = {
    //         from: 'spartamoduhospital@gmail.com',
    //         to: email,
    //         subject: '모두의 병원 이메일 인증코드',
    //         text: '인증 코드입니다. ' + number,
    //     };

    //     transPort.sendMail(mailOptions, (err, info) => {
    //         console.log(info.envelope);
    //         console.log(info.messageId);
    //     });
    // };
    sendEmailForResetPassword = async (email) => {
        const user = await this.userRepository.findUserByEmail(email);
        if (!user) {
            const err = await this.createError.wrongEmail();
            throw err;
        }

        const isCaseExist = await this.userRepository.findResetCaseByUserId(user.userId);
        const token = Math.random().toString(36).slice(2) + new Date().getTime().toString(36);
        if (!isCaseExist) {
            await this.userRepository.createPasswordResetCase(user.userId, token);
        } else {
            await this.userRepository.updatePasswordResetCase(user.userId, token);
        }
        const mailOptions = {
            from: 'spartamoduhospital@gmail.com',
            to: email,
            subject: '모두의 병원 비밀번호 재설정',
            text: 'token ' + token,
        };
        //메일 전송
        await transPort.sendMail(mailOptions, (err, info) => {
            console.log(info.envelope);
            console.log(info.messageId);
        });
    };

    resetPassword = async (email, password, confirm, token) => {
        // 이메일 발송 후 유효시간 설정(분)
        const validTime = 15;

        const user = await this.userRepository.findUserByEmail(email);
        const resetCase = await this.userRepository.findResetCaseByToken(token);

        //email로 찾은 user가 없거나 /email을 발송한 적이 없거나 / token과email이 일치하지 않을 때
        if (!user || !resetCase.token || !(user.userId == resetCase.userId)) {
            throw this.createError.noAuthOrWrongEmail();
        }
        const now = new Date();
        //이메일 발신 후 경과시간 (분)
        const elapsed = (now - resetCase.updatedAt) / 60000;
        //만료된 요청
        if (elapsed > validTime) {
            await this.userRepository.updatePasswordResetCase(user.userId, null);
            throw this.createError.requestExpired();
        }

        //비밀번호 update
        if (password != confirm) {
            throw this.createError.passwordNotMatched();
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const updated = await this.userRepository.updatePassword(user.userId, hashedPassword);

        await this.userRepository.updatePasswordResetCase(user.userId, null);
        return updated;
    };
    findResetCase = async (token) => {
        const resetCase = await this.userRepository.findResetCaseByToken(token);
        if (!resetCase) {
            return false;
        }
        return true;
    };
    editPassword = async (userId, password, confirm) => {
        if (password != confirm) {
            throw this.createError.passwordNotMatched();
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const updated = await this.userRepository.updatePassword(userId, hashedPassword);
        return updated;
    };

    findToken = async (userId) => {
        return await this.userRepository.findToken(userId);
    };

    updateToken = async (userId, token) => {
        return await this.userRepository.updateToken(userId, token);
    };
}
module.exports = UserService;
