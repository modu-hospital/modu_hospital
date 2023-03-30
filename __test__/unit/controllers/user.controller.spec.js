const UserController = require('../../../controllers/user.controller');
const jwt = require('jsonwebtoken');
const env = process.env;
const CreateError = require('../../../lib/errors');
const createError = new CreateError();

let mockUserService = {
    getUserProfile: jest.fn(),
    editUserProfile: jest.fn(),
    getApprovedReservation: jest.fn(),
    getWaitingReservation: jest.fn(),
    getDoneOrReviewedReservation: jest.fn(),
    getCanceledReservation: jest.fn(),
    sendEmailForResetPassword: jest.fn(),
    resetPassword: jest.fn(),
    findResetCase: jest.fn(),
    editPassword: jest.fn(),
    //여기서부터 내가 추가한
    login: jest.fn(),
    saveToken: jest.fn(),

};

let mockReservationService = {
    cancelReservation: jest.fn(),
    findReservationById: jest.fn(),
    createReview: jest.fn(),
};

let mockReq = {
    body: jest.fn(),
    params: jest.fn(),
    query: jest.fn(),
};

let mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
};

let mockNext = jest.fn();

let controller = new UserController();
controller.userService = mockUserService;
controller.reservationService = mockReservationService;

const userId = 1;

describe('User Controller Unit Test', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        mockReq = {
            body: jest.fn(),
            params: jest.fn(),
            query: jest.fn(),
        };
        mockReq.cookies = { accessToken: jwt.sign({ userId: userId }, env.JWT_SECRET_KEY) };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });
    describe('getUserProfile', () => {
        it('should call userService.getUserProfile once with proper argument', async () => {
            await controller.getUserProfile(mockReq, mockRes, mockNext);

            expect(mockUserService.getUserProfile).toHaveBeenCalledTimes(1);
            expect(mockUserService.getUserProfile).toHaveBeenCalledWith(
                jwt.decode(mockReq.cookies.accessToken, env.JWT_SECRET_KEY).userId
            );
        });
        it('should return proper response', async () => {
            const serviceResult = { mock: 'mock' };
            mockUserService.getUserProfile.mockResolvedValue(serviceResult);
            await controller.getUserProfile(mockReq, mockRes, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(serviceResult);
            expect(mockNext).not.toHaveBeenCalled();
        });
        it('should call next() when service throws an error', async () => {
            const error = new Error();
            mockUserService.getUserProfile.mockRejectedValueOnce(error);
            await controller.getUserProfile(mockReq, mockRes, mockNext);

            expect(mockRes.status).not.toHaveBeenCalled();
            expect(mockRes.json).not.toHaveBeenCalled();
            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });
    describe('editUserProfile', () => {
        beforeEach(() => {
            mockReq.body = {
                name: 'john',
                phone: '010-1234-1234',
                address: '서울시 강남구',
            };
        });
        it('should call userService.editUserProfile one with proper argument', async () => {
            await controller.editUserProfile(mockReq, mockRes, mockNext);
            expect(mockUserService.editUserProfile).toHaveBeenCalledTimes(1);
            expect(mockUserService.editUserProfile).toHaveBeenCalledWith(
                userId,
                mockReq.body.address,
                mockReq.body.phone,
                mockReq.body.name
            );
        });
        it('should return proper response', async () => {
            await controller.editUserProfile(mockReq, mockRes, mockNext);
            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: '내 정보 수정이 완료되었습니다.',
            });
            expect(mockNext).not.toHaveBeenCalled();
        });
        it('should call next() when service throws an error', async () => {
            const error = new Error();
            mockUserService.editUserProfile.mockRejectedValueOnce(error);
            await controller.editUserProfile(mockReq, mockRes, mockNext);

            expect(mockRes.status).not.toHaveBeenCalled();
            expect(mockRes.json).not.toHaveBeenCalled();
            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });
    describe('get Reservations', () => {
        beforeEach(() => {
            mockReq.query = { page: 1 };
        });
        describe('getApprovedReservation', () => {
            it('should call userService.getApprovedReservation once with proper argument', async () => {
                await controller.getApprovedReservation(mockReq, mockRes, mockNext);

                expect(mockUserService.getApprovedReservation).toHaveBeenCalledTimes(1);
                expect(mockUserService.getApprovedReservation).toHaveBeenCalledWith(
                    jwt.decode(mockReq.cookies.accessToken, env.JWT_SECRET_KEY).userId,
                    mockReq.query.page
                );
            });
            it('should return proper response', async () => {
                const serviceResult = { mock: 'mock' };
                mockUserService.getApprovedReservation.mockResolvedValue(serviceResult);
                await controller.getApprovedReservation(mockReq, mockRes, mockNext);

                expect(mockRes.status).toHaveBeenCalledWith(200);
                expect(mockRes.json).toHaveBeenCalledWith(serviceResult);
                expect(mockNext).not.toHaveBeenCalled();
            });
            it('should call next() when service throws an error', async () => {
                const error = new Error();
                mockUserService.getApprovedReservation.mockRejectedValueOnce(error);
                await controller.getApprovedReservation(mockReq, mockRes, mockNext);

                expect(mockRes.status).not.toHaveBeenCalled();
                expect(mockRes.json).not.toHaveBeenCalled();
                expect(mockNext).toHaveBeenCalledWith(error);
            });
        });
        describe('getWaitingReservation', () => {
            it('should call userService.getWaitingReservation once with proper argument', async () => {
                await controller.getWaitingReservation(mockReq, mockRes, mockNext);

                expect(mockUserService.getWaitingReservation).toHaveBeenCalledTimes(1);
                expect(mockUserService.getWaitingReservation).toHaveBeenCalledWith(
                    jwt.decode(mockReq.cookies.accessToken, env.JWT_SECRET_KEY).userId,
                    mockReq.query.page
                );
            });
            it('should return proper response', async () => {
                const serviceResult = { mock: 'mock' };
                mockUserService.getWaitingReservation.mockResolvedValue(serviceResult);
                await controller.getWaitingReservation(mockReq, mockRes, mockNext);

                expect(mockRes.status).toHaveBeenCalledWith(200);
                expect(mockRes.json).toHaveBeenCalledWith(serviceResult);
                expect(mockNext).not.toHaveBeenCalled();
            });
            it('should call next() when service throws an error', async () => {
                const error = new Error();
                mockUserService.getWaitingReservation.mockRejectedValueOnce(error);
                await controller.getWaitingReservation(mockReq, mockRes, mockNext);

                expect(mockRes.status).not.toHaveBeenCalled();
                expect(mockRes.json).not.toHaveBeenCalled();
                expect(mockNext).toHaveBeenCalledWith(error);
            });
        });
        describe('getDoneOrReviewedReservation', () => {
            it('should call userService.getDoneOrReviewedReservation once with proper argument', async () => {
                await controller.getDoneOrReviewedReservation(mockReq, mockRes, mockNext);

                expect(mockUserService.getDoneOrReviewedReservation).toHaveBeenCalledTimes(1);
                expect(mockUserService.getDoneOrReviewedReservation).toHaveBeenCalledWith(
                    jwt.decode(mockReq.cookies.accessToken, env.JWT_SECRET_KEY).userId,
                    mockReq.query.page
                );
            });
            it('should return proper response', async () => {
                const serviceResult = { mock: 'mock' };
                mockUserService.getDoneOrReviewedReservation.mockResolvedValue(serviceResult);
                await controller.getDoneOrReviewedReservation(mockReq, mockRes, mockNext);

                expect(mockRes.status).toHaveBeenCalledWith(200);
                expect(mockRes.json).toHaveBeenCalledWith(serviceResult);
                expect(mockNext).not.toHaveBeenCalled();
            });
            it('should call next() when service throws an error', async () => {
                const error = new Error();
                mockUserService.getDoneOrReviewedReservation.mockRejectedValueOnce(error);
                await controller.getDoneOrReviewedReservation(mockReq, mockRes, mockNext);

                expect(mockRes.status).not.toHaveBeenCalled();
                expect(mockRes.json).not.toHaveBeenCalled();
                expect(mockNext).toHaveBeenCalledWith(error);
            });
        });
        describe('getCanceledReservation', () => {
            it('should call userService.getCanceledReservation once with proper argument', async () => {
                await controller.getCanceledReservation(mockReq, mockRes, mockNext);

                expect(mockUserService.getCanceledReservation).toHaveBeenCalledTimes(1);
                expect(mockUserService.getCanceledReservation).toHaveBeenCalledWith(
                    jwt.decode(mockReq.cookies.accessToken, env.JWT_SECRET_KEY).userId,
                    mockReq.query.page
                );
            });
            it('should return proper response', async () => {
                const serviceResult = { mock: 'mock' };
                mockUserService.getCanceledReservation.mockResolvedValue(serviceResult);
                await controller.getCanceledReservation(mockReq, mockRes, mockNext);

                expect(mockRes.status).toHaveBeenCalledWith(200);
                expect(mockRes.json).toHaveBeenCalledWith(serviceResult);
                expect(mockNext).not.toHaveBeenCalled();
            });
            it('should call next() when service throws an error', async () => {
                const error = new Error();
                mockUserService.getCanceledReservation.mockRejectedValueOnce(error);
                await controller.getCanceledReservation(mockReq, mockRes, mockNext);

                expect(mockRes.status).not.toHaveBeenCalled();
                expect(mockRes.json).not.toHaveBeenCalled();
                expect(mockNext).toHaveBeenCalledWith(error);
            });
        });
    });
    describe('cancelReservation', () => {
        beforeEach(() => {
            const reservationId = 1;
            mockReq.params = { id: reservationId };
        });
        it('should call reservationService.findReservationById once with proper argument', async () => {
            await controller.cancelReservation(mockReq, mockRes, mockNext);
            expect(mockReservationService.findReservationById).toHaveBeenCalledTimes(1);
            expect(mockReservationService.findReservationById).toHaveBeenCalledWith(
                mockReq.params.id
            );
        });
        it('should call reservationService.cancelReservation once with proper argument', async () => {
            const serviceResult = {
                userId: userId,
            };
            mockReservationService.findReservationById.mockResolvedValue(serviceResult);
            await controller.cancelReservation(mockReq, mockRes, mockNext);
            expect(mockReservationService.cancelReservation).toHaveBeenCalledTimes(1);
            expect(mockReservationService.cancelReservation).toHaveBeenCalledWith(
                mockReq.params.id
            );
        });
        it('should return proper response', async () => {
            const serviceResult = {
                userId: userId,
            };
            mockReservationService.findReservationById.mockResolvedValue(serviceResult);
            await controller.cancelReservation(mockReq, mockRes, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith({ message: '예약 취소가 완료되었습니다.' });
            expect(mockNext).not.toHaveBeenCalled();
        });
        it('should call next() with NotAuthorized error', async () => {
            const serviceResult = {
                userId: 1238912,
            };
            mockReservationService.findReservationById.mockResolvedValue(serviceResult);

            const error = createError.notAuthorized();
            mockReservationService.cancelReservation.mockRejectedValueOnce(error);

            await controller.cancelReservation(mockReq, mockRes, mockNext);

            expect(mockRes.status).not.toHaveBeenCalled();
            expect(mockRes.json).not.toHaveBeenCalled();
            expect(mockNext).toHaveBeenCalledWith(error);
        });
        it('should call next() when service throws an error', async () => {
            const serviceResult = {
                userId: userId,
            };
            mockReservationService.findReservationById.mockResolvedValue(serviceResult);

            const error = new Error();
            mockReservationService.cancelReservation.mockRejectedValueOnce(error);

            await controller.cancelReservation(mockReq, mockRes, mockNext);

            expect(mockRes.status).not.toHaveBeenCalled();
            expect(mockRes.json).not.toHaveBeenCalled();
            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });
    describe('createReview', () => {
        beforeEach(() => {
            const reservationId = 1;
            mockReq.params = { id: reservationId };
            mockReq.body = { star: 5, contents: '최고예요' };
        });
        it('should call reservationService.findReservationById once with proper argument', async () => {
            await controller.cancelReservation(mockReq, mockRes, mockNext);
            expect(mockReservationService.findReservationById).toHaveBeenCalledTimes(1);
            expect(mockReservationService.findReservationById).toHaveBeenCalledWith(
                mockReq.params.id
            );
        });
        // it('should call reservationService.createReview once with proper argument', async ()=>{
        //     const serviceResult = {
        //         userId : userId
        //     }
        //     mockReservationService.findReservationById.mockResolvedValue(serviceResult)

        //     await controller.cancelReservation(mockReq, mockRes, mockNext);
        //     expect(mockReservationService.createReview).toHaveBeenCalledTimes(1)
        //     expect(mockReservationService.createReview).toHaveBeenCalledWith(
        //         mockReq.params.id,
        //         mockReq.body.star,
        //         mockReq.body.contents
        //         )
        // })
    });
    describe('sendEmailForResetPassword', () => {
        beforeEach(() => {
            mockReq.query = { email: 'abc@abc.com' };
        });
        it('should call userService.sendEmailForResetPassword once with proper argument', async () => {
            await controller.sendEmailForResetPassword(mockReq, mockRes, mockNext);
            expect(mockUserService.sendEmailForResetPassword).toHaveBeenCalledTimes(1);
            expect(mockUserService.sendEmailForResetPassword).toHaveBeenCalledWith(
                mockReq.query.email
            );
        });
        it('should return proper response', async () => {
            await controller.sendEmailForResetPassword(mockReq, mockRes, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({ message: '이메일이 발송되었습니다.' });
            expect(mockNext).not.toHaveBeenCalled();
        });
        it('should call next() when service throws an error', async () => {
            const error = new Error();
            mockUserService.sendEmailForResetPassword.mockRejectedValueOnce(error);

            await controller.sendEmailForResetPassword(mockReq, mockRes, mockNext);

            expect(mockRes.status).not.toHaveBeenCalled();
            expect(mockRes.json).not.toHaveBeenCalled();
            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });
    describe('resetPassword', () => {
        beforeEach(() => {
            mockReq.body = {
                email: 'abc@abc.com',
                password: 'password',
                confirm: 'password',
                token: 'token',
            };
        });
        it('should call userService.resetPassword once with proper argument', async () => {
            await controller.resetPassword(mockReq, mockRes, mockNext);
            expect(mockUserService.resetPassword).toHaveBeenCalledTimes(1);
            expect(mockUserService.resetPassword).toHaveBeenCalledWith(
                mockReq.body.email,
                mockReq.body.password,
                mockReq.body.confirm,
                mockReq.body.token
            );
        });
        it('should return proper response', async () => {
            await controller.resetPassword(mockReq, mockRes, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: '비밀번호 재설정이 완료되었습니다.',
            });
            expect(mockNext).not.toHaveBeenCalled();
        });
        it('should call next() when service throws an error', async () => {
            const error = new Error();
            mockUserService.resetPassword.mockRejectedValueOnce(error);

            await controller.resetPassword(mockReq, mockRes, mockNext);

            expect(mockRes.status).not.toHaveBeenCalled();
            expect(mockRes.json).not.toHaveBeenCalled();
            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });
    describe('findResetCase', () => {
        beforeEach(() => {
            mockReq.params = {
                token: 'token',
            };
        });
        it('should call userService.findResetCase once with proper argument', async () => {
            await controller.findResetCase(mockReq, mockRes, mockNext);
            expect(mockUserService.findResetCase).toHaveBeenCalledTimes(1);
            expect(mockUserService.findResetCase).toHaveBeenCalledWith(mockReq.params.token);
        });
        it('should return proper response', async () => {
            mockUserService.findResetCase.mockResolvedValue(true);
            await controller.findResetCase(mockReq, mockRes, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({ isCaseExist: true });
            expect(mockNext).not.toHaveBeenCalled();
        });
        it('should call next() when service throws an error', async () => {
            const error = new Error();
            mockUserService.findResetCase.mockRejectedValueOnce(error);

            await controller.findResetCase(mockReq, mockRes, mockNext);

            expect(mockRes.status).not.toHaveBeenCalled();
            expect(mockRes.json).not.toHaveBeenCalled();
            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });
    describe('editUserPassword', () => {
        beforeEach(() => {
            mockReq.body = {
                password: 'password',
                confirm: 'password',
            };
        });
        it('should call userService.editPassword once with proper argument', async () => {
            await controller.editUserPassword(mockReq, mockRes, mockNext);
            expect(mockUserService.editPassword).toHaveBeenCalledTimes(1);
            expect(mockUserService.editPassword).toHaveBeenCalledWith(
                userId,
                mockReq.body.password,
                mockReq.body.confirm
            );
        });
        it('should return proper response', async () => {
            await controller.editUserPassword(mockReq, mockRes, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: '비밀번호 변경이 완료되었습니다',
            });
            expect(mockNext).not.toHaveBeenCalled();
        });
        it('should call next() when service throws an error', async () => {
            const error = new Error();
            mockUserService.editPassword.mockRejectedValueOnce(error);

            await controller.editUserPassword(mockReq, mockRes, mockNext);

            expect(mockRes.status).not.toHaveBeenCalled();
            expect(mockRes.json).not.toHaveBeenCalled();
            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('login', () => {
        beforeEach(() => {
            mockReq.body = {
                loginId:"sij@naver.com",
                password:"1111"
            };
            mockRes.cookie = jest.fn()
        });
        it('should call userService.login one with proper argument', async () => {
            await controller.login(mockReq, mockRes, mockNext);
            expect(mockUserService.login).toHaveBeenCalledTimes(1);
            expect(mockUserService.login).toHaveBeenCalledWith(
                mockReq.body.loginId,
                mockReq.body.password
            );
        });

        it('should return proper response', async () => {
            mockUserService.login.mockResolvedValue( 
                {
                    userId: 176
                }
            );
            const saveToken = {mock:'mock'}
            mockUserService.saveToken.mockResolvedValue(saveToken)

            await controller.login(mockReq, mockRes, mockNext);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.cookie).toHaveBeenCalledTimes(2);
            expect(mockNext).not.toHaveBeenCalled();
        });
        it('should call next() when service throws an error', async () => {
            const error = new Error();
            mockUserService.login.mockRejectedValueOnce(error);

            await controller.login(mockReq, mockRes, mockNext);

            expect(mockRes.status).not.toHaveBeenCalled();
            expect(mockRes.json).not.toHaveBeenCalled();
            expect(mockRes.cookie).not.toHaveBeenCalled();
            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('customerSignup', () => {
        beforeEach(() => {
            mockReq.body = {
                name:"김신우",
                loginId:"wooss@naver.com",
                password:"1111",
                confirm:"1111",
                phone:"010-0000-0000",
                idNumber:"000000-5555555"
            };
        });
        it('should call userService.customerSignup one with proper argument', async () => {
            await controller.customerSignup(mockReq, mockRes, mockNext);
            expect(mockUserService.customerSignup).toHaveBeenCalledTimes(1);
            expect(mockUserService.customerSignup).toHaveBeenCalledWith(
                mockReq.body.name,
                mockReq.body.loginId,
                mockReq.body.password,
                mockReq.body.confirm,
                mockReq.body.phone,
                mockReq.body.idNumber
            );
        });

        it('should return proper response', async () => {
            await controller.customerSignup(mockReq, mockRes, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({ message: '회원가입이 완료되었습니다' });
            expect(mockNext).not.toHaveBeenCalled();
        });
        it('should call next() when service throws an error', async () => {
            const error = new Error();
            mockUserService.customerSignup.mockRejectedValueOnce(error);

            await controller.customerSignup(mockReq, mockRes, mockNext);

            expect(mockRes.status).not.toHaveBeenCalled();
            expect(mockRes.json).not.toHaveBeenCalled();
            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });
});
    