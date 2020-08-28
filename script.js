// fetch

fetch("http://kea-alt-del.dk/t5/api/productlist")
    .then(res => res.json())
    .then(data => console.log(data));