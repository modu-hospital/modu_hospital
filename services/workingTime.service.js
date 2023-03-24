const WorkingtimeRepository = require('../repositories/workingTime.repository.js');
const calculationTime = require('../views/js/calculationtime.js');
const { User, Hospital, Doctor, sequelize, WorkingTime, Reservation } = require('../models');

class WorkingtimeService {
    workingtimeRepository = new WorkingtimeRepository(
        User,
        Hospital,
        Doctor,
        sequelize,
        WorkingTime,
        Reservation
    );

    findWorkingDate = async (hospitalId, year, month, date, week) => {
        month = month >= 10 ? month : '0' + month;
        let selectedYMD = year + month + date;
        // 병원 A에서 의사 A의 예약이 완료된 환자의 이름과 예약날짜 및 시간
        const reservationDate = await this.workingtimeRepository.findReservationDateByWeek(
            hospitalId,
            selectedYMD,
            week
        );

        // 클릭한 날짜가 병원 A에서 의사 A의 예약 가능한 날짜 및 시간 안에 있는지 확인하기
        const workingTimeDate = await this.workingtimeRepository.findWorkingDateByYMDW(
            hospitalId,
            selectedYMD,
            week
        );
        const reservaionObj = calculationTime(workingTimeDate, reservationDate);
        // 바깥으로 보내줘야하는 정보는 병원이름, 의사이름, timeObj 에서 선별된 밸류값이 "" 인 키:밸류 값을 빼면 될듯?
        // timeObj 에서 뺀 키밸류값은 무조건 startTime으로 인식되어야 하고 success 시 자동으로 30분 추가된 endTime이 만들어질 수 있게 해야됨

        // DB에 등록된 waiting은 의사들의 예약 가능 시간을 염두하지 않은 등록이었기 때문에 안맞을 수 있음
        return reservaionObj;
    };
}

module.exports = WorkingtimeService;
