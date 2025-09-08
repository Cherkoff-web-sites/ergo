// Тест транслитерации для проблемных символов
function testTransliteration() {
  const testCases = [
    'Кресла и стулья', // ь
    'Столы', // ы  
    'Объявление', // ъ
    'Мебель для персонала',
    'Переговорные столы',
    'Кабинет руководителя',
    'Другое'
  ];

  console.log('=== ТЕСТ ТРАНСЛИТЕРАЦИИ ===');
  
  testCases.forEach(name => {
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
    
    console.log(`"${name}" → "${id}"`);
  });
  
  console.log('\n=== ПРОВЕРКА ПРОБЛЕМНЫХ СИМВОЛОВ ===');
  console.log('Ь (мягкий знак):', 'ь'.replace(/[а-яё]/g, (match) => {
    const map = { 'ь': '' };
    return map[match] || '';
  }));
  console.log('Ъ (твердый знак):', 'ъ'.replace(/[а-яё]/g, (match) => {
    const map = { 'ъ': '' };
    return map[match] || '';
  }));
  console.log('Ы (ы):', 'ы'.replace(/[а-яё]/g, (match) => {
    const map = { 'ы': 'y' };
    return map[match] || '';
  }));
}

testTransliteration();
