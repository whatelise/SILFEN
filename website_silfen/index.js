const url =
  'https://silfen-9520.restdb.io/rest/products?q={"bestseller": true}&max=3';

function getData() {
  fetch(url, {
    method: "GET",
    headers: {
      "x-apikey": "608278cf28bf9b609975a5b3",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      showMostWanted(response);
      //   console.log(response);
    })
    .catch((err) => {
      console.error(err);
    });
}

getData();

function showMostWanted(products) {
  console.log(products);
  products.forEach((product) => {
    const template = document.querySelector(".mwtemplate").content;
    const copy = template.cloneNode(true);
    copy.querySelector(".name").textContent = product.name;
    copy.querySelector(".productImage").src = product.imgurl1;
    copy.querySelector(".collection").textContent = product.collection;
    copy.querySelector(".colours").textContent = product.color;
    copy.querySelector(".OPrice span").textContent = product.price;
    copy.querySelector(".NewPrice span").textContent = product.newprice;
    copy.querySelector("button").dataset.id += product._id;
    copy.querySelector(
      ".viewProduct"
    ).href = `productview.html?products=${product._id}`;
    document.querySelector(".mwbag").appendChild(copy);
  });
}
