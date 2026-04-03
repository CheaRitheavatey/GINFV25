document.addEventListener('DOMContentLoaded', loadIngredients);

async function loadIngredients() {
  try {
    const res = await fetch('http://localhost:3000/api/ingredients');
    const data = await res.json();
    
    if (data.success) {
      renderIngredientCheckboxes(data.data);
    }
  } catch (error) {
    console.error('Failed to fetch ingredients', error);
  }
}

function renderIngredientCheckboxes(ingredients) {
  const container = document.querySelector('.categories-grid');
  container.innerHTML = ''; // Clear existing hardcoded stuff

  // group by category
  const categories = {};
  ingredients.forEach(ing => {
    if (!categories[ing.category_name]) categories[ing.category_name] = [];
    categories[ing.category_name].push(ing);
  });

  // create html for each category
  for (const [catName, items] of Object.entries(categories)) {
    const card = document.createElement('div');
    card.className = 'category-card';
    
    let html = `<h3>${catName}</h3>`;
    items.forEach(item => {
      html += `
        <label class="checkbox-label">
          <input type="checkbox" value="${item.id}" class="ingredient-cb"> ${item.ingredient_name}
        </label>
      `;
    });
    
    card.innerHTML = html;
    container.appendChild(card);
  }
}

// handle form submit
document.getElementById('generator-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // get all checked checkboxes
  const checkedBoxes = document.querySelectorAll('.ingredient-cb:checked');
  const ingredient_ids = Array.from(checkedBoxes).map(cb => parseInt(cb.value));

  if (ingredient_ids.length === 0) {
    return alert('Please select at least one ingredient.');
  }

  try {
    const res = await fetch('http://localhost:3000/api/recipes/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredient_ids })
    });
    
    const data = await res.json();
    if (data.success) {
      renderResults(data.data);
    }
  } catch (error) {
    console.error('Error generating meals', error);
  }
});

function renderResults(recipes) {
  const resultsDiv = document.querySelector('.results-section');
  
  if (recipes.length === 0) {
    resultsDiv.innerHTML = `<h2>Your Matches</h2><p>No recipes found with those exact ingredients. Try adding more!</p>`;
    return;
  }

  let html = `<h2>Your Matches</h2>`;
  recipes.forEach(recipe => {
    html += `
      <div class="recipe-result-card">
        <h3>${recipe.title}</h3>
        <div class="recipe-meta">
          <span>⏱ Prep: ${recipe.prep_time} mins</span>
          <span>💰 Cost: $${recipe.cost}</span>
          <span>✅ Matched: ${recipe.matched_ingredients_count} ingredients</span>
        </div>
        <p><strong>Instructions:</strong> ${recipe.instruction}</p>
      </div>
    `;
  });
  
  resultsDiv.innerHTML = html;
}