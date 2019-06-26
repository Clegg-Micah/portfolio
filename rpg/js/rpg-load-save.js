//Load and save
function loadGame() {
    character = loadCharacter();
    console.log("Loaded character", character);
}
function saveGame(character) {
    save(character);
    console.log("Game Saved");
}
/* loadJSON -- Modified from w3schools*/
function loadJSONDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById("display").innerHTML = this.responseText;
            return JSON.parse(this.responseText);
        }
    };
    xhttp.open("GET", "json/rpg-data.json", true);
    xhttp.send();
}

/* save to localStorage */
function save(character) {
    localStorage.setItem("savedCharacter", JSON.stringify(character));
    var saved = localStorage.getItem("savedCharacter", "character");
    console.log("Saved character: ", saved);
    if (character === saved) {
        console.log("character saved successfully!");
    }
}
/* load from localStorage */
function loadCharacter() {
    var savedCharacter = localStorage.getItem("savedCharacter", "character");
    return savedCharacter;
}

//Menu stuff
