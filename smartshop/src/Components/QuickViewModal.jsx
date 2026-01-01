// src/components/QuickViewModal.jsx
import React from 'react';
import { X, Star } from 'lucide-react';

const QuickViewModal = ({ product, setShowQuickView, addToCart }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowQuickView(null)}>
      <div className="bg-white rounded-lg p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl md:text-3xl font-bold">{product.name}</h3>
          <button onClick={() => setShowQuickView(null)}>
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex items-center justify-center bg-gray-100 rounded-lg h-64 overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <Star size={20} className="text-yellow-400" fill="currentColor" />
              <span className="text-lg">{product.rating} ({product.reviews} reviews)</span>
            </div>
            <p className="text-gray-600 mb-4">Category: <span className="font-semibold">{product.category}</span></p>
            <p className="text-3xl font-bold text-orange-500 mb-6">${product.price}</p>
            <button
              onClick={() => { addToCart(product); setShowQuickView(null); }}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors font-semibold"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
