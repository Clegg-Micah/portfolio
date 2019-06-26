function createCharact(event) {
    //Character Creation
    event.preventDefault;
    //collect data from form
    var charName = document.getElementById("create-name").value;
    console.log(charName);
    var charClass = document.getElementById("create-class").value;
    console.log("Character Information: Name: ", charName, " Class: ", charClass);
}
