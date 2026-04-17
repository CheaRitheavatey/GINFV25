let kitchenIngredients = []; // array to store IDs and names of what the user selected

document.addEventListener('DOMContentLoaded', loadIngredientsDropdown);

async function loadIngredientsDropdown() {
  try {
    const res = await fetch('http://localhost:3000/api/ingredient');
    const data = await res.json();
    
    if (data.success) {
      const dropdown = document.getElementById('kitchen-dropdown');
      dropdown.innerHTML = ''; 

      // group ingredients by category for the dropdown
      const categories = {};
      data.data.forEach(ing => {
        if (!categories[ing.category_name]) categories[ing.category_name] = [];
        categories[ing.category_name].push(ing);
      });

      // create an <optgroup> for each category
      for (const [catName, items] of Object.entries(categories)) {
        const optgroup = document.createElement('optgroup');
        optgroup.label = catName; // e.g., "Vegetable", "Meat"
        
        items.forEach(item => {
          const option = document.createElement('option');
          option.value = item.id;
          option.text = item.ingredient_name;
          optgroup.appendChild(option);
        });
        
        dropdown.appendChild(optgroup);
      }
    }
  } catch (error) {
    console.error('Failed to fetch ingredients', error);
  }
}

// handle adding an item to the screen
document.getElementById('add-to-kitchen-btn').addEventListener('click', () => {
  const dropdown = document.getElementById('kitchen-dropdown');
  const id = parseInt(dropdown.value);
  const name = dropdown.options[dropdown.selectedIndex].text;

  // prevent adding the exact same ingredient twice
  if (kitchenIngredients.some(item => item.id === id)) {
    return; 
  }

  kitchenIngredients.push({ id, name });
  updateKitchenScreen();
});

// update the visual tags on the screen
function updateKitchenScreen() {
  const container = document.getElementById('selected-kitchen-items');
  container.innerHTML = ''; // Clear placeholder text

  if (kitchenIngredients.length === 0) {
    container.innerHTML = `<p style="color: gray; font-size: 0.9rem; margin: 0;">Your selected ingredients will appear here...</p>`;
    return;
  }

  kitchenIngredients.forEach((item, index) => {
    container.innerHTML += `
      <div class="kitchen-tag">
        ${item.name} 
        <span class="remove-tag" onclick="removeIngredient(${index})">✕</span>
      </div>
    `;
  });
}

// allows user to click 'X' to remove a tag
window.removeIngredient = function(index) {
  kitchenIngredients.splice(index, 1);
  updateKitchenScreen();
};

// handle Generate Button Click
document.getElementById('generate-btn').addEventListener('click', async () => {
  if (kitchenIngredients.length === 0) {
    return alert('Please add at least one ingredient to your kitchen first!');
  }

  // Extract just the IDs to send to the backend
  const ingredient_ids = kitchenIngredients.map(item => item.id);

  try {
    console.log({ingredient_ids})
    const res = await fetch('http://localhost:3000/api/recipe/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredient_id: ingredient_ids })
    });
    
    const data = await res.json();
    if (data.success) {
      renderResults(data.data);
    }
  } catch (error) {
    console.error('Error generating meals', error);
  }
});

// Render the final recipes
function renderResults(recipes) {
  const resultsDiv = document.getElementById('results-container');
  
  if (recipes.length === 0) {
    resultsDiv.innerHTML = `<h2>Your Matches</h2><p>No recipes found. Try adding more ingredients to your kitchen!</p>`;
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