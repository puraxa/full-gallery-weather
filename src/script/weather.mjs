export const showWeather = () => {
    let html = ``;
    html = `
        <div class="row">
            <div class="col-sm-12 col-md-8 col-xl-6 margin-auto margin-top">
                <input type="text" id="location" class="border-round">
                <button class="border-round show-weather">Show</button>
            </div>
        </div>
    `;
    document.getElementsByClassName('container')[0].innerHTML += html;
}