import axios from 'axios';
import '../assets/scss/base.scss';

const countries = () => {
  axios
    .get('https://restcountries.eu/rest/v2/all')
    .then((res) => {

      for (let i in res.data) {
        
        document.getElementById('main-section').insertAdjacentHTML(
          'beforeend',
          `<div id="card" class="Allcard">
            <img id="flag" src=${res.data[i].flag}>
            <h3 class="country-name">${res.data[i].name}</h3>
            <p><span>Pooulation:</span> ${res.data[i].population}</p>
            <p><span>Region:</span> <span class="region">${res.data[i].region}</span></p>
            <p><span>Capital:</span> ${res.data[i].capital}</p>
            <p>Calling Code: +<span>${res.data[i].callingCodes[0]}</span></p>
            </div>
            `
        );
      }
    })
    .catch((err) => console.log(err));
};
countries();

// search option
const inputVal = document.getElementById('search');
document.getElementById('search').addEventListener('keyup', (e) => {
  const countryName = document.getElementsByClassName('country-name');
  Array.from(countryName).forEach((book) => {
    if (inputVal.value) {
      let textValue = book.innerHTML || book.textContent;
      if (textValue.toLowerCase().indexOf(inputVal.value.toLowerCase()) > -1) {
        book.parentElement.style.display = '';
      } else {
        book.parentElement.style.display = 'none';
      }
    } else if (!inputVal.value) {
      location.reload();
    }
  });
});

//filter methord
const selectVal = document.getElementById('filter');
document.getElementById('filter').addEventListener('change', () => {
  const regionName = document.getElementsByClassName('region');
  Array.from(regionName).forEach((book) => {
    if (selectVal.value) {
      let textValue = book.innerHTML || book.textContent;
      if (textValue.toLowerCase().indexOf(selectVal.value.toLowerCase()) > -1) {
        book.parentElement.parentElement.style.display = '';
      } else {
        book.parentElement.parentElement.style.display = 'none';
      }
    }
  });
});

//second section
setTimeout(()=>{
  const singleCard = document.querySelectorAll('div #card')
    for (let i = 0 ; i < singleCard.length; i++) {
      singleCard[i].addEventListener('click', function(e){
        document.getElementById('section-1').style.display='none'
       const name = e.target.parentElement.children[1].innerHTML
       const cc = e.target.parentElement.children[5].children[0].textContent
   
    
       axios
       .get(`https://restcountries.eu/rest/v2/callingcode/${cc}`)
       .then((res) => {
      
           document.getElementById('second-section').insertAdjacentHTML(
             'beforeend',
             `<div class="singlepage">
             
             <div>
               <img src=${res.data[0].flag}>
               
               </div>
               <div class="content">
               
               <div>
               <h3>${res.data[0].name}</h3>
               </div>
               
               <div class="divide">
               
               <div>
               <p><span>Native Name:</span> ${res.data[0].nativeName}</p>
               <p><span>Population:</span> ${res.data[0].population}</p>
               <p><span>Region:</span> <span >${res.data[0].region}</span></p>
               <p><span>Sub Region:</span> <span >${res.data[0].subregion}</span></p>
               <p><span>Capital:</span> ${res.data[0].capital}</p>
               </div>
               
               <div>
               <p><span>Top Level Domain</span> <span >${res.data[0].topLevelDomain[0]}</span></p>
               <p><span>currencies: </span> ${res.data[0].currencies[0].name}</p>
               <p><span>Languages:</span> ${res.data[0].languages[0].name}</p>
               </div>
               </div>
               </div>
               </div>
               `
           );
       })
       .catch((err) => console.log(err));
      })
    }
}, 1000)
