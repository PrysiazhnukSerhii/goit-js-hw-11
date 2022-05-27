import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector(".gallery");
let gallerySimpleLightbox = null;

export function createGallery (arey){
     
    arey.map(e=> gallery.insertAdjacentHTML("beforeend",templateGallery (e)));
    
    gallerySimpleLightbox = new SimpleLightbox('.gallery__link', { captionDelay: 250});
  
  };
  

  function templateGallery (e) {
      return `<div class="photo-card">
  
      <a class="gallery__link" href="${e.largeImageURL}"  onclick="return false">
      <img class="gallery__image"  src="${e.webformatURL}" alt="${e.tags}" loading="lazy" /> </a>
      <div class="info">
        <p class="info-item">
          <b>Likes</b> ${e.likes}
        </p>
        <p class="info-item">
          <b>Views</b> ${e.views}
        </p>
        <p class="info-item">
          <b>Comments</b> ${e.comments}
        </p>
        <p class="info-item">
          <b>Downloads</b> ${e.downloads}
        </p>
      </div>
    </div>`
    };
  