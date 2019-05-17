const isLoggedIn = (callback) => {
    if(localStorage.getItem('token')){
        document.getElementById('notLogged').style.display = 'none';
        document.getElementById('log').style.display = 'none';
        document.getElementById('logout').style.display = 'inline-block';
        callback();
    }
}

export {isLoggedIn};