
let sideMenuLeft = $('.sideMenuContent').outerWidth()
let list =  $('.sideMenuContent li')


$('#sideMenu').css({left:-sideMenuLeft})


function closeSidebar(){
    $('#sideMenu').animate({left:-sideMenuLeft},700)
    $('.fa-xmark').css({display:'none'})
    $('.fa-bars').css({display:'block'})
    for(i=0;i<5;i++){
        list.eq(i).animate({top:500},1000-(100*i))
      }

}

$('.fa-xmark').click(function(){
        $('#sideMenu').animate({left:-sideMenuLeft},500)
        $('.fa-xmark').css({display:'none'})
        $('.fa-bars').css({display:'block'})
        for(i=0;i<5;i++){
            list.eq(i).animate({top:500},1000-(100*i))
          }
})

$('.fa-bars').click(function(){
    $('#sideMenu').animate({left:0},1000)
    $('.fa-bars').css({display:'none'})
    $('.fa-xmark').css({display:'block'})
    
for(i=0;i<5;i++){
    let list =  $('.sideMenuContent li')
    list.eq(i).animate({top:0},1000+(100*i))
  }
  
  
})

function lowerList(){
    list.eq(i).animate({top:500},1000-(100*i))
}

$(document).ready(function(){
    $('.LoadingScreen').css({display:'none'})
    $('body').css({overflow:'auto'})
})


let searchMealByName = document.getElementById('searchMealByName')
let searchMealByLetter = document.getElementById('searchMealByLetter')
let mealslist = document.getElementById('mealslist')
let searchbox = document.getElementById('searchbox')


function viewSearchBox(){
    searchbox.innerHTML=`
    <div class="col-md-6">
    <input onkeyup="searchByName(this.value)" type="text" id="searchinput" placeholder="Search by Meal"
        class="form-control p-2  bg-transparent text-white">

</div>
<div class="col-md-6">
    <input onkeyup="searchByLetter(this.value)" maxlength="1" type="text" id="searchinput" placeholder="Search by First Letter"
        class="form-control p-2  bg-transparent text-white">

</div>
        
    
`
mealslist.innerHTML=''
lowerList()
}


async function searchByName(name) {
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    let response = await data.json()
    if(response.meals != null){
        displaydata(response.meals)
    }

}

async function searchByLetter(letter) {
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    let response = await data.json()
    if(response.meals != null){
        displaydata(response.meals)
    }

}

// display home page -------------------------

async function vieameals(meal){
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
    let response = await data.json()
    displaydata(response.meals)
}

vieameals('')


function displaydata(meals){
let cartona = ''
for(i=0;i<meals.length;i++){
cartona +=`  <div class="col-md-3 " id="mealCard">
<div class="mealContainer position-relative overflow-hidden rounded-2 cursor-pointer" onclick="viewMeal(${meals[i].idMeal})">
    <img class="w-100" src="${meals[i].strMealThumb}" alt="">
    <div class="mealLayer d-flex align-items-center">
    <h2>${meals[i].strMeal}</h2>
    </div>
</div>
 </div>
`
}
mealslist.innerHTML=cartona

}



async function viewMeal(id){
let data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
let response = await data.json()
displayMealById(response.meals)
searchbox.innerHTML=''
}

function displayMealById(meal){
let recipe =``
 for(i=1;i<10;i++){
    if(meal[0][`strIngredient${i}`]){
        recipe +=`
        <button class="btn disabled bg-info-subtle my-2 fake-btn text-black ">${meal[0][`strIngredient${i}`]} ${meal[0][`strMeasure${i}`]}</button>
        `
    }
    
 }

 var taglist=``

    if(meal[0].strTags!= null){
        let tags = meal[0].strTags.split(',')   // array
        console.log(tags)
        
        for(i=0;i<tags.length;i++){
     taglist += ` <button class="btn disabled bg-danger my-2 fake-btn text-white border-0  ">${tags[i]}</button>`
            console.log(taglist);
      }
    }

    mealslist.innerHTML=`
    <div class="col md 4">
        <img class="w-100 " src="${meal[0].strMealThumb}" alt="">
        <h3>${meal[0].strMeal}</h3>
     </div>
     <div class="col-md-8">
        <h3>Instructions</h3>
        <p>${meal[0].strInstructions}</p>
            <h3><span class="fw-bold ">Area: </span>${meal[0].strArea}</h3>
            <h3><span class="fw-bold ">Category: </span>${meal[0].strCategory} </h3>
            <h3 class="fw-bold ">Recipes:</h3>
            
               
            ${recipe}
                <h3 class="fw-bold ">Tags:</h3>
                ${taglist}
                <div class="buttons-box my-1 ">
                <a href="${meal[0].strYoutube}" target="_blank"><button class="btn btn-danger ">Youtube</button></a>
                <a href="${meal[0].strSource}"><button class="btn btn-success  ">Source</button></a>
                    
                
                </div>
     </div>
    `
}



// display catagorylist --------------------------------------------------------------

async function getCatagory(){
    let data = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    let response = await data.json()
    displayCatagories(response.categories)
    searchbox.innerHTML=''
    
}


function displayCatagories(categories){
    console.log(categories);
    let cartona = ''

    for(i=0;i<categories.length;i++){
        cartona += 
        `  <div class="col-md-3 cursor-pointer" id="mealCard" onclick="filterByCategory('${categories[i].strCategory}')">
<div class="mealContainer position-relative overflow-hidden rounded-2">
    <img class="w-100" src="${categories[i].strCategoryThumb}" alt="">
    <div class="mealLayer text-center ">
    <h2>${categories[i].strCategory}</h2>
    <p>${categories[i].strCategoryDescription.split(' ').slice(0,10).join(' ')}</p>
    </div>
</div>
 </div>
`
mealslist.innerHTML=cartona

    }
}

async function filterByCategory(category){
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    let response = await data.json()
    displaydata(response.meals)
}


// display Arealist --------------------------------------------------------------

async function getAreas(){
    let data = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    let response = await data.json()
    displayAreas(response.meals)
    searchbox.innerHTML=''
   

}

function displayAreas(areas){
    let cartona = ''

    for(i=0;i<areas.length;i++){
        cartona += `
        <div class="col-md-3 " id="mealCard">
        <div onclick="filterByArea('${areas[i].strArea}') " class="containerbox text-center cursor-pointer">
        <i class="fa-solid fa-house houseIcon "></i>
        <h4 class='my-2'>${areas[i].strArea}</h4>
    </div>

 </div>
        
        `
    }
    mealslist.innerHTML=cartona
   
}

async function filterByArea(area){
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    let response = await data.json()
    displaydata(response.meals)
}

// display IngredientsList --------------------------------------------------------------

async function getIngredients(){
    let data = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    let response = await data.json()
    displayIngredients(response.meals.slice(0,20))
    searchbox.innerHTML=''
}

function displayIngredients(Ingredients){
    let cartona = ''

    for(i=0;i<Ingredients.length;i++){
        cartona += `
        <div onclick="filterByIngredients('${Ingredients[i].strIngredient}') " class="col-md-3 cursor-pointer " id="mealCard">
        <div class="containerbox text-center ">
        <i class="fa-solid fa-drumstick-bite"></i>
        <h4 class='my-2'>${Ingredients[i].strIngredient}</h4>
        <p>${Ingredients[i].strDescription.split(' ').slice(0,10).join(' ')}</p>
    </div>

 </div>
        
        `
    }
    mealslist.innerHTML=cartona

}

async function filterByIngredients(Ingred){
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingred}`)
    let response = await data.json()
    displaydata(response.meals)

}


//         Contactu --------------------------------
let ContactContainer = document.getElementById('ContactContainer')
function Contactus(){
    searchbox.innerHTML=''
    mealslist.innerHTML=`
    
    <div id="ContactContainer" class="container vh-100 d-flex justify-content-center align-items-center w-75 " >
    <div class="row g-4 ">
    <div class="col-md-6"><input onkeyup="checkValidation();showNameError()" placeholder="user Name" class=" form-control p-2 " type="text" id="userName">  
    <button id="nameError" class="btn d-none bg-danger-subtle disabled text-danger border-0 mx-auto w-100 mt-1 p-3">Special characters and numbers not allowed</button>
</div>

<div class="col-md-6"> <input onkeyup="checkValidation();showEmailError()"  placeholder="user Email" class=" form-control p-2 " type="email" id="userEmail" >
    <button id="emailError" class="btn d-none  bg-danger-subtle disabled text-danger border-0 mx-auto w-100 mt-1 p-3">Email not valid *exemple@yyy.zzz</button>
 </div>
<div class="col-md-6"> <input onkeyup="checkValidation();showPhoneError()" placeholder="user Phone" class=" form-control p-2 " type="text" id="userPhone">
    <button id="phoneError" class="btn d-none  bg-danger-subtle disabled text-danger border-0 mx-auto w-100 mt-1 p-3">Enter valid Phone Number</button>
  </div>
<div class="col-md-6"><input onkeyup="checkValidation();showAgeError()" placeholder="user Age" class=" form-control p-2 " type="number" id="userAge"> 
    <button id="ageError" class="btn d-none  bg-danger-subtle disabled text-danger border-0 mx-auto w-100 mt-1 p-3">Enter valid age</button>
 </div>
<div class="col-md-6"><input onkeyup="checkValidation();showPassError()" placeholder="password" class=" form-control p-2 " type="password" id="password"> 
    <button id="passError" class="btn d-none  bg-danger-subtle disabled text-danger border-0 mx-auto w-100 mt-1 p-3">Enter valid password *Minimum eight characters, at least one letter and one number:*</button>
 </div>
<div class="col-md-6"><input onkeyup="checkValidation();showrePassError()" placeholder="rePassword" class=" form-control p-2 " type="password" id="rePassword"> 
    <button id="rePassError" class="btn d-none  bg-danger-subtle disabled text-danger border-0 mx-auto w-100 mt-1 p-3">Password don't match</button>
 </div>
        <button class="btn btn-outline-danger mx-auto w-auto disabled" id="submitBtn">Submit</button>
    
    </div>
 </div>
    `
    
    

   
}



// Validation ------------------------------------------------


var userNameValidate = /^[a-zA-Z]+$/ ;
var userEmailValidate = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
var passwordValidate = /^(?=.*\d)[A-Za-z\d]{8,15}$/;
var ageValidate = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|100)$/
let phoneValidate = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/


function checkValidation() {

if(
    nameValidation()&&emailValidation()&&phoneValidation()  &&ageValidation()
     &&passwordValidation() &&rePasswordValidation()){
        console.log("all correct");
        document.getElementById("submitBtn").classList.remove("disabled")
       
}else{
   
    console.log("not yet");
    document.getElementById("submitBtn").classList.add("disabled")
}
    
}


function showNameError(){
    let userName = document.getElementById("userName")
    if(userNameValidate.test(userName.value)){
       
        document.getElementById("nameError").classList.add("d-none")
    }else{
        document.getElementById("nameError").classList.remove("d-none")
    }
}
function showEmailError(){
    let userEmail = document.getElementById('userEmail')
    if(userEmailValidate.test(userEmail.value)){
        document.getElementById("emailError").classList.add("d-none")
    }else{
        document.getElementById("emailError").classList.remove("d-none")
    }
}
function showAgeError(){
    let userAge = document.getElementById('userAge')
    if(ageValidate.test(userAge.value)){
        document.getElementById("ageError").classList.add("d-none")
    }else{
        document.getElementById("ageError").classList.remove("d-none")
    }
}
function showPhoneError(){
    let userPhone = document.getElementById('userPhone')
    if(phoneValidate.test(userPhone.value)){
        document.getElementById("phoneError").classList.add("d-none")
    }else{
        document.getElementById("phoneError").classList.remove("d-none")
    }
}
function showPassError(){
    let password = document.getElementById('password')
    if(passwordValidate.test(password.value)){
        document.getElementById("passError").classList.add("d-none")
    }else{
        document.getElementById("passError").classList.remove("d-none")
    }
}
function showrePassError(){
    let rePassword = document.getElementById('rePassword').value
    let password = document.getElementById('password').value
    if(password == rePassword){
        document.getElementById("rePassError").classList.add("d-none")
       
    }else{
        document.getElementById("rePassError").classList.remove("d-none")
       
    }
}



function nameValidation() {
    let userName = document.getElementById("userName")
   return userNameValidate.test(userName.value)
    
}



function emailValidation() {
    let userEmail = document.getElementById('userEmail')
   return userEmailValidate.test(userEmail.value)

}


function phoneValidation() {
    let userPhone = document.getElementById('userPhone')
   return phoneValidate.test(userPhone.value)
    
}

function ageValidation() {
    let userAge = document.getElementById('userAge')
   return ageValidate.test(userAge.value)
    
}



function passwordValidation() {
    let password = document.getElementById('password')
   return passwordValidate.test(password.value)
    
}

function rePasswordValidation() {
    let rePassword = document.getElementById('rePassword')
   return password.value == rePassword.value
    
}
