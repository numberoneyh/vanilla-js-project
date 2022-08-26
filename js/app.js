const cartWrapper = document.querySelector('.cart-wrapper');
const cartEmpty = document.querySelector('[data-cart-empty]');

const toggleCartStatus = () => {
    const orderForm = document.querySelector('#order-form');
    const cartStatus = cartWrapper.children;

    if (cartStatus.length > 0) {
        cartEmpty.classList.add('none');
        orderForm.classList.remove('none');
    } else {
        cartEmpty.classList.remove('none');
        orderForm.classList.add('none');
    }
};

const calcSumm = () => {
    const cartWrapper = document.querySelector('.cart-wrapper');
    const priceElements = cartWrapper.querySelectorAll('.price__currency');
    const totalPriceEl = document.querySelector('.total-price');
    const deliveryCost = document.querySelector('[data-delivery]');

    let priceTotal = 0;

    priceElements.forEach((item) => {
        const amountEl = item.closest('.cart-item').querySelector('[data-counter]');

        priceTotal += parseInt(item.innerText) * parseInt(amountEl.innerText);
    });

    totalPriceEl.innerText = priceTotal;

    if (priceTotal >= 600) {
        deliveryCost.classList.add('free');
        deliveryCost.innerText = 'Бесплатно';
    } else {
        deliveryCost.classList.remove('free');
        deliveryCost.innerText = 'Платно';
    }
    if (priceTotal === 0) {
        deliveryCost.innerText = null;
    }
};

window.addEventListener('click', (event) => {
    let counter;

    if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {
        const counterWrapper = event.target.closest('.counter-wrapper');
        counter = counterWrapper.querySelector('[data-counter]');
    }

    if (event.target.dataset.action === 'plus') {
        counter.innerText = ++counter.innerText;
    }

    if (event.target.dataset.action === 'minus') {
        if (parseInt(counter.innerText) > 1) {
            counter.innerText = --counter.innerText;
        } else if (event.target.closest('.cart-wrapper') && parseInt(counter.innerText) === 1) {
            event.target.closest('.cart-item').remove();

            toggleCartStatus();

            calcSumm();
        }
    }

    if (event.target.hasAttribute('data-action') && event.target.closest('.cart-wrapper')) {
        calcSumm();
    }
});

window.addEventListener('click', (event) => {
    if (event.target.hasAttribute('data-cart')) {
        const card = event.target.closest('.card');

        const productInfo = {
            id: card.dataset.id,
            imgSrc: card.querySelector('.product-img').getAttribute('src'),
            title: card.querySelector('.item-title').innerText,
            itemInBox: card.querySelector('[data-items-in-box]').innerText,
            weight: card.querySelector('.price__weight').innerText,
            price: card.querySelector('.price__currency').innerText,
            counter: card.querySelector('[data-counter]').innerText,
        };

        const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);

        if (itemInCart) {
            const counterEl = itemInCart.querySelector('[data-counter]');
            counterEl.innerText = parseInt(counterEl.innerText) + parseInt(productInfo.counter);
        } else {
            const template = `
            <div class="cart-item" data-id="${productInfo.id}">
            <div class="cart-item__top">
                <div class="cart-item__img">
                <img src="${productInfo.imgSrc}" alt="" />
                </div>
                <div class="cart-item__desc">
                <div class="cart-item__title">${productInfo.title}</div>
                <div class="cart-item__weight">${productInfo.itemInBox} / ${productInfo.weight}</div>
                <div class="cart-item__details">
                    <div class="items items--small counter-wrapper">
                    <div class="items__control" data-action="minus">-</div>
                    <div class="items__current" data-counter>
                        ${productInfo.counter}
                    </div>
                    <div class="items__control" data-action="plus">+</div>
                    </div>
                    <div class="price">
                    <div class="price__currency">${productInfo.price}</div>
                    </div>
                </div>
                </div>
            </div>
            </div>
            `;

            cartWrapper.insertAdjacentHTML('beforeend', template);
        }

        card.querySelector('[data-counter]').innerText = 1;

        toggleCartStatus();

        calcSumm();
    }
});
