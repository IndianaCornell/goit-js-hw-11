'use strict';

import axios from 'axios';

export class PixabayAPI {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '38293986-7ee0e252210be96ee05c3f9f8';

  // currentPage = 1;
  query = 'flowers';

  async fetchPhotos() {
    return await axios.get(`${this.#BASE_URL}`, {
      params: {
        key: this.#API_KEY,
        q: this.query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        colors: 'grey',
        per_page: 40,
        page: 1,
      },
    });
  }
}
