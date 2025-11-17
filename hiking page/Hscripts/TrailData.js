// Your function to create a trail object
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

// Example: Fetch data from your API
fetch('hiking page/api/trails')
  .then(response => response.json())
  .then(data => {
    // Assuming data is an array of trail objects from your API
    const trails = data.map(trail => createTrail(
      trail.trail_name,
      trail.rating,
      trail.max_rating,
      trail.address,
      trail.description,
      trail.image_url
    ));

    // Output or process trails array
    console.log(JSON.stringify(trails, null, 2));
  })
  .catch(error => {
    console.error('Error fetching trail data:', error);
  });
