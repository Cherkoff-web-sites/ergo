import { useState, useMemo, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
// Данные передаются через props
import ProductCard from './ProductCard';
import Header from './Header';

const CategoryPage = ({ products, categories, series, onAddToCart, onToggleFavorite, favorites = [], openCart, openFavorites, totalFavorites, totalItems }) => {
  const { categoryId } = useParams();
  const [selectedSeries, setSelectedSeries] = useState('all');
  const [selectedMaterial, setSelectedMaterial] = useState('Все');
  const [selectedColor, setSelectedColor] = useState('Все');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [isSeriesExpanded, setIsSeriesExpanded] = useState(true);
  
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
  }, [categoryProducts, series]);

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
    return new Intl.NumberFormat('ru-RU').format(price) + ' р.';
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
      <Header 
        onOpenFavorites={openFavorites}
        onOpenCart={openCart}
        totalFavorites={totalFavorites}
        totalItems={totalItems}
      />
      
      {/* Category Navigation */}
      <div className="bg-transparent 
mt-6 md:mt-16 xxl:mt-20">
        <div className="max-w-full-mob md:max-w-full-pc mx-auto border-b border-text">
          <div className="flex space-x-3.5 py-4 overflow-x-auto">
            {categories.slice(1).map((cat) => (
              <Link
                key={cat.id}
                to={`/catalog/${cat.id}`}
                className={`px-3 py-1 rounded-btn text-sm xxl:text-lg leading-lh-100 font-semibold whitespace-nowrap transition-all duration-300  ${
                  cat.id === categoryId
                    ? 'bg-btn-bg text-primary border border-primary'
                    : 'bg-btn-bg text-text border border-btn-border hover:bg-[#F0F2B063]'
                }`}
              >
                {cat.name.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </div>


      {/* Breadcrumbs */}
      <div className="hidden max-w-full-mob md:max-w-full-pc mx-auto py-4">
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
      {/* Page Title */}
      <div className="hidden max-w-full-mob md:max-w-full-pc mx-auto">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <h1 className="font-tenor text-2xl md:text-4xl xxl:text-5xl uppercase">{category.name}</h1>
          </div>
        </div>
      </div>


      {/* Main Content */}
      <div className="max-w-full-mob md:max-w-full-pc mx-auto py-8">

        {/* Content */}
        <div className="flex flex-col gap-8">
          {/* Series Section on top */}
          {categorySeries.length > 0 && (
            <div className='mb-12 md:mb-20 xxl:mb-24'>
              <div className="flex items-center gap-4 mb-3">
                <h2 className="font-tenor text-2xl md:text-4xl xxl:text-5xl uppercase">Серии</h2>
                <button
                  onClick={() => setIsSeriesExpanded(!isSeriesExpanded)}
                  className="hover:opacity-80 transition-opacity duration-200"
                  title={isSeriesExpanded ? "Свернуть серии" : "Развернуть серии"}
                >
                  <svg 
                    width="37" 
                    height="18" 
                    viewBox="0 0 37 18" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="37" height="18" rx="5" fill="#FDFFEE" fillOpacity="0.05"/>
                    <rect x="0.5" y="0.5" width="36" height="17" rx="4.5" stroke="#1A1812" strokeOpacity="0.32"/>
                    <path d="M18.2817 10.3374L19.5654 6.80322H20.9189L18.937 11.4653H17.9917L18.2817 10.3374ZM17.1807 6.80322L18.502 10.3428L18.7544 11.4653H17.8145L15.8325 6.80322H17.1807Z" fill="#1A1812"/>
                  </svg>
                </button>
              </div>
              {isSeriesExpanded && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {categorySeries.map((seriesItem) => {
                  const seriesProducts = categoryProducts.filter(p => p.series === seriesItem.id);
                  return (
                    <div
                      key={seriesItem.id}
                      className="series-card group relative block bg-transparent rounded-lg border border-card-border transition-all duration-300"
                      style={{
                        '--bg-image': 'url(/img/series_example_fp.webp)'
                      }}
                    >
                      <div className="min-h-[114px] xxl:min-h-[164px] flex items-center justify-center relative z-10">
                        <Link
                          to={`/catalog/${category.id}/series/${seriesItem.id}`}
                          onClick={handleSeriesClick}
                          className="series-button text-center inline-block transition-all duration-300"
                          onMouseEnter={(e) => {
                            e.target.closest('.series-card').style.setProperty('--after-opacity', '1');
                            e.target.style.setProperty('--button-bg', 'transparent');
                            e.target.style.setProperty('--button-color', 'white');
                            e.target.style.setProperty('--button-border', '1px solid white');
                          }}
                          onMouseLeave={(e) => {
                            e.target.closest('.series-card').style.setProperty('--after-opacity', '0');
                            e.target.style.setProperty('--button-bg', 'rgba(26, 24, 18, 0.05)');
                            e.target.style.setProperty('--button-color', '#1A1812');
                            e.target.style.setProperty('--button-border', '1px solid rgba(26, 24, 18, 0.32)');
                          }}
                        >
                          {seriesItem.name.toUpperCase()}
                        </Link>
                      </div>
                    </div>
                  );
                })}
                </div>
              )}
            </div>
          )}
        </div>


          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex justify-between items-center md:mb-4 xxl:mb-6">
              <div>
                <h2 className="font-tenor text-2xl md:text-4xl xxl:text-5xl uppercase">Товары <span className='hidden'>({filteredProducts.length})</span></h2>
              </div>
            </div>

        {/* Filters Row */}
            <div className="mb-6 md:mb-10 xxl:mb-12">
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

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="font-tenor text-2xl md:text-4xl xxl:text-5xl uppercase mb-2">Товары не найдены</h3>
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
              className="px-3 py-2 rounded-btn border border-btn-border bg-btn-bg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Назад
            </button>
            
            <div className="flex space-x-1">
              {(() => {
                const maxVisiblePages = 5;
                const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
                const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
                const pages = [];
                
                for (let i = startPage; i <= endPage; i++) {
                  pages.push(i);
                }
                
                return pages.map(page => (
                <button
                    key={page}
                    onClick={() => { setCurrentPage(page); scrollToTop(); }}
                  className={`px-3 py-2 text-sm font-medium rounded-btn border border-btn-border bg-btn-bg ${currentPage === page ? 'bg-[#DADBA2]' : ''}`}
                  style={currentPage === page ? { backgroundColor: '#DADBA2' } : undefined}
                  >
                    {page}
                </button>
                ));
              })()}
            </div>
            
            <button
              onClick={() => { setCurrentPage(Math.min(totalPages, currentPage + 1)); scrollToTop(); }}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-btn border border-btn-border bg-btn-bg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Вперед
            </button>
          </div>
        )}
      </div>
  );
};

export default CategoryPage;