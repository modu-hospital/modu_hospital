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

        const hospitals = 
        [
            {
              "hospitalId": 3,
              "address": "서울특별시 강남구 일원로 81"
            }
          ]
          
        mockHospitalService.findNearHospitals = jest.fn(() => hospitals);

        await hospitalController.findNearHospital(mockRequest, mockResponse);

        expect(mockHospitalService.findNearHospitals).toHaveBeenCalledTimes(1);
        expect(mockHospitalService.findNearHospitals).toHaveBeenCalledWith(
            hospitalReqBody.rightLongitude,
            hospitalReqBody.rightLatitude,
            hospitalReqBody.leftLongitude,
            hospitalReqBody.leftLatitude
        );

        expect(mockResponse.json).toHaveBeenCalledWith({hospitals});
    });

    test('Hospital Controller findNearHospitalsInfo Method', async () => {
      const hospitalReqBody = {
          rightLongitude: 127.13245302025508,
          rightLatitude: 37.52700879612589,
          leftLongitude: 126.99344298385097,
          leftLatitude: 37.47504078291968,
      };

      mockRequest.body = hospitalReqBody;

      const hospitals = 
      [
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
        ]
        
      mockHospitalService.findNearHospitalsInfo = jest.fn(() => hospitals);

      await hospitalController.findNearHospitalsInfo(mockRequest, mockResponse);

      expect(mockHospitalService.findNearHospitalsInfo).toHaveBeenCalledTimes(1);
      expect(mockHospitalService.findNearHospitalsInfo).toHaveBeenCalledWith(
          hospitalReqBody.rightLongitude,
          hospitalReqBody.rightLatitude,
          hospitalReqBody.leftLongitude,
          hospitalReqBody.leftLatitude
      );

      expect(mockResponse.json).toHaveBeenCalledWith({hospitals});
  });

  test('Hospital Controller findNearHospitals Method', async () => {
    const hospitalReqparams = "http://localhost:3000/api/hospitals/info/3"

    mockRequest.params = hospitalReqparams;

    const hospitalInfo = {
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
    }
      
    mockHospitalService.searchHospitalInfo = jest.fn(() => hospitalInfo);

    await hospitalController.searchHospitalInfo(mockRequest, mockResponse);

    expect(mockHospitalService.searchHospitalInfo).toHaveBeenCalledTimes(1);
    expect(mockHospitalService.searchHospitalInfo).toHaveBeenCalledWith(hospitalReqparams.params);

    expect(mockResponse.json).toHaveBeenCalledWith(hospitalInfo);
});
});
