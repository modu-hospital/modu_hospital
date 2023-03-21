const WorkingtimeService = require('../services/workingTime.service.js');
const Validation = require('../lib/validation');

class WorkingtimeController {
    workingtimeService = new WorkingtimeService();
    validation = new Validation();

    // reservationTime
    diagnosisReservation = async (req, res) => {
        const { year, month, date, week } = req.query;
        const findWorkingDate = await this.workingtimeService.findWorkingDate(
            year,
            month,
            date,
            week
        );
        return res.status(200).json(findWorkingDate);
    };
}

module.exports = WorkingtimeController;
