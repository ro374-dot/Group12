// scripts/apod.js
fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('apod-container');
    if (!container) return;
    if (data.media_type === 'image') {
      container.innerHTML = `
        <h2>${data.title}</h2>
        <img src="${data.url}" alt="${data.title}" />
        <p>${data.explanation}</p>
        <p><em>Date: ${data.date}</em></p>
      `;
    } else if (data.media_type === 'video') {
      container.innerHTML = `
        <h2>${data.title}</h2>
        <iframe width="560" height="315" src="${data.url}" frameborder="0" allowfullscreen></iframe>
        <p>${data.explanation}</p>
        <p><em>Date: ${data.date}</em></p>
      `;
    }
  })
  .catch(error => {
    const container = document.getElementById('apod-container');
    if (container) {
      container.innerHTML = '<p>Error loading data.</p>';
    }
    console.error('Error fetching NASA APOD:', error);
  });
