const HospitalController = require('../../../controllers/hospital.controller');

let mockHospitalService = {
    findNearHospitals: jest.fn(),
    findNearHospitalsInfo: jest.fn(),
    searchHospitalInfo: jest.fn(),
};

let mockRequest = {
    body: jest.fn(),
    params: jest.fn(),
};

let mockResponse = {
    json: jest.fn(),
};

let hospitalController = new HospitalController();
hospitalController.hospitalService = mockHospitalService;

describe('Layered Architecture Pattern Hospital Controller Unit Test', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('Hospital Controller findNearHospitals Method', async () => {
        const hospitalReqBody = {
            rightLongitude: 127.13245302025508,
            rightLatitude: 37.52700879612589,
            leftLongitude: 126.99344298385097,
            leftLatitude: 37.47504078291968,
        };

        mockRequest.body = hospitalReqBody;

        const hospitals = [
            {
                hospitalId: 3,
                address: '서울특별시 강남구 일원로 81',
            },
        ];

        mockHospitalService.findNearHospitals = jest.fn(() => hospitals);

        await hospitalController.findNearHospital(mockRequest, mockResponse);

        expect(mockHospitalService.findNearHospitals).toHaveBeenCalledTimes(1);
        expect(mockHospitalService.findNearHospitals).toHaveBeenCalledWith(
            hospitalReqBody.rightLongitude,
            hospitalReqBody.rightLatitude,
            hospitalReqBody.leftLongitude,
            hospitalReqBody.leftLatitude
        );

        expect(mockResponse.json).toHaveBeenCalledWith({ hospitals });
    });

    test('Hospital Controller findNearHospitalsInfo Method', async () => {
        const hospitalReqBody = {
            rightLongitude: 127.13245302025508,
            rightLatitude: 37.52700879612589,
            leftLongitude: 126.99344298385097,
            leftLatitude: 37.47504078291968,
        };

        mockRequest.body = hospitalReqBody;

        const hospitals = [
            {
                hospitalId: 3,
                name: '삼성서울병원',
                address: '서울특별시 강남구 일원로 81',
                phone: '0215993115',
                hospitalImage:
                    'https://mblogthumb-phinf.pstatic.net/MjAxOTA0MjFfNzEg/MDAxNTU1ODUyNjA1ODMx.S717xo_KomAdcNK5hCSua-Cz7gDpUyf1oXxj_vfVm44g.lFLDNYIdZnbU2n4_qyhODB4bKY_i7zsS4z8RHdlELOYg.JPEG.akswp1224/1.jpg?type=w2',
            },
            {
                hospitalId: 7,
                name: '강남나누리병원',
                address: '서울특별시 강남구 논현동 63-8',
                phone: '0216889797',
                hospitalImage: '이미지 준비중',
            },
        ];

        mockHospitalService.findNearHospitalsInfo = jest.fn(() => hospitals);

        await hospitalController.findNearHospitalsInfo(mockRequest, mockResponse);

        expect(mockHospitalService.findNearHospitalsInfo).toHaveBeenCalledTimes(1);
        expect(mockHospitalService.findNearHospitalsInfo).toHaveBeenCalledWith(
            hospitalReqBody.rightLongitude,
            hospitalReqBody.rightLatitude,
            hospitalReqBody.leftLongitude,
            hospitalReqBody.leftLatitude
        );

        expect(mockResponse.json).toHaveBeenCalledWith({ hospitals });
    });

    test('Hospital Controller findNearHospitals Method', async () => {
        const hospitalReqparams = 'http://localhost:3000/api/hospitals/info/3';

        mockRequest.params = hospitalReqparams;

        const hospitalInfo = {
            hospitalId: 3,
            hospitalName: '삼성서울병원',
            hospitalAddress: '서울특별시 강남구 일원로 81',
            hospitalphone: '0215993115',
            hospitalImage:
                'https://mblogthumb-phinf.pstatic.net/MjAxOTA0MjFfNzEg/MDAxNTU1ODUyNjA1ODMx.S717xo_KomAdcNK5hCSua-Cz7gDpUyf1oXxj_vfVm44g.lFLDNYIdZnbU2n4_qyhODB4bKY_i7zsS4z8RHdlELOYg.JPEG.akswp1224/1.jpg?type=w2',
            doctors: [
                {
                    doctor: '김닥터',
                    doctorImage:
                        'https://mblogthumb-phinf.pstatic.net/MjAxOTA0MjFfNzEg/MDAxNTU1ODUyNjA1ODMx.S717xo_KomAdcNK5hCSua-Cz7gDpUyf1oXxj_vfVm44g.lFLDNYIdZnbU2n4_qyhODB4bKY_i7zsS4z8RHdlELOYg.JPEG.akswp1224/1.jpg?type=w2',
                    department: '비뇨기과,내과',
                },
            ],
        };

        mockHospitalService.searchHospitalInfo = jest.fn(() => hospitalInfo);

        await hospitalController.searchHospitalInfo(mockRequest, mockResponse);

        expect(mockHospitalService.searchHospitalInfo).toHaveBeenCalledTimes(1);
        expect(mockHospitalService.searchHospitalInfo).toHaveBeenCalledWith(
            hospitalReqparams.params
        );

        expect(mockResponse.json).toHaveBeenCalledWith(hospitalInfo);
    });

    test('Hospital Controller getOneHospital Method', async () => {
        const hospitalReqparams = 'http://localhost:3000/api/hospitals/detail/3';

        mockRequest.params = hospitalReqparams;

        const oneHospital = {
            "hospitalId": 3,
            "hospitalName": "삼성서울병원",
            "hospitalAddress": "서울특별시 강남구 일원로 81",
            "hospitalphone": "0215993115",
            "hospitalImage": [
                {
                    "url": "https://moduhospital.s3.amazonaws.com/doctors/1679565728407_%C3%AC%C2%82%C2%BC%C3%AC%C2%84%C2%B1%C3%AB%C2%B3%C2%91%C3%AC%C2%9B%C2%901.png"
                }
            ],
            "reviews": [
                {
                    "userId": 2,
                    "star": 5,
                    "contents": "sdf",
                    "name": {
                    "name": "허남기"
                    },
                    "createdAt": "2023-03-14T02:06:49.000Z"
                }
            ],
            "doctors": [
                {
                    "doctors": "허남기",
                    "doctorImage": "https://moduhospital.s3.ap-northeast-2.amazonaws.com/doctors/1679566180567_doctor4.png",
                    "doctorContent": "안녕하세요 외과 전문의 입니다. 잘 부탁드려요",
                    "department": "감염내과,내분비내과,류마티스내과",
                    "workTime": [
                        {
                            "day": 1,
                            "start": "10:00:00",
                            "end": "17:00:00",
                            "startDate": "2023-03-01T00:00:00.000Z",
                            "endDate": "2023-03-31T00:00:00.000Z"
                        },
                        {
                            "day": 2,
                            "start": "10:00:00",
                            "end": "17:00:00",
                            "startDate": "2023-03-01T00:00:00.000Z",
                            "endDate": "2023-03-31T00:00:00.000Z"
                        },
                        {
                            "day": 4,
                            "start": "10:00:00",
                            "end": "17:00:00",
                            "startDate": "2023-03-01T00:00:00.000Z",
                            "endDate": "2023-03-31T00:00:00.000Z"
                        },
                        {
                            "day": 5,
                            "start": "10:00:00",
                            "end": "17:00:00",
                            "startDate": "2023-03-01T00:00:00.000Z",
                            "endDate": "2023-03-31T00:00:00.000Z"
                        }
                    ]
                }
            
            ]
        };

        mockHospitalService.getOneHospital = jest.fn(() => oneHospital);

        await hospitalController.getOneHospital(mockRequest, mockResponse);

        expect(mockHospitalService.getOneHospital).toHaveBeenCalledTimes(1);
        expect(mockHospitalService.getOneHospital).toHaveBeenCalledWith(
            hospitalReqparams.params
        );

        expect(mockResponse.json).toHaveBeenCalledWith({oneHospital});
    })
});
