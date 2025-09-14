// Скрипт для генерации новых категорий с рандомными товарами

const fs = require('fs');

const generateNewCategoriesData = () => {
  const newCategories = [
    {
      id: "boss_cabinet",
      name: "Кабинет руководителя",
      count: 65
    },
    {
      id: "personnel_furniture", 
      name: "Мебель для персонала",
      count: 78
    },
    {
      id: "soft_furniture",
      name: "Мягкая мебель", 
      count: 42
    },
    {
      id: "custom_furniture",
      name: "Мебель на заказ",
      count: 35
    }
  ];

  const newSeries = [
    // Для кабинета руководителя
    { id: "BC1", name: "BC1", count: 22, description: "Серия BC1 - 22 товаров" },
    { id: "BC2", name: "BC2", count: 22, description: "Серия BC2 - 22 товаров" },
    { id: "BC3", name: "BC3", count: 21, description: "Серия BC3 - 21 товаров" },
    
    // Для мебели персонала
    { id: "PF1", name: "PF1", count: 26, description: "Серия PF1 - 26 товаров" },
    { id: "PF2", name: "PF2", count: 26, description: "Серия PF2 - 26 товаров" },
    { id: "PF3", name: "PF3", count: 26, description: "Серия PF3 - 26 товаров" },
    
    // Для мягкой мебели
    { id: "SF1", name: "SF1", count: 14, description: "Серия SF1 - 14 товаров" },
    { id: "SF2", name: "SF2", count: 14, description: "Серия SF2 - 14 товаров" },
    { id: "SF3", name: "SF3", count: 14, description: "Серия SF3 - 14 товаров" },
    
    // Для мебели на заказ
    { id: "CF1", name: "CF1", count: 12, description: "Серия CF1 - 12 товаров" },
    { id: "CF2", name: "CF2", count: 12, description: "Серия CF2 - 12 товаров" },
    { id: "CF3", name: "CF3", count: 11, description: "Серия CF3 - 11 товаров" }
  ];

  const productNames = {
    "boss_cabinet": [
      "Кресло руководителя", "Стол руководителя", "Диван для кабинета", 
      "Шкаф для документов", "Столик для переговоров", "Кресло для посетителей",
      "Стойка для наград", "Стол для совещаний", "Кресло для переговоров",
      "Шкаф для одежды", "Столик для кофе", "Кресло для отдыха"
    ],
    "personnel_furniture": [
      "Рабочий стол", "Стул офисный", "Тумба для документов", 
      "Стеллаж для папок", "Стол для принтера", "Кресло рабочее",
      "Шкаф для личных вещей", "Столик для монитора", "Полка для книг",
      "Стол для компьютера", "Стул регулируемый", "Тумба для канцелярии"
    ],
    "soft_furniture": [
      "Диван офисный", "Кресло мягкое", "Пуфик для отдыха", 
      "Диван-кровать", "Кресло-качалка", "Диван угловой",
      "Кресло с подставкой", "Диван модульный", "Кресло релакс",
      "Диван для ожидания", "Кресло массажное", "Диван трансформер"
    ],
    "custom_furniture": [
      "Стол индивидуальный", "Кресло на заказ", "Шкаф по размерам", 
      "Стол нестандартный", "Кресло эксклюзивное", "Стеллаж под заказ",
      "Стол по эскизу", "Кресло уникальное", "Шкаф по проекту",
      "Стол авторский", "Кресло дизайнерское", "Мебель по чертежам"
    ]
  };

  const materials = ["дерево", "металл", "пластик", "стекло", "кожа", "ткань", "МДФ", "ДСП", "натуральная кожа", "экокожа"];
  const colors = ["черный", "белый", "серый", "коричневый", "синий", "красный", "зеленый", "бежевый", "бордовый", "золотой"];
  const sizes = ["малый", "средний", "большой", "Не указан", "XL", "XXL"];

  const products = [];
  let productId = 40000000; // Начинаем с еще большего ID

  newCategories.forEach(category => {
    const categorySeries = newSeries.filter(s => 
      (category.id === "boss_cabinet" && s.id.startsWith("BC")) ||
      (category.id === "personnel_furniture" && s.id.startsWith("PF")) ||
      (category.id === "soft_furniture" && s.id.startsWith("SF")) ||
      (category.id === "custom_furniture" && s.id.startsWith("CF"))
    );

    categorySeries.forEach(serie => {
      for (let i = 0; i < serie.count; i++) {
        const randomName = productNames[category.id][Math.floor(Math.random() * productNames[category.id].length)];
        const randomMaterial = materials[Math.floor(Math.random() * materials.length)];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
        
        const basePrice = Math.floor(Math.random() * 80000) + 10000; // от 10000 до 90000
        const hasOldPrice = Math.random() > 0.6; // 40% шанс на старую цену
        const oldPrice = hasOldPrice ? Math.floor(basePrice * (1.2 + Math.random() * 0.4)) : null;
        
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
          inStock: Math.random() > 0.05, // 95% шанс что в наличии
          stock: Math.floor(Math.random() * 50) + 1,
          article: `${serie.name}-${String(i + 1).padStart(3, '0')} ${randomColor}`,
          wholesalePrice: 0,
          retailPrice: 0,
          isNew: Math.random() > 0.7 // 30% шанс что новинка
        };
        
        products.push(product);
      }
    });
  });

  return { categories: newCategories, series: newSeries, products };
};

// Генерируем данные
const data = generateNewCategoriesData();

// Сохраняем с правильной кодировкой UTF-8
fs.writeFileSync('new-categories-data.json', JSON.stringify(data, null, 2), 'utf8');
console.log('Новые данные категорий сохранены в new-categories-data.json');
console.log(`Сгенерировано ${data.products.length} товаров для ${data.categories.length} категорий`);
