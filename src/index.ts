// HEADERS
// Accept-Version: v1
// Authorization: Client-ID YOUR_ACCESS_KEY

const apiUrl = 'https://broad-brainy-jade.glitch.me/getphotos';

async function getPhotos(): Promise<void> {
    try {
        const response = await fetch(apiUrl);
        const data: JSON = await response.json();

        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

getPhotos();

export { };