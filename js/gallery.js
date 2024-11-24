import{ showBigPhoto } from './big-picture.js';

const containerPhotos = document.querySelector('.pictures');
const similarPhotosTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPhoto = (picture) => {
  const {url, description, likes, comments} = picture;
  const photoElement = similarPhotosTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = url;
  // photoElement.querySelector('.picture__img').alt = description;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photoElement.querySelector('.picture__comments').textContent = comments.length;

  const onPhotoElementClick = (evt) => {
    evt.preventDefault();

    showBigPhoto(picture);
  };

  photoElement.addEventListener('click', onPhotoElementClick);

  return photoElement;
};

const renderPhotos = (photos) => {
  const photoFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    photoFragment.append(renderPhoto(photo));
  });

  containerPhotos.append(photoFragment);
};

export {renderPhotos};
