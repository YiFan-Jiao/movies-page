'use strict'

import { select, print } from './utils.js';

//
const url = './assets/js/cities.json';
const list = select('.big-filter');

function listCities(array) {
    list.innerHTML = '';
    let cities = '';

    if(array.length > 0) {
        array.forEach(city => {
            cities += `<li>${city.name}</li>`
        });
    } else {
        cities = `<li>not found</li>`
    }

    list.innerHTML = `<ul>${cities}</ul>`
}

const options2 = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
    mode: 'cors'
}

async function getCities() {
    try {
        const response = await fetch(url, options);

        if(!response.ok) {
            throw new Error(`${response.statusText}: ${response.status}`);
        }

        const data = await response.json();
        print(data.cities);
        listCities(data.cities);
    } catch(error) {
        console.log(error.message)
    }
}

getCities();



//movies 
const moviesUrl = 'https://api.andrespecht.dev/movies';
const moviesList = select('.movies-part');

function listMovies(array) {
    moviesList.innerHTML = '';
    let movies = '';

    if(array.length > 0) {
        array.forEach(movie => {
            movies += `<div class="movies-box">
                            <div class="movies-img">
                                <img src="${movie.poster}" alt="">
                            </div>
                            <div class="movies-name">
                                ${movie.title}
                            </div>
                        </div>`
        });
    } else {
        movies = `<li>Movies not found</li>`
    }

    moviesList.innerHTML = `${movies}`
}

const options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
    mode: 'cors'
}

async function getJson(url,options) {
    try {
        const response = await fetch(url, options);

        if(!response.ok) {
            throw new Error(`${response.statusText}: ${response.status}`);
        }

        const data = await response.json();
        print(data.response);

        listMovies(data.response);
    } catch(error) {
        console.log(error.message)
    }
}

getJson(moviesUrl,options);