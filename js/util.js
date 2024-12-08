const ALERT_SHOW_TIME = 5000;

const Keys = {
  ESC: 'Esc',
  ESCAPE: 'Escape',
};

function getRandomInteger(min, max) {
  const lower = Math.ceil(min);
  const upper = Math.floor(max);
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === Keys.ESCAPE || evt.key === Keys.ESC;
const closeOnEscDown = (evt, cb) => {
  if (isEscapeKey(evt)) {
    cb();
  }
};

const templateErrorData = document.querySelector('#data-error').content.querySelector('.data-error');

const getRandomNumber = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const showErrorData = () => {
  const fragment = document.createDocumentFragment();
  const errorContainer = templateErrorData.cloneNode(true);
  fragment.appendChild(errorContainer);
  document.body.appendChild(fragment);

  setTimeout(() => {
    errorContainer.remove();
  }, ALERT_SHOW_TIME);
};

function debounce (callback, timeoutDelay) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export { getRandomArrayElement, getRandomInteger, closeOnEscDown, isEscapeKey, showErrorData, getRandomNumber, debounce };
