import { useState, useMemo, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
// Данные передаются через props
import ProductCard from './ProductCard';

const CategoryPage = ({ products, categories, series, onAddToCart, onToggleFavorite, favorites = [], openCart, openFavorites }) => {
  const { categoryId } = useParams();
  const [selectedSeries, setSelectedSeries] = useState('all');
  const [selectedMaterial, setSelectedMaterial] = useState('Все');
  const [selectedColor, setSelectedColor] = useState('Все');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  
  // Пагинация
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24; // 24 товара на странице (4 ряда по 6)

  const category = categories.find(cat => cat.id === categoryId);
  const categoryProducts = products.filter(product => product.category === category?.name);
  
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
  }, [selectedSeries, selectedMaterial, selectedColor, priceRange, debouncedSearchTerm, sortBy]);

  // Функция для плавного скролла наверх
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
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
  }, [categoryProducts, selectedSeries, selectedMaterial, selectedColor, priceRange, debouncedSearchTerm, sortBy]);

  // Пагинация
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
  };

  const handleSeriesClick = () => {
    // Плавный скролл наверх
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  const handleBreadcrumbClick = () => {
    // Плавный скролл наверх
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
    <div className="min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/catalog" onClick={handleBreadcrumbClick} className="text-gray-500 hover:text-gray-700">
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

      {/* Category Navigation */}
      <div className="bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-black">
          <div className="flex space-x-1 py-4 overflow-x-auto">
            {categories.slice(1).map((cat) => (
              <Link
                key={cat.id}
                to={`/catalog/${cat.id}`}
                className={`px-3 py-1 rounded-[5px] text-xl font-semibold whitespace-nowrap transition-all duration-300 ${
                  cat.id === categoryId
                    ? 'bg-transparent text-primary border border-primary'
                    : 'bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200'
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
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end md:gap-6 gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Поиск
                {searchTerm !== debouncedSearchTerm && (
                  <span className="ml-2 text-xs text-blue-600">Поиск...</span>
                )}
              </label>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {categorySeries.map((seriesItem) => {
                  const seriesProducts = categoryProducts.filter(p => p.series === seriesItem.id);
                  return (
                    <Link
                      key={seriesItem.id}
                      to={`/catalog/${category.id}/series/${seriesItem.id}`}
                      onClick={handleSeriesClick}
                      className="group block p-6 bg-white rounded-lg border border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-300"
                    >
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                          {seriesItem.name}
                        </h3>
                        {/* <p className="text-sm text-gray-600 mb-4">
                          {seriesItem.description}
                        </p>
                        <p className="text-sm text-gray-500">
                          {seriesProducts.length} товаров
                        </p> */}
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

            {/* Series section moved to top */}
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
              onClick={() => { setCurrentPage(Math.max(1, currentPage - 1)); scrollToTop(); }}
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
                  onClick={() => { setCurrentPage(pageNum); scrollToTop(); }}
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
              onClick={() => { setCurrentPage(Math.min(totalPages, currentPage + 1)); scrollToTop(); }}
              disabled={currentPage === totalPages}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Вперед
            </button>
          </div>
        )}
      </div>
  );
};

export default CategoryPage;