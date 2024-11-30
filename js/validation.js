import { isEscapeKey } from './util.js';
import './../vendor/pristine/pristine.min.js';

const MAX_DESCRIPTION = 140;
const MAX_DESCRIPTION_HASHTAGS = 20;
const MAX_HASHTAGS = 5;

const form = document.querySelector('.img-upload__form');
const previewNewPhoto = document.querySelector('.img-upload__overlay');
const buttonCancelForm = document.querySelector('.img-upload__cancel');
const descriptionForm = document.querySelector('.text__description');
const hashtagsForm = document.querySelector('.text__hashtags');
const publicet = document.querySelector('.img-upload__submit');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const inputHashtag = document.querySelector('.text__hashtags');

let errorMessage = '';

const error = () => errorMessage;

const hashtagsHandler = (value) => {
  errorMessage = '';

  const inputText = value.toLowerCase().trim();
  if (!inputText) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);
  if (inputArray.length === 0) {
    return true;
  }

  const rules = [
    {
      check: inputArray.some((item) => item.indexOf('#', 1) >= 1),
      error: 'Хэштеги разделяются пробелами',
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хэштег начинается с символа #',
    },
    {
      check: inputArray.some((item, num, arr) => arr.includes(item, num + 1)),
      error: 'Один и тот же хэштег не может быть использован дважды',
    },
    {
      check: inputArray.some((item) => item.length > MAX_DESCRIPTION_HASHTAGS),
      error: `Длина хэштега не может составлять больше ${MAX_DESCRIPTION_HASHTAGS} символов`,
    },
    {
      check: inputArray.length > MAX_HASHTAGS,
      error: `Нельзя указывать больше ${ MAX_HASHTAGS } хэштегов`,
    },
    {
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хэштег содержит недопустимые символы',
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

function validateDescriptionLength (value) {
  return value.length <= MAX_DESCRIPTION;
}

pristine.addValidator(
  descriptionForm,
  validateDescriptionLength,
  `Длина комментария больше ${ MAX_DESCRIPTION } символов`
);

pristine.addValidator(inputHashtag, hashtagsHandler, error, 2, false);

const onHashtagInput = () => {
  if (pristine.validate()) {
    publicet.disabled = false;
  } else {
    publicet.disabled = true;
  }
};

inputHashtag.addEventListener('input', onHashtagInput);

form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    close();
  }
};

function close () {
  document.body.classList.remove('modal-open');
  previewNewPhoto.classList.add('hidden');
  document.removeEventListener('input', onDocumentKeydown);
  form.reset();
  pristine.reset();
}

const open = () => {
  document.body.classList.add('modal-open');
  previewNewPhoto.classList.remove('hidden');
  document.addEventListener('input', onDocumentKeydown);
};

form.addEventListener('change', open);

buttonCancelForm.addEventListener('click', close);

const onTextFieldFocus = (evt) => {
  evt.stopPropagation();
};

descriptionForm.addEventListener('input', onTextFieldFocus);
hashtagsForm.addEventListener('input', onTextFieldFocus);