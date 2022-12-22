export default class PictureApiServise {
  constructor() {
    this.valueIn='';
    this.page = 1;
  }

  fetchPicture() {
    const url = "https://pixabay.com/api";
    const KEY_PIX = "32192746-459981941dda650b5aa171a9f";

    fetch(
      `${url}/?key=${KEY_PIX}&q=${this.valueIn}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
    ).then((response) => response.json())
    .then(data => {
         this.incrementPage();  
    });
    
  }

  resetPage(){
     this.page = 1;
  }
  incrementPage(){
    this.page += 1;
  }

  get quary(){
return this.valueIn;
  }

  set quary(newQuary){
     this.valueIn = newQuary;
  }
}