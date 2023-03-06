// 전체회원목록 조회
$.ajax({
    type: 'GET',
    url: `/api/admin`,
    async: false,
    success: function (response) {
        for (let i = 0; i < response.length; i++) {
            let { userId, loginId, name, phone, idNumber, address, createdAt } = response[i];

            let temp_html = `<tr>
                                <th scope="row" class="list-MS" id="userId${userId}">${userId}</th>
                                <td class="list-name">${name}</td>
                                <td class="list-name">${getGender(idNumber)}</td>
                                <td class="list-MS">${loginId}</td>
                                <td class="list-MS">${phone}</td>
                                <td class="list-MS">${idNumber}</td>
                                <td class="list-name">${editaddress(address)}</td>
                                <td class="list-MS"">${editDate(createdAt)}</td>
                                <td>
                                    <a href="#" class="btn btn-secondary" style="width:105px; height:35px" onclick="userDelete(${userId})"
                                        >회원삭제</a
                                    >
                                </td>
                            </tr>`;
            $('#allUserList').append(temp_html);
        }
    },
});

// 일반회원목록 조회
function getCustomUserInfo(role) {
    console.log(role);
    $.ajax({
        type: 'GET',
        url: `/api/admin/customer`,
        async: false,
        success: function (response) {
            for (let i = 0; i < response.length; i++) {
                let { userId, loginId, name, phone, idNumber, address, createdAt } = response[i];

                let temp_html = `<tr>
                                    <th scope="row" class="list-MS" id="userId${userId}">${userId}</th>
                                    <td class="list-name">${name}</td>
                                    <td class="list-name">${getGender(idNumber)}</td>
                                    <td class="list-MS">${loginId}</td>
                                    <td class="list-MS">${phone}</td>
                                    <td class="list-MS">${idNumber}</td>
                                    <td class="list-name">${editaddress(address)}</td>
                                    <td class="list-MS"">${editDate(createdAt)}</td>
                                    <td>
                                        <a href="#" class="btn btn-secondary" style="width:105px; height:35px" onclick="userDelete(${userId})"
                                            >회원삭제</a
                                        >
                                    </td>
                                </tr>`;
                $('#customUserList').append(temp_html);
            }
        },
    });
}

// 파트너회원목록 조회
function getPartnerUserInfo(role) {
    console.log(role);
    $.ajax({
        type: 'GET',
        url: `/api/admin/partner`,
        async: false,
        success: function (response) {
            for (let i = 0; i < response.length; i++) {
                let { userId, loginId, name, phone, idNumber, address, createdAt } = response[i];

                let temp_html = `<tr>
                                    <th scope="row" class="list-MS" id="userId${userId}">${userId}</th>
                                    <td class="list-name">${name}</td>
                                    <td class="list-name">${getGender(idNumber)}</td>
                                    <td class="list-MS">${loginId}</td>
                                    <td class="list-MS">${phone}</td>
                                    <td class="list-MS">${idNumber}</td>
                                    <td class="list-name">${editaddress(address)}</td>
                                    <td class="list-MS"">${editDate(createdAt)}</td>
                                    <td>
                                        <a href="#" class="btn btn-secondary" style="width:105px; height:35px" onclick="userDelete(${userId})"
                                            >회원삭제</a
                                        >
                                    </td>
                                </tr>`;
                $('#partnerUserList').append(temp_html);
            }
        },
    });
}

// 승인대기회원목록 조회
function getWaitingUserInfo(role) {
    console.log(role);
    $.ajax({
        type: 'GET',
        url: `/api/admin/waiting`,
        async: false,
        success: function (response) {
            for (let i = 0; i < response.length; i++) {
                let { userId, loginId, name, phone, idNumber, address, createdAt } = response[i];

                let temp_html = `<tr>
                                    <th scope="row" class="list-MS" id="userId${userId}">${userId}</th>
                                    <td class="list-name">${name}</td>
                                    <td class="list-name">${getGender(idNumber)}</td>
                                    <td class="list-MS">${loginId}</td>
                                    <td class="list-MS">${phone}</td>
                                    <td class="list-MS">${idNumber}</td>
                                    <td class="list-name">${editaddress(address)}</td>
                                    <td class="list-MS"">${editDate(createdAt)}</td>
                                    <td>
                                        <a href="#" class="btn btn-secondary" style="width:105px; height:35px" onclick="userDelete(${userId})"
                                            >회원삭제</a
                                        >
                                    </td>
                                </tr>`;
                $('#waitingUserList').append(temp_html);
            }
        },
    });
}

// 주소가 없으면 null 이 아닌 공백으로
function editaddress(address) {
    if (address === null) {
        const editaddress = '';
        return editaddress;
    } else {
        const editaddress = address;
        return editaddress;
    }
}

// 주민등록번호에 따른 성별
function getGender(idNumber) {
    const splitNumber = idNumber.split('-');
    const genderNumber = Number(splitNumber[1].substring(0, 1));
    if (genderNumber % 2 === 1) {
        gender = '남성';
    } else {
        gender = '여성';
    }
    return gender;
}

// 가입일 0000-00-00 형식
function editDate(date) {
    let yearMonthDate = new Date(date);
    let year = yearMonthDate.getFullYear();
    let month = yearMonthDate.getMonth();
    let day = yearMonthDate.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    let YearMonthDate = `${year}-${month}-${day}`;
    return YearMonthDate;
}

// 검색
$(document).ready(function () {
    $('#filter-value').on('keyup', function searchInput() {
        const value = $(this).val().toLowerCase();
        $('.userList tr').filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
});
