class CreateError {
    reservationAlreadyDone = () => {
        const createdError = new Error('이미 진료가 완료된 예약건입니다.');
        createdError.name = 'ReservationAlreadyDone';
        // createdError.status = 403;
        return createdError;
    };
    reservationAlreadyCanceled = () => {
        const createdError = Error('이미 취소된 예약건입니다.');
        createdError.name = 'ReservationAlreadyCanceled';
        createdError.status = 403;
        return createdError;
    };
    reviewAlreadyCreated = () => {
        const createdError = Error('이미 리뷰가 작성되었습니다');
        createdError.name = 'ReviewAlreadyCreated';
        createdError.status = 403;
        return createdError;
    };
    reservationStatusIsNotDone = () => {
        const createdError = Error('진료가 완료되지 않은 예약입니다.');
        createdError.name = 'ReservationStatusIsNotDone';
        createdError.status = 403;
        return createdError;
    };
    notAdmin = () => {
        const createdError = Error('관리자가 아닙니다.');
        createdError.name = 'NotAdmin';
        createdError.status = 401;
        return createdError;
    };
}

module.exports = CreateError;
// class UserAlreadyExist extends Error {
//     constructor(message) {
//         super(message);
//         this.name = 'UserAlreadyExist';
//         this.message = '이미 존재하는 회원입니다.';
//     }
//     status = 412;
// }

// class UserNotFound extends Error {
//     constructor(message) {
//         super(message);
//         this.name = 'UserNotFound';
//         this.message = '회원이 존재하지 않습니다.';
//     }
//     status = 412;
// }

// class IncorrectPassword extends Error {
//     constructor(message) {
//         super(message);
//         this.name = 'IncorrectPassword';
//         this.message = '비밀번호가 일치하지 않습니다.';
//     }
//     status = 412;
// }

// class TokenNotFound extends Error {
//     constructor(message) {
//         super(message);
//         this.name = 'TokenNotFound';
//         this.message = '토큰이 유효하지 않습니다. 다시 로그인 해주세요.';
//     }
//     status = 401;
// }

// class NotAdmin extends Error {
//     constructor(message) {
//         super(message);
//         this.name = 'NotAdmin';
//         this.message = '관리자가 아닙니다.';
//     }
//     status = 401;
// }
// class NotFoundItem extends Error {
//     constructor(message) {
//         super(message);
//         this.name = 'NotFoundItem';
//         this.message = '요청받은 리소스를 찾을 수 없습니다.';
//     }
//     status = 404;
// }

// class UserAlreadyLogined extends Error {
//     constructor(message) {
//         super(message);
//         this.name = 'UserAlreadyLogined';
//         this.message = '이미 로그인 중 입니다.';
//     }
//     status = 401;
// }

// class UserNotLogined extends Error {
//     constructor(message) {
//         super(message);
//         this.name = 'UserNotLogined';
//         this.message = '로그인이 필요합니다.';
//     }
//     status = 401;
// }

// class UserNotDeleted extends Error {
//     constructor(message) {
//         super(message);
//         this.name = 'UserNotDeleted';
//         this.message = '일치하는 회원이 없습니다.';
//     }
//     status = 400;
// }

// class UserNotUpdated extends Error {
//     constructor(message) {
//         super(message);
//         this.name = 'UserNotUpdated';
//         this.message = '일치하는 회원이 없습니다.';
//     }
//     status = 400;
// }

// module.exports = {
//     UserAlreadyExist,
//     UserNotFound,
//     IncorrectPassword,
//     TokenNotFound,
//     NotAdmin,
//     NotFoundItem,
//     UserAlreadyLogined,
//     UserNotLogined,
//     UserNotDeleted,
//     UserNotUpdated,
// };
