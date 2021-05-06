const searchParams = new URLSearchParams(window.location.search);  
const productId = searchParams.get("products");

fetch("https://silfen-9520.restdb.io/rest/products/"+productId, {
        "method": "GET",
        "headers": {
          "x-apikey": "608278cf28bf9b609975a5b3"
        }
      })
    .then((res) => res.json())
    .then((response) => {
      showProducts(response);
    })
    .catch((err) => {
      console.error(err);
    });
    
/*DISPLAY PRODUCT*/ 

function showProducts(product) {
    console.log("hello");
  document.querySelector(".name").textContent = product.name;
  document.querySelector(".collection").textContent = product.collection;
  document.querySelector(".description").textContent = product.description;
  document.querySelector(".OPrice span").textContent = product.price;
  document.querySelector(".NewPrice span").textContent = product.newprice;
  document.querySelector("title").textContent = product.name + " " + product.category;

/* SELECT COLOR AND CHANGE TO MATCHING IMAGE*/
/* IMG-URL EXAMPLE: https://annadalsgaard.dk/img/aquamarine_IDA_FRONT.jpg */

document.querySelector(".productImage").src =
  "https://annadalsgaard.dk/img/" +
  product.color[0] +
  product.basename;
product.color.forEach((color) => {
  console.log(color);
  const div = document.createElement("div");
  div.style.background = color;
  div.addEventListener("click", () => {
    console.log(color);
    document.querySelector(".productImage").src ="https://annadalsgaard.dk/img/" +
    color +
    product.basename;
  });
  document.querySelector(".colorpicker").appendChild(div);
});
}

/* DISPLAY RELATED PRODUCTS/ 4 PRODUCTS THAT ARE DIFFERENT FROM THE DISPLAYED PRODUCT... */

/* Here is a more readable version of whats below... it dosent't work with out the "%"" though...
"https://silfen-9520.restdb.io/rest/products?q={"_id" : {"$nin" : [" + productId, + "]}}&max=4"*/

/* "https://silfen-9520.restdb.io/rest/products?q={"_id":{"$not":"" + productId + ""}}&max=4"  */

const otherProducts = "https://silfen-9520.restdb.io/rest/products?q={%22_id%22:{%22$not%22:%22"+productId+"%22}}&max=4";
const options = {
  headers: {
    "x-apikey": "608278cf28bf9b609975a5b3",
  }
};

 fetch(otherProducts,options)
 .then((response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
})

.then((data) => {
  showRelatedProducts(data);
})
.catch((e) => {
  console.error("An error occured:", e.message);
});


function showRelatedProducts(relatedProducts) {
  relatedProducts.forEach((product) => {
    const template = document.querySelector(".otherProductsTem").content;
    const copy = template.cloneNode(true);
    copy.querySelector(".name").textContent = product.name;
    copy.querySelector(".productImage").src = product.imgurl1;
    copy.querySelector(".productImage").alt = product.name + " " + "color";
    copy.querySelector(".collection").textContent = product.collection;
    product.color.forEach((color) => {
      const div = document.createElement("div");
    div.style.background = color;
    div.addEventListener("click", function() {
      //Messy way of adding the picture matching the clicked color to the right place
      var relatedImg = this.parentNode.previousElementSibling.firstElementChild;
   relatedImg.src ="https://annadalsgaard.dk/img/" +
      color + product.basename});
    copy.querySelector(".colorpicker2").appendChild(div); 
  })
    copy.querySelector(".OPrice span").textContent = product.price;
    copy.querySelector(".NewPrice span").textContent = product.newprice;
    copy.querySelector("button").dataset.id += product._id;
    copy.querySelector(".viewProduct").href = `productview.html?products=${product._id}`;
    document.querySelector(".otherProducts").appendChild(copy);

  })}

