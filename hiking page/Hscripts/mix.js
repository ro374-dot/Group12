// trail-loader.js

// Global variables
let loadingMore = false;

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

// Function to load trail data into a specific container
function loadTrails(container) {
    fetch('api/trails.json')
        .then(response => response.json())
        .then(data => {
            const trails = data.map(trail => createTrail(
                trail.trail_name,
                trail.rating,
                trail.max_rating,
                trail.address,
                trail.description,
                trail.image_url
            ));
            trails.forEach(trail => {
                const trailDiv = document.createElement('div');
                trailDiv.className = 'trail';

                trailDiv.innerHTML = `
                    <h2>${trail.trail_name}</h2>
                    <img src="${trail.image_url}" alt="${trail.trail_name}">
                    <p><strong>Rating:</strong> ${trail.rating} / ${trail.max_rating}</p>
                    <p><strong>Address:</strong> ${trail.address}</p>
                    <p>${trail.description}</p>
                `;
                container.appendChild(trailDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching trail data:', error);
            const errorMsg = document.createElement('p');
            errorMsg.innerText = 'Failed to load trail data.';
            container.appendChild(errorMsg);
        });
}

// Function to create a new container and load trail data
function createNewContainer() {
    const container = document.createElement("div");
    container.className = "trail-section";

    const trailContentDiv = document.createElement('div');
    trailContentDiv.className = 'trail-content';

    container.appendChild(trailContentDiv);
    document.getElementById("wrapper").appendChild(container);

    loadTrails(trailContentDiv);
}

// Initialize initial containers on page load
function initTrailLoading() {
    for (let i = 0; i < 10; i++) {
        createNewContainer();
    }
}

// Infinite scroll event handler
function handleScroll() {
    if (!loadingMore) {
        let scrolledTo = window.scrollY + window.innerHeight;
        let pageHeight = document.documentElement.scrollHeight;

        if (scrolledTo >= pageHeight - 1) {
            loadingMore = true;
            setTimeout(() => {
                for (let i = 0; i < 5; i++) {
                    createNewContainer();
                }
                loadingMore = false;
            }, 250);
        }
    }
}

// Attach event listeners
window.addEventListener("load", () => {
    initTrailLoading();
});

window.addEventListener("scroll", handleScroll);
