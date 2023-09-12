import axios from "axios";
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCats, fetchCatByBreed } from './js/cat-api';


axios.defaults.headers.common["x-api-key"] = "live_1bnw9gdn42BcKXpPOBZ6iw1S5LYDUJNMqs03a1JyXRES02E1Y19E24QZYpqkJSwS";


const selectCat = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

const busyCatLoader = document.createElement('img');
busyCatLoader.src = 'https://media.giphy.com/media/7NoNw4pMNTvgc/giphy.gif';
busyCatLoader.alt = 'Котик ищет😼';
loader.append(busyCatLoader);




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





