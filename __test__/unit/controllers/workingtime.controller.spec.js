const WorkingtimeController = require('../../../controllers/workingtime.controller');

const mockworkingtimeService = {
    findWorkingDate: jest.fn(),
};

const findWorkingDate = new WorkingtimeController();
findWorkingDate.workingtimeService = mockworkingtimeService;

describe('WorkingtimeController', () => {
    let workingtimeController;

    beforeEach(() => {
        workingtimeController = new WorkingtimeController();
    });

    describe('diagnosisReservation', () => {
        it('should return working dates', async () => {
            const expectedWorkingDates = [
                { startTime: '09:00', endTime: '18:00' },
                { startTime: '09:00', endTime: '18:00' },
                { startTime: '09:00', endTime: '18:00' },
                { startTime: '09:00', endTime: '18:00' },
                { startTime: '09:00', endTime: '18:00' },
                { startTime: '', endTime: '' },
                { startTime: '', endTime: '' },
            ];

            const req = {
                params: {
                    hospitalId: 1,
                },
                query: {
                    year: 2023,
                    month: 4,
                    date: 3,
                    week: 0,
                },
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            const findWorkingDateMock = jest.fn().mockReturnValue(expectedWorkingDates);

            workingtimeController.workingtimeService.findWorkingDate = findWorkingDateMock;

            await workingtimeController.diagnosisReservation(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expectedWorkingDates);
            expect(findWorkingDateMock).toHaveBeenCalledWith(1, 2023, 4, 3, 0);
        });
    });
});
