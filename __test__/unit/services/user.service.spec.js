const UserService = require('../../../services/user.service');

const CreateError = require('../../../lib/errors');
const createError = new CreateError();

const mockUserRepository = {
    findUserById: jest.fn(),
    editUserProfile: jest.fn(),
    signup: jest.fn(),
    findUser: jest.fn(),
    findUserByEmail: jest.fn(),
    findResetCaseByUserId: jest.fn(),
    findResetCaseByToken: jest.fn(),
    createPasswordResetCase: jest.fn(),
    updatePasswordResetCase: jest.fn(),
    updatePassword: jest.fn(),
    signup: jest.fn(),
    emailPasswordCheck: jest.fn()
};
const mockReservationRepository = {
    getApprovedReservation: jest.fn(),
    getWaitingReservation: jest.fn(),
    getDoneOrReviewedReservation: jest.fn(),
    getCanceledReservation: jest.fn(),
};
const userService = new UserService();
userService.userRepository = mockUserRepository;
userService.reservationRepository = mockReservationRepository;

const userId = 1;

describe('User Service Unit Test', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
    describe('findAUserByUserId', () => {
        it('should call userRepository.findUserById once with proper argument', async () => {
            await userService.findAUserByUserId(userId);
            expect(mockUserRepository.findUserById).toHaveBeenCalledTimes(1);
            expect(mockUserRepository.findUserById).toHaveBeenCalledWith(userId);
        });
        it('should return proper data', async () => {
            const userData = { mock: 'mock' };
            mockUserRepository.findUserById.mockResolvedValue(userData);

            expect(await userService.findAUserByUserId()).toMatchObject(userData);
        });
    });
    describe('getUserProfile', () => {
        it('should return proper data', async () => {
            const userData = {
                userId: 1,
                loginId: 'user.loginId',
                name: 'user.name',
                phone: 'user.phone',
                address: 'user.address',
            };
            mockUserRepository.findUserById.mockResolvedValue(userData);
            const returnValue = await userService.getUserProfile();
            expect(returnValue).toMatchObject(userData);
        });
    });
    describe('editUserProfile', () => {
        it('should call userRepository.editUserProfile once with proper argument', async () => {
            const { userId, address, phone, name } = {
                userId: 1,
                address: '서울시',
                phone: '010',
                name: 'arthur',
            };
            await userService.editUserProfile(userId, address, phone, name);
            expect(mockUserRepository.editUserProfile).toHaveBeenCalledTimes(1);
            expect(mockUserRepository.editUserProfile).toHaveBeenCalledWith(
                userId,
                address,
                phone,
                name
            );
        });
        it('should return proper data', async () => {
            const result = { mock: 'mock' };
            mockUserRepository.editUserProfile.mockResolvedValue(result);
            const returnValue = await userService.editUserProfile();
            expect(returnValue).toMatchObject(result);
        });
    });

    describe('getApprovedReservation', () => {
        it('should call proper repository function one with proper argument', async () => {
            const page = 1;
            await userService.getApprovedReservation(userId, page);
            expect(mockReservationRepository.getApprovedReservation).toHaveBeenCalledTimes(1);
            expect(mockReservationRepository.getApprovedReservation).toHaveBeenCalledWith(
                userId,
                page
            );
        });
        it('should return proper data', async () => {
            const reservationData = [
                {
                    hospitalName: '삼성서울병원',
                    doctorName: '김닥터',
                    doctorImage: '/photo',
                    date: '2023-03-06T06:50:00.000Z',
                    id: 6,
                    status: 'approved',
                },
            ];
            mockReservationRepository.getApprovedReservation.mockResolvedValue(reservationData);
            const returnValue = await userService.getApprovedReservation();
            expect(returnValue).toMatchObject(reservationData);
        });
    });
    describe('getWaitingReservation', () => {
        it('should call proper repository function one with proper argument', async () => {
            const page = 1;
            await userService.getWaitingReservation(userId, page);
            expect(mockReservationRepository.getWaitingReservation).toHaveBeenCalledTimes(1);
            expect(mockReservationRepository.getWaitingReservation).toHaveBeenCalledWith(
                userId,
                page
            );
        });
        it('should return proper data', async () => {
            const reservationData = [
                {
                    hospitalName: '삼성서울병원',
                    doctorName: '김닥터',
                    doctorImage: '/photo',
                    date: '2023-03-06T06:50:00.000Z',
                    id: 6,
                    status: 'waiting',
                },
            ];
            mockReservationRepository.getWaitingReservation.mockResolvedValue(reservationData);
            const returnValue = await userService.getWaitingReservation();
            expect(returnValue).toMatchObject(reservationData);
        });
    });
    describe('getDoneOrReviewedReservation', () => {
        it('should call proper repository function one with proper argument', async () => {
            const page = 1;
            await userService.getDoneOrReviewedReservation(userId, page);
            expect(mockReservationRepository.getDoneOrReviewedReservation).toHaveBeenCalledTimes(1);
            expect(mockReservationRepository.getDoneOrReviewedReservation).toHaveBeenCalledWith(
                userId,
                page
            );
        });
        it('should return proper data', async () => {
            const reservationData = [
                {
                    hospitalName: '삼성서울병원',
                    doctorName: '김닥터',
                    doctorImage: '/photo',
                    date: '2023-03-06T06:50:00.000Z',
                    id: 6,
                    status: 'doneOrReviewed',
                },
            ];
            mockReservationRepository.getDoneOrReviewedReservation.mockResolvedValue(
                reservationData
            );
            const returnValue = await userService.getDoneOrReviewedReservation();
            expect(returnValue).toMatchObject(reservationData);
        });
    });
    describe('getCanceledReservation', () => {
        it('should call proper repository function one with proper argument', async () => {
            const page = 1;
            await userService.getCanceledReservation(userId, page);
            expect(mockReservationRepository.getCanceledReservation).toHaveBeenCalledTimes(1);
            expect(mockReservationRepository.getCanceledReservation).toHaveBeenCalledWith(
                userId,
                page
            );
        });
        it('should return proper data', async () => {
            const reservationData = [
                {
                    hospitalName: '삼성서울병원',
                    doctorName: '김닥터',
                    doctorImage: '/photo',
                    date: '2023-03-06T06:50:00.000Z',
                    id: 6,
                    status: 'canceled',
                },
            ];
            mockReservationRepository.getCanceledReservation.mockResolvedValue(reservationData);
            const returnValue = await userService.getCanceledReservation();
            expect(returnValue).toMatchObject(reservationData);
        });
    });
    // describe('sendEmailForResetPassword', () =>{
    //     it('should call userRepository.findUserByEmail once with proper argument', async ()=>{
    //         const email = 'mock'
    //         await userService.sendEmailForResetPassword(email)
    //         expect(mockUserRepository.findUserByEmail).toHaveBeenCalledTimes(1)
    //         expect(mockUserRepository.findUserByEmail).toHaveBeenCalledWith(email)

    //     })
    // })
    // describe('resetPassword', ()=>{
    //     it('should call userRepository.findUserByEmail once with proper argument', async ()=>{
    //         const email = 'mock'
    //         await userService.resetPassword(email)
    //         expect(mockUserRepository.findUserByEmail).toHaveBeenCalledTimes(1)
    //         expect(mockUserRepository.findUserByEmail).toHaveBeenCalledWith(email)
    //     })
    //     it('should call userRepository.findResetCaseByToken once with proper argument', async ()=>{
    //         const email = 'mock'
    //         await userService.resetPassword(email)
    //         expect(mockUserRepository.findResetCaseByToken).toHaveBeenCalledTimes(1)
    //         expect(mockUserRepository.findResetCaseByToken).toHaveBeenCalledWith(email)
    //     })
    // it('should call userRepository.updatePasswordResetCase once with proper argument', async () =>{
    //     const user  = {userId:1}
    //     mockUserRepository.findUserByEmail.mockResolvedValue(user)
    //     const resetCase = {token:'a',userId:1}
    //     mockUserRepository.findResetCaseByToken.mockResolvedValue(resetCase)
    //     const {email, password, confirm, token} = {email:'abc',password:'1234',confirm:'1234',token:'a'}
    //     await userService.resetPassword(email,password,confirm,token)
    //     expect
    // })
    // })
    describe('findResetCase', () => {
        it('should call userRepository.findResetCaseByToken once with proper argument', async () => {
            const token = 'a';
            await userService.findResetCase(token);
            expect(mockUserRepository.findResetCaseByToken).toHaveBeenCalledTimes(1);
            expect(mockUserRepository.findResetCaseByToken).toHaveBeenCalledWith(token);
        });
        it('should return proper data', async () => {
            const resetCase = { data: 'data' };
            mockUserRepository.findResetCaseByToken.mockResolvedValue(resetCase);
            const result = await userService.findResetCase();
            expect(result).toMatchObject(resetCase);
        });
    });
    describe('editPassword', () => {
        it('should call userRepository.updatePassword once', async () => {
            const { userId, password, confirm } = { userId: 1, password: '1234', confirm: '1234' };
            await userService.editPassword(userId, password, confirm);
        });
        it('should throw PasswordNotMatched error', async () => {
            const { userId, password, confirm } = { userId: 1, password: '1234', confirm: '1235' };
            expect(async () => {
                await userService.editPassword(userId, password, confirm);
            }).rejects.toThrow(createError.passwordNotMatched());
        });
    });

    // editPassword = async (userId, password, confirm) => {
    //     if (password != confirm) {
    //         throw this.createError.passwordNotMatched();
    //     }
    //     const hashedPassword = await bcrypt.hash(password, 12);
    //     const updated = await this.userRepository.updatePassword(userId, hashedPassword);
    //     return updated;
    // };

    describe('signup', () => {
        it('should call userRepository.signup once', async () => {
            const { name, loginId, password, phone, idNumber, role } = 
            { name: "김신", loginId: "kss@naver.com", password: '11111@1', phone:'010-0000-0000', idNumber:'000000-5555555', role:"partner" };
            await userService.signup(name, loginId, password, phone, idNumber, role);
        });
        it('should throw UserAlreadyExist error', async () => {
            const { name, loginId, password, phone, idNumber, role } = 
            { name: "김신", loginId: "kss@naver.com", password: '11111@1', phone:'010-0000-0000', idNumber:'000000-5555555', role:"partner" };
            expect(async () => {
                await userService.signup(name, loginId, password, phone, idNumber, role);
            }).rejects.toThrow(createError.UserAlreadyExist());
        });
    });

    // describe('login', () => {
    //     it("should throw an error if user does not exist", async () => {
    //         // given
    //         const { loginId, password } = 
    //         { loginId: "kss@naver.com", password: '11111@1' };
    //         mockUserRepository.emailPasswordCheck.mockResolvedValue(null);        
    //         // when, then
    //         expect(async () => {
    //             await userService.login(loginId, password);
    //         }).rejects.toThrow();
    //     })
    //     it("should throw an error if password is incorrect", async () => {
    //         // given
    //         const { loginId, password } = 
    //         { loginId: "kss@naver.com", password: '11111@1' };
    //         const mockUser = [{ password: "wrongPassword" }];
    //         mockUserRepository.emailPasswordCheck.mockResolvedValue(mockUser)
    //         expect(async () => {
    //             await userService.login(loginId, password);
    //         }).rejects.toThrow();
    //       });

    //     it('should call userRepository.emailPasswordCheck once', async () => {
    //         const { loginId, password } = 
    //         { loginId: "kss@naver.com", password: '11111@1' };
    //         // mockUserRepository.emailPasswordCheck.mockResolvedValue(loginId, password)
    //         await userService.login(loginId, password);
    //     });
    // });
});
