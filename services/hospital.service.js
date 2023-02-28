const HospitalRepository = require('../repositories/hospital.repository');
const { Hospital } = require('../models/index');

class HospitalService {
    hospitalRepository = new HospitalRepository(Hospital);

    findNearHospital = async (right, left, right1, left1) => {
      const longitude = []
      const latitude = []
      longitude.push(left)
      longitude.push(right)
      latitude.push(right1)
      latitude.push(left1)
      const hospitals = await this.hospitalRepository.findNearHospitals(longitude, latitude)

      return hospitals
    }
}

module.exports = HospitalService
