import { useState } from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';

const ProductCard = ({ product, onAddToCart, onToggleFavorite, isFavorite }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
  };

  return (
    <div className="bg-white rounded-xl border border-border-light overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Изображение товара */}
      <div className="relative h-48 bg-gray-100">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Бейджи */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-primary text-white text-xs px-2 py-1 rounded-full font-medium">
              Новинка
            </span>
          )}
          {!product.inStock && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              Нет в наличии
            </span>
          )}
        </div>

        {/* Кнопка избранного */}
        <button
          onClick={() => onToggleFavorite(product.id)}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors duration-200 ${
            isFavorite 
              ? 'bg-red-500 text-white' 
              : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
          }`}
        >
          <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Информация о товаре */}
      <div className="p-4">
        {/* Категория */}
        <span className="text-xs text-text-secondary uppercase tracking-wide">
          {product.category}
        </span>

        {/* Название */}
        <h3 className="text-body-md font-medium text-text-main mt-1 mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Рейтинг */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={`${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-text-secondary ml-1">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Цена */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-bold text-text-main">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-sm text-text-secondary line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        {/* Характеристики */}
        <div className="text-xs text-text-secondary space-y-1 mb-4">
          <div>Материал: {product.material}</div>
          <div>Цвет: {product.color}</div>
          <div>Размер: {product.size}</div>
        </div>

        {/* Кнопка добавления в корзину */}
        <button
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
          className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
            product.inStock
              ? 'bg-primary text-white hover:bg-primary-dark'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <ShoppingCart size={16} />
          {product.inStock ? 'В корзину' : 'Нет в наличии'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
