// Комплексный тест всех исправлений
import { excelProducts } from './src/data/excelProducts.js';

console.log('=== КОМПЛЕКСНЫЙ ТЕСТ ВСЕХ ИСПРАВЛЕНИЙ ===');

// 1. Тест цен
console.log('\n1. ТЕСТ ЦЕН:');
const withPrices = excelProducts.filter(p => p.price > 0);
console.log(`Товаров с ценами: ${withPrices.length} из ${excelProducts.length}`);

if (withPrices.length > 0) {
  const prices = withPrices.map(p => p.price);
  console.log(`Мин цена: ${Math.min(...prices)}₽`);
  console.log(`Макс цена: ${Math.max(...prices)}₽`);
  console.log(`Средняя цена: ${Math.round(prices.reduce((a,b) => a+b, 0) / prices.length)}₽`);
}

// 2. Тест изображений
console.log('\n2. ТЕСТ ИЗОБРАЖЕНИЙ:');
const withImages = excelProducts.filter(p => p.image && p.image !== '/img/product_example_for_app.png');
const withDefaultImages = excelProducts.filter(p => p.image === '/img/product_example_for_app.png');
console.log(`Товаров с реальными изображениями: ${withImages.length}`);
console.log(`Товаров с изображениями по умолчанию: ${withDefaultImages.length}`);

if (withImages.length > 0) {
  console.log('Примеры реальных изображений:');
  withImages.slice(0, 3).forEach((p, i) => {
    console.log(`  ${i+1}. ${p.name} - ${p.image}`);
  });
}

// 3. Тест остатков
console.log('\n3. ТЕСТ ОСТАТКОВ:');
const withStock = excelProducts.filter(p => p.stock > 0);
const outOfStock = excelProducts.filter(p => p.stock === 0);
console.log(`Товаров в наличии: ${withStock.length}`);
console.log(`Товаров нет в наличии: ${outOfStock.length}`);

if (withStock.length > 0) {
  const stocks = withStock.map(p => p.stock);
  console.log(`Мин остаток: ${Math.min(...stocks)}`);
  console.log(`Макс остаток: ${Math.max(...stocks)}`);
}

// 4. Тест названий
console.log('\n4. ТЕСТ НАЗВАНИЙ:');
console.log('Первые 5 товаров:');
excelProducts.slice(0, 5).forEach((p, i) => {
  console.log(`  ${i+1}. "${p.name}" (артикул: ${p.article})`);
});

// 5. Тест категорий
console.log('\n5. ТЕСТ КАТЕГОРИЙ:');
const categories = [...new Set(excelProducts.map(p => p.category))];
console.log(`Категорий: ${categories.length}`);
categories.forEach(cat => {
  const count = excelProducts.filter(p => p.category === cat).length;
  console.log(`  - ${cat}: ${count} товаров`);
});

// 6. Тест серий
console.log('\n6. ТЕСТ СЕРИЙ:');
const series = [...new Set(excelProducts.map(p => p.series))];
console.log(`Серий: ${series.length}`);
console.log('Топ-10 серий:');
const seriesCounts = {};
excelProducts.forEach(p => {
  seriesCounts[p.series] = (seriesCounts[p.series] || 0) + 1;
});
Object.entries(seriesCounts)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 10)
  .forEach(([series, count]) => {
    console.log(`  - ${series}: ${count} товаров`);
  });

console.log('\n=== ТЕСТ ЗАВЕРШЕН ===');
