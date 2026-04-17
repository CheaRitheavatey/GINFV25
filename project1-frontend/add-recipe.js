let recipeIngredients = []; // stores the ingredients the user adds

document.addEventListener('DOMContentLoaded', loadDropdown);

// fetch ingredients to populate the dropdown
async function loadDropdown() {
  try {
    const res = await fetch('http://localhost:3000/api/ingredient');
    const data = await res.json();
    
    if (data.success) {
      const select = document.getElementById('ingredient-select');
      select.innerHTML = ''; 
      data.data.forEach(ing => {
        select.innerHTML += `<option value="${ing.id}">${ing.ingredient_name}</option>`;
      });
    }
  } catch (error) {
    console.error('Error loading dropdown', error);
  }
}

// add an ingredient to the visual list on the right
document.getElementById('add-ing-btn').addEventListener('click', () => {
  const select = document.getElementById('ingredient-select');
  const quantityInput = document.getElementById('quantity-input');
  
  const id = parseInt(select.value);
  const name = select.options[select.selectedIndex].text;
  const quantity = quantityInput.value.trim();

  if (!quantity) return alert('Please enter a quantity!');

  // push to our array
  recipeIngredients.push({ id, name, quantity });
  
  // update right panel ui
  updatePreviewPanel();
  
  // clear quantity input
  quantityInput.value = '';
});

function updatePreviewPanel() {
  const list = document.querySelector('.ingredient-list');
  list.innerHTML = ''; // Clear mockups
  
  recipeIngredients.forEach(item => {
    // use a generic emoji or dynamic ones based on name later
    list.innerHTML += `
      <div class="ingredient-item">
        <div class="ingredient-icon">🍴</div>
        <div class="ingredient-details">
          <h4>${item.name}</h4>
          <p>${item.quantity}</p>
        </div>
      </div>
    `;
  });
}

// submit the final recipe to the backend
document.getElementById('add-recipe-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const token = localStorage.getItem('token');
  if (!token) {
    return alert('You must be logged in to add a recipe!');
  }

  const title = document.getElementById('recipe-title').value;
  const prep_time = parseInt(document.getElementById('prep-time').value);
  const cost = parseFloat(document.getElementById('cost').value);
  const instruction = document.getElementById('instruction').value;

  if (recipeIngredients.length === 0) {
    return alert('You must add at least one ingredient to the recipe.');
  }

  // format array for the backend ({ id, quantity })
  const ingredientsPayload = recipeIngredients.map(ing => ({
    id: ing.id,
    quantity: ing.quantity
  }));

  const payload = { title, prep_time, cost, instruction, ingredients: ingredientsPayload };

  try {
    const res = await fetch('http://localhost:3000/api/recipe', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (data.success) {
      alert('Recipe successfully added to the database!');
      window.location.reload(); // Refresh the page to clear the form
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Error saving recipe', error);
    alert('Server error while saving recipe.');
  }
});