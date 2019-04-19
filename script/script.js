let loginUrl = 'https://3d1pftib26.execute-api.eu-west-1.amazonaws.com/dev/user/login';
let getUserInfoUrl = 'https://cors-anywhere.herokuapp.com/https://3d1pftib26.execute-api.eu-west-1.amazonaws.com/dev/user/profile';
let galleryUrl = 'https://3d1pftib26.execute-api.eu-west-1.amazonaws.com/dev/images/list';

function isLoggedIn(callback, method, url, reqCallback, params,reqHeader){
    let foundToken = localStorage.getItem('token');
    if(!foundToken){
        document.getElementById('notLogged').style.display = 'block';
    }
    else{
        document.getElementById('log').style.display = 'none';
        document.getElementById('logout').style.display = 'block';
        callback(method, url, reqCallback, params, reqHeader);
        if(document.getElementById('input-button')){
            document.getElementById('input-button').style.display = 'block';
        }
    }
}

function request(method, url, callback, params, reqHeader){
    let client = new XMLHttpRequest();
    client.open(method, url, true);
    if(reqHeader){
        client.setRequestHeader(reqHeader[0],reqHeader[1]);
    }
    client.send(params);
    client.onreadystatechange = callback.bind(client);
}

function login(){
    if(this.readyState == 4 && this.status == 200){
        let token = JSON.parse(this.responseText);
        localStorage.setItem('token', token.token);
        location.href = './profile.html';
    }
    if(this.readyState == 4 && this.status != 200){
        document.getElementById('error').innerText = JSON.parse(this.responseText).message;
    }
}

function loginParams(){
    let obj = {};
    obj.email = document.getElementsByName('email')[0].value;
    obj.password = document.getElementsByName('password')[0].value;
    let data = JSON.stringify(obj);
    return data;
}

function logOut(){
    localStorage.clear();
    location.reload();
}

function getUserInfo(){
    if(this.readyState == 4 && this.status == 200){
        let userInfo = JSON.parse(this.responseText);
        localStorage.setItem('firstname', userInfo.first_name);
        localStorage.setItem('lastname', userInfo.last_name);
        showUserProfile(userInfo);
    }
}

function showUserProfile(data){
    document.getElementById('user-profile').innerHTML = `
    <div class="user-profile">
        <img src="../images/profile.png" width=250>
    </div>
    <div class="user-profile">
        <p>First name : ${data.first_name}</p>
        <p>Last name : ${data.last_name}</p>
        <p>Email : ${data.email}</p>
    </div>
    `;
}

function galleryReq(){
    if(this.readyState == 4 && this.status == 200){
        let galleryData = JSON.parse(this.responseText);
        showGallery(galleryData);
    }
}

function showGallery(data){
    let gallery = '';
    let url = '';
    let imgTitle = '';
    for(let i = 0; i < data.Contents.length; i++){
        url = data.base_url + '/' + data.Contents[i].Key;
        imgTitle = upper(data.Contents[i].Key.split('-'));
        gallery += `
            <div class="picture-box">
                <img src="${url}" class="img-gallery" alt="${imgTitle}">
                ${imgTitle}
            </div>
        `
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

function locationInfo(){
    if(this.readyState == 4 && this.status == 200){
        let data = JSON.parse(this.responseText);
        localStorage.setItem('lat', data.results[0].geometry.lat);
        localStorage.setItem('lng', data.results[0].geometry.lng);
        localStorage.setItem('location', document.getElementById('location').value);
        request('GET', prepareWeatherUrl(), weatherInfo);
    }
}

function weatherInfo(){
    if(this.readyState == 4 && this.status == 200){
        let data = JSON.parse(this.responseText);
        showWeather(data);
    }
}

function prepareLocationUrl(){
    let location = document.getElementById('location').value;
    return `https://api.opencagedata.com/geocode/v1/json?key=0179e876a4524198b2324e82123672f0&q=${location}`;
}

function prepareWeatherUrl(){
    let lat = localStorage.getItem('lat');
    let lng = localStorage.getItem('lng');
    return `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/a849cd7ee1e185d27d4542113dd2d7ef/${lat},${lng}?units=si&lang=bs&exclude=[minutely,hourly,daily]`;
}

function showWeather(weather){
    document.getElementById('location').value = localStorage.getItem('location');
    document.getElementById('weather').innerHTML = `
  <div class="float-left">
    <img src="../images/weather/${weather.currently.icon}.png" width=175 alt="${weather.currently.summary}">
  </div>
  <div class="float-left">
    <p>${weather.currently.summary}</p>
    <p>Temperatura: ${Math.round(weather.currently.temperature)}°C</p>
    <p>Vlaznost zraka: ${weather.currently.humidity*100}%</p>
    <p>Brzina vjetra: ${(weather.currently.windSpeed*3.6).toFixed(2)}km/h</p>
  </div>
    `;
}

function welcomeMessage(){
    document.getElementsByTagName('body')[0].innerHTML += `<p>Welcome ${localStorage.getItem('firstname')} ${localStorage.getItem('lastname')}!</p>`
}

function indexCheck(){
    let client = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        client.open('GET', getUserInfoUrl, true);
        client.setRequestHeader('Authorization', localStorage.getItem('token'));
        client.send();
        client.onreadystatechange = () => {
            if(client.readyState == 4 && client.status == 200){
                let obj = JSON.parse(client.responseText);
                localStorage.setItem('firstname', obj.first_name);
                localStorage.setItem('lastname', obj.last_name);
                resolve();
            }
            if(client.readyState == 4 && client.status != 200){
                reject(new Error(client.responseText));
            }
        }
    }).then(welcomeMessage).catch();
}