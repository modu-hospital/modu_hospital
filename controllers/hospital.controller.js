const HospitalService = require('../services/hospital.service');

class HospitalController {
    hospitalService = new HospitalService();

    findNearHospital = async (req, res) => {
        const { rightLongitude, rightLatitude, leftLongitude, leftLatitude } = req.body;

        const hospitals = await this.hospitalService.findNearHospital(
            rightLongitude,
            rightLatitude,
            leftLongitude,
            leftLatitude
        );

        res.json({ hospitals });
    };

    // 예약관리 조회
    findAllReservation = async (req, res, next) => {
        try {
            const data = await this.hospitalService.findAllReservation();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    // 예약관리 수정
    editReservation = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { date, status } = req.body;
            const updateReservation = await this.hospitalService.editReservation(id, date, status);
            res.status(200).json({ data: updateReservation });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };
}

module.exports = HospitalController;
