const CategoryRepository = require('../repositories/category.repository');
const { Hospital, Doctor, Category, DoctorCategoryMapping, HospitalImageFile } = require('../models/index.js');

class CategoryService {
    categoryRepository = new CategoryRepository(Hospital, Doctor, Category, DoctorCategoryMapping, HospitalImageFile);

    findHospitalsThatFitsDepartment = async (
        departments,
        rightLongitude,
        rightLatitude,
        leftLongitude,
        leftLatitude
    ) => {
        const longitude = [];
        const latitude = [];
        longitude.push(leftLongitude, rightLongitude);
        latitude.push(rightLatitude, leftLatitude);
        longitude.sort((a, b) => {
            return a - b;
        });
        latitude.sort((a, b) => {
            return a - b;
        });

        const hospitals = await Promise.all(
            departments.split(',').map(async (department) => {
                return await this.categoryRepository.findHospitalsThatFitsDepartment(
                    department,
                    longitude,
                    latitude
                );
            })
        );

        // return hospitals
        // 아직 등록되지 않은 진료과목 선택 시
        const empty = hospitals.filter(hospital => !hospital)
        if (empty.length > 0) {
            return []
        }
        
        let arr = []
        hospitals.map(department => {
            for (let i = 0; i < department.categoriesMapping.length; i++) {
                if (!department.categoriesMapping[i].doctors.hospitals) {
                    department.categoriesMapping[i].doctors.hospitals = {}
                }

                let data = {
                    hospitalId : department.categoriesMapping[i].doctors.hospitals.hospitalId,
                    hospitalName: department.categoriesMapping[i].doctors.hospitals.name,
                    address: department.categoriesMapping[i].doctors.hospitals.address,
                    phone: department.categoriesMapping[i].doctors.hospitals.phone,
                    hospitalImage: department.categoriesMapping[i].doctors.hospitals.hospitalImageFiles[0] ? department.categoriesMapping[i].doctors.hospitals.hospitalImageFiles[0].url : "이미지 준비중",
                }

                arr.push(data)
            }
        })

        const a = [...new Set(arr.map(JSON.stringify))].map(JSON.parse);

        return a
    };
}

module.exports = CategoryService;
