$(document).ready(function () {
    reservationList();
    waitedreservationList();
    approvedreservationList();
    reviewList();
});

// {
//     "reservationdata": [
//       {
//         "hospitalId": 4,
//         "name": "담소유병원",
//         "doctors": [
//           {
//             "name": "이희찬",
//             "doctorId": 2,
//             "reservations": {
//               "id": 2,
//               "doctorId": 1,
//               "userId": 1,
//               "relationship": "0",
//               "name": "김용철",
//               "phone": "010-1234-5678",
//               "date": "2023-03-02 06:50",
//               "contents": "복통",
//               "idNumber": "600312-1000000",
//               "status": "waiting",
//               "createdAt": "2021-04-18T16:30:00.000Z",
//               "updatedAt": "2023-03-01T09:33:28.000Z"
//             }
//           },
//           {
//             "name": "김범석",
//             "doctorId": 3,
//             "reservations": {
//               "id": 3,
//               "doctorId": 3,
//               "userId": 6,
//               "relationship": "0",
//               "name": "김광덕",
//               "phone": "010-2345-1234",
//               "date": "2021-04-18 16:50",
//               "contents": "역류성식도염",
//               "idNumber": "701002-1000000",
//               "status": "approved",
//               "createdAt": "2021-04-18T16:50:43.000Z",
//               "updatedAt": "2021-04-18T16:50:43.000Z"
//             }
//           }
//         ]
//       }
//     ]
//   }

function extractReservations(reservationData) {
    let reservations = [];

    for (let i = 0; i < reservationData.length; i++) {
        let hospitalId = reservationData[i]['hospitalId'];
        let hospitalName = reservationData[i]['name'];

        let doctors = reservationData[i]['doctors'];
        for (let j = 0; j < doctors.length; j++) {
            let doctorId = doctors[j]['doctorId'];
            let doctorName = doctors[j]['name'];

            let reservation = doctors[j]['reservations'];
            if (reservation) {
                reservations.push({
                    hospitalId: hospitalId,
                    hospitalName: hospitalName,
                    doctorId: doctorId,
                    doctorName: doctorName,
                    reservationId: reservation['id'],
                    name: reservation['name'],
                    idNumber: reservation['idNumber'],
                    phone: reservation['phone'],
                    contents: reservation['contents'],
                    date: reservation['date'],
                    status: reservation['status'],
                });
            }
        }
    }

    return reservations;
}

// 전체예약관리
function reservationList() {
    $.ajax({
        type: 'GET',
        url: '/api/hospitals/reservation',
        dataType: 'json',
        success: function (response) {
            let reservations = extractReservations(response['reservationdata']);
            for (let i = 0; i < reservations.length; i++) {
                let reservation = reservations[i];

                let temp_html = `<tbody>
                            <tr>
                                <th scope="row">${i + 1}</th>
                                <td>${reservation.doctorName}</td>
                                <td>${reservation.name}</td>
                                <td>${reservation.idNumber}</td 
                                <td>${reservation.phone}</td>                              
                                <td>${reservation.phone}</td>
                                <td>${reservation.contents}</td>
                                <td>${reservation.date}</td>
                                <td>${
                                    reservation.status
                                }</td>                                                            
                            </tr>
                        </tbody>`;
                $('#reservationList').append(temp_html);
            }
        },
    });
}

function extractwaitedReservations(waitingdata) {
    let reservations = [];

    for (let i = 0; i < waitingdata.length; i++) {
        let hospitalId = waitingdata[i]['hospitalId'];
        let hospitalName = waitingdata[i]['name'];

        let doctors = waitingdata[i]['doctors'];
        for (let j = 0; j < doctors.length; j++) {
            let doctorId = doctors[j]['doctorId'];
            let doctorName = doctors[j]['name'];

            let reservation = doctors[j]['reservations'];
            if (reservation) {
                reservations.push({
                    hospitalId: hospitalId,
                    hospitalName: hospitalName,
                    doctorId: doctorId,
                    doctorName: doctorName,
                    reservationId: reservation['id'],
                    name: reservation['name'],
                    idNumber: reservation['idNumber'],
                    phone: reservation['phone'],
                    contents: reservation['contents'],
                    date: reservation['date'],
                    status: reservation['status'],
                });
            }
        }
    }

    return reservations;
}

// 승인대기 불러오기
function waitedreservationList() {
    $.ajax({
        type: 'GET',
        url: '/api/hospitals/reservation/status',
        dataType: 'json',
        success: function (response) {
            let reservations = extractwaitedReservations(response['waitingdata']);
            for (let i = 0; i < reservations.length; i++) {
                let reservation = reservations[i];

                let temp_html = `<tbody>
                            <tr>
                                <th scope="row">${i + 1}</th>
                                <td>${reservation.doctorName}</td>
                                <td>${reservation.name}</td>
                                <td>${reservation.idNumber}</td 
                                <td>${reservation.phone}</td>                              
                                <td>${reservation.phone}</td>
                                <td>${reservation.contents}</td>
                                <td>${reservation.date}</td>
                                <td>${
                                    reservation.status
                                }</td>                                                            
                            </tr>
                        </tbody>`;
                $('#waitingreservationList').append(temp_html);
            }
        },
    });
}

function extractwaitedReservations(waitingdata) {
    let reservations = [];

    for (let i = 0; i < waitingdata.length; i++) {
        let hospitalId = waitingdata[i]['hospitalId'];
        let hospitalName = waitingdata[i]['name'];

        let doctors = waitingdata[i]['doctors'];
        for (let j = 0; j < doctors.length; j++) {
            let doctorId = doctors[j]['doctorId'];
            let doctorName = doctors[j]['name'];

            let reservation = doctors[j]['reservations'];
            if (reservation) {
                reservations.push({
                    hospitalId: hospitalId,
                    hospitalName: hospitalName,
                    doctorId: doctorId,
                    doctorName: doctorName,
                    reservationId: reservation['id'],
                    name: reservation['name'],
                    idNumber: reservation['idNumber'],
                    phone: reservation['phone'],
                    contents: reservation['contents'],
                    date: reservation['date'],
                    status: reservation['status'],
                });
            }
        }
    }

    return reservations;
}

function extractapprovedReservations(approveddata) {
    let reservations = [];

    for (let i = 0; i < approveddata.length; i++) {
        let hospitalId = approveddata[i]['hospitalId'];
        let hospitalName = approveddata[i]['name'];

        let doctors = approveddata[i]['doctors'];
        for (let j = 0; j < doctors.length; j++) {
            let doctorId = doctors[j]['doctorId'];
            let doctorName = doctors[j]['name'];

            let reservation = doctors[j]['reservations'];
            if (reservation) {
                reservations.push({
                    hospitalId: hospitalId,
                    hospitalName: hospitalName,
                    doctorId: doctorId,
                    doctorName: doctorName,
                    reservationId: reservation['id'],
                    name: reservation['name'],
                    idNumber: reservation['idNumber'],
                    phone: reservation['phone'],
                    contents: reservation['contents'],
                    date: reservation['date'],
                    status: reservation['status'],
                });
            }
        }
    }

    return reservations;
}

// 예약완료 불러오기
function approvedreservationList() {
    $.ajax({
        type: 'GET',
        url: '/api/hospitals/reservation/approved',
        dataType: 'json',
        success: function (response) {
            let reservations = extractapprovedReservations(response['approveddata']);
            for (let i = 0; i < reservations.length; i++) {
                let reservation = reservations[i];

                let temp_html = `<tbody>
                            <tr>
                                <th scope="row">${i + 1}</th>
                                <td>${reservation.doctorName}</td>
                                <td>${reservation.name}</td>
                                <td>${reservation.idNumber}</td 
                                <td>${reservation.phone}</td>                              
                                <td>${reservation.phone}</td>
                                <td>${reservation.contents}</td>
                                <td>${reservation.date}</td>
                                <td>${
                                    reservation.status
                                }</td>                                                            
                            </tr>
                        </tbody>`;
                $('#approvedreservationList').append(temp_html);
            }
        },
    });
}

//리뷰관리
function reviewList() {
    $.ajax({
        type: 'GET',
        url: '/api/hospitals/reviews',
        dataType: 'json',
        success: function (response) {
            let reviews = response['data'];

            for (let i = 0; i < reviews.length; i++) {
                let userId = reviews[i]['userId'];
                let name = reviews[i]['name'];
                let contents = reviews[i]['reviews'][0]['contents'];
                let star = reviews[i]['reviews'][0]['star'];
                let reviewCreatedAt = reviews[i]['reviews'][0]['reviewCreatedAt'];

                let temp_html = `<tbody>
            <tr>
              <th scope="row">${i + 1}</th>
              <td>${name}</td>
              <td>${contents}</td>
              <td>${star}</td>
              <td>${reviewCreatedAt}</td>
            </tr>
          </tbody>`;

                $('#reviewList').append(temp_html);
            }
        },
    });
}
