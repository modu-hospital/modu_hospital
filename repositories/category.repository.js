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

    findHospitalsThatFitsDepartment = async (
        department,
        rightLongitude,
        rightLatitude,
        leftLongitude,
        leftLatitude
    ) => {
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
                            required: false,
                            attributes: ['name'],
                            include: [
                                {
                                    model: this.hospitalModel,
                                    as: 'hospitals',
                                    where: {
                                        longitude: {
                                            [Op.and]: [
                                                { [Op.gte]: leftLongitude },
                                                { [Op.lte]: rightLongitude },
                                            ],
                                        },
                                        latitude: {
                                            [Op.and]: [
                                                { [Op.gte]: leftLatitude },
                                                { [Op.lte]: rightLatitude },
                                            ],
                                        },
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
