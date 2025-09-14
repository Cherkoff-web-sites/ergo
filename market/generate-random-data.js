// Скрипт для генерации рандомных товаров для новых категорий

const generateRandomProducts = () => {
  const categories = [
    {
      id: "office_accessories",
      name: "Офисные аксессуары",
      count: 45
    },
    {
      id: "reception_furniture", 
      name: "Мебель для ресепшена",
      count: 38
    }
  ];

  const series = [
    { id: "A1", name: "A1", count: 15, description: "Серия A1 - 15 товаров" },
    { id: "A2", name: "A2", count: 15, description: "Серия A2 - 15 товаров" },
    { id: "A3", name: "A3", count: 15, description: "Серия A3 - 15 товаров" },
    { id: "R1", name: "R1", count: 12, description: "Серия R1 - 12 товаров" },
    { id: "R2", name: "R2", count: 13, description: "Серия R2 - 13 товаров" },
    { id: "R3", name: "R3", count: 13, description: "Серия R3 - 13 товаров" }
  ];

  const productNames = {
    "office_accessories": [
      "Подставка для документов", "Органайзер для канцелярии", "Настольная лампа", 
      "Подставка для монитора", "Корзина для бумаг", "Подставка для телефона",
      "Настольный органайзер", "Подставка для ручек", "Корзина для мусора",
      "Настольная подставка", "Органайзер для папок", "Подставка для планшета"
    ],
    "reception_furniture": [
      "Стойка ресепшена", "Стол администратора", "Диван для посетителей",
      "Кресло для ресепшена", "Столик для журналов", "Шкаф для документов",
      "Стойка для визиток", "Стол для переговоров", "Кресло для посетителей",
      "Стойка для цветов", "Стол для регистрации", "Диван для ожидания"
    ]
  };

  const materials = ["дерево", "металл", "пластик", "стекло", "кожа", "ткань", "МДФ", "ДСП"];
  const colors = ["черный", "белый", "серый", "коричневый", "синий", "красный", "зеленый", "бежевый"];
  const sizes = ["малый", "средний", "большой", "Не указан"];

  const products = [];
  let productId = 30000000; // Начинаем с большого ID чтобы не пересекаться

  categories.forEach(category => {
    const categorySeries = series.filter(s => 
      (category.id === "office_accessories" && s.id.startsWith("A")) ||
      (category.id === "reception_furniture" && s.id.startsWith("R"))
    );

    categorySeries.forEach(serie => {
      for (let i = 0; i < serie.count; i++) {
        const randomName = productNames[category.id][Math.floor(Math.random() * productNames[category.id].length)];
        const randomMaterial = materials[Math.floor(Math.random() * materials.length)];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
        
        const basePrice = Math.floor(Math.random() * 50000) + 5000; // от 5000 до 55000
        const hasOldPrice = Math.random() > 0.7; // 30% шанс на старую цену
        const oldPrice = hasOldPrice ? Math.floor(basePrice * (1.2 + Math.random() * 0.3)) : null;
        
        const product = {
          id: productId++,
          name: randomName,
          description: `${randomName} / ${serie.name} / ${randomColor} ${randomMaterial} / ${randomSize}`,
          price: basePrice,
          oldPrice: oldPrice,
          image: "/img/product_example_for_app.png",
          category: category.name,
          material: randomMaterial,
          color: randomColor,
          size: randomSize,
          series: serie.name,
          inStock: Math.random() > 0.1, // 90% шанс что в наличии
          stock: Math.floor(Math.random() * 100) + 1,
          article: `${serie.name}-${String(i + 1).padStart(3, '0')} ${randomColor}`,
          wholesalePrice: 0,
          retailPrice: 0,
          isNew: Math.random() > 0.8 // 20% шанс что новинка
        };
        
        products.push(product);
      }
    });
  });

  return { categories, series, products };
};

// Экспортируем для использования
module.exports = { generateRandomProducts };

console.log('Скрипт загружен. Используйте generateRandomProducts() для генерации данных.');
