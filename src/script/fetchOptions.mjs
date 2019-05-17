const loginOptions = () => {
    let data = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };
    data = JSON.stringify(data);
    return {
        method: 'POST',
        mode: 'cors',
        body: data,
    }
}

const userOptions = () => {
    return {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }
}

const locationOptions = {
    method: 'GET',
    mode: 'cors'
}
export {loginOptions, userOptions, locationOptions};