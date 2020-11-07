// HEADERS
// Accept-Version: v1
// Authorization: Client-ID YOUR_ACCESS_KEY

import mockData from './data';

const apiUrl = 'https://broad-brainy-jade.glitch.me/getphotos';

const imageContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');

interface Photo {
  [key: string]: any;
  links: {
    html: string;
  };
  urls: {
    regular: string;
  };
  alt_description: string;
}

let photos: Photo[] = [];

function setAttributes(
  element: HTMLElement,
  attributes: { [key: string]: string },
) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos() {
  photos.forEach((photo) => {
    const item = document.createElement('a');
    setAttributes(item, { href: photo.links.html, target: '_blank' });

    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    item.appendChild(img);
    imageContainer?.appendChild(item);

    // TODO: loader?.setAttribute('hidden','true');
  });
}

async function getPhotos(): Promise<void> {
  loader?.setAttribute('hidden', 'true');
  try {
    const response = await fetch(apiUrl);
    photos = await response.json();
  } catch (error) {
    photos = mockData;
    console.error(error);
  }
  console.log(photos);
  displayPhotos();
}

getPhotos();

export {};
