var mainEl = document.querySelector('main');
var locationForm = document.querySelector('#location-form');
var cinemasNearbyDiv = document.querySelector('#cinemas-nearby');

var moviegluCall = {
  cinemasNearbyEndpoint: 'https://api-gate2.movieglu.com/cinemasNearby/',
  cinemaShowtimesEndpoint: 'https://api-gate2.movieglu.com/cinemaShowTimes/',
  apiVersion: 'v200',
  authorization: 'Basic UkhUTjpYQk5RaDBDNGhPamM=',
  client: 'RHTN',
  apikey: 'qnpVdOgChm42R0SlChf4OgIAJS6b5ZN2QHGKUFv4',
  datetime: new Date(Date.now()).toISOString(),
  territory: 'US'
}

var moviegluSandbox = {
  cinemasNearbyEndpoint: 'https://api-gate2.movieglu.com/cinemasNearby/',
  cinemaShowtimesEndpoint: 'https://api-gate2.movieglu.com/cinemaShowTimes/',
  apiVersion: 'v200',
  authorization: 'Basic UkhUTl9YWDpPWDVQeDNKS0NVY1Q=',
  client: 'RHTN',
  apikey: 'Fvn2jSwMsT4NBd1JVtz9u9lnwhsnaZQs2wP8Nmq8',
  datetime: new Date(Date.now()).toISOString(),
  territory: 'XX'
}

function geocode(event) {
  event.preventDefault();

  var zipCode = document.querySelector('#zipcode-input').value;
  var geocodeApiKey = 'AIzaSyAEbZW4uFqVbf4qom4lu0Hgj6BZ71Cm1dE';
  var apiURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${geocodeApiKey}`;
  
  
  fetch(apiURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var latitude = data.results[0].geometry.location.lat;
    var longitude = data.results[0].geometry.location.lng;
    
    function fetchCinemasNearbyData() {
      var data =   fetch(moviegluSandbox.cinemasNearbyEndpoint, {
        "headers": {
          "api-version": moviegluSandbox.apiVersion,
          "Authorization": moviegluSandbox.authorization,
          "client": moviegluSandbox.client,
          "x-api-key": moviegluSandbox.apikey,
          "device-datetime": moviegluSandbox.datetime,
          "territory": moviegluSandbox.territory,
          "geolocation": '-22.0;14.0',
          // "geolocation": `${latitude};${longitude}`
        },
      })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        return data;
      });
      return data;
  }

  async function displayCinemaResults () {
    cinemasNearbyDiv.innerHTML = '';
    var cinemaData = await fetchCinemasNearbyData();
    
    console.log(cinemaData);
    for (let i = 0; i < cinemaData.cinemas.length; i++) {
      var cinemaName = cinemaData.cinemas[i].cinema_name;
      var cinemaID = cinemaData.cinemas[i].cinema_id;
      var cinemaLat = cinemaData.cinemas[i].lat;
      var cinemaLng = cinemaData.cinemas[i].lng;

      var cinemaDivEl = document.createElement('div');
      cinemaDivEl.id = cinemaID;
      cinemaDivEl.classList.add('cinema');
      cinemaDivEl.setAttribute('data-lat', cinemaLat);
      cinemaDivEl.setAttribute('data-lng', cinemaLng);
      var cinemaLogoEl = document.createElement('img');
      cinemaLogoEl.src = cinemaData.cinemas[i].logo_url;
      cinemaLogoEl.alt = 'Cinema Logo'
      var cinemaNameEl = document.createElement('h2');
      cinemaNameEl.textContent = cinemaName;
      var showtimesBtn = document.createElement('button');
      showtimesBtn.classList.add('showtime-btn');
      showtimesBtn.textContent = 'View Showtimes';
      var showMapBtn = document.createElement('button');
      showMapBtn.classList.add('show-map-btn');
      showMapBtn.textContent = 'View Map';

      cinemaDivEl.appendChild(cinemaLogoEl);
      cinemaDivEl.appendChild(cinemaNameEl);
      cinemaDivEl.appendChild(showtimesBtn);
      cinemaDivEl.appendChild(showMapBtn);
      cinemasNearbyDiv.appendChild(cinemaDivEl);
    }
    
    var showtimeBtns = cinemasNearbyDiv.querySelectorAll('.showtime-btn');

    function handleShowtimesClick() {
      var cinemaDiv = this.parentElement;
      var cinemaID = cinemaDiv.id;

      function fetchCinemasShowtimesData() {
        var data =   fetch(`${moviegluSandbox.cinemaShowtimesEndpoint}?cinema_id=${cinemaID}&date=${new Date().toISOString().split('T')[0]}`, {
          "headers": {
            "api-version": moviegluSandbox.apiVersion,
            "Authorization": moviegluSandbox.authorization,
            "client": moviegluSandbox.client,
            "x-api-key": moviegluSandbox.apikey,
            "device-datetime": moviegluSandbox.datetime,
            "territory": moviegluSandbox.territory,
            // "geolocation": '-22.0;14.0',
            // "geolocation": `${latitude};${longitude}`
          },
        })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          return data;
        });
        return data;
      }

      async function displayShowtimesResults () {
        var showtimesData = await fetchCinemasShowtimesData();
        console.log(showtimesData);
        var films = showtimesData.films;
        console.log(films);
        var showtimesDivEl = document.createElement('div');
        showtimesDivEl.classList.add('showtimes');
        showtimesDivEl.innerHTML = '';

        for (let i = 0; i < films.length; i++) {
          var filmDivEl = document.createElement('div');
          filmDivEl.id = films[i].film_id;
          filmDivEl.classList.add('film');
          var filmTitleEl = document.createElement('h3');
          filmTitleEl.textContent = `${films[i].film_name} `;

          if (films[i].images.poster.length === undefined) {
            var filmPosterEl = document.createElement('img');
            filmPosterEl.setAttribute('src', films[i].images.poster[1].medium.film_image);
            filmPosterEl.setAttribute('alt', 'Movie Poster');
          } else {
            var filmPosterEl = document.createElement('img');
            filmPosterEl.setAttribute('src', './assets/images/placeholder.png');
            filmPosterEl.setAttribute('alt', 'Movie poster not available');
          }

          var ageRatingEl = document.createElement('span');
          ageRatingEl.textContent = films[i].age_rating[0].rating;

          filmTitleEl.appendChild(ageRatingEl);
          filmDivEl.appendChild(filmTitleEl);
          filmDivEl.appendChild(filmPosterEl);
          showtimesDivEl.appendChild(filmDivEl);
          cinemaDiv.insertAdjacentElement('beforeend', showtimesDivEl);
        }
      }

      displayShowtimesResults();
    }

    showtimeBtns.forEach(function(showtimesBtn) {
    showtimesBtn.addEventListener('click', handleShowtimesClick);
    });
  }

  displayCinemaResults();
  });
}

locationForm.addEventListener('submit', geocode);