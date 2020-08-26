const dishTemplate = document.querySelector('#dish').content;

const dishClone = dishTemplate.cloneNode(true);

dishClone.querySelector("h1").textContent = "Omelette";

const dishParent = document.querySelector("main");

dishParent.appendChild(dishClone);