let words = ["randomwordsfromstackoverflow", "jumble", "easy", "difficult", "answer",  "xylophone"];

let idIterator = 0;
let loadingMore = false;

// This creates a unique id name for each div
function idCreator() {
    idIterator += 1;
    return "containerNo" + idIterator;
}

// This finds a random item in the list and will change the contents of the div to have that word
//each new div has a new word, this means when we want to pull random locations from the list, it should work without a problem.
function createRandomWord(currentDiv) {
    currentDiv.id = idCreator();
    let currentWord = words[Math.floor(Math.random()*words.length)];
    document.getElementById(currentDiv.id).textContent = currentWord;
}

//This is the function that is first run when you want to make a new div
function createNewContainer() {

    let nextDivContainer = document.createElement("div");
    
    // more divs could be made, just make sure to adjust the stylesheet accordingly.
    let nextRightDiv = document.createElement("div");
    let nextLeftDiv = document.createElement("div");
    nextDivContainer.className = "container";
    nextLeftDiv.className = "left";
    nextRightDiv.className = "right";

    nextDivContainer.append(nextLeftDiv);
    nextDivContainer.append(nextRightDiv);
    document.getElementById("wrapper").append(nextDivContainer)
    createRandomWord(nextRightDiv);
    createRandomWord(nextLeftDiv);


}

// When the page first loads, itll load this many bars
window.addEventListener("load", () => {
    for (let i = 0; i < 10; i++) {
        createNewContainer();
    }
});

//This is the 
window.addEventListener("scroll", () => {
    // this ensures that while the timeout is active, you cannot access contents of the if statement to make more pages
    //when the timeout finishes,it runs the contents of it, giving you more pages and setting loading more to false letting you
    //create more pages
    if (!loadingMore) {

        let scrolledTo = window.scrollY + window.innerHeight;

        let pageHeight = document.documentElement.scrollHeight;

        if (scrolledTo >= pageHeight - 1) {
            loadingMore = true;

            //This is a enforced delay for how much info can be generated per scroll, a time limit cap per scroll.
            setTimeout(() => {
                for (let i = 0; i < 5; i++) {
                    createNewContainer();
                }
                loadingMore = false;
            //Adjust this value for how long the delay should be (in ms)
            }, 250); 
        }
    }
});
