//selectors
const getCard = document.querySelector("#card")
const getDropdown = document.querySelector("#table")
//adding event listener
EventListener()

function EventListener(){
getCard.addEventListener("click", newCard)
getDropdown.addEventListener("click", removeCart)
document.addEventListener("DOMContentLoaded", getFromStorage)

}
function newCard(e){
    // console.log(e)
    e.preventDefault()
    if(e.target.classList.contains('add-to-cart')){
        console.log(e.target.parentElement.parentElement)
        const car = e.target.parentElement.parentElement
           
        getDetails(car)
    }
}
//getting details of car

function getDetails(car){
 const carInfo = {
     Image: car.querySelector("img").src,
     Title: car.querySelector("h5").textContent,
     Price: car.querySelector("p").textContent,
     carId: car.querySelector('a').getAttribute('data-id')
 }
//  console.log("ob",carInfo)
 addInfoToCart(carInfo)
}

//adding info to cart


function addInfoToCart(carInfo){
    
    const th = document.createElement("tr")
    th.innerHTML = `
    <tr>
    <td> 
    <img src = "${carInfo.Image}" style="width: 50px">
    </td>
    <td>
    ${carInfo.Title}
    </td>
    <td>
    ${carInfo.Price}
    </td>
    <td>
    <a href = "#" class= "remove" data-id="${carInfo.carId}">X
    </td>
    </tr> 
    `
    
    getDropdown.appendChild(th)
    // const removeBtn = document.createElement("a");
    // removeBtn.classList = "remove-tweet";
    // removeBtn.textContent = "X"
    // th.appendChild(removeBtn)
  
    saveIntoLocalStorage(carInfo)
}

// save into local storage

function saveIntoLocalStorage(carInfo){
  console.log("*", carInfo)
  let cars = getCarsFromStorage()
  console.log("***", cars)
  cars.push(carInfo)
  localStorage.setItem("cars", JSON.stringify(cars))
  
}

// get content from local storage

function getCarsFromStorage(){
  let cars;
  if(localStorage.getItem("cars") === null){
         cars = [];
  }else{
       cars = JSON.parse(localStorage.getItem("cars"))
  }
  return cars

}


//creating delete button

  function removeCart(event){
    // console.log(event.target.parentElement)
   
    if(event.target.classList.contains("remove")){
    event.target.parentElement.parentElement.remove()
    let car = event.target.parentElement.parentElement
    // console.log('car', car)
    let carId = car.querySelector('a').getAttribute('data-id')
    // console.log("rmo0 " , carId)
    removeCarsFromStorage(carId)

    }

  }

  function removeCarsFromStorage(carId){
   let carsLs = getCarsFromStorage()
    carsLs.forEach((shivam,index) =>{
      if(shivam.carId == carId){
        carsLs.splice(index,1)
      }
     
    })
    localStorage.setItem('cars', JSON.stringify(carsLs))

  }


//get from storage

function getFromStorage(){
  let carsLs =getCarsFromStorage()
  // console.log (carsLs)
  
  
  carsLs.map((cars)=>{
    const row = document.createElement('tr')
    row.innerHTML = `
    <tr>
    <td> 
    <img src = "${cars.Image}" style="width: 50px">
    </td>
    <td>
    ${cars.Title}
    </td>
    <td>
    ${cars.Price}
    </td>
    <td>
    <a href = "#" class= "remove" data-id="${cars.carId}">X
    </td>
    </tr> 
    `
    getDropdown.appendChild(row)
  })
  
}

