const CategoryService = require('../services/category.service');

class CategoryController {
    categoryService = new CategoryService();

    findHospitalsThatFitsDepartment = async (req, res, next) => {
            const { rightLongitude, rightLatitude, leftLongitude, leftLatitude, department } = req.body;

            if (!department) {
                return 
            }

            const hospitals = await this.categoryService.findHospitalsThatFitsDepartment(
                department,
                rightLongitude,
                rightLatitude,
                leftLongitude,
                leftLatitude
            );

            res.json(hospitals);

    };
}

module.exports = CategoryController;
