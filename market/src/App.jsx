import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Menu, X } from 'lucide-react';
// Используем Excel данные вместо моковых
import { excelProducts, excelCategories, excelSeries } from './data/excelProducts';

// Components
import Header from './components/Header';
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
      <div className="min-h-screen bg-body">
        {/* Header */}
        <Header 
          onOpenFavorites={() => setIsFavoritesOpen(true)}
          onOpenCart={() => setIsCartOpen(true)}
          totalFavorites={totalFavorites}
          totalItems={totalItems}
        />

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