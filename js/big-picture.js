import { closeOnEscDown } from './util';
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
    // socialComments.removeEventListener('click', onSocialCommentsClick);
  });
};

const onPictureCloseButtonClick = () => {
  closeBigPicture();

  document.removeEventListener('keydown', onBigPictureEscDown);
};


const showBigPhoto = (picture) => {
  const {url, description, likes} = picture;

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureImg.src = url;
  socialCaption.alt = description;
  likesCount.textContent = likes;

  document.addEventListener('keydown', onBigPictureEscDown);

};

pictureCloseButton.addEventListener('click', onPictureCloseButtonClick);


export{showBigPhoto};
