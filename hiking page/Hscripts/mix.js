// --- Your loadTrails function ---
function loadTrails(container) {
  // fetch data or generate dummy data for testing
  // For example:
  const dummyData = [
    {
      name: "Trail 1",
      rating: 4,
      max_rating: 5,
      address: "Somewhere",
      description: "A nice trail",
      photo: "https://via.placeholder.com/150"
    }
  ];

  // populate the container
  dummyData.forEach(trail => {
    const trailDiv = document.createElement('div');
    trailDiv.className = 'trail';

    trailDiv.innerHTML = `
      <h2>${trail.name}</h2>
      <img src="${trail.photo}" alt="${trail.name}">
      <p><strong>Rating:</strong> ${trail.rating} / ${trail.max_rating}</p>
      <p><strong>Address:</strong> ${trail.address}</p>
      <p>${trail.description}</p>
    `;

    container.appendChild(trailDiv);
  });
}

// --- Your createNewContainer function ---
function createNewContainer() {
  if (totalContainers >= maxContainers) return;

  const container = document.createElement("div");
  container.className = "trail-section";

  const trailContentDiv = document.createElement('div');
  trailContentDiv.className = 'trail-content';

  container.appendChild(trailContentDiv);
  document.getElementById("wrapper").appendChild(container);

  loadTrails(trailContentDiv);
  totalContainers++;
}
