CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE ingredients_category (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL -- e.g., 'Fruit', 'Vegetable', 'Egg', 'Meat'
);


CREATE TABLE ingredients (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category_id BIGINT NOT NULL,
    FOREIGN KEY(category_id) REFERENCES ingredients_category(id)
);


CREATE TABLE recipe (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    instruction TEXT NOT NULL,
    prep_time INTEGER NOT NULL, -- in minutes
    cost NUMERIC(10,2) DEFAULT 0 -- optional estimated cost
);

-- ============================
-- 5. Recipe-Ingredients Join Table
-- ============================
CREATE TABLE recipe_ingredients (
    recipe_id BIGINT NOT NULL,
    ingredient_id BIGINT NOT NULL,
    quantity TEXT, -- e.g., '2 eggs', '1 cup'
    PRIMARY KEY(recipe_id, ingredient_id),
    FOREIGN KEY(recipe_id) REFERENCES recipe(id),
    FOREIGN KEY(ingredient_id) REFERENCES ingredients(id)
);

-- ============================
-- 6. Favorites
-- ============================
CREATE TABLE favorites (
    user_id BIGINT NOT NULL,
    recipe_id BIGINT NOT NULL,
    PRIMARY KEY(user_id, recipe_id),
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(recipe_id) REFERENCES recipe(id)
);

-- ============================
-- 7. Sample Data
-- ============================

-- Ingredient categories
INSERT INTO ingredients_category (name) VALUES 
('Fruit'), 
('Vegetable'), 
('Egg'), 
('Meat'), 
('Dairy'), 
('Grain'), 
('Legume'), 
('Salt/Umami'), 
('Sugar/Sweetener');

-- Ingredients
INSERT INTO ingredients (name, category_id) VALUES
('Tomato', 2),
('Egg', 3),
('Rice', 6),
('Cheese', 5),
('Chicken', 4),
('Salt', 8),
('Sugar', 9),
('Onion', 2),
('Bell Pepper', 2);

-- Recipes
INSERT INTO recipe (title, instruction, prep_time, cost) VALUES
('Tomato Omelette', '1. Chop tomato. 2. Beat eggs. 3. Mix and fry. 4. Serve hot.', 10, 2.5),
('Fried Rice', '1. Cook rice. 2. Chop vegetables. 3. Fry rice with veggies and egg. 4. Serve.', 20, 3.0),
('Chicken Stir Fry', '1. Chop chicken and vegetables. 2. Stir fry with salt and sauce. 3. Serve.', 25, 4.5);

-- Recipe-Ingredients
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity) VALUES
(1, 1, '1 tomato'),
(1, 2, '2 eggs'),
(1, 6, '1 tsp salt'),
(2, 3, '1 cup rice'),
(2, 2, '1 egg'),
(2, 1, '1 tomato'),
(2, 8, '1 tsp salt'),
(3, 5, '100g chicken'),
(3, 1, '1 tomato'),
(3, 8, '1 tsp salt'),
(3, 9, '1 tsp sugar');

-- Users sample
INSERT INTO users (first_name, last_name, email, password) VALUES
('John', 'Doe', 'john@example.com', 'password123'),
('Jane', 'Smith', 'jane@example.com', 'password456');

-- Favorites sample
INSERT INTO favorites (user_id, recipe_id) VALUES
(1, 1),
(1, 2),
(2, 3);