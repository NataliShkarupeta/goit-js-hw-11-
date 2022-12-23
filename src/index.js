import "./css/styles.css";
import axios from "axios";
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
const url = "https://pixabay.com/api";
const KEY_PIX = "32192746-459981941dda650b5aa171a9f";
const settings = {
image_type:'photo',
orientation:'horizontal',
safesearch:'true'
}



const form = document.querySelector("#search-form");
const divEl = document.querySelector(".gallery");
const butEl = document.querySelector(".load-more");

let valueIn="";
let page=1;
let gallary = "";

form.addEventListener("submit", takeValue);
butEl.addEventListener("click", takeNewPicture);


function addVisibleBut(){
 butEl.classList.add('invisible');
}

function removeVisibleBut(){
 butEl.classList.remove("invisible");
}


async function takeNewPicture(e) {
  page += 1;
  try {
    const  {hits}  = await fetchCPictures(valueIn);
    if (!hits.length) {
      showMesasege();
      return "";
    }
    createListPictures(hits);
     gallary.refresh();

  } catch (error) {
    console.log(error);
  }
   const { height: cardHeight } = document
     .querySelector(".gallery")
     .firstElementChild.getBoundingClientRect();

   window.scrollBy({
     top: cardHeight * 2,
     behavior: "smooth",
   });

   
}

 async function fetchCPictures(text) {
   const response = await axios.get(
     `${url}/?key=${KEY_PIX}&q=${text}&${settings}&per_page=40&page=${page}`
   );
   
 const  pictures = await response.data;
   if (pictures.hits.length === 0) {
    removeVisibleBut();
    Notiflix.Notify.info(
       "Sorry, there are no images matching your search query. Please try again."
     );
    // return;
   } 
;
   return pictures;
 }



async function takeValue(e) {
  e.preventDefault();

  divEl.innerHTML = "";
  if (butEl.classList.contains("invisible"))
    removeVisibleBut();
  
  valueIn = e.target.elements[0].value.trim();
  page = 1;
  if (valueIn && !"")
    try {
      const { hits } = await fetchCPictures(valueIn);
      if (hits.length === 0){
        removeVisibleBut();
      } else{
      createListPictures(hits);
      addVisibleBut();}
     } catch (error) {
      console.log(error);
    }
}

function createListPictures(obj) {

  const card = obj.map(
    ({
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
      webformatURL,
    }) => {
      return `<div class="WrapPhotoAndInfo">
      <a class="gallery__item" href="${largeImageURL}"onclick="return false;";>
      <img class="gallery__image" src="${webformatURL}" alt="${tags}" width="340" heigth="340"/>
      </a>
    <div class="info">
        <p class="info-item">
        <b>Likes: ${likes}</b>
        </p>
        <p class="info-item">
        <b>Views: ${views}</b>
        </p>
        <p class="info-item">
        <b>Comments: ${comments}</b>
        </p>
        <p class="info-item">
        <b>Downloads: ${downloads}</b>
        </p>
        </div>
       </div>`;
    });
rendorHtml(card.join(""));
gallary = new SimpleLightbox(".gallery a");
}

function rendorHtml(el) {
  divEl.insertAdjacentHTML("beforeend", el);

}

function showMesasege(){
 removeVisibleBut();
 return Notiflix.Notify.info(
    "We're sorry, but you've reached the end of search results."
  );
}

