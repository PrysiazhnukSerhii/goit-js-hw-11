import './sass/main.scss';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

// ---------------------------------------------------------------------Capa
import { createGallery } from './js/createGallery';


const searchForm = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery")
const buttonLernMore = document.querySelector(".load-more")

const BASE_URS = "https://pixabay.com/api";
const CLOUDY_KEY = "27562603-8a4226043483e253e97fc4251";

let inputText =  null;
let pageNumber = null;



searchForm.addEventListener("input",(e)=> inputText= e.target.value.trim());
searchForm.addEventListener("submit", onFormSubmit);



buttonLernMore.addEventListener("click",(e)=>{
    pageNumber +=1;

    objecktCardMake(makeLink ()).then(e=>createGallery (e));

    popUps ()

} )




function toggelButtonMore (value){
  buttonLernMore.classList.toggle('is-hidden',value)
}


async function onFormSubmit(e) {
    e.preventDefault();
    gallery.innerHTML = "";

    pageNumber=1;

    toggelButtonMore (true);

    let chekcRequestBackend = await objecktCardMake(makeLink ());

    popUps ();

     createGallery (chekcRequestBackend);

};




async function  popUps (){

    
   let checkUrl = await fetch(`${BASE_URS}?key=${CLOUDY_KEY}&q=${inputText}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`).then(respons=>respons.json());

   
   if(checkUrl.totalHits < 1) {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.'); 
    return;
   };
   

   if(pageNumber===1){
    Notify.info(`Hooray! We found ${checkUrl.totalHits} images.`);

   }

   if(pageNumber*40 >=checkUrl.totalHits && checkUrl.totalHits > 1 && pageNumber>1 ){

    
    Notify.info("We're sorry, but you've reached the end of search results.",{position : "right-bottom",width:"350px",fontSize:"20px"});
    return;
   }

   if(40%checkUrl.totalHits===40){
    toggelButtonMore (false);
   }

 
   
}





function makeLink (){
    
    return `${BASE_URS}?key=${CLOUDY_KEY}&q=${inputText}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${pageNumber}`;

};


async function objecktCardMake (e){
   const objecktCard= await fetch(e).then(respons=>respons.json());

   return objecktCard.hits
};







