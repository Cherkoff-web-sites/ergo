// Простой тест Excel скрипта
import { parseExcelToJSON, createCategories, createSeries } from './excel-to-json.js';

console.log('=== ТЕСТ EXCEL СКРИПТА ===');

const excelFilePath = './catalog.xlsx';
console.log(`Проверяем файл: ${excelFilePath}`);

try {
  const products = parseExcelToJSON(excelFilePath);
  console.log(`Найдено товаров: ${products.length}`);
  
  if (products.length > 0) {
    const categories = createCategories(products);
    const series = createSeries(products);
    
    console.log(`Категорий: ${categories.length}`);
    console.log(`Серий: ${series.length}`);
    
    console.log('\nПервые 3 товара:');
    products.slice(0, 3).forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} (${product.article}) - ${product.price}₽`);
    });
  }
} catch (error) {
  console.error('Ошибка:', error.message);
}
