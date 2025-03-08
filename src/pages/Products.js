import React, { useEffect, useState } from "react";
import { getProducts } from "../api";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-center mb-6">Product Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-lg p-4">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md" />
            <h3 className="text-xl font-semibold mt-2">{product.name}</h3>
            <p className="text-gray-700 mt-1">{product.category}</p>
            <p className="text-blue-600 font-bold mt-1">${product.price}</p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
