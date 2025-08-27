//Creacion new guest
let formAddGuest = document.querySelector('#formAddGuest');

formAddGuest.addEventListener('submit', (event) => {
  event.preventDefault();
  //Configuracion de datos json
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  //Datos a enviar a backend
  const raw = JSON.stringify({
    "guest_id": addGuest_id.value,
    "first_name": addFirstName.value,
    "last_name": addLastName.value,
    "nationality": addNationality.value,
    "email": addEmail.value,
    "phone_number": addPhone.value,
    "address": {
      "street": addStreet.value,
      "city": addCity.value,
      "country": addCountry.value
    }

  });
  console.log(raw)
  //Solicitud post
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  //Llamada a la api
  fetch("/api/guests/create", requestOptions)
    .then(response => response.json())
    .then(result => {
      if (result.code == 201) {
        alert(`Mensaje: ${result.message}\nID nuevo guest: ${result.data}`);
        //actualiza la tabla
        location.reload();
      } else {
        alert(result.message)
      }
    })
    .catch(error => console.log('error front', error));
})



$(document).ready(function () {
  // Activate tooltip
  $('[data-toggle="tooltip"]').tooltip();

  // Select/Deselect checkboxes
  var checkbox = $('table tbody input[type="checkbox"]');
  $("#selectAll").click(function () {
    if (this.checked) {
      checkbox.each(function () {
        this.checked = true;
      });
    } else {
      checkbox.each(function () {
        this.checked = false;
      });
    }
  });
  checkbox.click(function () {
    if (!this.checked) {
      $("#selectAll").prop("checked", false);
    }
  });
});