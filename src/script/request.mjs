export const request = async (url, options) => {
    const response = await fetch(url, options);
    let data = await response.json();
    return response.ok ? data : Promise.reject(data);
}