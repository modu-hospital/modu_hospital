$(document).ready(function () {
    reservationList();
});

function reservationList() {
    $.ajax({
        type: 'GET',
        url: '/api/hospitals/reservation',
        dataType: 'json',
        success: function (response) {
            let rows = response['reservationdata'];
            for (let i = 0; i < rows.length; i++) {
                let id = rows[i]['id'];
                let name = rows[i]['name'];
                let idNumber = rows[i]['idNumber'];
                let phone = rows[i]['phone'];
                let contents = rows[i]['contents'];
                let date = rows[i]['date'];
                let createdAt = rows[i]['createdAt'];
                let status = rows[i]['status'];

                let temp_html = `<tbody>
                          <tr>
                            <th scope="row">${id}</th>                                                                                               
                            <td>${name}</td>
                            <td>${idNumber}</td>
                            <td>${phone}</td>
                            <td>${contents}</td>
                            <td>${date}</td>                                                                                        
                            <td>${createdAt}</td>
                            <td>${status}</td>
                            </tr>
                        </tbody>`;
                $('#reservationList').append(temp_html);
            }
        },
    });
}
