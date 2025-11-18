// Function to generate a random position within the container
function getRandomPosition(containerWidth, containerHeight, elementSize) {
    const x = Math.random() * (containerWidth - elementSize);
    const y = Math.random() * (containerHeight - elementSize);
    return { x, y };
}

// Modified loadTrails function to spawn squares randomly
function loadTrails(container) {
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

            // Get container dimensions
            const containerWidth = container.clientWidth;
            const containerHeight = container.clientHeight;
            const squareSize = 50; // size of each square in pixels

            trails.forEach(trail => {
                const trailDiv = document.createElement('div');
                trailDiv.className = 'trail-square';

                // Assign random position
                const pos = getRandomPosition(containerWidth, containerHeight, squareSize);
                trailDiv.style.position = 'absolute';
                trailDiv.style.width = `${squareSize}px`;
                trailDiv.style.height = `${squareSize}px`;
                trailDiv.style.left = `${pos.x}px`;
                trailDiv.style.top = `${pos.y}px`;
                trailDiv.style.backgroundColor = getRandomColor();

                // Optional: add tooltip or click event to show trail info
                trailDiv.title = trail.trail_name;

                container.appendChild(trailDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching trail data:', error);
            const errorMsg = document.createElement('p');
            errorMsg.innerText = 'Failed to load trail data.';
            container.appendChild(errorMsg);
        });
}

// Helper function to generate a random color
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}
// ... your getRandomPosition, loadTrails, getRandomColor functions ...

window.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('wrapper'); // ensure this matches your HTML
  loadTrails(container);
});
