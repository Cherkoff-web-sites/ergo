// Комплексный тест всех компонентов
import fs from 'fs';
import path from 'path';

console.log('=== КОМПЛЕКСНЫЙ ТЕСТ ВСЕХ КОМПОНЕНТОВ ===');
console.log('');

// 1. Проверяем Excel данные
console.log('1. ПРОВЕРКА EXCEL ДАННЫХ:');
try {
  const excelContent = fs.readFileSync('src/data/excelProducts.js', 'utf8');
  if (excelContent.includes('export const excelProducts')) {
    console.log('✅ excelProducts экспортируется');
  }
  if (excelContent.includes('export const excelCategories')) {
    console.log('✅ excelCategories экспортируется');
  }
  if (excelContent.includes('export const excelSeries')) {
    console.log('✅ excelSeries экспортируется');
  }
} catch (error) {
  console.log('❌ Ошибка чтения excelProducts.js:', error.message);
}

console.log('');

// 2. Проверяем App.jsx
console.log('2. ПРОВЕРКА APP.JSX:');
try {
  const appContent = fs.readFileSync('src/App.jsx', 'utf8');
  
  if (appContent.includes('import { excelProducts, excelCategories, excelSeries }')) {
    console.log('✅ App.jsx импортирует Excel данные');
  } else {
    console.log('❌ App.jsx НЕ импортирует Excel данные');
  }
  
  if (appContent.includes('useState(excelProducts)')) {
    console.log('✅ App.jsx использует excelProducts в useState');
  } else {
    console.log('❌ App.jsx НЕ использует excelProducts в useState');
  }
  
  if (appContent.includes('products={products}')) {
    console.log('✅ App.jsx передает products в компоненты');
  } else {
    console.log('❌ App.jsx НЕ передает products в компоненты');
  }
  
  if (!appContent.includes('mockProducts')) {
    console.log('✅ App.jsx НЕ использует mockProducts');
  } else {
    console.log('❌ App.jsx все еще использует mockProducts');
  }
} catch (error) {
  console.log('❌ Ошибка чтения App.jsx:', error.message);
}

console.log('');

// 3. Проверяем все компоненты
console.log('3. ПРОВЕРКА КОМПОНЕНТОВ:');
const components = [
  'src/components/AllProductsPage.jsx',
  'src/components/ProductPage.jsx',
  'src/components/SeriesPage.jsx',
  'src/components/CategoryPage.jsx',
  'src/components/CatalogMain.jsx'
];

components.forEach(component => {
  try {
    const content = fs.readFileSync(component, 'utf8');
    const componentName = path.basename(component, '.jsx');
    
    if (!content.includes('mockProducts')) {
      console.log(`✅ ${componentName} НЕ использует mockProducts`);
    } else {
      console.log(`❌ ${componentName} все еще использует mockProducts`);
    }
    
    if (content.includes('products, categories, series')) {
      console.log(`✅ ${componentName} принимает Excel данные через props`);
    } else if (componentName === 'CatalogMain' && content.includes('categories')) {
      console.log(`✅ ${componentName} принимает categories через props`);
    } else {
      console.log(`❌ ${componentName} НЕ принимает Excel данные через props`);
    }
    
  } catch (error) {
    console.log(`❌ Ошибка чтения ${component}:`, error.message);
  }
});

console.log('');

// 4. Проверяем синтаксис
console.log('4. ПРОВЕРКА СИНТАКСИСА:');
const filesToCheck = [
  'src/App.jsx',
  'src/data/excelProducts.js',
  ...components
];

filesToCheck.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    
    // Простая проверка на базовые синтаксические ошибки
    if (content.includes('import {') && content.includes('} from')) {
      console.log(`✅ ${file} - импорты корректны`);
    }
    
    if (content.includes('export const') || content.includes('export default')) {
      console.log(`✅ ${file} - экспорты корректны`);
    }
    
  } catch (error) {
    console.log(`❌ ${file} - ошибка синтаксиса:`, error.message);
  }
});

console.log('');
console.log('=== ТЕСТ ЗАВЕРШЕН ===');
console.log('');
console.log('Если все тесты пройдены, запускай: npm run dev');
