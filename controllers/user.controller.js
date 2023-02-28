const UserService = require('../services/user.service.js');

class UserController {
    userService = new UserService();

    // 서비스관리자의 회원 정보 조회
    getUserInfo = async (req, res) => {
        try {
            const UserInfo = await this.userService.findUsers();

            res.status(200).send(UserInfo);
        } catch (error) {
            return res.status(error.status).json({ message: error.message });
        }
    };
}

module.exports = UserController;
