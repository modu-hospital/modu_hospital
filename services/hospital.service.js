const HospitalRepository = require('../repositories/hospital.repository');
const { Hospital } = require('../models/index');

class HospitalService {
    hospitalRepository = new HospitalRepository(Hospital);

    findNearHospital = async (location) => {
      const hospitals = await this.hospitalRepository.findNearHospitals(location)

      return hospitals
    }
}

module.exports = HospitalService
