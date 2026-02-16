/*Urls to be fetched*/

const productsURL = "https://fakestoreapi.com/products";
const categoriesURL = "https://fakestoreapi.com/products/categories";
const CategoryURL = "https://fakestoreapi.com/products/category/${category}";
const productDetailURL = "https://fakestoreapi.com/products/${id}";

const products = fetch(productsURL)
  .then((res) => res.json())
  .then((data) => console.log(data));

console.log(products);
