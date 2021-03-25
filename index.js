const countriesCards = document.getElementById("countries-cards");
const searchBar = document.getElementById("search-bar");
let countryList;

// Fetch API
const getCountries = async (api = "https://restcountries.eu/rest/v2/all?fields=name;capital;flag") => {
  try {
    const response = await fetch(api);
    const countries = await response.json();
    return countries;
  } catch (error) {
    throw error;
  }
};

// Display list function
const displayList = countries => {
  countriesCards.innerHTML = countries.map(country => {
    return `<li class="card">
              <img src="${country.flag}" />
              <hr />
              <h2>${country.name}</h2>
              <p><i>${country.capital}</i></p>
            </li>`;
  }).join("");
};

// Search function
const filterSearch = (searchList, searchQuery) => {
  return searchList.filter(filterList => {
    return (filterList.name.toLowerCase().includes(searchQuery)
      || filterList.capital.toLowerCase().includes(searchQuery));
  });
};

// Display searched list
searchBar.addEventListener("keyup", event => {
  displayList(filterSearch(countryList, event.target.value.toLowerCase()));
});


getCountries().then(countries => {
  countryList = countries;
  displayList(countries);
});
