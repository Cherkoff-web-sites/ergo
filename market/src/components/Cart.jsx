import { useState } from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';

const Cart = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onClearCart }) => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' р.';
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleOrder = () => {
    setIsOrderModalOpen(true);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-light">
          <div className="flex items-center gap-3">
            <ShoppingCart size={24} className="text-primary" />
            <h2 className="text-title-3 text-text-main">Корзина</h2>
            <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
              {totalItems}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingCart size={48} className="text-gray-300 mb-4" />
              <h3 className="text-body-lg text-text-main mb-2">Корзина пуста</h3>
              <p className="text-body-sm text-text-secondary">
                Добавьте товары из каталога
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 border border-border-light rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="text-body-sm font-medium text-text-main mb-1 line-clamp-2">
                      {item.name}
                    </h4>
                    <p className="text-body-sm text-text-secondary mb-2">
                      {formatPrice(item.price)}
                    </p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-body-sm font-medium min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                    <span className="text-body-sm font-medium text-text-main">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-border-light p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-body-lg font-medium text-text-main">Итого:</span>
              <span className="text-title-3 font-bold text-primary">
                {formatPrice(totalPrice)}
              </span>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={onClearCart}
                className="flex-1 py-3 px-4 border border-border-light text-text-main rounded-lg hover:bg-gray-50 transition-colors"
              >
                Очистить
              </button>
              <button
                onClick={handleOrder}
                className="flex-1 py-3 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
              >
                Оформить заказ
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Order Modal */}
      {isOrderModalOpen && (
        <OrderModal
          isOpen={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
          cartItems={cartItems}
          totalPrice={totalPrice}
          onOrderSuccess={() => {
            console.log('Order success callback triggered');
            setIsOrderModalOpen(false);
            onClearCart();
            // Показываем окно благодарности БЕЗ закрытия корзины
            console.log('Showing thank you modal');
            setIsThankYouModalOpen(true);
          }}
        />
      )}

      {/* Thank You Modal */}
      {isThankYouModalOpen && (
        <ThankYouModal
          isOpen={isThankYouModalOpen}
          onClose={() => {
            setIsThankYouModalOpen(false);
            onClose(); // Закрываем корзину после закрытия окна благодарности
          }}
        />
      )}
    </>
  );
};

// Order Modal Component
const OrderModal = ({ isOpen, onClose, cartItems, totalPrice, onOrderSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    comment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Имитация отправки заказа
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Здесь будет реальная отправка на email
      console.log('Заказ отправлен:', { formData, cartItems, totalPrice });
      
      // Только после успешной отправки показываем окно благодарности
      console.log('Form submitted successfully, calling onOrderSuccess');
      onOrderSuccess();
    } catch (error) {
      console.error('Ошибка при отправке заказа:', error);
      // Здесь можно показать сообщение об ошибке
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-title-3 text-text-main mb-6">Оформление заказа</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-body-sm font-medium text-text-main mb-2">
                Имя *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-border-light rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-body-sm font-medium text-text-main mb-2">
                Телефон *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-3 border border-border-light rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-body-sm font-medium text-text-main mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-border-light rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-body-sm font-medium text-text-main mb-2">
                Адрес доставки
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className="w-full p-3 border border-border-light rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-body-sm font-medium text-text-main mb-2">
                Комментарий к заказу
              </label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                rows={3}
                className="w-full p-3 border border-border-light rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 border border-border-light text-text-main rounded-lg hover:bg-gray-50 transition-colors"
              >
                Отмена
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium disabled:opacity-50"
              >
                {isSubmitting ? 'Отправка...' : 'Отправить заказ'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Thank You Modal Component
const ThankYouModal = ({ isOpen, onClose }) => {
  console.log('ThankYouModal render - isOpen:', isOpen);
  if (!isOpen) {
    console.log('ThankYouModal not rendering - isOpen is false');
    return null;
  }

  console.log('ThankYouModal rendering modal content');
  return (
    <div 
      className="fixed inset-0 bg-black/50 z-[80] flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-lg max-w-md w-full p-6 text-center">
        <div className="mb-4">
          <svg className="w-16 h-16 text-primary mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 className="text-xl font-bold text-text-main mb-4">Спасибо за заказ!</h3>
        <p className="text-gray-600 mb-6">Ваш заказ принят в обработку. Мы свяжемся с вами в ближайшее время для уточнения деталей.</p>
        <button
          onClick={onClose}
          className="w-full bg-primary hover:bg-[#037D44] text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200"
        >
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default Cart;
