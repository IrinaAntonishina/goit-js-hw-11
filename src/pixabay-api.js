import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38531958-d0ee338b009df2546b2f8091d';

export async function getPicture (inputValue, page = 1) {
    const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`)
   
    return response;
}

