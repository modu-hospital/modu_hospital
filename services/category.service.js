const CategoryRepository = require('../repositories/category.repository');
const { Hospital, Doctor, Category, DoctorCategoryMapping } = require('../models/index.js');

class CategoryService {
    categoryRepository = new CategoryRepository(Hospital, Doctor, Category, DoctorCategoryMapping);

    findHospitalsThatFitsDepartment = async (
        departments,
        rightLongitude,
        rightLatitude,
        leftLongitude,
        leftLatitude
    ) => {
        try {
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

            if (!hospitals[0]) {
                return [];
            }

            const result = hospitals.map((department) => {
                const doctors = department.categoriesMapping.map((hospital) => {
                    return {
                        hospitalId: hospital.doctors.hospitals.hospitalId,
                        hospitalName: hospital.doctors.hospitals.name,
                        address: hospital.doctors.hospitals.address,
                        phone: hospital.doctors.hospitals.phone,
                    };
                });
                return { doctors };
            });
            const arrUnique = result.map((doctor) => {
                return doctor.doctors.filter((character, idx, arr) => {
                    return (
                        arr.findIndex((item) => item.hospitalId === character.hospitalId) === idx
                    );
                });
            });

            const [a] = arrUnique.filter((character, idx, arr) => {
                return arr.findIndex((item) => item.hospitalId === character.hospitalId) === idx;
            });
            return a;
        } catch (err) {
            throw err;
        }
    };
}

module.exports = CategoryService;
