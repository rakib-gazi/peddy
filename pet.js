let currentPetsForSort = [];
let allPets = [];
const getPetCategory = async() => {
    const res =  await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    const data = await res.json();
    showPetCategory(data.categories);
}
const getPetFrmCategory = async(petCategory) =>{
    const allPetsContainer =  document.getElementById('allPets');
    allPetsContainer.innerHTML = '';
    const res =  await fetch(`https://openapi.programming-hero.com/api/peddy/category/${petCategory}`);
    const data = await res.json();
    
    if (data.data?.length > 0) {
        ;
        currentPetsForSort = data.data;
        showAllPets(data.data);
    }
    else{
        showNoPetsAvailable(); 
    }
}
const activeBtn = (currentBtn) =>{
    const buttons = document.querySelectorAll('.active-btn');
    for(let btn of buttons){
        if( btn !==  currentBtn){
            btn.classList.remove('rounded-full', 'bg-btn-category');
            btn.classList.add('rounded-xl');
        }

    }
}
const loadingCategory = (petCategory, id) =>{
    
    const btnID =  document.getElementById(`category-${id}`);
    activeBtn(btnID);
    btnID.classList.remove('rounded-xl');
    btnID.classList.add('rounded-full', 'bg-btn-category');
    const allPetsContainer =  document.getElementById('allPets');

    allPetsContainer.innerHTML = `
        <div class="flex justify-center items-center ">
            <span class="loading loading-bars loading-lg"></span>
        </div>
    `
    setTimeout(() =>{
        getPetFrmCategory(petCategory);
    },2000);
}
const getAllPets = async() => {
    const res =  await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await res.json();
    allPets = data.pets;
    currentPetsForSort = [];
    showAllPets(data.pets);
}
const sortPetPrice  = () =>{
    if(currentPetsForSort.length > 0){
        const sortedPets = currentPetsForSort.sort((a, b) => (b.price || 0) - (a.price || 0));
        showAllPets(sortedPets);
    }
    else{
        const sortedAllPets = allPets.sort((a, b) => (b.price || 0) - (a.price || 0));
        showAllPets(sortedAllPets);
    }
    
}
const showPetModal = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`);
    const data = await res.json();
    showPetDetailsModal(data.petData);
}
const showPetDetailsModal = (modalData) =>{
    document.getElementById('customModal').showModal();
    const modalDetails =  document.getElementById('modalContainer');
    modalDetails.innerHTML = `
    <div class="p-6 border border-gray-400 shadow-lg rounded-3xl">
        <img src=${modalData.image} alt="" class="w-full rounded-2xl md:rounded-xl">
        <div class="flex flex-col gap-2 pt-4">
            <h2 class="text-gray-900 text-xl font-extrabold">${modalData.pet_name}</h2>
            <p class=" font-semibold text-gray-600 flex items-center gap-x-2">
                <img src="images/grid.png" alt="" class="size-5">
                Breed: ${modalData.breed}
            </p>
            <p class=" font-semibold text-gray-600 flex items-center gap-x-2">
                <img src="images/date.png" alt="" class="size-5">
                Birth: ${modalData.date_of_birth}
            </p>
            <p class=" font-semibold text-gray-600 flex items-center gap-x-2">
                <img src="images/gender.png" alt="" class="size-5">
                Gender: ${modalData.gender}
            </p>
            <p class=" font-semibold text-gray-600 flex items-center gap-x-2">
                <img src="images/dollar.png" alt="" class="size-7">
                Price : ${modalData.price} $
            </p>
        </div>
        <div class="py-6">
            <p class="class=" font-semibold text-gray-600" >${modalData.pet_details}</p>
        </div>
        <form method="dialog" class="flex justify-center items-center pt-4">
            <button class=" btn text-xl text-btn font-semibold px-6 py-2 rounded-xl shadow-md border border-gray-200">Close</button>
        </form>
    </div>
    `;

}
const showNoPetsAvailable = () => {
    const allPetsContainer =  document.getElementById('allPets');
    const petCard = document.createElement('div');
    petCard.classList = "bg-gray-100 shadow-lg rounded-3xl py-12 lg:py-24";
    petCard.innerHTML =`
        <div class="flex flex-col justify-center items-center gap-4 px-4">
            <img src="images/not found_processed.png" alt="">
            <h1 class="text-gray-900 text-2xl lg:text-3xl font-extrabold text-center">No Information Available</h1>
            <p class="text-gray-700 text-base lg:text-lg text-center w-full md:w-2/3">Currently, there is no information to display. Please check back later or explore other sections for updates and more details.</p>
        </div>
    `;
    allPetsContainer.appendChild(petCard);
}
const showAllPets = (allPets)  => {
    const allPetsContainer =  document.getElementById('allPets');
    allPetsContainer.innerHTML = '';
    const parentPetCard = document.createElement('div');
    parentPetCard.classList = "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6";
    allPets.forEach((pet) => {
        const petCard = document.createElement('div');
        petCard.classList = "p-6 border border-gray-400 shadow-lg rounded-3xl";
        petCard.innerHTML =`
            <img src=${pet.image} alt="" class="w-full rounded-2xl md:rounded-xl">
            <div class="flex flex-col gap-2 pt-4">
                <h2 class="text-gray-900 text-xl font-extrabold">${pet.pet_name}</h2>
                <p class=" font-semibold text-gray-600 flex items-center gap-x-2">
                    <img src="images/grid.png" alt="" class="size-5">
                    Breed: ${pet.breed?.length >  0 ? pet.breed : 'Not Available'}
                </p>
                <p class=" font-semibold text-gray-600 flex items-center gap-x-2">
                    <img src="images/date.png" alt="" class="size-5">
                    Birth: ${pet.date_of_birth?.length >   0 ? pet.date_of_birth : 'Not Available'}
                </p>
                <p class=" font-semibold text-gray-600 flex items-center gap-x-2">
                    <img src="images/gender.png" alt="" class="size-5">
                    Gender: ${pet.gender?.length >   0 ? pet.gender : 'Not Available'}
                </p>
                <p class=" font-semibold text-gray-600 flex items-center gap-x-2">
                    <img src="images/dollar.png" alt="" class="size-7">
                    Price : ${pet.price == null ? 'Not Available' : pet.price+' $'} 
                </p>
            </div>
            <div class="flex justify-between items-center pt-4">
                <button onclick="showImage('${pet.image}')" class=" text-btn font-semibold px-6 lg:px-4 2xl:px-6 py-2 rounded-xl shadow-md border border-gray-200 hover:bg-btn hover:text-white">
                    <img src="images/like.png" alt="" class="size-6 md:size-7">
                </button>
                <button id="adoptBtn-${pet.petId}" onclick="adoptModal(${pet.petId})" class="text-base md:text-lg text-btn font-semibold px-6 lg:px-3 2xl:px-6 py-2 rounded-xl shadow-md border border-gray-200 hover:bg-btn hover:text-white">Adopt</button>
                <button onclick="showPetModal(${pet.petId})" class="text-base md:text-lg text-btn font-semibold px-6 lg:px-3 2xl:px-6 py-2 rounded-xl shadow-md border border-gray-200 hover:bg-btn hover:text-white">Details</button>
            </div>
                
        `
        parentPetCard.appendChild(petCard);
    })
    allPetsContainer.appendChild(parentPetCard); 
}
const showPetCategory = (petCategory)  => {
    const petCategoryContainer =  document.getElementById('categoryContainer');
    petCategory.forEach((petCategory) => {
        const categoryCard = document.createElement('button');
        categoryCard.id = `category-${petCategory.id}`;
        categoryCard.classList = "flex justify-center items-center gap-x-2 lg:gap-x-4 text-base lg:text-xl xl:text-2xl text-gray-800 border border-gray-800 hover:border-btn font-extrabold px-3 md:px-4 xl:px-6 2xl:px-12 py-3 xl:py-4 2xl:py-6 rounded-xl active-btn";
        categoryCard.onclick  = () => loadingCategory(petCategory.category, petCategory.id);
        categoryCard.innerHTML =`
                <img src=${petCategory.category_icon} alt="" class=" h-12 lg:h-16">
                ${petCategory.category}
        `;
        petCategoryContainer.appendChild(categoryCard);
    })
}
const showImage = (image) =>{
    const imageContainer =  document.getElementById('showImage');
    const img = document.createElement('img');
    img.src = image;
    img.classList = 'w-full h-36 object-cover rounded-xl';
    imageContainer.append(img);
}
const adoptModal= (id) =>{
    const  modal = document.getElementById('customModal');
    modal.showModal();
    const  modalContainer = document.getElementById('modalContainer');
    modalContainer.innerHTML = `
    <div class="p-6 shadow-lg rounded-3xl">
        <div class="flex flex-col justify-center items-center gap-3 py-8">
            <img src="images/handshake.gif" alt="" class="h-16 w-16">
            <h2 class="text-gray-900 text-5xl font-extrabold">Congrates</h2>
            <p id="countDown" class="text-gray-900 text-5xl font-extrabold pt-4">3</p>
        </div>
    </div>
    `;
    
    const countdown = document.getElementById('countDown').innerText;
    let countdownNumber = parseInt(countdown);
    const countdownInterval = setInterval(() => {
        countdownNumber--;
        document.getElementById('countDown').innerText = countdownNumber;
        if (countdownNumber === 0) {
            clearInterval(countdownInterval);
            const adoptedBtn = document.getElementById(`adoptBtn-${id}`);
            adoptedBtn.innerText = '';
            adoptedBtn.innerText = 'Adopted';
            adoptedBtn.disabled = true; 
            adoptedBtn.classList.remove('hover:bg-btn', 'hover:text-white','text-btn', 'px-6', 'lg:px-3', '2xl:px-6');
            adoptedBtn.classList.add('bg-gray-400','text-white', 'px-4', 'lg:px-2', '2xl:px-4');
            modal.close();
        }
    }, 1000);
    
}
document.getElementById('sortPrice').addEventListener('click', () => {
    sortPetPrice();
});
getPetCategory();
getAllPets();
const navbar = document.getElementById('header');
window.addEventListener('scroll', function() {
    if (window.scrollY >= 80) {
        navbar.classList.add('sticky', 'top-0', 'z-50','bg-gray-100');
    } else {
        navbar.classList.remove('sticky', 'top-0', 'z-50','bg-gray-100');
    }
});