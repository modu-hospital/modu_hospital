const HospitalService = require('../../../services/hospital.service');

const mockHospitalRepository = {
    findNearHospitals: jest.fn(),
    findNearHospitalsInfo: jest.fn(),
    searchHospitalInfo: jest.fn(),
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
          "hospitalId": 3,
          "name": "삼성서울병원",
          "address": "서울특별시 강남구 일원로 81",
          "phone": "0215993115",
          "hospitalImageFiles": [
            {
              "id": 1,
              "hospitalId": 3,
              "url": "https://mblogthumb-phinf.pstatic.net/MjAxOTA0MjFfNzEg/MDAxNTU1ODUyNjA1ODMx.S717xo_KomAdcNK5hCSua-Cz7gDpUyf1oXxj_vfVm44g.lFLDNYIdZnbU2n4_qyhODB4bKY_i7zsS4z8RHdlELOYg.JPEG.akswp1224/1.jpg?type=w2",
              "createdAt": null,
              "updatedAt": null
            }
          ],
        },
        {
          "hospitalId": 7,
          "name": "강남나누리병원",
          "address": "서울특별시 강남구 논현동 63-8",
          "phone": "0216889797",
          "hospitalImageFiles": [],
        },
      ]

      mockHospitalRepository.findNearHospitalsInfo.mockResolvedValue(returnValue)

      const infos = await hospitalService.findNearHospitalsInfo(
        126.99344298385097,
        37.47504078291968,
        127.13245302025508,
        37.52700879612589,
      )

      expect(infos).toEqual([
        {
          "hospitalId": 3,
          "name": "삼성서울병원",
          "address": "서울특별시 강남구 일원로 81",
          "phone": "0215993115",
          "hospitalImage": "https://mblogthumb-phinf.pstatic.net/MjAxOTA0MjFfNzEg/MDAxNTU1ODUyNjA1ODMx.S717xo_KomAdcNK5hCSua-Cz7gDpUyf1oXxj_vfVm44g.lFLDNYIdZnbU2n4_qyhODB4bKY_i7zsS4z8RHdlELOYg.JPEG.akswp1224/1.jpg?type=w2"
        },
        {
          "hospitalId": 7,
          "name": "강남나누리병원",
          "address": "서울특별시 강남구 논현동 63-8",
          "phone": "0216889797",
          "hospitalImage": "이미지 준비중"
        }
      ])
    });

    test('Hospital Service findNearHospitalsInfo Method', async () => {
      const returnValue = {
        "hospitalId": 3,
        "userId": 1,
        "name": "삼성서울병원",
        "address": "서울특별시 강남구 일원로 81",
        "phone": "0215993115",
        "longitude": 127.08303697984,
        "latitude": 37.486868162882,
        "createdAt": "2023-03-01T11:27:37.000Z",
        "updatedAt": "2023-03-01T17:02:32.000Z",
        "deletedAt": null,
        "hospitalImageFiles": [
          {
            "id": 1,
            "hospitalId": 3,
            "url": "https://mblogthumb-phinf.pstatic.net/MjAxOTA0MjFfNzEg/MDAxNTU1ODUyNjA1ODMx.S717xo_KomAdcNK5hCSua-Cz7gDpUyf1oXxj_vfVm44g.lFLDNYIdZnbU2n4_qyhODB4bKY_i7zsS4z8RHdlELOYg.JPEG.akswp1224/1.jpg?type=w2",
            "createdAt": null,
            "updatedAt": null
          }
        ],
        "doctors": [
          {
            "name": "김닥터",
            "image": "https://mblogthumb-phinf.pstatic.net/MjAxOTA0MjFfNzEg/MDAxNTU1ODUyNjA1ODMx.S717xo_KomAdcNK5hCSua-Cz7gDpUyf1oXxj_vfVm44g.lFLDNYIdZnbU2n4_qyhODB4bKY_i7zsS4z8RHdlELOYg.JPEG.akswp1224/1.jpg?type=w2",
            "doctorCategoryMappings": [
              {
                "id": 2,
                "doctorId": 1,
                "categoryId": 2,
                "createdAt": null,
                "updatedAt": null,
                "categories": {
                  "department": "비뇨기과"
                }
              },
              {
                "id": 1,
                "doctorId": 1,
                "categoryId": 1,
                "createdAt": null,
                "updatedAt": null,
                "categories": {
                  "department": "내과"
                }
              }
            ]
          }
        ]
      }

      mockHospitalRepository.searchHospitalInfo.mockResolvedValue(returnValue)

      const hospitalInfo = await hospitalService.searchHospitalInfo(3)

      expect(hospitalInfo).toEqual({
        "hospitalId": 3,
        "hospitalName": "삼성서울병원",
        "hospitalAddress": "서울특별시 강남구 일원로 81",
        "hospitalphone": "0215993115",
        "hospitalImage": "https://mblogthumb-phinf.pstatic.net/MjAxOTA0MjFfNzEg/MDAxNTU1ODUyNjA1ODMx.S717xo_KomAdcNK5hCSua-Cz7gDpUyf1oXxj_vfVm44g.lFLDNYIdZnbU2n4_qyhODB4bKY_i7zsS4z8RHdlELOYg.JPEG.akswp1224/1.jpg?type=w2",
        "doctors": [
          {
            "doctor": "김닥터",
            "doctorImage": "https://mblogthumb-phinf.pstatic.net/MjAxOTA0MjFfNzEg/MDAxNTU1ODUyNjA1ODMx.S717xo_KomAdcNK5hCSua-Cz7gDpUyf1oXxj_vfVm44g.lFLDNYIdZnbU2n4_qyhODB4bKY_i7zsS4z8RHdlELOYg.JPEG.akswp1224/1.jpg?type=w2",
            "department": "비뇨기과,내과"
          }
        ]
      })
    })
});
