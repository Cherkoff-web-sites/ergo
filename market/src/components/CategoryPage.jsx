import { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
// Данные передаются через props
import ProductCard from './ProductCard';
import { ShoppingCart, Heart } from 'lucide-react';

const CategoryPage = ({ products, categories, series, onAddToCart, onToggleFavorite, favorites = [], openCart, openFavorites }) => {
  const { categoryId } = useParams();
  const [selectedSeries, setSelectedSeries] = useState('all');
  const [selectedMaterial, setSelectedMaterial] = useState('Все');
  const [selectedColor, setSelectedColor] = useState('Все');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const category = categories.find(cat => cat.id === categoryId);
  const categoryProducts = products.filter(product => product.category === category?.name);
  
  // Получаем серии для данной категории
  const categorySeries = useMemo(() => {
    const seriesInCategory = [...new Set(categoryProducts.map(product => product.series))];
    return seriesInCategory.map(seriesId => series.find(s => s.id === seriesId)).filter(Boolean);
  }, [categoryProducts]);

  // Фильтрация товаров
  const filteredProducts = useMemo(() => {
    let filtered = categoryProducts;

    // Фильтр по серии
    if (selectedSeries !== 'all') {
      filtered = filtered.filter(product => product.series === selectedSeries);
    }

    // Фильтр по материалу
    if (selectedMaterial !== 'Все') {
      filtered = filtered.filter(product => product.material === selectedMaterial);
    }

    // Фильтр по цвету
    if (selectedColor !== 'Все') {
      filtered = filtered.filter(product => product.color === selectedColor);
    }

    // Фильтр по цене
    if (priceRange.min > 0 || priceRange.max > 0) {
      filtered = filtered.filter(product => {
        if (priceRange.min > 0 && product.price < priceRange.min) return false;
        if (priceRange.max > 0 && product.price > priceRange.max) return false;
        return true;
      });
    }

    // Поиск
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Сортировка (не мутируем исходный массив)
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [categoryProducts, selectedSeries, selectedMaterial, selectedColor, priceRange, searchTerm, sortBy]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
  };

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Категория не найдена</h1>
          <Link to="/catalog" className="text-primary hover:text-primary-dark">
            Вернуться в каталог
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={openFavorites} className="p-2 text-gray-600 hover:text-gray-900">
                <Heart size={24} />
              </button>
              <button onClick={openCart} className="p-2 text-gray-600 hover:text-gray-900">
                <ShoppingCart size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/catalog" className="text-gray-500 hover:text-gray-700">
                  КАТАЛОГ
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li>
                <span className="text-gray-900 font-medium">{category.name.toUpperCase()}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 py-4 overflow-x-auto">
            {categories.slice(1).map((cat) => (
              <Link
                key={cat.id}
                to={`/catalog/${cat.id}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                  cat.id === categoryId
                    ? 'bg-white text-primary'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                {cat.name.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Row */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-end md:gap-6 gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Поиск</label>
              <input type="text" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder="Поиск товаров..." className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"/>
            </div>
            <div className="w-full md:w-56">
              <label className="block text-sm font-medium text-gray-700 mb-2">Серии</label>
              <select value={selectedSeries} onChange={(e)=>setSelectedSeries(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                <option value="all">Все серии</option>
                {categorySeries.map((seriesItem)=>(<option key={seriesItem.id} value={seriesItem.id}>{seriesItem.name}</option>))}
              </select>
            </div>
            <div className="w-full md:w-56">
              <label className="block text-sm font-medium text-gray-700 mb-2">Материал</label>
              <select value={selectedMaterial} onChange={(e)=>setSelectedMaterial(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                <option value="Все">Все материалы</option>
                {[...new Set(categoryProducts.map(p=>p.material))].map(m=>(<option key={m} value={m}>{m}</option>))}
              </select>
            </div>
            <div className="w-full md:w-56">
              <label className="block text-sm font-medium text-gray-700 mb-2">Цвет</label>
              <select value={selectedColor} onChange={(e)=>setSelectedColor(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                <option value="Все">Все цвета</option>
                {[...new Set(categoryProducts.map(p=>p.color))].map(c=>(<option key={c} value={c}>{c}</option>))}
              </select>
            </div>
            <div className="w-full md:w-56">
              <label className="block text-sm font-medium text-gray-700 mb-2">Сортировка</label>
              <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                <option value="name">По названию</option>
                <option value="price-asc">По цене (возрастание)</option>
                <option value="price-desc">По цене (убывание)</option>
                <option value="rating">По рейтингу</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-8">
          {/* Series Section on top */}
          {categorySeries.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Серии</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categorySeries.map((seriesItem) => {
                  const seriesProducts = categoryProducts.filter(p => p.series === seriesItem.id);
                  return (
                    <Link
                      key={seriesItem.id}
                      to={`/catalog/${category.id}/series/${seriesItem.id}`}
                      className="group block p-6 bg-white rounded-lg border border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-300"
                    >
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                          {seriesItem.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          {seriesItem.description}
                        </p>
                        <p className="text-sm text-gray-500">
                          {seriesProducts.length} товаров
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Товары ({filteredProducts.length})</h2>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Товары не найдены</h3>
                <p className="text-gray-600">Попробуйте изменить параметры поиска или фильтры</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={() => { onAddToCart?.(product); }}
                    onToggleFavorite={() => onToggleFavorite?.(product.id)}
                    isFavorite={favorites.includes(product.id)}
                  />
                ))}
              </div>
            )}

            {/* Series section moved to top */}
          </div>
        </div>
      </div>
  );
};

export default CategoryPage;