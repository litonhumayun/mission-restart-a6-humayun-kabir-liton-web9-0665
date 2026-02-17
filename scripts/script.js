/*Urls to be fetched*/

const productsURL = "https://fakestoreapi.com/products";
const categoriesURL = "https://fakestoreapi.com/products/categories";
const CategoryURL = "https://fakestoreapi.com/products/category/${category}";
const productDetailURL = "https://fakestoreapi.com/products/${id}";

// const loadTrendingProducts = async () => {
//   const res = await fetch(productsURL);
//   const products = await res.json();
//   console.log(products);
// };
const updateCart = () => {
  const cartElement = document.getElementById("cart-count");
  console.log(cartElement);
  const cartCount = JSON.parse(localStorage.getItem("cart")) || 0;
  cartElement.textContent = cartCount;
};
const addToCart = (id) => {
  let currentCart = JSON.parse(localStorage.getItem("cart")) || 0;
  currentCart++;
  console.log(currentCart);
  localStorage.setItem("cart", JSON.stringify(currentCart));
  updateCart();
};
const loadTrendingProducts = () => {
  fetch(productsURL)
    .then((res) => res.json())
    .then((products) => {
      const sortedProducts = products.toSorted(
        (a, b) => b.rating.rate - a.rating.rate,
      );
      const top3Products = sortedProducts.slice(0, 3);
      // console.log(top3Products);
      // console.log(sortedProducts);

      const container = document.getElementById("trending-products");
      container.innerHTML = "";
      top3Products.forEach((product) => {
        console.log(product);
        const card = document.createElement("div");
        card.className = "card bg-base-100 w-96 shadow-sm";
        card.innerHTML = `            <figure>
              <img
                src=${product.image}
                alt="Shoes"
              />
            </figure>
            <div class="card-body">
              <div class="flex justify-between">
                <h2 class="card-title">${product.category}</h2>
                <div class="badge badge-secondary"> <span><i class="fa-solid fa-star"></i></span>${product.rating.rate} (${product.rating.count})</div>
              </div>
              <p>
                ${product.title}
              </p>
              <p>
                ${product.price}
              </p>
              <div class="card-actions justify-between">
                <button
                  class="badge badge-outline btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl"
                >
                  <i class="fa-regular fa-eye"></i> Details
                </button>
                <button onclick="addToCart(${product.id})"
                  class="badge badge-outline btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl"
                >
                  <i
                    class="fa-solid fa-cart-arrow-down text-2xl text-black"
                  ></i>
                  Add
                </button>
              </div>
            </div>`;
        container.appendChild(card);

        // console.log(product);
        // console.log(card);
      });
      console.log(container);
    });
};

loadTrendingProducts();
updateCart();
