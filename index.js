import mockData from "./data.js";
import {setAttributes} from "./utils.js";
const apiUrl = "https://broad-brainy-jade.glitch.me/getphotos";
const imageContainer = document.getElementById("img-container");
const loader = document.getElementById("loader");
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photos = [];
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader?.setAttribute("hidden", "true");
  }
}
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photos.length;
  photos.forEach((photo) => {
    const item = document.createElement("a");
    setAttributes(item, {href: photo.links.html, target: "_blank"});
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    });
    img.addEventListener("load", imageLoaded);
    item.appendChild(img);
    imageContainer?.appendChild(item);
  });
}
async function getPhotos() {
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
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1e3 && ready) {
    ready = false;
    getPhotos();
  }
});
getPhotos();
