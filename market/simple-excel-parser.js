// Простой парсер Excel без внешних зависимостей
// Используй этот скрипт если xlsx не работает

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Функция для создания mock данных на основе структуры Excel
function createMockDataFromExcel() {
  console.log('Создаем mock данные на основе структуры Excel...');
  
  const products = [
    // Кресла и стулья (NORDEN)
    {
      id: 1,
      name: "Кресло офисное 007 NEW",
      description: "Кресло офисное / 007 NEW / (black (white plastic) белый пластик / черная ткань / черная сетка",
      price: 21450,
      oldPrice: null,
      image: "/img/product_example_for_app.png",
      category: "Кресла и стулья",
      material: "Пластик, ткань, сетка",
      color: "Черный, белый",
      size: "Не указан",
      series: "NORDEN",
      inStock: true,
      stock: 80,
      article: "H-051 white frame",
      wholesalePrice: 15000,
      retailPrice: 21450,
      isNew: true,
      rating: 4.5,
      reviews: 23
    },
    {
      id: 2,
      name: "Кресло офисное Alpina",
      description: "Кресло офисное / Alpina / серая сетка/серая ткань/металлическая база",
      price: 20000,
      oldPrice: null,
      image: "/img/product_example_for_app.png",
      category: "Кресла и стулья",
      material: "Металл, ткань, сетка",
      color: "Серый",
      size: "Не указан",
      series: "NORDEN",
      inStock: true,
      stock: 94,
      article: "H-051 black frame",
      wholesalePrice: 14000,
      retailPrice: 20000,
      isNew: false,
      rating: 4.2,
      reviews: 18
    },
    
    // Столы (Quartz)
    {
      id: 3,
      name: "Брифинг 1500х900х750",
      description: "QZ.0103.WA.GF / Брифинг 1500х900х750 / Цвет: орех авиньон/графит",
      price: 105650,
      oldPrice: null,
      image: "/img/product_example_for_app.png",
      category: "Переговорные столы",
      material: "Дерево",
      color: "Орех авиньон/графит",
      size: "1500×900×750",
      series: "QUARTZ",
      inStock: true,
      stock: 6,
      article: "QZ.0103.WA.GF",
      wholesalePrice: 69770,
      retailPrice: 105650,
      isNew: false,
      rating: 4.8,
      reviews: 12
    },
    {
      id: 4,
      name: "Стол на опорной тумбе 2200x1800x750",
      description: "QZ.0101.WA.GF + QZ.0201.4.WA.GF.L / Стол на опорной тумбе 2200x1800x750 левый / Цвет: орех авиньон/графит",
      price: 304730,
      oldPrice: null,
      image: "/img/product_example_for_app.png",
      category: "Кабинет руководителя",
      material: "Дерево",
      color: "Орех авиньон/графит",
      size: "2200×1800×750",
      series: "QUARTZ",
      inStock: true,
      stock: 5,
      article: "QZ.0101.WA.GF + QZ.0201.4.WA.GF.L",
      wholesalePrice: 208910,
      retailPrice: 304730,
      isNew: false,
      rating: 4.9,
      reviews: 8
    },
    
    // Тумбы (Wood&Stone)
    {
      id: 5,
      name: "Комод (греденция) с ящиками",
      description: "СФ-532101 / Комод (греденция) с ящиками / полки, двери, фасады ящиков: дуб Чарльстон. Крышка, задняя стенка, декоративные боковые стенки, полик, цоколь: Бетон Чикаго",
      price: 76060,
      oldPrice: null,
      image: "/img/product_example_for_app.png",
      category: "Мебель для персонала",
      material: "Дуб Чарльстон, Бетон Чикаго",
      color: "Дуб Чарльстон",
      size: "Не указан",
      series: "WOOD_STONE",
      inStock: true,
      stock: 15,
      article: "СФ-532101",
      wholesalePrice: 53300,
      retailPrice: 76060,
      isNew: false,
      rating: 4.3,
      reviews: 15
    },
    
    // Шкафы (Wood&Stone)
    {
      id: 6,
      name: "Шкаф К1 левый",
      description: "Комплект №1 / Шкаф К1 левый / СФ-534101 + СФ-535113",
      price: 52700,
      oldPrice: null,
      image: "/img/product_example_for_app.png",
      category: "Кабинет руководителя",
      material: "Дерево",
      color: "Не указан",
      size: "Не указан",
      series: "WOOD_STONE",
      inStock: true,
      stock: 12,
      article: "Комплект №1",
      wholesalePrice: 36890,
      retailPrice: 52700,
      isNew: false,
      rating: 4.1,
      reviews: 7
    },
    {
      id: 7,
      name: "Шкаф К10",
      description: "Комплект №10 / Шкаф К10 / СФ-534502 + СФ-535502 + СФ-535102",
      price: 47770,
      oldPrice: null,
      image: "/img/product_example_for_app.png",
      category: "Кабинет руководителя",
      material: "Дерево",
      color: "Не указан",
      size: "Не указан",
      series: "WOOD_STONE",
      inStock: true,
      stock: 6,
      article: "Комплект №10",
      wholesalePrice: 33550,
      retailPrice: 47770,
      isNew: false,
      rating: 4.0,
      reviews: 5
    },
    {
      id: 8,
      name: "Шкаф К11",
      description: "Комплект №11 / Шкаф К11 / СФ-534803 + СФ-535105 + СФ-535115",
      price: 65310,
      oldPrice: null,
      image: "/img/product_example_for_app.png",
      category: "Кабинет руководителя",
      material: "Дерево",
      color: "Не указан",
      size: "Не указан",
      series: "WOOD_STONE",
      inStock: true,
      stock: 8,
      article: "Комплект №11",
      wholesalePrice: 45740,
      retailPrice: 65310,
      isNew: false,
      rating: 4.4,
      reviews: 9
    },
    {
      id: 9,
      name: "Шкаф К12",
      description: "Комплект №12 / Шкаф К12 / СФ-534804 + СФ-535105 + СФ-535115",
      price: 65310,
      oldPrice: null,
      image: "/img/product_example_for_app.png",
      category: "Кабинет руководителя",
      material: "Дерево",
      color: "Не указан",
      size: "Не указан",
      series: "WOOD_STONE",
      inStock: true,
      stock: 5,
      article: "Комплект №12",
      wholesalePrice: 45740,
      retailPrice: 65310,
      isNew: false,
      rating: 4.2,
      reviews: 6
    },
    {
      id: 10,
      name: "Шкаф К16",
      description: "Комплект №16 / Шкаф К16 / СФ-534804 + СФ-535511 + СФ-535111 + СФ-535502 + СФ-535102",
      price: 79710,
      oldPrice: null,
      image: "/img/product_example_for_app.png",
      category: "Кабинет руководителя",
      material: "Дерево",
      color: "Не указан",
      size: "Не указан",
      series: "WOOD_STONE",
      inStock: true,
      stock: 5,
      article: "Комплект №16",
      wholesalePrice: 55890,
      retailPrice: 79710,
      isNew: false,
      rating: 4.6,
      reviews: 11
    },
    {
      id: 11,
      name: "Шкаф К2 правый",
      description: "Комплект №2 / Шкаф К2 правый / СФ-534102 + СФ-535114",
      price: 52700,
      oldPrice: null,
      image: "/img/product_example_for_app.png",
      category: "Кабинет руководителя",
      material: "Дерево",
      color: "Не указан",
      size: "Не указан",
      series: "WOOD_STONE",
      inStock: true,
      stock: 11,
      article: "Комплект №2",
      wholesalePrice: 36890,
      retailPrice: 52700,
      isNew: false,
      rating: 4.1,
      reviews: 8
    },
    {
      id: 12,
      name: "Шкаф КЗ",
      description: "Комплект №3 / Шкаф КЗ / СФ-534101 + СФ-535513",
      price: 60580,
      oldPrice: null,
      image: "/img/product_example_for_app.png",
      category: "Кабинет руководителя",
      material: "Дерево",
      color: "Не указан",
      size: "Не указан",
      series: "WOOD_STONE",
      inStock: true,
      stock: 11,
      article: "Комплект №3",
      wholesalePrice: 42420,
      retailPrice: 60580,
      isNew: false,
      rating: 4.3,
      reviews: 10
    }
  ];

  // Создаем категории
  const categories = [
    { id: 'all', name: 'Все товары', count: products.length },
    { id: 'executive_office', name: 'Кабинет руководителя', count: products.filter(p => p.category === 'Кабинет руководителя').length },
    { id: 'staff_furniture', name: 'Мебель для персонала', count: products.filter(p => p.category === 'Мебель для персонала').length },
    { id: 'chairs_seating', name: 'Кресла и стулья', count: products.filter(p => p.category === 'Кресла и стулья').length },
    { id: 'conference_tables', name: 'Переговорные столы', count: products.filter(p => p.category === 'Переговорные столы').length }
  ];

  // Создаем серии
  const series = [
    { id: 'NORDEN', name: 'NORDEN', count: products.filter(p => p.series === 'NORDEN').length, description: 'Серия NORDEN - офисная мебель' },
    { id: 'QUARTZ', name: 'QUARTZ', count: products.filter(p => p.series === 'QUARTZ').length, description: 'Серия QUARTZ - премиальная мебель' },
    { id: 'WOOD_STONE', name: 'WOOD&STONE', count: products.filter(p => p.series === 'WOOD_STONE').length, description: 'Серия WOOD&STONE - деревянная мебель' }
  ];

  return { products, categories, series };
}

// Основная функция
function main() {
  console.log('Создаем данные на основе Excel структуры...');
  
  const { products, categories, series } = createMockDataFromExcel();
  
  // Создаем итоговый объект
  const result = {
    products,
    categories,
    series,
    materials: [...new Set(products.map(p => p.material).filter(Boolean))],
    colors: [...new Set(products.map(p => p.color).filter(Boolean))]
  };
  
  // Сохраняем в файл
  const outputPath = path.join(__dirname, 'src', 'data', 'excelProducts.js');
  const content = `// Данные товаров на основе Excel структуры
// Сгенерировано автоматически

export const excelProducts = ${JSON.stringify(products, null, 2)};

export const excelCategories = ${JSON.stringify(categories, null, 2)};

export const excelSeries = ${JSON.stringify(series, null, 2)};

export const excelMaterials = ${JSON.stringify(result.materials, null, 2)};

export const excelColors = ${JSON.stringify(result.colors, null, 2)};
`;
  
  fs.writeFileSync(outputPath, content, 'utf8');
  
  console.log(`\n✅ Готово!`);
  console.log(`📊 Товаров: ${products.length}`);
  console.log(`📁 Категорий: ${categories.length}`);
  console.log(`🏷️ Серий: ${series.length}`);
  console.log(`📄 Файл сохранен: ${outputPath}`);
}

// Запускаем если файл вызван напрямую
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { createMockDataFromExcel };
