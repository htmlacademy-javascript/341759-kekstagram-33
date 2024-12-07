import './util.js';
// import {addPhotos} from './data.js';
import {renderPhotos} from './gallery.js';
import './big-picture.js';
import './validation.js';
import './effects.js';

import { getData } from './api.js';
import { showErrorData } from './util.js';
import { setUserFormSubmit } from './submission-user-form.js';

// renderPhotos(addPhotos);

getData()
  .then((photos) => {
    renderPhotos(photos);
  })
  .catch(() => {
    showErrorData();
  }
  );

setUserFormSubmit();
