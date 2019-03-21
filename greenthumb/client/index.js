const plantsSection = document.querySelector('main section');//specifies section tag inside main tag

getUsers()
  .then(showUsers);

//for makeing AJAX requests against our API
function getUsers() {
  return fetch(API_URL)
    .then(res => res.json());
}

function showUsers(users) {
  products.forEach(user => {
  	//adding cards of users' plants
    const buttons = `<a href="/user.html?id=${user.id}" class="btn btn-primary">View your Plant</a>`;
    addProductToPage(user, 4, buttons, plantsSection);
  });
}
