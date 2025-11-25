// trail-loader.js

// Global variables
let allTrails = [];
let currentIndex = 0; // To track which trails have been loaded
const maxTrailsToLoad = 20; // Stop loading after 20 trails
let loadingMore = false;
// Function to shuffle array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Fetch all trails once
fetch('api/trails.json')
  .then(response => response.json())
  .then(data => {
    allTrails = data;
    shuffle(allTrails); // Randomize order without repeats
    initTrailLoading(); // Load initial trails
  })
  .catch(error => {
    console.error('Error fetching trail data:', error);
  });

// Function to create a trail object
function createTrail(name, rating, maxRating, address, description, imageUrl) {
    return {
        trail_name: name,
        rating: rating,
        max_rating: maxRating,
        address: address,
        description: description,
        image_url: imageUrl
    };
}

// Function to load next batch of trails
function loadNextTrails() {
    if (currentIndex >= allTrails.length || currentIndex >= maxTrailsToLoad) {
        return; // No more trails to load
    }

    const container = document.createElement('div');
    container.className = 'trail-section';

    const trailContentDiv = document.createElement('div');
    trailContentDiv.className = 'trail-content';

    container.appendChild(trailContentDiv);
    document.getElementById("wrapper").appendChild(container);

    // Load next set of trails
    const batchSize = 5; // Number of trails per scroll
    const startIndex = currentIndex;
    const endIndex = Math.min(currentIndex + batchSize, allTrails.length, maxTrailsToLoad);

    for (let i = startIndex; i < endIndex; i++) {
        const trail = allTrails[i];
        const trailObj = createTrail(
            trail.trail_name,
            trail.rating,
            trail.max_rating,
            trail.address,
            trail.description,
            trail.image_url
        );
        const trailDiv = document.createElement('div');
        trailDiv.className = 'trail';

        trailDiv.innerHTML = `
            <h2>${trailObj.trail_name}</h2>
            <img src="${trailObj.image_url}" alt="${trailObj.trail_name}">
            <p><strong>Rating:</strong> ${trailObj.rating} / ${trailObj.max_rating}</p>
            <p><strong>Address:</strong> ${trailObj.address}</p>
            <p>${trailObj.description}</p>
        `;
        trailContentDiv.appendChild(trailDiv);
    }

    currentIndex = endIndex; // Update index
}

// Initialize loading of initial trails
function initTrailLoading() {
    // Load a few trails initially
    loadNextTrails();
}

// Infinite scroll event handler
function handleScroll() {
    if (!loadingMore) {
        const scrolledTo = window.scrollY + window.innerHeight;
        const pageHeight = document.documentElement.scrollHeight;

        if (scrolledTo >= pageHeight - 1) {
            loadingMore = true;
            setTimeout(() => {
                loadNextTrails();
                // Stop loading more after 20 trails
                if (currentIndex >= maxTrailsToLoad) {
                    window.removeEventListener("scroll", handleScroll);
                    content += '  <footer> <p>&copy; 2025 Flagstaff Adventures. All rights reserved.</p></footer>';
                }
                loadingMore = false;
            }, 250);
        }
    }
}

// Attach event listener
window.addEventListener("load", () => {
    window.addEventListener("scroll", handleScroll);
});
window.addEventListener("scroll", handleScroll);
