import { Heart, X, ShoppingCart } from 'lucide-react';

const FavoritesModal = ({ isOpen, onClose, favorites, products, onToggleFavorite, onAddToCart }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
  };

  const favoriteProducts = products.filter(product => favorites.includes(product.id));

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Favorites Modal */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-light">
          <div className="flex items-center gap-3">
            <Heart size={24} className="text-red-500" />
            <h2 className="text-title-3 text-text-main">Избранное</h2>
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {favorites.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Favorites Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {favoriteProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Heart size={48} className="text-gray-300 mb-4" />
              <h3 className="text-body-lg text-text-main mb-2">Избранное пусто</h3>
              <p className="text-body-sm text-text-secondary">
                Добавьте товары в избранное из каталога
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {favoriteProducts.map((product) => (
                <div key={product.id} className="flex gap-4 p-4 border border-border-light rounded-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="text-body-sm font-medium text-text-main mb-1 line-clamp-2">
                      {product.name}
                    </h4>
                    <p className="text-body-sm text-text-secondary mb-2">
                      {product.category}
                    </p>
                    <p className="text-body-sm font-medium text-primary mb-3">
                      {formatPrice(product.price)}
                    </p>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => onAddToCart(product)}
                        className="flex-1 flex items-center justify-center gap-1 py-2 px-3 bg-primary text-white text-xs rounded-lg hover:bg-primary-dark transition-colors"
                      >
                        <ShoppingCart size={12} />
                        В корзину
                      </button>
                      <button
                        onClick={() => onToggleFavorite(product.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Heart size={16} fill="currentColor" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {favoriteProducts.length > 0 && (
          <div className="border-t border-border-light p-6">
            <button
              onClick={onClose}
              className="w-full py-3 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
            >
              Перейти к каталогу
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default FavoritesModal;
