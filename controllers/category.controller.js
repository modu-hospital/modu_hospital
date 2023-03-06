const CategoryService = require('../services/category.service');

class CategoryController {
    categoryService = new CategoryService();

    findHospitalsThatFitsDepartment = async (req, res, next) => {
        try {
            const { department } = req.query;
            const { rightLongitude, rightLatitude, leftLongitude, leftLatitude } = req.body;

            const doctors = await this.categoryService.findHospitalsThatFitsDepartment(
                department,
                rightLongitude,
                rightLatitude,
                leftLongitude,
                leftLatitude
            );

            res.json(doctors);
        } catch (err) {
            next(err);
        }
    };
}

module.exports = CategoryController;
