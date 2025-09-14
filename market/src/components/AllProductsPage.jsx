import { useMemo, useState, useCallback, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Header from './Header';

const AllProductsPage = ({ products, categories, series, onAddToCart, onToggleFavorite, favorites = [], openCart, openFavorites }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMaterial, setSelectedMaterial] = useState('Все');
  const [selectedColor, setSelectedColor] = useState('Все');
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState('name');
  
  // Пагинация
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24; // 24 товара на странице (4 ряда по 6)

  // Дебаунс для поиска
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      // Обновляем URL с поисковым запросом
      const newSearchParams = new URLSearchParams(searchParams);
      if (searchTerm.trim()) {
        newSearchParams.set('search', searchTerm.trim());
      } else {
        newSearchParams.delete('search');
      }
      setSearchParams(newSearchParams, { replace: true });
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchTerm, searchParams, setSearchParams]);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    if (selectedMaterial !== 'Все') {
      filtered = filtered.filter(p => p.material === selectedMaterial);
    }
    if (selectedColor !== 'Все') {
      filtered = filtered.filter(p => p.color === selectedColor);
    }
    if (debouncedSearchTerm) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
    }

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
  }, [selectedCategory, selectedMaterial, selectedColor, debouncedSearchTerm, sortBy]);

  // Пагинация
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Сброс страницы при изменении фильтров
  const resetPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  // Функция для плавного скролла наверх
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
    resetPage();
  }, [resetPage]);

  const handleMaterialChange = useCallback((material) => {
    setSelectedMaterial(material);
    resetPage();
  }, [resetPage]);

  const handleColorChange = useCallback((color) => {
    setSelectedColor(color);
    resetPage();
  }, [resetPage]);

  const handleSearchChange = useCallback((term) => {
    setSearchTerm(term);
    // Не сбрасываем страницу для поиска, так как есть дебаунс
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header 
        onOpenFavorites={openFavorites}
        onOpenCart={openCart}
        totalFavorites={favorites.length}
        totalItems={0} // Можно добавить подсчет товаров в корзине если нужно
      />
      
      {/* Page Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <h1 className="text-3xl font-bold text-gray-900">Весь каталог</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/catalog" className="text-gray-500 hover:text-gray-700">КАТАЛОГ</Link>
            </li>
            <li className="text-gray-500">/</li>
            <li>
              <span className="text-gray-900 font-medium">ВСЕ ТОВАРЫ</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Filters row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end md:gap-6 gap-4">
            <div className="w-full md:w-56">
              <label className="block text-sm font-medium text-gray-700 mb-2">Категория</label>
              <select value={selectedCategory} onChange={(e)=>handleCategoryChange(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                <option value="all">Все товары</option>
                {categories.slice(1).map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
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
                onChange={(e)=>handleSearchChange(e.target.value)} 
                placeholder="Поиск товаров..." 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="w-full md:w-56">
              <label className="block text-sm font-medium text-gray-700 mb-2">Материал</label>
              <select value={selectedMaterial} onChange={(e)=>handleMaterialChange(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                <option value="Все">Все материалы</option>
                {[...new Set(products.map(p=>p.material))].map(m=>(<option key={m} value={m}>{m}</option>))}
              </select>
            </div>
            <div className="w-full md:w-56">
              <label className="block text-sm font-medium text-gray-700 mb-2">Цвет</label>
              <select value={selectedColor} onChange={(e)=>handleColorChange(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                <option value="Все">Все цвета</option>
                {[...new Set(products.map(p=>p.color))].map(c=>(<option key={c} value={c}>{c}</option>))}
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

        {/* Results info */}
        <div className="mb-6">
          <p className="text-gray-600">
            Показано {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} из {filteredProducts.length} товаров
          </p>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {currentProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => onAddToCart?.(product)}
              onToggleFavorite={() => onToggleFavorite?.(product.id)}
              isFavorite={favorites.includes(product.id)}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mb-8">
            <button
              onClick={() => { setCurrentPage(Math.max(1, currentPage - 1)); scrollToTop(); }}
              disabled={currentPage === 1}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Предыдущая
            </button>
            
            <div className="flex space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
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
            </div>
            
            <button
              onClick={() => { setCurrentPage(Math.min(totalPages, currentPage + 1)); scrollToTop(); }}
              disabled={currentPage === totalPages}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Следующая
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProductsPage;
