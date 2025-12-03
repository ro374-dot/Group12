// food-loader.js

// Global variables
let allFood = [];
let currentIndex = 0; // To track which foods have been loaded
const maxFoodToLoad = 20; // Stop loading after 20 food
let loadingMore = false;

// Fetch all food once
fetch('api/flagstaffFood.json') // Replace with your API URL if needed
  .then(response => response.json())
  .then(data => {
    allFood = data; // Assign data to allFood
    shuffle(allFood); // Randomize order without repeats
    initFoodLoading(); // Load initial food
  })
  .catch(error => {
    console.error('Error fetching food data:', error);
  });

// Function to shuffle array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to create a food object
function createFood(name, rating, address, description, imageUrl) {
    return {
        food_name: name,
        rating: rating,
        address: address,
        description: description,
        image_url: imageUrl
    };
}

// Function to load next batch of food
function loadNextFood() {
    if (currentIndex >= allFood.length || currentIndex >= maxFoodToLoad) {
        return; // No more food to load
    }

    const container = document.createElement('div');
    container.className = 'food-section';

    const foodContentDiv = document.createElement('div');
    foodContentDiv.className = 'food-content';

    container.appendChild(foodContentDiv);
    document.getElementById('wrapper').appendChild(container);

    // Load next set of food
    const batchSize = 5; // Number of food per scroll
    const startIndex = currentIndex;
    const endIndex = Math.min(currentIndex + batchSize, allFood.length, maxFoodToLoad);

    for (let i = startIndex; i < endIndex; i++) {
        const food = allFood[i];
        const foodObj = createFood(
            food.name,
            food.rating,
            food.address,
            food.description,
            food.photo
        );
        const foodDiv = document.createElement('div');
        foodDiv.className = 'food';

        // Display rating as fraction (e.g., 4.6 / 5)
        foodDiv.innerHTML = `
            <h2>${foodObj.food_name}</h2>
            <img src="${foodObj.image_url}" alt="${foodObj.food_name}">
            <p><strong>Rating:</strong> ${foodObj.rating} / 5</p>
            <p><strong>Address:</strong> ${foodObj.address}</p>
            <p>${foodObj.description}</p>
        `;
        foodContentDiv.appendChild(foodDiv);
    }

    currentIndex = endIndex; // Update index
}

// Initialize loading of initial food
function initFoodLoading() {
    loadNextFood();
}

// Infinite scroll event handler
function handleScroll() {
    if (!loadingMore) {
        const scrolledTo = window.scrollY + window.innerHeight;
        const pageHeight = document.documentElement.scrollHeight;

        if (scrolledTo >= pageHeight - 1) {
            loadingMore = true;
            setTimeout(() => {
                loadNextFood();
                // Stop loading more after maxFoodToLoad
                if (currentIndex >= maxFoodToLoad) {
                    window.removeEventListener('scroll', handleScroll);
                }
                loadingMore = false;
            }, 250);
        }
    }
}

// Attach event listener
window.addEventListener('load', () => {
    window.addEventListener('scroll', handleScroll);
});
window.addEventListener('scroll', handleScroll);
