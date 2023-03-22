import paw from "../../img/Dog_Paw_Print.png";
import View from "./View.js";
import * as model from ".././model.js";

class ResultsView extends View {
  _parentElement = document.querySelector(".search-bar");
  _errorMessage =
    "We could not find any pets in that location. PLease try again.";

  ///SAME AS PARENT VIEW, BUT ADDED ARGUMENTS TO HIGHLIGHT THE SELECTED DOG///
  render(data, data2) {
    this._data = data;
    this._data2 = data2;
    const markup = this._generateMarkup();

    this._clear();

    this._parentElement.insertAdjacentHTML("afterbegin", markup);
    const previewContainer = document.querySelector(".search-results");
    const preview = document.querySelectorAll(".preview__link");

    previewContainer.addEventListener("click", function (e) {
      const clicked = e.target.closest(".preview__link");

      if (!clicked) return;

      preview.forEach((t) => t.classList.remove("preview__link--active"));
      clicked.classList.add("preview__link--active");
    });
  }

  _generateMarkup() {
    // console.log(this._data);

    return `
    <h2 class="search-title">Results near ${model.state.search.query}</h2>

    <ul class="search-results">
    ${this._data.map(this._generateMarkupPreview).join("")}
    </ul>`;
  }
  _generateMarkupPreview(result) {
    // console.log(result);

    return `
    
    <li class="preview">
    <a class="preview__link" href="#${result.id}">
      <img
        class="search-img"
        src='${result.mainPhoto?.full ? result.mainPhoto.full : paw}'
        
        alt="photo of ${result.name}"
      />
      <div class="search-info">
        <h3 class="search-name">${result.name}</h3>
        <div class='search-details-container'>
        <p class="search-details">${result.age}</p>
        <p class="search-details">${result.breeds.primary} ${
      result.breeds.mixed ? "mix" : ""
    }</p>
        <p class="search-details">${
          Math.round(result.distance * 10) / 10
        } miles away</p>
        </div>
      </div>
    </a>
    </li>`;
  }
}

export default new ResultsView();
