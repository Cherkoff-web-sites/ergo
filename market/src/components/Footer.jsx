import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#1A1812]/95 text-white overflow-hidden">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Основной контент футера */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Колонка 1: ЭРГО мебель */}
            <div className="space-y-4">
              <a href="https://ergo-static.vercel.app/" className="inline-block">
                <h3 className="text-title-3 font-tenor text-text-reverse mb-4">
                  ЭРГО <span className="text-lg font-normal">мебель</span>
                </h3>
              </a>
              <p className="text-text-reverse/80 text-sm leading-relaxed mb-6">
                Производство и продажа офисной мебели в Санкт-Петербурге с 2007 года. 
                Полный спектр услуг от разработки проекта до доставки и сборки.
              </p>
              <div className="space-y-2 text-xs text-text-reverse/60">
                <p>© ооо «эрго» 2025. все права защищены.</p>
                <p>
                  <a href="#" className="hover:text-text-reverse transition-colors">
                    политика обработки персональных данных
                  </a>
                </p>
                <p>
                  <a href="#" className="hover:text-text-reverse transition-colors">
                    согласие на обработку персональных данных
                  </a>
                </p>
                <p>
                  <a href="#" className="hover:text-reverse transition-colors">
                    пользовательское соглашение
                  </a>
                </p>
              </div>
            </div>
            
            {/* Колонка 2: Контакты */}
            <div className="space-y-4">
              <h3 className="text-title-3 font-semibold text-text-reverse mb-6">КОНТАКТЫ</h3>
              <div className="space-y-2">
                <p className="text-text-reverse/80">Телефон: +7(812) 945-44-78</p>
                <p className="text-text-reverse/80">E-mail: ra@ergospb.ru</p>
                <p className="text-text-reverse/80">Режим: Пн-Пт (10:00-18:00)</p>
                <p className="text-text-reverse/80">Адрес Санкт-Петербург</p>
              </div>
            </div>
            
            {/* Колонка 3: Меню */}
            <div className="space-y-4">
              <h3 className="text-title-3 font-semibold text-text-reverse mb-6">МЕНЮ</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://ergo-static.vercel.app/catalog.html" className="text-text-reverse/80 hover:text-text-reverse transition-colors">
                    Каталог
                  </a>
                </li>
                <li>
                  <a href="https://ergo-static.vercel.app/about.html" className="text-text-reverse/80 hover:text-text-reverse transition-colors">
                    О нас
                  </a>
                </li>
                <li>
                  <a href="https://ergo-static.vercel.app/design_project.html" className="text-text-reverse/80 hover:text-text-reverse transition-colors">
                    Дизайн-проект
                  </a>
                </li>
                <li>
                  <a href="https://ergo-static.vercel.app/" className="text-text-reverse/80 hover:text-text-reverse transition-colors">
                    Сервис
                  </a>
                </li>
                <li>
                  <a href="https://ergo-static.vercel.app/" className="text-text-reverse/80 hover:text-text-reverse transition-colors">
                    Контакты
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Колонка 4: Каталог */}
            <div className="space-y-4">
              <h3 className="text-title-3 font-semibold text-text-reverse mb-6">КАТАЛОГ</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/catalog?category=director" className="text-text-reverse/80 hover:text-text-reverse transition-colors">
                    Кабинет руководителя
                  </a>
                </li>
                <li>
                  <a href="/catalog?category=staff" className="text-text-reverse/80 hover:text-text-reverse transition-colors">
                    Мебель для персонала
                  </a>
                </li>
                <li>
                  <a href="/catalog?category=chairs" className="text-text-reverse/80 hover:text-text-reverse transition-colors">
                    Кресла и стулья
                  </a>
                </li>
                <li className="ml-4">
                  <a href="/catalog?category=director-chairs" className="text-text-reverse/80 hover:text-text-reverse transition-colors">
                    * Директорские
                  </a>
                </li>
                <li className="ml-4">
                  <a href="/catalog?category=staff-chairs" className="text-text-reverse/80 hover:text-text-reverse transition-colors">
                    * Для персонала
                  </a>
                </li>
                <li className="ml-4">
                  <a href="/catalog?category=visitor-chairs" className="text-text-reverse/80 hover:text-text-reverse transition-colors">
                    * Для посетителей
                  </a>
                </li>
                <li>
                  <a href="/catalog?category=soft-furniture" className="text-text-reverse/80 hover:text-text-reverse transition-colors">
                    Мягкая мебель
                  </a>
                </li>
                <li>
                  <a href="/catalog?category=meeting-tables" className="text-text-reverse/80 hover:text-text-reverse transition-colors">
                    Переговорные столы
                  </a>
                </li>
                <li>
                  <a href="/catalog?category=reception" className="text-text-reverse/80 hover:text-text-reverse transition-colors">
                    Стойки ресепшен
                  </a>
                </li>
                <li>
                  <a href="/catalog?category=other" className="text-text-reverse/80 hover:text-text-reverse transition-colors">
                    Другое
                  </a>
                </li>
                <li>
                  <a href="/catalog?category=custom" className="text-text-reverse/80 hover:text-text-reverse transition-colors">
                    Мебель на заказ
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Логотип и слоган */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-end justify-between space-x-6">
        <p className="text-4xl leading-lh-100 text-text-reverse/17">
          <span className="font-tenor leading-lh-100 text-9xl">ЭРГО</span>
          <span className="font-roboto leading-lh-100 font-extralight italic text-3xl">МЕБЕЛЬ</span>
        </p>
        <span className="text-xl leading-lh-100 font-medium text-text-reverse/17">
          15 лет на рынке - качество, проверенное временем
        </span>
      </div>
    </footer>
  );
};

export default Footer;
