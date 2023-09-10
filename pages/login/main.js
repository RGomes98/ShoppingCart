let isAtLoginPage = true;

const body = document.body;
const title = document.getElementById('title');
const formName = document.getElementById('name');
const form = document.getElementById('login_form');
const heading = document.getElementById('login_heading');
const loginButton = document.getElementById('login_button');
const registerButton = document.getElementById('register_button');

const nameWrapper = document.getElementById('name_wrapper');
nameWrapper.classList.add('hide_element');

const error = document.createElement('span');
error.classList.add('login_form_error');
body.appendChild(error);

registerButton.addEventListener('click', toggleRegister);

function toggleRegister() {
  form.reset();
  error.innerText = '';
  isAtLoginPage = !isAtLoginPage;

  nameWrapper.classList.toggle('hide_element');

  title.innerText = isAtLoginPage ? 'Entrar' : 'Criar Conta';
  heading.innerText = isAtLoginPage ? 'Entrar' : 'Criar Conta';
  loginButton.innerText = isAtLoginPage ? 'Entrar' : 'Criar Conta';
  registerButton.innerText = isAtLoginPage ? 'Criar Conta' : 'Já tem uma conta? Entrar';
}

form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  error.innerText = '';

  const {
    name: { value: name },
    email: { value: email },
    password: { value: password },
  } = e.target;

  const isPasswordLengthValid = /^[a-zA-Z0-9]{6,10}$/.test(password);
  const isPasswordFormatValid = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/.test(password);
  const isNameValid = name
    .split(' ')
    .every((name, _, fullName) => fullName.length >= 2 && name.length >= 2);

  if (isAtLoginPage && (!email || !password)) {
    return (error.innerText = 'Todos os campos são necessarios para entrar.');
  }

  if (!isAtLoginPage && (!name || !email || !password)) {
    return (error.innerText = 'Todos os campos são necessarios para a criação de uma conta.');
  }

  if (!isAtLoginPage && !isNameValid) {
    return (error.innerText =
      'O nome deve ser composto por, ao menos, um nome e um sobrenome, cujos tamanhos mínimos são de 2 caracteres cada.');
  }

  if (!isPasswordLengthValid) {
    return (error.innerText = 'A senha deve conter entre 6 e 10 caracteres.');
  }

  if (!isPasswordFormatValid) {
    return (error.innerText =
      'A senha deve conter pelo menos, uma letra minúscula, uma maiúscula e um número.');
  }

  const cartPagePath = window.location.pathname.replace('login', 'cart');
  window.location.pathname = cartPagePath;
}
