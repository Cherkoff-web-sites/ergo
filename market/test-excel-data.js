// Тест для проверки Excel данных
import { excelProducts, excelCategories, excelSeries } from './src/data/excelProducts.js';

console.log('=== ТЕСТ EXCEL ДАННЫХ ===');
console.log('');

console.log('📊 ТОВАРЫ:');
console.log(`Количество: ${excelProducts.length}`);
console.log('Первые 3 товара:');
excelProducts.slice(0, 3).forEach((product, index) => {
  console.log(`${index + 1}. ${product.name}`);
  console.log(`   Цена: ${product.price} руб.`);
  console.log(`   Категория: ${product.category}`);
  console.log(`   Серия: ${product.series}`);
  console.log(`   Артикул: ${product.article}`);
  console.log('');
});

console.log('📁 КАТЕГОРИИ:');
excelCategories.forEach(category => {
  console.log(`- ${category.name}: ${category.count} товаров`);
});

console.log('');
console.log('🏷️ СЕРИИ:');
excelSeries.forEach(series => {
  console.log(`- ${series.name}: ${series.count} товаров`);
});

console.log('');
console.log('✅ ТЕСТ ЗАВЕРШЕН');
