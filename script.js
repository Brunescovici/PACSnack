
for(let i=0; i<5; i++) {
    const dishTemplate = document.querySelector('#dish').content;
    const dishClone = dishTemplate.cloneNode(true);
    const dishParent = document.querySelector("main");
    dishParent.appendChild(dishClone);
}