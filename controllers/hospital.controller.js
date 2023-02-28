const HospitalService = require('../services/hospital.service');

class HospitalController {
    hospitalService = new HospitalService()

    findNearHospital = async (req,res) => {
      const {right, left, right1, left1} = req.body

      const hospitals = await this.hospitalService.findNearHospital(right, left, right1, left1)

      res.json({hospitals})
    }
}

module.exports = HospitalController;