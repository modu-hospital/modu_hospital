$(document).ready(function () {
    informationHospital();
});

function informationHospital() {
    $.ajax({
        type: 'GET',
        url: '/api/hospitals/information',
        dataType: 'json',
        success: function (response) {
            const hospital = response.data;

            $('.card-title').text(hospital.name);
            $('.card-text:eq(0)').text('주소: ' + hospital.address);
            $('.card-text:eq(1)').text('전화번호: ' + hospital.phone);
            $('.card-text:eq(2)').text('위도: ' + hospital.latitude);
            $('.card-text:eq(3)').text('경도: ' + hospital.longitude);
            $('.card-text:eq(4)').text('생성 날짜: ' + hospital.createdAt);
            $('.card-text:eq(5)').text('업데이트 날짜: ' + hospital.updatedAt);
        },
    });
}

