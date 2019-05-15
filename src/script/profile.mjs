export const displayProfile = () => {
    document.getElementsByClassName('container')[0].innerHTML += `
        <div class="col-6">
            <img src="../images/profile.png" width="50%">
            <div>
                First name: ${localStorage.getItem('first_name')}
            </div>
            <div>
                Last name: ${localStorage.getItem('last_name')}
            </div>
            <div>
                Email: ${localStorage.getItem('user_email')}
            </div>
        </div>
    `
}