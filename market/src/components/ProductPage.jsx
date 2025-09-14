import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
// Данные передаются через props
import { ArrowLeft, ShoppingCart, Heart } from 'lucide-react';
import Header from './Header';

const ProductPage = ({ products, categories, series, onAddToCart, onToggleFavorite, favorites = [], openCart, openFavorites, totalFavorites, totalItems }) => {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  const product = products.find(p => p.id === parseInt(productId));
  const category = categories.find(cat => cat.name === product?.category);
  const seriesItem = series.find(s => s.id === product?.series);


  // Получаем товары той же серии для отображения внизу
  const seriesProducts = products.filter(
    p => p.series === product?.series && p.id !== product?.id
  );

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

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Товар не найден</h1>
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
      
      {/* Page Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <Link
              to={category ? `/catalog/${category.id}` : '/catalog'}
              className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
            >
              <ArrowLeft size={20} className="mr-2" />
              Назад
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
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
              <Link to={`/catalog/${category?.id}`} onClick={handleBreadcrumbClick} className="text-gray-500 hover:text-gray-700">
                {category?.name.toUpperCase()}
              </Link>
            </li>
            {seriesItem && (
              <>
                <li className="text-gray-500">/</li>
                <li>
                  <Link 
                    to={`/catalog/${category?.id}/series/${seriesItem.id}`} 
                    onClick={handleBreadcrumbClick}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    СЕРИЯ "{seriesItem.name}"
                  </Link>
                </li>
              </>
            )}
            <li className="text-gray-500">/</li>
            <li>
              <span className="text-gray-900 font-medium">{product.name.toUpperCase()}</span>
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
                  cat.id === category?.id
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
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Product Info */}
            <div className="mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Product Image Slider */}
                <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain"
                  />
                  {/* Slider arrows placeholder */}
                  <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center cursor-pointer">
                    <span className="text-gray-600">‹</span>
                  </div>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center cursor-pointer">
                    <span className="text-gray-600">›</span>
                  </div>
                </div>

                {/* Product Info */}
                <div>
                  <div className="flex items-center mb-2">
                    <span className="text-sm text-gray-500 uppercase tracking-wide">
                      {product.category}
                    </span>
                    {seriesItem && (
                      <>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="text-sm text-primary font-medium">
                          Серия {seriesItem.name}
                        </span>
                      </>
                    )}
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {product.name}
                  </h2>
                  

                  {/* Price */}
                  <div className="flex items-center mb-6">
                    <span className="text-3xl font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                    {product.oldPrice && (
                      <span className="text-lg text-gray-500 line-through ml-3">
                        {formatPrice(product.oldPrice)}
                      </span>
                    )}
                    {product.isNew && (
                      <span className="bg-primary text-white text-xs px-2 py-1 rounded-full ml-3">
                        Новинка
                      </span>
                    )}
                  </div>

                  {/* Characteristics */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Характеристики</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Материал:</span>
                        <span className="font-medium">{product.material}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Цвет:</span>
                        <span className="font-medium">{product.color}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Размер:</span>
                        <span className="font-medium">{product.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Категория:</span>
                        <span className="font-medium">{product.category}</span>
                      </div>
                      {seriesItem && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Серия:</span>
                          <span className="font-medium">{seriesItem.name}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Color Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Цвет: {selectedColor || product.color}
                    </label>
                    <div className="flex space-x-2">
                      {[product.color, 'Белый', 'Черный'].map((color, index) => (
                        <button
                          key={`color-${index}-${color}`}
                          onClick={() => setSelectedColor(color)}
                          className={`w-8 h-8 rounded-full border-2 ${
                            (selectedColor || product.color) === color
                              ? 'border-primary'
                              : 'border-gray-300'
                          }`}
                          style={{ backgroundColor: color === 'Серый' ? '#6B7280' : color === 'Белый' ? '#FFFFFF' : '#000000' }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Size Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Размер: {selectedSize || product.size}
                    </label>
                    <div className="flex space-x-2">
                      {[product.size, '500X700', '600X800'].map((size, index) => (
                        <button
                          key={`size-${index}-${size}`}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 border rounded-lg text-sm ${
                            (selectedSize || product.size) === size
                              ? 'border-primary bg-primary text-white'
                              : 'border-gray-300 text-gray-700 hover:border-gray-400'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Количество
                    </label>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                      >
                        -
                      </button>
                      <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                  </div>



                  {/* Action Buttons */}
                  <div className="space-y-4">
                    <button
                      disabled={!product.inStock}
                      onClick={() => { if (product.inStock) { onAddToCart?.(product, quantity); } }}
                      className={`w-full flex items-center justify-center gap-3 py-4 px-6 rounded-lg font-medium transition-colors duration-200 ${
                        product.inStock
                          ? 'bg-primary text-white hover:bg-primary-dark'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingCart size={20} />
                      {product.inStock ? 'В корзину' : 'Нет в наличии'}
                    </button>
                    
                    <button onClick={() => onToggleFavorite?.(product.id)} className="w-full flex items-center justify-center gap-3 py-4 px-6 border border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-colors duration-200">
                      <Heart size={20} />
                      В избранное
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Products Section */}
            {seriesProducts.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Товары серии ({seriesProducts.length})
                  </h2>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {seriesProducts.map((relatedProduct) => (
                    <Link key={relatedProduct.id} to={`/product/${relatedProduct.id}`} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 block">
                      {/* Product Image */}
                      <div className="relative h-48 bg-gray-100">
                        <img
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Favorite Button */}
                        <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleFavorite?.(relatedProduct.id); }} className={`absolute top-3 right-3 p-2 rounded-full transition-colors duration-200 ${favorites.includes(relatedProduct.id) ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'}`}>
                          <Heart size={16} />
                        </button>
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <h3 className="text-body-md font-medium text-text-main mb-2 line-clamp-2">
                          {relatedProduct.name}
                        </h3>
                        
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-lg font-bold text-text-main">
                            {formatPrice(relatedProduct.price)}
                          </span>
                        </div>

                        <button onClick={(e) => { e.preventDefault(); onAddToCart?.(relatedProduct, 1); }} className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200 font-medium">
                          <ShoppingCart size={16} />
                          В корзину
                        </button>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;