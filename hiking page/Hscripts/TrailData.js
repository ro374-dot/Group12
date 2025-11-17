// trailData.js

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

// Example usage with multiple trails
const trails = [
  createTrail(
    "Fatmans Loop Trail",
    4.6,
    5,
    "5098 US-89, Flagstaff, AZ 86004",
    "Walking trail featuring scenic overlooks with city views, volcanic rock formations & more.",
    "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSwH6VkEwE8i181Qw5Zupwk18u3sG4EC8R2cigvpUVkL2PiMpXEjBIIvMuafj2MJ80YFQ1VGI058T3-_vQ76Vj6YvJXlMSJtLnZH7wU11obtnvWWxqw_hTumuiUkaQCD5ZT6Oc0eQQ=s680-w680-h510-rw"
  ),
  // Add more trails here
  createTrail(
    "Another Trail Name",
    4.2,
    5,
    "123 Trail Rd, Somewhere, AZ 85001",
    "Description of another trail.",
    "https://example.com/image.jpg"
  )
];

// Output the array as JSON string (for example, to send via API or save to a file)
console.log(JSON.stringify(trails, null, 2));
