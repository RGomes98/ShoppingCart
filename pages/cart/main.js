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

const zipCodeWrapper = document.getElementById('zipCodeWrapper');
const zipCode = document.body.getElementsByClassName('zipCode');
const invalidZipCodeError = document.createElement('span');
zipCodeWrapper.appendChild(invalidZipCodeError);

const checkoutButton = document.getElementById('checkout');
const invalidCheckoutError = document.createElement('span');
document.body.appendChild(invalidCheckoutError);

checkoutButton.addEventListener('click', () => {
  invalidCheckoutError.innerText = '';
  const isCartFilled = document.getElementById('subtotal').innerText > 0;
  const isZipCodeAdded = document.getElementById('shippingPrice').innerText > 0;

  if (!isZipCodeAdded) {
    return (invalidCheckoutError.innerText = 'Insira o CEP antes de Finalizar a Compra.');
  } else if (!isCartFilled) {
    return (invalidCheckoutError.innerText =
      'Adicione Produtos ao Carrinho Antes de Finalizar a Compra.');
  } else {
    const checkoutPagePath = window.location.pathname.replace('cart', 'checkout');
    window.location.pathname = checkoutPagePath;
  }
});

const total = document.getElementById('total');
total.innerText = (0).toFixed(2);

const subtotal = document.getElementById('subtotal');
subtotal.innerText = (0).toFixed(2);

const shipping = document.getElementById('shippingPrice');
shipping.innerText = (0).toFixed(2);

const cartProducts = document.getElementById('cartContainer');
const shippingButton = document.getElementById('calcShipping');

shippingButton.addEventListener('click', () => {
  const zipCodeArray = Array.from(zipCode);
  const fullZipCode = zipCodeArray.map((input) => input.value).join('');

  const isZipCodeValid = zipCodeArray.every((input, idx) => {
    const inputLength = input.value.length;
    const requiredLength = idx === 0 ? 5 : 3;
    const isNumberInteger = Number.isInteger(Number(input.value));

    return inputLength === requiredLength && isNumberInteger;
  });

  if (!isZipCodeValid) {
    return (invalidZipCodeError.innerText =
      'O CEP deve conter apenas números inteiros, com 5 dígitos no primeiro campo e 3 dígitos no segundo campo.');
  } else {
    invalidZipCodeError.innerText = '';
    zipCodeArray.forEach((input) => (input.value = ''));
    const productsZipCodes = Array.from(document.body.getElementsByClassName('productZipCode'));
    productsZipCodes.forEach((product) => {
      return (product.innerText = `${fullZipCode.slice(0, 5)}-${fullZipCode.slice(5)}`);
    });
  }

  const isShippingTaxAdded = shipping.innerHTML > 0;
  if (isShippingTaxAdded) {
    return;
  } else {
    shipping.innerHTML = (100).toFixed(2);
    total.innerText = (Number(total.innerText) + 100).toFixed(2);
  }
});

products.forEach(({ name, image, price }, idx) => {
  const imageWrapper = document.createElement('div');
  imageWrapper.className = 'imageWrapper';

  const productImage = document.createElement('img');
  productImage.src = image;

  function handleMouseEvent(e) {
    const eventType = e.type;

    switch (eventType) {
      case 'mouseover':
        productImage.src = '../../images/assets/svgs/magnifyingGlass.svg';
        break;
      case 'mouseout':
        productImage.src = image;
        break;
      default:
        return;
    }
  }

  productImage.addEventListener('mouseover', handleMouseEvent);
  productImage.addEventListener('mouseout', handleMouseEvent);

  const productName = document.createElement('span');
  productName.innerText = name;

  const productWrapper = document.createElement('div');
  productWrapper.className = 'productWrapper';

  const productShipping = document.createElement('span');
  productShipping.className = 'productZipCode';
  productShipping.innerText = 'Informe o CEP';

  const productTotalPrice = document.createElement('span');
  productTotalPrice.innerText = `R$ ${(0).toFixed(2)}`;

  const productUnitPrice = document.createElement('span');
  productUnitPrice.innerText = price;

  const productAmmount = document.createElement('input');
  productAmmount.value = 0;

  productAmmount.addEventListener('focusout', (e) => {
    const currentAmmount = e.target.value;
    const isValueNotNumeric = isNaN(currentAmmount);

    let totalPrice = 0;
    const isValueNegative = currentAmmount < 0;
    const isValueBiggerThanNine = currentAmmount > 9;

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

    productTotalPrice.innerText = `R$ ${totalPrice.toFixed(2)}`;
    const productsTotal = products.reduce((acc, val) => (acc += val.ammount * val.price), 0);

    subtotal.innerText = productsTotal.toFixed(2);
    total.innerText = (productsTotal + Number(shipping.innerText)).toFixed(2);
  });

  imageWrapper.appendChild(productImage);
  imageWrapper.appendChild(productName);

  productWrapper.appendChild(imageWrapper);
  productWrapper.appendChild(productAmmount);
  productWrapper.appendChild(productShipping);
  productWrapper.appendChild(productUnitPrice);
  productWrapper.appendChild(productTotalPrice);

  cartProducts.appendChild(productWrapper);
});