// 전체회원목록 조회
$(document).ready(function () {
    const urlSearch = new URLSearchParams(location.search);
    const page = Number(urlSearch.get('page'));
    const type = urlSearch.get('type');
    const search = urlSearch.get('search');

    if (type === 'customer') {
        $('.active').removeClass('active');
        $('#customerTab').addClass('active');
    } else if (type === 'partner') {
        $('.active').removeClass('active');
        $('#partnerTab').addClass('active');
    } else if (type === 'waiting') {
        $('.active').removeClass('active');
        $('#waitingTab').addClass('active');
    } else {
        $('.active').removeClass('active');
        $('#allUserListTab').addClass('active');
    }

    let ajaxURL = '';

    if (search) {
        ajaxURL = `/api/admin/search?page=${page || 1}&type=${type}&search=${search}`;
        searchURL = `&search=${search}`;
    } else {
        ajaxURL = `/api/admin/all?page=${page || 1}&type=${type}`;
        searchURL = ``;
    }

    $.ajax({
        type: 'GET',
        url: `${ajaxURL}`,
        async: false,
        success: function (response) {
            const lastPage = response.lastPage;
            const allUser = response.allUser;
            for (let i = 1; i <= lastPage; i++) {
                let temp_html = `<li class="page-item">
                    <a class="page-link" href="?page=${i}&type=${type}${searchURL}">${i}</a>
                </li>`;
                $('#Allpagination').append(temp_html);
            }

            for (let i = 0; i < allUser.rows.length; i++) {
                let { userId, loginId, name, phone, idNumber, address, createdAt, role } =
                    allUser.rows[i];
                if (role !== 'waiting') {
                    let temp_html = `<tr id="userId${userId}">
                                    <th scope="row" class="list-MS">${userId}</th>
                                    <td class="list-name">${name}</td>
                                    <td class="list-name">${getGender(idNumber)}</td>
                                    <td class="list-MS">${loginId}</td>
                                    <td class="list-MS">${phone}</td>
                                    <td class="list-name">${editaddress(address)}</td>
                                    <td class="list-MS"">${editDate(createdAt)}</td>
                                    <td><a href="#" class="btn btn-secondary" style="width:162.5px; height:35px" onclick="userDelete(${userId})"
                                            >회원삭제</a
                                        >
                                    </td>
                                    </tr>`;
                    $('#allUserList').append(temp_html);
                } else {
                    let temp_html = `<tr id="userId${userId}">
                                        <th scope="row" class="list-MS">${userId}</th>
                                        <td class="list-name">${name}</td>
                                        <td class="list-name">${getGender(idNumber)}</td>
                                        <td class="list-MS">${loginId}</td>
                                        <td class="list-MS">${phone}</td>
                                        <td class="list-name">${editaddress(address)}</td>
                                        <td class="list-MS"">${editDate(createdAt)}</td>
                                        <td>
                                            <a href="#" class="btn btn-secondary" id="approve${userId}" style="width:80px; height:35px" onclick="approveUpdate(${userId})"
                                                >승인</a
                                            >
                                            <a href="#" class="btn btn-secondary" id="unapprove${userId}" style="width:80px; height:35px" onclick="userDelete(${userId})"
                                                >미승인</a
                                            >
                                        </td>
                                    </tr>`;
                    $('#allUserList').append(temp_html);
                }
            }
        },
        error: function (err) {
            swal('😭 조회 실패', '목록을 불러오는 데 실패하였습니다.', 'error');
        },
    });
});

let debouncingTime = null;
$('#filter-value').on('keyup', function searchInput() {
    if (debouncingTime) clearTimeout(debouncingTime);
    debouncingTime = setTimeout(() => {
        const urlSearch = new URLSearchParams(location.search);
        const page = Number(urlSearch.get('page'));
        const type = urlSearch.get('type');

        const url = new URL(window.location);
        const search = url.searchParams.set('search', $('#filter-value').val());

        location.href = url;
    }, 500);
});

// 일반회원삭제 버튼을 누를 시
function userDelete(userId) {
    swal({
        title: '회원삭제',
        text: '정말로 삭제하시겠습니까?',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
    }).then((result) => {
        if (result) {
            $.ajax({
                type: 'DELETE',
                url: `/api/admin/${userId}`,
                async: false,
                success: function (success) {
                    swal('😊 삭제 성공!', '정상적으로 삭제되었습니다.', 'success').then(() => {
                        $(`#userId${userId}`).remove();
                        location.reload();
                    });
                },
            });
        } else {
            swal('😁 삭제 취소', '취소되었습니다.', 'info');
        }
    });
}

// 승인대기 파트너회원 승인 버튼 누를시
function approveUpdate(userId) {
    swal({
        title: '파트너회원 승인',
        text: '해당 회원을 파트너회원으로 승인하시겠습니까?',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
    }).then((result) => {
        if (result) {
            $.ajax({
                type: 'PATCH',
                url: `/api/admin/${userId}`,
                async: false,
                data: { role: 'partner' },
                success: function (success) {
                    swal('😊 승인 성공!', '정상적으로 승인되었습니다.', 'success').then(() => {
                        $(`#userId${userId}`).remove();
                        location.reload();
                    });
                },
            });
        } else {
            swal('😁 승인 취소', '취소되었습니다.', 'info');
        }
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
