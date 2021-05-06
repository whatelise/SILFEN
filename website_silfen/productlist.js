/*LOADER START */
/* document.onreadystatechange = function() {
  if (document.readyState !== "complete") {
    console.log("loading");
    document.querySelector("#loader").classList.add = "hidden";
    document.querySelector("main").classList.remove = "hidden";
  } else {
    console.log("finished loading");
      document.querySelector("#loader").classList.add = "hidden";
      document.querySelector("main").classList.remove = "hidden";
  }
}; */
/*LOADER END */

const urlParams = new URLSearchParams(window.location.search);
const collectionFromUrl = urlParams.get("collection");
const categoryFromUrl = urlParams.get("category");
const bestsellerFromUrl = urlParams.get("bestseller");
const newarrivalFromUrl = urlParams.get("newarrival");

let url = "https://silfen-9520.restdb.io/rest/products";

/*LOADER */

if (categoryFromUrl) {
  url =
    "https://silfen-9520.restdb.io/rest/products" +
    '?q={"category":"' +
    categoryFromUrl +
    '"}';
  console.log(url);
}
if (collectionFromUrl) {
  url =
    'https://silfen-9520.restdb.io/rest/products?q={"collection":"' +
    collectionFromUrl +
    '"}';
  console.log(url);
}
if (bestsellerFromUrl) {
  url = 'https://silfen-9520.restdb.io/rest/products?q={"bestseller": true}';
  console.log(url);
}
if (newarrivalFromUrl) {
  url = 'https://silfen-9520.restdb.io/rest/products?q={"newarrival": true}';
  console.log(url);
}

function getData() {
  fetch(url, {
    method: "GET",
    headers: {
      "x-apikey": "608278cf28bf9b609975a5b3",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      // /* START PRELOADER */

      // hideloader();
      // console.log(Response);
      // this.dt = Response;
      // this.dataDisplay = this.dt.data;
      // /* END PRELOADER */

      showProducts(response);
      //   console.log(response);
    })
    .catch((err) => {
      console.error(err);
    });
}

function hideloader() {
  console.log("hideloader");
  document.querySelector("#loader").classList.add("fadeout");
  document.querySelector(".loaderWrapper").classList.add("fadeout");
  document.querySelector.offsetHeight;
  document.querySelector("#loader").classList.add("hidden");
  document.querySelector(".loaderWrapper").classList.add("hidden");
  document.getElementById("myDiv").style.display = "block";
}

getData();

function showProducts(products) {
  products.forEach((product) => {
    const template = document.querySelector(".product").content;
    const copy = template.cloneNode(true);
    copy.querySelector(".name").textContent = product.name;
    copy.querySelector(".productImage").src = product.imgurl1;
    copy.querySelector(".productImage").alt = product.name + " " + "color";
    copy.querySelector(".collection").textContent = product.collection;
    product.color.forEach((color) => {
      const div = document.createElement("div");
      div.style.background = color;
      div.addEventListener("click", function () {
        //Messy way of adding the picture matching the clicked color to the right place
        var relatedImg = this.parentNode.previousElementSibling
          .firstElementChild;
        relatedImg.src =
          "https://annadalsgaard.dk/img/" + color + product.basename;
      });
      copy.querySelector(".colorpicker").appendChild(div);
    });
    copy.querySelector(".OPrice span").textContent = product.price;
    copy.querySelector(".NewPrice span").textContent = product.newprice;

    copy.querySelector(".shop-button").setAttribute("data-id", product._id);
    copy.querySelector(".shop-button").addEventListener("click", () => {
      CART.add(product);
    });

    copy.querySelector(
      ".viewProduct"
    ).href = `productview.html?products=${product._id}`;
    document.querySelector(".productList").appendChild(copy);
  });
}
