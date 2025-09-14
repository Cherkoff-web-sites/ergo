// Скрипт для извлечения товаров из JSON и добавления в excelProducts.js

const fs = require('fs');

// Читаем наш сгенерированный файл
const randomData = JSON.parse(fs.readFileSync('random-data-fixed.json', 'utf8'));

// Извлекаем только массив товаров
const products = randomData.products;

// Читаем существующий файл excelProducts.js
let excelContent = fs.readFileSync('src/data/excelProducts.js', 'utf8');

// Находим конец массива excelProducts (перед export const excelCategories)
const productsEndIndex = excelContent.lastIndexOf('];\n\nexport const excelCategories');

// Создаем строку с новыми товарами
let newProductsString = ',\n';
products.forEach((product, index) => {
  newProductsString += '  ' + JSON.stringify(product, null, 2).replace(/\n/g, '\n  ');
  if (index < products.length - 1) {
    newProductsString += ',';
  }
  newProductsString += '\n';
});

// Вставляем новые товары перед закрывающей скобкой массива
const newContent = excelContent.slice(0, productsEndIndex) + newProductsString + '];' + excelContent.slice(productsEndIndex + 2);

// Записываем обновленный файл
fs.writeFileSync('src/data/excelProducts.js', newContent, 'utf8');

console.log(`Добавлено ${products.length} новых товаров в excelProducts.js`);
