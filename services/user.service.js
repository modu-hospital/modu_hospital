const UserRepository = require('../repositories/user.repository.js');
const ReservationRepository = require('../repositories/reservation.repository');
const { User, Hospital, Doctor, RefreshToken, sequelize } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const transPort = require('../lib/nodemailer');
const CreateError = require('../lib/errors');

class UserService {
    userRepository = new UserRepository(User, Hospital, Doctor, RefreshToken);
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
            const err = await this.createError.UserAlreadyExist()
            throw err
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        // 추가 고민
        // const hashedIdNumber = await bcrypt.hash(password, 12);

        const sign = await this.userRepository.signup(
            name,
            loginId,
            hashedPassword,
            phone,
            idNumber,
            role
        );

        return sign;
    };

    //@@@@@@@@@@@@@@문제
    //비밀번호가 틀리면 비밀번호 바꾸라고??하는건지
    // 비밀번호 업데이트 하라고?? 뜸,,, 이게 뭔지

    login = async (loginId, password) => {
        const user = await this.userRepository.emailPasswordCheck(loginId);
        console.log('user[0].password', user[0].password);
        console.log("user", user[0].loginId)
        //바디값에 loginId 잘못 찍어도 콘솔에 user값 잘 나와야되는거 아닌가
        //console 안 찍힘

        const isPasswordCorrect = await bcrypt.compare(password, user[0].password);
        console.log('isPasswordCorrect', isPasswordCorrect);

        //아이디를 없는 아이디로 바디값에 넣었을 때때
        //썬클에서 에러를 찍을 때 에러를 지정해줬는데 알 수 없는 오류가 발생했습니다 뜸
        //TypeError: Cannot read properties of undefined (reading 'password')

        if (!user || !isPasswordCorrect) {
            const err = await this.createError.wrongEmailOrPassword()
            throw err
        }
        //비번을 틀렸을 땐 에러 잘 찍힘



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
        const allUser = await this.userRepository.PaginationByRole(limit, offset, role, type);
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
    sendEmailForCertification = (email) => {
        const generateRandom = function (min, max) {
            const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            return randomNumber;
        };

        const number = generateRandom(111111, 999999);

        const mailOptions = {
            from: 'spartamoduhospital@gmail.com',
            to: email,
            subject: '모두의 병원 이메일 인증코드',
            text: '인증 코드입니다. ' + number,
        };

        transPort.sendMail(mailOptions, (err, info) => {
            console.log(info.envelope);
            console.log(info.messageId);
        });
    };
    sendEmailForResetPassword = async (email) => {
        const user = await this.userRepository.findUserByEmail(email);
        if (!user) {
            const err = await this.createError.wrongEmail();
            throw err;
        }
        const params = await bcrypt.hash(email, 12);

        const mailOptions = {
            from: 'spartamoduhospital@gmail.com',
            to: email,
            subject: '모두의 병원 비밀번호 재설정',
            text: 'params ' + params,
        };

        transPort.sendMail(mailOptions, (err, info) => {
            console.log(info.envelope);
            console.log(info.messageId);
        });
    };
    resetPassword = async (email, password, confirm, params) => {
        const user = await this.userRepository.findUserByEmail(email);
        const match = await bcrypt.compare(email, params);
        if (!user || !match) {
            throw this.createError.noAuthOrWrongEmail();
        }
        const passwordUpdated = await this.editPassword(user.userId, password, confirm);
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
