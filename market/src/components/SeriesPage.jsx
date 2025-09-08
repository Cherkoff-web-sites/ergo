import { useState, useMemo, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
// Данные передаются через props
import ProductCard from './ProductCard';
import { Filter } from 'lucide-react';

const SeriesPage = ({ products, categories, series, onAddToCart, onToggleFavorite, favorites = [], openCart, openFavorites }) => {
  const { categoryId, seriesId } = useParams();
  const [selectedMaterial, setSelectedMaterial] = useState('Все');
  const [selectedColor, setSelectedColor] = useState('Все');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  // Пагинация
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24; // 24 товара на странице (4 ряда по 6)

  const category = categories.find(cat => cat.id === categoryId);
  const seriesItem = series.find(s => s.id === seriesId);
  const seriesProducts = products.filter(
    product => product.category === category?.name && product.series === seriesId
  );
  
  // Дебаунс для поиска
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Сброс страницы при изменении фильтров
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedMaterial, selectedColor, priceRange, debouncedSearchTerm, sortBy]);

  // Фильтрация товаров
  const filteredProducts = useMemo(() => {
    let filtered = seriesProducts;

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
    if (debouncedSearchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }

    // Сортировка (не мутируем исходный массив)
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [seriesProducts, selectedMaterial, selectedColor, priceRange, debouncedSearchTerm, sortBy]);

  // Пагинация
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
  };

  if (!category || !seriesItem) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Серия не найдена</h1>
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
              <h1 className="text-3xl font-bold text-gray-900">Серия "{seriesItem.name}"</h1>
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
                <Link to={`/catalog/${categoryId}`} className="text-gray-500 hover:text-gray-700">
                  {category.name.toUpperCase()}
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li>
                <span className="text-gray-900 font-medium">СЕРИЯ "{seriesItem.name}"</span>
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
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Фильтры</h3>
                <button
                  onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                  className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
                >
                  <Filter size={20} />
                </button>
              </div>

              <div className={`space-y-6 ${isFiltersOpen ? 'block' : 'hidden lg:block'}`}>
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Поиск
                    {searchTerm !== debouncedSearchTerm && (
                      <span className="ml-2 text-xs text-blue-600">Поиск...</span>
                    )}
                  </label>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Поиск товаров..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                {/* Material Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Материал
                  </label>
                  <select
                    value={selectedMaterial}
                    onChange={(e) => setSelectedMaterial(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="Все">Все материалы</option>
                    {[...new Set(seriesProducts.map(p => p.material))].map(material => (
                      <option key={material} value={material}>{material}</option>
                    ))}
                  </select>
                </div>

                {/* Color Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Цвет
                  </label>
                  <select
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="Все">Все цвета</option>
                    {[...new Set(seriesProducts.map(p => p.color))].map(color => (
                      <option key={color} value={color}>{color}</option>
                    ))}
                  </select>
                </div>

                {/* Sort */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Сортировка
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="name">По названию</option>
                    <option value="price-asc">По цене (возрастание)</option>
                    <option value="price-desc">По цене (убывание)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Series Info */}
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Series Image Placeholder */}
                <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="text-4xl mb-2">🖼️</div>
                    <p>Изображение серии</p>
                  </div>
                </div>

                {/* Series Info */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Серия "{seriesItem.name}"
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {seriesItem.description}
                  </p>
                  
                  {/* Characteristics */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Характеристики</h3>
                    <p className="text-gray-600">
                      Современная мебель высокого качества с эргономичным дизайном и долговечными материалами.
                    </p>
                  </div>

                  {/* Colors */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Цвета</h3>
                    <div className="flex space-x-2">
                      {[...new Set(seriesProducts.map(p => p.color))].slice(0, 3).map(color => (
                        <div
                          key={color}
                          className="w-8 h-8 rounded border border-gray-300 bg-gray-200"
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Section */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Товары серии ({filteredProducts.length})
                </h2>
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
                  {currentProducts.map((product) => (
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
            </div>
          </div>
        </div>

        {/* Results info */}
        <div className="text-center text-sm text-gray-600 mb-4">
          Показано {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} из {filteredProducts.length} товаров
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mb-8">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Назад
            </button>
            
            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg ${
                    currentPage === pageNum
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Вперед
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeriesPage;