import { useState, useEffect, useMemo } from 'react';
import { ShoppingCart, Heart, Menu, X } from 'lucide-react';
import { mockProducts, categories, materials, colors } from './data/mockProducts';
import ProductGrid from './components/ProductGrid';
import Filters from './components/Filters';
import SearchBar from './components/SearchBar';
import Cart from './components/Cart';

function App() {
  // Состояние фильтров
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMaterial, setSelectedMaterial] = useState('Все');
  const [selectedColor, setSelectedColor] = useState('Все');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  // Состояние корзины и избранного
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

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

  // Фильтрация и сортировка товаров
  const filteredProducts = useMemo(() => {
    let filtered = mockProducts.filter(product => {
      // Фильтр по категории
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Фильтр по материалу
      if (selectedMaterial !== 'Все' && product.material !== selectedMaterial) {
        return false;
      }

      // Фильтр по цвету
      if (selectedColor !== 'Все' && product.color !== selectedColor) {
        return false;
      }

      // Фильтр по цене
      if (priceRange.min > 0 && product.price < priceRange.min) {
        return false;
      }
      if (priceRange.max > 0 && product.price > priceRange.max) {
        return false;
      }

      // Поиск по названию
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      return true;
    });

    // Сортировка
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [selectedCategory, selectedMaterial, selectedColor, priceRange, searchTerm, sortBy]);

  // Обработчики
  const handleAddToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
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

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedMaterial('Все');
    setSelectedColor('Все');
    setPriceRange({ min: 0, max: 0 });
    setSearchTerm('');
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-bg-light">
      {/* Header */}
      <header className="bg-white border-b border-border-light sticky top-0 z-30">
        <div className="max-w-container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu size={20} />
              </button>
              <h1 className="text-title-3 text-primary font-bold">ЭРГО</h1>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md mx-4">
              <SearchBar
                onSearch={setSearchTerm}
                placeholder="Поиск мебели..."
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className="hidden lg:flex items-center gap-2 px-4 py-2 border border-border-light rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-body-sm">Фильтры</span>
              </button>

              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Heart size={20} />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ShoppingCart size={20} />
                {totalCartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {totalCartItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <div className={`hidden lg:block w-80 flex-shrink-0 ${isFiltersOpen ? 'block' : 'hidden'}`}>
            <Filters
              categories={categories}
              materials={materials}
              colors={colors}
              selectedCategory={selectedCategory}
              selectedMaterial={selectedMaterial}
              selectedColor={selectedColor}
              priceRange={priceRange}
              onCategoryChange={setSelectedCategory}
              onMaterialChange={setSelectedMaterial}
              onColorChange={setSelectedColor}
              onPriceRangeChange={setPriceRange}
              onResetFilters={handleResetFilters}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-title-3 text-text-main mb-2">
                  Каталог мебели
                </h2>
                <p className="text-body-sm text-text-secondary">
                  Найдено товаров: {filteredProducts.length}
                </p>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-border-light rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="name">По названию</option>
                <option value="price-asc">Цена: по возрастанию</option>
                <option value="price-desc">Цена: по убыванию</option>
                <option value="rating">По рейтингу</option>
              </select>
            </div>

            {/* Products Grid */}
            <ProductGrid
              products={filteredProducts}
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
              favorites={favorites}
            />
          </div>
        </div>
      </div>

      {/* Mobile Filters Overlay */}
      {isFiltersOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40">
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl">
            <div className="p-4 border-b border-border-light flex items-center justify-between">
              <h3 className="text-title-3 text-text-main">Фильтры</h3>
              <button
                onClick={() => setIsFiltersOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <Filters
                categories={categories}
                materials={materials}
                colors={colors}
                selectedCategory={selectedCategory}
                selectedMaterial={selectedMaterial}
                selectedColor={selectedColor}
                priceRange={priceRange}
                onCategoryChange={setSelectedCategory}
                onMaterialChange={setSelectedMaterial}
                onColorChange={setSelectedColor}
                onPriceRangeChange={setPriceRange}
                onResetFilters={handleResetFilters}
              />
            </div>
          </div>
        </div>
      )}

      {/* Cart */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}

export default App;