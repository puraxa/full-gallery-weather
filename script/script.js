let geoLocationKey = '0179e876a4524198b2324e82123672f0';

function isLoggedIn(fn, method, callback, url, callbackParse, urlEdit){
    let log = localStorage.getItem('token');
    if(!log){
        document.getElementById('notLogged').style.display = 'block';
    }
    else {
        document.getElementById('log').style.display = 'none';
        document.getElementById('logout').style.display = 'inline-block';
        if(fn){
            fn(method, callback, url, callbackParse, urlEdit);
        }
    }
}

function request(method, callback, url, callbackParse, urlEdit){
    let xhttp = new XMLHttpRequest();
    if(urlEdit){
        url = urlEdit(url);
        console.log(url);
    }
    xhttp.open(method, url, true);
    callback(xhttp);
    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200){
            callbackParse(xhttp);
        }
        if(xhttp.readyState == 4 && xhttp.status != 200){
            showError(xhttp);
        }
    }
}
function login(httpReq){
    httpReq.setRequestHeader('Content-type', 'application/json');
    let loginData = {};
    loginData.email = document.getElementsByName('email')[0].value;
    loginData.password = document.getElementsByName('password')[0].value;
    let sendLoginData = JSON.stringify(loginData);
    httpReq.send(sendLoginData);
}

function loginParse(httpReq){
    let result = JSON.parse(httpReq.responseText);
    localStorage.setItem('token', result.token);
    redirectHomePage();
}

function geolocationUrl(url){
    let location = encodeURIComponent(document.getElementsByName('location')[0].value);
    url = url + '?key=' + geoLocationKey + '&q=' + location;
    return url;
}

function parseGeoLocation(httpResponse){
    let response = JSON.parse(httpResponse.responseText);
    localStorage.setItem('lat', response.results[0].geometry.lat);
    localStorage.setItem('lng', response.results[0].geometry.lng);
    localStorage.setItem('location', document.getElementsByName('location')[0].value);
    request('GET', sendGet,'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/a849cd7ee1e185d27d4542113dd2d7ef/', showForecast, weatherUrl);
}

function weatherUrl(url) {
    url += `${localStorage.getItem('lat')},${localStorage.getItem('lng')}?units=si&lang=bs&exclude=[minutely,hourly,daily]`;
    return url;
}

function setAuthorization(httpReq) {
    httpReq.setRequestHeader('Authorization', localStorage.getItem('token'));
    httpReq.send();
}

function imgParse(httpResponse){
    let response = JSON.parse(httpResponse.responseText);
    showGallery(response);
}

function showGallery(data){
    let gallery = '';
    let url = '';
    let imgTitle = '';
    for(let i = 0; i < data.Contents.length; i++){
        url = data.base_url + '/' + data.Contents[i].Key;
        imgTitle = upper(data.Contents[i].Key.split('-'));
        gallery += `
        <div class="card bg-secondary col-xs-6 col-sm-6 col-md-4 col-lg-3">
            <img class="card-img-top" src="${url}" alt="${imgTitle} image" width="200px" height="200px">
            <div class="card-body">
                <h5 class="card-title">${imgTitle}</h5>
            </div>
        </div>
        `;
    }
    document.getElementById('gallery').innerHTML = gallery;
}

function upper(arr){
    let retText = '';
    for(let i = 0; i < arr.length - 2 ; i++){
      retText += arr[i].charAt(0).toUpperCase() + arr[i].slice(1) + ' ';
    }
    return retText;
}

function redirectHomePage(){
    window.location.href = "./profile.html";
}

function logOut(){
    localStorage.clear();
    location.reload();
}

function sendGet(httpReq){
    httpReq.send();
}

function showForecast(response){
    let weather = JSON.parse(response.responseText);
    document.getElementById('forecast').innerHTML = `
    <div class="col-6">
      <img src="../images/weather/${weather.currently.icon}.png" width="90%" height="auto" alt="${weather.currently.summary}">
    </div>
    <div class="col-6">
      <h1>${weather.currently.summary}</h1>
      <p>Temperatura: ${Math.round(weather.currently.temperature)}°C</p>
      <p>Vlaznost zraka: ${weather.currently.humidity*100}%</p>
      <p>Brzina vjetra: ${(weather.currently.windSpeed*3.6).toFixed(2)}km/h</p>
    </div>
      `;
}

function showWeather() {
    document.getElementsByClassName('center')[0].style.display = 'block';
    let lat = localStorage.getItem('lat');
    let lng = localStorage.getItem  ('lng');
    if(lat && lng){
        request('GET', sendGet,'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/a849cd7ee1e185d27d4542113dd2d7ef/', showForecast, weatherUrl);
        document.getElementsByName('location')[0].value = localStorage.getItem('location');
    }
}

function showProfile(response) {
    let information = JSON.parse(response.responseText);
    document.getElementById('profile').innerHTML = `
        <div class="col-2">
            <img src="../images/profile.png" width="100%" height="auto" alt="">
        </div>
        <div class="col-6">
            <p>Ime: ${information.first_name}</p>
            <p>Prezime: ${information.last_name}</p>
            <p>Email: ${information.email}</p>  
        </div>
    `;
    localStorage.setItem('firstName',information.first_name);
    localStorage.setItem('lastName',information.last_name);
}

function welcomeMessage(element) {
    document.getElementsByClassName('container')[0].innerHTML += `<p>Welcome ${localStorage.getItem('firstName')} ${localStorage.getItem('lastName')}</p>`
}

function showError(response) {
    let res = JSON.parse(response.responseText);
    document.getElementById('error').textContent = res.message;
}