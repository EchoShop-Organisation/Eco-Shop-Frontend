import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../AuthContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useContext(AuthContext); // Access addToCart from Context
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/products/${id}/`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p className="text-center">Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <img src={product.image} alt={product.name} className="w-full h-80 object-cover rounded-md" />
        <h2 className="text-3xl font-bold mt-4">{product.name}</h2>
        <p className="text-gray-700 mt-2">{product.description}</p>
        <p className="text-blue-600 font-bold text-2xl mt-2">${product.price}</p>
        <button
          className="mt-4 bg-green-500 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition duration-300"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
