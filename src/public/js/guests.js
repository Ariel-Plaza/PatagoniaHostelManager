//dashboard

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

const selectAllCheckbox = document.getElementById("selectAll");
const guestCheckboxes = document.querySelectorAll('table tbody input[type="checkbox"]');

selectAllCheckbox.addEventListener("click", function () {
  const isChecked = this.checked;
  guestCheckboxes.forEach(checkbox => {
    checkbox.checked = isChecked;
  });
});

// Escucha el clic en cada checkbox individual.
guestCheckboxes.forEach(checkbox => {
  checkbox.addEventListener("click", function () {
    // Si algún checkbox individual se deselecciona, deselecciona 'seleccionar todo'.
    if (!this.checked) {
      selectAllCheckbox.checked = false;
    }
  });
});


//New guest
let formAddGuest = document.querySelector('#formAddGuest');

formAddGuest.addEventListener('submit', (event) => {
  event.preventDefault();
  //falta validar datos de entrada


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
  //Solicitud post
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  // try catch
  // try {
    
  // }
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
});

//Edit guest
//encuentra todos los botones edit y escucha el clic para activar la funcion editguest
document.querySelectorAll(".edit").forEach(btn => {
  btn.addEventListener("click", function (e) {
    const guestId = e.currentTarget.dataset.guestID;
    
    
    
    
    
    
    
    //API Call
    fetch(`/api/guests/${guestId}`)
      .then(response => response.json())
      .then(data => {
        modal.querySelector("input[name='firstName']").value
      })
      .catch(error => console.error('Error fetching guest data:', error));
  });

});

// function editguest(e) {
//   //obtiene el boton que realizo el disparo y el modal que se va a rellenar

//   const btn = e.currentTarget;
//   const modal = document.getElementById("editGuestModal");
//   //busca los campos dentro del modal y los rellena con la data 
//   modal.querySelector("input[name='firstName']").value = btn.dataset.firstname || "";
//   modal.querySelector("input[name='email']").value = btn.dataset.email || "";
//   modal.querySelector("textarea").value = `${btn.dataset.street || ""}, ${btn.dataset.city || ""}, ${btn.dataset.country || ""}`;
//   modal.querySelector("input[type='text']:not([name='firstName'])").value = btn.dataset.phone || "";
// }