const accesskey = "FGTiQQCGT0e4IkIDUTGdjtMagiyOsl7dT79T5msHRZg";

const formEl = document.querySelector("form");
const inputID = document.getElementById("search-input");
const resultCards = document.querySelector(".result__cards");
const showmore = document.getElementById("more");

let inputData = "";
let page = 1;

async function searchTopic() {
    inputData = inputID.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1) {
        resultCards.innerHTML = "";
    }

    results.forEach((result) => { // Changed .map() to .forEach()
        const imagewrapper = document.createElement("div");
        imagewrapper.classList.add("result__card");

        const image = document.createElement("img");
        image.src = result.urls.small; // Changed result.url.small to result.urls.small
        image.alt = result.alt_description;

        const anc = document.createElement("a");
        anc.href = result.links.html; // Changed result.link.html to result.links.html
        anc.target = "_blank";
        anc.textContent = result.alt_description;

        imagewrapper.appendChild(image);
        imagewrapper.appendChild(anc);
        resultCards.appendChild(imagewrapper);
    });
    page++;

    if (page > 1) {
        showmore.style.display = "block";
    }
    inputID.value = "";
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchTopic();
});

showmore.addEventListener("click", () => {
    searchTopic();

});
