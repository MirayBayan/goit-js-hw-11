import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.css';

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('input[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
let lightbox = null;

console.log(searchForm);
console.log(searchInput);
console.log(gallery);
console.log(loader);

searchForm.addEventListener('submit', event => {
  event.preventDefault();

  const searchQuery = searchInput.value.trim();
  if (searchQuery === '') {
    return;
  }
  gallery.innerHTML = '';
  loader.classList.remove('is-hidden');

  getImages(searchQuery)
    .then(images => {
      if (images.length === 0) {
        iziToast.error({
          title: 'Error',
          message: `Can not found any photo. Please try again another words.`,
          position: 'topRight',
        });
      }

      gallery.innerHTML = images
        .map(image => {
          return `
        <li class ="gallery-item">
          <a href="${image.largeImageURL}">
          <img
          src="${image.webformatURL}"
          alt="${image.tags}"
          loading="lazy"
          />
          </a>
          <div class="image-info">
          <p><b>Likes:</b> ${image.likes}</p>
          <p><b>Views: </b>${image.views}</p>
          <p><b>Comments:</b> ${image.comments}</p>
          <p><b>Downloads:</b> ${image.downloads}</p>
          </div>
        </li>
        `;
        })
        .join('');
      if (images.length > 0) {
        if (lightbox) {
          lightbox.refresh();
        } else {
          lightbox = new SimpleLightbox('.gallery a');
        }
      }
    })
    .catch(error => {
      console.error('Hata : ', error);
      alert('Fotoğraflar yüklenirken bir hata oluştu.');
    })
    .finally(() => {
      loader.classList.add('is-hidden');
    });
});

const API_KEY = '57977373-faec9c630f955850b63d7a23e';

function getImages(searchQuery) {
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(searchQuery)}&image_type=photo&orientation=horizontal&safesearch=true`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Fotoğraflar alınamadı.');
      }

      return response.json();
    })
    .then(data => {
      console.log(data);
      return data.hits;
    });
}
