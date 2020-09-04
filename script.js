// fetch

fetch("http://kea-alt-del.dk/t5/api/productlist")
    .then(res => res.json())
    .then(data => fml(data));

function fml(dishes) {
    dishes.forEach(addDish);
    console.log(dishes.id);
}

// const declaration

const base = "https://kea-alt-del.dk/t5/site/imgs/";
let ol = 0;


// functions


function addDish(dish) {  // adds the dishes (dish)
    const myTemplate = document.querySelector("#dish").content;
    const artTemplate = document.querySelector("#olTempl").content;
    const cloneDish = myTemplate.cloneNode(true);
    const cloneArt = artTemplate.cloneNode(true);
    cloneDish.querySelector(".pic").id=dish.id;
    cloneArt.querySelector("#overlay").id += dish.id;
    cloneArt.querySelector(".olPic").src = base + "medium/" + dish.image + "-md.jpg";
    cloneArt.querySelector(".closeBtn").id = dish.id;
    cloneDish.querySelector(".name").textContent = dish.name;
    cloneDish.querySelector(".pic").src = base + "small/" + dish.image + "-sm.jpg";
    cloneDish.querySelector(".price").textContent = dish.price + ",- kr";
    if(dish.soldout)
    {
        cloneDish.querySelector("#soldOutText").style.display = "block";
        cloneDish.querySelector(".price").style.color = "rgba(0,0,0, 0.3)";
        cloneDish.querySelector(".pic").style.filter = "grayscale(100%)";
        cloneDish.querySelector(".Btn").style.backgroundColor = "gray";
        cloneDish.querySelector(".Btn").style.color = "white";
        cloneDish.querySelector(".Btn").style.cursor = "initial";
    }
    else if(dish.discount)
    {
        cloneDish.querySelector(".price").style.textDecoration = "line-through";
        cloneDish.querySelector(".price").style.color = "rgba(0, 0, 0, 0.5)";
        cloneDish.querySelector(".newPrice").textContent = dish.price - (dish.price * dish.discount / 100) + ",- kr";
    }
    else {
        cloneDish.querySelector(".newPrice").style.display = "none";
    }
    cloneDish.querySelector(".shortDesc").textContent = dish.shortdescription;
    const parentDishStarter = document.querySelector("section#starter");
    const parentDishMain = document.querySelector("section#main");
    const parentDishDessert = document.querySelector("section#dessert");
    const parentDishDrinks = document.querySelector("section#drinks");
    const parentDishSideorders = document.querySelector("section#sideorders");
    const parentOverlay = document.querySelector("body");
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
    

    //overlay
    parentOverlay.appendChild(cloneArt);
}


function openCloseOverlay(_id) {
    console.log(_id);
    
    if(!ol) {
        document.getElementById("overlay" + _id).style.display = "block";
        ol++;
    }
    else {
        document.getElementById("overlay" + _id).style.display = "none";
        ol--;
    }
}

