//const API_URL = window.location.hostname == 'localhost' ? 'http://localhost:3000/api/v1/users' : 'production server';

function getIdFromQuery() {
  const parts = window.location.search.match(/\?id=([0-9]+)/);
  return parts[1];
}

function getUser(id) {
  return fetch(`${API_URL}/${id}`)
    .then(res => res.json());
}

function addPlantToPage(user, size, buttons, parent) {
  const UserDiv = document.createElement('div');
  parent.appendChild(UserDiv);
  productDiv.outerHTML = `
    <div class="card col-sm-${size}">
      <img class="card-img-top" src="${plant.image}" alt="${plant.name}">
      <div class="card-body">
        <h5 class="card-title">${plant.name}</h5>
        <p class="card-text">${plant.notes}</p>
        <!-- watering timer-->
        ${buttons}
      </div>
    </div>
  `;
}


function validateFormGetUser(form, errorMessage) {
  const formData = new FormData(form);
  
  // get plant data

  const plant = {
    name,
    notes: formData.get('description'),
    //watering timer stuff
    image: formData.get('image')
  };

  return plant;
}
