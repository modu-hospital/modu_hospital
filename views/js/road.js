function openModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
}

let modal = document.getElementById('modal');
let span = document.getElementsByClassName('close')[0];
span.onclick = function () {
    modal.style.display = 'none';
};

// 모달창 외부 클릭시 창 닫기
window.onclick = function (event) {
    let modal = document.getElementById('modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

// 행정안전부 주소검색 api
/// @brief 주소검색창 - 키보드 Enter키 입력

function enterSearch() {
    let evt_code = window.netscape ? event.which : event.keyCode;

    if (evt_code == 13) {
        event.keyCode = 0;

        getAddr();
    }
}

/// @brief 주소검색창 - 데이터 조회

function getAddr() {
    // 적용예 (api 호출 전에 검색어 체크)

    let keyword = document.getElementById('searchAddr');

    if (!checkSearchedWord(keyword)) {
        return;
    }

    jQuery.ajax({
        url: 'https://www.juso.go.kr/addrlink/addrLinkApiJsonp.do',

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
                }
            } else {
                swal('😭 에러발생', errDesc, 'error');
            }
        },

        error: function (xhr, status, error) {
            swal('😭 에러발생', '주소 조회 실패', 'error');
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

function inputTextAddress(zipcode, roadaddress) {
    document.getElementById('zipCode').value = zipcode;

    document.getElementById('roadaddress').value = roadaddress;
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
            swal({
                title: '😓 죄송합니다.',
                text: '특수문자를 입력 할수 없습니다.',
                icon: 'warning',
            }).then(() => {
                obj.value = obj.value.split(expText).join('');
                return false;
            });
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

        for (var num = 0; num < sqlArray.length; num++) {
            regex = new RegExp(sqlArray[num], 'gi');

            if (regex.test(obj.value)) {
                swal({
                    title: '😓 죄송합니다.',
                    text: '"' + sqlArray[num] + '"와(과) 같은 특정문자로 검색할 수 없습니다.',
                    icon: 'warning',
                }).then(() => {
                    obj.value = obj.value.replace(regex, '');
                    return false;
                });
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
    let text = document.getElementById('roadaddress').value;
    document.getElementById('address').value = text;
    let modal = document.getElementById('modal');
    modal.style.display = 'none';
}
