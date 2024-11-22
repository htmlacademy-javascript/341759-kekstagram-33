const containerPhotos = document.querySelector('.pictures');
const similarPhotosTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPhoto = ({url, description, likes, comments}) => {
  const photoElement = similarPhotosTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__img').alt = description;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photoElement.querySelector('.picture__comments').textContent = comments.length;

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
