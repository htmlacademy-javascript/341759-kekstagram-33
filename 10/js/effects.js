import './../vendor/nouislider/nouislider.js';

const DEFAULT_EFFECT_LEVEL = 100;
const RADIX = 10;
const EFFECTS_STEP = 0.01;
const MAX_BLUR_VALUE = 3;
const MAX_BRIGHTNESS = 3;

const Slider = {
  MIN: 0,
  MAX: 100,
  STEP: 1,
};

const Zoom = {
  MIN: 25,
  MAX: 100,
  STEP: 25
};

const effectsList = document.querySelector('.effects__list');
const imagePreview = document.querySelector('.img-upload__preview');
const sliderUpload = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
const slider = document.querySelector('.effect-level__slider');
const image = imagePreview.querySelector('img');

const scaleValue = document.querySelector('.scale__control--value');
const decreaseScaleButton = document.querySelector('.scale__control--smaller');
const increaseScaleButton = document.querySelector('.scale__control--bigger');


let currentScaleValue = Zoom.MAX;

const getScaleValue = () => {
  scaleValue.value = `${currentScaleValue}%`;
  image.style.transform = `scale(${currentScaleValue / Zoom.MAX})`;
};

function getChangeScale(thisButton, otherButton, minScaleValue, maxScaleValue, step) {
  return function () {
    otherButton.disabled = false;
    currentScaleValue = currentScaleValue + step;
    if (currentScaleValue === maxScaleValue || currentScaleValue === minScaleValue) {
      thisButton.disabled = true;
    }
    getScaleValue(currentScaleValue);
  };

}

increaseScaleButton.addEventListener('click', getChangeScale(increaseScaleButton, decreaseScaleButton, Zoom.MIN, Zoom.MAX, Zoom.STEP));
decreaseScaleButton.addEventListener('click', getChangeScale(decreaseScaleButton, increaseScaleButton, Zoom.MIN, Zoom.MAX, -Zoom.STEP));


effectLevelValue.value = DEFAULT_EFFECT_LEVEL;
let currentEffect = '';

sliderUpload.classList.add('visually-hidden');

const effects = {
  none: () => {
    sliderUpload.classList.add('visually-hidden');
    return 'none';
  },

  chrome: () => {
    sliderUpload.classList.remove('visually-hidden');
    return `grayscale(${parseInt(effectLevelValue.value, RADIX) * EFFECTS_STEP})`;
  },

  sepia: () => {
    sliderUpload.classList.remove('visually-hidden');
    return `sepia(${parseInt(effectLevelValue.value, RADIX) * EFFECTS_STEP})`;
  },

  marvin: () => {
    sliderUpload.classList.remove('visually-hidden');
    return `invert(${Math.floor(effectLevelValue.value)}%)`;
  },

  phobos: () => {
    sliderUpload.classList.remove('visually-hidden');
    return `blur(${(parseInt(effectLevelValue.value, RADIX) * MAX_BLUR_VALUE) * EFFECTS_STEP}px)`;
  },

  heat: () => {
    sliderUpload.classList.remove('visually-hidden');
    return `brightness(${(parseInt(effectLevelValue.value, RADIX) * MAX_BRIGHTNESS) * EFFECTS_STEP})`;
  },
};

const onEffectsListClick = (evt) => {
  let target = evt.target;

  if (target.classList.contains('effects__label')) {
    target = evt.target.querySelector('span');
  }

  if (target.classList.contains('effects__preview')) {
    slider.noUiSlider.set(Slider.MAX);
    effectLevelValue.value = Slider.MAX;

    currentEffect = target.classList[1].replace('effects__preview--', '');
    image.style.filter = effects[currentEffect]();
  }
};

effectsList.addEventListener('click', onEffectsListClick);

noUiSlider.create(slider, {
  range: {
    min: Slider.MIN,
    max: Slider.MAX,
  },
  start: Slider.MAX,
  step: Slider.STEP,
  connect: 'lower',
});

slider.noUiSlider.on('change', () => {
  effectLevelValue.value = slider.noUiSlider.get();

  image.style.filter = effects[currentEffect]();
});


export { image, sliderUpload };
