"use strict";

// import "core-js/stable";
// import "regenerator-runtime/runtime";
const API_KEY = "BPUFvkh8oJ2OQUbe0KDpOmlvbx2assWOaLKU3DD1ExENu8JUDp";
const API_SECRET = "0luwRLgUB1WXiMzJkcoVw26TbEKCUsYvuNnexYES";

console.log("hi");

const petContainer = document.querySelector(".pet-container");
const id = window.location.hash;
//loading pets
const getPets = async function () {
  try {
    const res1 = await fetch("https://api.petfinder.com/v2/oauth2/token", {
      method: "post",
      body: `grant_type=client_credentials&client_id=${API_KEY}&client_secret=${API_SECRET}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const data1 = await res1.json();
    // console.log(res, data);

    const res = await fetch(
      `https://api.petfinder.com/v2/animals/${id}`,
      // "https://api.petfinder.com/v2/animals/5410874",
      // "https://api.petfinder.com/v2/organizations/nc396",
      {
        headers: {
          Authorization: data1.token_type + " " + data1.access_token,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const data = await res.json();
    let { animal } = data;
    animal = {
      age: animal.age,
      attributes: animal.attributes,
      breeds: animal.breeds,

      description: animal.description,
      environment: animal.environment,
      gender: animal.gender,
      id: animal.id,
      name: animal.name,
      organizationId: animal.organization_id,
      photos: animal.photos,
      mainPhoto: animal.primary_photo_cropped,
      size: animal.size,
      status: animal.status,
      type: animal.type,
      url: animal.url,
      links: animal._links.organization.href,
    };
    animal.attributes = {
      neutered: animal.attributes.spayed_neutered,
      shots: animal.attributes.shots_current,
      specialNeeds: animal.attributes.special_needs,
      houseTrained: animal.attributes.house_trained,
    };

    const res2 = await fetch(
      `https://api.petfinder.com/v2/organizations/${animal.organizationId}`,
      {
        headers: {
          Authorization: data1.token_type + " " + data1.access_token,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const data2 = await res2.json();
    // console.log(data);
    // console.log(data2);

    // console.log(animal);

    let { organization } = data2;
    // console.log(organization);

    console.log(animal);
    organization = {
      address: organization.address,
      email: organization.email,
      orgName: organization.name,
      phone: organization.phone,
      website: organization.website,
      socialMedia: organization.social_media,
    };
    // console.log(animal);
    console.log(organization);

    //rendering recipie
    const markup = `
    <h1 class="pet-header">Hi, I'm ${animal.name}!</h1>
    <div class="detail-container">
      <div class="pet-images">
        <div class="gallery-main">
          <img alt="photo of ${animal.name}" src="${animal.mainPhoto.full}" />
          <div class="gallery-main-tag">
            <p>Special needs</p>
          </div>
        </div>
        
        <div class="gallery_thumbnails">
          <div class="gallery-thumb gallery-thumb--selected">
            <img alt="small photo of ${animal.name}" src="${
      animal.mainPhoto.small
    }" />
          </div>

          ${animal.photos
            .slice(1)

            .map((img) => {
              return `<div class="gallery-thumb">
            <img alt="small photo of ${animal.name}" src="${img.small}" />
          </div>`;
            })
            .join("")}


        </div>
      </div>
      <div class="cta">
        <h2 class="cta-about">Meet ${animal.name}</h2>
        <p class="cta-about-detail">
          ${animal.description} <br> (read more at <a href='${
      animal.url
    }' target='_blank'>Petfinder.com</a>)
        </p>

        <a href="${animal.url}" class="btn-adopt" target="_blank"
          >Apply to Adopt</a
        >

        <p class="cta-contact">
          Not sure if you're ready? <a href="#">Ask a question.</a>
        </p>
      </div>
    </div>
    <div class="section-facts">
      <h2 class="facts-title">Facts about Me</h2>
      <div class="facts">
        <div class="facts-content-half">
          <div class="facts-content">
            <div class="facts-label">Breed</div>
            <div class="facts-info">${animal.breeds.primary}${
      animal.breeds.secondary ? `, ${animal.breeds.secondary}` : ""
    } </div>
          </div>

          <div class="facts-content">
            <div class="facts-label">Age</div>
            <div class="facts-info">${animal.age}</div>
          </div>
          <div class="facts-content">
            <div class="facts-label">Gender</div>
            <div class="facts-info">${animal.gender}</div>
          </div>

          <div class="facts-content">
            <div class="facts-label">Size</div>
            <div class="facts-info">${animal.size}</div>
          </div>
        </div>

        <div class="facts-content-half">
          <div class="facts-content">
          <ion-icon class='fact-null housetrained-null' name="help-circle-outline"></ion-icon>

            <ion-icon
              class="fact-check housetrained-check"
              name="checkmark-circle-outline"
            ></ion-icon>
            <ion-icon
              class="fact-x housetrained-x"
              name="close-circle-outline"
            ></ion-icon>
            <div class="facts-label">Housetrained</div>
          </div>

          <div class="facts-content">
          <ion-icon class='fact-null shots-null' name="help-circle-outline"></ion-icon>

            <ion-icon
              class="fact-check shots-check"
              name="checkmark-circle-outline"
            ></ion-icon><ion-icon
            class="fact-x shots-x"
            name="close-circle-outline"
          ></ion-icon>
            <div class="facts-label">Shots-current</div>
          </div>

          <div class="facts-content">
          <ion-icon class='fact-null neutered-null' name="help-circle-outline"></ion-icon>

            <ion-icon
              class="fact-check neutered-check"
              name="checkmark-circle-outline"
            ></ion-icon><ion-icon
            class="fact-x neutered-x"
            name="close-circle-outline"
          ></ion-icon>
            <div class="facts-label">Spayed-neutered</div>
          </div>

        </div>
        <div class="facts-content-half">
          <div class="facts-content">
          <ion-icon class='fact-null children-null' name="help-circle-outline"></ion-icon>

            <ion-icon
              class="fact-check children-check"
              name="checkmark-circle-outline"
            ></ion-icon><ion-icon
            class="fact-x children-x"
            name="close-circle-outline"
          ></ion-icon>
            <div class="facts-label">Kid-friendly</div>
          </div>

          <div class="facts-content">
          <ion-icon class='fact-null dogs-null' name="help-circle-outline"></ion-icon>

            <ion-icon
              class="fact-check dogs-check"
              name="checkmark-circle-outline"
            ></ion-icon><ion-icon
            class="fact-x dogs-x"
            name="close-circle-outline"
          ></ion-icon>
            <div class="facts-label">Dog-friendly</div>
          </div>

          <div class="facts-content">
          <ion-icon class='fact-null cats-null' name="help-circle-outline"></ion-icon>

            <ion-icon
              class="fact-check cats-check"
              name="checkmark-circle-outline"
            ></ion-icon><ion-icon
            class="fact-x cats-x"
            name="close-circle-outline"
          ></ion-icon>
            <div class="facts-label">Cat-friendly</div>
          </div>
        </div>
      </div>
    </div>
    <div class="organization-details">
      <h2 class="org-title">
        I'm being cared for by ${organization.orgName}
      </h2>

      <div class="org-info">

        <div class="org-content organization-address">
          <ion-icon class="org-icon" name="location-outline"></ion-icon>
          <div class="org-detail">
            <p>${organization.address.address1}, ${
      organization.address.address2
    }</p>
            <p>${organization.address.city}, ${organization.address.state} ${
      organization.address.postcode
    }</p>
          </div>
        </div>

        <div class="org-content organization-email">
          <ion-icon class="org-icon" name="mail-outline"></ion-icon>
          <div class="org-detail">
          <a href="mailto:${
            organization.email
          }" class="btn contact-details" alt='email'
          >${organization.email}</a>
          </div>
        </div>

        <div class="org-content organization-phone">
          <ion-icon class="org-icon" name="call-outline"></ion-icon>
          <div class="org-detail">
          <a href="tel:${organization.phone}">${organization.phone}</a>
          </div>
        </div>

        <div class="org-content organization-website">
        <ion-icon class='org-icon' name="globe-outline"></ion-icon>
        <div class="org-detail">
        <a href='${organization.website}' target='_blank'>${
      organization.website
    }</a>
        </div>
      </div>

      <div class='social-icons'>
      <a href='${
        organization.socialMedia.facebook
      }' target='_blank'><ion-icon class='social-icon' name="logo-facebook"></ion-icon></a>
      <a href='${
        organization.socialMedia.instagram
      }' target='_blank'><ion-icon class='social-icon' name="logo-instagram"></ion-icon></a>
      <a href='${
        organization.socialMedia.twitter
      }' target='_blank'><ion-icon class='social-icon' name="logo-twitter"></ion-icon></a>
      <a href='${
        organization.socialMedia.youtube
      }' target='_blank'><ion-icon class='social-icon' name="logo-youtube"></ion-icon></a>
      </div>
   
      </div>
    </div>`;
    petContainer.innerHTML = "";
    petContainer.insertAdjacentHTML("afterbegin", markup);
    if (animal.attributes.specialNeeds) {
      document.getElementsByClassName("gallery-main-tag")[0].style.display =
        "inline-block";
    }
    if (animal.attributes.houseTrained) {
      document.getElementsByClassName("housetrained-check")[0].style.display =
        "inline-block";
    } else if (animal.attributes.houseTrained === null) {
      document.getElementsByClassName("housetrained-null")[0].style.display =
        "inline-block";
    } else
      document.getElementsByClassName("housetrained-x")[0].style.display =
        "inline-block";

    if (animal.attributes.shots) {
      document.getElementsByClassName("shots-check")[0].style.display =
        "inline-block";
    } else if (animal.attributes.shots === null) {
      document.getElementsByClassName("shots-null")[0].style.display =
        "inline-block";
    } else
      document.getElementsByClassName("shots-x")[0].style.display =
        "inline-block";

    if (animal.attributes.neutered) {
      document.getElementsByClassName("neutered-check")[0].style.display =
        "inline-block";
    } else if (animal.attributes.neutered === null) {
      document.getElementsByClassName("neutered-null")[0].style.display =
        "inline-block";
    } else
      document.getElementsByClassName("neutered-x")[0].style.display =
        "inline-block";

    if (animal.environment.children) {
      document.getElementsByClassName("children-check")[0].style.display =
        "inline-block";
    } else if (animal.environment.children === null) {
      document.getElementsByClassName("children-null")[0].style.display =
        "inline-block";
    } else
      document.getElementsByClassName("children-x")[0].style.display =
        "inline-block";

    if (animal.environment.dogs) {
      document.getElementsByClassName("dogs-check")[0].style.display =
        "inline-block";
    } else if (animal.environment.dogs === null) {
      document.getElementsByClassName("dogs-null")[0].style.display =
        "inline-block";
    } else
      document.getElementsByClassName("dogs-x")[0].style.display =
        "inline-block";

    if (animal.environment.cats) {
      document.getElementsByClassName("cats-check")[0].style.display =
        "inline-block";
    } else if (animal.environment.cats === null) {
      document.getElementsByClassName("cats-null")[0].style.display =
        "inline-block";
    } else
      document.getElementsByClassName("cats-x")[0].style.display =
        "inline-block";
  } catch (err) {
    console.log(err);
  }
};

window.addEventListener("hashchange", getPets);
window.addEventListener("load", getPets);
