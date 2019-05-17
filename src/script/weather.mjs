export const weather = () => {
    let html = ``;
    html = `
        <div class="row margin-none">
            <div class="col-sm-12 col-md-8 col-xl-6 margin-auto margin-top padding-none">
                <input type="text" id="location" class="border-round" placeholder="Grad">
                <button class="border-round show-weather" onclick="showWeather()">Show</button>
                <div class="row margin-none" id="weather">
            </div>
        </div>
    `;
    document.getElementsByClassName('container')[0].innerHTML += html;
}

export const showWeather = async () => {
    try{
        const location = await request(`https://api.opencagedata.com/geocode/v1/json?key=0179e876a4524198b2324e82123672f0&q=${document.getElementById('location').value}`,fetchLocation);
        localStorage.setItem('lat', location.results[0].geometry.lat);
        localStorage.setItem('lng', location.results[0].geometry.lng);
        const weatherInfo = await request(`https://api.darksky.net/forecast/a849cd7ee1e185d27d4542113dd2d7ef/${localStorage.getItem('lat')},${localStorage.getItem('lng')}?units=si&lang=bs&exclude=[minutely,hourly,daily]`, fetchLocation);
        displayForecast(weatherInfo);
    } catch(err) {
        handleError(err);
    }
}

const displayForecast = (weatherInfo) => {
    let html = `
                <div class="col-sm-12 col-md-6">
                    <img src="../images/weather/${weatherInfo.currently.icon}.png" width="100%" alt="${weatherInfo.currently.summary}" class="error">
                </div>
                <div class="col-sm-12 col-md-6">
                    <div class="row margin-none">
                        <div class="col-12">
                            Temperatura: ${Math.round(weatherInfo.currently.temperature)}°C
                        </div>
                        <div class="col-12">
                            Vlaznost zraka: ${weatherInfo.currently.humidity*100}%
                        </div>
                        <div class="col-12">
                            Brzina vjetra: ${(weatherInfo.currently.windSpeed*3.6).toFixed(2)}km/h
                        </div>
                    </div>
                </div>
            
    `;
    document.getElementById('weather').innerHTML = html;
}