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
        try {
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

            // return hospitals

            let arr = [];
            hospitals.map((department) => {
                for (let i = 0; i < department.categoriesMapping.length; i++) {
                    if (!department.categoriesMapping[i].doctors) {
                        return;
                    }

                    if (department.categoriesMapping[i].doctors.hospitals) {
                        let data = {
                            hospitalId:
                                department.categoriesMapping[i].doctors.hospitals.hospitalId,
                        };
                        arr.push(data);
                    }
                }
            });

            const info = await Promise.all(
                arr.map(async (hospitalId) => {
                    return await this.categoryRepository.searchHospitalInfo(hospitalId.hospitalId);
                })
            );

            const infos = info.map((hospital) => {
                let department = hospital.doctors.map((doctor) => {
                    return doctor.doctorCategoryMappings.map((department) => {
                        return department.categories.department;
                    });
                });
                department = department.join(',').split(',');
                const Uniquedepartment = [...new Set(department.map(JSON.stringify))].map(
                    JSON.parse
                );
                return {
                    hospitalId: hospital.hospitalId,
                    name: hospital.name,
                    address: hospital.address,
                    phone: hospital.phone,
                    hospitalImage: !hospital.hospitalImageFiles[0]
                        ? '이미지 준비중'
                        : hospital.hospitalImageFiles[0].url,
                    departments: Uniquedepartment.sort(),
                };
            });

            const uniqueArr = [...new Set(infos.map(JSON.stringify))].map(JSON.parse);

            return uniqueArr;
        } catch (err) {
            throw err;
        }
    };
}

module.exports = CategoryService;
