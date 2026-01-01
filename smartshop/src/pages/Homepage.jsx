import React, { useState, useRef } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import TrendingSection from '../Components/TrendingSection';
import RecommendedSection from '../Components/RecommendedSection';
import QuickViewModal from '../Components/QuickViewModal';
import products from '../data/product';
import { Flame, Lightbulb } from 'lucide-react';

const Homepage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showQuickView, setShowQuickView] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categoriesRef = useRef(null);

  const categories = ['All', 'Mobiles', 'Fashion', 'Electronics', 'Beauty'];

  // Filter products by search and category
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // ✅ CHANGED: Use filtered products instead of hardcoded slices
  const trendingProducts = filteredProducts.slice(0, 8);
  const recommendedProducts = filteredProducts.slice(8, 20);

  // Cart functions
  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId, change) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Place Order function
  const placeOrder = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const userId = "USER_ID_HERE";
    const orderData = {
      userId,
      products: cart.map(item => ({
        productId: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      totalPrice
    };

    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      const data = await res.json();
      alert("Order placed successfully!");
      console.log(data);
      setCart([]);
      setShowCart(false);
    } catch (err) {
      console.error(err);
      alert("Failed to place order.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        totalItems={totalItems}
        setShowCart={setShowCart}
      />

      {/* Hero Section */}
      <section
        className="relative h-64 md:h-96 lg:h-[500px] flex items-center justify-center text-white"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="text-center px-4">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
            Shop Smart. Shop Better.
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Personalized shopping powered by Hybrid Recommendations.
          </p>
          <button
            onClick={() => categoriesRef.current.scrollIntoView({ behavior: 'smooth' })}
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 md:px-8 py-3 rounded-lg text-base md:text-lg transition-colors"
          >
            Explore Now
          </button>
        </div>
      </section>

      {/* ✅ NEW: Search Results Indicator */}
      {searchQuery && (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <p className="text-gray-600 text-lg">
            Found <span className="font-bold text-orange-500">{filteredProducts.length}</span> products for "<span className="font-semibold">{searchQuery}</span>"
            {filteredProducts.length === 0 && (
              <button
                onClick={() => setSearchQuery("")}
                className="ml-4 text-orange-500 hover:underline font-semibold"
              >
                Clear search
              </button>
            )}
          </p>
        </div>
      )}

      {/* Shop by Category */}
      <section ref={categoriesRef} id="categories" className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.slice(1).map((category) => (
            <div
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-lg p-8 md:p-12 text-center cursor-pointer transition-all ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white shadow-lg scale-105'
                  : 'bg-white hover:bg-gray-100 shadow-md'
              }`}
            >
              <h3 className="text-xl md:text-2xl font-semibold">{category}</h3>
            </div>
          ))}
        </div>
        {selectedCategory !== "All" && (
          <button
            onClick={() => setSelectedCategory("All")}
            className="mt-4 text-orange-500 hover:underline font-semibold"
          >
            ← Clear Filter
          </button>
        )}
      </section>

      {/* ✅ CHANGED: Now shows filtered products */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-500">No products found</p>
        </div>
      ) : (
        <>
          {/* Trending Section */}
          {trendingProducts.length > 0 && (
            <TrendingSection
              title="Trending Products"
              icon={Flame}
              products={trendingProducts}
              toggleFavorite={toggleFavorite}
              favorites={favorites}
              setShowQuickView={setShowQuickView}
              addToCart={addToCart}
            />
          )}

          {/* Recommended Section */}
          {recommendedProducts.length > 0 && (
            <RecommendedSection
              title="Recommended For You"
              icon={Lightbulb}
              products={recommendedProducts}
              toggleFavorite={toggleFavorite}
              favorites={favorites}
              setShowQuickView={setShowQuickView}
              addToCart={addToCart}
            />
          )}
        </>
      )}

      {/* Quick View Modal */}
      {showQuickView && (
        <QuickViewModal
          product={showQuickView}
          setShowQuickView={setShowQuickView}
          addToCart={addToCart}
        />
      )}

      {/* Cart Sidebar */}
      {showCart && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setShowCart(false)}
        >
          <div
            className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Shopping Cart</h2>
                <button onClick={() => setShowCart(false)}>X</button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4 bg-gray-50 p-4 rounded-lg">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{item.name}</h3>
                          <p className="text-orange-500 font-bold">${item.price}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                            >
                              -
                            </button>
                            <span className="font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                            >
                              +
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="ml-auto p-1 text-red-500 hover:bg-red-50 rounded"
                            >
                              🗑
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-4">
                      <span className="text-gray-600">Shipping:</span>
                      <span className="font-semibold text-green-500">FREE</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold mb-6">
                      <span>Total:</span>
                      <span className="text-orange-500">${totalPrice.toFixed(2)}</span>
                    </div>
                    <button
                      onClick={placeOrder}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Homepage;