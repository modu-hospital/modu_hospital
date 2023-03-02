const UserRepository = require('../repositories/user.repository.js');
const ReservationRepository = require('../repositories/reservation.repository');
const { User } = require('../models');
const bcrypt = require('bcrypt');

class UserService {
    userRepository = new UserRepository();
    reservationRepository = new ReservationRepository();

    findAUserByUserId = async (userId) => {
        const user = await this.userRepository.findUserById(userId);
        return user;
    };
    sortReservationsByStatus = (reservations) => {
        if(reservations.length == 0){
            return reservations
        }
        const waiting = reservations.filter((e) => e.status == 'waiting');
        const approved = reservations.filter((e) => e.status == 'approved');
        const done = reservations.filter((e) => e.status == 'done');
        const reviewed = reservations.filter((e) => e.status == 'reviewed');
        const canceled = reservations.filter((e) => e.status == 'canceled');
        const sortedReservations = {
                waiting: waiting,
                approved: approved,
                done: done,
                reviewed: reviewed,
                canceled: canceled,
        };
        return sortedReservations

    }

    showUserProfile = async (userId) => {
        const user = await this.findAUserByUserId(userId);
        const userData = {
            name: user.name,
            phone: user.phone,
            address: user.address,
        };

        let reservations = await this.reservationRepository.findReservationsByUserId(userId);
        const sortedReservations = this.sortReservationsByStatus(reservations)
        
        const profileData = {
            userData : userData,
            reservations : sortedReservations

        }

        return profileData;
    };

    editUserProfile = async (userId, address, phone, name) => {
        const editedProfile = await this.userRepository.editUserProfile(
            userId,
            address,
            phone,
            name
        );
        return editedProfile
    };


    signup = async (name, phone, loginId, password, idNumber) => {
        const existUser = await this.userRepository.findUser(loginId);

        console.log(existUser);

        if (existUser[0]) {
            return { message: '이미 존재하는 아이디 입니다' };
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await this.userRepository.signup(name, phone, loginId, hashedPassword, idNumber);
        return { message: '회원가입이 완료되었습니다' };
    };

    login = async (loginId, password) => {
        const userCheck = await this.userRepository.findUser(loginId);

        const passwordCheck = await bcrypt.compare(password, userCheck[0].password);

        if (!userCheck || !passwordCheck) {
            return res.status(400).json({ message: '이메일 또는 비밀번호가 틀렸습니다' });
        }

        // const cookie = jwt.sign({
        //     loginId: userCheck[0].loginId,
        // },
        // jwt)
    };

    //role = 서비스 관리자일 때"manager" , 환자일 때"customer",  승인대기 파트너 일 때?"waiting", 승인완료 파트너 일 때?"partner"
    //message만 다르게 주면 되나? role에 manager인지 환자인지 데이터 create하고

    findUsers = async () => {
        const allUser = await this.userRepository.findUsers();

        //     const isPasswordCorrect = await bcrypt.compare(password, user[0].password)
        // }
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
            };
        });
    };
}

module.exports = UserService;
