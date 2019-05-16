const login = () => {
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

const user = () => {
    return {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }
}

const location = {
    method: 'GET',
    mode: 'cors'
}
export {login, user, location};