const HospitalService = require('../../../services/hospital.service');

const mockHospitalRepository = {
    findNearHospitals: jest.fn(),
    findNearHospitalsInfo: jest.fn(),
    searchHospitalInfo: jest.fn(),
    getHospitalInfo: jest.fn(),
    findReview: jest.fn()
};

const hospitalService = new HospitalService();
hospitalService.hospitalRepository = mockHospitalRepository;

describe('Layered Architecture Pattern Hospital Service Unit Test', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('Hospital Service findNearHospitals Method', async () => {
        const returnValue = [
            {
                hospitalId: 3,
                address: '서울특별시 강남구 일원로 81',
            },
            {
                hospitalId: 7,
                address: '서울특별시 강남구 논현동 63-8',
            },
        ];

        mockHospitalRepository.findNearHospitals.mockResolvedValue(returnValue);

        const hospitals = await hospitalService.findNearHospitals(
            37.47504078291968,
            126.99344298385097,
            37.52700879612589,
            127.13245302025508
        );

        expect(hospitals).toEqual([
            {
                hospitalId: 3,
                address: '서울특별시 강남구 일원로 81',
            },
            {
                hospitalId: 7,
                address: '서울특별시 강남구 논현동 63-8',
            },
        ]);
    });

    test('Hospital Service findNearHospitalsInfo Method', async () => {
        const returnValue = [
            {
                hospitalId: 3,
                name: '삼성서울병원',
                address: '서울특별시 강남구 일원로 81',
                phone: '0215993115',
                hospitalImageFiles: [
                    {
                        id: 20,
                        hospitalId: 3,
                        url: 'https://moduhospital.s3.amazonaws.com/doctors/1679565728605_%C3%AC%C2%82%C2%BC%C3%AC%C2%84%C2%B1%C3%AB%C2%B3%C2%91%C3%AC%C2%9B%C2%902.png',
                        createdAt: '2023-03-23T10:02:10.000Z',
                        updatedAt: '2023-03-23T10:02:10.000Z',
                    },
                    {
                        id: 19,
                        hospitalId: 3,
                        url: 'https://moduhospital.s3.amazonaws.com/doctors/1679565728407_%C3%AC%C2%82%C2%BC%C3%AC%C2%84%C2%B1%C3%AB%C2%B3%C2%91%C3%AC%C2%9B%C2%901.png',
                        createdAt: '2023-03-23T10:02:10.000Z',
                        updatedAt: '2023-03-23T10:02:10.000Z',
                    },
                ],
                doctors: [
                    {
                        doctorId: 141,
                        hospitalId: 3,
                        name: '김나래',
                        image: 'https://moduhospital.s3.ap-northeast-2.amazonaws.com/doctors/1679566129648_doctor3.png',
                        contents: '안녕하세요 내과전문의 입니다. 잘 부탁드려요~',
                        createdAt: '2023-03-23T10:08:49.000Z',
                        updatedAt: '2023-03-23T10:08:49.000Z',
                        deletedAt: null,
                        doctorCategoryMappings: [
                            {
                                id: 78,
                                doctorId: 141,
                                categoryId: 22,
                                createdAt: '2023-03-23T10:09:40.000Z',
                                updatedAt: '2023-03-23T10:09:40.000Z',
                                categories: {
                                    id: 22,
                                    department: '흉부외과',
                                    createdAt: '2023-03-15T00:54:10.000Z',
                                    updatedAt: '2023-03-15T00:54:10.000Z',
                                },
                            },
                            {
                                id: 77,
                                doctorId: 141,
                                categoryId: 17,
                                createdAt: '2023-03-23T10:09:40.000Z',
                                updatedAt: '2023-03-23T10:09:40.000Z',
                                categories: {
                                    id: 17,
                                    department: '정형외과',
                                    createdAt: '2023-03-15T00:00:19.000Z',
                                    updatedAt: '2023-03-15T00:00:19.000Z',
                                },
                            },
                            {
                                id: 76,
                                doctorId: 141,
                                categoryId: 14,
                                createdAt: '2023-03-23T10:09:40.000Z',
                                updatedAt: '2023-03-23T10:09:40.000Z',
                                categories: {
                                    id: 14,
                                    department: '외과',
                                    createdAt: '2023-03-14T22:32:17.000Z',
                                    updatedAt: '2023-03-14T22:32:17.000Z',
                                },
                            },
                        ],
                    },
                    {
                        doctorId: 140,
                        hospitalId: 3,
                        name: '허남기',
                        image: 'https://moduhospital.s3.ap-northeast-2.amazonaws.com/doctors/1679566180567_doctor4.png',
                        contents: '안녕하세요 외과 전문의 입니다. 잘 부탁드려요',
                        createdAt: '2023-03-23T10:09:40.000Z',
                        updatedAt: '2023-03-23T10:09:40.000Z',
                        deletedAt: null,
                        doctorCategoryMappings: [
                            {
                                id: 75,
                                doctorId: 140,
                                categoryId: 28,
                                createdAt: '2023-03-23T10:08:50.000Z',
                                updatedAt: '2023-03-23T10:08:50.000Z',
                                categories: {
                                    id: 28,
                                    department: '류마티스내과',
                                    createdAt: '2023-03-23T10:08:49.000Z',
                                    updatedAt: '2023-03-23T10:08:49.000Z',
                                },
                            },
                            {
                                id: 74,
                                doctorId: 140,
                                categoryId: 27,
                                createdAt: '2023-03-23T10:08:50.000Z',
                                updatedAt: '2023-03-23T10:08:50.000Z',
                                categories: {
                                    id: 27,
                                    department: '내분비내과',
                                    createdAt: '2023-03-23T10:08:49.000Z',
                                    updatedAt: '2023-03-23T10:08:49.000Z',
                                },
                            },
                            {
                                id: 73,
                                doctorId: 140,
                                categoryId: 26,
                                createdAt: '2023-03-23T10:08:50.000Z',
                                updatedAt: '2023-03-23T10:08:50.000Z',
                                categories: {
                                    id: 26,
                                    department: '감염내과',
                                    createdAt: '2023-03-23T10:08:49.000Z',
                                    updatedAt: '2023-03-23T10:08:49.000Z',
                                },
                            },
                        ],
                    },
                ],
            },
        ];

        mockHospitalRepository.findNearHospitalsInfo.mockResolvedValue(returnValue);

        const infos = await hospitalService.findNearHospitalsInfo(
            126.99344298385097,
            37.47504078291968,
            127.13245302025508,
            37.52700879612589
        );

        expect(infos).toEqual([
            {
                hospitalId: 3,
                name: '삼성서울병원',
                address: '서울특별시 강남구 일원로 81',
                phone: '0215993115',
                hospitalImage:
                    'https://moduhospital.s3.amazonaws.com/doctors/1679565728605_%C3%AC%C2%82%C2%BC%C3%AC%C2%84%C2%B1%C3%AB%C2%B3%C2%91%C3%AC%C2%9B%C2%902.png',
                departments: [
                    '감염내과',
                    '내분비내과',
                    '류마티스내과',
                    '외과',
                    '정형외과',
                    '흉부외과',
                ],
            },
        ]);
    });

    test('Hospital Service findNearHospitalsInfo Method', async () => {
        const returnValue = {
            hospitalId: 3,
            userId: 1,
            name: '삼성서울병원',
            address: '서울특별시 강남구 일원로 81',
            phone: '0215993115',
            longitude: 127.08303697984,
            latitude: 37.486868162882,
            createdAt: '2023-03-01T11:27:37.000Z',
            updatedAt: '2023-03-01T17:02:32.000Z',
            deletedAt: null,
            hospitalImageFiles: [
                {
                    id: 1,
                    hospitalId: 3,
                    url: 'https://mblogthumb-phinf.pstatic.net/MjAxOTA0MjFfNzEg/MDAxNTU1ODUyNjA1ODMx.S717xo_KomAdcNK5hCSua-Cz7gDpUyf1oXxj_vfVm44g.lFLDNYIdZnbU2n4_qyhODB4bKY_i7zsS4z8RHdlELOYg.JPEG.akswp1224/1.jpg?type=w2',
                    createdAt: null,
                    updatedAt: null,
                },
            ],
            doctors: [
                {
                    name: '김닥터',
                    image: 'https://mblogthumb-phinf.pstatic.net/MjAxOTA0MjFfNzEg/MDAxNTU1ODUyNjA1ODMx.S717xo_KomAdcNK5hCSua-Cz7gDpUyf1oXxj_vfVm44g.lFLDNYIdZnbU2n4_qyhODB4bKY_i7zsS4z8RHdlELOYg.JPEG.akswp1224/1.jpg?type=w2',
                    doctorCategoryMappings: [
                        {
                            id: 2,
                            doctorId: 1,
                            categoryId: 2,
                            createdAt: null,
                            updatedAt: null,
                            categories: {
                                department: '비뇨기과',
                            },
                        },
                        {
                            id: 1,
                            doctorId: 1,
                            categoryId: 1,
                            createdAt: null,
                            updatedAt: null,
                            categories: {
                                department: '내과',
                            },
                        },
                    ],
                },
            ],
        };

        mockHospitalRepository.searchHospitalInfo.mockResolvedValue(returnValue);

        const hospitalInfo = await hospitalService.searchHospitalInfo(3);

        expect(hospitalInfo).toEqual({
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
        });
    });

    // //내가작성한코드
    // test('Hospital Service getHospitalInfo Method', async () => {
    //     const returnValue = {
    //         hospitalId: 3,
    //         userId: 1,
    //         name: '삼성서울병원',
    //         address: '서울특별시 강남구 일원로 81',
    //         phone: '0215993115',
    //         longitude: 127.08303697984,
    //         latitude: 37.486868162882,
    //         createdAt: '2023-03-01T11:27:37.000Z',
    //         updatedAt: '2023-03-01T17:02:32.000Z',
    //         deletedAt: null,
    //         hospitalImageFiles: [
    //             {
    //                 id: 1,
    //                 hospitalId: 3,
    //                 url: 'https://mblogthumb-phinf.pstatic.net/MjAxOTA0MjFfNzEg/MDAxNTU1ODUyNjA1ODMx.S717xo_KomAdcNK5hCSua-Cz7gDpUyf1oXxj_vfVm44g.lFLDNYIdZnbU2n4_qyhODB4bKY_i7zsS4z8RHdlELOYg.JPEG.akswp1224/1.jpg?type=w2',
    //                 createdAt: null,
    //                 updatedAt: null,
    //             },
    //         ],
    //         doctors: [
    //             {
    //                 name: '김닥터',
    //                 image: 'https://mblogthumb-phinf.pstatic.net/MjAxOTA0MjFfNzEg/MDAxNTU1ODUyNjA1ODMx.S717xo_KomAdcNK5hCSua-Cz7gDpUyf1oXxj_vfVm44g.lFLDNYIdZnbU2n4_qyhODB4bKY_i7zsS4z8RHdlELOYg.JPEG.akswp1224/1.jpg?type=w2',
    //                 doctorCategoryMappings: [
    //                     {
    //                         id: 2,
    //                         doctorId: 1,
    //                         categoryId: 2,
    //                         createdAt: null,
    //                         updatedAt: null,
    //                         categories: {
    //                             department: '비뇨기과',
    //                         },
    //                     },
    //                     {
    //                         id: 1,
    //                         doctorId: 1,
    //                         categoryId: 1,
    //                         createdAt: null,
    //                         updatedAt: null,
    //                         categories: {
    //                             department: '내과',
    //                         },
    //                     },
    //                 ],
    //             },
    //         ],
    //     };

    //     mockHospitalRepository.searchHospitalInfo.mockResolvedValue(returnValue);

    //     const hospitalInfo = await hospitalService.searchHospitalInfo(3);

    //     expect(hospitalInfo).toEqual({
    //         hospitalId: 3,
    //         hospitalName: '삼성서울병원',
    //         hospitalAddress: '서울특별시 강남구 일원로 81',
    //         hospitalphone: '0215993115',
    //         hospitalImage:
    //             'https://mblogthumb-phinf.pstatic.net/MjAxOTA0MjFfNzEg/MDAxNTU1ODUyNjA1ODMx.S717xo_KomAdcNK5hCSua-Cz7gDpUyf1oXxj_vfVm44g.lFLDNYIdZnbU2n4_qyhODB4bKY_i7zsS4z8RHdlELOYg.JPEG.akswp1224/1.jpg?type=w2',
    //         doctors: [
    //             {
    //                 doctor: '김닥터',
    //                 doctorImage:
    //                     'https://mblogthumb-phinf.pstatic.net/MjAxOTA0MjFfNzEg/MDAxNTU1ODUyNjA1ODMx.S717xo_KomAdcNK5hCSua-Cz7gDpUyf1oXxj_vfVm44g.lFLDNYIdZnbU2n4_qyhODB4bKY_i7zsS4z8RHdlELOYg.JPEG.akswp1224/1.jpg?type=w2',
    //                 department: '비뇨기과,내과',
    //             },
    //         ],
    //     });
    // });
});
