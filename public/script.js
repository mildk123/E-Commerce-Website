var database = firebase.database();
var body = document.getElementById("placehere");


// ServiceWorker is a progressive technology. Ignore unsupported browsers
//  if ('serviceWorker' in navigator) {
//    console.log('SERVICE WORKER: Service Worker supported by browser .');
//    navigator.serviceWorker.register('sw.js').then(function() {
//      console.log('SERVICE WORKER: Service worker registered.');
//    }, function(err) {
//      console.log('Service Worker: Service Worker registration failed.', err);
//    });
//  } else {
//    console.log('Service Worker: Service Worker not supported by browser.');
//  }


$("figure").on('click', function(){
  addToCart(this);
})
$("#cart-logo").on('click', function(){
  dataGet();
})



// Shopping Cart
function addToCart(itemToAdd) {
  debugger;
  let itemImg = itemToAdd.childNodes[1].src;
  let itemName = itemToAdd.childNodes[5].childNodes[1].innerHTML;
  let itemDesc = itemToAdd.childNodes[5].childNodes[3].innerHTML;
  let itemPrice = itemToAdd.childNodes[5].childNodes[5].innerHTML;

  // Pushing To DATABASE
  var newDataSet = firebase.database().ref("CartItems").push();
  newDataSet.set({
    adImage: itemImg,
    adName: itemName,
    adDesc: itemDesc,
    adPrice: itemPrice
  });
}




function dataGet() {
  // Getting Data From Database
  var dataPull = database.ref("CartItems");
  dataPull.on("child_added", function(data) {
    console.log(data.val());
    let dataRow = createRow(data.val(), data.key);

    body.innerHTML += dataRow;
  });
}

function createRow(data, key) {
  return `<li class="listContainer">
  <div class="container">
  <img src='${data.adImage}' class="img">
  <div class="itemData">
  <h3 class="Name">${data.adName}</h3>
  <button id="delBtn" class="btn btn-danger" onclick="deleteRow('${key}',this)">X</button>
  <p class="desc">${data.adDesc}</p>
  <p class="price">${data.adPrice}</p>
  </div>
</div>
<hr class="hr">
</li>`;
}

function deleteRow(key, row) {
  document.getElementById("placehere").removeChild(row.parentElement.parentElement.parentElement);
  var ref = database.ref("CartItems/" + key).set({});
}





// Creating A User

let user = {};
let fName;
let lName;
let userName;
let email;
let password;
let cPassword;

// Creating User's Account
function signup() {
  // From Validation

  fName = document.getElementById("fname").value;
  lName = document.getElementById("lname").value;
  userName = document.getElementById(`username`).value;
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;
  cPassword = document.getElementById(`cPassword`).value;

  if (
    fName == "" ||
    lName == "" ||
    email == "" ||
    userName == "" ||
    password == ""
  ) {
    // If Form is Empty!
    alert(`Please enter your details!`);
  } else if (cPassword != password) {
    // If Password Does Not Match!
    alert(`Passwords Does Not Match!`);
  } else {
    alert(`Account Created Successfully, You can login now.`);

    // Store
    sessionStorage.setItem("fName", `${fName}`);
    sessionStorage.setItem("lName", `${lName}`);
    sessionStorage.setItem("username", `${userName}`);
    sessionStorage.setItem("password", `${password}`);
    sessionStorage.setItem("cPassword", `${cPassword}`);
    location.pathname = ("/login.html");
  }
}

// Logging In User

function signIn() {
  let givenUser = sessionStorage.getItem("username");
  let givenPass = sessionStorage.getItem("password");
  let givenName =
    sessionStorage.getItem("fName") + " " + sessionStorage.getItem("lName");

  var loginUsername = document.getElementById(`loginUsername`).value;
  var loginPassword = document.getElementById(`loginPassword`).value;

  if (loginUsername == givenUser || loginPassword == givenPass) {
    alert(`Welcome ${givenName}, You Can now post an advertisment.`);
    sessionStorage.setItem("user", "yes");
    window.location.href("../index.html");
  } else alert(`Invalid Username or Password!`);
}

// Display Submit Ad button When User Logs In

if (sessionStorage.getItem("user") == "yes") {
  document.getElementById("submitBtn").style.display = "block";
}

// Submit An Advertisment

function divert() {
  var element;
  var adCategory = document.getElementById("adCategory").value;
  var adTitle = document.getElementById("adTitle").value;
  var imageSrc = "https://picsum.photos/400/490/?random";
  var textarea = document.getElementById("textarea").value;
  var phoneNo = document.getElementById("phoneNo").value;
  var money = document.getElementById("money").value;
  money = `${money}$`;

  // Store Data In Local Storage
  sessionStorage.setItem("adCategory", `${adCategory}`);
  sessionStorage.setItem("adTitle", `${adTitle}`);
  sessionStorage.setItem("imageSrc", `${imageSrc}`);
  sessionStorage.setItem("textarea", `${textarea}`);
  sessionStorage.setItem("phoneNo", `${phoneNo}`);
  sessionStorage.setItem("money", `${money}`);

  let adCategory1 = sessionStorage.getItem("adCategory");
  let adTitle1 = sessionStorage.getItem("adTitle");
  let imageSrc1 = sessionStorage.getItem("imageSrc");
  let textarea1 = sessionStorage.getItem("textarea");
  let phoneNo1 = sessionStorage.getItem("phoneNo");
  let money1 = sessionStorage.getItem("money");

  // Setting Category
  if (adCategory === "babyToys") {
    element = document.getElementById("babyList");
  } else if (adCategory === "sportsTravel") {
    element = document.getElementById("sportsList");
  } else if (adCategory === "homeLiving") {
    element = document.getElementById("homeList");
  } else if (adCategory === "mFashion") {
    element = document.getElementById("mFashionList");
  } else if (adCategory === "wFashion") {
    element = document.getElementById("wFashionList");
  } else if (adCategory === "hlthBeauty") {
    element = document.getElementById("healthList");
  } else if (adCategory === "grceris") {
    element = document.getElementById("groceriesList");
  } else if (adCategory === "computer") {
    element = document.getElementById("computersList");
  } else if (adCategory === "electronics") {
    element = document.getElementById("electronicsList");
  }

  // Upper Side
  // Image Setting Side
  var figure = document.createElement("figure");
  figure.setAttribute("class", "snip1418");

  var image = document.createElement("img");
  image.setAttribute("class", "img-src");
  image.setAttribute("src", `${imageSrc1}`);

  // setting Div
  var aDiv = document.createElement("div");
  aDiv.setAttribute("class", "add-to-cart");
  var italic = document.createElement("i");
  italic.setAttribute("class", "ion-android-bar");

  //  Setting Button
  var buttonToAdd = document.createElement("button");
  buttonToAdd.setAttribute("style", "background: none; border: none;");
  var b = document.createTextNode("Add To Cart");

  // Captioning

  var figCaption = document.createElement("figcaption");
  // Setting Title
  var title = document.createElement("h3");
  title.setAttribute("class", "product-name");
  var t = document.createTextNode(adTitle1);

  // Setting Description
  var description = document.createElement("p");
  description.setAttribute("class", "product-desc");
  var D = document.createTextNode(textarea1);

  // Setting Price
  var price = document.createElement("div");
  price.setAttribute("class", "price");
  var p = document.createTextNode(money1);

  title.appendChild(t);
  description.appendChild(D);
  price.appendChild(p);
  buttonToAdd.appendChild(b);
  aDiv.appendChild(italic);

  aDiv.appendChild(buttonToAdd);
  figCaption.appendChild(title);
  figCaption.appendChild(description);
  figCaption.appendChild(price);
  figure.appendChild(aDiv);

  figure.appendChild(image);
  figure.appendChild(figCaption);

  element.appendChild(figure);
  alert(`Your Ad Has Been Submitted, Scroll Down to see.`);

  // console.log(element);
}
