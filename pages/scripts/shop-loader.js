// Shop Loader Script

// Global variables
let allShops = [];
let currentIndex = 0; // To track which shops have been loaded
const maxShopsToLoad = 20; // Stop loading after 20 shops
let loadingMore = false;

// Function to shuffle array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Fetch all shops once
fetch('api/flagstaffShops.json') // Replace with your API URL if needed
  .then(response => response.json())
  .then(data => {
    allShops = data;
    shuffle(allShops); // Randomize order without repeats
    initShopLoading(); // Load initial shops
  })
  .catch(error => {
    console.error('Error fetching shop data:', error);
  });

// Function to create a shop object
function createShop(name, rating, address, description, imageUrl) {
    return {
        shop_name: name,
        rating: rating,
        address: address,
        description: description,
        image_url: imageUrl
    };
}

// Function to load next batch of shops
function loadNextShops() {
    if (currentIndex >= allShops.length || currentIndex >= maxShopsToLoad) {
        return; // No more shops to load
    }

    // Create a new section container for this batch
    const container = document.createElement('div');
    container.className = 'shop-section';

    // Create inner content div
    const shopContentDiv = document.createElement('div');
    shopContentDiv.className = 'shop-content';

    container.appendChild(shopContentDiv);
    document.getElementById("wrapper").appendChild(container);

    // Load next set of shops
    const batchSize = 5; // Number of shops per batch
    const startIndex = currentIndex;
    const endIndex = Math.min(currentIndex + batchSize, allShops.length, maxShopsToLoad);

    for (let i = startIndex; i < endIndex; i++) {
        const shop = allShops[i];
        const shopObj = createShop(
            shop.name,
            shop.rating,
            shop.address,
            shop.description,
            shop.photo
        );
        const shopDiv = document.createElement('div');
        shopDiv.className = 'shop';

        shopDiv.innerHTML = `
            <h2>${shopObj.shop_name}</h2>
            <img src="${shopObj.image_url}" alt="${shopObj.shop_name}">
            <p><strong>Rating:</strong> ${shopObj.rating} / 5</p>
            <p><strong>Address:</strong> ${shopObj.address}</p>
            <p>${shopObj.description}</p>
        `;
        shopContentDiv.appendChild(shopDiv);
    }

    currentIndex = endIndex; // Update index
}

// Initialize loading of initial shops
function initShopLoading() {
    loadNextShops();
}

// Infinite scroll event handler
function handleScroll() {
    if (!loadingMore) {
        const scrolledTo = window.scrollY + window.innerHeight;
        const pageHeight = document.documentElement.scrollHeight;

        if (scrolledTo >= pageHeight - 1) {
            loadingMore = true;
            setTimeout(() => {
                loadNextShops();
                // Stop loading more after maxShopsToLoad
                if (currentIndex >= maxShopsToLoad) {
                    window.removeEventListener("scroll", handleScroll);
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
