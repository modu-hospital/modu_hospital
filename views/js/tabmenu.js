$(document).ready(function () {
    $('ul.tabs li').click(function () {
        var tab_id = $(this).attr('data-tab');

        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');

        $(this).addClass('current');
        $('#' + tab_id).addClass('current');
    });

    $('#customer').click(function (role) {
        if (document.querySelector('#customUserList td') === null) {
            getCustomUserInfo(role);
        } else {
            return;
        }
    });

    $('#partner').click(function (role) {
        if (document.querySelector('#partnerUserList td') === null) {
            getPartnerUserInfo(role);
        } else {
            return;
        }
    });

    $('#waiting').click(function (role) {
        if (document.querySelector('#waitingUserList td') === null) {
            getWaitingUserInfo(role);
        } else {
            return;
        }
    });
});
