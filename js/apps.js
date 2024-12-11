const loadAI = async (showAll) => {
  const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
  const data = await res.json();
  const dataDetails = data.data.tools;
  showAllCopilot(dataDetails, showAll);
};

const showAllCopilot = (dataDetails, showAll) => {
  const showAllContainer = document.getElementById("show-all-container");
  if (dataDetails.length > 6 && !showAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  if (!showAll) {
    dataDetails = dataDetails.slice(0, 6);
  } else {
    dataDetails = dataDetails.slice(6, 12);
  }

  const cardContainer = document.getElementById("card-container");
  dataDetails.forEach((data) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList = `card bg-base-100 shadow-xl`;
    cardDiv.innerHTML = `
    <figure>
        <img
            src="${data.image}"
            alt="Shoes" />
        </figure>
    <div class="card-body">
        <h2 class="card-title">Features</h2>
        <ul class="list-decimal list-inside">
        <li>${data.features[0]}</li>
        <li>${data.features[1]}</li>
        <li>${data.features[2]}</li>
        </ul>

        <hr class="my-4">

        <p class="font-bold">${data.name}</p>
        <div class="mt-3 flex items-center gap-2">
       <img class="w-10" src="./assets/calendar.png" alt="">
        <span>${data.published_in}</span>  
        <img onclick="showDetails('${data.id}')" class="w-10 cursor-pointer flex justify-end ms-auto" src="./assets/right-arrow.png" alt="" style="filter: invert(17%) sepia(83%) saturate(747%) hue-rotate(346deg) brightness(96%) contrast(92%)">
            
        </div>
    </div>
        `;
    cardContainer.appendChild(cardDiv);
  });
  toggleLoadingSpinner(false);
};

const showDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/ai/tool/${id}`
  );
  const data = await res.json();
  const showByOne = data.data;
  showSingleDetails(showByOne);
};

const showSingleDetails = (card) => {
  console.log(card);

  const showPopup = document.getElementById("show-details-popup");

  showPopup.innerHTML = `
        <div class="flex-1 border border-red-500 rounded-lg bg-red-300 p-5 bg-opacity-5">
            <p class="font-bold">${card.description}</p>
            <div class="mt-4 grid grid-cols-2 gap-3">
            
            <div class="flex flex-col font-bold text-green-500">
            <p>${card.pricing[0]?.price}</p>
            <p>${card.pricing[0]?.plan}</p>
            <span>
            </div>

            <div class="flex flex-col font-bold text-orange-500">
            <p>${card.pricing[1]?.price}</p>
            <p>${card.pricing[1]?.plan}</p>
            <span>
            </div>

            <div class="flex flex-col font-bold text-red-500">
            <p>${card.pricing[2]?.price}</p>
            <p>${card.pricing[2]?.plan}</p>
            <span>
            </div>
          
            </div>

            <div class="grid grid-cols-2 gap-6 mt-3">
                <div class="flex-col">
                <h3 class="font-bold text-xl">Features</h3>
                    <li>${card.features[1].feature_name}</li>
                    <li>${card.features[2].feature_name}</li>
                    <li>${card.features[3].feature_name}</li>
                </div>
                <div>
                <h3 class="font-bold text-xl">Integration</h3>
                    <li>${card?.integrations[0]}</li>
                    <li>${card?.integrations[1]}</li>
                    <li>${card?.integrations[2]}</li>
                    <li>${card?.integrations[3]}</li>
                  
                </div>
            </div>


        </div>

        <div class="flex-1">
         <img src="${
           card.image_link[0] || card.image_link[1] || card.image_link[2]
         }" class="h-1/2 w-full" alt="Not Found">
            <div class="flex flex-col text-center mt-3 gap-3">
         <h3 class="font-bold">Hi, how are you doing today?</h3>
         <p class="font-semibold text-gray-700">I'm doing well, thank you for asking. How can <br> I assist you today?</p>
        </div>
        </div>
    `;
  my_modal_5.showModal();
};

const toggleLoadingSpinner = (isLoading) => {
  const spinLoader = document.getElementById("spinnerControl");
  if (isLoading) {
    spinLoader.classList.remove("hidden");
  } else {
    spinLoader.classList.add("hidden");
  }
};
toggleLoadingSpinner(true);

loadAI();

const handleShowAll = () => {
  loadAI(true);
};
