const kategoriya = document.getElementById("kategoriya");
const saralash = document.getElementById("saralash");
const search = document.getElementById("search");
let things;


fetch('https://fakestoreapi.com/products')
    .then((response) => response.json())
    .then((json) => {
        things = json;
        productsView(json);
    });


function productsView(product) {
    const cardsContainer = document.getElementById('cards');
    cardsContainer.innerHTML = '';
    product.forEach((e) => {
        const card = document.createElement('div');
        card.className = 'ota-box';
        card.innerHTML = `
            <img src="${e.image}" alt="${e.title}">
            <h3>${e.title}</h3>
            <h4>Kategoriya: ${e.category}</h4>
            <p>Narxi: ${e.price}</p>
        `;
        cardsContainer.appendChild(card);
    });
}


search.addEventListener("input", () => {
    const searchResult = things.filter((e) =>
        e.title.toLowerCase().includes(search.value.toLowerCase().trim())
    );
    productsView(searchResult);
});


kategoriya.addEventListener("change", () => {
    if (kategoriya.value === "Barcha Kategoriyalar") {
        productsView(things); 
    } else {
        const filtered = things.filter((e) =>
            e.category.toLowerCase().includes(kategoriya.value.toLowerCase())
        );
        productsView(filtered); 
    }
});

saralash.addEventListener("change", () => {
    let sorted = [];
    if (saralash.value === "O'sish tartibida") {
        sorted = [...things].sort((a, b) => a.price - b.price);
    } else if (saralash.value === "Kamayish tartibida") {
        sorted = [...things].sort((a, b) => b.price - a.price);
    } else {
        sorted = things; 
    }
    productsView(sorted);
});