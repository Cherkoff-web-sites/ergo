import { Link } from 'react-router-dom';
// Данные передаются через props

const CatalogMain = ({ categories }) => {
  const handleCategoryClick = () => {
    // Плавный скролл наверх
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <div className="max-w-full-mob md:max-w-full-pc mx-auto py-12">
        {/* Весь каталог кнопка */}
        <div className="w-full mb-12">
          <div className="bg-transparent border border-card-border rounded-lg p-6">
            <Link
              to="/catalog/all"
              onClick={handleCategoryClick}
              className="main-catalog-button w-full text-center inline-block"
            >
              ВЕСЬ КАТАЛОГ
            </Link>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-container mx-auto">
          {categories.slice(1).map((category) => (
            <div
              key={category.id}
              className="category-card group relative block p-8 bg-transparent rounded-lg border border-card-border hover:shadow-lg transition-all duration-300"
              style={{
                '--bg-image': 'url(/img/product_example_for_app.png)'
              }}
            >
              <div className="min-h-[262px] flex items-center justify-center relative z-10">
                <Link
                  to={`/catalog/${category.id}`}
                  onClick={handleCategoryClick}
                  className="category-button w-full text-center inline-block transition-all duration-300"
                  onMouseEnter={(e) => {
                    e.target.closest('.category-card').style.setProperty('--after-opacity', '1');
                    e.target.style.setProperty('--button-bg', 'transparent');
                    e.target.style.setProperty('--button-color', 'white');
                    e.target.style.setProperty('--button-border', '1px solid white');
                  }}
                  onMouseLeave={(e) => {
                    e.target.closest('.category-card').style.setProperty('--after-opacity', '0');
                    e.target.style.setProperty('--button-bg', 'rgba(26, 24, 18, 0.05)');
                    e.target.style.setProperty('--button-color', '#1A1812');
                    e.target.style.setProperty('--button-border', '1px solid rgba(26, 24, 18, 0.32)');
                  }}
                >
                  {category.name.toUpperCase()}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatalogMain;
