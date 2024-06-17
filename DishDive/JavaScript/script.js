require('dotenv').config()

const apiKey = process.env['API_KEY']
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('resultsContainer');
const searchForm = document.getElementById('searchForm');


searchForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const query = searchInput.value.trim();

    if(query !== ''){
        fetchRecipies(query);
    }
});

// function fetchRecipies(query){
//     const url = `https://api.spoonacular.com/recipies/complexSearch?apiKey=${apiKey}&query=${query}&number=10`

//     fetch(url)
//         .then((respone)=>response.json())
//         .then((data)=>{
//             displayRecipies(data.results);
//         })
//         .catch((error)=>{
//             console.error("Error Fetching Data:", error);
//         });
// }

async function fetchRecipies(query){
    const url = `https://api.spoonacular.com/recipies/complexSearch?apiKey=${apiKey}&query=${query}&number=10`

    try{
        const req = await fetch(url)
        var respone =  await req.json()
        var respone = ()=>{
            displayRecipies(res.results)
        }

    }catch (error) {
        console.error( `Error: ${error}`)
    }
}

function displayRecipies(recipies){
    let output = "";

    recipies.forEach((recipie)=>{
        const recipieCard = `
        <div class="">
        <div class="card">
        <img src="${recipie.image}" class="card-img" alt="Recipie Image">
        <div class="card-body">
        <h5 class="card-title"> ${recipie.title}</h5>
        <button class="btn btn-primary view-recipie-btn" data-id="${recipie.id}" data-toggle="modal" data-targets="#recipeModal">View Recipe</button>
        </div>
        </div>
        </div>
        `;
        output += recipieCard
    });

    resultsContainer.innerHTML = output;

    const viewRecipeButtons = document.querySelectorAll(".view-recipe-btn");
    viewRecipeButtons.forEach((button)=>{
        button.addEventListener("click", ()=>{
            const recipeId = button.dataset.id;
            fetchRecipeDetails(recipeId);
        });
    });
};


function fetchRecipeDetails(recipeId){
    const url = `https://api.spoonacular.com/recipies/${recipeId}/information?apiKey=${apiKey}`;

    fetch(url)
        .then((respone)=>response.json())
        .then((data)=>{
            displayRecipieDetails(data);
        })
        .catch((error)=>{
            console.error("Error Fetching Recipe Details:", error);
        });
};

function displayRecipieDetails(recipe){
    const recipieModalBody = document.getElementById("recipieModalBody");
    const recipeDetails = `
    <h3>${recipe.title}</h3>
    <img src="${recipe.image}" alt="Recipe Image" class="">
    <h5>Ingredients:</h5>
    <ul>${recipe.extendedIngredinets.map((ingredients)=> `<li>${ingredient.original}</li>`).join("")}
    </ul>
    <h5>Instructions:</h5>
    <p>${recipe.instructions || "Instructions not available"}</p>
    `;

    recipieModalBody.innerHTML = recipeDetails;
};