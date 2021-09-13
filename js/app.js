
// This function will load data when page is running
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

//This function will show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const { rate, count } = product.rating
    const productDisplay = document.createElement("div");
    productDisplay.classList.add("product");
    productDisplay.innerHTML = `<div class="single-product">
      <div class= "img-section">
    <img class="product-image img-fluid" src=${image}></img>
      </div>
      <h4>${product.title.length < 30? product.title: product.title.slice(0, 25)}</h4>
      <p>Category: ${product.category}</p>
      <h4><span class="text-danger">Rating: ${rate}</span> || <span class="text-primary">Reviews: ${count}</span?</h4>
      <h4 class="text-danger">Price: $ ${product.price}</h4>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="add-cart">add to cart</button>
      <button onclick="itemDetails(${product.id})" class="detail-btn">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(productDisplay);
  }
};

// this function load single item details
const itemDetails = id => {
  const url = `https://fakestoreapi.com/products/${id}`
  fetch(url)
    .then(res => res.json())
    .then(data => showDetails(data))
}

// this  funcion will show details of an item
const showDetails = item => {
  document.getElementById('detailsItem').innerHTML = `
      <div class="card detailsCard">
      <div class="col-md-4 img-section">
        <img src="${item.image}" class="img-fluid product-image rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h3 class="card-title">${item.title}</h3>
          <h4 class="text-danger">Price: $ ${item.price}</h4>
          <p class="card-text">${item.description}</p>
          <button class="detail-btn" onclick="closeDetails()">Close</button></div>
        </div>
      </div>
    </div>
  `
}

// this function will close details from top
const closeDetails = () =>{
  document.getElementById('detailsItem').textContent = ''
}

let count = 0;

// this function will calculate & update cart data 
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal()
  document.getElementById("total-Products").innerText = count;
};

// this function will get the dom by id
const getInputValue = (id) => {
  const elementName = document.getElementById(id).innerText;
  const convertedElemen = parseFloat(elementName);
  return convertedElemen;
};

// this function will update the main price
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// this funnction will get the DOM set innerText by id
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

// this function will calculate grandTotal
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
