const UserRepository = require('../repositories/user.repository.js');
const { User } = require('../models');
const bcrypt = require('bcrypt');

class UserService {
    userRepository = new UserRepository(User);

    userRepository = new UserRepository();

    // filterReservationsForUserProfile = (reservations) => {
    //     if (isarray(reservations)) {
    //         reservations.map(reservations => {
    //             return{

    //             }

    //         })
    //     } else {

    //     }
    // };


    findAUserByUserId = async (userId) => {
        const user = await this.userRepository.findUserById(userId);
        return user;
    };
    findReservationsByUserId = async (userId) => {
        const reservations = await this.userRepository.findReservationsByUserId(userId);
        return reservations;
    };

    makeUserProfile = async (userId) => {
        const user = this.findAUser(userId);
        const reservations = this.findReservationsByUserId(userId);


        const userData = {
            name: user.name,
            phone: user.phone,
            address: user.address,
        };

        
        // if (isarray(reservations)) {


        // } else {
        //     switch (reservations) {
        //         case reservations.status == 'waiting':
        //             const waitingReservations = reservations

        //         case reservations.status == 'approved':
        //             const upcomingReservations = reservations;
        //             return upcomingReservations
        //         case reservations.status == 'done':
        //             const passedReservations = reservations;
        //             return passedReservations
        //         case reservations.status == 'reviewed':
        //             const reviewedReservations = reservations;
        //         case reservations.status == 'canceled':
        //             const canceledReservations = reservations
        //         default:
                    
        //     }
        // }

        return reservations;
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
        const user = await this.userRepository.findUser(loginId);

        const isPasswordCorrect = await bcrypt.compare(password, user[0].password);

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
