export default function createGalleryCards(images) {
  return images
    .map(image => {
      const {
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = image;
      return `
    <div class="card">
  <a class='card__link' href='${largeImageURL}'><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info_item">
      <b>LIKES:</b>
      <b>${likes}</b>
    </p>
    <p class="info_item">
      <b>VIEWS:</b>
      <b>${views}</b>
    </p>
    <p class="info_item">
      <b>COMMENTS:</b>
      <b>${comments}</b>
    </p>
    <p class="info_item">
      <b>DOWNLOADS:</b>
      <b>${downloads}</b>
    </p>
  </div>
</div>`;
    })
    .join('');
}
