const wrapRequest = document.querySelector('.wrap-request');
const wrapEnquiry = document.querySelector('.wrap-enquiry');
const wrapArray = [wrapRequest, wrapEnquiry];
const form = document.querySelector('.contact-form');
const inputArray = document.querySelectorAll(
  '.contact-form input:not(input[type="submit"]), .contact-form #message'
);
const inputObject = {
  firstName: inputArray[0],
  lastName: inputArray[1],
  email: inputArray[2],
  generalEnquiry: inputArray[3],
  supportRequest: inputArray[4],
  message: inputArray[5],
  checkbox: inputArray[6],
};
const errorMessages = document.querySelectorAll('.required');
const errorObject = {
  errorfirstName: errorMessages[0],
  errorLastName: errorMessages[1],
  errorEmail: errorMessages[2],
  errorQuery: errorMessages[3],
  errorMessage: errorMessages[4],
  errorConsent: errorMessages[5],
};

// Добавление класса check
function addClass(wrap) {
  const radioButton = wrap.firstElementChild;
  wrap.addEventListener('click', (e) => {
    radioButton.checked = true;
    wrapArray.forEach((element) => element.classList.remove('check'));
    wrap.classList.add('check');
  });
}

// Проверка формы
function validateForm() {
  let isValid = true;
  const regex = /^[a-zA-z0-9_+-]+@[a-zA-z]+\.[a-z]{2,}$/;

  errorMessages.forEach(
    (errorMessage) => (errorMessage.style.display = 'none')
  );

  if (!inputObject.firstName.value.trim()) {
    errorObject.errorfirstName.style.display = 'block';
    isValid = false;
  }
  if (!inputObject.lastName.value.trim()) {
    errorObject.errorLastName.style.display = 'block';
    isValid = false;
  }
  if (!regex.test(inputObject.email.value.trim())) {
    errorObject.errorEmail.style.display = 'block';
    isValid = false;
  }
  if (
    !inputObject.generalEnquiry.checked &&
    !inputObject.supportRequest.checked
  ) {
    errorObject.errorQuery.style.display = 'block';
    isValid = false;
  }
  if (!inputObject.message.value.trim()) {
    errorObject.errorMessage.style.display = 'block';
    isValid = false;
  }
  if (!inputObject.checkbox.checked) {
    errorObject.errorConsent.style.display = 'block';
    isValid = false;
  }
  return isValid;
}

// Отправка формы
function submitForm() {
  const popupMessage = document.querySelector('.popup-container');
  if (validateForm()) {
    popupMessage.style.display = 'block';
    document.body.style.paddingTop = '0';
    window.scrollTo(0, 0);
    setTimeout(() => {
      form.submit();
    }, 5000);
  }
}

function main() {
  wrapArray.forEach(addClass);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitForm();
  });

  form.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitForm();
    }
  });
}

main();
