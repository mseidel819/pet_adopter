import icons from "../../img/icons.svg";

///////////////////////////////////////////////////////////
//PARENT CLASS WITH ALL GENERIC RENDER METHODS
///////////////////////////////////////////////////////////
export default class View {
  _data;
  _data2;

  ///TAKES THE MARKUP AND INSERTS IT ONTO THE PAGE///
  render(data, data2) {
    this._data = data;
    this._data2 = data2;
    const markup = this._generateMarkup();

    this._clear();

    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  ///SIMILAR TO RENDER, BUT IT ONLY UPDATES WHATEVER HAS CHANGED. DIDNT END UP NEEDING///
  update(data, data2) {
    this._data = data;
    this._data2 = data2;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    // console.log(newElements);
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        curEl.textContent = newEl.textContent;
      }
    });
  }

  ///CLEARS HTML BEFORE RENDERING NEW MATERIAL///
  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    const markup = `<div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `<div class="error message">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessage(message = this._message) {
    const markup = `<div> class="message">
      
        <ion-icon name="heart-outline"></ion-icon>
      
        <p>${message}</p>
      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
