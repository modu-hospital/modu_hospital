const UserRepository = require('../repositories/user.repository.js');
const { Users } = require('../models/index.js');

class UserService {
    userRepository = new UserRepository(Users);

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
            };
        });
    };
}

module.exports = UserService;
