import { useState, useMemo, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
// Данные передаются через props
import ProductCard from './ProductCard';
import Header from './Header';

const SeriesPage = ({ products, categories, series, onAddToCart, onToggleFavorite, favorites = [], openCart, openFavorites, totalFavorites, totalItems }) => {
  const { categoryId, seriesId } = useParams();
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

  // Функция для плавного скролла наверх
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  const handleBreadcrumbClick = () => {
    // Плавный скролл наверх
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  if (!category || !seriesItem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
    <div className="min-h-screen">
      {/* Header */}
      <Header 
        onOpenFavorites={openFavorites}
        onOpenCart={openCart}
        totalFavorites={totalFavorites}
        totalItems={totalItems}
      />

      {/* Category Navigation */}
      <div className="bg-transparent mt-16 xxl:mt-20">
        <div className="max-w-full-mob md:max-w-full-pc mx-auto border-b border-text">
          <div className="flex space-x-3.5 py-4 overflow-x-auto">
            {categories.slice(1).map((cat) => (
              <Link
                key={cat.id}
                to={`/catalog/${cat.id}`}
                className={`px-3 py-1 rounded-btn text-sm xxl:text-lg leading-lh-100 font-semibold whitespace-nowrap transition-all duration-300 ${
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
      <div className="max-w-full-mob md:max-w-full-pc mx-auto py-4 mb-4">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-btn-border font-semibold">
            <li>
              <Link to="/catalog" onClick={handleBreadcrumbClick} className="hover:text-text">
                КАТАЛОГ
              </Link>
            </li>
            <li className="">&gt;</li>
            <li>
              <Link to={`/catalog/${categoryId}`} onClick={handleBreadcrumbClick} className="hover:text-text">
                {category.name.toUpperCase()}
              </Link>
            </li>
            <li className="">&gt;</li>
            <li>
              <span className="">СЕРИЯ "{seriesItem.name}"</span>
            </li>
          </ol>
        </nav>
      </div>
      
      {/* Page Title */}
      <div className="max-w-full-mob md:max-w-full-pc mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="font-tenor text-2xl md:text-4xl xxl:text-5xl uppercase mb-3">СЕРИЯ "{seriesItem.name}"</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-full-mob md:max-w-full-pc mx-auto ">

        {/* Main Content */}
        <div>
            {/* Series Info */}
            <div className="mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Series Image Placeholder */}
                <div className="rounded-lg min-h-[291px] max-h-[45vh] overflow-hidden col-span-5">
                  <img src="/img/service_catalog_link_bg_2x.webp" className="w-full h-full object-cover" alt={`Изображение серии ${seriesItem.name}`} />
                </div>

                {/* Series Info */}
                <div className="col-span-5">
                  
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

        {/* Filters row */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end md:gap-6 gap-4">
            <div className="flex-1">
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
            <div className="w-full md:w-56">
              <label className="block text-sm font-medium text-gray-700 mb-2">Материал</label>
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
            <div className="w-full md:w-56">
              <label className="block text-sm font-medium text-gray-700 mb-2">Цвет</label>
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
            <div className="w-full md:w-56">
              <label className="block text-sm font-medium text-gray-700 mb-2">Сортировка</label>
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
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  className={`px-3 py-2 text-sm font-medium rounded-lg ${
                      currentPage === page
                        ? 'bg-primary text-white'
                        : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                </button>
                ));
              })()}
            </div>
            
            <button
              onClick={() => { setCurrentPage(Math.min(totalPages, currentPage + 1)); scrollToTop(); }}
              disabled={currentPage === totalPages}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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