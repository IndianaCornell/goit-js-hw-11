'use strict';
import { PixabayAPI } from './js/pixabayAPI';
import createGalleryCards from './js/render';
import Notiflix from 'notiflix';

// refs
const searchFormEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');

// API
const pixabayAPI = new PixabayAPI();

const handleSearchForm = async event => {
  event.preventDefault();

  const searchQuery = event.currentTarget.elements['searchQuery'].value;

  pixabayAPI.query = searchQuery;
  pixabayAPI.page = 1;

  try {
    const { data } = await pixabayAPI.fetchPhotos();
    if (!data.hits.length) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      throw new Error();
    }
    searchFormEl.reset();
    galleryEl.innerHTML = createGalleryCards(data.hits);
  } catch (err) {
    console.log(err.message);
  }
};

const handleLoadMoreBtnClick = async () => {
  pixabayAPI.page += 1;
  try {
    const { data } = await pixabayAPI.fetchPhotos();

    // if (pixabayAPI.page === data) {
    //   loadMoreBtnEl.classList.add('is-hidden');
    // }

    galleryEl.insertAdjacentHTML('beforeend', createGalleryCards(data.hits));
  } catch (err) {
    console.log(err.message);
  }
};

// clear

clearGallery();

// Eventlisteners and functions

searchFormEl.addEventListener('submit', handleSearchForm);
loadMoreBtnEl.addEventListener('click', handleLoadMoreBtnClick);

function clearGallery() {
  galleryEl.innerHTML = '';
}
