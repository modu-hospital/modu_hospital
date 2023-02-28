const HospitalService = require('../services/hospital.service');

class HospitalController {
    hospitalService = new HospitalService()

    findNearHospital = async (req,res) => {
      const {location} = req.body

      const hospitals = this.hospitalService.findNearHospital(location)

      res.json({hospitals})
    }
}

module.exports = HospitalController;