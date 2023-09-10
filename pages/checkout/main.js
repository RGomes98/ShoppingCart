let selectedBrand = 'visa';

const cardName = document.getElementById('card_name');
const cardCode = document.getElementById('card_code');
const cardNumber = document.getElementById('card_number');
const checkoutForm = document.getElementById('checkout_form');
const cardBrands = document.getElementById('card_brands_wrapper');
const paymentMethodImage = document.getElementById('payment_method_image');
const creditCardPayment = document.getElementById('credit_payment_button');
const otherPaymentMethods = document.getElementsByClassName('regular_payment');
const checkoutWrapper = document.getElementsByClassName('checkout_wrapper')[0];
const paymentButtonsWrapper = document.getElementById('payment_button_wrapper');
const paymentMethodsWrapper = document.getElementById('payment_methods_wrapper');
const cardBrandsButtonWrapper = document.getElementById('card_brands_button_wrapper');

const formError = document.createElement('span');
formError.className = 'form_error';
checkoutWrapper.appendChild(formError);

const cardBrandLogo = document.createElement('img');
cardBrandLogo.src = '../../images/assets/pngs/visa.png';
cardBrandsButtonWrapper.before(cardBrandLogo);
cardBrandLogo.className = 'card_logo';

const cardNameWrapper = document.getElementsByClassName('checkout_form_input_wrapper')[0];
cardNameWrapper.classList.add('hide_element');

creditCardPayment.addEventListener('click', handleCreditCardPayment);

function handleCreditCardPayment() {
  checkoutForm.reset();
  cardNameWrapper.classList.remove('hide_element');
  paymentMethodImage.src = '../../images/assets/pngs/credit.png';
}

Array.from(otherPaymentMethods).forEach((element) =>
  element.addEventListener('click', handleOtherPaymentMethods)
);

function handleOtherPaymentMethods(e) {
  checkoutForm.reset();
  cardNameWrapper.classList.add('hide_element');
  const paymentMethod = e.target.innerText.toLowerCase();

  switch (paymentMethod) {
    case 'débito':
      paymentMethodImage.src = '../../images/assets/pngs/debit.png';
      break;
    case 'pix':
      paymentMethodImage.src = '../../images/assets/pngs/pix.png';
      break;
    case 'boleto':
      paymentMethodImage.src = '../../images/assets/pngs/bill.png';
      break;
  }
}

Array.from(cardBrandsButtonWrapper.childNodes)
  .filter((element) => element.localName === 'button')
  .forEach((element) => element.addEventListener('click', handleSelectCreditCardBrand));

function handleSelectCreditCardBrand(e) {
  const { id: cardBrand } = e.target;
  selectedBrand = cardBrand;

  switch (cardBrand) {
    case 'visa':
      cardBrandLogo.src = '../../images/assets/pngs/visa.png';
      break;
    case 'mastercard':
      cardBrandLogo.src = '../../images/assets/pngs/mastercard.png';
      break;
    case 'americanexpress':
      cardBrandLogo.src = '../../images/assets/pngs/americanexpress.png';
      break;
  }
}

cardName.addEventListener('input', handleCardName);

function handleCardName(e) {
  const string = e.target.value;
  const lastChar = string.split('').at(-1);
  const isLastCharLetter = string && lastChar.toLowerCase() !== lastChar.toUpperCase();

  if (string.length <= 19 && (isLastCharLetter || lastChar === ' ')) {
    cardName.value = string.toUpperCase();
  } else {
    cardName.value = string.slice(0, string.length - 1);
  }
}

cardNumber.addEventListener('input', handleCardNumber);

function handleCardNumber(e) {
  const string = e.target.value;
  const lastChar = string.split('').at(-1);

  if (string.length <= 16 && !isNaN(lastChar) && lastChar !== ' ') {
    cardNumber.value = string;
  } else {
    cardNumber.value = string.slice(0, string.length - 1);
  }
}

cardCode.addEventListener('input', handleCardCode);

function handleCardCode(e) {
  const string = e.target.value;
  const lastChar = string.split('').at(-1);

  if (string.length <= 3 && !isNaN(lastChar) && lastChar !== ' ') {
    cardCode.value = string;
  } else {
    cardCode.value = string.slice(0, string.length - 1);
  }
}

checkoutForm.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  formError.innerText = '';

  const {
    card_name: { value: cardName },
    card_number: { value: cardNumber },
    card_code: { value: cardCode },
  } = e.target;

  const isAmericanExpress = selectedBrand === 'americanexpress' ? 15 : 16;
  const isPaymentMethodCreditCard = !cardNameWrapper.classList.contains('hide_element');

  if (!isPaymentMethodCreditCard && (!cardNumber || !cardCode)) {
    return (formError.innerText = 'Preencha o Número e Código do Cartão.');
  }

  if (isPaymentMethodCreditCard && (!cardName || !cardNumber || !cardCode)) {
    return (formError.innerText = 'Preencha o Nome, Número e Código do Cartão.');
  }

  const isCardNameValid = cardName.split('').every((char, _, name) => {
    return name.length <= 19 && (char.toLowerCase() !== char.toUpperCase() || char === ' ');
  });

  if (!isCardNameValid) {
    return (formError.innerText =
      'Nome Inválido. Máximo de 19 caracteres e sem números. Corrija e tente novamente.');
  }
  const isCardNumberValid = cardNumber.split('').every((char, _, number) => {
    return number.length === isAmericanExpress && !isNaN(char) && char !== ' ';
  });

  if (!isCardNumberValid) {
    return (formError.innerText = `Número do Cartão Inválido. Insira ${isAmericanExpress} dígitos numéricos sem espaços. Corrija e tente novamente.`);
  }

  const isCardCodeValid = cardCode.split('').every((char, _, number) => {
    return number.length === 3 && !isNaN(char) && char !== ' ';
  });

  if (!isCardCodeValid) {
    return (formError.innerText =
      'Código de Segurança Inválido. Deve conter exatamente 3 dígitos numéricos. Corrija e tente novamente.');
  }

  const validateCardBrand = {
    visa: /^4[0-9]{12,15}$/,
    mastercard: /^5[1-5]{1}[0-9]{14}$/,
    americanexpress: /^3(4|7){1}[0-9]{13}$/,
  };

  const isCardBrandValid = validateCardBrand[selectedBrand]?.test(cardNumber);

  if (!isCardBrandValid) {
    return (formError.innerText =
      'Número de Cartão de Crédito Inválido. Verifique se o número foi inserido corretamente e tente novamente.');
  }

  checkoutForm.reset();
  const successfulPurchaseMessage = document.createElement('span');
  successfulPurchaseMessage.innerText = 'Compra realizada com sucesso!';
  successfulPurchaseMessage.className = 'success_message';
  checkoutWrapper.appendChild(successfulPurchaseMessage);
  setTimeout(() => successfulPurchaseMessage.remove(), 5000);
}
