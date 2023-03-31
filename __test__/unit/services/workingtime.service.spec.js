const WorkingtimeService = require('../../../services/workingTime.service');

const mockworkingtimeRepository = {
    findReservationDateByWeek: jest.fn(),
    findWorkingDateByYMDW: jest.fn(),
};

const workingtimeService = new WorkingtimeService();
workingtimeService.workingtimeRepository = mockworkingtimeRepository;

describe('Layered Architecture Pattern Workingtime Service Unit Test', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
    test('Workingtime Service findWorkingDate Method', async () => {
        const findReservationDateByWeekreturnValue = [
            {
                HospitalName: '삼성서울병원',
                UserName: '유연준',
                name: '허남기',
                date: '12:30',
            },
            {
                HospitalName: '삼성서울병원',
                UserName: '탁재빈',
                name: '허남기',
                date: '12:00',
            },
            {
                HospitalName: '삼성서울병원',
                UserName: '유연준',
                name: '허남기',
                date: '12:30',
            },
            {
                HospitalName: '삼성서울병원',
                UserName: '탁재빈',
                name: '허남기',
                date: '12:00',
            },
        ];

        mockworkingtimeRepository.findReservationDateByWeek.mockResolvedValue(
            findReservationDateByWeekreturnValue
        );

        const findWorkingDateByYMDWreturnValue = [
            {
                HospitalName: '삼성서울병원',
                doctorId: 140,
                doctorName: '허남기',
                startTime: '10:00',
                endTime: '17:00',
                startDate: '2023-03-01',
                endDate: '2023-03-31',
            },
            {
                HospitalName: '삼성서울병원',
                doctorId: 141,
                doctorName: '김나래',
                startTime: '10:00',
                endTime: '17:00',
                startDate: '2023-03-01',
                endDate: '2023-03-31',
            },
        ];

        mockworkingtimeRepository.findWorkingDateByYMDW.mockResolvedValue(
            findWorkingDateByYMDWreturnValue
        );

        await workingtimeService.findWorkingDate(3, 2023, 3, 21, 2);
        expect(mockworkingtimeRepository.findReservationDateByWeek).toHaveBeenCalledTimes(1);
        expect(mockworkingtimeRepository.findReservationDateByWeek).toHaveBeenCalledWith(
            3,
            '20230321',
            2
        );

        expect(mockworkingtimeRepository.findWorkingDateByYMDW).toHaveBeenCalledTimes(1);
        expect(mockworkingtimeRepository.findWorkingDateByYMDW).toHaveBeenCalledWith(
            3,
            '20230321',
            2
        );
    });
});
