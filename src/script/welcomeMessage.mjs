export const welcomeMessage = () => {
    document.getElementsByClassName('container')[0].innerHTML += `
        <div>Welcome ${localStorage.getItem('first_name')} ${localStorage.getItem('last_name')}</div>
    `;
}