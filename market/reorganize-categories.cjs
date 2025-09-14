// Скрипт для полной реорганизации категорий в правильном порядке

const fs = require('fs');

// Читаем новые данные
const newData = JSON.parse(fs.readFileSync('new-categories-data.json', 'utf8'));

// Читаем существующий файл
let excelContent = fs.readFileSync('src/data/excelProducts.js', 'utf8');

// Новый порядок категорий
const reorganizedCategories = [
  {
    "id": "all",
    "name": "Все товары",
    "count": 3593 // 3373 + 220 новых товаров
  },
  {
    "id": "boss_cabinet",
    "name": "Кабинет руководителя",
    "count": 65
  },
  {
    "id": "personnel_furniture",
    "name": "Мебель для персонала",
    "count": 78
  },
  {
    "id": "kresla_i_stulya",
    "name": "Кресла и стулья",
    "count": 377
  },
  {
    "id": "soft_furniture",
    "name": "Мягкая мебель",
    "count": 42
  },
  {
    "id": "peregovornye_stoly",
    "name": "Переговорные столы",
    "count": 52
  },
  {
    "id": "reception_furniture",
    "name": "Стойки ресепшен", // Переименовали
    "count": 38
  },
  {
    "id": "custom_furniture",
    "name": "Мебель на заказ",
    "count": 35
  },
  {
    "id": "drugoe",
    "name": "Другое",
    "count": 2861
  }
];

// Находим начало и конец массива excelCategories
const categoriesStartIndex = excelContent.indexOf('export const excelCategories = [');
const categoriesEndIndex = excelContent.indexOf('];', categoriesStartIndex) + 2;

// Создаем новую строку с категориями
let newCategoriesString = 'export const excelCategories = [\n';
reorganizedCategories.forEach((category, index) => {
  newCategoriesString += '  ' + JSON.stringify(category, null, 2).replace(/\n/g, '\n  ');
  if (index < reorganizedCategories.length - 1) {
    newCategoriesString += ',';
  }
  newCategoriesString += '\n';
});
newCategoriesString += '];\n';

// Заменяем массив категорий
const newContent = excelContent.slice(0, categoriesStartIndex) + newCategoriesString + excelContent.slice(categoriesEndIndex);

// Теперь добавим новые серии
const seriesStartIndex = newContent.indexOf('export const excelSeries = [');
const seriesEndIndex = newContent.indexOf('];', seriesStartIndex) + 2;

// Добавляем новые серии к существующим
let newSeriesString = 'export const excelSeries = [\n';
// Сначала существующие серии (кроме тех, что мы добавили ранее)
const existingSeries = [
  { "id": "H", "name": "H", "count": 39, "description": "Серия H - 39 товаров" },
  { "id": "HLC", "name": "HLC", "count": 3, "description": "Серия HLC - 3 товаров" },
  { "id": "EQ", "name": "EQ", "count": 6, "description": "Серия EQ - 6 товаров" },
  { "id": "V", "name": "V", "count": 3, "description": "Серия V - 3 товаров" },
  { "id": "HAD", "name": "HAD", "count": 4, "description": "Серия HAD - 4 товаров" },
  { "id": "NS", "name": "NS", "count": 3, "description": "Серия NS - 3 товаров" },
  { "id": "A1", "name": "A1", "count": 15, "description": "Серия A1 - 15 товаров" },
  { "id": "A2", "name": "A2", "count": 15, "description": "Серия A2 - 15 товаров" },
  { "id": "A3", "name": "A3", "count": 15, "description": "Серия A3 - 15 товаров" },
  { "id": "R1", "name": "R1", "count": 12, "description": "Серия R1 - 12 товаров" },
  { "id": "R2", "name": "R2", "count": 13, "description": "Серия R2 - 13 товаров" },
  { "id": "R3", "name": "R3", "count": 13, "description": "Серия R3 - 13 товаров" }
];

// Добавляем существующие серии
existingSeries.forEach((series, index) => {
  newSeriesString += '  ' + JSON.stringify(series, null, 2).replace(/\n/g, '\n  ');
  newSeriesString += ',';
  newSeriesString += '\n';
});

// Добавляем новые серии
newData.series.forEach((series, index) => {
  newSeriesString += '  ' + JSON.stringify(series, null, 2).replace(/\n/g, '\n  ');
  if (index < newData.series.length - 1) {
    newSeriesString += ',';
  }
  newSeriesString += '\n';
});
newSeriesString += '];\n';

// Заменяем массив серий
const finalContent = newContent.slice(0, seriesStartIndex) + newSeriesString + newContent.slice(seriesEndIndex);

// Теперь добавим новые товары в конец массива excelProducts
const productsEndIndex = finalContent.lastIndexOf('];\n\nexport const excelCategories');
const newProductsString = ',\n' + newData.products.map(product => 
  '  ' + JSON.stringify(product, null, 2).replace(/\n/g, '\n  ')
).join(',\n') + '\n';

const finalContentWithProducts = finalContent.slice(0, productsEndIndex) + newProductsString + '];' + finalContent.slice(productsEndIndex + 2);

// Записываем обновленный файл
fs.writeFileSync('src/data/excelProducts.js', finalContentWithProducts, 'utf8');

console.log('Категории реорганизованы в правильном порядке:');
reorganizedCategories.forEach((cat, index) => {
  console.log(`${index + 1}. ${cat.name} (${cat.count} товаров)`);
});
console.log(`\nДобавлено ${newData.products.length} новых товаров`);
console.log(`Добавлено ${newData.series.length} новых серий`);
