import { useState } from 'react';
import { Filter, X } from 'lucide-react';

const Filters = ({ 
  categories, 
  materials, 
  colors, 
  selectedCategory, 
  selectedMaterial, 
  selectedColor,
  priceRange,
  onCategoryChange,
  onMaterialChange,
  onColorChange,
  onPriceRangeChange,
  onResetFilters
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handlePriceChange = (type, value) => {
    const newRange = { ...priceRange, [type]: parseInt(value) || 0 };
    onPriceRangeChange(newRange);
  };

  return (
    <div className="bg-white rounded-xl border border-border-light p-6">
      {/* Заголовок фильтров */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-primary" />
          <h3 className="text-title-3 text-text-main">Фильтры</h3>
        </div>
        <button
          onClick={onResetFilters}
          className="text-sm text-primary hover:text-primary-dark transition-colors"
        >
          Сбросить все
        </button>
      </div>

      {/* Категории */}
      <div className="mb-6">
        <h4 className="text-body-md font-medium text-text-main mb-3">Категория</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="category"
                value={category.id}
                checked={selectedCategory === category.id}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
              />
              <span className="text-body-sm text-text-main flex-1">
                {category.name}
              </span>
              <span className="text-xs text-text-secondary">
                ({category.count})
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Материал */}
      <div className="mb-6">
        <h4 className="text-body-md font-medium text-text-main mb-3">Материал</h4>
        <select
          value={selectedMaterial}
          onChange={(e) => onMaterialChange(e.target.value)}
          className="w-full p-3 border border-border-light rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        >
          {materials.map((material) => (
            <option key={material} value={material}>
              {material}
            </option>
          ))}
        </select>
      </div>

      {/* Цвет */}
      <div className="mb-6">
        <h4 className="text-body-md font-medium text-text-main mb-3">Цвет</h4>
        <select
          value={selectedColor}
          onChange={(e) => onColorChange(e.target.value)}
          className="w-full p-3 border border-border-light rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        >
          {colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>

      {/* Цена */}
      <div className="mb-6">
        <h4 className="text-body-md font-medium text-text-main mb-3">Цена</h4>
        <div className="space-y-3">
          <div className="flex gap-3">
            <input
              type="number"
              placeholder="От"
              value={priceRange.min || ''}
              onChange={(e) => handlePriceChange('min', e.target.value)}
              className="flex-1 p-3 border border-border-light rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
            <input
              type="number"
              placeholder="До"
              value={priceRange.max || ''}
              onChange={(e) => handlePriceChange('max', e.target.value)}
              className="flex-1 p-3 border border-border-light rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <div className="text-xs text-text-secondary">
            Диапазон: {priceRange.min || 0} - {priceRange.max || '∞'} ₽
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
