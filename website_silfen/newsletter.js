const form = document.querySelector(".nlForm");
console.log("selected");

form.addEventListener("submit", userSubmittet);
console.log(form)

function userSubmittet(evt) {
    evt.preventDefault();
    console.log(form.elements.email.value);
    console.log("form submitted")

const payload = {
    email: form.elements.email.value
};

document.querySelector("input[type=submit]").disabled = true;

fetch("https://silfen-9520.restdb.io/rest/newsletter", {
  method: "POST",
  headers: {
    "x-apikey": "608278cf28bf9b609975a5b3",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(payload),
}) 

.then(response => {
  console.log(response);
  document.querySelector("input[type=submit]").disabled = false;
  form.elements.email.value = "";
  document.querySelector("p.hidden").classList.remove("hidden");
  document.querySelector(".email").classList.add("hidden");
  document.querySelector(".submit-button").classList.add("hidden");
})

.catch(err => {
  console.error(err);
}); 
}
