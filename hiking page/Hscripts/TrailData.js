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

// Function to fetch and display trails
function loadTrails() {
  fetch('hiking page/api/trails')
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

      const container = document.getElementById('trails-container');

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
      document.getElementById('trails-container').innerText = 'Failed to load trail data.';
    });
}

// Call loadTrails when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', loadTrails);
