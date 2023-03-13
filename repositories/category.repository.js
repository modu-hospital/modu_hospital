const { Op } = require('sequelize');

class CategoryRepository {
    constructor(
        HospitalModel,
        DoctorModel,
        CategoryModel,
        DoctorCategoryMappingModel,
        HospitalImageFileModel
    ) {
        this.hospitalModel = HospitalModel;
        this.doctorModel = DoctorModel;
        this.categoryModel = CategoryModel;
        this.doctorCategoryMappingModel = DoctorCategoryMappingModel;
        this.hospitalImageFileModel = HospitalImageFileModel;
    }

    findHospitalsThatFitsDepartment = async (department, longitude, latitude) => {
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
                            paranoid: false,
                            required: false,
                            attributes: ['name'],
                            where: {
                                deletedAt: { [Op.lt]: 1 },
                            },
                            include: [
                                {
                                    model: this.hospitalModel,
                                    paranoid: false,
                                    as: 'hospitals',
                                    where: {
                                        deletedAt: { [Op.lt]: 1 },
                                        longitude: { [Op.between]: longitude },
                                        latitude: { [Op.between]: latitude },
                                    },
                                    required: false,
                                    include: [
                                        {
                                            model: this.hospitalImageFileModel,
                                            as: 'hospitalImageFiles',
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        });
    };
}

module.exports = CategoryRepository;
