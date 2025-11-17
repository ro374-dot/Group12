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

      const container = document.getElementById('trails-container');

      let index = 0; // Initialize counter

      trails.forEach(trail => {
        index++; // Increment counter for each trail

        const trailDiv = document.createElement('div');
        trailDiv.className = 'trail';

        trailDiv.innerHTML = `
          <h2>${index}. ${trail.trail_name}</h2>
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
