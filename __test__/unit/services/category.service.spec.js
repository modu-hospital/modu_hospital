const CategoryService = require('../../../services/category.service');

const mockCategoryRepository = {
    findHospitalsThatFitsDepartment: jest.fn(),
    searchHospitalInfo: jest.fn()
};

const categoryService = new CategoryService();
categoryService.categoryRepository = mockCategoryRepository;

describe('Layered Architecture Pattern Category Service Unit Test', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('Category Service findHospitalsThatFitsDepartment Method', async () => {
        const returnValue = 
        {
            "id": 18,
            "department": "안과",
            "createdAt": "2023-03-15T00:41:03.000Z",
            "updatedAt": "2023-03-15T00:41:03.000Z",
            "categoriesMapping": [
              {
                "id": 127,
                "doctorId": 172,
                "categoryId": 18,
                "createdAt": "2023-03-23T13:12:50.000Z",
                "updatedAt": "2023-03-23T13:12:50.000Z",
                "doctors": {
                  "name": "남궁혁",
                  "hospitals": {
                    "hospitalId": 19,
                    "userId": 235,
                    "name": "우리집병원",
                    "address": "서울특별시 강남구 자곡로 100-2(자곡동)",
                    "phone": "0105156465",
                    "longitude": 127.095746441934,
                    "latitude": 37.4714953520547,
                    "createdAt": "2023-03-07T09:39:39.000Z",
                    "updatedAt": "2023-03-07T09:39:39.000Z",
                    "deletedAt": null,
                    "hospitalImageFiles": [
                      {
                        "id": 37,
                        "hospitalId": 19,
                        "url": "https://moduhospital.s3.ap-northeast-2.amazonaws.com/doctors/1679577127171_%C3%AC%C2%9A%C2%B0%C3%AB%C2%A6%C2%AC%C3%AC%C2%A7%C2%91%C3%AB%C2%B3%C2%91%C3%AC%C2%9B%C2%901.png",
                        "createdAt": "2023-03-23T13:12:07.000Z",
                        "updatedAt": "2023-03-23T13:12:07.000Z"
                      }
                    ]
                  }
                }
              }
            ]
          }
        
            const infoReturn = {
                "hospitalId": 19,
                "name": "우리집병원",
                "address": "서울특별시 강남구 자곡로 100-2(자곡동)",
                "phone": "0105156465",
                "hospitalImageFiles": [
                  {
                    "id": 37,
                    "hospitalId": 19,
                    "url": "https://moduhospital.s3.ap-northeast-2.amazonaws.com/doctors/1679577127171_%C3%AC%C2%9A%C2%B0%C3%AB%C2%A6%C2%AC%C3%AC%C2%A7%C2%91%C3%AB%C2%B3%C2%91%C3%AC%C2%9B%C2%901.png",
                    "createdAt": "2023-03-23T13:12:07.000Z",
                    "updatedAt": "2023-03-23T13:12:07.000Z"
                  }
                ],
                "doctors": [
                  {
                    "doctorId": 172,
                    "hospitalId": 19,
                    "name": "남궁혁",
                    "image": "https://moduhospital.s3.ap-northeast-2.amazonaws.com/doctors/1679577170159_doctor2.png",
                    "contents": "소림마라 좋아합니다.",
                    "createdAt": "2023-03-23T13:12:50.000Z",
                    "updatedAt": "2023-03-23T13:12:50.000Z",
                    "deletedAt": null,
                    "doctorCategoryMappings": [
                      {
                        "id": 127,
                        "doctorId": 172,
                        "categoryId": 18,
                        "createdAt": "2023-03-23T13:12:50.000Z",
                        "updatedAt": "2023-03-23T13:12:50.000Z",
                        "categories": {
                          "id": 18,
                          "department": "안과",
                          "createdAt": "2023-03-15T00:41:03.000Z",
                          "updatedAt": "2023-03-15T00:41:03.000Z"
                        }
                      }
                    ]
                  },
                  {
                    "doctorId": 171,
                    "hospitalId": 19,
                    "name": "배겨울",
                    "image": "https://moduhospital.s3.ap-northeast-2.amazonaws.com/doctors/1679577152411_doctor4.png",
                    "contents": "안녕하세요 원장입니다",
                    "createdAt": "2023-03-23T13:12:32.000Z",
                    "updatedAt": "2023-03-23T13:12:32.000Z",
                    "deletedAt": null,
                    "doctorCategoryMappings": [
                      {
                        "id": 126,
                        "doctorId": 171,
                        "categoryId": 14,
                        "createdAt": "2023-03-23T13:12:32.000Z",
                        "updatedAt": "2023-03-23T13:12:32.000Z",
                        "categories": {
                          "id": 14,
                          "department": "외과",
                          "createdAt": "2023-03-14T22:32:17.000Z",
                          "updatedAt": "2023-03-14T22:32:17.000Z"
                        }
                      }
                    ]
                  }
                ]
              }

        mockCategoryRepository.findHospitalsThatFitsDepartment.mockResolvedValue(returnValue);
        mockCategoryRepository.searchHospitalInfo.mockResolvedValue(infoReturn);

        const hospitals = await categoryService.findHospitalsThatFitsDepartment(
            '안과',
            129.13245302025508,
            39.52700879612589,
            125.99344298385097,
            35.47504078291968
        );
        expect(hospitals).toEqual([
            {
                "hospitalId": 19,
                "name": "우리집병원",
                "address": "서울특별시 강남구 자곡로 100-2(자곡동)",
                "phone": "0105156465",
                "hospitalImage": "https://moduhospital.s3.ap-northeast-2.amazonaws.com/doctors/1679577127171_%C3%AC%C2%9A%C2%B0%C3%AB%C2%A6%C2%AC%C3%AC%C2%A7%C2%91%C3%AB%C2%B3%C2%91%C3%AC%C2%9B%C2%901.png",
                "departments": [
                  "안과",
                  "외과"
                ]
              }
          ]);
    });

    test('Category Service findHospitalsThatFitsDepartment Method By null', async () => {
        let returnValue
        const infoReturnValue = []

        mockCategoryRepository.findHospitalsThatFitsDepartment.mockResolvedValue(returnValue);
        mockCategoryRepository.searchHospitalInfo.mockResolvedValue(infoReturnValue);

        const hospitals = await categoryService.findHospitalsThatFitsDepartment(
            '치과',
            129.13245302025508,
            39.52700879612589,
            125.99344298385097,
            35.47504078291968
        );

        expect(hospitals).toEqual([]);
    });
});
