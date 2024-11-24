import { closeOnEscDown } from './util.js';
import './gallery.js';

const COMMENTS_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const socialCaption = bigPicture.querySelector('.social__caption');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const socialComments = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const socialFooterText = bigPicture.querySelector('.social__footer-text');
const pictureCloseButton = bigPicture.querySelector('.big-picture__cancel');

const commentFragment = document.createDocumentFragment();

let commentsCount = COMMENTS_STEP;
let currentComments = [];


const createComment = (comment) => {
  const newComment = document.createElement('li');
  const imgComment = document.createElement('img');
  const textComment = document.createElement('p');

  newComment.classList.add('social__comment');
  imgComment.classList.add('social__picture');
  textComment.classList.add('social__text');

  imgComment.src = comment.avatar;
  imgComment.alt = comment.name;
  textComment.textContent = comment.message;

  newComment.append(imgComment);
  newComment.append(textComment);

  commentFragment.append(newComment);

};

const renderComments = () => {
  socialComments.innerHTML = '';
  socialCommentCount.innerHTML = '';

  commentsCount = (commentsCount > currentComments.length) ? currentComments.length : commentsCount;
  const commentsSelected = currentComments.slice(0, commentsCount);

  if (currentComments.length <= COMMENTS_STEP || commentsCount >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }

  socialCommentCount.innerHTML = `${commentsCount} из <span class="social__comment-total-count">${currentComments.length}</span>`;
  commentsSelected.forEach(createComment);

  socialComments.append(commentFragment);
};

const onSocialCommentsClick = () => {
  commentsCount += COMMENTS_STEP;
  renderComments();
};


const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  commentsCount = COMMENTS_STEP;
  currentComments = [];
  socialFooterText.value = '';
};


const onBigPictureEscDown = (evt) => {
  closeOnEscDown(evt, () => {
    closeBigPicture();

    document.removeEventListener('keydown', onBigPictureEscDown);
    socialComments.removeEventListener('click', onSocialCommentsClick);
  });
};


const onPictureCloseButtonClick = () => {
  closeBigPicture();

  document.removeEventListener('keydown', onBigPictureEscDown);
};


const showBigPhoto = (picture) => {
  const {url, description, likes, comments} = picture;

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureImg.src = url;
  socialCaption.alt = description;
  likesCount.textContent = likes;

  currentComments = comments.slice();

  renderComments();

  document.addEventListener('keydown', onBigPictureEscDown);

};

commentsLoader.addEventListener('click', onSocialCommentsClick);
pictureCloseButton.addEventListener('click', onPictureCloseButtonClick);


export{showBigPhoto};
