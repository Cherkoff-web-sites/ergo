// Скрипт для обновления ссылок каталога во всех HTML файлах

const fs = require('fs');
const path = require('path');

const htmlFiles = [
  'about.html',
  'contacts.html', 
  'design_project.html',
  'service.html'
];

// Новые ссылки для десктопного меню
const desktopMenuUpdate = {
  old: `<a href="https://ergo-catalog.vercel.app" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Кабинет руководителя
                    </a>
                  </li>
                  <li>
                    <a href="https://ergo-catalog.vercel.app" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Мебель для персонала
                    </a>
                  </li>
                  <li>
                    <a href="https://ergo-catalog.vercel.app" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Столы переговоров
                    </a>
                  </li>
                  <li>
                    <a href="https://ergo-catalog.vercel.app" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Стулья и кресла
                    </a>`,
  new: `<a href="https://ergo-catalog.vercel.app/catalog/boss_cabinet" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Кабинет руководителя
                    </a>
                  </li>
                  <li>
                    <a href="https://ergo-catalog.vercel.app/catalog/personnel_furniture" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Мебель для персонала
                    </a>
                  </li>
                  <li>
                    <a href="https://ergo-catalog.vercel.app/catalog/kresla_i_stulya" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Кресла и стулья
                    </a>
                  </li>
                  <li>
                    <a href="https://ergo-catalog.vercel.app/catalog/soft_furniture" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Мягкая мебель
                    </a>
                  </li>
                  <li>
                    <a href="https://ergo-catalog.vercel.app/catalog/peregovornye_stoly" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Переговорные столы
                    </a>
                  </li>
                  <li>
                    <a href="https://ergo-catalog.vercel.app/catalog/reception_furniture" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Стойки ресепшен
                    </a>
                  </li>
                  <li>
                    <a href="https://ergo-catalog.vercel.app/catalog/custom_furniture" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Мебель на заказ
                    </a>
                  </li>
                  <li>
                    <a href="https://ergo-catalog.vercel.app/catalog/drugoe" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Другое
                    </a>`
};

// Новые ссылки для мобильного меню
const mobileMenuUpdate = {
  old: `<li><a class="text-sm font-light" href="https://ergo-catalog.vercel.app">Кабинет руководителя</a></li>
            <li><a class="text-sm font-light" href="https://ergo-catalog.vercel.app">Мебель для персонала</a></li>
            <li><a class="text-sm font-light" href="https://ergo-catalog.vercel.app">Столы переговоров</a></li>
            <li><a class="text-sm font-light" href="https://ergo-catalog.vercel.app">Стулья и кресла</a></li>`,
  new: `<li><a class="text-sm font-light" href="https://ergo-catalog.vercel.app/catalog/boss_cabinet">Кабинет руководителя</a></li>
            <li><a class="text-sm font-light" href="https://ergo-catalog.vercel.app/catalog/personnel_furniture">Мебель для персонала</a></li>
            <li><a class="text-sm font-light" href="https://ergo-catalog.vercel.app/catalog/kresla_i_stulya">Кресла и стулья</a></li>
            <li><a class="text-sm font-light" href="https://ergo-catalog.vercel.app/catalog/soft_furniture">Мягкая мебель</a></li>
            <li><a class="text-sm font-light" href="https://ergo-catalog.vercel.app/catalog/peregovornye_stoly">Переговорные столы</a></li>
            <li><a class="text-sm font-light" href="https://ergo-catalog.vercel.app/catalog/reception_furniture">Стойки ресепшен</a></li>
            <li><a class="text-sm font-light" href="https://ergo-catalog.vercel.app/catalog/custom_furniture">Мебель на заказ</a></li>
            <li><a class="text-sm font-light" href="https://ergo-catalog.vercel.app/catalog/drugoe">Другое</a></li>`
};

htmlFiles.forEach(filename => {
  const filePath = path.join(__dirname, filename);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Обновляем десктопное меню
    if (content.includes(desktopMenuUpdate.old)) {
      content = content.replace(desktopMenuUpdate.old, desktopMenuUpdate.new);
      console.log(`✅ Обновлено десктопное меню в ${filename}`);
    }
    
    // Обновляем мобильное меню
    if (content.includes(mobileMenuUpdate.old)) {
      content = content.replace(mobileMenuUpdate.old, mobileMenuUpdate.new);
      console.log(`✅ Обновлено мобильное меню в ${filename}`);
    }
    
    // Сохраняем файл
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`📁 Файл ${filename} обновлен`);
  } else {
    console.log(`❌ Файл ${filename} не найден`);
  }
});

console.log('\n🎉 Обновление ссылок каталога завершено!');
