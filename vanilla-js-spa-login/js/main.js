
// ========== GLOBAL VARIABLES ==========

const _baseUrl = "https://api.jsonbin.io/v3/b/615587879548541c29bb374a";
const _headers = {
  "X-Master-Key": "$2b$10$Upc1jVUlFP59rVyNzr6jV.kI/yU4Ebjnyg1y5mY4NeMMA/i5vaHy6",
  "Content-Type": "application/json"
};

let _users =[];
let _selectedUser={};


// ========== READ ==========

/**
 * Fetchs person data from jsonbin
 */
async function loadUsers() {
  const url = _baseUrl + "/latest"; // make sure to get the latest version
  const response = await fetch(url, { headers: _headers });
  const data = await response.json();
  console.log(data);
  _users = data.record;
  appendUsers(_users);
  
}

loadUsers();

function appendUsers(users) {
  let html = "";

  for (const user of users) {
      html +=`
      <article>
      <img src="${user.img}"></img>
      <h2>${user.titel}</h2>
      <p>${user.description}</p>
      <p>${user.id}</p>
      <button type="button" name="button" onclick="deleteUser(${user.id})">Delete</button>

      <button type="button" name="button" onclick="update(${user.id})">Edit</button>

      </article>
    
      `;
  }

  document.querySelector('#users-container').innerHTML = html;
}









function addPerson() {
    let imageInput = document.getElementById("img").value;
    let nameInput = document.getElementById("name").value;
    let emailInput = document.getElementById("vægt").value;
    let courseInput = document.getElementById("alder").value;
    let enrollmentTypeInput = document.getElementById("enrollmentType").value;

    if (imageInput && nameInput && emailInput && courseInput && enrollmentTypeInput) {
        let newPerson = {
            avatarUrl: imageInput,
            id: Date.now(),
            name: nameInput,
            email: emailInput,
            course: courseInput,
            enrollmentType: enrollmentTypeInput,
        }  

        _persons.push(newPerson);
        appendPersons(_persons);
        navigateTo("home");
    } else {
        alert("Indtast alle felter");
    }    
}
