// search.js

// Function to setup the search event listener
function setupSearch(allTrails, loadNextTrails, currentIndex) {
  const searchInput = document.getElementById('trailSearch');

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();

    // Find index of matching trail
    const matchIndex = allTrails.findIndex(trail => trail.trail_name.toLowerCase().includes(query));

    if (matchIndex !== -1) {
      // Remove the matched trail from array
      const matchedTrail = allTrails.splice(matchIndex, 1)[0];

      // Add the matched trail at the start
      allTrails.unshift(matchedTrail);

      // Reset current index and clear existing trails
      currentIndex.value = 0;
      document.getElementById('wrapper').innerHTML = '';

      // Load the trail at top
      loadNextTrails();

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}
