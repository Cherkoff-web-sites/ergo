// Тест цен в Excel данных
import { excelProducts } from './src/data/excelProducts.js';

console.log('=== ПРОВЕРКА ЦЕН ===');
console.log('Всего товаров:', excelProducts.length);

const withPrices = excelProducts.filter(p => p.price > 0);
console.log('Товаров с ценами:', withPrices.length);

if (withPrices.length > 0) {
  console.log('\nПервые 5 товаров с ценами:');
  withPrices.slice(0, 5).forEach((p, i) => {
    console.log(`${i+1}. ${p.name} - ${p.price}₽`);
  });
  
  const prices = withPrices.map(p => p.price);
  console.log('\n=== СТАТИСТИКА ЦЕН ===');
  console.log('Мин цена:', Math.min(...prices));
  console.log('Макс цена:', Math.max(...prices));
  console.log('Средняя цена:', Math.round(prices.reduce((a,b) => a+b, 0) / prices.length));
} else {
  console.log('❌ НЕТ ТОВАРОВ С ЦЕНАМИ!');
  console.log('\nПервые 3 товара (все цены):');
  excelProducts.slice(0, 3).forEach((p, i) => {
    console.log(`${i+1}. ${p.name} - цена: ${p.price}₽`);
  });
}
