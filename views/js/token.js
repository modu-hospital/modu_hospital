function getCookie(name) {
    var nameOfCookie = name + '=';
    var x = 0;
    while (x <= document.cookie.length) {
        var y = x + nameOfCookie.length;
        if (document.cookie.substring(x, y) == nameOfCookie) {
            if ((endOfCookie = document.cookie.indexOf(';', y)) == -1)
                endOfCookie = document.cookie.length;
            return unescape(document.cookie.substring(y, endOfCookie));
        }
        x = document.cookie.indexOf(' ', x) + 1;
        if (x == 0) break;
    }
    return '';
}

const whenExpiredToken = function () {
    const refreshToken = getCookie('refreshToken');
    if (refreshToken === '' || refreshToken === undefined) {
        return;
    }
    $.ajax({
        type: 'GET',
        url: `/api/token`,
        headers: { 'X-Refresh-Token': refreshToken },
        dataType: 'json',
        success: function (response) {
            //console.log("if response 전")
            if (response) {
                //console.log("if response")
                setTimeout(() => {
                    whenExpiredToken();
                }, 840000);//72000000
            }

            // console.log("if response 후")

            // while (document.cookie.length !== 0) {

            // }
            const newAccessToken = response.newAccessToken;
            $.ajaxSetup({ headers: { Authorization: 'Bearer ' + newAccessToken } });

            // console.log("ajaxSetup 후")
            // 로그인 안했을 때
            // 로그인 했을 때
            // 로그인 중에 재발급 받았을 때

            // const accessToken = document.cookie.split(';')[0].split('=')[1]
            // const refreshToken =  document.cookie.split(';')[1].split('=')[1]
        },
        error: function (error) {
            console.log('error.responseJSON.message', error.responseJSON);
        },
    });
};

whenExpiredToken();

// 응답이 null 이면 그다음 코드가 실행이 안되게 하면 될거같다~
// 만약 있으면 (로그인 됬다는거)셋타임 시작 그 셋타임 안에 whenExpiredToken()
// setTimeout() 7초를 걸었으면 7초 뒤에 이 안에 있는 콜백함수가 실행 whenExpiredToken()
