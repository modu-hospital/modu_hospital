const CategoryService = require('../../../services/category.service');

const mockCategoryRepository = {
    findHospitalsThatFitsDepartment: jest.fn(),
};

const categoryService = new CategoryService();
categoryService.categoryRepository = mockCategoryRepository;

describe('Layered Architecture Pattern Category Service Unit Test', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('Category Service findHospitalsThatFitsDepartment Method', async () => {
        const returnValue = {
            id: 2,
            department: '비뇨기과',
            createdAt: null,
            updatedAt: null,
            categoriesMapping: [
                {
                    id: 2,
                    doctorId: 1,
                    categoryId: 2,
                    createdAt: null,
                    updatedAt: null,
                    doctors: {
                        name: '김닥터',
                        hospitals: {
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
                        },
                    },
                },
                {
                    id: 4,
                    doctorId: 2,
                    categoryId: 2,
                    createdAt: null,
                    updatedAt: null,
                    doctors: {
                        name: '이희찬',
                        hospitals: {
                            hospitalId: 6,
                            userId: 2,
                            name: '천재병원',
                            address: '경기도 성남시 분당구 야탑로 59',
                            phone: '0215447522',
                            longitude: 127.125836917568,
                            latitude: 37.4104661093887,
                            createdAt: '2023-03-01T11:35:25.000Z',
                            updatedAt: '2023-03-08T00:58:56.000Z',
                            deletedAt: null,
                            hospitalImageFiles: [],
                        },
                    },
                },
                {
                    id: 5,
                    doctorId: 3,
                    categoryId: 2,
                    createdAt: null,
                    updatedAt: null,
                    doctors: {
                        name: '김범석',
                        hospitals: {
                            hospitalId: 6,
                            userId: 2,
                            name: '천재병원',
                            address: '경기도 성남시 분당구 야탑로 59',
                            phone: '0215447522',
                            longitude: 127.125836917568,
                            latitude: 37.4104661093887,
                            createdAt: '2023-03-01T11:35:25.000Z',
                            updatedAt: '2023-03-08T00:58:56.000Z',
                            deletedAt: null,
                            hospitalImageFiles: [],
                        },
                    },
                },
            ],
        };

        mockCategoryRepository.findHospitalsThatFitsDepartment.mockResolvedValue(returnValue);

        const hospitals = await categoryService.findHospitalsThatFitsDepartment(
            '비뇨기과',
            129.13245302025508,
            39.52700879612589,
            125.99344298385097,
            35.47504078291968
        );
        expect(hospitals).toEqual([
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
        ]);
    });

    test('Category Service findHospitalsThatFitsDepartment Method By null', async () => {
        const returnValue = null;

        mockCategoryRepository.findHospitalsThatFitsDepartment.mockResolvedValue(returnValue);

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
