// fetch

fetch("http://kea-alt-del.dk/t5/api/productlist")
    .then(res => res.json())
    .then(data => fml(data));

function fml(dishes) { // call a foreach function for each fetched element
    dishes.forEach(addDish);
    console.log(dishes.id);
}

// const declaration

const base = "https://kea-alt-del.dk/t5/site/imgs/";
let ol = 0;


// functions


function addDish(dish) {  // adds the dishes (dish)
    const myTemplate = document.querySelector("#dish").content;
    const cloneDish = myTemplate.cloneNode(true);
    cloneDish.querySelector(".pic").id=dish.id;
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
        cloneDish.querySelector(".newPrice").textContent = dish.price - (dish.price * dish.discount / 100) + " kr";
        cloneDish.querySelector(".newPrice").textContent = cloneDish.querySelector(".newPrice").textContent.replace(".", ",");
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
}


function openCloseOverlay(_id) {
    console.log(_id);
    const list = document.getElementById("allergens");
    const entry = document.createElement("li");
    if(!ol) {
        document.querySelector("#olBtn").style.display = "none";
        document.querySelector(".overlay").style.display = "block";
        ol++;
        let c = 0;
        fetch("https://kea-alt-del.dk/t5/api/product?id=" + _id)
            .then(res => res.json())
            .then(data => fml2(data))
        function fml2(selDish) {
            document.querySelector("#olBtn").style.display = "block";
            document.querySelector(".olPic").src = base + "medium/" + selDish.image + "-md.jpg";
            document.querySelector(".olName").textContent = selDish.name;
            document.querySelector(".longDesc").textContent = selDish.longdescription;
            document.querySelector(".priceOl").textContent = selDish.price + ",- kr";
            document.querySelector("#region>p").textContent = selDish.region;
            while(c < selDish.stars) {
                document.querySelector("#stars>p").textContent += "★";
                c++;
            }
            c=5;
            while(c > selDish.stars) {
                document.querySelector("#stars>p").textContent += "☆";
                c--;
            }
            if(selDish.alcohol)
                document.querySelector("#alcohol>p").textContent = "Yes";
            else
                document.querySelector("#alcohol>p").textContent = "No";
            if(selDish.vegetarian)
                document.querySelector("#vegetarian>p").textContent = "Yes";
            else
                document.querySelector("#vegetarian>p").textContent = "No";
            if(selDish.allergens == "") {
                entry.appendChild(document.createTextNode("None"));
                list.appendChild(entry);
            }
            else {
                selDish.allergens.forEach(putAl);
            }
            if(selDish.soldout)
            {
                document.querySelector(".priceOl").style.color = "rgba(0,0,0, 0.3)";
                document.querySelector(".priceOl").style.textDecoration = "none";
                document.querySelector("#olBtn").classList.remove("olBtn");
                document.querySelector("#olBtn").classList.add("olBtn2");
                document.querySelector(".newPriceOl").style.display = "none";
            }
            else if(selDish.discount)
            {
                document.querySelector("#olBtn").classList.remove("olBtn2");
                document.querySelector("#olBtn").classList.add("olBtn");
                document.querySelector(".priceOl").style.textDecoration = "line-through";
                document.querySelector(".priceOl").style.color = "rgba(0, 0, 0, 0.5)";
                document.querySelector(".newPriceOl").textContent = selDish.price - (selDish.price * selDish.discount / 100) + " kr";
                document.querySelector(".newPriceOl").textContent = document.querySelector(".newPriceOl").textContent.replace(".", ",");
                document.querySelector(".newPriceOl").style.display = "block";
            }
            else {
                document.querySelector("#olBtn").classList.remove("olBtn2");
                document.querySelector("#olBtn").classList.add("olBtn");
                document.querySelector(".priceOl").style.textDecoration = "none";
                document.querySelector(".priceOl").style.color = "black";
                document.querySelector(".newPriceOl").style.display = "none";
            }
            console.log(_id);
        }
        function putAl(allergen) {
            entry.appendChild(document.createTextNode("-" + allergen));
            list.appendChild(entry);
        }
    }
    else {
        document.querySelector(".overlay").style.display = "none";
        ol--;
        while(document.querySelector("#allergens>li")) {
            document.querySelector("#allergens>li").remove();
        }
        document.querySelector("#alcohol>p").textContent = "";
        document.querySelector("#stars>p").textContent = "";
        document.querySelector("#vegetarian>p").textContent = "";
        document.querySelector(".olName").textContent = "";
        document.querySelector(".longDesc").textContent = "";
        document.querySelector(".olPic").src = "";
        document.querySelector(".priceOl").textContent = "";
        document.querySelector(".newPriceOl").textContent = "";
    }
}

