import {getPicture} from "./pixabay-api";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";



const form = document.querySelector('.search-form')
const galleryEl = document.querySelector('.gallery')
const buttonLoadMore = document.querySelector('.load-more')


form.addEventListener('submit', onSearch)
buttonLoadMore.addEventListener('click', onLoadMore)

let page = 1;
let value = ''


function onSearch (evt) {
    evt.preventDefault()
    value = evt.currentTarget.searchQuery.value
    if(galleryEl.classList.contains("active")){
      galleryEl.innerHTML = ''
    }
    if(value === ''){
      Notiflix.Notify.warning('Please,fill in the input field') 
    }else{
      getImgByValue(value)
    }
    
}

function onLoadMore (){
  
page += 1;
getImgByValue(value, page)
}

async function getImgByValue (valueInput,page){
  
    await getPicture(valueInput,page)
    .then(resp => {
    
        const dataAboutRequest = resp.data.hits

        const card = dataAboutRequest.map(createMarkUp).join('')
        galleryEl.insertAdjacentHTML('beforeend',card)
        
        galleryEl.classList.add("active")
        
        buttonLoadMore.classList.remove('is_hidden')
      
        console.log(resp.data)
        if(resp.data.hits.length === 0){
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        }
        if(resp.data.totalHits === 0){

        }
    }
    )
    .catch(err => console.log(err))
}

function createMarkUp ({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) {
    return `<div class="photo-card">
    <a class="thumb" href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy"/></a>
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
