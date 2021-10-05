
// ========== GLOBAL VARIABLES ==========

const _baseUrl = "https://api.jsonbin.io/v3/b/615ad9d39548541c29bd9089";
const _headers = {
  "X-Master-Key": "$2b$10$Upc1jVUlFP59rVyNzr6jV.kI/yU4Ebjnyg1y5mY4NeMMA/i5vaHy6",
  "Content-Type": "application/json"
};

let _users =[];
let _selectedUser={};
let _babys=[];



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
      <a href="${user.link}" class="ingenlink">
      <div class="card">
      <div class="container2">
      <img src="${user.img}" width="30%"></img> 
        <h4><b>${user.titel}</b></h4>
        <p>${user.description}</p>
      </div>
      </a>
    </div>
    
      `;
  }

  document.querySelector('#users-container').innerHTML = html;
}


function sendBaby() {
  let form = document.getElementById("opretForm")

  let navn = form.querySelector("#navn").value
  let alder = form.querySelector("#alder").value
  let vægt = form.querySelector("#vægt").value
 

  let baby = {
    navn: form.querySelector("#navn").value,
    alder: form.querySelector("#alder").value,
    vægt: form.querySelector("#vægt").value
  }

  saveBabyToLocalStorage(baby);
  appendBaby(baby)
}

function saveBabyToLocalStorage(babyObject) {
  const jsonBaby = JSON.stringify(babyObject);
  localStorage.setItem("baby", jsonBaby);
  console.log("Baby saved to localStorage")
}

function getBabyFromLocalStorage() {
  const jsonBaby = localStorage.getItem("baby");
  const babyObject = JSON.parse(jsonBaby);
  appendBaby(babyObject);
  return babyObject;
} 

getBabyFromLocalStorage();

function appendBaby(baby) {
  let container = document.getElementById("babyContainer")
  container.innerHTML = "" 
  
    container.innerHTML += /*html*/ `
    <div class="bleble">
    <img src="img/smiling-baby.jpg" alt="img" class="dinBaby"/>
      <div>${baby.navn}</div>
      <div>${baby.alder}</div>
      <div>${baby.vægt}</div>
    </div>
`  
  
  let container2 = document.getElementById("babyContainer2")
  container2.innerHTML = "" 
 
    container2.innerHTML += /*html*/ `
    <div></div>
      <div>${baby.navn}, ${baby.alder}</div>
    </div>
`   
}

// Ble function //


function sendBle() {
  let form = document.getElementById("lavForm")

  let overskrift = form.querySelector("#overskrift").value
  let emne = form.querySelector("#emne").value
  let tekst = form.querySelector("#tekst").value
 

  let ble = {
    overskrift: form.querySelector("#overskrift").value,
    emne: form.querySelector("#emne").value,
    tekst: form.querySelector("#tekst").value
  }

  saveBleToLocalStorage(ble);
  appendBle(ble)
}

function saveBleToLocalStorage(bleObject) {
  const jsonBle = JSON.stringify(bleObject);
  localStorage.setItem("ble", jsonBle);
  console.log("Ble saved to localStorage")
}

function getBleFromLocalStorage() {
  const jsonBle = localStorage.getItem("ble");
  const bleObject = JSON.parse(jsonBle);
  appendBle(bleObject);
  console.log(bleObject)
}

getBleFromLocalStorage();

function appendBle(ble) {
  let container = document.getElementById("bleContainer")
  container.innerHTML = "" 
  
    container.innerHTML += /*html*/ `
    <div class="bleble">
    <img src="img/logbog/ble.png" alt="img" class="dinBaby"/>
      <div>${ble.overskrift}</div>
      <div>${ble.emne}</div>
      <div>${ble.tekst}</div>
    </div>
` 
}

function showPage(path) {
  const userIsAuthenticated = localStorage.getItem("userIsAuthenticated"); // get from localstorage

  if (userIsAuthenticated) { // user user is authenticated: 
      showTabbar(true); // then show show tabbar
      setActiveTab(path); // and set active tab
  } else { // if user NOT authenticated: 
      path = "#/login"; // then change path to #/login,
      window.history.pushState({}, path, _basePath + path); // set pushState with new path
      showTabbar(false); // and hide the tabbar
  }

}


// show and hide tabbar
function showTabbar(show) {
  let tabbar = document.querySelector('.tabbar');
  if (show) {
      tabbar.classList.remove("hide");
  } else {
      tabbar.classList.add("hide");
  }
}