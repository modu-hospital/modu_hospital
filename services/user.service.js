const UserRepository = require('../repositories/user.repository.js');
const ReservationRepository = require('../repositories/reservation.repository');
const { User, HospitalModel, DoctorModel, RefreshToken } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserService {
    userRepository = new UserRepository(User, HospitalModel, DoctorModel, RefreshToken);
    reservationRepository = new ReservationRepository();

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

    signup = async (name, loginId, password, phone, idNumber, role) => {
        const existUser = await this.userRepository.findUser(loginId);

        if (existUser[0]) {
            res.status(400).json({ message: '이미 존재하는 아이디 입니다' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await this.userRepository.signup(name, loginId, hashedPassword, phone, idNumber, role);

        return { message: '회원가입이 완료되었습니다' };
    };

    login = async (loginId, password) => {
        const user = await this.userRepository.emailPasswordCheck(loginId, password);

        const isPasswordCorrect = await bcrypt.compare(password, user[0].password);

        if (!user || !isPasswordCorrect) {
            return;
        }

        const accessToken = jwt.sign({ loginId: user[0].loginId }, process.env.JWT_SECRET_KEY, {
            expiresIn: '10s',
        });
        // const refreshToken = jwt.sign({}, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });

        return { accessToken };
    };

    findUsers = async () => {
        const allUser = await this.userRepository.findUsers();

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

    findUserRole = async (role) => {
        const roleUsers = await this.userRepository.findUserRole(role);

        //     const isPasswordCorrect = await bcrypt.compare(password, user[0].password)
        // }
        return roleUsers.map((users) => {
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

    saveToken = async (userId, token) => {
        await this.userRepository.tokenSave(userId, token);
        return { message: '토큰이 저장되었습니다' };
    };
}

module.exports = UserService;
