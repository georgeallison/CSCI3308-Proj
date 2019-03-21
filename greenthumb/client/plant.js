const plantSection = document.querySelector('main section');
const plant_id = getIdFromQuery();

getProduct(plant_id)
  .then(showPlant);

function showPlant(plant) {
  const buttons = `
    <a href="/edit.html?id=${plant.id}" class="btn btn-success">Edit Your Plant</a>
    <button id="deleteButton" class="btn btn-danger">Delete This Plant</button>
  `;
  addProductToPage(product, 12, buttons, productSection);

  const deleteButton = document.querySelector('#deleteButton');
  deleteButton.addEventListener('click', () => {
    deleteProduct(product_id)
      .then(() => {
        window.location = '/';
      });
  });
}

function deletePlant(id) {
  return fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  }).then(res => res.json());
}
