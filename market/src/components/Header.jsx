import { useState, useEffect } from 'react';

const Header = ({ onOpenFavorites, onOpenCart, totalFavorites, totalItems }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCatalogMenuOpen, setIsCatalogMenuOpen] = useState(false);
  const [isDesktopCatalogMenuOpen, setIsDesktopCatalogMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleCatalogMenu = () => {
    setIsCatalogMenuOpen(!isCatalogMenuOpen);
  };

  const toggleDesktopCatalogMenu = () => {
    setIsDesktopCatalogMenuOpen(!isDesktopCatalogMenuOpen);
  };

  // Закрытие меню при клике вне его
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDesktopCatalogMenuOpen && !event.target.closest('.catalog-dropdown')) {
        setIsDesktopCatalogMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDesktopCatalogMenuOpen]);

  return (
    <header>
      <div className="max-w-full-mob md:max-w-full-pc mx-auto pt-6 md:pt-5 sm:px-5 xxl:px-6 pb-4 md:pb-2">
        {/* Навигационное меню пк */}
        {/* ВЕРХНЯЯ часть */}
        <div className="hidden md:block">
          {/* ПЕРВАЯ строка */}
          <div className="flex justify-between flex-wrap items-center pb-4 border-b border-text">
            {/* Левая колонка: Логотип + Поиск */}
            <div className="w-full md:w-[44%] xl:w-[37%] xxl:w-[40%] flex items-end gap-header-gap">
              <a href="https://ergo-static.vercel.app/" className="font-tenor text-primary text-xl xxl:text-2xl">ЭРГО</a>
              <div className="flex-1 relative">
                <a className="w-full" href="https://ergo-catalog.vercel.app/">
                  <input type="search" placeholder="поиск" className="w-full px-2 py-1 border border-text rounded-btn bg-[#1A18120E] text-text placeholder-text placeholder:font-light placeholder:italic placeholder:uppercase focus:outline-none" />
                  <svg className="w-4 h-4 text-text absolute right-2 top-1/2 transform -translate-y-1/2" width="10" height="13" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.16203 1.32123C8.72774 2.04474 9.41036 3.90054 8.68698 5.46627C8.027 6.89449 6.42568 7.58655 4.96099 7.14829L2.88818 11.6339L2.07793 11.2595L4.15073 6.77387C2.86801 5.94234 2.35708 4.27425 3.01699 2.84618C3.74057 1.28062 5.59637 0.597874 7.16203 1.32123Z" stroke="#FDFFEE" strokeWidth="0.892329"/>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Правая колонка: Кнопки действий */}
            <div className="w-full md:w-5/12 grid grid-cols-10 gap-4 xxl:gap-6">
              <div className="col-span-3">
                <button 
                  onClick={onOpenFavorites}
                  className="flex items-center justify-between gap-2 w-full px-2 py-1 border border-text rounded-btn text-text"
                >
                  <p className="xxl:text-sm font-bold">
                    ИЗБРАННОЕ
                  </p>
                  <p className="xxl:text-sm italic font-light">(<span>{totalFavorites}</span>)</p>
                </button>
              </div>
              <div className="col-span-3">
                <button 
                  onClick={onOpenCart}
                  className="flex items-center justify-between gap-2 w-full px-2 py-1 border border-text rounded-btn text-text"
                >
                  <p className="xxl:text-sm font-bold">
                    КОРЗИНА
                  </p>
                  <p className="xxl:text-sm italic font-light">(<span>{totalItems}</span>)</p>
                </button>
              </div>
              <div className="col-span-4">
                <a href="https://ergo-static.vercel.app/contacts.html" className="flex items-center justify-between gap-2 w-full px-2 py-1 border border-primary rounded-btn text-primary">
                  <p className="xxl:text-sm font-bold">
                    ОСТАВИТЬ ЗАЯВКУ
                  </p>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17l9.2-9.2M17 17V7H7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* ВТОРАЯ строка */}
          <div className="flex justify-between flex-wrap items-center pt-3">
            {/* Левая колонка: Навигация */}
            <nav className="hidden md:flex justify-between gap-2 md:w-[44%] xl:w-[37%] xxl:w-[40%]">
              <div className="relative catalog-dropdown">
                <button 
                  onClick={toggleDesktopCatalogMenu}
                  className="text-sm xxl:text-xl font-medium transition-colors hover:text-primary"
                >
                  КАТАЛОГ
                </button>
                {/* Выпадающее меню каталога */}
                {isDesktopCatalogMenuOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <ul className="py-2">
                      <li>
                        <a 
                          href="https://ergo-catalog.vercel.app" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Кабинет руководителя
                        </a>
                      </li>
                      <li>
                        <a 
                          href="https://ergo-catalog.vercel.app" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Мебель для персонала
                        </a>
                      </li>
                      <li>
                        <a 
                          href="https://ergo-catalog.vercel.app" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Столы переговоров
                        </a>
                      </li>
                      <li>
                        <a 
                          href="https://ergo-catalog.vercel.app" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Стулья и кресла
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <a href="https://ergo-static.vercel.app/about.html" className="text-sm xxl:text-xl font-medium transition-colors">О НАС</a>
              <a href="https://ergo-static.vercel.app/design_project.html" className="text-sm xxl:text-xl font-medium transition-colors">ДИЗАЙН-ПРОЕКТ</a>
              <a href="https://ergo-static.vercel.app/service.html" className="text-sm xxl:text-xl font-medium transition-colors">СЕРВИС</a>
              <a href="https://ergo-static.vercel.app/contacts.html" className="text-sm xxl:text-xl font-medium transition-colors">КОНТАКТЫ</a>
            </nav>
            
            {/* Правая колонка: Контакты */}
            <div className="w-full md:w-5/12 grid grid-cols-10 gap-4 xxl:gap-6">
              <div className="col-span-3">
                <span className="xxl:text-base text-text">ПН-ПТ</span>
              </div>
              <div className="col-span-3">
                <a href="tel:+78129454478" target="_blank" className="xxl:text-base text-text">+7(812) 945-44-78</a>
              </div>
              <div className="col-span-4">
                <span className="xxl:text-base text-text">САНКТ-ПЕТЕРБУРГ</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Мобильные кнопки */}
        <div className="flex md:hidden justify-between items-center">
          <button onClick={toggleMobileMenu}>
            <svg width="38" height="14" viewBox="0 0 38 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="38" height="2" rx="1" fill="#1A1812"/>
              <rect y="6" width="38" height="2" rx="1" fill="#1A1812"/>
              <rect y="12" width="30" height="2" rx="1" fill="#1A1812"/>
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <button 
              onClick={onOpenFavorites}
              className="flex items-center justify-between gap-4 px-1 border border-text text-text rounded-btn"
            >
              <p className="font-bold text-xs">
                ИЗБРАННОЕ
              </p>
              <p className="text-[11px] italic font-light">(<span>{totalFavorites}</span>)</p>
            </button>

            <button 
              onClick={onOpenCart}
              className="flex items-center justify-between gap-4 px-1 border border-text text-text rounded-btn"
            >
              <p className="font-bold text-xs">
                КОРЗИНА
              </p>
              <p className="text-[11px] italic font-light">(<span>{totalItems}</span>)</p>
            </button>
          </div>
        </div>
      </div>
      
      {/* Навигационное меню моб */}
      <div className={`md:hidden fixed top-0 right-0 bottom-0 left-0 z-[10000] bg-body transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="h-full pt-6 flex flex-col justify-between">
          {/* Кнопка закрытия */}
          <div className="flex justify-end px-6 mb-4">
            <button onClick={toggleMobileMenu}>
              <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="30.455" height="2.03034" rx="1.01517" transform="matrix(0.706201 -0.708011 0.706201 0.708011 0 21.5625)" fill="#1A1812"/>
                <rect width="30.455" height="2.03034" rx="1.01517" transform="matrix(-0.706201 -0.708011 -0.706201 0.708011 22.9414 21.5625)" fill="#1A1812"/>
              </svg>
            </button>
          </div>
          
          {/* Навигационные ссылки */}
          <div className="h-[60vh] flex flex-col justify-center items-center gap-2">
            <a href="https://ergo-static.vercel.app" className="py-1 text-sm font-medium uppercase">Главная</a>
            <button onClick={toggleCatalogMenu} className="py-1 text-sm font-medium uppercase">КАТАЛОГ</button>
            <ul className={`flex flex-col items-center gap-1 ${isCatalogMenuOpen ? 'block' : 'hidden'}`}>
              <li><a className="text-sm font-light" href="https://ergo-catalog.vercel.app">Кабинет руководителя</a></li>
              <li><a className="text-sm font-light" href="https://ergo-catalog.vercel.app">Мебель для персонала</a></li>
              <li><a className="text-sm font-light" href="https://ergo-catalog.vercel.app">Столы переговоров</a></li>
              <li><a className="text-sm font-light" href="https://ergo-catalog.vercel.app">Стулья и кресла</a></li>
            </ul>
            <a href="https://ergo-static.vercel.app/about.html" className="py-1 text-sm font-medium uppercase">О НАС</a>
            <a href="https://ergo-static.vercel.app/design_project.html" className="py-1 text-sm font-medium uppercase">ДИЗАЙН-ПРОЕКТ</a>
            <a href="https://ergo-static.vercel.app/service.html" className="py-1 text-sm font-medium uppercase">СЕРВИС</a>
            <a href="https://ergo-static.vercel.app/contacts.html" className="py-1 text-sm font-medium uppercase">КОНТАКТЫ</a>
          </div>

          <div className="flex justify-between items-end">
            <div className="">
              {/* ЭРГО мебель */}
              <svg width="173" height="41" viewBox="0 0 173 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.1049 9.41699C16.3168 9.41699 18.3832 9.75168 20.3041 10.4211C22.2541 11.0905 23.9421 12.08 25.3682 13.3897C26.8234 14.6702 27.9584 16.271 28.7733 18.1918C29.6173 20.0836 30.0394 22.2664 30.0394 24.7402C30.0394 25.8753 29.9084 27.0685 29.6465 28.32C29.3845 29.5715 28.9625 30.7938 28.3804 31.9871C27.8275 33.1804 27.1144 34.33 26.2413 35.4359C25.3682 36.5419 24.335 37.5023 23.1417 38.3172C21.9485 39.1321 20.5806 39.787 19.0381 40.2817C17.4956 40.7765 15.7639 41.0239 13.843 41.0239C12.5333 41.0239 11.2237 40.9075 9.91398 40.6746C8.63341 40.4418 7.39649 40.078 6.20323 39.5832C5.03907 39.0885 3.94767 38.4627 2.92903 37.706C1.91039 36.9493 1.03728 36.0471 0.309677 34.9994L2.53613 32.8602C3.0891 33.7333 3.72939 34.5482 4.45699 35.3049C5.21369 36.0616 6.04315 36.731 6.94538 37.3131C7.8767 37.8661 8.88079 38.3027 9.95764 38.6228C11.0636 38.9429 12.2568 39.103 13.5374 39.103C15.4583 39.103 17.1609 38.7247 18.6452 37.968C20.1586 37.2113 21.4246 36.2072 22.4432 34.9557C23.491 33.6751 24.2913 32.2199 24.8443 30.5901C25.3973 28.9312 25.6738 27.2286 25.6738 25.4824V25.2641H11.1363V23.2996H25.6738V23.1249C25.6738 21.728 25.4264 20.331 24.9316 18.934C24.4368 17.537 23.6801 16.271 22.6615 15.1359C21.672 14.0009 20.4351 13.0841 18.9508 12.3856C17.4665 11.6871 15.7202 11.3378 13.712 11.3378C12.4315 11.3378 11.2237 11.4979 10.0886 11.8181C8.98265 12.1382 7.96401 12.5893 7.03269 13.1714C6.10136 13.7244 5.25735 14.3792 4.50065 15.1359C3.74394 15.8926 3.0891 16.7075 2.53613 17.5806L0.309677 15.4415C1.79398 13.346 3.74394 11.8181 6.15957 10.8576C8.6043 9.8972 11.2528 9.41699 14.1049 9.41699ZM41.8913 27.7525V40.5H37.9186V9.94086H48.134C49.8221 9.94086 51.2918 10.1882 52.5433 10.683C53.7948 11.1778 54.828 11.8472 55.6429 12.6912C56.4869 13.5061 57.1126 14.4811 57.5201 15.6161C57.9275 16.7221 58.1313 17.8862 58.1313 19.1086C58.1313 20.3892 57.8984 21.597 57.4328 22.732C56.9671 23.838 56.2686 24.8275 55.3373 25.7006C54.4351 26.5447 53.3 27.214 51.9321 27.7088C50.5642 28.2036 48.9926 28.451 47.2173 28.451C46.1695 28.451 45.2091 28.3928 44.336 28.2763C43.4629 28.1308 42.648 27.9562 41.8913 27.7525ZM41.8913 11.8617V25.9626C42.5024 26.1954 43.1864 26.3555 43.9431 26.4428C44.6998 26.501 45.5292 26.5301 46.4315 26.5301C47.7411 26.5301 48.8616 26.3118 49.793 25.8753C50.7243 25.4387 51.4956 24.8712 52.1067 24.1727C52.7179 23.4742 53.1545 22.7029 53.4164 21.8589C53.7075 20.9858 53.853 20.1272 53.853 19.2832C53.853 18.4101 53.6929 17.537 53.3728 16.6639C53.0817 15.7616 52.6306 14.9613 52.0194 14.2628C51.4082 13.5352 50.637 12.9531 49.7057 12.5166C48.7743 12.08 47.6975 11.8617 46.4751 11.8617H41.8913ZM65.9709 9.94086H84.612V12.3419H69.9436V40.5H65.9709V9.94086ZM88.1109 25.2204C88.1109 23.5615 88.4165 21.8007 89.0277 19.9381C89.668 18.0754 90.6575 16.3728 91.9963 14.8303C93.3351 13.2587 95.0377 11.9636 97.104 10.9449C99.1704 9.92631 101.644 9.41699 104.526 9.41699C107.436 9.41699 109.953 9.94086 112.078 10.9886C114.232 12.0072 116.007 13.3024 117.404 14.874C118.801 16.4456 119.834 18.1627 120.504 20.0254C121.173 21.8589 121.508 23.5906 121.508 25.2204C121.508 26.2973 121.348 27.4323 121.027 28.6256C120.736 29.8189 120.285 31.0121 119.674 32.2054C119.092 33.3695 118.335 34.49 117.404 35.5669C116.473 36.6146 115.367 37.5459 114.086 38.3609C112.835 39.1758 111.409 39.8306 109.808 40.3254C108.236 40.791 106.476 41.0239 104.526 41.0239C101.644 41.0239 99.1704 40.5146 97.104 39.4959C95.0377 38.4482 93.3351 37.1385 91.9963 35.5669C90.6575 33.9953 89.668 32.2927 89.0277 30.4591C88.4165 28.5965 88.1109 26.8503 88.1109 25.2204ZM92.3892 25.2204C92.3892 27.2577 92.6948 29.1349 93.306 30.852C93.9463 32.5401 94.8048 33.9953 95.8817 35.2176C96.9876 36.44 98.2828 37.4004 99.7671 38.0989C101.251 38.7683 102.867 39.103 104.613 39.103C106.33 39.103 107.945 38.7683 109.459 38.0989C111.001 37.4004 112.34 36.44 113.475 35.2176C114.639 33.9953 115.556 32.5401 116.225 30.852C116.895 29.1349 117.229 27.2577 117.229 25.2204C117.229 23.1832 116.895 21.3205 116.225 19.6325C115.556 17.9153 114.639 16.4456 113.475 15.2232C112.34 14.0009 111.001 13.055 109.459 12.3856C107.945 11.6871 106.33 11.3378 104.613 11.3378C102.867 11.3378 101.251 11.6871 99.7671 12.3856C98.2828 13.055 96.9876 14.0009 95.8817 15.2232C94.8048 16.4456 93.9463 17.9153 93.306 19.6325C92.6948 21.3205 92.3892 23.1832 92.3892 25.2204Z" fill="#00AD5D"/>
                <mask id="path-2-outside-1_2057_46" maskUnits="userSpaceOnUse" x="124.979" y="29.3171" width="47" height="11" fill="black">
                <rect fill="white" x="124.979" y="29.3171" width="47" height="11"/>
                <path d="M127.177 30.4434H127.67L129.65 38.5985L134.467 30.4556H134.997L129.747 39.3171H129.376L127.177 30.4434ZM127.019 30.4495H127.476L126.69 35.2L125.977 39.3171H125.49L127.019 30.4495ZM134.693 30.4495H135.149L133.615 39.3171H133.134L133.846 35.1818L134.693 30.4495ZM141.264 38.8664L141.191 39.3171H136.173L136.24 38.8664H141.264ZM137.927 30.4495L136.392 39.3171H135.905L137.433 30.4495H137.927ZM141.416 34.524L141.349 34.9808H136.928L137.001 34.524H141.416ZM142.714 30.4495L142.641 30.9002H137.634L137.701 30.4495H142.714ZM149.431 30.4495L149.358 30.9002H144.705L143.244 39.3171H142.762L144.291 30.4495H149.431ZM143.828 34.4266L146.204 34.4326C146.699 34.4408 147.143 34.5362 147.537 34.7189C147.935 34.8975 148.238 35.1655 148.445 35.5228C148.652 35.8801 148.717 36.3247 148.64 36.8566C148.579 37.2667 148.451 37.624 148.256 37.9285C148.065 38.233 147.824 38.4888 147.531 38.6959C147.239 38.8989 146.914 39.0532 146.557 39.1588C146.199 39.2603 145.826 39.3131 145.436 39.3171H142.756L144.291 30.4495H144.778L143.323 38.8664H145.442C145.873 38.8624 146.279 38.7852 146.66 38.635C147.042 38.4848 147.365 38.2615 147.629 37.9651C147.897 37.6687 148.069 37.2951 148.146 36.8444C148.224 36.4141 148.179 36.0547 148.012 35.7664C147.85 35.4782 147.606 35.2609 147.282 35.1148C146.961 34.9686 146.601 34.8915 146.204 34.8833H143.761L143.828 34.4266ZM155.796 38.8664L155.723 39.3171H150.704L150.771 38.8664H155.796ZM152.458 30.4495L150.924 39.3171H150.436L151.965 30.4495H152.458ZM155.948 34.524L155.881 34.9808H151.46L151.533 34.524H155.948ZM157.245 30.4495L157.172 30.9002H152.166L152.233 30.4495H157.245ZM164.712 30.4495L164.645 30.9002H160.26L160.327 30.4495H164.712ZM165.053 30.4495L163.525 39.3171H163.037L164.566 30.4495H165.053ZM160.144 30.4495H160.632L159.712 34.4022C159.635 34.7433 159.552 35.129 159.462 35.5594C159.373 35.9898 159.261 36.4242 159.127 36.8627C158.993 37.2972 158.819 37.7012 158.604 38.0747C158.392 38.4442 158.129 38.7426 157.812 38.97C157.495 39.1974 157.105 39.3131 156.642 39.3171H156.411L156.466 38.8664H156.667C157.053 38.8583 157.379 38.7426 157.647 38.5193C157.915 38.296 158.139 38.0097 158.317 37.6606C158.496 37.3073 158.64 36.9297 158.75 36.5277C158.863 36.1217 158.957 35.7299 159.03 35.3523C159.103 34.9706 159.17 34.6417 159.231 34.3657L160.144 30.4495ZM166.826 34.4266L169.201 34.4326C169.696 34.4408 170.141 34.5362 170.535 34.7189C170.933 34.8975 171.235 35.1655 171.442 35.5228C171.649 35.8801 171.714 36.3247 171.637 36.8566C171.576 37.2667 171.448 37.624 171.253 37.9285C171.062 38.233 170.821 38.4888 170.529 38.6959C170.236 38.8989 169.911 39.0532 169.554 39.1588C169.197 39.2603 168.823 39.3131 168.433 39.3171H165.754L167.288 30.4495H167.776L166.32 38.8664H168.44C168.87 38.8624 169.276 38.7852 169.658 38.635C170.039 38.4848 170.362 38.2615 170.626 37.9651C170.894 37.6687 171.067 37.2951 171.144 36.8444C171.221 36.4141 171.176 36.0547 171.01 35.7664C170.847 35.4782 170.604 35.2609 170.279 35.1148C169.958 34.9686 169.599 34.8915 169.201 34.8833H166.759L166.826 34.4266Z"/>
                </mask>
                <path d="M127.177 30.4434H127.67L129.65 38.5985L134.467 30.4556H134.997L129.747 39.3171H129.376L127.177 30.4434ZM127.019 30.4495H127.476L126.69 35.2L125.977 39.3171H125.49L127.019 30.4495ZM134.693 30.4495H135.149L133.615 39.3171H133.134L133.846 35.1818L134.693 30.4495ZM141.264 38.8664L141.191 39.3171H136.173L136.24 38.8664H141.264ZM137.927 30.4495L136.392 39.3171H135.905L137.433 30.4495H137.927ZM141.416 34.524L141.349 34.9808H136.928L137.001 34.524H141.416ZM142.714 30.4495L142.641 30.9002H137.634L137.701 30.4495H142.714ZM149.431 30.4495L149.358 30.9002H144.705L143.244 39.3171H142.762L144.291 30.4495H149.431ZM143.828 34.4266L146.204 34.4326C146.699 34.4408 147.143 34.5362 147.537 34.7189C147.935 34.8975 148.238 35.1655 148.445 35.5228C148.652 35.8801 148.717 36.3247 148.64 36.8566C148.579 37.2667 148.451 37.624 148.256 37.9285C148.065 38.233 147.824 38.4888 147.531 38.6959C147.239 38.8989 146.914 39.0532 146.557 39.1588C146.199 39.2603 145.826 39.3131 145.436 39.3171H142.756L144.291 30.4495H144.778L143.323 38.8664H145.442C145.873 38.8624 146.279 38.7852 146.66 38.635C147.042 38.4848 147.365 38.2615 147.629 37.9651C147.897 37.6687 148.069 37.2951 148.146 36.8444C148.224 36.4141 148.179 36.0547 148.012 35.7664C147.85 35.4782 147.606 35.2609 147.282 35.1148C146.961 34.9686 146.601 34.8915 146.204 34.8833H143.761L143.828 34.4266ZM155.796 38.8664L155.723 39.3171H150.704L150.771 38.8664H155.796ZM152.458 30.4495L150.924 39.3171H150.436L151.965 30.4495H152.458ZM155.948 34.524L155.881 34.9808H151.46L151.533 34.524H155.948ZM157.245 30.4495L157.172 30.9002H152.166L152.233 30.4495H157.245ZM164.712 30.4495L164.645 30.9002H160.26L160.327 30.4495H164.712ZM165.053 30.4495L163.525 39.3171H163.037L164.566 30.4495H165.053ZM160.144 30.4495H160.632L159.712 34.4022C159.635 34.7433 159.552 35.129 159.462 35.5594C159.373 35.9898 159.261 36.4242 159.127 36.8627C158.993 37.2972 158.819 37.7012 158.604 38.0747C158.392 38.4442 158.129 38.7426 157.812 38.97C157.495 39.1974 157.105 39.3131 156.642 39.3171H156.411L156.466 38.8664H156.667C157.053 38.8583 157.379 38.7426 157.647 38.5193C157.915 38.296 158.139 38.0097 158.317 37.6606C158.496 37.3073 158.64 36.9297 158.75 36.5277C158.863 36.1217 158.957 35.7299 159.03 35.3523C159.103 34.9706 159.17 34.6417 159.231 34.3657L160.144 30.4495ZM166.826 34.4266L169.201 34.4326C169.696 34.4408 170.141 34.5362 170.535 34.7189C170.933 34.8975 171.235 35.1655 171.442 35.5228C171.649 35.8801 171.714 36.3247 171.637 36.8566C171.576 37.2667 171.448 37.624 171.253 37.9285C171.062 38.233 170.821 38.4888 170.529 38.6959C170.236 38.8989 169.911 39.0532 169.554 39.1588C169.197 39.2603 168.823 39.3131 168.433 39.3171H165.754L167.288 30.4495H167.776L166.32 38.8664H168.44C168.87 38.8624 169.276 38.7852 169.658 38.635C170.039 38.4848 170.362 38.2615 170.626 37.9651C170.894 37.6687 171.067 37.2951 171.144 36.8444C171.221 36.4141 171.176 36.0547 171.01 35.7664C170.847 35.4782 170.604 35.2609 170.279 35.1148C169.958 34.9686 169.599 34.8915 169.201 34.8833H166.759L166.826 34.4266Z" fill="#00AD5D" mask="url(#path-2-outside-1_2057_46)"/>
              </svg>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase text-primary">
                ПН-ПТ
              </p>
              <a href="tel:+78129454478" target="_blank" className="text-xs font-medium uppercase text-primary">
                +7(812) 945-44-78
              </a>
              <p className="text-xs font-medium uppercase text-primary">
                САНКТ-ПЕТЕРБУРГ
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
