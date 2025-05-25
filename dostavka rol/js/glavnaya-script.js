document.addEventListener('DOMContentLoaded', function() {
    const burgerButton = document.querySelector('.header__burger');
    const mobileMenu = document.querySelector('.mobile-menu');

    burgerButton.addEventListener('click', function() {
        mobileMenu.style.display = mobileMenu.style.display === 'flex' ? 'none' : 'flex';
        document.body.classList.toggle('no-scroll', mobileMenu.style.display === 'flex'); // Предотвращает прокрутку фона
    });

    // Закрываем меню при клике на ссылку
    const mobileLinks = document.querySelectorAll('.mobile-menu__link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.style.display = 'none';
            document.body.classList.remove('no-scroll');
        });
    });
});

                                                               // ВИДЫ РОЛЛОВ

document.addEventListener('DOMContentLoaded', function() {
    const tovarCards = document.querySelectorAll('.tovarCard');
    const tovarModal = document.getElementById('tovarModal');
    const modalContent = tovarModal.querySelector('.tovarModal__content');
    const closeButton = tovarModal.querySelector('.tovarModal__closeButton');
    const addToCartButton = tovarModal.querySelector('.tovarModal__addToCartButton');
    const cartContainer = document.getElementById('cartContainer');
    const cartTotalElement = document.createElement('p');
    cartTotalElement.classList.add('cartTotal');
    cartContainer.parentNode.insertBefore(cartTotalElement, cartContainer.nextSibling);

    const knopkaKorziny = document.getElementById('knopkaKorziny');
    const knopkaKorzinyCount = document.getElementById('knopkaKorzinyCount');

    // Функция для открытия модального окна
    function openModal(tovar) {
        tovarModal.style.display = 'flex';

        // Заполнение модального окна данными
        tovarModal.querySelector('.tovarModal__image').src = tovar.querySelector('.tovarCard__image').src;
        tovarModal.querySelector('.tovarModal__name').textContent = tovar.querySelector('.tovarCard__name').textContent;
        tovarModal.querySelector('.tovarModal__description').textContent = tovar.querySelector('.tovarCard__description').textContent;
        tovarModal.querySelector('.tovarModal__quantity').textContent = tovar.querySelector('.tovarCard__quantity').textContent;
        tovarModal.querySelector('.tovarModal__price').textContent = tovar.querySelector('.tovarCard__price').textContent;

        // Сохранение данных товара в атрибутах кнопки "В корзину"
        addToCartButton.dataset.tovarId = tovar.dataset.tovarId;
        addToCartButton.dataset.name = tovar.querySelector('.tovarCard__name').textContent;
        addToCartButton.dataset.price = tovar.querySelector('.tovarCard__price').textContent;
        addToCartButton.dataset.image = tovar.querySelector('.tovarCard__image').src;
    }

    // Функция для закрытия модального окна
    function closeModal() {
        tovarModal.style.display = 'none';
    }

    // Функция для обновления количества товаров в корзине на кнопке
    function updateKnopkaKorzinyCount() {
        const cartItems = cartContainer.querySelectorAll('.cartItem');
        const totalItems = cartItems.length; // Просто количество элементов в корзине
        knopkaKorzinyCount.textContent = totalItems;
    }

    // Функция для обновления общей суммы и количества товаров
    function updateCartTotal() {
        let totalItems = 0;
        let totalPrice = 0;

        const cartItems = cartContainer.querySelectorAll('.cartItem');
        cartItems.forEach(cartItem => {
            const quantity = parseInt(cartItem.dataset.quantity) || 1;
            const price = parseFloat(cartItem.dataset.price);
            totalItems += quantity;
            totalPrice += price * quantity;
        });

        cartTotalElement.textContent = `Всего товаров: ${totalItems}, Общая сумма: ${totalPrice.toFixed(2)} ₽`;
    }

    // Функция для добавления товара в корзину
    function addToCart(event) {
        const tovarId = event.target.dataset.tovarId;
        const name = event.target.dataset.name;
        const price = event.target.dataset.price;
        const image = event.target.dataset.image;

        // Проверяем, есть ли уже товар в корзине
        const existingCartItem = cartContainer.querySelector(`.cartItem[data-tovar-id="${tovarId}"]`);

        if (existingCartItem) {
            // Если товар уже есть в корзине, увеличиваем количество
            let quantity = parseInt(existingCartItem.dataset.quantity) || 1;
            quantity++;
            existingCartItem.dataset.quantity = quantity;
            existingCartItem.querySelector('.cartItem__quantity').textContent = `Количество: ${quantity}`;
        } else {
            // Если товара нет в корзине, создаем новый элемент
            const cartItem = document.createElement('div');
            cartItem.classList.add('cartItem');
            cartItem.dataset.tovarId = tovarId;
            cartItem.dataset.name = name;
            cartItem.dataset.price = price;
            cartItem.dataset.image = image;
            cartItem.dataset.quantity = 1; // Изначальное количество

            cartItem.innerHTML = `
                <h4 class="cartItem__name">${name}</h4>
                <p class="cartItem__price">${price} </p>
                <p class="cartItem__quantity">Количество: 1</p>
                <button class="cartItem__removeButton">Удалить</button>
            `;

            // Добавление элемента в корзину
            cartContainer.appendChild(cartItem);
        }

        // Обновляем общую сумму и количество
        updateCartTotal();

        // Обновляем счетчик на кнопке корзины
        updateKnopkaKorzinyCount();

        // Закрытие модального окна
        closeModal();
    }

    // Функция для удаления товара из корзины
    function removeFromCart(event) {
        event.target.closest('.cartItem').remove();
        updateCartTotal(); // Обновляем сумму после удаления
        updateKnopkaKorzinyCount(); // Обновляем счетчик на кнопке корзины
    }

    // Обработчики событий
    tovarCards.forEach(tovarCard => {
        tovarCard.addEventListener('click', function() {
            openModal(this);
        });
    });

    closeButton.addEventListener('click', closeModal);
    addToCartButton.addEventListener('click', addToCart);

    // Закрытие модального окна при клике вне его области
    window.addEventListener('click', function(event) {
        if (event.target === tovarModal) {
            closeModal();
        }
    });

    // Логика удаления товара из корзины
    cartContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('cartItem__removeButton')) {
            removeFromCart(event); // Вызываем функцию для удаления
        }
    });

    // Инициализация счетчика при загрузке страницы
    updateKnopkaKorzinyCount();
});

                                    // РАЗДЕЛ АКЦИИ

document.addEventListener('DOMContentLoaded', function() {
    const akciiSliderList = document.getElementById('akciiSliderList');
    const akciiPrevBtn = document.getElementById('akciiPrevBtn');
    const akciiNextBtn = document.getElementById('akciiNextBtn');
    const akciiSlides = document.querySelectorAll('.akciiSection__slide');
    const akciiSlideCount = akciiSlides.length;
    let akciiSlideIndex = 0;
    let isAnimating = false; // Флаг, чтобы предотвратить быстрое переключение

    function showAkciiSlide(index) {
        if (isAnimating) return; // Предотвращаем переключение во время анимации

        if (index < 0) {
            akciiSlideIndex = akciiSlideCount - 1;
        } else if (index >= akciiSlideCount) {
            akciiSlideIndex = 0;
        } else {
            akciiSlideIndex = index;
        }

        // Запускаем анимацию
        isAnimating = true;
        akciiSliderList.style.transition = 'transform 0.5s ease-in-out'; // Добавляем transition
        akciiSliderList.style.transform = `translateX(-${akciiSlideIndex * 100}%)`;

        // Сбрасываем флаг после завершения анимации
        setTimeout(() => {
            isAnimating = false;
            akciiSliderList.style.transition = ''; // Удаляем transition, чтобы не мешала другим изменениям
        }, 500); // Время анимации
    }

    function goToNextAkciiSlide() {
        showAkciiSlide(akciiSlideIndex + 1);
    }

    function goToPrevAkciiSlide() {
        showAkciiSlide(akciiSlideIndex - 1);
    }

    akciiPrevBtn.addEventListener('click', goToPrevAkciiSlide);
    akciiNextBtn.addEventListener('click', goToNextAkciiSlide);

    // Инициализация слайдера
    showAkciiSlide(akciiSlideIndex);
});

                                    //  РАЗДЕЛ С ВОПРОСАМИ

document.addEventListener('DOMContentLoaded', function() {
    const voprosyItems = document.querySelectorAll('.voprosySection__vopros');

    voprosyItems.forEach(vopros => {
        const voprosHeader = vopros.querySelector('.voprosySection__voprosHeader');

        voprosHeader.addEventListener('click', () => {
            // Закрываем все открытые элементы
            voprosyItems.forEach(otherVopros => {
                if (otherVopros !== vopros && otherVopros.classList.contains('active')) {
                    otherVopros.classList.remove('active');
                }
            });

            // Открываем/закрываем текущий элемент
            vopros.classList.toggle('active');
        });
    });
});

                                    //  Кнопка корзины 

document.addEventListener('DOMContentLoaded', function() {
    const knopkaKorziny = document.getElementById('knopkaKorziny');
    const knopkaKorzinyCount = document.getElementById('knopkaKorzinyCount');
    const cartSection = document.getElementById('cartSection');

    // Функция для обновления количества товаров в корзине
    function updateKnopkaKorzinyCount(count) {
        knopkaKorzinyCount.textContent = count;
    }


    // Функция для плавного перехода к разделу корзины
    function scrollToCart() {
        cartSection.scrollIntoView({
            behavior: 'smooth'
        });
    }

    // Обработчик клика на кнопку корзины
    knopkaKorziny.addEventListener('click', scrollToCart);

    // Пример: обновление количества товаров в корзине (нужно интегрировать с вашей логикой добавления/удаления товаров)
    // setInterval(() => { // For Testing
    //     initialCount++;
    //     updateKnopkaKorzinyCount(initialCount);
    // }, 2000) // For Testing
});