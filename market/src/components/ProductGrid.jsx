import ProductCard from './ProductCard';

const ProductGrid = ({ products, onAddToCart, onToggleFavorite, favorites, onProductClick }) => {
  if (products.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-title-3 text-text-main mb-2">Товары не найдены</h3>
        <p className="text-body-md text-text-secondary text-center max-w-md">
          Попробуйте изменить параметры поиска или фильтры
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onToggleFavorite={onToggleFavorite}
          isFavorite={favorites.includes(product.id)}
          onProductClick={onProductClick}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
