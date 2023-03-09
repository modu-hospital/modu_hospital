const CategoryController = require('../../../controllers/category.controller');

let mockCategoryService = {
    findHospitalsThatFitsDepartment: jest.fn(),
};

let mockRequest = {
    body: jest.fn(),
};

let mockResponse = {
    json: jest.fn(),
};

let categoryController = new CategoryController();
categoryController.categoryService = mockCategoryService;

describe('Layered Architecture Pattern Category Controller Unit Test', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('Category Controller findHospitalsThatFitsDepartment Method by Success', async () => {
        const categoryReqBody = {
            leftLatitude: 35.47504078291968,
            leftLongitude: 125.99344298385097,
            rightLatitude: 39.52700879612589,
            rightLongitude: 129.13245302025508,
            department: '비뇨기과',
        };

        mockRequest.body = categoryReqBody;

        const returnValue = [
            {
                hospitalId: 3,
                hospitalName: '삼성서울병원',
                address: '서울특별시 강남구 일원로 81',
                phone: '0215993115',
                hospitalImage:
                    'https://mblogthumb-phinf.pstatic.net/MjAxOTA0MjFfNzEg/MDAxNTU1ODUyNjA1ODMx.S717xo_KomAdcNK5hCSua-Cz7gDpUyf1oXxj_vfVm44g.lFLDNYIdZnbU2n4_qyhODB4bKY_i7zsS4z8RHdlELOYg.JPEG.akswp1224/1.jpg?type=w2',
            },
            {
                hospitalId: 6,
                hospitalName: '천재병원',
                address: '경기도 성남시 분당구 야탑로 59',
                phone: '0215447522',
                hospitalImage: '이미지 준비중',
            },
        ];

        mockCategoryService.findHospitalsThatFitsDepartment = jest.fn(() => returnValue);

        await categoryController.findHospitalsThatFitsDepartment(mockRequest, mockResponse);

        expect(mockCategoryService.findHospitalsThatFitsDepartment).toHaveBeenCalledTimes(1);
        expect(mockCategoryService.findHospitalsThatFitsDepartment).toHaveBeenCalledWith(
            categoryReqBody.department,
            categoryReqBody.rightLongitude,
            categoryReqBody.rightLatitude,
            categoryReqBody.leftLongitude,
            categoryReqBody.leftLatitude
        );

        expect(mockResponse.json).toHaveBeenCalledWith(returnValue);
    });
});
