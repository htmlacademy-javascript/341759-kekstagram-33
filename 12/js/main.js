import './util.js';
// import {addPhotos} from './data.js';
import { renderPhotos } from './gallery.js';
import './big-picture.js';
import './validation.js';
import './effects.js';

import { getData } from './api.js';
import { showErrorData } from './util.js';
import { setUserFormSubmit } from './submission-user-form.js';

import { showFiltres, initFiltresForm, getCurrentPhotos } from './filtres.js';
import { debounce } from './util.js';

const RERENDER_DELAY = 500;

// renderPhotos(addPhotos);

getData()
  .then((photos) => {
    renderPhotos(photos);
    showFiltres();
    initFiltresForm(debounce(() => renderPhotos(getCurrentPhotos(photos)), RERENDER_DELAY));
  })
  .catch(() => {
    showErrorData();
  }
  );

setUserFormSubmit();
