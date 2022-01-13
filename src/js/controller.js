"use strict";

import "core-js/stable";
import "regenerator-runtime/runtime";

import * as model from "./model.js";
import paw from "../img/Dog_Paw_Print.png";
import petView from "./views/petView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";

///CRITICAL DO NOT REMOVE//
console.log("hi");
////////////////////////////

const petContainer = document.querySelector(".pet-container");
const curPage = 1;
const zipcode = model.state.search.query;

///////////////////////////////////////////////////////////
//LOADING PETS
///////////////////////////////////////////////////////////

const controlPets = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);

    if (!id) return;
    petView.renderSpinner();

    //////loading PET///////
    await model.loadPets(id);
    const { animal } = model.state;
    const { organization } = model.state;
    // console.log(animal);
    // console.log(organization);

    ///////rendering PET/////////
    petView.render(model.state.animal, model.state.organization);
  } catch (err) {
    // console.log(err);
    petView.renderError();
  }
};

///////////////////////////////////////////////////////////
//LOADING SEARCH RESULTS BAR
///////////////////////////////////////////////////////////
const controlSearchResults = async function () {
  try {
    ///RENDER SPINNER///
    resultsView.renderSpinner();

    ///GET SEARCH LOCATION///
    const query = searchView.getQuery();
    if (!query) return;
    // console.log(query);

    ///APPLY QUERY AND LOCATION TO API LINK///
    await model.loadSearchResults(query, curPage);
    // console.log(model.state.search.results);

    ///RENDER TO PAGE////
    resultsView.render(model.state.search.results);

    //4 render pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

///////////////////////////////////////////////////////////
//MAKING PAGINATION BUTTONS WORK
///////////////////////////////////////////////////////////
const controlPagination = async function (goToPage) {
  try {
    resultsView.renderSpinner();

    await model.loadSearchResults(model.state.search.query, goToPage);
    resultsView.render(model.state.search.results);

    //4 render pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  petView.addHandlerRender(controlPets);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();

// const previewContainer = document.querySelector(".search-results");
// const preview = document.querySelectorAll(".preview__link");

// previewContainer.addEventListener("click", function (e) {
//   e.preventDefault();
//   const clicked = e.target.closest(".preview__link");

//   if (!clicked) return;

//   preview.forEach((t) => t.classList.remove("preview__link--active"));
//   clicked.classList.add("preview__link--active");
// });

// const galleryThumbnails = document.querySelector(".gallery_thumbnails");
// const galleryThumb = document.querySelectorAll(".gallery-thumb");
// const displayImg = "src/img/IMG_1282 (1).jpg";
// const mainImg = document.querySelector(".gallery-main-img");

// galleryThumbnails.addEventListener("click", function (e) {
//   const clicked = e.target.closest(".gallery-thumb");
//   if (!clicked) return;

//   galleryThumb.forEach((t) => t.classList.remove("gallery-thumb--selected"));
//   clicked.classList.add("gallery-thumb--selected");
//   mainImg.remove.src;
//   mainImg.src = clicked.querySelector(".gallery-thumb-img").src;
// });
