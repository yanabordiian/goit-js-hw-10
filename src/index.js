import axios from "axios";
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

axios.defaults.headers.common["x-api-key"] = "live_1bnw9gdn42BcKXpPOBZ6iw1S5LYDUJNMqs03a1JyXRES02E1Y19E24QZYpqkJSwS";
const BASE_URL = 'https://api.thecatapi.com/v1';

const selectCat = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

selectCat.addEventListener('change', onSelectChange);

function createCatsList() {
    loader.classList.remove('is-hidden');
    selectCat.classList.add('is-hidden');
    error.classList.add('is-hidden');

    fetchCats()
    .then(data => {
        const catsList = data
            .map(({ id, name }) => `<option value="${id}">${name}</option>`)
            .join('');
        selectCat.innerHTML = catsList;

        new SlimSelect({ select: selectCat, });
        loader.classList.add('is-hidden');
        selectCat.classList.remove('is-hidden');
    })
    .catch(error => {
        Notify.failure('Ooop! Something went wrong! Try reloading the page!');
    })
}

createCatsList();

function onSelectChange(e) {
    loader.classList.remove('is-hidden');
    catInfo.classList.add('is-hidden');

    const selectedCatId = e.currentTarget.value;

    fetchCatByBreed(selectedCatId)
        .then(data => {
            renderMarkUp(data);
            loader.classList.add('is-hidden');
            catInfo.classList.remove('is-hidden');
        })
        .catch(error => {
            loader.classList.add('is-hidden');
            Notify.failure('Ooop! Something went wrong! Try reloading the page!'); 
        })

}

function renderMarkUp(data) {
    const { breeds, url } = data[0];
    const { name, temperament, description } = breeds[0];
    const breedCard = ` <img class="cat-photo" width="300px" src="${url}" alt="${name}">
    <div class="cat-body">
        <h2 class="cat-name"> ${name}</h2>
        <p class="cat-info"> ${description}</p>
        <p class="cat-info"><span class="temperament">Temperament: </span> ${temperament}</p>
    </div>`
    catInfo.innerHTML = breedCard;
}

function fetchCatByBreed(breedId) {
    return axios
        .get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
        .then(response => { return response.data; })
        .catch(error => { throw new Error('Помилка запиту:', error.message); });
        
}


function fetchCats() {
    return axios
        .get(`${BASE_URL}/breeds`)
        .then(response => { return response.data; })
        .catch(error => { throw new Error('Помилка запиту:', error.message); });
}




