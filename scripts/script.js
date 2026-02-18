/* API URLs Section */
const productsURL = "https://fakestoreapi.com/products";
const productDetailURL = (id) => `https://fakestoreapi.com/products/${id}`;
const categoriesURL = "https://fakestoreapi.com/products/categories";
const categoryProductsURL = (category) =>
  `https://fakestoreapi.com/products/category/${category}`;

/* Cart Page Section */
const updateCart = () => {
  const cartElement = document.getElementById("cart-count");
  if (!cartElement) return; // safety
  const cartCount = JSON.parse(localStorage.getItem("cart")) || 0;
  cartElement.textContent = cartCount;
};

const addToCart = (id) => {
  let currentCart = JSON.parse(localStorage.getItem("cart")) || 0;
  currentCart++;
  localStorage.setItem("cart", JSON.stringify(currentCart));
  updateCart();
};

/* Modal of the product details  */
const showDetails = (id) => {
  const modal = document.getElementById("product-modal");
  const modalContent = document.getElementById("modal-content");
  if (!modal || !modalContent) return;

  fetch(productDetailURL(id))
    .then((res) => res.json())
    .then((product) => {
      modalContent.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6 ">
          <div class="flex justify-center items-center ">
            <img src="${product.image}" alt="${product.title}" class="max-h-80 object-contain"/>
          </div>
          <div>
            <h2 class="text-2xl font-bold mb-2">${product.title}</h2>
            <p class="text-gray-500 mb-2">Category: ${product.category}</p>
            <div class="badge badge-secondary mb-3">
              ⭐ ${product.rating.rate} (${product.rating.count} reviews)
            </div>
            <p class="mb-4">${product.description}</p>
            <h3 class="text-xl font-semibold mb-4">Price: $${product.price}</h3>
            <button onclick="addToCart(${product.id})" class="btn btn-primary">Add to Cart</button>
          </div>
        </div>
      `;
      modal.showModal();
    });
};

/* Trending products in homepage */
const loadTrendingProducts = () => {
  const container = document.getElementById("trending-products");
  if (!container) return;

  fetch(productsURL)
    .then((res) => res.json())
    .then((products) => {
      const sortedProducts = [...products].sort(
        (a, b) => b.rating.rate - a.rating.rate,
      );
      const top3Products = sortedProducts.slice(0, 3);

      container.innerHTML = "";
      top3Products.forEach((product) => {
        const card = document.createElement("div");
        card.className =
          "card bg-base-100 w-auto shadow-sm border border-gray-400 p-4 mx-4";
        card.innerHTML = `
          <figure><img class="h-48 object-contain" src="${product.image}" alt="${product.title}" /></figure>
          <div class="card-body">
            <div class="flex justify-between">
              <h2 class="card-title">${product.category}</h2>
              <div class="badge badge-secondary">⭐ ${product.rating.rate} (${product.rating.count})</div>
            </div>
            <p>${product.title}</p>
            <p>$${product.price}</p>
            <div class="card-actions justify-between">
              <button onclick="showDetails(${product.id})" class="btn btn-sm badge badge-outline">Details</button>
              <button onclick="addToCart(${product.id})" class="btn btn-sm badge badge-outline bg-green-500"><i class="fa-solid fa-cart-shopping"></i>Add</button>
            </div>
          </div>
        `;
        container.appendChild(card);
      });
    });
};

/* products page javascipt */

/* categories buttons */
const loadCategoriesForProductPage = () => {
  const container = document.getElementById("category-container");
  if (!container) return;

  fetch(categoriesURL)
    .then((res) => res.json())
    .then((categories) => {
      container.innerHTML = "";

      // All Products button
      const allButton = document.createElement("button");
      allButton.className = "btn btn-outline";
      allButton.innerText = "All Products";
      allButton.onclick = () => loadAllProductsForProductPage();
      container.appendChild(allButton);

      // Category buttons
      categories.forEach((category) => {
        const button = document.createElement("button");
        button.className = "btn btn-outline capitalize";
        button.innerText = category;
        button.onclick = () => loadProductsByCategoryForProductPage(category);
        container.appendChild(button);
      });
    });
};

/* Load all products */
const loadAllProductsForProductPage = () => {
  const container = document.getElementById("products-container");
  if (!container) return;

  fetch(productsURL)
    .then((res) => res.json())
    .then((products) => showAllProductsForProductPage(products));
};

/* Load products by category */
const loadProductsByCategoryForProductPage = (category) => {
  const container = document.getElementById("products-container");
  if (!container) return;

  fetch(categoryProductsURL(category))
    .then((res) => res.json())
    .then((products) => showAllProductsForProductPage(products));
};

/* Show products in container */
const showAllProductsForProductPage = (products) => {
  const container = document.getElementById("products-container");
  if (!container) return;

  container.innerHTML = "";
  products.forEach((product) => {
    const card = document.createElement("div");
    card.className =
      "card bg-base-100 w-full shadow-sm border border-gray-400 p-4";
    card.innerHTML = `
      <figure><img src="${product.image}" alt="${product.title}" class="max-h-80 object-contain"/></figure>
      <div class="card-body">
        <div class="flex justify-between">
          <h2 class="card-title">${product.category}</h2>
          <div class="badge badge-secondary">⭐ ${product.rating.rate} (${product.rating.count})</div>
        </div>
        <p>${product.title}</p>
        <p>$${product.price}</p>
        <div class="card-actions justify-between">
          <button onclick="showDetails(${product.id})" class="btn btn-sm badge badge-outline">Details</button>
          <button onclick="addToCart(${product.id})" class="btn btn-sm badge badge-outline bg-green-500"><i class="fa-solid fa-cart-shopping"></i>Add</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
};

/* conditions */
if (document.getElementById("trending-products")) {
  loadTrendingProducts();
}

if (document.getElementById("category-container")) {
  loadCategoriesForProductPage();
  loadAllProductsForProductPage();
}

if (document.getElementById("cart-count")) {
  updateCart();
}
