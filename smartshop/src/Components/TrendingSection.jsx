// src/components/TrendingSection.jsx
import React from 'react';
import ProductCard from './ProductCard';

const TrendingSection = ({ title, icon: Icon, products, toggleFavorite, favorites, setShowQuickView, addToCart }) => {
  return (
    <section id="trending" className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 bg-white rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="text-orange-500" size={32} />
        <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
      </div>
      <p className="text-gray-600 mb-8">Hot deals everyone's talking about! 🔥</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            toggleFavorite={toggleFavorite}
            favorites={favorites}
            setShowQuickView={setShowQuickView}
            addToCart={addToCart}
          />
        ))}
      </div>
    </section>
  );
};

export default TrendingSection;
