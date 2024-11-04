/*
id, число - индификатор фото. рандом от 1 до 25, без повторений
url, строка — адрес картинки вида photos/{{i}}.jpg . Рандом от 1 до 25, без повторений
description, строка — описание фотографии. самостоятельно
likes, число — количество лайков, поставленных фотографии. Рандом от 15 до 200

comments, массив объектов — список комментариев. Рандом от 0 до 30

id — любое число, без повторений
avatar — это строка img/avatar-{{случайное число от 1 до 6}}.svg
message - const
Всё отлично!
В целом всё неплохо. Но не всё.
Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.
Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.
Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.
Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!

name - const, самостоятельно

пример:
{
  id: 135,
  avatar: 'img/avatar-6.svg',
  message: 'В целом всё неплохо. Но не всё.',
  name: 'Артём',
}
*/

const DESCRIPTIONS = [
  'Хорошо быть счастливой',
  'Прекрасно провожу время и вам советую',
  'То что я вижу, должны увидеть все)',
  'Хороший денек для...',
  'Пойман дзен',
  'Знали бы вы, что у меня на уме',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Инокентий',
  'Влас',
  'Патрик',
  'Василек',
  'Евген',
  'Алёша',
];

const PHOTO_COUNT = 25;

const COMMENTS = 30;

const Likes = {
  MIN: 15,
  MAX: 200,
};

const PhotosUrl = {
  MIN: 1,
  MAX: 6,
};

const photos = [];

function getRandomInteger(min, max) {
  const lower = Math.ceil(min);
  const upper = Math.floor(max);
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createComment = (indexComment) => ({
  id: indexComment + 1,
  avatar: `img/avatar-${getRandomInteger(PhotosUrl.MIN, PhotosUrl.MAX)}.svg`,
  message: String(getRandomArrayElement(MESSAGES)),
  name: String(getRandomArrayElement(NAMES)),
});

const publishedComments = () => {
  const comments = [];
  const randomComments = getRandomInteger(0, COMMENTS);
  for (let i = 0; i < randomComments; i++) {
    comments.push(createComment(i));
  }
  return comments;
};

const createUsersPhoto = (index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: String(getRandomArrayElement(DESCRIPTIONS)),
  likes: getRandomInteger(Likes.MIN, Likes.MAX),
  comments: publishedComments(),
});

const publishedPhotos = () => {
  for (let i = 0; i < PHOTO_COUNT; i++) {
    photos.push(createUsersPhoto(i));
  }
  return photos;
};

publishedPhotos();
