function getRandomInteger(min, max) {
  const lower = Math.ceil(min);
  const upper = Math.floor(max);
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

export {getRandomArrayElement, getRandomInteger};
