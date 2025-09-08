// Отладка структуры Excel файла
import XLSX from 'xlsx';

const excelFilePath = './catalog.xlsx';

console.log('=== ОТЛАДКА EXCEL СТРУКТУРЫ ===');

try {
  const workbook = XLSX.readFile(excelFilePath);
  const sheetName = workbook.SheetNames[0]; // Первый лист
  console.log(`Анализируем лист: ${sheetName}`);
  
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
  console.log('\n=== ЗАГОЛОВКИ (первые 5 строк) ===');
  for (let i = 0; i < Math.min(5, jsonData.length); i++) {
    console.log(`Строка ${i + 1}:`, jsonData[i]);
  }
  
  console.log('\n=== ПЕРВЫЕ 3 ТОВАРА (после заголовков) ===');
  const dataRows = jsonData.slice(4, 7); // Строки 5-7
  dataRows.forEach((row, index) => {
    console.log(`\nТовар ${index + 1}:`);
    console.log(`  A (0): ${row[0] || 'ПУСТО'}`);
    console.log(`  B (1): ${row[1] || 'ПУСТО'}`);
    console.log(`  C (2): ${row[2] || 'ПУСТО'}`);
    console.log(`  D (3): ${row[3] || 'ПУСТО'} (тип: ${typeof row[3]})`);
    console.log(`  E (4): ${row[4] || 'ПУСТО'} (тип: ${typeof row[4]})`);
    console.log(`  F (5): ${row[5] || 'ПУСТО'} (тип: ${typeof row[5]})`);
    console.log(`  G (6): ${row[6] || 'ПУСТО'} (тип: ${typeof row[6]})`);
    console.log(`  H (7): ${row[7] || 'ПУСТО'} (тип: ${typeof row[7]})`);
  });
  
} catch (error) {
  console.error('Ошибка:', error.message);
}
