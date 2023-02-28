const { Op } = require('sequelize');
class HospitalRepository {
    constructor(HospitalModel) {
        this.hospitalModel = HospitalModel;
    }
    // location.coordinates
    findNearHospitals = async (longitude, latitude) => {
        const hospitals = await this.hospitalModel.findAll({
            where: { longitude : {[Op.between] : longitude},  latitude : {[Op.between] : latitude}},
        });
        return hospitals;
    };
}

module.exports = HospitalRepository;
