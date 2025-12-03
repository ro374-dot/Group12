// Activities-loader.js

// Global variables
let allActivities = [];
let currentIndex = 0; // To track which Activitiess have been loaded
const maxActivitiesToLoad = 20; // Stop loading after 20 Activities
let loadingMore = false;

// Fetch all Activities once
fetch('api/flagstaffActivities.json') // Replace with your API URL if needed
  .then(response => response.json())
  .then(data => {
    allActivities = data; // Assign data to allActivities
    shuffle(allActivities); // Randomize order without repeats
    initActivitiesLoading(); // Load initial Activities
  })
  .catch(error => {
    console.error('Error fetching Activities data:', error);
  });

// Function to shuffle array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to create a Activities object
function createActivities(name, rating, address, description, imageUrl) {
    return {
        Activities_name: name,
        rating: rating,
        address: address,
        description: description,
        image_url: imageUrl
    };
}

// Function to load next batch of Activities
function loadNextActivities() {
    if (currentIndex >= allActivities.length || currentIndex >= maxActivitiesToLoad) {
        return; // No more Activities to load
    }

    const container = document.createElement('div');
    container.className = 'Activities-section';

    const ActivitiesContentDiv = document.createElement('div');
    ActivitiesContentDiv.className = 'Activities-content';

    container.appendChild(ActivitiesContentDiv);
    document.getElementById('wrapper').appendChild(container);

    // Load next set of Activities
    const batchSize = 5; // Number of Activities per scroll
    const startIndex = currentIndex;
    const endIndex = Math.min(currentIndex + batchSize, allActivities.length, maxActivitiesToLoad);

    for (let i = startIndex; i < endIndex; i++) {
        const Activities = allActivities[i];
        const ActivitiesObj = createActivities(
            Activities.name,
            Activities.rating,
            Activities.address,
            Activities.description,
            Activities.photo
        );
        const ActivitiesDiv = document.createElement('div');
        ActivitiesDiv.className = 'Activities';

        // Display rating as fraction (e.g., 4.6 / 5)
        ActivitiesDiv.innerHTML = `
            <h2>${ActivitiesObj.Activities_name}</h2>
            <img src="${ActivitiesObj.image_url}" alt="${ActivitiesObj.Activities_name}">
            <p><strong>Rating:</strong> ${ActivitiesObj.rating} / 5</p>
            <p><strong>Address:</strong> ${ActivitiesObj.address}</p>
            <p>${ActivitiesObj.description}</p>
        `;
        ActivitiesContentDiv.appendChild(ActivitiesDiv);
    }

    currentIndex = endIndex; // Update index
}

// Initialize loading of initial Activities
function initActivitiesLoading() {
    loadNextActivities();
}

// Infinite scroll event handler
function handleScroll() {
    if (!loadingMore) {
        const scrolledTo = window.scrollY + window.innerHeight;
        const pageHeight = document.documentElement.scrollHeight;

        if (scrolledTo >= pageHeight - 1) {
            loadingMore = true;
            setTimeout(() => {
                loadNextActivities();
                // Stop loading more after maxActivitiesToLoad
                if (currentIndex >= maxActivitiesToLoad) {
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
