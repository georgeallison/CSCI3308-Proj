const form = document.querySelector('form');
const errorMessage = document.querySelector('#errorMessage');
const plant_id = getIdFromQuery();

errorMessage.style.display = 'none';

getProduct(plant_id)
  .then(populateFormWithProduct);

function populateFormWithProduct(plant) {
  document.querySelector('#name').value = plant.title;
  document.querySelector('#description').value = plant.description;
  document.querySelector('#image').value = plant.image;
}

form.addEventListener('submit', formSubmitted);

function formSubmitted(event) {
  event.preventDefault();

  const product = validateFormGetProduct(form, errorMessage, updateProduct);
  if(plant) {
    updateProduct(plant)
      .then(() => {
        window.location = '/plant.html?id=' + plant_id;
      });
  }
}

function updatePlant(plant) {
  return fetch(`${API_URL}/${plant_id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(plant)
  }).then(res => res.json());
}
