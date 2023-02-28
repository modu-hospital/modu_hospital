const UserRepository = require('../repositories/user.repository');

class UserService {
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

    

    makeUserProfile = async (userId) => {
        const user = await this.userRepository.findUserById(userId);
        const reservations = await this.userRepository.findReservationsByUserId(
            userId
        );

        const userData = {
            name: user.name,
            phone: user.phone,
            address: user.address,
        };

        return reservations
    };
}

module.exports = UserService;
