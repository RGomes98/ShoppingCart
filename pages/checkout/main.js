const creditCardPayment = document.getElementById('creditPayment');
const cardName = document.getElementById('cardName');
const creditCardNameLabel = document.querySelector(`label[for=${cardName.id}]`);
const cardBrands = document.getElementById('cardBrands');
const otherPaymentMethods = document.getElementsByClassName('regularPayment');
const cardNumber = document.getElementById('cardNumber');
const cardCode = document.getElementById('cardCode');
const checkoutForm = document.getElementById('checkoutForm');
const paymentMethodImage = document.getElementById('paymentMethodImage');

creditCardNameLabel.classList.add('hideElement');
cardName.classList.add('hideElement');

let selectedBrand = null;
const selectedCardBrand = document.createElement('span');
selectedCardBrand.innerText = selectedBrand ?? 'Bandeira: Não Selecionada';
cardBrands.appendChild(selectedCardBrand);

const selectedPaymentMethod = document.createElement('span');
selectedPaymentMethod.innerText = 'Método: Débito';
document.getElementsByClassName('paymentMethods')[0].appendChild(selectedPaymentMethod);

const formError = document.createElement('span');
checkoutForm.appendChild(formError);

const cardBrandLogo = document.createElement('img');
cardBrandLogo.classList.add('cardLogo');

creditCardPayment.addEventListener('click', () => {
  cardName.classList.remove('hideElement');
  creditCardNameLabel.classList.remove('hideElement');
  paymentMethodImage.src = '../../images/assets/pngs/credit.png';
  selectedPaymentMethod.innerText = 'Método: Cartão de crédito';
});

Array.from(otherPaymentMethods).forEach((element) => {
  element.addEventListener('click', (e) => {
    const paymentMethod = e.target.innerText.toLowerCase();

    switch (paymentMethod) {
      case 'débito':
        paymentMethodImage.src = '../../images/assets/pngs/debit.png';
        selectedPaymentMethod.innerText = 'Método: Débito';
        break;
      case 'pix':
        paymentMethodImage.src = '../../images/assets/pngs/pix.png';
        selectedPaymentMethod.innerText = 'Método: PIX';
        break;
      case 'boleto':
        paymentMethodImage.src = '../../images/assets/pngs/bill.png';
        selectedPaymentMethod.innerText = 'Método: Boleto';
        break;
    }

    cardName.classList.add('hideElement');
    creditCardNameLabel.classList.add('hideElement');
  });
});

Array.from(cardBrands.childNodes).forEach((element) => {
  element.addEventListener('click', (e) => {
    const { id: cardBrand } = e.target;
    selectedBrand = cardBrand;
    selectedCardBrand.innerText = `Bandeira: ${selectedBrand.toUpperCase()}`;
    cardBrands.after(cardBrandLogo);

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
  });
});

cardName.addEventListener('input', (e) => {
  const string = e.target.value;
  const lastChar = string.split('').at(-1);

  if (
    string &&
    string.length <= 19 &&
    (lastChar.toLowerCase() !== lastChar.toUpperCase() || lastChar === ' ')
  ) {
    cardName.value = string.toUpperCase();
  } else {
    cardName.value = string.slice(0, string.length - 1);
  }
});

cardNumber.addEventListener('input', (e) => {
  const string = e.target.value;
  const lastChar = string.split('').at(-1);

  if (string.length <= 16 && !isNaN(lastChar) && lastChar !== ' ') {
    cardNumber.value = string;
  } else {
    cardNumber.value = string.slice(0, string.length - 1);
  }
});

cardCode.addEventListener('input', (e) => {
  const string = e.target.value;
  const lastChar = string.split('').at(-1);

  if (string.length <= 3 && !isNaN(lastChar) && lastChar !== ' ') {
    cardCode.value = string;
  } else {
    cardCode.value = string.slice(0, string.length - 1);
  }
});

checkoutForm.addEventListener('submit', (e) => {
  formError.innerText = '';
  e.preventDefault();

  const {
    cardName: { value: cardName },
    cardNumber: { value: cardNumber },
    cardCode: { value: cardCode },
  } = e.target;

  const isPaymentMethodCreditCard = document
    .getElementById('cardName')
    .classList.contains('hideElement');
  const isAmericaExpress = selectedBrand === 'americanexpress' ? 15 : 16;

  if (isPaymentMethodCreditCard && (!cardNumber || !cardCode || !selectedBrand))
    return (formError.innerText = 'Preencha o Número, Código e Bandeira do Cartão.');

  if (!isPaymentMethodCreditCard && (!cardName || !cardNumber || !cardCode || !selectedBrand))
    return (formError.innerText = 'Preencha o Nome, Número, Código e Bandeira do Cartão.');

  const isCardNameValid = cardName.split('').every((char, _, name) => {
    return name.length <= 19 && (char.toLowerCase() !== char.toUpperCase() || char === ' ');
  });

  if (!isCardNameValid)
    return (formError.innerText =
      'Nome Inválido. Máximo de 19 caracteres e sem números. Corrija e tente novamente.');

  const isCardNumberValid = cardNumber.split('').every((char, _, number) => {
    return number.length === isAmericaExpress && !isNaN(char) && char !== ' ';
  });

  if (!isCardNumberValid)
    return (formError.innerText = `Número do Cartão Inválido. Insira ${isAmericaExpress} dígitos numéricos sem espaços. Corrija e tente novamente.`);

  const isCardCodeValid = cardCode.split('').every((char, _, number) => {
    return number.length === 3 && !isNaN(char) && char !== ' ';
  });

  if (!isCardCodeValid)
    return (formError.innerText =
      'Código de Segurança Inválido. Deve conter exatamente 3 dígitos numéricos. Corrija e tente novamente.');

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

  const finalMessage = document.createElement('h1');
  finalMessage.innerText = 'Compra realizada com sucesso!';
  document.body.appendChild(finalMessage);

  setTimeout(() => finalMessage.remove(), 5000);
});
