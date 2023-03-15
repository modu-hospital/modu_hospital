const WorkingtimeService = require('../services/workingTime.service.js');
const Validation = require('../lib/validation');

class WorkingtimeController {
    workingtimeService = new WorkingtimeService();
    validation = new Validation();

    // reservation
    diagnosisReservation = async (req, res) => {
        const { year, month, date, week } = req.query;
        const findWorkingDate = await this.workingtimeService.findWorkingDate(
            year,
            month,
            date,
            week
        );
        return res.status(200).json(findWorkingDate);
        // hospitalName: findWorkingDate[0].HospitalName,
        // doctorName: findWorkingDate[0].doctorName,
        // startTime: findWorkingDate[0].startTime,
        // endTime: findWorkingDate[0].endTime,
        // startDate: findWorkingDate[0].startDate,
        // endDate: findWorkingDate[0].endDate,
        // times: findWorkingDate.slice(1),
    };
}

module.exports = WorkingtimeController;
