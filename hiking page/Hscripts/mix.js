// Global variables
let loadingMore = false;
let totalContainers = 0;
const maxContainers = 20;

// ... your createTrail and loadTrails functions ...

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

// Initial load
window.addEventListener("load", () => {
    for (let i = 0; i < 10 && totalContainers < maxContainers; i++) {
        createNewContainer();
    }
});

// Infinite scroll
window.addEventListener("scroll", () => {
    if (!loadingMore && totalContainers < maxContainers) {
        let scrolledTo = window.scrollY + window.innerHeight;
        let pageHeight = document.documentElement.scrollHeight;

        if (scrolledTo >= pageHeight - 1) {
            loadingMore = true;
            setTimeout(() => {
                for (let i = 0; i < 5 && totalContainers < maxContainers; i++) {
                    createNewContainer();
                }
                loadingMore = false;
            }, 250);
        }
    }
});
