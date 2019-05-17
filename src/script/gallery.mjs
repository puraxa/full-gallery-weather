export const gallery = async () => {
    try {
    const response = await request(galleryUrl,userOptions());
    console.log(response);
    let html = '';
    let url = '';
    let imgTitle = '';
    for(let i = 0; i < response.Contents.length; i++){
        url = response.base_url + '/' + response.Contents[i].Key;
        imgTitle = upper(response.Contents[i].Key.split('-'));
        html += `
            <div class="col-sm-12 col-md-4 col-xl-3">
                <img src="${url}" alt="${imgTitle}" width="100%" height="auto" class="error">
                ${imgTitle}
            </div>
        `;
        }
        document.getElementsByClassName('container')[0].innerHTML += 
        `
            <div class="row">
                ${html}
            </div>
        `
    } catch (err){
        console.log(err);
    }
}

function upper(arr){
    let retText = '';
    for(let i = 0; i < arr.length - 2 ; i++){
      retText += arr[i].charAt(0).toUpperCase() + arr[i].slice(1) + ' ';
    }
    return retText;
}