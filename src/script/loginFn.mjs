export let login = async (request, url, options, callbackUrl, callbackOptions) => {
    try{
        let response = await request(url, options);
        localStorage.setItem('token', response.token);
        let user = await request(callbackUrl, callbackOptions());
        localStorage.setItem('first_name', user.first_name);
        localStorage.setItem('last_name', user.last_name);
        localStorage.setItem('user_id', user.id);
        localStorage.setItem('user_email', user.email);
        location.href = '../index.html';
    } catch(err){
        console.log(err);
    }
}