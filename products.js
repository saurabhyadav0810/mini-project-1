let param = new URLSearchParams(window.location.search);
let productId = param.get("id");
console.log("Product ID is:", productId);
console.log(param);


fetch(`https://dummyjson.com/products/${productId}`)
.then(res=> res.json())
.then(product => {
     console.log("Product details:", product);
     document.getElementById("title").innerText = product.title; 
     document.getElementById("thumbnail").src = product.thumbnail;
     document.getElementById("price").innerText = `₹ ${product.price}`;
     document.getElementById("description").innerText = product.description;
     document.getElementById("avalilability").innerText = product.availabilityStatus;
    
    let details = document.getElementById("details");
    details.innerHTML = `
    <li><b>Brand:</b> ${product.brand}</li>
    <li><b>Category:</b> ${product.category}</li>
    <li><b>Rating:</b> ${product.rating}</li>
    <li><b>Stock:</b> ${product.stock}</li>
    <li><b>Discount: </b>${product.discountPercentage}</li>
    <li><b>SKU:</b> ${product.sku}</li>
    <li><b>Weight: </b> ${product.weight}</li>
    <li><b>Warranty: </b>${product.warrantyInformation}</li>
    <li><b>Return Policy: </b>${product.returnPolicy}</li>
    <li><b>Shipping: </b>${product.shippingInformation}</li>
    <li><b>Minimum Order: </b>${product.minimumOrderQuantity}</li>`;

   let tagsDiv  = document.getElementById("tags");
    tagsDiv.innerHTML= "";
    product.tags.forEach(tag=>{
        let span = document.createElement("span");
        span.className="tag";
        span.innerText=tag;
        tagsDiv.appendChild(span);
    });
})

