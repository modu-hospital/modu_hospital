const { Op } = require('sequelize');

class WorkingtimeRepository {
    constructor(
        UserModel,
        HospitalModel,
        DoctorModel,
        sequelize,
        WorkingTimeModel,
        ReservationModel
    ) {
        this.userModel = UserModel;
        this.hospitalModel = HospitalModel;
        this.doctorModel = DoctorModel;
        this.sequelize = sequelize;
        this.workingTimeModel = WorkingTimeModel;
        this.reservationModel = ReservationModel;
    }

    findReservationDateByWeek = async (hospitalId, selectedYMD, week) => {
        const query = `SELECT h.name AS HospitalName, r.name AS UserName, d.name, DATE_FORMAT(r.date, '%H:%i') AS date FROM hospitals AS h
        INNER JOIN doctors AS d on h.hospitalId = d.hospitalId
        INNER JOIN reservations AS r on d.doctorId = r.doctorId
        INNER JOIN workingTimes AS wt on r.doctorId = wt.doctorId
        WHERE h.hospitalId = ${hospitalId} AND wt.dayOfTheWeek = ${week} AND r.status = "approved" AND DATE_FORMAT(r.date  , '%Y%m%d') = ${selectedYMD}
        ORDER BY d.doctorId ASC`;
        const result = await this.sequelize.query(query, {
            type: this.sequelize.QueryTypes.SELECT,
        });
        return result;
    };

    findWorkingDateByYMDW = async (hospitalId, selectedYMD, week) => {
        const query = `SELECT h.name AS HospitalName, d.doctorId AS doctorId, d.name AS doctorName, DATE_FORMAT(wt.startTime, '%H:%i') AS startTime, DATE_FORMAT(wt.endTime, '%H:%i') AS endTime, DATE_FORMAT(wt.startDate  , '%Y-%m-%d') AS startDate, DATE_FORMAT(wt.endDate  , '%Y-%m-%d') AS endDate FROM hospitals AS h
        INNER JOIN doctors AS d on h.hospitalId = d.hospitalId
        INNER JOIN workingTimes AS wt on d.doctorId = wt.doctorId
        WHERE h.hospitalId = ${hospitalId} AND wt.dayOfTheWeek = ${week} AND DATE_FORMAT(wt.endDate  , '%Y%m%d') > ${selectedYMD} AND ${selectedYMD} > DATE_FORMAT(wt.startDate  , '%Y%m%d')
        ORDER BY d.doctorId ASC`;
        const result = await this.sequelize.query(query, {
            type: this.sequelize.QueryTypes.SELECT,
        });
        return result;
    };
}
// 유저가 병원Id 1번에 입장, 예약버튼 클릭 -> 예약날짜 클릭 (23.03.20)  => hospitalModel hospitalId where  닥터들 인클루드 id, name
// -> 병원ID 1번에 근무하는 doctorId 들의 근무일자(03.14~03.20, week 2번, startTime, endTime)  15일 가져온다    닥터에다가 워킹타임즈를 인클루드
// startTime,  30분 단위 출력 endTime
module.exports = WorkingtimeRepository;
