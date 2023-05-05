'use strict'

import { select, print } from './utils.js';

const options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
    mode: 'cors'
}

//cities
const citiesUrl = './assets/js/cities.json';

//movies list
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

async function getJson(url,options,listArea) {
    try {
        const response = await fetch(url, options);

        if(!response.ok) {
            throw new Error(`${response.statusText}: ${response.status}`);
        }

        const data = await response.json();
        if(data.response) {
            listArea(data.response)
        } else {
            listArea(data.cities);
        }
    } catch(error) {
        console.log(error.message)
    }
}

getJson(moviesUrl,options,listMovies);

//search movies
const moviesSearch = document.querySelector('.movies-icon');
const searchMoviesList = select('.search-result');

function searchListMovies(array) {
    searchMoviesList.innerHTML = '';
    let movies = '';

    if(array.length > 0) {
        array.forEach(movie => {
           if(movie.title.indexOf(moviesSearch.value.trim()) !== -1) {
            movies += `<div class="get-movies">
                           ${movie.title} (${movie.year})
                       </div>`
           } 
        });
    if(movies === '') {
        movies = `<div class="get-movies">
                    Movie not found
                  </div>`
    }
    } else {
        movies = `<li>Movies not found</li>`
    }

    searchMoviesList.innerHTML = `${movies}`
}

moviesSearch.addEventListener('keyup', () => {
    if(moviesSearch.value.trim().length > 1) {
        searchMoviesList.style.display = 'block'
        getJson(moviesUrl,options,searchListMovies);
    } else {
        searchMoviesList.style.display = 'none'
    }
})

//search cities
const citiesSearch = document.querySelector('.cities-icon');
const searchCitiesList = select('.search-city-result');

function searchListCities(array) {
    searchCitiesList.innerHTML = '';
    let cities = '';
    
    if(array.length > 0) {
        array.forEach(city => {
           if(city.name.indexOf(citiesSearch.value.trim()) !== -1) {
            cities += `<div class="get-city">
                            ${city.name}
                       </div>`
           }
        });
        if(cities === '') {
            cities = `<div class="get-city">
                        City not found
                      </div>`
        }
    } else {
        cities = `<li>Cities not found</li>`
    }

    searchCitiesList.innerHTML = `${cities}`
}

citiesSearch.addEventListener('keyup', () => {
    if(citiesSearch.value.trim().length > 1) {
        searchCitiesList.style.display = 'block'
        getJson(citiesUrl,options,searchListCities);
    } else {
        searchCitiesList.style.display = 'none'
    }
})