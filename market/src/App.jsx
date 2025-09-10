import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Menu, X } from 'lucide-react';
// Используем Excel данные вместо моковых
import { excelProducts, excelCategories, excelSeries } from './data/excelProducts';

// Components
import CatalogMain from './components/CatalogMain';
import AllProductsPage from './components/AllProductsPage';
import CategoryPage from './components/CategoryPage';
import SeriesPage from './components/SeriesPage';
import ProductPage from './components/ProductPage';
import Cart from './components/Cart';
import FavoritesModal from './components/FavoritesModal';
import Footer from './components/Footer';

// Компонент для автоматического скролла наверх при смене маршрута
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
};

function App() {
  // Состояние корзины и избранного
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  // Состояние данных
  const [products, setProducts] = useState(excelProducts);
  const [categories, setCategories] = useState(excelCategories);
  const [series, setSeries] = useState(excelSeries);

  // Логирование для отладки
  useEffect(() => {
    console.log('Excel данные загружены:');
    console.log('Товары:', products.length);
    console.log('Категории:', categories.length);
    console.log('Серии:', series.length);
    console.log('Первый товар:', products[0]);
  }, [products, categories, series]);

  // Загрузка данных из localStorage при инициализации
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedFavorites = localStorage.getItem('favorites');
    
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Сохранение в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleAddToCart = (product, quantityToAdd = 1) => {
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      setCartItems(
        cartItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: quantityToAdd }]);
    }
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      setCartItems(cartItems.filter(item => item.id !== productId));
    } else {
      setCartItems(cartItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const handleRemoveItem = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleToggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalFavorites = favorites.length;

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              {/* Logo */}
              <div className="flex items-center">
                <a href="https://ergo-static.vercel.app/" className="text-2xl font-bold text-primary">
                  ЭРГО
                </a>
              </div>

              {/* Search */}
              <div className="flex-1 max-w-lg mx-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Поиск мебели..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
      </div>

              {/* Actions */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsFavoritesOpen(true)}
                  className="relative p-2 text-gray-600 hover:text-gray-900"
                >
                  <Heart size={24} />
                  {totalFavorites > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {totalFavorites}
                    </span>
                  )}
                </button>
                
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2 text-gray-600 hover:text-gray-900"
                >
                  <ShoppingCart size={24} />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
        </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Navigate to="/catalog" replace />} />
            <Route path="/catalog" element={<CatalogMain categories={categories} />} />
            <Route
              path="/catalog/all"
              element={
                <AllProductsPage
                  products={products}
                  categories={categories}
                  series={series}
                  onAddToCart={handleAddToCart}
                  onToggleFavorite={handleToggleFavorite}
                  favorites={favorites}
                />
              }
            />
            <Route
              path="/catalog/:categoryId"
              element={
                <CategoryPage
                  products={products}
                  categories={categories}
                  series={series}
                  onAddToCart={handleAddToCart}
                  onToggleFavorite={handleToggleFavorite}
                  favorites={favorites}
                  openCart={() => setIsCartOpen(true)}
                  openFavorites={() => setIsFavoritesOpen(true)}
                />
              }
            />
            <Route
              path="/catalog/:categoryId/series/:seriesId"
              element={
                <SeriesPage
                  products={products}
                  categories={categories}
                  series={series}
                  onAddToCart={handleAddToCart}
                  onToggleFavorite={handleToggleFavorite}
                  favorites={favorites}
                  openCart={() => setIsCartOpen(true)}
                  openFavorites={() => setIsFavoritesOpen(true)}
                />
              }
            />
            <Route
              path="/product/:productId"
              element={
                <ProductPage
                  products={products}
                  categories={categories}
                  series={series}
                  onAddToCart={handleAddToCart}
                  onToggleFavorite={handleToggleFavorite}
                  favorites={favorites}
                  openCart={() => setIsCartOpen(true)}
                  openFavorites={() => setIsFavoritesOpen(true)}
                />
              }
            />
          </Routes>
        </main>

        {/* Cart Modal */}
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
        />

        {/* Favorites Modal */}
        <FavoritesModal
          isOpen={isFavoritesOpen}
          onClose={() => setIsFavoritesOpen(false)}
          favorites={favorites}
          products={products}
          onToggleFavorite={handleToggleFavorite}
          onAddToCart={handleAddToCart}
        />

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;