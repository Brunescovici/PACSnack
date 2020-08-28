// fetch

fetch("http://kea-alt-del.dk/t5/api/productlist")
    .then(res => res.json())
    .then(data => fml(data));

function fml(dishes) {
    dishes.forEach(addDish);
}

const base = "https://kea-alt-del.dk/t5/site/imgs/";

function addDish(dish) {
    const myTemplate = document.querySelector("#dish").content;
    const cloneDish = myTemplate.cloneNode(true);
    cloneDish.querySelector("#name").textContent = dish.name;
    const parentDishStarter = document.querySelector("section#starter");
    const parentDishMain = document.querySelector("section#main");
    const parentDishDessert = document.querySelector("section#dessert");
    const parentDishDrinks = document.querySelector("section#drinks");
    const parentDishSideorders = document.querySelector("section#sideorders");
    cloneDish.querySelector("#pic").src = base + "small/" + dish.image + "-sm.jpg";
    cloneDish.querySelector("#price").textContent = "Price: " + dish.price + ",- kr";
    if(dish.category == "starter")
        parentDishStarter.appendChild(cloneDish);
    else if(dish.category == "main")
        parentDishMain.appendChild(cloneDish);
    else if(dish.category == "dessert")
        parentDishDessert.appendChild(cloneDish);
    else if(dish.category == "drinks")
        parentDishDrinks.appendChild(cloneDish);
    else
        parentDishSideorders.appendChild(cloneDish);
    console.log(dish.ca)
}