const mainCard = document.querySelector('.card');
const successCard = document.querySelector('.success-card');
const form = document.querySelector('.form');
const submitButton = document.getElementById('submit-button');
const dismissButton = document.getElementById('dismiss-button');
const inputField = document.querySelector('.input');
const errorMessage = document.querySelector('.error-message');

let hasBeenSubmittedWrongly = false;
let userInput;

//utils
const validateInput = (text) => {
  const emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
  const isValid = emailRegex.test(text);
  return {
    isValid: isValid,
    message: 'Valid email required!',
  };
};

const toggleVisibility = (element) => {
  element.classList.toggle('hidden');
};

const clearInputValue = () => {
  inputField.value = '';
  userInput = '';
};

const setError = (text) => {
  errorMessage.innerText = text;
  if (!hasBeenSubmittedWrongly) {
    toggleVisibility(errorMessage);
  }
  inputField.classList.add('error');
};

const removeErrorState = () => {
  errorMessage.innerText = '';
  toggleVisibility(errorMessage);
  inputField.classList.remove('error');
};

//event listeners
inputField.addEventListener('input', (e) => {
  userInput = e.target.value;

  if (hasBeenSubmittedWrongly) {
    const result = validateInput(userInput);
    if (result.isValid || userInput === '') {
      removeErrorState();
      hasBeenSubmittedWrongly = false;
    }
  }
});

submitButton.addEventListener('click', (e) => {
  e.preventDefault();

  const result = validateInput(userInput);

  if (result.isValid) {
    toggleVisibility(mainCard);
    toggleVisibility(successCard);
    hasBeenSubmittedWrongly = false;
  } else {
    setError(result.message);
    hasBeenSubmittedWrongly = true;
  }
});

dismissButton.addEventListener('click', () => {
  toggleVisibility(successCard);
  toggleVisibility(mainCard);
});
