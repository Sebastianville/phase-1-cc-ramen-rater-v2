let url = 'http://localhost:3000'


const displayRamens = (ramen) => {
  console.log(ramen)
  //Obtain the element that we need (div)
let ramenMenuDivTag = document.getElementById("ramen-menu")
//create the elements that we need (img,)
let imgRam= document.createElement("img")
imgRam.src = ramen.image

ramenMenuDivTag.append(imgRam)

imgRam.addEventListener("click", (e) => handleClick(ramen))
}


function fetchFood() {
  fetch(`${url}/ramens`)
    .then ((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw "ALARM ALARM ALARM!";
      };
    })
    .then ((data) =>{
      displayRamens(data[1]);

      data.forEach((curRamen)=>{displayRamens(curRamen)})
      
    }) 
};

fetchFood();


const handleClick = (ramen) => {
   //obtain the Id and Classes we need(img, H2, H3)
   let imageClass = document.getElementsByClassName("detail-image")[0];
   let restaurantNameH2 = document.getElementsByClassName("name")[0];
   let ramenNameH3 = document.getElementsByClassName("restaurant")[0];

   imageClass.src = ramen.image;
   restaurantNameH2.textContent= ramen.restaurant;
   ramenNameH3.textContent = ramen.name;

   let spanRatingDisplay = document.getElementById('rating-display');
   let pCommentDisplay = document.getElementById('comment-display');

   spanRatingDisplay.textContent = ramen.rating;
    pCommentDisplay.textContent = ramen.comment; 
};
const newForm = document.getElementById("new-ramen")

const addSubmitListener = () => {
  newForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newRamens = {
      image: e.target.image.value,
      restaurant: e.target.restaurant.value,
      name: e.target.name.value,
      rating: e.target.rating.value,
      comment: e.target.elements['new-comment'].value
    };

    displayRamens(newRamens);
    e.target.reset();
  })
};
// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};

const main = () => {
  displayRamens()
  addSubmitListener();
};
main()