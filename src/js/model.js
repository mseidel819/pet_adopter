// const API_KEY = "BPUFvkh8oJ2OQUbe0KDpOmlvbx2assWOaLKU3DD1ExENu8JUDp";
// const API_SECRET = "0luwRLgUB1WXiMzJkcoVw26TbEKCUsYvuNnexYES";
import { API_KEY } from "./config.js";
import { API_SECRET } from "./config.js";
import { API_TOKEN_URL } from "./config.js";
import { API_URL } from "./config.js";
import { API_ORG } from "./config.js";
import { getJSON } from "./helpers.js";

///////////////////////////////////////////////////////////
//MAIN OBJECT FOR EVERYTHING WE NEED.
///////////////////////////////////////////////////////////
export const state = {
  animal: {},
  organization: {},
  search: {
    query: "",
    results: [],
    pagination: {
      currentPage: 1,
    },
  },
};

///////////////////////////////////////////////////////////
//ACCESSING THE API
///////////////////////////////////////////////////////////
export const loadPets = async function (id) {
  try {
    /////GETTING TOKEN//////////
    const data1 = await getJSON(`${API_TOKEN_URL}`, {
      method: "post",
      body: `grant_type=client_credentials&client_id=${API_KEY}&client_secret=${API_SECRET}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    //////GETTING  DOG INFO/////////
    const data = await getJSON(`${API_URL}/${id}`, {
      headers: {
        Authorization: data1.token_type + " " + data1.access_token,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    //////////REFACTORING DATA FROM API AND PUTTING IT INTO MY OWN OBJECT///////
    const { animal } = data;
    state.animal = {
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
    state.animal.attributes = {
      neutered: animal.attributes.spayed_neutered,
      shots: animal.attributes.shots_current,
      specialNeeds: animal.attributes.special_needs,
      houseTrained: animal.attributes.house_trained,
    };
    /////////GETTING ORGANIZATION INFO///////////
    const data2 = await getJSON(`${API_ORG}/${state.animal.organizationId}`, {
      headers: {
        Authorization: data1.token_type + " " + data1.access_token,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    // console.log(animal);
    // console.log(organization);

    const { organization } = data2;

    //////////REFACTORING DATA FROM API AND PUTTING IT INTO MY OWN OBJECT///////
    state.organization = {
      address: organization.address,
      email: organization.email,
      orgName: organization.name,
      phone: organization.phone,
      website: organization.website,
      socialMedia: organization.social_media,
    };
    // console.log(state.animal);
    // console.log(state.organization);
  } catch (err) {
    // console.log(err);
    throw err;
  }
};

///////////////////////////////////////////////////////////
//ACCESSING THE API USING THE SEARCH FUNCTION. ALSO USED FOR PAGINATION
///////////////////////////////////////////////////////////
export const loadSearchResults = async function (query, page = 1) {
  try {
    state.search.query = query;
    state.search.pagination.currentPage = page;
    // state.search.pagination.currentPage = page;

    const data1 = await getJSON(`${API_TOKEN_URL}`, {
      method: "post",
      body: `grant_type=client_credentials&client_id=${API_KEY}&client_secret=${API_SECRET}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const data = await getJSON(
      `${API_URL}?location=${query}&distance=10&type=dog&limit=8&page=${page}`,
      {
        headers: {
          Authorization: data1.token_type + " " + data1.access_token,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    // console.log(data);
    // console.log(data.pagination);

    ////////////////PULLING INFO FROM API AND REFACTORING IT INTO MY OWN DATA. A LIST OF PETS ALSO INCLUDES A PAGINATION OBJECT. THATS WHY THEYRE BUNDLED TOGETHER//////
    state.search.results = data.animals.map((pet) => {
      return {
        age: pet.age,
        attributes: pet.attributes,
        breeds: pet.breeds,
        distance: pet.distance,
        description: pet.description,
        environment: pet.environment,
        gender: pet.gender,
        id: pet.id,
        name: pet.name,
        organizationId: pet.organization_id,
        photos: pet.photos,
        mainPhoto: pet.primary_photo_cropped,
        size: pet.size,
        status: pet.status,
        type: pet.type,
        url: pet.url,
        links: pet._links.organization.href,
      };
    });
    state.search.pagination = {
      currentPage: data.pagination.current_page,
      totalCount: data.pagination.total_count,
      totalPages: data.pagination.total_pages,
    };
    // state.search.pagination.currentPage = 2;
    // console.log(state.search.pagination);

    // console.log(state.search.results);

    ////SORTING BY DISTANCE. ONLY WORKS PER THE RESULTS ON THE PAGE. POTENTIAL FIX: LOAD ALL PETS AT ONCE, AND MODIFY PAGINATION PER THE FORKIFY APP.
    state.search.results.sort((a, b) => a.distance - b.distance);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

////DID I USE THIS? FOR CHANGING PAGES////////
// export const getSearchResultsPage = function (
//   page = state.search.pagination.currentPage
// ) {
//   return state.search.pagination.currentPage + 1;
// };
