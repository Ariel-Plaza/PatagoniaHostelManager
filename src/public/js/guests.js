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


// Crear nuevo guest
//obtengo el formulario
const formAddGuest = document.querySelector('#formAddGuest');
//escucho cuando se envie con boton submit
formAddGuest.addEventListener('submit', async (event) => {
  //evito el refresh
  event.preventDefault();

  try {
    // Preparar datos del formulario
    const guestData = {
      //obtengo los campos y elimino espacios con trim
      guest_id: addGuest_id.value.trim(),
      first_name: addFirstName.value.trim(),
      last_name: addLastName.value.trim(),
      nationality: addNationality.value.trim(),
      email: addEmail.value.trim(),
      phone_number: addPhone.value.trim(),
      address: {
        street: addStreet.value.trim(),
        city: addCity.value.trim(),
        country: addCountry.value.trim()
      }
    };

    // Validación básica antes de enviar
    //mejorar validacion para incluir todos los campos
    if (!guestData.first_name || !guestData.last_name || !guestData.nationality || !guestData.email ) {
      throw new Error('Los campos nombre, apellido nacionalidad y email son obligatorios');
    }

    // Realizar petición
    const response = await fetch('/api/guests/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(guestData)
    });

    // IMPORTANTE: fetch NO rechaza automáticamente en 4xx/5xx
    if (!response.ok) {
      // Manejar diferentes tipos de error
      if (response.status === 400) {
        throw new Error('Datos inválidos. Verifica el formulario');
      } else if (response.status === 401) {
        throw new Error('No autorizado. Inicia sesión nuevamente');
      } else if (response.status === 409) {
        throw new Error('El guest con ese ID ya existe');
      } else if (response.status === 500) {
        throw new Error('Error en el servidor. Intenta más tarde');
      } else {
        throw new Error(`Error del servidor: ${response.status}`);
      }
    }

    // Verificar que la respuesta es JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('La respuesta no es JSON válido');
    }

    const result = await response.json();

    // Verificar respuesta exitosa
    if (result.code === 201) {
      alert(`✓ ${result.message}\nID del nuevo guest: ${result.data}`);

      // Limpiar formulario
      formAddGuest.reset();

      // Actualizar la tabla
      location.reload();
    } else {
      // Manejar respuestas con código diferente a 201
      throw new Error(result.message || 'Error desconocido al crear guest');
    }

  } catch (error) {
    console.error('Error al crear guest:', error);

    // Manejar diferentes tipos de error
    if (error.name === 'TypeError') {
      alert('Error de conexión. Verifica tu internet.');
    } else if (error.message.includes('autorizado')) {
      alert('Sesión expirada. Inicia sesión nuevamente.');
      window.location.href = '/login';
    } else {
      alert(`Error: ${error.message}`);
    }

    // No re-lanzar el error aquí porque es el manejador final
  }
});

//edit guest
//encuentra todos los botones edit y escucha el clic para activar la funcion editguest
document.querySelectorAll(".edit").forEach(btn => {
  btn.addEventListener("click", editguest);
});

function editguest(e) {
  //obtiene el boton que realizo el disparo y el modal que se va a rellenar
  const btn = e.currentTarget;
  const modal = document.getElementById("editGuestModal");
  //busca los campos dentro del modal y los rellena con la data 
  modal.querySelector("input[name='firstName']").value = btn.dataset.firstname || "";
  modal.querySelector("input[name='email']").value = btn.dataset.email || "";
  modal.querySelector("textarea").value = `${btn.dataset.street || ""}, ${btn.dataset.city || ""}, ${btn.dataset.country || ""}`;
  modal.querySelector("input[type='text']:not([name='firstName'])").value = btn.dataset.phone || "";
}