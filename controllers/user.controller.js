const UserService = require('../services/user.service.js');
const { sighupValidation } = require('../middleware/validation');

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
    //mypage 구현중

    getUserProfile = async (req, res) => {
        const userId = req.params;
        console.log(userId.userId);
        const userProfile = await this.userService.makeUserProfile(userId.userId);

        return res.json({ userProfile });
    };

    signup = async (req, res) => {
        try {
            const { name, phone, loginId, password, idNumber } =
                await sighupValidation.validateAsync(req.body);
            const user = await this.userService.signup(name, phone, loginId, password, idNumber);
            res.json(user);
        } catch (err) {
            if (err.isJoi) {
                //joi에서 받아온 에러 메세지를 처리할 수 있도록
                return res.status(422).json({ message: err.details[0].message });
                //joi가 에러를 보낼 때 err에 details라는 배열 안에 첫번째 값의 message
            }

            //joi가 err를 보내지 않는다면
            res.status(500).json({ message: err.message });
        }
    };

    login = async (req, res) => {
        const { loginId, password } = req.body;

        const userInfo = user;
    };

    accessToken = async (req, res) => {};

    refreshToken = async (req, res) => {};

    loginSuccess = async (req, res) => {};

    logout = async (req, res) => {};
}

module.exports = UserController;
