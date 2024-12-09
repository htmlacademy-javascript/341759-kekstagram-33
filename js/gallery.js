import{ openBigPhoto } from './picture.js';
import { getRandomInteger } from './util.js';

const containerPhotos = document.querySelector('.pictures');
const similarPhotosTemplate = document.querySelector('#picture').content.querySelector('.picture');
const photoFragment = document.createDocumentFragment();

const clearThumbnails = () => {
  const photos = document.querySelectorAll('.picture');
  photos.forEach((element) => {
    element.remove();
  });
};

const renderPhoto = (picture) => {
  const {url, description, likes, comments} = picture;
  const photoElement = similarPhotosTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__img').alt = description;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photoElement.querySelector('.picture__comments').textContent = comments.length;

  const onPhotoElementClick = (evt) => {
    evt.preventDefault();

    openBigPhoto(picture);
  };

  photoElement.addEventListener('click', onPhotoElementClick);

  return photoElement;
};

const getRandomPhotos = (photos, count) => {
  const randomPhotos = [];
  const usedIndexes = new Set();

  while (randomPhotos.length < count && randomPhotos.length < photos.length) {
    const randomIndex = getRandomInteger(0, photos.length - 1);
    if (!usedIndexes.has(randomIndex)) {
      usedIndexes.add(randomIndex);
      randomPhotos.push(photos[randomIndex]);
    }
  }

  return randomPhotos;
};

const getDiscussedPhotos = (photos) => [...photos].sort((a, b) => b.comments.length - a.comments.length);

const renderPhotos = (photos) => {
  clearThumbnails();
  photos.forEach((photo) => {
    photoFragment.append(renderPhoto(photo));
  });

  containerPhotos.append(photoFragment);
};

export { renderPhotos, getRandomPhotos, getDiscussedPhotos };
