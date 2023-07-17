'use strict';
import { PixabayAPI } from './js/pixabayAPI';
import createGalleryCards from './js/render';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = new SimpleLightbox('.card a');

// refs
const searchFormEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');

// is hidden

loadMoreBtnEl.classList.add('is-hidden');

// API
const pixabayAPI = new PixabayAPI();

const handleSearchForm = async event => {
  event.preventDefault();

  const searchQuery = event.currentTarget.elements['searchQuery'].value.trim();
  pixabayAPI.query = searchQuery;
  pixabayAPI.currentPage = 1;

  if (!searchQuery) {
    Notiflix.Notify.failure('Please, type something and try again');
    return;
  }

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
    loadMoreBtnEl.classList.remove('is-hidden');
    lightbox.refresh();
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
  } catch (err) {
    console.log(err.message);
  }
};

// load more

const handleLoadMoreBtnClick = async () => {
  pixabayAPI.currentPage += 1;

  try {
    const { data } = await pixabayAPI.fetchPhotos();
    const loadPages = Math.ceil(data.totalHits / pixabayAPI.perPage);
    console.log(loadPages);

    galleryEl.insertAdjacentHTML('beforeend', createGalleryCards(data.hits));

    lightbox.refresh();

    if (galleryEl.children.length === data.totalHits) {
      loadMoreBtnEl.classList.add('is-hidden');
      Notiflix.Notify.warning(
        `We're sorry, but you've reached the end of search results.`
      );

      return;
    }
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
