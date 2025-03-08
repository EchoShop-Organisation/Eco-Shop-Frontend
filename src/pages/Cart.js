import React, { useContext } from "react";
import AuthContext from "../AuthContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart } = useContext(AuthContext);

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + parseFloat(product.price), 0).toFixed(2);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-center mb-6">Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cart.map((product, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-md" />
                  <div>
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                    <p className="text-gray-700">${product.price}</p>
                  </div>
                </div>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  onClick={() => removeFromCart(product.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Total & Checkout */}
          <div className="mt-6 text-center">
            <h3 className="text-2xl font-semibold">Total: ${calculateTotal()}</h3>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
              onClick={() => alert("Proceeding to Checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 text-center">
        <Link to="/products" className="text-blue-500 hover:underline">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Cart;
