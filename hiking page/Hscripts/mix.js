// Array of random words
let words = ["randomwordsfromstackoverflow", "jumble", "easy", "difficult", "answer", "xylophone"];

let idIterator = 0;
let loadingMore = false;

// Function to create a unique ID for each container
function idCreator() {
    idIterator += 1;
    return "containerNo" + idIterator;
}

// Function to create a container with two divs and assign random words
function createNewContainer() {
    const nextDivContainer = document.createElement("div");
    let nextRightDiv = document.createElement("div");
    let nextLeftDiv = document.createElement("div");
    nextDivContainer.className = "container";
    nextLeftDiv.className = "left";
    nextRightDiv.className = "right";

    nextDivContainer.append(nextLeftDiv);
    nextDivContainer.append(nextRightDiv);
    document.getElementById("wrapper").append(nextDivContainer);

    // Assign random words to left and right divs
    createRandomWord(nextLeftDiv);
    createRandomWord(nextRightDiv);

    // Optionally, you can also load trail data into each container
    // For example, you could call a function here to load trail data for each container
}

// Function to assign a random word to a div
function createRandomWord(currentDiv) {
    currentDiv.id = idCreator();
    let currentWord = words[Math.floor(Math.random() * words.length)];
    document.getElementById(currentDiv.id).textContent = currentWord;
}

// Initialize with some containers
window.addEventListener("load", () => {
    for (let i = 0; i < 10; i++) {
        createNewContainer();
    }
});

// Infinite scroll to load more containers
window.addEventListener("scroll", () => {
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
});

// -------- Trail Data Fetching and Display -------- //

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

// Function to fetch and display trail data
function loadTrails() {
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

            // Create a new container for the trails
            const container = document.createElement('div');
            container.id = `trails-container-${idCreator()}`; // unique id if needed
            container.className = 'trail-container';

            // Populate the container with trail info
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

            // Append the trail container to the wrapper
            document.getElementById("wrapper").appendChild(container);
        })
        .catch(error => {
            console.error('Error fetching trail data:', error);
            // Optionally, show a message in the DOM
            const errorMsg = document.createElement('p');
            errorMsg.innerText = 'Failed to load trail data.';
            document.getElementById("wrapper").appendChild(errorMsg);
        });
}

// Call loadTrails initially or on scroll
// For example, load trails each time a new container is created:
function createTrailSection() {
    loadTrails();
}

// Modify createNewContainer to also load trail data
function createNewContainer() {
    // create random word containers
    const nextDivContainer = document.createElement("div");
    let nextRightDiv = document.createElement("div");
    let nextLeftDiv = document.createElement("div");
    nextDivContainer.className = "container";
    nextLeftDiv.className = "left";
    nextRightDiv.className = "right";

    nextDivContainer.append(nextLeftDiv);
    nextDivContainer.append(nextRightDiv);
    document.getElementById("wrapper").append(nextDivContainer);

    createRandomWord(nextLeftDiv);
    createRandomWord(nextRightDiv);

    // Load trail data for this container
    loadTrails();
}
