import './sass/main.scss';
import InfiniteScroll from "infinite-scroll";

import { Notify } from 'notiflix/build/notiflix-notify-aio';


import { createGallery } from './js/createGallery';


const searchForm = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery")
const buttonLernMore = document.querySelector(".load-more")

const BASE_URS = "https://pixabay.com/api";
const CLOUDY_KEY = "27562603-8a4226043483e253e97fc4251";

let inputText =  null;
let pageNumber = null;
let numbersItemDownload = 40;






searchForm.addEventListener("input",(e)=> inputText= e.target.value.trim());
searchForm.addEventListener("submit", onFormSubmit);


let infScroll = createInfScroll () ;


function onFormSubmit(e) {
    e.preventDefault();
    gallery.innerHTML = "";

    if(infScroll){
        infScroll.destroy();
    }

    
    infScroll = createInfScroll ();

    scrollOn ()

  
   infScroll.loadNextPage();
    
   
};

function createInfScroll (){
  return  new InfiniteScroll( gallery, {

        path:  function(u) {   
    
            let  url =  `${BASE_URS}?key=${CLOUDY_KEY}&q=${inputText}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${numbersItemDownload}&page=${this.pageIndex}`; 
    
            pageNumber=this.loadCount
            

            console.log(this.pageIndex);
            console.log(this.loadCount);
            

            
                return url;

            
            

            
           
        },
        append: false,
        history: false,
        responseBody: 'json',
        status: '.scroll-status',
        checkLastPage: '.pagination__next',
      });
}


function scrollOn (){
  return  infScroll.on( 'load', function (ul){

    
        if(ul.totalHits>0 && this.pageIndex===2 ){
            Notify.info(`Hooray! We found ${ul.totalHits} images.`);
        }
    
        let totalPage =Math.ceil(ul.totalHits/numbersItemDownload) ;
    
       if(totalPage===0){
           Notify.failure('Sorry, there are no images matching your search query. Please try again.'); 
       }
        
        if (pageNumber===totalPage && totalPage>1 ){
        
        infScroll.destroy();

        infScroll = null

        Notify.info("We're sorry, but you've reached the end of search results.",{position : "right-bottom",width:"350px",fontSize:"20px"});
        return;}
        
        createGallery (ul.hits);
        
        
    });

    
}





























