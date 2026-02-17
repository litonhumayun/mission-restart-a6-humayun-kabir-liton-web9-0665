const productsURL = "https://fakestoreapi.com/products";

const productDetailURL = (id) => `https://fakestoreapi.com/products/${id}`;

const updateCart = () => {
  const cartElement = document.getElementById("cart-count");
  const cartCount = JSON.parse(localStorage.getItem("cart")) || 0;
  cartElement.textContent = cartCount;
};

const addToCart = (id) => {
  let currentCart = JSON.parse(localStorage.getItem("cart")) || 0;
  currentCart++;
  localStorage.setItem("cart", JSON.stringify(currentCart));
  updateCart();
};
const loadAllProductsForProductPage = () => {
  fetch(productsURL)
    .then((res) => res.json())
    .then((products) => {
      console.log(products);
    });
};
loadAllProductsForProductPage();
const showDetails = (id) => {
  fetch(productDetailURL(id))
    .then((res) => res.json())
    .then((product) => {
      const modalContent = document.getElementById("modal-content");

      modalContent.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
          
          <div class="flex justify-center items-center">
            <img 
              src="${product.image}" 
              alt="${product.title}" 
              class="max-h-80 object-contain"
            />
          </div>

          <div>
            <h2 class="text-2xl font-bold mb-2">
              ${product.title}
            </h2>

            <p class="text-gray-500 mb-2">
              Category: ${product.category}
            </p>

            <div class="badge badge-secondary mb-3">
              ⭐ ${product.rating.rate} (${product.rating.count} reviews)
            </div>

            <p class="mb-4">
              ${product.description}
            </p>

            <h3 class="text-xl font-semibold mb-4">
              Price: $${product.price}
            </h3>

            <button 
              onclick="addToCart(${product.id})"
              class="btn btn-primary"
            >
              Add to Cart
            </button>
          </div>

        </div>
      `;

      document.getElementById("product-modal").showModal();
    });
};

const loadTrendingProducts = () => {
  fetch(productsURL)
    .then((res) => res.json())
    .then((products) => {
      const sortedProducts = [...products].sort(
        (a, b) => b.rating.rate - a.rating.rate,
      );

      const top3Products = sortedProducts.slice(0, 3);

      const container = document.getElementById("trending-products");
      container.innerHTML = "";

      top3Products.forEach((product) => {
        const card = document.createElement("div");
        card.className = "card bg-base-100 w-96 shadow-sm";

        card.innerHTML = `
          <figure>
            <img src="${product.image}" alt="${product.title}" />
          </figure>

          <div class="card-body">
            <div class="flex justify-between">
              <h2 class="card-title">${product.category}</h2>
              <div class="badge badge-secondary">
                ⭐ ${product.rating.rate} (${product.rating.count})
              </div>
            </div>

            <p>${product.title}</p>
            <p>$${product.price}</p>

            <div class="card-actions justify-between">
              <button 
                onclick="showDetails(${product.id})"
                class="btn btn-sm badge badge-outline"
              >
                Details
              </button>

              <button 
                onclick="addToCart(${product.id})"
                class="btn btn-sm badge badge-outline"
              >
                Add
              </button>
            </div>
          </div>
        `;

        container.appendChild(card);
      });
    });
};

if (document.getElementById("trending-products")) {
  loadTrendingProducts();
}
if (document.getElementById("cart-count")) {
  updateCart();
}
