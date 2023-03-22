import View from "./View.js";
import paw from "../../img/Dog_Paw_Print.png";
import icons from "../../img/icons.svg";
import checkIcon from "../../img/checkmark-circle-outline.svg";
import xIcon from "../../img/close-circle-outline.svg";
import nullIcon from "../../img/help-circle-outline.svg";

class PetView extends View {
  _parentElement = document.querySelector(".pet-container");
  _errorMessage = "We could not find that pet. Please try again.";
  _message = "Enter your zip code to find your new best friend.";

  ///TAKES IN CONTROLLER FUNCTION, WHICH GETS PET INFO FROM MODEL. THEN RENDERS IT BASED ON THE HASH IN THE BROWSER ///
  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  /// SAME RENDER AS VIEW PARENT, BUT WITH ADDED ARGUEMENT FOR CHANGING THE GALLERY PICTURES. ALSO ARGUMENTS FOR DISPLAYING SPECIAL NEEDS, A CHECK OR X IN THE FACTS SECTION, AND SHOWING/HIDING ORGANIZATION DETAILS ///
  render(data, data2) {
    this._data = data;
    this._data2 = data2;

    // console.log(this._data);
    if (this._data.mainPhoto === null) {
      this._data.mainPhoto = paw.slice(1);
    }

    const markup = this._generateMarkup();

    this._clear();

    this._parentElement.insertAdjacentHTML("afterbegin", markup);

    ////////////////////////////////////////////////////////////////////////////
    const galleryThumbnails = document.querySelector(".gallery_thumbnails");
    const galleryThumb = document.querySelectorAll(".gallery-thumb");
    const mainImg = document.querySelector(".gallery-main-img");
    const galleryImg = document.querySelector(".gallery-thumb-img");
    let imgSrc = document.querySelector(".gallery-thumb--selected img").src;

    galleryThumbnails.addEventListener("click", function (e) {
      const clicked = e.target.closest(".gallery-thumb");
      if (!clicked) return;

      galleryThumb.forEach((t) =>
        t.classList.remove("gallery-thumb--selected")
      );
      clicked.classList.add("gallery-thumb--selected");
      imgSrc = document.querySelector(".gallery-thumb--selected img").src;
      ////////////////

      mainImg.src = imgSrc;
      // console.log(imgSrc);
      // console.log(this._data.mainPhoto.full);
      // console.log(clicked, imgSrc);
    });

    ////////////////////////////////////////////////////////////////////////
    ///THIS COULD BE REWRITTEN TO GET RID OF REDUNDANCY///
    if (this._data.attributes?.specialNeeds) {
      document.getElementsByClassName("gallery-main-tag")[0].style.display =
        "inline-block";
    }
    if (this._data.attributes?.houseTrained) {
      document.getElementsByClassName("housetrained-check")[0].style.display =
        "inline-block";
    } else if (this._data.attributes?.houseTrained === null) {
      document.getElementsByClassName("housetrained-null")[0].style.display =
        "inline-block";
    } else
      document.getElementsByClassName("housetrained-x")[0].style.display =
        "inline-block";

    if (this._data.attributes?.shots) {
      document.getElementsByClassName("shots-check")[0].style.display =
        "inline-block";
    } else if (this._data.attributes?.shots === null) {
      document.getElementsByClassName("shots-null")[0].style.display =
        "inline-block";
    } else
      document.getElementsByClassName("shots-x")[0].style.display =
        "inline-block";

    if (this._data.attributes?.neutered) {
      document.getElementsByClassName("neutered-check")[0].style.display =
        "inline-block";
    } else if (this._data.attributes?.neutered === null) {
      document.getElementsByClassName("neutered-null")[0].style.display =
        "inline-block";
    } else
      document.getElementsByClassName("neutered-x")[0].style.display =
        "inline-block";

    if (this._data.environment?.children) {
      document.getElementsByClassName("children-check")[0].style.display =
        "inline-block";
    } else if (this._data.environment?.children === null) {
      document.getElementsByClassName("children-null")[0].style.display =
        "inline-block";
    } else
      document.getElementsByClassName("children-x")[0].style.display =
        "inline-block";

    if (this._data.environment?.dogs) {
      document.getElementsByClassName("dogs-check")[0].style.display =
        "inline-block";
    } else if (this._data.environment?.dogs === null) {
      document.getElementsByClassName("dogs-null")[0].style.display =
        "inline-block";
    } else
      document.getElementsByClassName("dogs-x")[0].style.display =
        "inline-block";

    if (this._data.environment?.cats) {
      document.getElementsByClassName("cats-check")[0].style.display =
        "inline-block";
    } else if (this._data.environment?.cats === null) {
      document.getElementsByClassName("cats-null")[0].style.display =
        "inline-block";
    } else
      document.getElementsByClassName("cats-x")[0].style.display =
        "inline-block";
  }

  _generateMarkup() {
    // console.log(this._data);

    return `
    <h1 class="pet-header">Hi, I'm ${this._data.name}!</h1>
    <div class="detail-container">
      <div class="pet-images">
      <div class="gallery-main">
      <img class='gallery-main-img' alt="photo of ${this._data.name}" src="${
      this._data.mainPhoto.full ? this._data.mainPhoto.full : paw
    }"   />
      <div class="gallery-main-tag">
        <p>Special needs</p>
      </div>
        </div>
        
        <div class="gallery_thumbnails">
          <div class="gallery-thumb gallery-thumb--selected">
            <img class='gallery-thumb-img' alt="small photo of ${
              this._data.name
            }" src="${
      this._data.mainPhoto.full ? this._data.mainPhoto.full : paw
    }" />
          </div>

          ${this._data.photos
            .slice(1)

            .map((img, i) => {
              return `<div class="gallery-thumb">
            <img gallery-thumb-img alt="small photo of ${this._data.name}" src="${img.large}" />
          </div>`;
            })
            .join("")}


        </div>
      </div>
      <div class="cta">
        <h2 class="cta-about">Meet ${this._data.name}</h2>
        <p class="cta-about-detail">
          ${
            this._data.description === null
              ? ""
              : this._data.description
                  .replaceAll(/&amp;#39;/g, "&#39;")
                  .replaceAll(/&amp;#34;/g, "&#34;")
          } <br><br> (read more at <a rel="noopener" href='${
      this._data.url
    }' target='_blank'>Petfinder.com</a>)
        </p>

        <a rel="noopener" href="${
          this._data.url
        }" class="btn-adopt" target="_blank"
          >Apply to Adopt</a
        >

        
      </div>
    </div>
    <div class="section-facts">
      <h2 class="facts-title">Facts about Me</h2>
      <div class="facts">
        <div class="facts-content-half">
          <div class="facts-content">
            <div class="facts-label">Breed</div>
            <div class="facts-info">${this._data.breeds.primary}${
      this._data.breeds.secondary ? `/${this._data.breeds.secondary}` : ""
    }${this._data.breeds.mixed ? " mix" : ""} </div>
          </div>

          <div class="facts-content">
            <div class="facts-label">Age</div>
            <div class="facts-info">${this._data.age}</div>
          </div>
          <div class="facts-content">
            <div class="facts-label">Gender</div>
            <div class="facts-info">${this._data.gender}</div>
          </div>

          <div class="facts-content">
            <div class="facts-label">Size</div>
            <div class="facts-info">${this._data.size}</div>
          </div>
        </div>

        <div class="facts-content-half">
          <div class="facts-content">
          
            <img src=${checkIcon} class="fact-check housetrained-check" />
            <img src=${xIcon} class="fact-x housetrained-x" />
            <img src=${nullIcon} class="fact-null housetrained-null" />
           
            <div class="facts-label">Housetrained</div>
          </div>

          <div class="facts-content">
          <img src=${checkIcon} class="fact-check shots-check" />
          <img src=${xIcon} class="fact-x shots-x" />
          <img src=${nullIcon} class="fact-null shots-null" />
            <div class="facts-label">Shots-current</div>
          </div>

          <div class="facts-content">
          <img src=${checkIcon} class="fact-check neutered-check" />
          <img src=${xIcon} class="fact-x neutered-x" />
          <img src=${nullIcon} class="fact-null neutered-null" />
        
            <div class="facts-label">Spayed-neutered</div>
          </div>

        </div>
        <div class="facts-content-half">
          <div class="facts-content">
          <img src=${checkIcon} class="fact-check children-check" />
          <img src=${xIcon} class="fact-x children-x" />
          <img src=${nullIcon} class="fact-null children-null" />

            <div class="facts-label">Kid-friendly</div>
          </div>

          <div class="facts-content">
          <img src=${checkIcon} class="fact-check dogs-check" />
          <img src=${xIcon} class="fact-x dogs-x" />
          <img src=${nullIcon} class="fact-null dogs-null" />
        
            <div class="facts-label">Dog-friendly</div>
          </div>

          <div class="facts-content">
          <img src=${checkIcon} class="fact-check cats-check" />
          <img src=${xIcon} class="fact-x cats-x" />
          <img src=${nullIcon} class="fact-null cats-null" />
      
            <div class="facts-label">Cat-friendly</div>
          </div>
        </div>
      </div>
    </div>
    <div id='${
      this._data.id
    }/organization-details'  class="organization-details">
      <h2 class="org-title">
        I'm being cared for by</h2> <h2 class='org-title'> ${
          this._data2.orgName ? this._data2.orgName : "an unknown organization"
        }
      </h2>

      <div class="org-info">

        <div class="org-content organization-address">
          <ion-icon class="org-icon" name="location-outline"></ion-icon>
          <div class="org-detail">
            <p>${
              this._data2.address.address1 ? this._data2.address.address1 : ""
            } ${
      this._data2.address.address2 ? ", " + this._data2.address.address2 : ""
    }</p>
            <p>${this._data2.address.city ? this._data2.address.city : ""}, ${
      this._data2.address.state ? this._data2.address.state : ""
    } ${this._data2.address.postcode ? this._data2.address.postcode : ""}</p>
          </div>
        </div>

        
        ${
          this._data2.email
            ? `<div class="org-content organization-email">
          <ion-icon class="org-icon" name="mail-outline"></ion-icon>
          <div class="org-detail">
          <a href="mailto:${this._data2.email}" class="btn contact-details" alt='email'
          >${this._data2.email}</a>
          </div>
        </div>`
            : ""
        }
    
            ${
              this._data2.phone
                ? ` <div class="org-content organization-phone"><ion-icon class="org-icon" name="call-outline"></ion-icon>
          <div class="org-detail">
          <a href="tel:${this._data2.phone}">${this._data2.phone}</a>
          </div>
        </div>`
                : ""
            }
         
        
      ${
        this._data2.website
          ? ` <div class="org-content organization-website">
        <ion-icon class='org-icon' name="globe-outline"></ion-icon>
        <div class="org-detail">
        <a rel="noopener" href='${this._data2.website}' target='_blank'>${this._data2.website}</a>
        </div>
      </div>`
          : ""
      }
       

      <div class='social-icons'>

${
  this._data2.socialMedia.facebook
    ? `<a rel="noopener" href='${this._data2.socialMedia.facebook}' target='_blank'><ion-icon class='social-icon' name="logo-facebook"></ion-icon></a>
`
    : ""
}
      
${
  this._data2.socialMedia.instagram
    ? ` <a rel="noopener" href='${this._data2.socialMedia.instagram}' target='_blank'><ion-icon class='social-icon' name="logo-instagram"></ion-icon></a>`
    : ""
}
     
${
  this._data2.socialMedia.twitter
    ? `<a rel="noopener" href='${this._data2.socialMedia.twitter}' target='_blank'><ion-icon class='social-icon' name="logo-twitter"></ion-icon></a>`
    : ""
}
      
${
  this._data2.socialMedia.youtube
    ? ` <a rel="noopener" href='${this._data2.socialMedia.youtube}' target='_blank'><ion-icon class='social-icon' name="logo-youtube"></ion-icon></a>
`
    : ""
}
     
      </div>
   
      </div>
    </div>`;
  }
}

export default new PetView();
