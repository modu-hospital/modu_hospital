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

    reservaionInput = async (req, res, next) => {
        try {
            const {
                relationship,
                selfwrite,
                name,
                proxyname,
                idnumber,
                phone,
                address,
                reservationdate,
                reservationtime,
            } = req.body;

            const reservaionInputData = await this.workingtimeService.reservaionInputData(
                relationship,
                selfwrite,
                name,
                proxyname,
                idnumber,
                phone,
                address,
                reservationdate,
                reservationtime
            );

            res.status(201).json({ result: 'success', data: reservaionInputData });
        } catch (err) {
            console.error(err);
        }
    };
}

module.exports = WorkingtimeController;
