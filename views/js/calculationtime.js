function calculationTime(workingTimeDate, reservationDate) {
    // 의사가 2명일 경우를 대비해서 workingTimeDate를 for in 함
    console.log('calculationTime.js 계산들어감');
    console.log(workingTimeDate[i]);

    let keyArrayList = [];
    let timeObj = {};

    for (let i = 0; i < workingTimeDate.length; i++) {
        let startTime = workingTimeDate[i].startTime;
        console.log(`첫번째 for문 ${i}번째 - startTime: ${startTime}`);
        let endTime = workingTimeDate[i].endTime;
        console.log(`첫번째 for문 ${i}번째 - endTime: ${endTime}`);

        let startTimeHalf = startTime.split(':')[1];
        console.log(`첫번째 for문 ${i}번째 - startTimeHalf[M]: ${startTimeHalf}`);
        let endTimeHalf = endTime.split(':')[1];
        console.log(`첫번째 for문 ${i}번째 - endTimeHalf[M]: ${endTimeHalf}`);
        startTime = startTime.split(':')[0];
        console.log(`첫번째 for문 ${i}번째 - startTime[H]: ${startTime}`);
        endTime = endTime.split(':')[0];
        console.log(`첫번째 for문 ${i}번째 - endTime[H]: ${endTime}`);

        if (startTimeHalf === '00' && endTimeHalf === '00') {
            console.log(`첫번째 for문 ${i}번째의 첫번째 if문 ${startTimeHalf} && ${endTimeHalf}`);
            for (let j = 0; j < endTime - startTime; j++) {
                let cellTime = startTime * 1 + j;
                cellTime = cellTime >= 10 ? cellTime : '0' + cellTime;
                let cellStartTimeText = cellTime + ':00';
                let cellTimeHalf = cellTime + ':30';
                keyArrayList.push(cellStartTimeText);
                keyArrayList.push(cellTimeHalf);

                console.log(
                    `첫번째 for문 ${i}번째의 첫번째 if문의 두번째 for문 ${j}번째 - keyArrayList: ${keyArrayList}`
                );
            }

            for (let k = 0; keyArrayList.length > k; k++) {
                timeObj[keyArrayList[k]] = '';
                console.log(
                    `첫번째 for문 ${i}번째의 첫번째 if문의 두번째 for문 통과 후 세번째 for문의 ${k}번째  - timeObj ${JSON.stringify(
                        timeObj
                    )}, keyArrayList ${keyArrayList[k]}`
                );
            }
        } else if (startTimeHalf !== '00' && endTimeHalf === '00') {
            console.log(`첫번째 for문 ${i}번째의 첫번째 if문 ${startTimeHalf} && ${endTimeHalf}`);
            for (let l = 0; l < endTime - startTime; l++) {
                let cellTime = startTime * 1 + l;
                cellTime = cellTime >= 10 ? cellTime : '0' + cellTime;
                let cellStartTimeText = cellTime + ':00';
                let cellTimeHalf = cellTime + ':30';

                keyArrayList.push(cellStartTimeText);
                keyArrayList.push(cellTimeHalf);
                console.log(
                    `첫번째 for문 ${i}번째의 첫번째 if문의 두번째 for문 ${l}번째 - keyArrayList: ${keyArrayList}(shift() 걸기전)`
                );
            }
            keyArrayList.shift();
            console.log(
                `첫번째 for문 ${i}번째의 첫번째 if문의 두번째 for문 통과 후 - keyArrayList: ${keyArrayList}(shift() 걸기후)`
            );

            for (let m = 0; keyArrayList.length > m; m++) {
                timeObj[keyArrayList[m]] = '';
                console.log(
                    `첫번째 for문 ${i}번째의 첫번째 if문의 두번째 for문  통과 후 세번째 for문의 ${m}번째  - timeObj ${JSON.stringify(
                        timeObj
                    )}, keyArrayList ${keyArrayList[m]}`
                );
            }
        } else if (startTimeHalf === '00' && endTimeHalf !== '00') {
            console.log(`첫번째 for문 ${i}번째의 첫번째 if문 ${startTimeHalf} && ${endTimeHalf}`);
            for (let n = 0; n < endTime - startTime; n++) {
                let cellTime = startTime * 1 + n;
                cellTime = cellTime >= 10 ? cellTime : '0' + cellTime;
                let cellStartTimeText = cellTime + ':00';
                let cellTimeHalf = cellTime + ':30';

                keyArrayList.push(cellStartTimeText);
                keyArrayList.push(cellTimeHalf);
                console.log(
                    `첫번째 for문 ${i}번째의 첫번째 if문의 두번째 for문 ${n}번째 - keyArrayList: ${keyArrayList})(push() 걸기전)`
                );
            }
            let a = keyArrayList[keyArrayList.length - 2];
            let b = a;
            let c = b.split(':')[0];
            let d = c * 1 + 1 + ':00';
            keyArrayList.push(d);
            console.log(
                `첫번째 for문 ${i}번째의 첫번째 if문의 두번째 for문 통과 후 - keyArrayList: ${keyArrayList}(push() 걸기후)`
            );

            for (let o = 0; keyArrayList.length > o; o++) {
                timeObj[keyArrayList[o]] = '';
                console.log(
                    `첫번째 for문 ${i}번째의 첫번째 if문의 두번째 for문 통과 후 세번째 for문의 ${n}번째  - timeObj ${JSON.stringify(
                        timeObj
                    )}, keyArrayList ${keyArrayList[o]}`
                );
            }
        } else if (startTimeHalf !== '00' && endTimeHalf !== '00') {
            console.log(`첫번째 for문 ${i}번째의 첫번째 if문 ${startTimeHalf} && ${endTimeHalf}`);
            for (let p = 0; p < endTime - startTime; p++) {
                let cellTime = startTime * 1 + p;
                cellTime = cellTime >= 10 ? cellTime : '0' + cellTime;
                let cellStartTimeText = cellTime + ':00';
                let cellTimeHalf = cellTime + ':30';
                keyArrayList.push(cellStartTimeText);
                keyArrayList.push(cellTimeHalf);
                console.log(
                    `첫번째 for문 ${i}번째의 첫번째 if문의 두번째 for문 ${p}번째 - keyArrayList: ${keyArrayList})(shift() 걸기전)`
                );
            }
            keyArrayList.shift();
            console.log(
                `첫번째 for문 ${i}번째의 첫번째 if문의 두번째 for문 통과 후 - keyArrayList: ${keyArrayList}(shift() 걸기후, push() 걸기전)`
            );
            let a = keyArrayList[keyArrayList.length - 2];
            let b = a;
            let c = b.split(':')[0];
            let d = c * 1 + 1 + ':00';
            keyArrayList.push(d);
            console.log(
                `첫번째 for문 ${i}번째의 첫번째 if문의 두번째 for문 통과 후 - keyArrayList: ${keyArrayList}(shift() 걸기후, push() 걸기후)`
            );

            for (let q = 0; keyArrayList.length > q; q++) {
                timeObj[keyArrayList[q]] = '';
                console.log(
                    `첫번째 for문 ${i}번째의 첫번째 if문의 두번째 for문 통과 후 세번째 for문의 ${q}번째  - timeObj ${JSON.stringify(
                        timeObj
                    )}, keyArrayList ${keyArrayList[q]}`
                );
            }
        }
        console.log(keyArrayList);
        console.log(timeObj);
    }

    // 객체를 포문돌리고 돌때마다 if 문을 넣어서 키값과 밸류값이 동일한지 확인하고 넣기
    for (let i = 0; i < reservationDate.length; i++) {
        timeObj[reservationDate[i].date] = reservationDate[i].UserName;
    }

    return timeObj;
}

module.exports = calculationTime;
