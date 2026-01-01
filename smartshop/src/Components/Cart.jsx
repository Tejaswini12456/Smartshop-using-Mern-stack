import React from "react";
import { Plus, Minus, Trash2, X } from "lucide-react";

const Cart = ({ showCart, setShowCart, cart, updateQuantity, removeFromCart, totalItems, totalPrice }) => {
  if (!showCart) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
      <div className="bg-white w-80 md:w-96 h-full p-4 overflow-y-auto">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">Your Cart ({totalItems})</h2>
          <X size={24} onClick={() => setShowCart(false)} className="cursor-pointer" />
        </div>

        {cart.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="flex items-center gap-4 mb-6">
              <img className="w-20 h-20 rounded-md object-cover" src={item.image} />

              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-orange-500 font-bold">${item.price * item.quantity}</p>

                <div className="flex items-center gap-3 mt-2">
                  <button onClick={() => updateQuantity(item.id, -1)}>
                    <Minus size={18} />
                  </button>

                  <span className="font-semibold">{item.quantity}</span>

                  <button onClick={() => updateQuantity(item.id, 1)}>
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              <button onClick={() => removeFromCart(item.id)}>
                <Trash2 size={20} className="text-red-500" />
              </button>
            </div>
          ))
        )}

        {cart.length > 0 && (
          <div className="mt-6 border-t pt-4">
            <p className="text-lg font-bold">Total: ${totalPrice}</p>
            <button className="bg-orange-500 w-full mt-4 py-2 text-white font-semibold rounded-lg">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
