export const request = (url, options) => {
    const response = await fetch(url, options);
    let data = response.json();
    return response.ok ? data : Promise.reject(data);
}