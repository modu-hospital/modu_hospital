const CategoryRepository = require('../repositories/category.repository');
const {
    Hospital,
    Doctor,
    Category,
    DoctorCategoryMapping,
    HospitalImageFile,
} = require('../models/index.js');

class CategoryService {
    categoryRepository = new CategoryRepository(
        Hospital,
        Doctor,
        Category,
        DoctorCategoryMapping,
        HospitalImageFile
    );

    findHospitalsThatFitsDepartment = async (
        departments,
        rightLongitude,
        rightLatitude,
        leftLongitude,
        leftLatitude
    ) => {
        const hospitals = await Promise.all(
            departments.split(',').map(async (department) => {
                return await this.categoryRepository.findHospitalsThatFitsDepartment(
                    department,
                    rightLongitude,
                    rightLatitude,
                    leftLongitude,
                    leftLatitude
                );
            })
        );

        const empty = hospitals.filter((hospital) => !hospital);
        if (empty.length > 0) {
            return [];
        }

        const emptyCategoryMapping = hospitals.filter(
            (hospital) => hospital.categoriesMapping.length < 1
        );

        if (emptyCategoryMapping.length > 0) {
            return [];
        }

        let arr = [];
        hospitals.map((department) => {
            for (let i = 0; i < department.categoriesMapping.length; i++) {
                if (!department.categoriesMapping[i].doctors) {
                    return;
                }

                if (department.categoriesMapping[i].doctors.hospitals) {
                    let data = {
                        hospitalId: department.categoriesMapping[i].doctors.hospitals.hospitalId,
                        hospitalName: department.categoriesMapping[i].doctors.hospitals.name,
                        address: department.categoriesMapping[i].doctors.hospitals.address,
                        phone: department.categoriesMapping[i].doctors.hospitals.phone,
                        hospitalImage: !department.categoriesMapping[i].doctors.hospitals
                            .hospitalImageFiles[0]
                            ? '이미지 준비중'
                            : department.categoriesMapping[i].doctors.hospitals
                                  .hospitalImageFiles[0].url,
                    };
                    arr.push(data);
                }
            }
        });

        const uniqueArr = [...new Set(arr.map(JSON.stringify))].map(JSON.parse);

        return uniqueArr;
    };
}

module.exports = CategoryService;
