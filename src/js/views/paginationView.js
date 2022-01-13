import paw from "../../img/Dog_Paw_Print.png";
import View from "./View.js";
import searchView from "./searchView.js";
import icons from "../../img/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  ///TAKES IN FUNCTION FROM CONTROLLER AS ARG, AND MAKES THE BUTTON CHANGE THE PAGE.////
  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      // e.preventDefault();
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      //   console.log(goToPage);
      handler(goToPage);
    });
  }

  ///CHANGES BUTTONS DEPENDING ON WHAT PAGE YOURE ON////
  _generateMarkup() {
    const numPages = this._data.pagination.totalPages;
    console.log(numPages);
    console.log(this._data.pagination.currentPage);

    /// page one with more pages ///
    if (this._data.pagination.currentPage === 1 && numPages > 1) {
      return ` <div></div>
      <div>
      <button  data-goto='${
        this._data.pagination.currentPage + 1
      }'class="btn--inline pagination__btn--next">
        <span>Page ${this._data.pagination.currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    </div>`;
    }

    ///last page ///
    if (this._data.pagination.currentPage === numPages && numPages > 1) {
      return `<div>
      <button data-goto='${
        this._data.pagination.currentPage - 1
      }' class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._data.pagination.currentPage - 1}</span>
      </button>
    </div><div></div>`;
    }
    ///middle page ///
    if (this._data.pagination.currentPage < numPages) {
      return `<div>
      <button data-goto='${
        this._data.pagination.currentPage - 1
      }' class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._data.pagination.currentPage - 1}</span>
      </button>
    </div>
    <div>
              <button data-goto='${
                this._data.pagination.currentPage + 1
              }' class="btn--inline pagination__btn--next">
                <span>Page ${this._data.pagination.currentPage + 1}</span>
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
                </svg>
              </button>
            </div>`;
    }
    ///page one, no more pages///
    return ``;
  }
}

export default new PaginationView();
