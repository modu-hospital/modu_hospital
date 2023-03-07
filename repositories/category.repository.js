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
                            attributes: ['name'],
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
                                    include: [
                                        {
                                            model: this.hospitalImageFileModel,
                                            as: 'hospitalImageFiles',
                                        },
                                    ],
                                    required: false,
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
