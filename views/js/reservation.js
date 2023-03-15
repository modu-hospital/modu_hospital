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
    let modal = document.getElementById(id);

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

    // 닫기 버튼 처리, 시꺼먼 레이어와 모달 div 지우기
    modal.querySelector('.modal_close_btn').addEventListener('click', function () {
        background.remove();
        modal.style.display = 'none';
    });

    modal.setStyle({
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

// <%
// 	if ((Integer)request.getAttribute("error") == 1){
// 		out.println("<script>alert('오류발생1!!');history.back();</script>");
// 	}

// 	//유저정보 획득
// 	String userName = LoginedUserInfo.name;
// 	String userPhone = LoginedUserInfo.phone;
// 	String userEmail = LoginedUserInfo.email;

// 	//share detail data
// 	Dto_Share share = (Dto_Share)request.getAttribute("DETAIL");
// 	//JSON 형식으로 달의 날자별 예약현황을 전송받음
// 	JSONArray thisMonthResData = (JSONArray)request.getAttribute("thisMonthResData");
// 	JSONArray nextMonthResData = (JSONArray)request.getAttribute("nextMonthResData");

// 	//예약가능 요일 (일~월, 가능0 불가능1)
// 	char[] possibleDay = (share.getDayLimit()).toCharArray();
// 	//예약가능 시간 (start time~end time) end - start = 이용가능시
// 	int startTime = share.getStartTime();
// 	int endTime = share.getEndTime();
// 	//총 이용 가능 시간
// 	int totalUsingTime = endTime - startTime;

// 	//예약이 가득찬 날들의 배열
// const thisMonthFullDateList = new Array();
// thisMonthFullDateList.forEach((date) => {
//     thisMonthFullDateList.push(date);
// });
// const nextMonthFullDateList = new Array();
// nextMonthFullDateList.forEach((date) => {
//     nextMonthFullDateList.push(date);
// });

// console.log(thisMonthFullDateList);

// 	var thisMonthFullDateList = new Array();
// 	<c:forEach items="${thisMonthFullDateList}" var = "date">
// 		thisMonthFullDateList.push(${date});
// 	</c:forEach>
// 	var nextMonthFullDateList = new Array();
// 	<c:forEach items="${nextMonthFullDateList}" var = "date">
// 		nextMonthFullDateList.push(${date});
// 	</c:forEach>

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
        // 예약이 가득찬 날을 배열로 보유하고 있어 날마다 탐색하는 것은 비효율적
        // for문 종료 후 예약이 가득찬 날의 배열을 순차탐색해서 해당 일자의 id를 가진 cell을 핸들링 하는 것이 효율적
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

    // 예약이 가득찬 날의 경우 cell 비활성화 및 색상 변경
    // 조건문. 위에서 구해놓은 monthEquals로 달에 알맞은 정보를 담은 Array를 사용하기 위함 : 요일을 29~31개 만들때마다 조회하는 것보다 이게 효율적
    // checkMonth = thisMonth(nowMonth, realMonth);
    // fullDate = [];
    // if (checkMonth === 0) {
    //     fullDate = thisMonthFullDateList;
    // }
    // if (checkMonth === 1) {
    //     fullDate = nextMonthFullDateList;
    // }
    // // 예약불가 처리방법
    // for (let i = 0; i < fullDate.length; i++) {
    //     // fullDate : 지금 만드는 달의 날짜 중 예약이 꽉 찬 날을 int로 보유
    //     console.log('꽉 찬날 : ' + fullDate[i]);
    //     cell = document.getElementById(fullDate[i]); // fullDate를 순차탐색해 해당하는 날짜의 id를 가진 cell을 호출
    //     console.log('꽉 찬날 : ' + cell.innerHTML);
    //     cell.style.backgroundColor = '#E0E0E0'; // 배경색과 글자색을 예약불가일과 동일하게 변경
    //     cell.style.color = '#C6C6C6';
    //     cell.onclick = function () {}; // 클릭이벤트함수를 빈 함수로 덮어씌워 클릭이벤트를 초기화
    // }

    // // 달의 마지막 날 뒤 행의 빈 공간을 셀로 채우기
    // if (cnt % 7 != 0) {
    //     for (i = 0; i < 7 - (cnt % 7); i++) {
    //         cell = row.insertCell();
    //     }
    // }
}

// row1 = calendarTable.insertRow();
// for (i = 1; i <= lastDate.getDate(); i++) {
//     cell = row.insertCell();
//     cnt += 1;

//     cell.setAttribute('id', i);
//     cell.innerHTML = i;
//     cell.align = 'center';

//     cell.onclick = function () {
//         clickedYear = today.getFullYear();
//         clickedMonth = 1 + today.getMonth();
//         clickedDate = this.getAttribute('id');

//         clickedDate = clickedDate >= 10 ? clickedDate : '0' + clickedDate;
//         clickedMonth = clickedMonth >= 10 ? clickedMonth : '0' + clickedMonth;
//         clickedYMD = clickedYear + '-' + clickedMonth + '-' + clickedDate;

//         opener.document.getElementById('date').value = clickedYMD;
//         self.close();
//     };

//     if (cnt % 7 == 1) {
//         cell.innerHTML = '<font color=#F79DC2>' + i + '</font>';
//     }

//     if (cnt % 7 == 0) {
//         cell.innerHTML = '<font color=skyblue>' + i + '</font>';
//         row = calendar.insertRow();
//     }
// }

// 사용자가 입력한 예약불가능 일자와 대조하기 위해 0~7의 환형 계산구조
// cnt를 매개변수로 넣어 현재 일이 '무슨 요일'인지 반환(1: 일, 2: 월, 3: 화, 4: 수, 5: 목, 6: 금, 7: 토)
// result에서 1을 빼고 연산하는 이유 : 이후 배열의 인덱스로 사용해 해당값을 조회해야 함. 배열의 인덱스는 0부터 시작이기 때문
// i(일수)대신 cnt를 사용하는 이유 : i와 cnt는 같이 1씩 증가하지만 시작이 다름. i(요일)의 시작은 월의 첫 날, cnt의 시작은 첫 행 첫번째 셀
// i 자체로는 '무슨 요일'인지 파악할 수 없음
// cnt로 i(일)가 '무슨' 요일인지 7로 나머지 연산을 해서 알 수 있음
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
let startTime;
let startTimeHalf;
let endTime;
let endTimeHalf;
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
            console.log('GET success 후 받아진 response: ', response);

            // 고려해야 할 점
            // 1. 의사가 2명 이상일 경우
            // 2. 퐁당퐁당 예약가능할 경우
            // 3. 예약이 하나도 없을 경우

            console.log(Object.values(response));

            row = null;
            month = selectedMonth; // 달력에서 선택한 셀의 달
            date = selectedDate; // 일자를 받아오고
            let timeTable = document.getElementById('timeTable'); // 시간표를 출력할 테이블을 가져옴

            // 테이블 초기화
            while (timeTable.rows.length > 0) {
                timeTable.deleteRow(timeTable.rows.length - 1);
            }

            // 시간표 테이블 생성
            for (i = 0; i < endTime - startTime; i++) {
                function onTime(i) {
                    console.log('onTime: ', i);
                    //곱해서 숫자타입으로 변환
                    cellTime = startTime * 1 + i;

                    // 시작시간부터 30분씩 순차적으로 셀 생성
                    cellStartTimeText = cellTime + ':00';
                    cellEndTimeText = cellTime + ':30';
                    inputCellText = cellStartTimeText + ' ~ ' + cellEndTimeText;

                    //셀 입력을 위해 테이블 개행
                    row = timeTable.insertRow();
                    //해당 row의 셀 생성
                    cell = row.insertCell();
                    //cell에 id 부여
                    cell.setAttribute('id', cellTime); // id는 행의 시작시간
                    cell.setAttribute('class', 'timetable');
                    //셀에 입력
                    cell.innerHTML = inputCellText;
                    console.log(
                        'onTime(i): ',
                        inputCellText,
                        'onTime(id): ',
                        cell.getAttribute('id')
                    );
                }

                function halfAnTime(i) {
                    console.log('halfAnTime: ', i);
                    // 시간 출력
                    cellTime = startTime * 1 + i;
                    for (let j = 30; j >= 0; j -= 30) {
                        // 30분 간격으로 분 출력
                        if (j === 0) {
                            cellTime = cellTime + 1;
                            cellEndTimeText = cellTime + ':00';
                        } else {
                            cellStartTimeText = cellTime + ':30';
                        }
                    }
                    inputCellText = cellStartTimeText + ' ~ ' + cellEndTimeText;

                    //셀 입력을 위해 테이블 개행
                    row = timeTable.insertRow();
                    //해당 row의 셀 생성
                    cell = row.insertCell();
                    //cell에 id 부여
                    cell.setAttribute('id', cellTime - 0.5); // id는 행의 시작시간
                    cell.setAttribute('class', 'timetable');
                    //셀에 입력
                    cell.innerHTML = inputCellText;
                    console.log(
                        'halfAnTime(i): ',
                        inputCellText,
                        'halfAnTime(id): ',
                        cell.getAttribute('id')
                    );
                }

                // 시간표 테이블 생성
                console.log('시간표 테이블 생성');
                if (startTimeHalf === 0 && endTimeHalf === 0) {
                    console.log('0 0 이다');
                    for (i = 0; i < endTime - startTime; i++) {
                        onTime(i);
                        halfAnTime(i);
                    }
                } else if (startTimeHalf !== 0 && endTimeHalf === 0) {
                    console.log('30 0 이다');
                    for (i = 0; i < endTime - startTime; i++) {
                        halfAnTime(i);
                        onTime(i + 1);
                    }
                } else if (startTimeHalf === 0 && endTimeHalf !== 0) {
                    console.log('0 30 이다');
                    for (i = 0; i < endTime - startTime; i++) {
                        onTime(i);
                        halfAnTime(i);
                    }
                    onTime(endTime - startTime);
                } else if (startTimeHalf !== 0 && endTimeHalf !== 0) {
                    console.log('30 30 이다');
                    for (i = 0; i < endTime - startTime; i++) {
                        halfAnTime(i);
                        onTime(i + 1);
                    }
                }

                // 시간표 테이블의 클릭이벤트
                $('.timetable').on('click', function () {
                    cellTime = this.getAttribute('id');
                    cellTime = cellTime * 1;
                    console.log('selected : ' + cellTime);

                    // 선택된 시간표테이블 셀의 색상 변경, 중복선택 불가하도록 처리
                    if (selectedCellTime != null) {
                        selectedCellTime.bgColor = '#FFFFFF';
                    }
                    selectedCellTime = this;
                    this.bgColor = '#fbedaa';

                    //하단의 예약일시에 시간 표시
                    if (cellTime % 1 === 0) {
                        resTime = cellTime + ':00 ~ ' + cellTime + ':30';

                        resTimeForm = document.getElementById('selectedTime');
                        resTimeForm.value = resTime;
                    } else {
                        resTime =
                            Math.floor(cellTime) + ':30 ~ ' + Math.floor(cellTime + 1) + ':00';

                        resTimeForm = document.getElementById('selectedTime');
                        resTimeForm.value = resTime;
                    }
                });
            }
        },
    });
}

//시간표 초기화
function tableinit() {
    $('#timeTable').empty();
    selectedTimeInit();
    buildCalendar();
}

//날짜 클릭시 예약시간 초기화
function selectedTimeInit() {
    resDateForm = document.getElementById('selectedDate');
    resTimeForm = document.getElementById('selectedTime');
    resTimeForm.value = '';
    resDateForm.value = '';

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

// if ( ${DETAIL.capacity} < capacityForm.value){
//     alert("인원수가 초과되었습니다.");
//     capacityForm.focus();
//     return false;
// }

// popUp = window.open("payment", "payment");
// form = document.paymentForm
// form.action = "payment";
// form.target = "payment";
// form.submit();
// }

buildCalendar();

function submitRes() {
    const a = $('#selectedDate').val();
    const b = $('#selectedTime').val();

    $('input[name=reservationSelectedDate]').attr('value', a);
    $('input[name=reservationSelectedTime]').attr('value', b);
}
