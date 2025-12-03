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

  // Search for the shop
  const matchedActivitiesIndex = allActivities.findIndex(activities => activities.name.toLowerCase().includes(query));

  if (matchedActivitiesIndex !== -1) {
    // Move the matched shop to the front of the array
    const [matchedFood] = allActivities.splice(matchedActivitiesIndex, 1);
    allShops.unshift(matchedActivities);

    // Reset current index and clear existing shops
    currentIndex = 0;
    document.getElementById('wrapper').innerHTML = '';

    // Load the shops again (starting with the matched one now at the top)
    loadNextShops();

    // Optional: scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    alert('Activity place not found.');
  }
}
