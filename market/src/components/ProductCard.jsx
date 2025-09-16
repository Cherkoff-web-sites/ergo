import { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart, onToggleFavorite, isFavorite, onProductClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' р.';
  };

  const handleProductClick = () => {
    // Плавный скролл наверх
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    
    // Вызываем переданную функцию если есть
    if (onProductClick) {
      onProductClick();
    }
  };

  return (
    <div className="p-2.5 p-3.5 xxl:p-4 bg-transparent rounded-primary border border-[#D3D3A7] overflow-hidden NOhover:bg-[#F0F2B063] NOtransition-bg NOduration-300">
      {/* Изображение товара */}
      <div className="relative h-[calc(100vw / 2)] md:h-[calc(100vw / 4)] bg-[#ADADA0] rounded-btn overflow-hidden mb-4">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <Link to={`/product/${product.id}`} onClick={handleProductClick}>
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover cursor-pointer ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
            onLoad={() => setImageLoaded(true)}
          />
        </Link>
      </div>
        
      {/* Бейджи */}
      <div className="hidden   absolute top-3 left-3 flex flex-col gap-2">
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

      {/* Информация о товаре */}
      <div className="">
        {/* Категория */}
        <span className="hidden     text-xs text-text-secondary uppercase tracking-wide">
          {product.category}
        </span>

        <div className="flex items-center justify-between gap-2 mb-1">
          {/* Название */}
          <Link to={`/product/${product.id}`} onClick={handleProductClick}>
            <h3 className="line-clamp-1 text-sm text-lg xxl:text-xl uppercase cursor-pointer">
              {product.name}
            </h3>
          </Link>

          {/* Кнопка избранного */}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleFavorite(product.id); }}
            className={`p-2 rounded-full transition-bg duration-200 ${isFavorite ? 'bg-[#F0F2B063]' : ''}`}
          >
            <img
              src="/img/favorite.png"
              alt="Избранное"
              className={`w-5 h-5 ${isFavorite ? '' : ''}`}
            />
          </button>
        </div>


        {/* Цена */}
        <div className="flex items-center gap-2 mb-7 xxl:mb-8 font-light italic">
          <span className="text-xs md:text-base xxl:text-xl">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-sm text-text-secondary line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        {/* Характеристики */}
        <div className="hidden   text-xs text-text-secondary space-y-1 mb-4">
          <div>Материал: {product.material}</div>
          <div>Цвет: {product.color}</div>
          <div>Размер: {product.size}</div>
        </div>

        {/* Кнопки */}
        <div className="flex flex-col gap-1">
          <button
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            className={`flex-1 py-2 px-3 text-center text-text bg-[#DADBA2] uppercase rounded-btn border border-btn-border text-xs md:text-base xxl:text-lg font-semibold transition-colors duration-200 ${
              product.inStock
                ? ''
                : 'opacity-[0.5] cursor-not-allowed'
            }`}
          >
            {product.inStock ? 'В корзину' : 'Нет в наличии'}
          </button>

          <Link
            to={`/product/${product.id}`}
            onClick={handleProductClick}
            className="flex-1 py-2 px-3 text-center text-text bg-btn-bg uppercase rounded-btn border border-btn-border text-xs md:text-base xxl:text-lg font-semibold transition-colors duration-200"
          >
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
