//Selecting Elements
var CARDOUTPUT = document.getElementById("jsoutput");
var TABLE = document.getElementById("table");
//logic
var deck;
var deck_shuffled;
//var cardOutput = document.createElement("div");
var alertMessage = "Javascript Loaded!";
var suits = ["Spades", "Hearts", "Clubs", "Diamonds"];
var perSuit = 13;

//Constructor
function Card(value, suit) {
    console.log("Card function called.");
    //TODO make type catcher setting default did not work.
    this.value = value;
    this.suit = suit;
    if (value === 1) {
        this.type = "Ace";
    } else if (value < 11) {
        this.type = "Number";
    } else {
        switch (value) {
            case 11:
                this.type = "Jack";
                break;
            case 12:
                this.type = "Queen";
                break;
            case 13:
                this.type = "King";
                break;
            default:
                this.type = undefined;
                console.warn("Invalid Card Value: " + value);
        }
    }
    if (suit === "Hearts" || suit === "Diamonds") {
        this.color = "Red";
    } else {
        this.color = "Black";
    }
}

//Stack implementation from initjs.org
var Stack = function() {
    this.count = 0;
    this.storage = {};
}

// Adds a value onto the end of the stack
Stack.prototype.push = function(value) {
    this.storage[this.count] = value;
    this.count++;
}

// Removes and returns the value at the end of the stack
Stack.prototype.pop = function() {
    // Check to see if the stack is empty
    if (this.count === 0) {
        return undefined;
    }

    this.count--;
    var result = this.storage[this.count];
    delete this.storage[this.count];
    return result;
}

// Returns the length of the stack
Stack.prototype.size = function() {
    return this.count;
}
//End Stack functions


function Hand {
    this.count = 0;
}

function buildDeck() {
    var cards = [];
    var card = 1;
    for (var x = 0; x < suits.length; x++) {
        for (var y = 0; y < perSuit; y++) {
            cards.push(new Card(y + 1, suits[x]));
        }
    }
    return cards;
}

function displayDeck(deck, destination) {
    console.log("displayDeck function called.");
    console.log(deck);
    var deckList = "";
    for (var x = 0; x < deck.length; x++) {
        deckList += displayCard(deck[x]);
    }
    console.log(deckList);
    destination.innerHTML = deckList;
}

function displayCardText(card) {
    var text = '';
    var x;
    if (card.type.toLowerCase() == "number") {
        text += card.value + " of " + card.suit;
    } else {
        text += card.type + " of " + card.suit;
    }
    text += ", ";
    return text;
}

function displayCard(card) {
    var cardface = '<div class="card ';
    cardface += ' ' + card.suit.toLowerCase();
    cardface += ' ' + card.color.toLowerCase() + '-card';
    cardface += '">';
    if (card.type.toLowerCase() == "number") {
        cardface += card.value;
    } else {
        cardface += card.type;
    }
    cardface += " of " + card.suit;
    cardface += "</div> ";
    console.log(cardface);
    return cardface;
}

function shuffle(array) {
    console.log("shuffle function called.");
    var currentIndex = array.length;
    var temporaryValue;
    var randomIndex;
    var newArray = array.slice();
    //while there are elements to shuffle...
    while (0 !== currentIndex) {

        //Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // Swap it with the current element.
        temporaryValue = newArray[currentIndex];
        newArray[currentIndex] = newArray[randomIndex];
        newArray[randomIndex] = temporaryValue;
    }
    console.log("Shuffled Array: ", newArray);
    return newArray;
}
/*
    TODO Create a function which displays the deck as a set of cards stored in divs.
*/
alert(alertMessage);
deck = buildDeck();
displayDeck(deck, CARDOUTPUT);
deck_shuffled = shuffle(deck);
displayDeck(deck_shuffled, TABLE);
