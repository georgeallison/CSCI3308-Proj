const errorMessage = document.querySelector('#errorMessage');
const form = document.querySelector('form');

errorMessage.style.display = 'none';

form.addEventListener('submit', formSubmitted);

function formSubmitted(event) {
  event.preventDefault();

  const product = validateFormGetProduct(form, errorMessage);

  if(product) {
    createPlant(plant)
      .then(result => {
        window.location = '/plant.html?id=' + result.id;
      });
  }
}

function createProduct(product) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(plant)
  }).then(res => res.json());
}
