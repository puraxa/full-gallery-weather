const isLoggedIn = (callback) => {
    if(localStorage.getItem('token')){
        document.getElementById('notLogged').style.display = 'none';
        callback();
    }
}

export {isLoggedIn};