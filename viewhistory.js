// Display viewed products
const historyGrid = document.getElementById("historyGrid");

function displayViewHistory() {
    const viewedProducts = JSON.parse(localStorage.getItem("viewedProducts")) || [];
    
    if(viewedProducts.length === 0) {
        historyGrid.innerHTML = "<div class='empty-message'>No products viewed yet. Start browsing now!</div>";
        return;
    }
    
    historyGrid.innerHTML = "";
    viewedProducts.forEach(product => {
        const card = document.createElement("div");
        card.className = "card";
        
        // Format the viewed time
        const viewedTime = new Date(product.viewedAt);
        const timeString = viewedTime.toLocaleDateString() + " " + viewedTime.toLocaleTimeString();
        
        card.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h4>${product.title}</h4>
            <p>₹ ${product.price}</p>
            <small style="color: #999; font-size: 12px;">Viewed: ${timeString}</small>
        `;
        
        card.addEventListener("click", () => {
            window.location.href = `products.html?id=${product.id}`;
        });
        
        historyGrid.appendChild(card);
    });
}


displayViewHistory();