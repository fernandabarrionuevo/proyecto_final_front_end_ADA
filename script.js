let $div = document.getElementById('characters__container');
let $p = document.getElementById('totalCharacters');
let $btnStart = document.getElementById('btnStart');
let $btnPrev = document.getElementById('btnPrev');
let $btnNext = document.getElementById('btnNext');
let $btnLast = document.getElementById('btnLast');
let $actualPage = document.getElementById('actualPage');
let $lastPage = document.getElementById('lastPage');
let $specificPage = document.getElementById('specificPage');
let $goToPage = document.getElementById('goToPage');
let $btnExpand = document.getElementById('btnExpand')

let characters = [];
let page = 1;
let lastPage = 42;
let specificPageNumber = '';
 
// Cantidad de personajes
function charactersLength(array){
    $p.innerHTML = `Total de personajes: ${array.length}</p>`
}

function altualPageNumber (page){
    $actualPage.innerHTML = `Página N° ${page}`
}

// Mostrar todos los personajes
function show (array){
    for (let i = 0; i < array.length; i++) {
        $div.innerHTML += `<div class="character">
                    <div class="character__img__container">
                        <img class="character__img" src="${array[i].image}" alt="">
                    </div>
                    <div class="character__info">
                    <p>Nombre: ${array[i].name}</p>
                    <p>Genero: ${array[i].gender}</p>
                    <p>Especie: ${array[i].species}</p>
                    <p>Estado: ${array[i].status}</p>
                    <p>Origen: ${array[i].origin.name}</p>
                    <p>Locación: ${array[i].location.name}</p>
                    </div>
                    <button id="btnExpand">Ver más</button>
                  </div>`
    }
return charactersLength(array)
}

altualPageNumber(page)
$lastPage.innerHTML = `Total de páginas: ${lastPage}`;

// Fetch
function makeFetch(pageNumber){
    fetch(`https://rickandmortyapi.com/api/character/?page=${pageNumber}`)
    .then((data) =>{
    return data.json()
    }).then((data) =>{
    characters = data.results;
    show(characters);
    if (pageNumber === 1) {
        $btnLast.disabled = false;
        $btnNext.disabled = false;
        $btnStart.disabled = true;
        $btnPrev.disabled = true;
        } else if (pageNumber === 42){
            $btnLast.disabled = true;
            $btnNext.disabled = true;
            $btnStart.disabled = false;
            $btnPrev.disabled = false;
            
        }else{
            $btnLast.disabled = false;
            $btnNext.disabled = false;
            $btnStart.disabled = false;
            $btnPrev.disabled = false;
            
        }
    })
}

makeFetch(page);

// Filtrar mujeres
let $btnFilterFemale = document.getElementById('btnFilterFemale');

function filterFemale(){
    let filterResult = characters.filter((character) =>{
        return character.gender === 'Female';
    })
    $div.innerHTML = '';
    show(filterResult);
}

$btnFilterFemale.addEventListener('click', filterFemale)

// Filtrar hombres
let $btnFilterMale = document.getElementById('btnFilterMale');

function filterMale(){
    let filterResult = characters.filter((character) =>{
        return character.gender === 'Male';
    })
    $div.innerHTML = '';
    show(filterResult);
}

$btnFilterMale.addEventListener('click', filterMale)

// Mostrar todos
let $btnFilterAll = document.getElementById('btnFilterAll');

function filterAll(){
    let filterResult = characters
    $div.innerHTML = '';
    show(filterResult);
}

$btnFilterAll.addEventListener('click', filterAll)

// Filtrar genderless
let $btnFilterGenderLess = document.getElementById('btnFilterGenderLess');

function filterGenderLess(){
    let filterResult = characters.filter((character) =>{
        return character.gender === 'unknown';
    })
    $div.innerHTML = '';
    show(filterResult);
}

$btnFilterGenderLess.addEventListener('click', filterGenderLess)

//Paginado

//Ir a la primer página
function firstPage(){
    page = 1;
    $div.innerHTML = '';
    makeFetch(page);
    altualPageNumber(page);
}

$btnStart.addEventListener('click', firstPage);

//Ir a la página anterior
function prevPage(){
    page--;
    $div.innerHTML = '';
    makeFetch(page);
    altualPageNumber(page)
}

$btnPrev.addEventListener('click', prevPage);

//Ir a la siguiente página
function nextPage(){
    page++
    $div.innerHTML = '';
    makeFetch(page);
    altualPageNumber(page)
}

$btnNext.addEventListener('click', nextPage);

//Ir a la última página
function goToLastPage(){
    page = 42;
    $div.innerHTML = '';
    makeFetch(page);
    altualPageNumber(page)
}    

$btnLast.addEventListener('click', goToLastPage);

//Ir a una página específica
function goToSpecificPage() {
    specificPageNumber = $specificPage.value
    if(specificPageNumber>=1 && specificPageNumber<=42 && specificPageNumber != page){
        $div.innerHTML = '';
        makeFetch(specificPageNumber);
        altualPageNumber(specificPageNumber);
        console.log(specificPageNumber)
        $specificPage.value = '';
    }
    
}

$goToPage.addEventListener('click', goToSpecificPage)

// Mostrar un personaje en paticular

function showCharacter(){

}

function fetchCharacter (id){
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then((data) =>{
        return data.json()})
        .then((data) => {
            showCharacter();
        })
}

function expandCharacter() {
    
}

$btnExpand.addEventListener('click', expandCharacter)


