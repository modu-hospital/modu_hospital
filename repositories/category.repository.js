const { Op } = require('sequelize');

class CategoryRepository {
    constructor(HospitalModel, DoctorModel, CategoryModel, DoctorCategoryMappingModel) {
        this.hospitalModel = HospitalModel;
        this.doctorModel = DoctorModel;
        this.categoryModel = CategoryModel;
        this.doctorCategoryMappingModel = DoctorCategoryMappingModel;
    }

    findHospitalsThatFitsDepartment = async (department, longitude, latitude) => {
        try {
            return await this.categoryModel.findOne({
                where: { department },
                include: [
                    {
                        model: this.doctorCategoryMappingModel,
                        as: 'categoriesMapping',
                        include: [
                            {
                                model: this.doctorModel,
                                as: 'doctors',
                                attributes: ['name'],
                                include: [
                                    {
                                        model: this.hospitalModel,
                                        as: 'hospitals',
                                        where: {
                                            longitude: { [Op.between]: longitude },
                                            latitude: { [Op.between]: latitude },
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });
        } catch (err) {
            throw err;
        }
    };
}

module.exports = CategoryRepository;
