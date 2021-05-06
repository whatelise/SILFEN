window.addEventListener("load", hideCart);

function hideCart() {
  console.log("hideCart()");
  document.querySelector("#cart").classList.add("hidden");
  document.querySelector(".cart-icon").addEventListener("click", showCart);
}

function showCart() {
  console.log("showCart()");
  this.removeEventListener("click", showCart);
  document.querySelector("#cart").classList.remove("hidden");
  document.querySelector(".cart-icon").addEventListener("click", hideCart);
}

const CART = {
  KEY: "basket",
  contents: [],
  init() {
    let _contents = localStorage.getItem(CART.KEY);
    if (_contents) {
      CART.contents = JSON.parse(_contents);
    } else {
      //   CART.contents = [
      //     { _id: "3", img: "none", qty: 3, name: "Cookies", price: 500 },
      //     { _id: "5", img: "none", qty: 5, name: "kowabunga", price: 600 },
      //   ];
    }
    CART.sync();
  },
  sync() {
    let _cart = JSON.stringify(CART.contents);
    localStorage.setItem(CART.KEY, _cart);
    CART.updateDOM();
  },
  updateDOM() {
    const cartcontentEl = document.querySelector(".cart-content");
    cartcontentEl.innerHTML = "";

    if (CART.contents.length === 0) {
      cartcontentEl.innerHTML = "<h4> THE CART IS EMPTY</h4>";
    } else {
      CART.contents.forEach((element) => {
        console.log(element);

        const tempItem = document.querySelector(".cart-item-template").content;
        const itemCopy = tempItem.cloneNode(true);

        const id = element._id;
        const labelEl = itemCopy.querySelector(".label");
        labelEl.textContent = element.name;
        labelEl.setAttribute("for", "fid-" + id);

        const minusBtn = itemCopy.querySelector(".minus");
        minusBtn.addEventListener("click", () => {
          CART.minusOne(id);
        });

        const plusBtn = itemCopy.querySelector(".plus");
        plusBtn.addEventListener("click", () => {
          CART.plusOne(id);
        });

        const inputEl = itemCopy.querySelector("input");
        inputEl.id += id;
        inputEl.name += id;
        inputEl.value = element.qty;

        inputEl.addEventListener("change", () => {
          const itemQty = inputEl.valueAsNumber;
          element.qty = itemQty;
          console.log("element");
          console.log(element.qty);
          CART.update(element);
        });
        inputEl.addEventListener("focus", (e) => {
          e.target.select();
        });
        const priceEL = itemCopy.querySelector(".price-each span");
        priceEL.textContent = element.price;

        const collectionEl = itemCopy.querySelector(".label2");
        collectionEl.textContent = element.collection;

        cartcontentEl.appendChild(itemCopy);
      });
    }
  },
  add(obj) {
    const index = CART.contents.findIndex((element) => element._id == obj._id);
    if (index == -1) {
      console.log(obj);
      obj.qty = 1;
      console.log(CART.contents);
      CART.contents.push(obj);
    } else {
      CART.contents[index].qty += 1;
    }
    this.sync();
  },
  update(obj) {
    const index = CART.contents.findIndex((element) => element._id == obj._id);
    if (obj.qty === 0) {
      CART.contents.splice(index, 1);
    } else {
      CART.contents[index].qty = obj.qty;
    }

    // const inputEl = document.querySelector("#fid-" + obj._id);
    // CART.contents[index].qty = inputEl.valueAsNumber;

    CART.sync();
  },

  minusOne(id) {
    const indexObj = CART.contents.find((element) => element._id == id);
    indexObj.qty--;
    console.log(indexObj);
    CART.update(indexObj);
  },
  plusOne(id) {
    const indexObj = CART.contents.find((element) => element._id == id);
    indexObj.qty++;
    CART.update(indexObj);
  },
};

CART.init();
