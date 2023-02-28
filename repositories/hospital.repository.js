const {Op} = require("sequelize")
class HospitalRepository {
    constructor(HospitalModel) {
        this.hospitalModel = HospitalModel;
    }

    findNearHospitals = async (location) => {
        const hospitals = await this.hospitalModel.findAll({
            where: { location: { [Op.in]: location } },
        });
        return hospitals
    };
}

module.exports = HospitalRepository;
