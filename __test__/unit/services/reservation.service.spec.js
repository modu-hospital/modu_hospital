const ReservationService = require('../../../services/reservation.service');
const CreateError = require('../../../lib/errors');
const createError = new CreateError();

const mockReservationRepository = {
    findReservationById: jest.fn(),
    getApprovedReservation: jest.fn(),
    getWaitingReservation: jest.fn(),
    getDoneOrReviewedReservation: jest.fn(),
    findHospitalByReservationId: jest.fn(),
    editReservationStatusById: jest.fn(),
    createReview: jest.fn(),
};
const reservationService = new ReservationService();
reservationService.reservationRepository = mockReservationRepository;

describe('Reservation Service Unit Test', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('cancelReservation', () => {
        it('should throw ReservationAlreadyDone error', () => {
            const statusDone = {
                status: 'done',
            };
            mockReservationRepository.findReservationById.mockResolvedValue(statusDone);

            expect(async () => {
                await reservationService.cancelReservation();
            }).rejects.toThrow(createError.reservationAlreadyDone());
        });
        it('should throw ReservationAlreadyCanceled error', () => {
            const statusCanceled = {
                status: 'canceled',
            };
            mockReservationRepository.findReservationById.mockResolvedValue(statusCanceled);

            expect(async () => {
                await reservationService.cancelReservation();
            }).rejects.toThrow(createError.reservationAlreadyCanceled());
        });
        // it('should return what reservationRepository.editReservationStatusById() returns', () => {

        //     const statusWaiting = {
        //         status : 'waiting'
        //     }
        //     mockReservationRepository.findReservationById.mockResolvedValue(statusWaiting)

        //     const repositoryReturnValue = [1]
        //     mockReservationRepository.editReservationStatusById(repositoryReturnValue)

        //     expect(async () => {await reservationService.cancelReservation(1)}).toEqual(reservationService.reservationRepository.editReservationStatusById())
        // })
    });
    describe('createReview()', () => {
        it('should call reservationRepository.findReservationById once with proper argument', async () => {
            const reservationId = 1;
            mockReservationRepository.findReservationById.mockResolvedValue({ status: 'done' });
            mockReservationRepository.findHospitalByReservationId.mockResolvedValue({
                hospitalId: 2,
            });

            await reservationService.createReview(reservationId);

            expect(mockReservationRepository.findReservationById).toHaveBeenCalledTimes(1);
            expect(mockReservationRepository.findReservationById).toHaveBeenCalledWith(
                reservationId
            );
        });
        it('should call reservationRepository.findHospitalByReservationId once with proper argument', async () => {
            const reservationId = 1;
            mockReservationRepository.findReservationById.mockResolvedValue({ status: 'done' });
            mockReservationRepository.findHospitalByReservationId.mockResolvedValue({
                hospitalId: 2,
            });

            await reservationService.createReview(reservationId);

            expect(mockReservationRepository.findHospitalByReservationId).toHaveBeenCalledTimes(1);
            expect(mockReservationRepository.findHospitalByReservationId).toHaveBeenCalledWith(
                reservationId
            );
        });
        it('should call reservationRepository.createReview once with proper argument', async () => {
            mockReservationRepository.findReservationById.mockResolvedValue({
                status: 'done',
                userId: '1',
            });
            mockReservationRepository.findHospitalByReservationId.mockResolvedValue({
                hospitalId: 2,
            });
            const { reservationId, star, contents } = { reservationId: 1, star: 5, contents: 'aa' };
            await reservationService.createReview(reservationId, star, contents);

            expect(mockReservationRepository.createReview).toHaveBeenCalledTimes(1);
        });
        it('should throw ReviewAlreadyCreated error', async () => {
            const statusReviewed = {
                status: 'reviewed',
            };
            mockReservationRepository.findReservationById.mockResolvedValue(statusReviewed);

            expect(async () => {
                await reservationService.createReview();
            }).rejects.toThrow(createError.reviewAlreadyCreated());
        });
        it('should throw ReviewAlreadyCreated error', () => {
            const statusWaiting = {
                status: 'waiting',
            };
            mockReservationRepository.findReservationById.mockResolvedValue(statusWaiting);

            expect(async () => {
                await reservationService.createReview();
            }).rejects.toThrow(createError.reservationStatusIsNotDone());
        });
    });
});
