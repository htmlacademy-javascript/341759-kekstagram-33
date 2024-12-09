import { isEscapeKey } from './util.js';
import './gallery.js';

const COMMENTS_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const socialComments = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const pictureCloseButton = bigPicture.querySelector('.big-picture__cancel');


const renderComment = ({avatar, name, message}) =>
  `<li class="social__comment">
    <img
      class="social__picture"
      src="${avatar}"
      alt="${name}"
      width="35" height="35">
    <p class="social__text">${message}</p>
  </li>`;

const renderCurrentComments = (maxIndex, comments) => {
  let currentIndex = socialComments.children.length;
  if (maxIndex >= comments.length) {
    maxIndex = comments.length;
    commentsLoader.classList.add('hidden');
  }
  while (currentIndex < maxIndex) {
    const comment = renderComment(comments[currentIndex]);
    socialComments.insertAdjacentHTML('beforeend', comment);
    currentIndex++;
  }
};

let onloadCommentsBtnClick;

const renderComments = (comments) => {
  let maxIndex = COMMENTS_STEP;

  comments.forEach((item) => {
    const comment = renderComment(item);
    socialComments.insertAdjacentHTML('beforeend', comment);
  });

  onloadCommentsBtnClick = () => {
    renderCurrentComments(maxIndex, comments);
    bigPicture.querySelector('.social__comment-shown-count').textContent = maxIndex > comments.length ? comments.length : maxIndex;
    maxIndex += COMMENTS_STEP;
  };

  socialComments.innerHTML = '';
  commentsLoader.classList.remove('hidden');
  onloadCommentsBtnClick();
  commentsLoader.addEventListener('click', onloadCommentsBtnClick);
};

const showBigPhoto = ({url, likes, comments, description}) => {
  bigPicture.querySelector('img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__comment-total-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;

  renderComments(comments);

};

const closeBigPhoto = () => {
  bigPicture.classList.add('hidden');

  document.body.classList.remove('modal-open');
  commentsLoader.removeEventListener('click', onloadCommentsBtnClick);
  pictureCloseButton.removeEventListener('click', closeBigPhoto);
  document.removeEventListener('keydown', onEscapeBtnKeydown);
};

function onEscapeBtnKeydown (evt) {
  if ((isEscapeKey(evt))) {
    evt.preventDefault();
    closeBigPhoto();
  }
}

const openBigPhoto = (photo) => {
  showBigPhoto(photo);

  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  pictureCloseButton.addEventListener('click', closeBigPhoto);
  document.addEventListener('keydown', onEscapeBtnKeydown);
};


export{ openBigPhoto };
