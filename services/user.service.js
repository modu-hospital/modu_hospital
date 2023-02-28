const UserRepository = require('../repositories/user.repository.js')
const {User} = require('../models/index.js')

class UserService {
    userRepository = new UserRepository(User)

    // 여기에 함수 작성해주세요
}

module.exports = UserService;