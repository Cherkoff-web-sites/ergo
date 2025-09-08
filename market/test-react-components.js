// Тест для проверки React компонентов
import fs from 'fs';
import path from 'path';

console.log('=== ТЕСТ REACT КОМПОНЕНТОВ ===');
console.log('');

// Проверяем существование файлов
const filesToCheck = [
  'src/App.jsx',
  'src/data/excelProducts.js',
  'src/components/CatalogMain.jsx',
  'src/components/CategoryPage.jsx',
  'src/components/ProductPage.jsx'
];

filesToCheck.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} - существует`);
  } else {
    console.log(`❌ ${file} - НЕ НАЙДЕН`);
  }
});

console.log('');
console.log('=== ПРОВЕРКА СИНТАКСИСА ===');

// Проверяем синтаксис App.jsx
try {
  const appContent = fs.readFileSync('src/App.jsx', 'utf8');
  
  // Проверяем импорты
  if (appContent.includes('excelProducts')) {
    console.log('✅ App.jsx импортирует excelProducts');
  } else {
    console.log('❌ App.jsx НЕ импортирует excelProducts');
  }
  
  if (appContent.includes('useState(excelProducts)')) {
    console.log('✅ App.jsx использует excelProducts в useState');
  } else {
    console.log('❌ App.jsx НЕ использует excelProducts в useState');
  }
  
} catch (error) {
  console.log('❌ Ошибка чтения App.jsx:', error.message);
}

console.log('');
console.log('✅ ТЕСТ ЗАВЕРШЕН');
