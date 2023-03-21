// 1. 초진 or 재진 둘 중 하나만 선택할 수 있게 하기 => 클리어
// 2. 증상 기록에 placeholder 로 증상 예시 나오게 하기 => 클리어
// 3. 환자와의 관계를 본인으로 할시 대리신청인에 입력하지 못하도록 하기 => 클리어
// 4. 환자와의 관계를 기타로 설정할시 추가로 입력할 수 있는 공간이 생기도록 하기 => 클리어
// 5. 환자와의 관계에서 본인을 선택할시 유저 DB에서 전화번호를 자동적으로 넣어지도록 하기 => 안할래
// 6. 예약날짜 찾기 및 예약시간 고르기 api 찾아보기 => 클리어
// 7. 예약시간 찾기는 30분단위 => 클리어

document.addEventListener('DOMContentLoaded', () => {
    const category = document.querySelector('#relationCategory');
    const proxyname = document.querySelector('#proxyName');
    const divselfwrite = document.querySelector('#divSelfWrite');
    const textareaSpace = document.createElement('textarea');
    textareaSpace.setAttribute('value', 'selfWriteOff');

    category.addEventListener('change', (event) => {
        const options = event.currentTarget.options;
        const index = event.currentTarget.options.selectedIndex;
        const value = options[index].value;

        if (textareaSpace.getAttribute('value') === 'selfWriteOff') {
            if (value === '본인' || value === '미선택') {
                selfCheck(value);
                textareaSpace.setAttribute('value', 'selfWriteOff');
                proxyname.setAttribute('disabled', 'disabled');
            } else if (value === '기타') {
                divselfwrite.appendChild(textareaSpace);
                proxyname.removeAttribute('disabled');
                textareaSpace.setAttribute('name', 'selfWrite');
                textareaSpace.setAttribute('id', 'selfWrite');
                textareaSpace.setAttribute('placeholder', '환자와의 관계(직접입력)');
                textareaSpace.setAttribute('rows', '1');
                textareaSpace.setAttribute('value', 'selfWriteOn');
            } else {
                proxyname.removeAttribute('disabled');
                textareaSpace.setAttribute('value', 'selfWriteOff');
            }
        } else {
            if (value === '본인' || value === '미선택') {
                selfCheck(value);
                textareaSpace.setAttribute('value', 'selfWriteOff');
                divselfwrite.removeChild(textareaSpace);
                proxyname.setAttribute('disabled', 'disabled');
            } else if (value === '기타') {
                divselfwrite.appendChild(textareaSpace);
                proxyname.removeAttribute('disabled');
                textareaSpace.setAttribute('name', 'selfWrite');
                textareaSpace.setAttribute('id', 'selfWrite');
                textareaSpace.setAttribute('placeholder', '환자와의 관계(직접입력)');
                textareaSpace.setAttribute('rows', '1');
                textareaSpace.setAttribute('value', 'selfWriteOn');
            } else {
                divselfwrite.removeChild(textareaSpace);
                proxyname.removeAttribute('disabled');
                textareaSpace.setAttribute('value', 'selfWriteOff');
            }
        }
    });

    function selfCheck(value) {
        if (value === '본인' || value === '미선택') {
            return proxyname.removeAttribute('disabled');
        }
    }
});

function viewModal(id) {
    let zIndex = 9999;
    let mymodal = document.getElementById(id);

    // 모달 div 뒤에 희끄무레한 레이어
    let background = document.createElement('div');

    background.setStyle({
        position: 'fixed',
        zIndex: zIndex,
        left: '0px',
        top: '0px',
        width: '100%',
        height: '100%',
        overflow: 'auto',
        // 레이어 색갈은 여기서 바꾸면 됨
        backgroundColor: 'rgba(0,0,0,0.4)',
    });
    document.body.append(background);
    background.setAttribute('id', 'background');

    // 닫기 버튼 처리, 시꺼먼 레이어와 모달 div 지우기
    mymodal.querySelector('.modal_close_btn').addEventListener('click', function () {
        background.remove();
        mymodal.style.display = 'none';
    });

    mymodal.setStyle({
        position: 'fixed',
        display: 'block',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',

        // 시꺼먼 레이어 보다 한칸 위에 보이기
        zIndex: zIndex + 1,

        // div center 정렬
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        msTransform: 'translate(-50%, -50%)',
        webkitTransform: 'translate(-50%, -50%)',
    });
}

// Element 에 style 한번에 오브젝트로 설정하는 함수 추가
Element.prototype.setStyle = function (styles) {
    for (let k in styles) this.style[k] = styles[k];
    return this;
};

function reservationTime() {
    // 모달창 띄우기
    viewModal('my_modal');
}

function reservationAddress() {
    // 모달창 띄우기
    viewModal('address_modal');
}

//---------------- calendar --------------------------
//date객체 획득. 가변
let today = new Date();
//today 보조. 고정
let date = new Date();
//선택되있던 셀 객체 저장
let selectedCell;
let selectedCellTime;
//오늘에 해당하는 월, 일 객체
let realMonth = date.getMonth() + 1;
let realToDay = date.getDate();
//사용자가 클릭한 월, 일
let selectedMonth = null;
let selectedDate = null;
let clickcount = 0;

// 예약가능 요일 계산해 배열(일~월, 가능0, 불가능1)
const possibleDay = [0, 0, 0, 0, 0, 0, 0];

// 전달 달력
function prevCalendar() {
    if (clickcount === 0) {
        alert('예약은 금일기준 다음날부터 30일 이후까지만 가능합니다.');
        return false;
    } else {
        clickcount -= 1;
    }
    today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    buildCalendar();
}

// 다음달 달력
function nextCalendar() {
    if (clickcount === 1) {
        alert('예약은 금일기준 다음날부터 30일 이후까지만 가능합니다.');
        return false;
    } else {
        clickcount += 1;
    }
    today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    buildCalendar();
}

// 달력 제작(이번 달 기준)
function buildCalendar() {
    let row = null;
    let cnt = 0;

    let firstDate = new Date(today.getFullYear(), today.getMonth(), 1);
    let lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    // 지금 만들어진 달력이 현재 달력인지 확인
    nowMonth = today.getMonth() + 1; // 현재 참조중인 월
    monthEquals = thisMonth(nowMonth, realMonth); // 이번달이면 0, 다음달이면 1 리턴

    const calendarTable = document.getElementById('calendar'); // 달력 객체
    const calendarTableTitle = document.getElementById('calendarTitle'); // 달력의 타이틀 객체 획득
    calendarTableTitle.innerHTML = today.getFullYear() + '년 ' + (today.getMonth() + 1) + '월'; // 달력의 타이틀 수정

    // 테이블 초기화
    while (calendarTable.rows.length > 2) {
        calendarTable.deleteRow(calendarTable.rows.length - 1);
    }

    // 셀 입력을 위해 테이블 개행
    row = calendarTable.insertRow();

    // 달의 첫 날 전까지 빈 셀 생성
    for (i = 0; i < firstDate.getDay(); i++) {
        cell = row.insertCell();
        cnt += 1;
    }

    // 요일 입력에 내용 추가 (셀 생성)
    for (i = 1; i <= lastDate.getDate(); i++) {
        // 예약하지 못하는 조건일 경우 +1씩 되므로, noCount가 0일 시에만 클릭함수를 적용
        noCount = 0;

        cell = row.insertCell();
        cell.setAttribute('id', i); //cell에 id 부여
        cell.innerHTML = i;
        // cell.innerHTML = '<label onclick="prevCalendar()">' + i + '</label>';
        cell.align = 'center';

        //셀 생성 후 count 증가
        cnt += 1;

        // cnt % 7 == 1이면 일요일이므로 빨갛게
        if (cnt % 7 === 1) {
            cell.innerHTML = '<font color=#F79DC2>' + i + '</font>';
        }

        // 일주일 입력 완료시 개행
        if (cnt % 7 === 0) {
            //cnt % 7 == 0이면 토요일이므로 파랗게
            cell.innerHTML = '<font color=skyblue>' + i + '</font>';
            row = calendar.insertRow();
        }

        //예약불가일 색상변경 (오늘 이전 또는 30일 이후) 및 사용자가 직접 지정한 경우
        etp = exchangeToPosibleDay(cnt) * 1;

        // 예약불가 일자 분류(1/2) - 요일생성 안
        if (nowMonth === realMonth && i <= realToDay) {
            // 이번달이고 오늘을 포함한 지난달
            noCount += 1;
        } else if (nowMonth > realMonth && i > realToDay) {
            // 다음달이고 오늘보다 일수가 높은 수일 때
            noCount += 1;
        } else if (possibleDay[etp] === 1) {
            console.log('예약불가 요일:', possibleDay[etp] === 1);
            // 해당 일이 예약불가 요일인 경우,   Q. 이건 왜 0이 아니고 1이지?
            noCount += 1;
        }

        // 참고사항1) etp 값의 범위 : 0~6(0일 1월 2화 3수 4목 5금 6토)
        // 참고사항2) possibleDay: 7자리의 2진수, 왼쪽부터 일월화수목금토를 표현

        // 예약불가일 예외처리
        if (noCount > 0) {
            // noCount가 1이상이면 배경색을 회색, 글자색 연한 검정으로 변경
            cell.style.backgroundColor = '#E0E0E0';
            cell.innerHTML = "<font color='#C6C6C6' >" + i + '</font>';
        } else {
            // noCount가 0일 경우에만 클릭이벤트가 생성
            cell.onclick = function () {
                // 타임테이블을 클릭마다 초기화 : 다른 날을 클릭해도 테이블이 남아있으면 시간표를 생성해도 밑에 쌓임
                selectedTimeInit(); // 이거 주석처리 안하면 클릭한 날의 색상과 예약일시에 나오지않음
                //선택된 날의 연, 월, 일 계산 (일자의 경우 id속성 참조)
                clickedYear = today.getFullYear();
                clickedMonth = 1 + today.getMonth();
                clickedMonth = clickedMonth >= 10 ? clickedMonth : '0' + clickedMonth;
                clickedDate = this.getAttribute('id');
                clickedDate = clickedDate >= 10 ? clickedDate : '0' + clickedDate;

                clickedYMD = clickedYear + '-' + clickedMonth + '-' + clickedDate;

                //하단에 예약일시 표시
                inputField = document.getElementById('selectedDate');
                inputField.value = clickedYMD;
                // 시간표에서 사용하기 위해 선택된 월, 일 전역변수에 저장
                selectedYear = today.getFullYear();
                selectedMonth = today.getMonth() + 1;
                selectedDate = this.getAttribute('id');

                // 선택된 셀을 전역변수에 저장한 후 색 변경 및 기존 선택된 셀의 색 복구
                if (selectedCell != null) {
                    console.log(selectedCell);
                    selectedCell.bgColor = '#FFFFFF';
                }
                selectedCell = this;
                this.bgColor = '#fbedaa';

                function getDateStr(yearStr, monthStr, dateStr) {
                    monthStr = monthStr >= 10 ? monthStr : '0' + monthStr;
                    dateStr = dateStr >= 10 ? dateStr : '0' + dateStr;
                    let yyyyMMdd = String(yearStr) + String(monthStr) + String(dateStr);
                    let sYear = yyyyMMdd.substring(0, 4);
                    let sMonth = yyyyMMdd.substring(4, 6);
                    let sDate = yyyyMMdd.substring(6, 8);
                    let date = new Date(Number(sYear), Number(sMonth) - 1, Number(sDate));

                    // let week = ['일', '월', '화', '수', '목', '금', '토'];
                    // let week = [0, 1, 2, 3, 4, 5, 6];
                    // return week[date.getDay()] + '요일';
                    return date.getDay();
                }

                getDateStr(selectedYear, selectedMonth, selectedDate);

                //time table 생성
                timeTableMaker(
                    today.getFullYear(),
                    today.getMonth() + 1,
                    this.getAttribute('id'),
                    getDateStr(selectedYear, selectedMonth, selectedDate),
                    this.getAttribute('class')
                );
            };
        }
    }
}

function exchangeToPosibleDay(num) {
    result = num % 7;
    result -= 1;
    if (result === -1) {
        result = 6;
    }
    return result;
}

// 이번 달력은 비교가 굉장히 빈번하게 사용되므로 선언하고 시작
function thisMonth(todayMonth, dateMonth) {
    // 이번달이면 0 리턴, 다음달이면 1 리턴
    console.log('todayMonth : ' + todayMonth + ', dateMonth : ' + dateMonth);
    if (todayMonth * 1 === dateMonth * 1) {
        console.log('이번달 이구요');
        return 0;
    }
    console.log('다음달 이구요');
    return 1;
}

//---------------- time table --------------------------
//선택된 시간중 가장 빠른/늦은 시간;
let startHour;
let startMinute;
let endHour;
let endMinute;
let doctorname;
// 선택된 시간중 가장 빠른/늦은 시간;
let selectedFirstTime = 24 * 1;
let selectedFinalTime = 0 * 1;

//예약시간표를 만들 table객체 획득(시간표 구성)
function timeTableMaker(selectedYear, selectedMonth, selectedDate, dayWeek) {
    console.log(
        '클릭한 selectedYear: ',
        selectedYear,
        '클릭한 selectedMonth: ',
        selectedMonth,
        '클릭한 selectedDate: ',
        selectedDate,
        '클릭한 dayWeek: ',
        dayWeek
    );
    $.ajax({
        type: 'GET',
        url: `/api/workingtime/reservationdate?year=${selectedYear}&month=${selectedMonth}&date=${selectedDate}&week=${dayWeek}`,
        async: false,
        success: function (response) {
            // 고려해야 할 점
            // 1. 의사가 2명 이상일 경우
            // 2. 퐁당퐁당 예약가능할 경우
            // 3. 예약이 하나도 없을 경우
            console.log('GET success 후 받아진 response: ', response);

            row = null;
            month = selectedMonth; // 달력에서 선택한 셀의 달
            date = selectedDate; // 일자를 받아오고
            console.log('내가 클릭한 month: ', month, '내가 클릭한 date: ', date);
            let timeTable = document.getElementById('timeTable'); // 시간표를 출력할 테이블을 가져옴
            let doctorTable = document.getElementById('doctorTable'); // 시간표를 출력할 테이블을 가져옴
            // 테이블 초기화
            while (timeTable.rows.length > 0) {
                timeTable.deleteRow(timeTable.rows.length - 1);
                doctorTable.deleteRow(doctorTable.rows.length - 1);
            }

            for (let i = 0; i < response.length; i++) {
                // 객체의 길이만큼 반복
                let hospitalName = response[i].hospitalName;
                let doctorId = response[i].doctorId;
                let doctorName = response[i].doctorName;
                let time = response[i].times;
                console.log(`첫번째 for문 ${i}번째의 ${hospitalName}`);
                if (i < 1) {
                    row = doctorTable.insertRow();
                    cell = row.insertCell();
                    cell.setAttribute('id', `doc${doctorId}`);
                    cell.innerHTML = '담당의사 : ' + doctorName;
                    for (let j = 0; j < Object.keys(time).length; j++) {
                        if (Object.keys(time)[j].split(':')[1] * 1 === 0) {
                            // 30분단위 출력

                            startHour = Object.keys(time)[j].split(':')[0] * 1;
                            startMinute = Object.keys(time)[j].split(':')[1] * 1;
                            endHour = Object.keys(time)[j].split(':')[0] * 1;
                            endMinute = Object.keys(time)[j].split(':')[1] * 1 + 30;

                            // 시간표테이블 생성

                            cellTime = startHour;
                            // 시작시간부터 30분씩 순차적으로 셀 생성
                            cellStartTimeText = cellTime + ':00';
                            cellEndTimeText = cellTime + ':30';
                            inputCellText = cellStartTimeText + ' ~ ' + cellEndTimeText;

                            // 셀 입력을 위해 테이블 개행
                            row = timeTable.insertRow();
                            //해당 row의 셀 생성
                            cell = row.insertCell();
                            // cell에 id 부여
                            cell.setAttribute('id', `${cellTime}-${doctorId}`); // id는 행의 시작시간

                            // 셀에 입력
                            cell.innerHTML = inputCellText;

                            // 시간표 테이블의 클릭이벤트
                            cell.onclick = function () {
                                cellTime = this.getAttribute('id');
                                reserveTime = cellTime.split('-')[0];
                                doctorId = cellTime.split('-')[1];
                                console.log(reserveTime);
                                console.log(doctorId);
                                reserveTime = reserveTime * 1;
                                console.log('selected : ' + reserveTime);

                                // 선택된 시간표테이블 셀의 색상 변경, 중복선택 불가하도록 처리
                                if (selectedCellTime != null) {
                                    selectedCellTime.bgColor = '#FFFFFF';
                                }
                                selectedCellTime = this;
                                this.bgColor = '#fbedaa';

                                //하단의 예약일시에 시간 표시
                                if (reserveTime - Math.floor(reserveTime) === 0) {
                                    resTime = reserveTime + ':00 ~ ' + reserveTime + ':30';
                                    resDoctor = doctorId;

                                    resTimeForm = document.getElementById('selectedTime');
                                    resDoctorForm = document.getElementById('selectedDoctor');
                                    resTimeForm.value = resTime;
                                    resDoctorForm.value = resDoctor;
                                } else {
                                    resTime =
                                        Math.floor(reserveTime) +
                                        ':30 ~ ' +
                                        Math.floor(reserveTime + 1) +
                                        ':00';

                                    resDoctor = doctorId;

                                    resTimeForm = document.getElementById('selectedTime');
                                    resDoctorForm = document.getElementById('selectedDoctor');
                                    resTimeForm.value = resTime;
                                    resDoctorForm.value = resDoctor;
                                }
                            };
                        } else {
                            startHour = Object.keys(time)[j].split(':')[0] * 1;
                            startMinute = Object.keys(time)[j].split(':')[1] * 1;
                            endHour = Object.keys(time)[j].split(':')[0] * 1 + 1;
                            endMinute = Object.keys(time)[j].split(':')[1] * 1 - 30;

                            // 시간표테이블 생성

                            cellTime = startHour;
                            // 시작시간부터 30분씩 순차적으로 셀 생성
                            cellStartTimeText = cellTime + ':30';
                            cellEndTimeText = cellTime + 1 + ':00';
                            inputCellText = cellStartTimeText + ' ~ ' + cellEndTimeText;
                            console.log(`테이블에 ${inputCellText} 이 생성될 예정이다.`);
                            // 셀 입력을 위해 테이블 개행
                            row = timeTable.insertRow();
                            //해당 row의 셀 생성
                            cell = row.insertCell();
                            // cell에 id 부여
                            cell.setAttribute('id', `${cellTime + 0.5}-${doctorId}`); // id는 행의 시작시간
                            // 셀에 입력
                            cell.innerHTML = inputCellText;

                            cell.onclick = function () {
                                cellTime = this.getAttribute('id');
                                reserveTime = cellTime.split('-')[0];
                                doctorId = cellTime.split('-')[1];
                                console.log(reserveTime);
                                console.log(doctorId);
                                reserveTime = reserveTime * 1;
                                console.log('selected : ' + reserveTime);

                                // 선택된 시간표테이블 셀의 색상 변경, 중복선택 불가하도록 처리
                                if (selectedCellTime != null) {
                                    selectedCellTime.bgColor = '#FFFFFF';
                                }
                                selectedCellTime = this;
                                this.bgColor = '#fbedaa';

                                //하단의 예약일시에 시간 표시
                                if (reserveTime - Math.floor(reserveTime) === 0) {
                                    resTime = reserveTime + ':00 ~ ' + reserveTime + ':30';

                                    resDoctor = doctorId;

                                    resTimeForm = document.getElementById('selectedTime');
                                    resDoctorForm = document.getElementById('selectedDoctor');
                                    resTimeForm.value = resTime;
                                    resDoctorForm.value = resDoctor;
                                } else {
                                    resTime =
                                        Math.floor(reserveTime) +
                                        ':30 ~ ' +
                                        Math.floor(reserveTime + 1) +
                                        ':00';

                                    resDoctor = doctorId;

                                    resTimeForm = document.getElementById('selectedTime');
                                    resDoctorForm = document.getElementById('selectedDoctor');
                                    resTimeForm.value = resTime;
                                    resDoctorForm.value = resDoctor;
                                }
                            };
                        }
                    }
                } else {
                    // 닥터ID에 따른 닥터의 name도 제일 위에다가 붙여야함
                    // i 가 1씩 증가할때마다 테이블이 옆으로 붙어야함
                    row = doctorTable.insertRow();
                    cell = doctorTable.rows[0].insertCell(-1);
                    cell.setAttribute('id', `doc${doctorId}`);
                    cell.innerHTML = '담당의사 : ' + doctorName;
                    // 열 추가 되는 부분
                    for (let j = 0; j < Object.keys(time).length; j++) {
                        if (Object.keys(time)[j].split(':')[1] * 1 === 0) {
                            // 30분단위 출력

                            startHour = Object.keys(time)[j].split(':')[0] * 1;
                            startMinute = Object.keys(time)[j].split(':')[1] * 1;
                            endHour = Object.keys(time)[j].split(':')[0] * 1;
                            endMinute = Object.keys(time)[j].split(':')[1] * 1 + 30;

                            // 시간표테이블 생성

                            cellTime = startHour;
                            // 시작시간부터 30분씩 순차적으로 셀 생성
                            cellStartTimeText = cellTime + ':00';
                            cellEndTimeText = cellTime + ':30';
                            inputCellText = cellStartTimeText + ' ~ ' + cellEndTimeText;
                            console.log(`테이블에 ${inputCellText} 이 생성될 예정이다.`);
                            // 셀 입력을 위해 테이블 개행
                            row = timeTable.insertRow();
                            console.log('row: ', row);
                            //해당 row의 셀 생성
                            // cell = row.insertCell();
                            cell = timeTable.rows[j].insertCell(-1);
                            console.log('cell: ', cell);
                            // cell에 id 부여
                            cell.setAttribute('id', `${cellTime}-${doctorId}`); // id는 행의 시작시간
                            // 셀에 입력
                            cell.innerHTML = inputCellText;

                            // 시간표 테이블의 클릭이벤트
                            cell.onclick = function () {
                                cellTime = this.getAttribute('id');
                                reserveTime = cellTime.split('-')[0];
                                doctorId = cellTime.split('-')[1];
                                console.log(reserveTime);
                                console.log(doctorId);
                                reserveTime = reserveTime * 1;
                                console.log('selected : ' + reserveTime);

                                // 선택된 시간표테이블 셀의 색상 변경, 중복선택 불가하도록 처리
                                if (selectedCellTime != null) {
                                    selectedCellTime.bgColor = '#FFFFFF';
                                }
                                selectedCellTime = this;
                                this.bgColor = '#fbedaa';

                                //하단의 예약일시에 시간 표시
                                if (reserveTime - Math.floor(reserveTime) === 0) {
                                    console.log('안녕하세요');
                                    resTime = reserveTime + ':00 ~ ' + reserveTime + ':30';
                                    console.log(resTime);
                                    resDoctor = doctorId;

                                    resTimeForm = document.getElementById('selectedTime');
                                    resDoctorForm = document.getElementById('selectedDoctor');
                                    resTimeForm.value = resTime;
                                    resDoctorForm.value = resDoctor;
                                } else {
                                    console.log('안녕하세요2');
                                    resTime =
                                        Math.floor(reserveTime) +
                                        ':30 ~ ' +
                                        Math.floor(reserveTime + 1) +
                                        ':00';

                                    resDoctor = doctorId;

                                    resTimeForm = document.getElementById('selectedTime');
                                    resDoctorForm = document.getElementById('selectedDoctor');
                                    resTimeForm.value = resTime;
                                    resDoctorForm.value = resDoctor;
                                }
                            };
                        } else {
                            startHour = Object.keys(time)[j].split(':')[0] * 1;
                            startMinute = Object.keys(time)[j].split(':')[1] * 1;
                            endHour = Object.keys(time)[j].split(':')[0] * 1 + 1;
                            endMinute = Object.keys(time)[j].split(':')[1] * 1 - 30;
                            // 시간표테이블 생성
                            cellTime = startHour;
                            // 시작시간부터 30분씩 순차적으로 셀 생성
                            cellStartTimeText = cellTime + ':30';
                            cellEndTimeText = cellTime + 1 + ':00';
                            inputCellText = cellStartTimeText + ' ~ ' + cellEndTimeText;
                            console.log(`테이블에 ${inputCellText} 이 생성될 예정이다.`);
                            // 셀 입력을 위해 테이블 개행
                            row = timeTable.insertRow();
                            console.log('row: ', row);
                            //해당 row의 셀 생성
                            // cell = row.insertCell();
                            cell = timeTable.rows[j].insertCell(-1);
                            // console.log('cell: ', cell);
                            // cell에 id 부여
                            cell.setAttribute('id', `${cellTime + 0.5}-${doctorId}`); // id는 행의 시작시간
                            // 셀에 입력
                            cell.innerHTML = inputCellText;

                            cell.onclick = function () {
                                cellTime = this.getAttribute('id');
                                reserveTime = cellTime.split('-')[0];
                                doctorId = cellTime.split('-')[1];
                                console.log(reserveTime);
                                console.log('doctorId: ', doctorId);
                                reserveTime = reserveTime * 1;
                                console.log('selected : ' + reserveTime);

                                // 선택된 시간표테이블 셀의 색상 변경, 중복선택 불가하도록 처리
                                if (selectedCellTime != null) {
                                    selectedCellTime.bgColor = '#FFFFFF';
                                }
                                selectedCellTime = this;
                                this.bgColor = '#fbedaa';

                                //하단의 예약일시에 시간 표시
                                if (reserveTime - Math.floor(reserveTime) === 0) {
                                    console.log('안녕하세요3');
                                    resTime = reserveTime + ':00 ~ ' + reserveTime + ':30';

                                    resDoctor = doctorId;

                                    resTimeForm = document.getElementById('selectedTime');
                                    resDoctorForm = document.getElementById('selectedDoctor');
                                    resTimeForm.value = resTime;
                                    resDoctorForm.value = resDoctor;
                                } else {
                                    console.log('안녕하세요4');
                                    resTime =
                                        Math.floor(reserveTime) +
                                        ':30 ~ ' +
                                        Math.floor(reserveTime + 1) +
                                        ':00';

                                    console.log(resTime);

                                    resDoctor = doctorId;
                                    console.log(resDoctor);

                                    resTimeForm = document.getElementById('selectedTime');
                                    resDoctorForm = document.getElementById('selectedDoctor');
                                    console.log(resDoctorForm);
                                    resTimeForm.value = resTime;
                                    resDoctorForm.value = resDoctor;
                                }
                            };
                        }
                    }
                }
            }
        },
    });
}

//시간표 초기화
function tableinit() {
    $('#timeTable').empty();
    $('#doctorTable').empty();
    selectedTimeInit();
    buildCalendar();
}

//날짜 클릭시 예약시간 초기화
function selectedTimeInit() {
    resDateForm = document.getElementById('selectedDate');
    resTimeForm = document.getElementById('selectedTime');
    resDoctorForm = document.getElementById('selectedDoctor');
    resTimeForm.value = '';
    resDateForm.value = '';
    resDoctorForm.value = '';

    selectedFirstTime = 24 * 1;
    selectedFinalTime = 0 * 1;
}

// function submitRes() {
//     arr = new Array();

//     nameForm = document.getElementById('userName');
//     phoneForm = document.getElementById('userPhone');
//     emailForm = document.getElementById('userEmail');
//     capacityForm = document.getElementById('capacity');
//     resTimeForm = document.getElementById('selectedTime');
//     selectedDateFrom = document.getElementById('selectedDate');
//     selectedTimeForm = document.getElementById('selectedTime');

//     arr.push(nameForm);
//     arr.push(phoneForm);
//     arr.push(emailForm);
//     arr.push(resTimeForm);
//     arr.push(selectedDateFrom);
//     arr.push(selectedTimeForm);

//     for (i = 0; i < arr.length; i++) {
//         item = arr[i];
//         if (item.value == '') {
//             alert('미기입된 정보가 있습니다.');
//             item.focus();
//             return false;
//         }
//     }

buildCalendar();

function submitRes() {
    let mymodal = document.getElementById('my_modal');
    let background = document.getElementById('background');
    const outputDate = $('#selectedDate').val();
    const outputTime = $('#selectedTime').val();
    const outputDortor = $('#selectedDoctor').val();

    if (outputTime.length > 0) {
        $('input[name=reservationSelectedDate]').attr('value', outputDate);
        $('input[name=reservationSelectedTime]').attr('value', outputTime);
        $('input[name=pickUpDoctor]').attr('value', outputDortor);

        background.remove();
        mymodal.style.display = 'none';
    } else {
        alert('예약일시를 선택해주세요.');
    }
    tableinit();
}

function enterSearch() {
    let evt_code = window.netscape ? event.which : event.keyCode;

    if (evt_code == 13) {
        event.keyCode = 0;

        getAddr();
    }
}

/// @brief 주소검색창 - 데이터 조회
function getAddr() {
    let totalCnt = document.getElementById('totalCnt');
    let keyword = document.getElementById('searchAddr');

    // 적용예 (api 호출 전에 검색어 체크)

    if (!checkSearchedWord(keyword)) {
        return;
    }

    jQuery.ajax({
        url: 'http://www.juso.go.kr/addrlink/addrLinkApiJsonp.do',
        type: 'POST',
        data: {
            confmKey: 'devU01TX0FVVEgyMDIzMDExOTEwMTM0ODExMzQ0MzE=',
            currentPage: document.getElementById('currentPage').value,
            countPerPage: document.getElementById('countPerPage').value,
            keyword: keyword.value,
            resultType: 'json',
        },
        dataType: 'jsonp',
        crossDomain: true,
        success: function (jsonStr) {
            jQuery('#list').html('');
            let errCode = jsonStr.results.common.errorCode;
            let errDesc = jsonStr.results.common.errorMessage;
            if (errCode == '0') {
                if (jsonStr != null) {
                    makeListJson(jsonStr);
                    totalCnt.style.display = '';
                }
            } else {
                alert(errDesc);
            }
        },
        error: function (xhr, status, error) {
            alert('에러발생');
        },
    });
}
/// @brief 주소검색창 - 주소지 선택
function makeListJson(jsonStr) {
    let htmlStr =
        "<thead><tr><th style='width:70px;'>우편번호</th><th>주소</th></tr></thead><tbody>";
    if (jsonStr.results.common.totalCount > 0) {
        jQuery('#totoalOutcome').css('display', 'block');
        jQuery('#totalCnt').html(jsonStr.results.common.totalCount);
        jQuery(jsonStr.results.juso).each(function () {
            let zipNo = this.zipNo; // 우편번호
            let roadAddr = this.roadAddr; // 도로명 주소
            let jibunAddr = this.jibunAddr; // 지번 주소
            htmlStr += '<tr>';
            htmlStr += '<td>';
            htmlStr +=
                "<a href='javascript:;' onClick='inputTextAddress(\"" +
                zipNo +
                '", "' +
                roadAddr +
                '");\'>';
            htmlStr += zipNo;
            htmlStr += '</a>';
            htmlStr += '</td>';
            htmlStr += '<td>';
            htmlStr +=
                "<a href='javascript:;' onClick='inputTextAddress(\"" +
                zipNo +
                '", "' +
                roadAddr +
                '");\'>';
            htmlStr += '도로명 : ' + roadAddr;
            htmlStr += '</a>';
            htmlStr += '<br/>';
            htmlStr +=
                "<a href='javascript:;' onClick='inputTextAddress(\"" +
                zipNo +
                '", "' +
                jibunAddr +
                '");\'>';
            htmlStr += '지번 : ' + jibunAddr;
            htmlStr += '</a>';
            htmlStr += '</td>';
            htmlStr += '</tr>';
        });

        pageMake(jsonStr);
    } else {
        htmlStr +=
            "<tr><td colspan='2'>조회된 데이터가 않습니다.<br/>다시 검색하여 주시기 바랍니다.</td></tr>";
    }
    htmlStr += '</tbody>';
    jQuery('#list').html(htmlStr);
}
/// @brief 주소검색창 - 주소지 삽입
function inputTextAddress(zipcode, reservationAddress) {
    document.getElementById('zipCode').value = zipcode;
    document.getElementById('reservationAddress').value = reservationAddress;
}
/// @brief 주소검색창 - 열기
function addressWindowOpen() {
    jQuery('#wrap').slideDown();
    jQuery('#searchAddr').focus();
}
/// @brief 주소검색창 - 닫기
function addressWindowClose() {
    jQuery('#wrap').slideUp();
    jQuery('#searchAddr').val('');
    jQuery('#totoalOutcome').css('display', 'none');
    jQuery('#list').empty();
    jQuery('#pagingList').empty();
    jQuery('#currentPage').val('1');
}
/// @brief 주소검색창 - 특수문자 제거
function checkSearchedWord(obj) {
    if (obj.value.length > 0) {
        // 특수문자 제거
        const expText = /[%=><]/;
        if (expText.test(obj.value) == true) {
            alert('특수문자를 입력 할수 없습니다.');
            obj.value = obj.value.split(expText).join('');
            return false;
        }
        // 특정문자열(sql예약어의 앞뒤공백포함) 제거
        let sqlArray = new Array(
            'OR',
            'SELECT',
            'INSERT',
            'DELETE',
            'UPDATE',
            'CREATE',
            'DROP',
            'EXEC',
            'UNION',
            'FETCH',
            'DECLARE',
            'TRUNCATE'
        );
        // sql 예약어
        let regex = '';
        for (let num = 0; num < sqlArray.length; num++) {
            regex = new RegExp(sqlArray[num], 'gi');
            if (regex.test(obj.value)) {
                alert('"' + sqlArray[num] + '"와(과) 같은 특정문자로 검색할 수 없습니다.');
                obj.value = obj.value.replace(regex, '');
                return false;
            }
        }
    }
    return true;
}
/// @brief 주소검색창 - 페이징 생성
function pageMake(jsonStr) {
    let total = jsonStr.results.common.totalCount; // 총건수
    let pageNum = document.getElementById('currentPage').value; // 현재페이지
    let pageBlock = Number(document.getElementById('countPerPage').value); // 페이지당 출력 개수
    let paggingStr = '';
    // 검색 갯수가 페이지당 출력갯수보다 작으면 페이징을 나타내지 않는다.
    if (total > pageBlock) {
        let totalPages = Math.floor((total - 1) / pageNum) + 1;
        let firstPage = Math.floor((pageNum - 1) / pageBlock) * pageBlock + 1;
        if (firstPage <= 0) {
            firstPage = 1;
        }
        let lastPage = firstPage - 1 + pageBlock;
        if (lastPage > totalPages) {
            lastPage = totalPages;
        }
        let nextPage = lastPage + 1;
        let prePage = firstPage - pageBlock;
        if (firstPage > pageBlock) {
            paggingStr += "<a href='javascript:;' onClick='goPage(" + prePage + ");'>◀</a>";
            paggingStr += '&nbsp;';
        }
        for (let num = firstPage; lastPage >= num; num++) {
            if (pageNum == num) {
                paggingStr +=
                    "<a style='font-weight:bold;color:#0000FF;' href='javascript:;'>" +
                    num +
                    '</a>';
                paggingStr += '&nbsp;';
            } else {
                paggingStr +=
                    "<a href='javascript:;' onClick='goPage(" + num + ");'>" + num + '</a>';
                paggingStr += '&nbsp;';
            }
        }
        if (lastPage < totalPages) {
            paggingStr += "<a href='javascript:;' onClick='goPage(" + nextPage + ");'>▶</a>";
        }
    }
    jQuery('#pagingList').html(paggingStr);
}
/// @brief 페이징 이동
function goPage(pageNum) {
    document.getElementById('currentPage').value = pageNum;
    getAddr();
}

function inputData() {
    let addressTable = document.getElementById('list');
    let totalCnt = document.getElementById('totalCnt');
    let zipCode = document.getElementById('zipCode');
    let searchAddr = document.getElementById('searchAddr');
    let resDateForm = document.getElementById('reservationAddress');
    let resTimeForm = document.getElementById('detailAddress');
    let addressModal = document.getElementById('address_modal');
    let background = document.getElementById('background');
    const reservationAddress = $('#reservationAddress').val();
    const detailAddress = $('#detailAddress').val();

    if (detailAddress.length > 0) {
        $('input[name=address]').attr('value', `${reservationAddress} ${detailAddress}`);

        background.remove();
        addressModal.style.display = 'none';
    } else {
        alert('주소를 입력해주세요.');
    }

    resTimeForm.value = '';
    resDateForm.value = '';
    zipCode.value = '';
    searchAddr.value = '';
    totalCnt.style.display = 'none';

    while (addressTable.rows.length > 0) {
        addressTable.deleteRow(addressTable.rows.length - 1);
    }
    jQuery('#pagingList').empty();
}

function reservaionCheck() {
    const pickupdoctor = $('#pickUpDoctor').val();
    const relationship = $('#relationCategory').val();
    const name = $('#patientName').val();
    const proxyname = $('#proxyName').val();
    const idnumber = $('#idNumber').val();
    const phone = $('#phone').val();
    const address = $('#address').val();
    const reservationdate = $('#reservationSelectedDate').val();
    const reservationtime = $('#reservationSelectedTime').val();
    const contents = $('#contents').val();

    $.ajax({
        type: 'POST',
        url: `/api/users/reservation/${pickupdoctor}`,
        data: {
            relationship: relationship,
            name: name,
            phone: phone,
            reservationdate: reservationdate,
            reservationtime: reservationtime,
            contents: contents,
            idnumber: idnumber,
            proxyName: proxyname,
            address: address,
        },
        success: function (response) {
            location.href = '/users/reservation';
            alert('예약신청이 완료되었습니다.');
        },
        error: function (error) {
            console.log(error);
        },
    });
}
