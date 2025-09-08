import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const AllProductsPage = ({ products, categories, series, onAddToCart, onToggleFavorite, favorites = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMaterial, setSelectedMaterial] = useState('Все');
  const [selectedColor, setSelectedColor] = useState('Все');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

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
    if (searchTerm) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

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
  }, [selectedCategory, selectedMaterial, selectedColor, searchTerm, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Весь каталог</h1>
          </div>
        </div>
      </div>

      <div className="bg-gray-100">
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
      </div>

      {/* Filters row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-end md:gap-6 gap-4">
            <div className="w-full md:w-56">
              <label className="block text-sm font-medium text-gray-700 mb-2">Категория</label>
              <select value={selectedCategory} onChange={(e)=>setSelectedCategory(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                <option value="all">Все товары</option>
                {categories.slice(1).map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Поиск</label>
              <input type="text" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder="Поиск товаров..." className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"/>
            </div>
            <div className="w-full md:w-56">
              <label className="block text-sm font-medium text-gray-700 mb-2">Материал</label>
              <select value={selectedMaterial} onChange={(e)=>setSelectedMaterial(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                <option value="Все">Все материалы</option>
                {[...new Set(products.map(p=>p.material))].map(m=>(<option key={m} value={m}>{m}</option>))}
              </select>
            </div>
            <div className="w-full md:w-56">
              <label className="block text-sm font-medium text-gray-700 mb-2">Цвет</label>
              <select value={selectedColor} onChange={(e)=>setSelectedColor(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
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
                <option value="rating">По рейтингу</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => onAddToCart?.(product)}
              onToggleFavorite={() => onToggleFavorite?.(product.id)}
              isFavorite={favorites.includes(product.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProductsPage;
