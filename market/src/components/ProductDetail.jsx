import { useState } from 'react';
import { Heart, ShoppingCart, ArrowLeft, Plus, Minus } from 'lucide-react';

const ProductDetail = ({ product, onClose, onAddToCart, onToggleFavorite, isFavorite }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' р.';
  };

  const images = [
    product.image,
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop"
  ];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-light">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-text-secondary hover:text-text-main transition-colors"
          >
            <ArrowLeft size={20} />
            Назад к каталогу
          </button>
          <button
            onClick={() => onToggleFavorite(product.id)}
            className={`p-2 rounded-full transition-colors duration-200 ${
              isFavorite 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500'
            }`}
          >
            <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category */}
            <span className="text-xs text-text-secondary uppercase tracking-wide">
              {product.category}
            </span>

            {/* Name */}
            <h1 className="text-title-1 text-text-main">
              {product.name}
            </h1>


            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-title-1 font-bold text-text-main">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-body-lg text-text-secondary line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
              {product.oldPrice && (
                <span className="bg-red-100 text-red-600 text-body-sm px-2 py-1 rounded-full">
                  -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                </span>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-title-3 text-text-main mb-3">Описание</h3>
              <p className="text-body-md text-text-secondary leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Characteristics */}
            <div>
              <h3 className="text-title-3 text-text-main mb-3">Характеристики</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-between py-2 border-b border-border-light">
                  <span className="text-body-sm text-text-secondary">Материал:</span>
                  <span className="text-body-sm text-text-main font-medium">{product.material}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border-light">
                  <span className="text-body-sm text-text-secondary">Цвет:</span>
                  <span className="text-body-sm text-text-main font-medium">{product.color}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border-light">
                  <span className="text-body-sm text-text-secondary">Размер:</span>
                  <span className="text-body-sm text-text-main font-medium">{product.size}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border-light">
                  <span className="text-body-sm text-text-secondary">Наличие:</span>
                  <span className={`text-body-sm font-medium ${
                    product.inStock ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {product.inStock ? 'В наличии' : 'Нет в наличии'}
                  </span>
                </div>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-body-md text-text-main">Количество:</span>
                <div className="flex items-center border border-border-light rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-50 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-2 text-body-md font-medium min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-50 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`w-full flex items-center justify-center gap-3 py-4 px-6 rounded-lg font-medium transition-colors duration-200 ${
                  product.inStock
                    ? 'bg-primary text-white hover:bg-primary-dark'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart size={20} />
                {product.inStock ? `Добавить в корзину (${quantity})` : 'Нет в наличии'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
