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
    .then(response =&gt; response.json())
    .then(data =&gt; {
      const trails = data.map(trail =&gt; createTrail(
        trail.trail_name,
        trail.rating,
        trail.max_rating,
        trail.address,
        trail.description,
        trail.image_url
      ));

      const container = document.getElementById('trails-container');

      trails.forEach(trail =&gt; {
        const trailDiv = document.createElement('div');
        trailDiv.className = 'trail';

        trailDiv.innerHTML = `
          &lt;h2&gt;${trail.trail_name}&lt;/h2&gt;
          &lt;img src="${trail.image_url}" alt="${trail.trail_name}"&gt;
          &lt;p&gt;&lt;strong&gt;Rating:&lt;/strong&gt; ${trail.rating} / ${trail.max_rating}&lt;/p&gt;
          &lt;p&gt;&lt;strong&gt;Address:&lt;/strong&gt; ${trail.address}&lt;/p&gt;
          &lt;p&gt;${trail.description}&lt;/p&gt;
        `;

        container.appendChild(trailDiv);
      });
    })
    .catch(error =&gt; {
      console.error('Error fetching trail data:', error);
      document.getElementById('trails-container').innerText = 'Failed to load trail data.';
    });
}

// Call loadTrails when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', loadTrails);
