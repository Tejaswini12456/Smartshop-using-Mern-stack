// src/components/ProductCard.jsx
import React from 'react';
import { Heart, Star, Eye } from 'lucide-react';

const ProductCard = ({ product, toggleFavorite, favorites, setShowQuickView, addToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <div className="h-48 flex items-center justify-center bg-gray-100 overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
        </div>
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => toggleFavorite(product.id)}
            className={`p-2 rounded-full ${favorites.includes(product.id) ? 'bg-red-500' : 'bg-white'} shadow-md hover:scale-110 transition-transform`}
          >
            <Heart size={16} className={favorites.includes(product.id) ? 'text-white' : 'text-gray-600'} fill={favorites.includes(product.id) ? 'white' : 'none'} />
          </button>
          <button
            onClick={() => setShowQuickView(product)}
            className="p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
          >
            <Eye size={16} className="text-gray-600" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 truncate">{product.name}</h3>
        <div className="flex items-center gap-1 mb-2">
          <Star size={14} className="text-yellow-400" fill="currentColor" />
          <span className="text-sm text-gray-600">{product.rating} ({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-orange-500">${product.price}</span>
          <button
            onClick={() => addToCart(product)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-semibold"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
