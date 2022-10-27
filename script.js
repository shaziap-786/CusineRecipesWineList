const get_ingr_btn = document.getElementById('get_ingr');

const api_url = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";

get_ingr_btn.addEventListener('click', () => {

  fetch(api_url) //Api call
    .then(res => res.json()) //returns data from APi call
    .then(data => {

      console.log(data)

      document.getElementById("ingredients").innerHTML = printIngre(data.meals); //call function

    });

});

function printrecipes(data) {

  const recipesHTMLArray = data.map(currentMeal => {

    //https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772

    return `

      <div class="recipes col-4 mt-3"> 

          <h2>

              <div class="card bg-success">

              <div class="card" onclick="findrecipesDescr('${currentMeal.idMeal}')">

                <h5 class="card-title text-center">${currentMeal.strMeal}</h5>
                </div>
              </div>
              </div> `
  })
  return recipesHTMLArray.join('')
}

function findrecipes(cuisine) {
  const api_url2 = "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + cuisine;
  fetch(api_url2) //Api call
    .then(res => res.json()) //resturns data from APi call
    .then(data => {
      console.log(data)
      document.getElementById("recipes").innerHTML = printrecipes(data.meals); //call function
      document.getElementById("ingredients").innerHTML = `<h1 class="text-center">${cuisine}</h1>`;
    //  document.getElementById("cocktails").style.display = "none";
    }
    );
}

//function call,that shows data in table format
function printIngre(meals) {
  const ingredientsHTMLArray = meals.map(currentMeal => {
    return `
      <div class="ingredients col-4 mt-3"> 
              <div class="card" onclick="findrecipes('${currentMeal.strArea}')">
              <div class="">
                <h5 class="card-title text-center">${currentMeal.strArea}</h5>
                </div>
              </div>
              </div> `

  })
  return ingredientsHTMLArray.join('')
}

function findrecipesDescr(mealId) {
  let recipe = {}
  const api_url3 = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + mealId;
  fetch(api_url3) //Api call
    .then(res => res.json()) //returns data from APi call
    .then(data => {
      recipe = formatRecipeData(data.meals[0])
      let htmlInstr = prepareRecipeDetailsHTML(recipe)
      document.getElementById("mealInstructions").innerHTML = data.meals[0].strInstructions; //call function
      document.getElementById("details").innerHTML = htmlInstr;
      document.getElementById("ingredients").innerHTML = `<h1 class="text-center">${data.meals[0].strMeal}</h1>`;
      document.getElementById("recipes").innerHTML = "";
      document.getElementById("cocktails").style = "block";

      prepareCocktailsBtn();

    })
}

function formatRecipeData(recipe) {
  let _ingredients = [];
  let _measures = [];
  for (const key in recipe) {
    const value = recipe[key];
    if (!value) {
      delete recipe[key]
    }
    if (key.indexOf('Ingredient') > -1) {
      _ingredients.push(value);
    }
    if (key.indexOf('Measure') > -1) {
      _measures.push(value);
    }
  }

  let ingredients = [];
  for (let i = 0; i < _ingredients.length; i++) {
    const ingredient = {};
    ingredient['name'] = _ingredients[i];
    ingredient['measure'] = _measures[i];
    ingredients.push(ingredient);
  }

  recipe['ingredients'] = ingredients;
  const recipeFinal = { ...recipe };

  for (const key in recipeFinal) {
    const value = recipeFinal[key];
    if (!value) {
      delete recipeFinal[key];
    }
    if (key.indexOf('Ingredient') > -1) {
      delete recipeFinal[key];
    }
    if (key.indexOf('Measure') > -1) {
      _measures.push(value);
    }
  }
  return recipeFinal;
}

function prepareRecipeDetailsHTML(recipieData) {
  let tab =
    ` <table style="text-align:center"> 
  <tr><th>Ingredients</th> <th>Measures</th></tr>`;
  for (let i of recipieData.ingredients) {
    if (i.name != '') {
      tab += `<tr>
  <td>${i.name} </td>
  <td>${i.measure} </td>
  </tr>`;
    }
  }
  tab += `</table>`;

  return tab;
}
function prepareCocktailsBtn(){
  const get_cocktail_btn = document.getElementById('cocktails');
const api_url4 = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail";
get_cocktail_btn.addEventListener('click', () => {

  fetch(api_url4) //Api call
    .then(res => res.json()) //returns data from APi call
    .then(data => {
      console.log(data);
    
      document.getElementById("cocktails_list").innerHTML = printCocktails(data.drinks); //call function
      document.getElementById("mealInstructions").innerHTML = ""; //call function
      document.getElementById("details").innerHTML = "";
      document.getElementById("ingredients").innerHTML = "";
      document.getElementById("recipes").innerHTML = "";
      document.getElementById("cocktails").style.visibility = "hidden";
      document.getElementById("cocktails_list").style.fontStyle="italic"
      
    });
});
}

function printCocktails(drinks) {
  const cocktailsHTMLArray = drinks.map(currentDrink => {
    return `
    
      <div class="cocktails_list col-4 mt-3"> 
      
              
              <div class="">
                <h5 class="card-title text-center">${currentDrink.strDrink}</h5>
                </div>
              </div> `

  });
  return `<h3> Cocktail Variety List </h3>`+cocktailsHTMLArray.join('')
}

