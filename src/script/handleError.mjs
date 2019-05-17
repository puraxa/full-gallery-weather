export const handleError = (err) => {
    document.getElementById('error').innerText = err.message;
}