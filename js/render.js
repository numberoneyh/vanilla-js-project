const productsContainer = document.querySelector('#products-container');

getProducts();

async function getProducts() {
    const response = await fetch('./js/products.json');
    const productsArray = await response.json();

    renderProducts(productsArray);
}

function renderProducts(productsArray) {
    productsArray.forEach(function (product) {
        const productHtml = `<div class="col-md-6">
        <div class="card mb-4" data-id="${product.id}">
          <img
            class="product-img"
            src="img/roll/${product.imgSrc}"
            alt=""
          />
          <div class="card-body text-center">
            <h4 class="item-title">${product.title}</h4>
            <p>
              <small data-items-in-box class="text-muted">${product.itemsInBox} шт.</small>
            </p>

            <div class="details-wrapper">
              <div class="items counter-wrapper">
                <div class="items__control" data-action="minus">-</div>
                <div class="items__current" data-counter>1</div>
                <div class="items__control" data-action="plus">+</div>
              </div>

              <div class="price">
                <div class="price__weight">${product.weight}г.</div>
                <div class="price__currency">${product.price}₽</div>
              </div>
            </div>

            <button
              data-cart
              type="button"
              class="btn btn-block btn-outline-warning"
            >
              + в корзину
            </button>
          </div>
        </div>
      </div>`;

        productsContainer.insertAdjacentHTML('beforeend', productHtml);
    });
}
