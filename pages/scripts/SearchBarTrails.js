// Keep track of loaded trails by name
const loadedTrailNames = new Set();

function searchTrail() {
  const query = document.getElementById('searchInput').value.trim().toLowerCase();
  const resultContainer = document.getElementById('searchResult');
  resultContainer.innerHTML = ''; // Clear previous result

  if (!query) {
    alert('Please enter a trail name.');
    return;
  }

  // Check if trail is already loaded
  if (loadedTrailNames.has(query)) {
    alert('Trail already loaded.');
    return;
  }

  // Search in allTrails
  const trail = allTrails.find(t => t.trail_name.toLowerCase() === query);
  if (trail) {
    // Mark as loaded
    loadedTrailNames.add(query);

    // Create trail display
    const trailDiv = document.createElement('div');
    trailDiv.className = 'trail';

    trailDiv.innerHTML = `
      <h2>${trail.trail_name}</h2>
      <img src="${trail.image_url}" alt="${trail.trail_name}">
      <p><strong>Rating:</strong> ${trail.rating} / ${trail.max_rating}</p>
      <p><strong>Address:</strong> ${trail.address}</p>
      <p>${trail.description}</p>
    `;
    resultContainer.appendChild(trailDiv);
  } else {
    alert('Trail not found. Loading from API...');
    // If not found, optionally fetch directly from API (if API supports it)
    // For now, assuming allTrails contains all data
    // If you have an API endpoint for individual trails, fetch here
  }
}
