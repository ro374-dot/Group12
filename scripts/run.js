function loadTrailData(jsonPath) {
  fetch(jsonPath)
    .then(response => response.json())
    .then(data => {
      // Populate basic info
      document.getElementById('trail-name').textContent = data.trail_name;
      document.getElementById('location').textContent = data.location;
      document.getElementById('description').textContent = data.description;
      document.getElementById('distance').textContent = data.distance;
      document.getElementById('elevation').textContent = data.elevation_gain;
      document.getElementById('difficulty').textContent = data.difficulty;
      document.getElementById('season').textContent = data.season;
      document.getElementById('access').textContent = data.access;

      // Populate Why Go list
      const whyGoList = document.getElementById('why-go');
      whyGoList.innerHTML = ''; // clear previous content
      data.why_go.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        whyGoList.appendChild(li);
      });

      // Populate Recommendations list
      const recList = document.getElementById('recommendations');
      recList.innerHTML = ''; // clear previous content
      data.recommendations.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        recList.appendChild(li);
      });

      // Populate Trail Route
      const routeDiv = document.getElementById('trail-route');
      routeDiv.innerHTML = ''; // clear previous content
      data.trail_route.trail_segments.forEach(segment => {
        const segmentDiv = document.createElement('div');
        segmentDiv.innerHTML = `<h4>${segment.name}</h4><p>${segment.description}</p>`;
        if (segment.features) {
          segmentDiv.innerHTML += `<p><em>Features:</em> ${segment.features}</p>`;
        }
        routeDiv.appendChild(segmentDiv);
      });
    })
    .catch(error => {
      console.error('Error loading trail data:', error);
    });
}

// Call the function with the path to your JSON file
loadTrailData('scripts/Bear Jaw Loop.json');
