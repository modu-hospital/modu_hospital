$(document).ready(function () {
    informationEditHospital();
});

// updateField 객체 생성 
let updateField = {};

function informationEditHospital() {
  $.ajax({
    type: 'GET',
    url: '/api/hospitals/information',
    dataType: 'json',
    success: function (response) {
      const hospital = response.data;

      $('.card-title').html(`<input type="text" class="editable-text" id="nameInput" value="${hospital.name}">`);
      $('.card-text:eq(0)').html(`<input type="text" class="editable-text" id="addressModalBtn" data-toggle="modal" data-target="#addressModal" value="${hospital.address}">`);
      $('.card-text:eq(1)').html(`<input type="text" class="editable-text" id="phoneInput" value="${hospital.phone}">`);
      $('.card-text:eq(2)').html(`<input type="text" class="editable-text" id="latitudeInput" value="${hospital.latitude}">`);
      $('.card-text:eq(3)').html(`<input type="text" class="editable-text" id="longitudeInput" value="${hospital.longitude}">`);
      $('.card-text:eq(4)').text('생성 날짜: ' + hospital.createdAt);
      $('.card-text:eq(5)').text('업데이트 날짜: ' + hospital.updatedAt);
      $('#editButton').click(() => {
        updateHospital(updateField.fieldName, updateField.value);
        updateField = {};
      });
      $('.editable-text').focus((event) => {
        updateField.fieldName = event.target.id.replace('Input', '');
        updateField.value = event.target.value;
      });
    },
  });
}

function updateHospital(fieldName, value) {
    $.ajax({
      type: 'PUT',
      url: '/api/hospitals/register/edit',
      data: { [fieldName]: value },
      success: function (response) {
        window.location.reload();
      },
      error: function (response) {
        console.log('Update failed');
      },
    });
  }

  
 