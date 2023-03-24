function calculationTime(workingTimeDate, reservationDate) {
    let doctorsList = [];
    let count = 0;

    for (let i = 0; i < workingTimeDate.length; i++) {
        let timeObj = {};
        let keyArrayList = [];
        let startTime = workingTimeDate[i].startTime;
        let doctorName = workingTimeDate[i].doctorName;
        let hospitalName = workingTimeDate[i].HospitalName;
        let endTime = workingTimeDate[i].endTime;
        let doctorId = workingTimeDate[i].doctorId;

        let startTimeHalf = startTime.split(':')[1];
        let endTimeHalf = endTime.split(':')[1];
        startTime = startTime.split(':')[0];
        endTime = endTime.split(':')[0];

        if (startTimeHalf === '00' && endTimeHalf === '00') {
            for (let j = 0; j < endTime - startTime; j++) {
                let cellTime = startTime * 1 + j;
                cellTime = cellTime >= 10 ? cellTime : '0' + cellTime;
                let cellStartTimeText = cellTime + ':00';
                let cellTimeHalf = cellTime + ':30';
                keyArrayList.push(cellStartTimeText);
                keyArrayList.push(cellTimeHalf);
            }

            for (let k = 0; keyArrayList.length > k; k++) {
                timeObj[keyArrayList[k]] = '';
            }
            doctorsList.push({
                hospitalName: hospitalName,
                doctorId: doctorId,
                doctorName: doctorName,
                times: timeObj,
                count: count,
            });
        } else if (startTimeHalf !== '00' && endTimeHalf === '00') {
            for (let l = 0; l < endTime - startTime; l++) {
                let cellTime = startTime * 1 + l;
                cellTime = cellTime >= 10 ? cellTime : '0' + cellTime;
                let cellStartTimeText = cellTime + ':00';
                let cellTimeHalf = cellTime + ':30';

                keyArrayList.push(cellStartTimeText);
                keyArrayList.push(cellTimeHalf);
            }
            keyArrayList.shift();

            for (let m = 0; keyArrayList.length > m; m++) {
                timeObj[keyArrayList[m]] = '';
            }
            doctorsList.push({
                hospitalName: hospitalName,
                doctorId: doctorId,
                doctorName: doctorName,
                times: timeObj,
                count: count,
            });
        } else if (startTimeHalf === '00' && endTimeHalf !== '00') {
            for (let n = 0; n < endTime - startTime; n++) {
                let cellTime = startTime * 1 + n;
                cellTime = cellTime >= 10 ? cellTime : '0' + cellTime;
                let cellStartTimeText = cellTime + ':00';
                let cellTimeHalf = cellTime + ':30';

                keyArrayList.push(cellStartTimeText);
                keyArrayList.push(cellTimeHalf);
            }
            let a = keyArrayList[keyArrayList.length - 2];
            let b = a;
            let c = b.split(':')[0];
            let d = c * 1 + 1 + ':00';
            keyArrayList.push(d);

            for (let o = 0; keyArrayList.length > o; o++) {
                timeObj[keyArrayList[o]] = '';
            }
            doctorsList.push({
                hospitalName: hospitalName,
                doctorId: doctorId,
                doctorName: doctorName,
                times: timeObj,
                count: count,
            });
        } else if (startTimeHalf !== '00' && endTimeHalf !== '00') {
            for (let p = 0; p < endTime - startTime; p++) {
                let cellTime = startTime * 1 + p;
                cellTime = cellTime >= 10 ? cellTime : '0' + cellTime;
                let cellStartTimeText = cellTime + ':00';
                let cellTimeHalf = cellTime + ':30';
                keyArrayList.push(cellStartTimeText);
                keyArrayList.push(cellTimeHalf);
            }
            keyArrayList.shift();
            let a = keyArrayList[keyArrayList.length - 2];
            let b = a;
            let c = b.split(':')[0];
            let d = c * 1 + 1 + ':00';
            keyArrayList.push(d);

            for (let q = 0; keyArrayList.length > q; q++) {
                timeObj[keyArrayList[q]] = '';
            }
            doctorsList.push({
                hospitalName: hospitalName,
                doctorId: doctorId,
                doctorName: doctorName,
                times: timeObj,
                count: count,
            });
        }
    }

    // 객체를 포문돌리고 돌때마다 if 문을 넣어서 키값과 밸류값이 동일한지 확인하고 넣기
    for (let i = 0; i < doctorsList.length; i++) {
        for (let j = 0; j < reservationDate.length; j++) {
            if (doctorsList[i].doctorName === reservationDate[j].name) {
                doctorsList[i].times[reservationDate[j].date] = reservationDate[j].UserName;
            }
        }
    }

    for (let i = 0; i < doctorsList.length; i++) {
        const workingTimeKeys = Object.keys(doctorsList[i].times);
        for (let j = 0; j < workingTimeKeys.length; j++) {
            const element = workingTimeKeys[j];
            if (doctorsList[i].times[element].length !== 0) {
                delete doctorsList[i].times[element];
            } else {
                doctorsList[i].count += 1;
            }
        }
    }

    console.log(doctorsList);

    let result = doctorsList.sort(function (a, b) {
        return b.count - a.count;
    });

    return result;
}

module.exports = calculationTime; // 배열 안에 객체의 정렬
