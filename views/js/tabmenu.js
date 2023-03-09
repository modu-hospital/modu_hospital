// $(document).ready(function () {
//     $('ul.tabs li').click(function () {
//         // var tab_id = $(this).attr('data-tab');

//         if (type === 'customer') {
//             $('ul.tabs li').removeClass('current');
//             $('.tab-content').removeClass('current');
//             $(this).addClass('current');
//             $('#customerTab').addClass('current');
//         } else if (type === 'partner') {
//             $('ul.tabs li').removeClass('current');
//             $('.tab-content').removeClass('current');
//             $(this).addClass('current');
//             $('#partnerTab').addClass('current');
//         } else if (type === 'waiting') {
//             $('ul.tabs li').removeClass('current');
//             $('.tab-content').removeClass('current');
//             $(this).addClass('current');
//             $('#waitingTab').addClass('current');
//         } else {
//             $('ul.tabs li').removeClass('current');
//             $('.tab-content').removeClass('current');
//             $(this).addClass('current');
//             $('#allUserListTab').addClass('current');
//         }

//         // $('ul.tabs li').removeClass('current');
//         // $('.tab-content').removeClass('current');

//         // $(this).addClass('current');
//         // $('#' + tab_id).addClass('current');
//     });

//     $('#customerTab').click(function (role) {
//         if (document.querySelector('#customUserList td') === null) {
//             getCustomUserInfo(role);
//         } else {
//             return;
//         }
//     });

//     $('#partnerTab').click(function (role) {
//         if (document.querySelector('#partnerUserList td') === null) {
//             getPartnerUserInfo(role);
//         } else {
//             return;
//         }
//     });

//     $('#waitingTab').click(function (role) {
//         if (document.querySelector('#waitingUserList td') === null) {
//             getWaitingUserInfo(role);
//         } else {
//             return;
//         }
//     });
// });
