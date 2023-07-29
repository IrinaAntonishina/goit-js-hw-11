import {getPicture} from "./pixabay-api";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";



const form = document.querySelector('.search-form')
const galleryEl = document.querySelector('.gallery')

form.addEventListener('submit', onSearch)

let gallery = new SimpleLightbox('.gallery a');

function onSearch (evt) {
    evt.preventDefault()
    const value = evt.currentTarget.searchQuery.value
if(galleryEl.classList.contains("active")){
    galleryEl.innerHTML = ""
}
    getImgByValue(value)
}

function getImgByValue (valueInput){
    getPicture(valueInput)
    .then(resp => {
        
        const dataAboutRequest = resp.data.hits
        const card = dataAboutRequest.map(createMarkUp).join('')
        galleryEl.insertAdjacentHTML('afterbegin',card)
        galleryEl.classList.add("active")
        
        console.log(resp.data.hits)
        if(resp.data.hits.length === 0){
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        }
    }
    )
    .catch(err => console.log(err))
}

function createMarkUp ({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) {
    return `<div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes: ${likes}</b>
      </p>
      <p class="info-item">
        <b>Views: ${views}</b>
      </p>
      <p class="info-item">
        <b>Comments: ${comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads: ${downloads}</b>
      </p>
    </div>
  </div>`
}
// webformatURL - посилання на маленьке зображення для списку карток.
// largeImageURL - посилання на велике зображення.
// tags - рядок з описом зображення. Підійде для атрибуту alt.
// likes - кількість лайків.
// views - кількість переглядів.
// comments - кількість коментарів.
// downloads - кількість завантажень.

// {/* <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a> */}