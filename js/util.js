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

export {getRandomArrayElement, getRandomInteger, closeOnEscDown, isEscapeKey};
