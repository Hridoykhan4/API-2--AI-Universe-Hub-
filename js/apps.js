const loadAI = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
  const data = await res.json();
  const dataDetails = data.data.tools;
  showAllCopilot(dataDetails);
};

const showAllCopilot = (dataDetails) => {

    console.log(dataDetails.length)

    dataDetails = dataDetails.slice(0,6)
  const cardContainer = document.getElementById("card-container");
  dataDetails.forEach((data) => {
    console.log(data)
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
        <img class="w-10 flex justify-end ms-auto" src="./assets/right-arrow.png" alt="" style="filter: invert(17%) sepia(83%) saturate(747%) hue-rotate(346deg) brightness(96%) contrast(92%)">
            
        </div>
    </div>
        `;
        cardContainer.appendChild(cardDiv)
  });
};

loadAI();
