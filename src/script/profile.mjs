export const displayProfile = () => {
    document.getElementsByClassName('container')[0].innerHTML += `
        <div class="row">    
            <div class="col-xs-12 col-md-6">
                <div class="row">
                    <img src="../images/profile.png" width="100%" class="col-sm-12 col-md-6">
                    <div class="col-sm-12 col-md-6 margin-top">
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
                </div>
            </div>
        </div>
    `;
}