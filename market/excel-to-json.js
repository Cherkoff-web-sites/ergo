// Скрипт для конвертации Excel таблицы в JSON для каталога
// Установи зависимости: npm install xlsx

import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Функция для парсинга Excel файла
function parseExcelToJSON(excelFilePath) {
  try {
    // Читаем Excel файл
    const workbook = XLSX.readFile(excelFilePath);
    const products = [];
    
    // Проходим по всем листам
    workbook.SheetNames.forEach(sheetName => {
      console.log(`Обрабатываем лист: ${sheetName}`);
      
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      
      // Пропускаем заголовки (первые 3-4 строки)
      const dataRows = jsonData.slice(4);
      
      dataRows.forEach((row, index) => {
        if (row.length < 5) return; // Пропускаем пустые строки
        
        try {
          const product = parseProductRow(row, sheetName, index + 1);
          if (product) {
            products.push(product);
          }
        } catch (error) {
          console.warn(`Ошибка парсинга строки ${index + 1} в листе ${sheetName}:`, error.message);
        }
      });
    });
    
    console.log(`Всего товаров обработано: ${products.length}`);
    return products;
    
  } catch (error) {
    console.error('Ошибка чтения Excel файла:', error);
    return [];
  }
}

// Функция для парсинга одной строки товара
function parseProductRow(row, sheetName, rowIndex) {
  // Структура колонок (на основе анализа таблицы):
  // A - Фото (изображение)
  // B - Артикул
  // C - Номенклатура (название + описание)
  // D - Оптовая цена
  // E - МРЦ (розничная цена)
  // F-I - Остатки по складам
  
  const imagePath = row[0]; // Путь к изображению (колонка A)
  const article = row[1]; // Артикул (колонка B) - оставляем для ID
  const columnB = row[1]; // Колонка B - дублируем для фильтрации
  const nomenclature = row[2]; // Номенклатура (колонка C)
  const wholesalePrice = parseFloat(row[3]) || 0; // Оптовая цена (колонка D)
  const retailPrice = parseFloat(row[4]) || 0; // МРЦ (колонка E)
  const price = parseFloat(row[7]) || 0; // Основная цена (колонка H)
  const stock = parseInt(row[9]) || 0; // Остаток на основном складе (колонка J)
  
  // Пропускаем строки без номенклатуры
  if (!nomenclature) return null;
  
  // Парсим название и описание из номенклатуры, исключая данные из колонки B
  const { name, description, material, color, dimensions } = parseNomenclature(nomenclature, columnB);
  
  // Определяем категорию по листу
  const category = mapSheetToCategory(sheetName);
  
  // Определяем серию по артикулу или листу
  const series = extractSeries(article, sheetName);
  
  // Обрабатываем путь к изображению
  const image = processImagePath(imagePath, article);
  
  return {
    id: generateId(article, rowIndex),
    name: name || nomenclature.substring(0, 50),
    description: description || nomenclature,
    price: price || retailPrice || wholesalePrice,
    oldPrice: retailPrice > wholesalePrice ? retailPrice : null,
    image: image,
    category: category,
    material: material || 'Не указан',
    color: color || 'Не указан',
    size: dimensions || 'Не указан',
    series: series,
    inStock: stock > 0,
    stock: stock,
    article: article,
    wholesalePrice: wholesalePrice,
    retailPrice: retailPrice,
    isNew: false
  };
}

// Функция для парсинга номенклатуры
function parseNomenclature(nomenclature, columnB) {
  if (!nomenclature) return {};
  
  let text = nomenclature.toString();
  
  // Исключаем данные из колонки B из названия
  if (columnB) {
    const columnBText = columnB.toString().trim();
    if (columnBText && text.includes(columnBText)) {
      text = text.replace(columnBText, '').trim();
    }
  }
  
  // Извлекаем размеры (например: 1500х900х750, 2200x1800x750)
  const dimensionsMatch = text.match(/(\d+)[хx](\d+)[хx](\d+)/i);
  const dimensions = dimensionsMatch ? `${dimensionsMatch[1]}×${dimensionsMatch[2]}×${dimensionsMatch[3]}` : null;
  
  // Извлекаем цвета (например: орех авиньон/графит, оникс серый)
  const colorMatch = text.match(/цвет[:\s]*([^,]+)/i) || text.match(/([а-яё\s]+(?:орех|серый|черный|белый|коричневый)[а-яё\s]*)/i);
  const color = colorMatch ? colorMatch[1].trim() : null;
  
  // Извлекаем материалы
  const materialMatch = text.match(/(дуб|металл|пластик|стекло|ткань|сетка|дерево|ЛДСП|МДФ)/i);
  const material = materialMatch ? materialMatch[1] : null;
  
  // Извлекаем название (первая часть до /)
  const nameMatch = text.split('/')[0].trim();
  const name = nameMatch.length > 0 ? nameMatch : null;
  
  return {
    name,
    description: text,
    material,
    color,
    dimensions
  };
}

// Функция для маппинга листов на категории
function mapSheetToCategory(sheetName) {
  const categoryMap = {
    'Кресла и стулья': 'Кресла и стулья',
    'Столы': 'Переговорные столы',
    'Тумбы': 'Мебель для персонала',
    'Шкафы': 'Кабинет руководителя',
    'Переговорные': 'Переговорные столы',
    'Аксессуары': 'Другое'
  };
  
  return categoryMap[sheetName] || 'Другое';
}

// Функция для извлечения серии
function extractSeries(article, sheetName) {
  if (!article) return 'CUSTOM';
  
  // Извлекаем префикс из артикула
  const prefixMatch = article.match(/^([A-Z]+)/);
  if (prefixMatch) {
    return prefixMatch[1];
  }
  
  // Маппинг по листам
  const seriesMap = {
    'Quartz': 'QUARTZ',
    'Wood&Stone': 'WOOD_STONE',
    'Oliver': 'OLIVER',
    'Atlas': 'ATLAS',
    'Allegro': 'ALLEGRO',
    'Wing': 'WING',
    'Sigma': 'SIGMA'
  };
  
  return seriesMap[sheetName] || 'NORDEN';
}

// Функция для обработки путей к изображениям
function processImagePath(imagePath, article) {
  if (!imagePath) {
    return '/img/product_example_for_app.png'; // Заглушка если нет изображения
  }
  
  const path = imagePath.toString().trim();
  
  // Если пустая строка или только пробелы
  if (!path || path.length === 0) {
    return '/img/product_example_for_app.png';
  }
  
  // Если это уже полный URL
  if (path.startsWith('http')) {
    return path;
  }
  
  // Если это уже полный путь от корня
  if (path.startsWith('/')) {
    return path;
  }
  
  // Если это относительный путь, добавляем базовую папку
  if (path.includes('.jpg') || path.includes('.jpeg') || path.includes('.png') || path.includes('.webp')) {
    return `/img/products/${path}`;
  }
  
  // Если это имя файла без расширения, добавляем расширение
  if (path.length > 0 && !path.includes('.')) {
    return `/img/products/${path}.jpg`;
  }
  
  // Заглушка по умолчанию
  return '/img/product_example_for_app.png';
}

// Функция для генерации ID
function generateId(article, rowIndex) {
  if (article) {
    // Используем артикул для генерации числового ID
    return Math.abs(article.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0));
  }
  return rowIndex;
}

// Функция для создания категорий
function createCategories(products) {
  const categoryCounts = {};
  products.forEach(product => {
    categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
  });
  
  const categories = [
    { id: 'all', name: 'Все товары', count: products.length }
  ];
  
  Object.entries(categoryCounts).forEach(([name, count]) => {
    const id = name.toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[а-яё]/g, (match) => {
        const map = {
          'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
          'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
          'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
          'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch',
          'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
        };
        return map[match] || '';
      })
      .replace(/[^a-z0-9_]/g, '') // Удаляем все символы кроме букв, цифр и подчеркиваний
      .replace(/_+/g, '_') // Заменяем множественные подчеркивания на одно
      .replace(/^_|_$/g, ''); // Удаляем подчеркивания в начале и конце
    
    categories.push({ id, name, count });
  });
  
  return categories;
}

// Функция для создания серий
function createSeries(products) {
  const seriesCounts = {};
  products.forEach(product => {
    seriesCounts[product.series] = (seriesCounts[product.series] || 0) + 1;
  });
  
  return Object.entries(seriesCounts).map(([name, count]) => ({
    id: name,
    name: name,
    count: count,
    description: `Серия ${name} - ${count} товаров`
  }));
}

// Основная функция
function main() {
  const excelFilePath = process.argv[2];
  
  if (!excelFilePath) {
    console.log('Использование: node excel-to-json.js <путь_к_excel_файлу>');
    console.log('Пример: node excel-to-json.js ./catalog.xlsx');
    return;
  }
  
  if (!fs.existsSync(excelFilePath)) {
    console.error(`Файл не найден: ${excelFilePath}`);
    return;
  }
  
  console.log(`Обрабатываем файл: ${excelFilePath}`);
  
  // Парсим Excel
  const products = parseExcelToJSON(excelFilePath);
  
  if (products.length === 0) {
    console.log('Товары не найдены в файле');
    return;
  }
  
  // Создаем категории и серии
  const categories = createCategories(products);
  const series = createSeries(products);
  
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
  const content = `// Данные товаров из Excel файла
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
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1].endsWith('excel-to-json.js')) {
  main();
}

export { parseExcelToJSON, createCategories, createSeries };
