const { describe } = require('node:test');
const UserService = require('../../../services/user.service');
const CreateError = require('../../../lib/errors');
const createError = new CreateError();

const mockUserRepository = {
    findUserById: jest.fn(),
    editUserProfile: jest.fn(),
    signup: jest.fn(),
    findUser: jest.fn(),
};
const mockReservationRepository = {
    getApprovedReservation: jest.fn(),
    getWaitingReservation: jest.fn(),
    getDoneOrReviewedReservation: jest.fn(),
    getCanceledReservation: jest.fn()
}
const userService = new UserService();
userService.userRepository = mockUserRepository;
userService.reservationRepository = mockReservationRepository

describe('User Service Unit Test', () => {
    beforeEach(() => {
        jest.resetAllMocks();
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
    // describe('editUserProfile', () => {

    // })

    describe('getApprovedReservation', () => {
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
            mockReservationRepository.getApprovedReservation.mockResolvedValue(reservationData)
            const returnValue = await userService.getApprovedReservation()
            expect(returnValue).toMatchObject(reservationData)
        });
    });
    describe('getWaitingReservation', () => {
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
            mockReservationRepository.getWaitingReservation.mockResolvedValue(reservationData)
            const returnValue = await userService.getWaitingReservation()
            expect(returnValue).toMatchObject(reservationData)
        });
    });
    describe('getApprovedReservation', () => {
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
            mockReservationRepository.getApprovedReservation.mockResolvedValue(reservationData)
            const returnValue = await userService.getApprovedReservation()
            expect(returnValue).toMatchObject(reservationData)
        });
    });
    describe('getDoneOrReviewedReservation', () => {
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
            mockReservationRepository.getDoneOrReviewedReservation.mockResolvedValue(reservationData)
            const returnValue = await userService.getDoneOrReviewedReservation()
            expect(returnValue).toMatchObject(reservationData)
        });
    });
    describe('getCanceledReservation', () => {
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
            mockReservationRepository.getCanceledReservation.mockResolvedValue(reservationData)
            const returnValue = await userService.getCanceledReservation()
            expect(returnValue).toMatchObject(reservationData)
        });
    });

    
});
