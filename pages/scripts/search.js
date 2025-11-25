// search.js

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('searchButton');
  const searchInput = document.getElementById('searchInput');

  searchButton.addEventListener('click', () => {
    performSearch();
  });

  // Optional: allow pressing Enter to trigger search
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  });
});

// Function to perform search
function performSearch() {
  const query = document.getElementById('searchInput').value.trim().toLowerCase();

  if (!query) return; // Do nothing if empty

  // Search for the trail
  const matchedTrailIndex = allTrails.findIndex(trail => trail.trail_name.toLowerCase().includes(query));

  if (matchedTrailIndex !== -1) {
    // Move the matched trail to the front of the array
    const [matchedTrail] = allTrails.splice(matchedTrailIndex, 1);
    allTrails.unshift(matchedTrail);

    // Reset current index and clear existing trails
    currentIndex = 0;
    document.getElementById('wrapper').innerHTML = '';

    // Load the trails again (starting with the matched one now at the top)
    loadNextTrails();

    // Optional: scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    alert('Trail not found.');
  }
}
