// Тест изображений
import { excelProducts } from './src/data/excelProducts.js';

console.log('=== ТЕСТ ИЗОБРАЖЕНИЙ ===');

// Проверяем все изображения
const allImages = excelProducts.map(p => p.image);
const uniqueImages = [...new Set(allImages)];

console.log(`Всего товаров: ${excelProducts.length}`);
console.log(`Уникальных изображений: ${uniqueImages.length}`);

console.log('\n=== ВСЕ УНИКАЛЬНЫЕ ИЗОБРАЖЕНИЯ ===');
uniqueImages.forEach((img, i) => {
  console.log(`${i+1}. ${img}`);
});

console.log('\n=== ПЕРВЫЕ 10 ТОВАРОВ С ИЗОБРАЖЕНИЯМИ ===');
excelProducts.slice(0, 10).forEach((p, i) => {
  console.log(`${i+1}. ${p.name} - ${p.image}`);
});

// Проверяем типы изображений
const defaultImages = excelProducts.filter(p => p.image === '/img/product_example_for_app.png');
const customImages = excelProducts.filter(p => p.image !== '/img/product_example_for_app.png');

console.log(`\n=== СТАТИСТИКА ===`);
console.log(`Изображения по умолчанию: ${defaultImages.length}`);
console.log(`Кастомные изображения: ${customImages.length}`);

if (customImages.length > 0) {
  console.log('\n=== ПРИМЕРЫ КАСТОМНЫХ ИЗОБРАЖЕНИЙ ===');
  customImages.slice(0, 5).forEach((p, i) => {
    console.log(`${i+1}. ${p.name} - ${p.image}`);
  });
}
