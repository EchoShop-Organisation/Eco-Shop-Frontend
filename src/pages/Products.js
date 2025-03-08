import React, { useEffect, useState } from "react";
import { getProducts } from "../api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
        setFilteredProducts(response.data);

        // Extract unique categories
        const uniqueCategories = [...new Set(response.data.map((p) => p.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Handle filtering
  useEffect(() => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (priceRange === "low") {
      filtered = filtered.filter((p) => p.price < 50);
    } else if (priceRange === "medium") {
      filtered = filtered.filter((p) => p.price >= 50 && p.price <= 200);
    } else if (priceRange === "high") {
      filtered = filtered.filter((p) => p.price > 200);
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, priceRange, products]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-center mb-6">Product Listings</h2>

      {/* Filters */}
      <div className="flex justify-center gap-4 mb-6">
        {/* Category Filter */}
        <select
          className="border p-2 rounded"
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        {/* Price Filter */}
        <select
          className="border p-2 rounded"
          onChange={(e) => setPriceRange(e.target.value)}
          value={priceRange}
        >
          <option value="">All Prices</option>
          <option value="low">Below $50</option>
          <option value="medium">$50 - $200</option>
          <option value="high">Above $200</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-lg p-4">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md" />
            <h3 className="text-xl font-semibold mt-2">{product.name}</h3>
            <p className="text-gray-700 mt-1">{product.category}</p>
            <p className="text-blue-600 font-bold mt-1">${product.price}</p>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300"
              onClick={() => window.location.href = `/product/${product.id}`}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
