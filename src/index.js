// When the page loads, fire a function called displayRamens() that requests the data from the server to get all the ramen objects.
document.addEventListener("DOMContentLoaded", function () {
  fetch('http://localhost:3000/ramens')
    .then(r => r.json())
    .then(data => {
      addSubmitListener();
      deleteRamen();
      data.forEach((ramen) => {
        displayRamens(ramen);
      })
      })
    })


// Display the image for each of the ramen using an img tag inside the #ramen - menu div.
const displayRamens = (ramen) => {
  const  menu = document.querySelector("#ramen-menu")
  const img = document.createElement('img')
  img.src = ramen.image
  img.addEventListener('click', () => {
    handleClick(ramen)
  })
  menu.append(img)
        }

    
// Click on an image from the #ramen-menu to see all the info about that ramen displayed inside the #ramen - detail div
function handleClick (ramen) {
  const rating = document.querySelector("#rating-display")
  rating.innerHTML = ramen.rating;

  const comment = document.querySelector("#comment-display")
  comment.innerHTML = ramen.comment;

  const detail = document.querySelector("#ramen-detail")
  detail.innerHTML = ""

  const image = document.createElement('img')
  const name = document.createElement('h2')
  const restaurant = document.createElement('h3')
  image.src = ramen.image
  name.textContent = ramen.name
  restaurant.textContent = ramen.restaurant
  image.className = "detail-image"
  name.className = "name"
  restaurant.className = "restaurant"

  detail.append(image, name, restaurant)
}



// Attach a submit even listener to the new- ramen form using a function called addSubmitListener.
// After the submission, create a new ramen and add it to the#ramen - menu div.The new ramen does not need to persist; in other words, if you refresh the page.
//it's okay that the new ramen is no longer on the page.


function addSubmitListener() {
  const form = document.querySelector("#new-ramen")
  form.addEventListener('submit', (e) => {
    
    e.preventDefault();

  
    
    fetch('http://localhost:3000/ramens', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        
      name: document.querySelector('#new-name').value,
      restaurant: document.querySelector('#new-restaurant').value,
      image: document.querySelector('#new-image').value,
      rating: document.querySelector('#new-rating').value,
      comment: document.querySelector('#new-comment').value
        
      })
    })
      .then((r) => {
        if (r.ok) {
          console.log("WE GOOD")
        }
        else 
          console.log("SADDD")
        
      }
        
    ) 
      return r.json()
      .then((formData) => {
        console.log(formData)
        return(formData)
     
    })
	})
}


function deleteRamen(RamenID) {
  const deleteButton = document.createElement('button')
  deleteButton.style.padding = "0.5rem"
  deleteButton.style.width = "100%"
  deleteButton.textContent = "Delete"
  const form = document.querySelector("#new-ramen")
  form.append(deleteButton)

  deleteButton.addEventListener('click', (e) => {
    fetch(`http://localhost:3000/ramens/${RamenID}`), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: null
      }
    }
  )
  
} 

const main = () => {
  // Invoke displayRamens here
  displayRamens();
  // Invoke addSubmitListener here
  addSubmitListener();
}



// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
