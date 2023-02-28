const HospitalService = require('../services/hospital.service')

class HospitalController {
    hospitalService = new HospitalService()

    // 예약관리 조회 
    findAllReservation = async (req, res, next)=> {
        try {
            const data = await this.hospitalService.findAllReservation();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({message: error.message}) 
        }
    };

    // 예약관리 수정
    editReservation = async (req, res, next) => {
        const {id} = req.params;
        console.log(id);
        const { date, status } = req.body;
        try {
            const updated = await this.hospitalService.editReservation(id,status, date);
            
            res.status(200).json({ updated: updated  });
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    };
}

module.exports = HospitalController;