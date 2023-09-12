import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_1bnw9gdn42BcKXpPOBZ6iw1S5LYDUJNMqs03a1JyXRES02E1Y19E24QZYpqkJSwS";
const BASE_URL = 'https://api.thecatapi.com/v1';

export function fetchCats() {
    return axios
        .get(`${BASE_URL}/breeds`)
        .then(response => { return response.data; });
}

export function fetchCatByBreed(breedId) {
    return axios
        .get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
        .then(response => { return response.data; });        
}
