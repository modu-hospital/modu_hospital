const UserService = require('../services/user.service.js');
const ReservationService = require('../services/reservation.service');
const { Validation } = require('../lib/validation');

class UserController {
    userService = new UserService();
    reservationService = new ReservationService();

    // 서비스관리자의 회원 정보 조회
    getUserInfo = async (req, res) => {
        try {
            const UserInfo = await this.userService.findUsers();
            res.status(200).send(UserInfo);
        } catch (error) {
            return res.json({ message: error.message });
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
        //role을 관리자가 지정해준다
        //그러면 role 값은 어떻게 받아야하는지
        //이것는 waiting 이라는 값을 받아야함
        try {
            const role = 'waiting';
            const { name, phone, loginId, password, idNumber } =
                await sighupValidation.validateAsync(req.body);
            const user = await this.userService.signup(
                name,
                phone,
                loginId,
                password,
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

            //joi가 err를 보내지 않는다면
            res.status(500).json({ message: err.message });
        }
    };
    customerSignup = async (req, res) => {
        //role 기본값이 waiting

        //role 값을 어떻게 받아야하는지?(req.params 로 받는건 알겠는데)

        // /:customer
        // const {customer: role} = req.params

        // /customer
        // const role = req.params.id

        const role = 'customer';

        console.log(req.params);
        try {
            const { name, phone, loginId, password, idNumber } =
                await sighupValidation.validateAsync(req.body);
            const user = await this.userService.signup(
                name,
                phone,
                loginId,
                password,
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

            //joi가 err를 보내지 않는다면
            res.status(500).json({ message: err.message });
        }
    };

    login = async (req, res) => {
        const { loginId, password } = req.body;

        const loginCheck = await idPasswordCheck(loginId, password);

        if (!loginCheck) {
            return res.status(404).json({ message: '없는 계정입니다. 회원가입 해주세요' });
        }

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
