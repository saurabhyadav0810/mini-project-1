
let currentPage = 1;
let itemsPerPage = 8;
let allproducts = [];

let container = document.getElementById("productList");
let prevbtn = document.getElementById("prevBtn");
let nextbtn = document.getElementById("nextBtn");
let pageInfo = document.getElementById("pageInfo");


fetch("https://dummyjson.com/products")
.then(res => res.json())
.then(data => {
    allproducts = data.products;
    // console.log("All products:", allproducts);
    if(allproducts.length ===0){
        container.innerHTML = "<p>No products found.</p>";
        prevbtn.disabled = true;
        nextbtn.disabled = true;
        pageInfo.innerText = "";
        return;
    }
    renderPage();
    
})
.catch(err => console.log(err));

function renderPage(){
    container.innerHTML="";
    let start = (currentPage - 1) * itemsPerPage;
    let end = start + itemsPerPage;
    let pageItems = allproducts.slice(start, end);
    // console.log("Page items:", pageItems);
    pageItems.forEach(product => {
        let card= document.createElement("div");
        card.className = "card";
        card.innerHTML = `
        <img src="${product.thumbnail}">
        <h4>${product.title}</h4>
        <p>₹ ${product.price}</p>
        `;
        card.addEventListener("click", () => {
            // console.log("Clicked on product:", product.id);
            window.location.href = `products.html?id=${product.id}`;
        });
        container.appendChild(card);

    });
    
    
    let totalPages = Math.ceil(allproducts.length / itemsPerPage);
    pageInfo.innerText = `Page ${currentPage} of ${totalPages}`;
    prevbtn.disabled = currentPage === 1;
    nextbtn.disabled = currentPage === totalPages;
    // console.log("Total pages:", totalPages);
}

prevbtn.addEventListener("click", () => {
    currentPage--;
    renderPage();
    window.scrollTo({top:0, behavior:"smooth"});
});

    nextbtn.addEventListener("click", () => {
        // let totalPages = Math.ceil(allproducts.length / itemsPerPage);
            currentPage++;
            renderPage();
            window.scrollTo({top:0, behavior:"smooth"});    
    });


const searchBtn = document.getElementById("searchbtn");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if(!query) return;
    // console.log("Searching for:", query);


    // to store search history in local storage
    let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    if(!history.includes(query)){
        history.push({
        query: query,
        time:Date.now()
    });
    localStorage.setItem("searchHistory", JSON.stringify(history));
    }
    // ................
    
    window.location.href =`search.html?q=${encodeURIComponent(query)}`; 
    searchInput.value = "";
});





const suggestionBox = document.getElementById("suggestions");

searchInput.addEventListener("input", () => {
    // console.log("Suggeestion working");
    const text= searchInput.value.toLowerCase();
    const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    const matches = history.filter(item => item.query.toLowerCase().includes(text));
    // console.log(history);
    suggestionBox.innerHTML = "";

    console.log(matches);
    matches.forEach(item => {
        const div = document.createElement("div");
        div.className = "suggestion-item";
        div.innerText = item.query;

        div.addEventListener("click", () => {
            searchInput.value = item.query;
            suggestionBox.innerHTML = "";
        });

        suggestionBox.appendChild(div);
    });
    });


const historyBtn = document.getElementById("historyList");
historyBtn.addEventListener("click", () => {
    window.location.href = "searchhistory.html";
});
const viewHistoryBtn = document.getElementById("viewhistory");
viewHistoryBtn.addEventListener("click", () => {
    window.location.href = "viewhistory.html";
});

