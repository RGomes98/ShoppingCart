const products = [
  {
    name: 'Mochila Fjallraven - Foldsack Nº 1, Adequada para Laptops de 15 Polegadas',
    image: '../../images/products/product1.jpg',
    price: 129.99,
    ammount: 0,
  },
  {
    name: 'Camiseta Casual Masculinas de Corte Ajustado Premium',
    image: '../../images/products/product2.jpg',
    price: 59.99,
    ammount: 0,
  },
  {
    name: 'Jaqueta de Algodão Masculina',
    image: '../../images/products/product3.jpg',
    price: 89.99,
    ammount: 0,
  },
  {
    name: 'Roupa Casual Masculina de Corte Ajustado',
    image: '../../images/products/product4.jpg',
    price: 69.99,
    ammount: 0,
  },
  {
    name: 'Jaqueta de Snowboard 3-em-1 para Mulheres BIYLACLESEN ',
    image: '../../images/products/product5.jpg',
    price: 69.99,
    ammount: 0,
  },
  {
    name: 'Jaqueta Motoqueira de Couro Sintético com Capuz Removível Lock and Love para Mulheres',
    image: '../../images/products/product6.jpg',
    price: 89.99,
    ammount: 0,
  },
  {
    name: 'Jaqueta de Chuva Feminina Corta-Vento Listrada para Escalada',
    image: '../../images/products/product7.jpg',
    price: 79.99,
    ammount: 0,
  },
  {
    name: 'Camiseta de Manga Curta com Gola Barco em Cor Sólida para Mulheres MBJ',
    image: '../../images/products/product8.jpg',
    price: 59.99,
    ammount: 0,
  },
  {
    name: 'Camiseta de Manga Curta para Mulheres Opna com Controle de Umidade',
    image: '../../images/products/product9.jpg',
    price: 109.99,
    ammount: 0,
  },
  {
    name: 'Camiseta Casual de Algodão de Manga Curta para Mulheres DANVOUY',
    image: '../../images/products/product10.jpg',
    price: 49.99,
    ammount: 0,
  },
];

const formatToCurrency = (number) => number.toFixed(2);

const total = document.getElementById('total');
const subtotal = document.getElementById('subtotal');
const shipping = document.getElementById('shipping_price');
const cartProducts = document.getElementById('cart_container');
const checkoutButton = document.getElementById('checkout_button');
const shippingButton = document.getElementById('shipping_button');

const zipCode = document.body.getElementsByClassName('zipcode');
const zipCodeWrapper = document.getElementById('zipcode_wrapper');

const invalidCheckoutError = document.createElement('span');
invalidCheckoutError.className = 'checkout_error';
zipCodeWrapper.appendChild(invalidCheckoutError);

const invalidZipCodeError = document.createElement('span');
invalidZipCodeError.className = 'zipcode_error';
zipCodeWrapper.appendChild(invalidZipCodeError);

checkoutButton.addEventListener('click', handleCheckout);

function handleCheckout() {
  invalidZipCodeError.innerText = '';
  invalidCheckoutError.innerText = '';

  const isCartFilled = document.getElementById('subtotal').innerText > 0;
  const isZipCodeAdded = document.getElementById('shipping_price').innerText > 0;

  if (!isZipCodeAdded) {
    return (invalidCheckoutError.innerText = 'Insira o CEP antes de Finalizar a Compra.');
  }

  if (!isCartFilled) {
    return (invalidCheckoutError.innerText =
      'Adicione Produtos ao Carrinho Antes de Finalizar a Compra.');
  }

  const checkoutPagePath = window.location.pathname
    .split('/')
    .reverse()
    .join('/')
    .replace('cart', 'checkout')
    .split('/')
    .reverse()
    .join('/');
  window.location.pathname = checkoutPagePath;
}

shippingButton.addEventListener('click', handleZipCode);

function handleZipCode() {
  invalidZipCodeError.innerText = '';
  invalidCheckoutError.innerText = '';

  const zipCodeValues = Array.from(zipCode);
  const isShippingTaxAdded = shipping.innerHTML > 0;
  const fullZipCode = zipCodeValues.map((input) => input.value).join('');
  const productsZipCodes = Array.from(document.body.getElementsByClassName('product_zip_code'));

  const isZipCodeValid = zipCodeValues.every((input, idx) => {
    const inputLength = input.value.length;
    const requiredLength = idx === 0 ? 5 : 3;
    const isNumberInteger = Number.isInteger(Number(input.value));

    return inputLength === requiredLength && isNumberInteger;
  });

  if (!isZipCodeValid) {
    return (invalidZipCodeError.innerText =
      'O CEP deve conter apenas números inteiros, com 5 dígitos no primeiro campo e 3 dígitos no segundo campo.');
  }

  zipCodeValues.forEach((input) => (input.value = ''));
  productsZipCodes.forEach((product) => {
    return (product.innerText = `Endereço: ${fullZipCode.slice(0, 5)}-${fullZipCode.slice(5)}`);
  });

  if (isShippingTaxAdded) return;
  shipping.innerHTML = formatToCurrency(100);
  total.innerText = formatToCurrency(Number(total.innerText) + 100);
}

products.forEach(({ name, image, price }, idx) => {
  const productWrapper = document.createElement('div');
  productWrapper.className = 'product_wrapper';

  const productImage = document.createElement('img');
  productImage.className = 'product_image';
  productImage.src = image;

  const productNameWrapper = document.createElement('div');
  productNameWrapper.className = 'product_name_wrapper';

  const productName = document.createElement('span');
  productName.innerText = name;

  const productQuantityText = document.createElement('span');
  productQuantityText.className = 'product_quantity_text';
  productQuantityText.innerText = 'Quantidade: ';

  const productAmmount = document.createElement('input');
  productAmmount.value = 0;

  const productPriceWrapper = document.createElement('div');
  productPriceWrapper.className = 'product_price_wrapper';

  const productUnitPrice = document.createElement('span');
  productUnitPrice.innerText = `Preço Unitário: R$ ${formatToCurrency(price)}`;

  const productTotalPrice = document.createElement('span');
  productTotalPrice.innerText = `Preço Total: R$ ${formatToCurrency(0)}`;

  const productShipping = document.createElement('span');
  productShipping.className = 'product_zip_code';
  productShipping.innerText = 'Endereço: Informe o CEP';

  productImage.addEventListener('mouseover', handleMouseEvent);
  productImage.addEventListener('mouseout', handleMouseEvent);

  function handleMouseEvent(e) {
    const eventType = e.type;

    switch (eventType) {
      case 'mouseover':
        productImage.src = '../../images/assets/svgs/magnifyingGlass.svg';
        break;
      case 'mouseout':
        productImage.src = image;
        break;
    }
  }

  productAmmount.addEventListener('focusout', handleFocusOut);

  function handleFocusOut(e) {
    let totalPrice = 0;
    const currentAmmount = e.target.value;
    const isValueNegative = currentAmmount < 0;
    const isValueBiggerThanNine = currentAmmount > 9;
    const isValueNotNumeric = isNaN(currentAmmount);

    if (isValueNegative || isValueNotNumeric) {
      totalPrice = 0;
      productAmmount.value = 0;
      products[idx].ammount = 0;
    } else if (isValueBiggerThanNine) {
      productAmmount.value = 9;
      products[idx].ammount = 9;
      totalPrice = products[idx].price * 9;
    } else {
      products[idx].ammount = Number(currentAmmount);
      totalPrice = products[idx].price * currentAmmount;
    }

    const currentTotalPrice = products.reduce((acc, val) => (acc += val.ammount * val.price), 0);
    subtotal.innerText = formatToCurrency(currentTotalPrice);
    productTotalPrice.innerText = `Preço Total: R$ ${formatToCurrency(totalPrice)}`;
    total.innerText = formatToCurrency(currentTotalPrice + Number(shipping.innerText));
  }

  productNameWrapper.appendChild(productName);
  productNameWrapper.appendChild(productQuantityText);
  productNameWrapper.appendChild(productAmmount);

  productPriceWrapper.appendChild(productUnitPrice);
  productPriceWrapper.appendChild(productTotalPrice);
  productPriceWrapper.appendChild(productShipping);

  productWrapper.appendChild(productImage);
  productWrapper.appendChild(productNameWrapper);
  productWrapper.appendChild(productPriceWrapper);

  cartProducts.appendChild(productWrapper);
});
