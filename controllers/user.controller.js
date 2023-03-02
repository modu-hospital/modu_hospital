const UserService = require('../services/user.service.js');
const ReservationService = require('../services/reservation.service');
const { Validation } = require('../lib/validation');

class UserController {
    userService = new UserService();
    reservationService = new ReservationService();
    validation = new Validation();

    // 서비스관리자의 회원 정보 조회
    getUserInfo = async (req, res) => {
        try {
            const UserInfo = await this.userService.findUsers();
            res.status(200).send(UserInfo);
        } catch (error) {
            return res.status(error.status).json({ message: error.message });
        }
    };

    //mypage

    getUserProfile = async (req, res) => {
        const userId = req.params;
        const userProfile = await this.userService.makeUserProfile(userId.userId);

        return res.json({ userProfile });
    };

    editUserProfile = async (req, res) => {
        const userId = req.params;
        const { address, phone, name } = req.body;
        const editedProfile = await this.userService.editUserProfile(
            userId.userId,
            address,
            phone,
            name
        );
        return res.json(editedProfile);
    };

    cancelReservation = async (req, res) => {
        const reservationId = req.params;
        const canceledReservation = await this.reservationService.cancelReservation(
            reservationId.id
        );
        return res.json(canceledReservation);
    };

    createReview = async (req, res) => {
        const reservationId = req.params;
        const { star, contents } = req.body;
        const reviewedReservation = await this.reservationService.createReview(
            reservationId.id,
            star,
            contents
        );
        return res.json(reviewedReservation);
    };

    partnerSignup = async (req, res) => {

        const role = 'waiting';
        try {
            const { name, phone, loginId, password, confirm, idNumber } =
                await this.validation.signupValidation.validateAsync(req.body);
            const user = await this.userService.signup(
                name,
                phone,
                loginId,
                password,
                confirm,
                idNumber,
                role
            );
            res.json(user);
        } catch (err) {
            if (err.isJoi) {
                //joi에서 받아온 에러 메세지를 처리할 수 있도록
                return res.status(422).json({ message: err.details[0].message });
                //joi가 에러를 보낼 때 err에 details라는 배열 안에 첫번째 값의 message
            }
            res.status(500).json({ message: err.message });
        }
    };
    customerSignup = async (req, res) => {

        const role = 'customer';
        try {
            const { name, phone, loginId, password, confirm, idNumber } =
                await this.validation.signupValidation.validateAsync(req.body);
            const user = await this.userService.signup(
                name,
                phone,
                loginId,
                password,
                confirm,
                idNumber,
                role
            );
            res.json(user);
        } catch (err) {
            if (err.isJoi) {
                //joi에서 받아온 에러 메세지를 처리할 수 있도록
                return res.status(422).json({ message: err.details[0].message });
                //joi가 에러를 보낼 때 err에 details라는 배열 안에 첫번째 값의 message
            }
            res.status(500).json({ message: err.message });
        }
    };

    login = async (req, res) => {
        const { loginId, password } = req.body;

        res.json({message: "d"})

        // const loginCheck = await idPasswordCheck(loginId, password);

        // if (!loginCheck) {
        //     return res.status(404).json({ message: '없는 계정입니다. 회원가입 해주세요' });
        // }

        // const token = jwt.sign({id:loginCheck.id})
    };

    // accessToken = async(req, res) => {

    // }

    // refreshToken = async(req, res) => {

    // }

    // loginSuccess = async(req, res) => {

    // }

    logout = async (req, res) => {
        res.clearCookie();
        return res.status(200).json({ message: '로그아웃 되었습니다.' });
    };
}

module.exports = UserController;
