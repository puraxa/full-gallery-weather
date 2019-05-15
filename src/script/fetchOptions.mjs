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

export {login, user};