//set counter and checker
let previous = 0;
let found = 0;
let movNum = 0; 
let running = false;
let timer;
let startTime, endTime;
let click = 0;


//record start time
function start() {
    startTime = new Date();
};

//create card ID array and correlate with the content
let cardID = ["1A","1B","2A","2B","3A","3B","4A","4B","5A","5B","6A","6B","7A","7B","8A","8B"];
let dict = {};

//card content = html symbol which is mapped using cardID
function createCardContent () {
    let cardkey;
    let unique;
    let rep = false;
    for (let j=0; j<8; j++) {
        cardkey = cardID[2*j][0];
        //make sure symbols chosen are uniquely random
        while (true) {
            unique = "&#"+(9727+Math.floor(Math.random()*255)+j);
            if (Number(cardkey) > 0) {
                for (key in dict) {
                    if (unique === dict[key]){
                        rep = true;
                        break;
                    }
                }
            } 
            if (rep === false) {
                break;
            }
        }
        dict[cardkey] = unique;
        //the following code still could result in duplicates
        // unique = "&#"+(9727+Math.floor(Math.random()*255)+j);
        // if (key === 0 || dict[key-1] != unique) {
        //     dict[key] = unique;
        // }
        // else {
        //     j = j-1;
        // }        
    }
}

createCardContent();


//shuffle card ID function (need to provide source)
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  shuffle(cardID);

//create 16 div elements
let cardDeck = document.getElementById("card_deck");


function createDiv() {
    for (let n=0; n<4; n++) {
        let row = document.getElementById("row"+n);
        for (let i=0; i<4; i++) {
            let newDiv = document.createElement("div");
            newDiv.id = cardID[n*4+i];
            newDiv.className = "cards";
            newDiv.value = 0;
            row.appendChild(newDiv);
            newDiv.onclick = function (){
                if (click === 0) {
                    start();
                    click = 1;
                }
                if (running === false) {
                    Click(newDiv);
                    recordClick(newDiv);
                    rating();
                }
            }
        }
    }
}
createDiv();

//What happens when a cell is clicked
function Click (card) {
    //if this card is not opened already
    if (card.value === 0) {
        //if no card is opened before it
        if (previous === 0) {
            //set card style when it is flipped
            openStyle(card);
            //record the card info in the variable
            previous = card.id;
        }
        //if there is a card opened before it
        else {
            movNum = movNum + 1;
            let current = card.id;
            //check if current card id matches with previous card id
            //if so, keep both cards open and update found
            if (current[0] === previous[0]) {
                found = found + 1;
                openStyle(card);
                previous = 0;
            }
            //if not, then show both card for sometime and close both cards
            else {
                openStyle(card);
                let preCard = document.getElementById(previous);
                running = true;
                timer = setTimeout(function () {closeCards(card,preCard); running = false;},500);
                //update to indicate no card is opened
                previous = 0;
            }
        }
    }
    
}

//set styles for cards opened
function openStyle (card) {
    //change background from black to blue
    card.style.backgroundColor = "beige";
    //show innerHTML element
    card.innerHTML = dict[card.id[0]];
    //if won, pop up message
    setTimeout(function () {ifWin();},0);
}

//close both cards once not matched
function closeCards (card1, card2) {
    //set background color back to black
    card1.style.backgroundColor = "lightsteelblue";
    card2.style.backgroundColor = "lightsteelblue";
    //set card value to 0 to reflect the closed state
    card1.value = 0;
    card2.value = 0;
    //set innerHTML to transparent
    card1.innerHTML = "<span style='color: transparent;'>"+dict[card1.id[0]]+"</span>";
    card2.innerHTML = "<span style='color: transparent;'>"+dict[card2.id[0]]+"</span>";
}

//count number of click on an element
//also prevents counting moves when click a card that is already opened
function recordClick (div) {
    if (div.value === 0) {
        div.value = 1;
    }
}

//set user performance
function rating() {
    //check number of moves and decide on performance
    if (movNum<=14) {
        //3 stars for perf
        document.getElementById("stars").innerHTML = "&#9733 &#9733 &#9733 3 Stars";
    }
    else if (movNum<=22 && movNum > 14) {
        //2 stars for perf
        document.getElementById("stars").innerHTML = "&#9733 &#9733 &#9734 2 Stars";
    }
    else {
        //1 star for perf
        document.getElementById("stars").innerHTML = "&#9733 &#9734 &#9734 1 Star";
    }
}

// Get the modal
let modal = document.getElementById('myModal');
let modalcontent = document.getElementById("modalcontent");

//check if the game won
function ifWin () {
    if (found === 8) {
        endTime = new Date();
        let duration = Math.round((endTime - startTime)/1000);
        //modal pops out
        modalcontent.innerHTML = "You won! "+document.getElementById("stars").innerHTML+". Total time: "+duration+"s. Another game?";
        modal.style.display = "block";
    }
}

//refresh page when refresh is clicked
let refresh = document.getElementById("refresh");
refresh.onclick = function () {location.reload();}

//modal action
//the following code is based on W3School


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// When user chooses to not start another game
let btnC = document.getElementById("nonewgame");
btnC.onclick = function () {
    modal.style.display = "none";
}

// When user starts another game
let btnA = document.getElementById("newgame");
btnA.onclick = function () {
    location.reload();
}