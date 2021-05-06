/* key are in urls right now - set as x-apikey in header */
/* https://s2021-8556.restdb.io/rest/testing?apikey=6034ed655ad3610fb5bb655d&q={}&filter= */
// document.querySelector(".searchicon").addEventListener("click", searchFunction);
window.addEventListener("load", addHidden);

function addHidden() {
  console.log("addHidden()");
  document.querySelector("#searchpage").classList.add("hidden");
  document.querySelector("#searchicon").addEventListener("click", removeHidden);
}

function removeHidden() {
  console.log("removeHidden()");
  this.removeEventListener("click", removeHidden);
  document.querySelector("#searchpage").classList.remove("hidden");
  document.querySelector("#searchicon").addEventListener("click", addHidden);
}

const forms = document.querySelector(".searchform");

console.log(forms.elements);
document.querySelector(".submit").addEventListener("click", submitSearch);

function submitSearch(e) {
  e.preventDefault();
  //alert(form.elements.query.value);
  const q = forms.elements.query.value;
  const url =
    'https://silfen-9520.restdb.io/rest/products?q={"collection": {"$regex" : "' +
    q +
    '"}}';

  console.log(url);
  document.querySelector("p").textContent += url;
  fetch(url, {
    method: "GET",
    headers: {
      "x-apikey": "608278cf28bf9b609975a5b3",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      show(response, q);
    })
    .catch((err) => {
      console.error(err);
    });
}

function show(matches, q) {
  const section = document.querySelector(".searchresults");
  section.innerHTML = "";
  matches.forEach((match) => {
    console.log(match);
    const template = document.querySelector(".templatesearch").content;
    const copy = template.cloneNode(true);

    const h2Content =
      match.name; /* match.username.replaceAll(
      q,
      '<span class="red">' + q + "</span>" 
    );*/
    const h3Content = match.price;
    console.log(h2Content);
    copy.querySelector("h2").innerHTML = h2Content;
    copy.querySelector("h3").innerHTML = h3Content;
    // copy.querySelector("h3").innerHTML = match.collection.replaceAll(
    //   q,
    //   '<span class="red">' + q + "</span>"
    // );
    section.appendChild(copy);
  });
}
