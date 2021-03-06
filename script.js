const player1Name = "Player One";
const player2Name = "Player Two";
let p1Value = -1;
let p2Value = -1;
const dice = [
                "fa-dice-one","fa-dice-two","fa-dice-three",
                "fa-dice-four","fa-dice-five","fa-dice-six",
                "fa-dice"
            ];


const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");
const dice1ITag = document.querySelector(".dice1 i");
const dice2ITag = document.querySelector(".dice2 i");
const p1Btn = document.querySelector(".btn1");
const p2Btn = document.querySelector(".btn2");
const winnerTag = document.querySelector(".winner");
const diceAgainBtn = document.querySelector(".diceAgainBtn");
const winnerIcon = document.querySelector(".winnerIcon");



const dicing = () => {
    const random = Math.floor(Math.random()*dice.length);
    return random>5 ? 5 : random;
};

const removeClass = ( tagName , className) => {
    tagName.classList.remove(className);
};

const addClass = ( tagName , className ) => {
    tagName.classList.add(className);
};

const adjustOpacity = ( tagName , oValue ) => {
    tagName.style.opacity = oValue;
}

const removeAndAddClass = ( tagName , className ) => {
    for ( let id=0 ; id < dice.length ; id++ ) {
        if ( tagName.classList.contains(dice[id]) ) {
            tagName.classList.remove(dice[id]);
            break;
        }
    }
    tagName.classList.add(className);
};

const hideElement = ( tagName ) => {
    tagName.style.visibility = "hidden";
}

const unhideElement = ( tagName ) => {
    tagName.style.visibility = "visible";
}

p1Btn.addEventListener("click",() => {
    p1Value = dicing();
    removeAndAddClass(dice1ITag,dice[p1Value]);
    if ( p2Value !== -1 ) {
        winnerTag.textContent = finalResult( p1Value,p2Value,player1Name,player2Name);
    }
    addClass(dice1ITag,"rotateDice");
});

p2Btn.addEventListener("click",() => {
    p2Value = dicing();
    removeAndAddClass(dice2ITag,dice[p2Value]);
    if ( p1Value !== -1 ) {
        winnerTag.textContent = finalResult( p1Value,p2Value,player1Name,player2Name);
    }
    addClass(dice2ITag,"rotateDice");
});

diceAgainBtn.addEventListener("click",() => {
    p1Value=-1;
    p2Value=-1;
    removeAndAddClass( dice1ITag,dice[6]);
    removeAndAddClass( dice2ITag,dice[6]);
    removeClass(dice1ITag,"rotateDice");
    removeClass(dice2ITag,"rotateDice");
    winnerTag.textContent = "Waiting for winnner!";
    hideElement(diceAgainBtn);
    hideElement(winnerIcon);
    adjustOpacity(player1,"1");
    adjustOpacity(player2,"1");
    
});

const finalResult = ( p1 , p2 , p1Name , p2Name ) => {
    unhideElement(diceAgainBtn);
    unhideElement(winnerIcon);
    if ( p1===p2 ) hideElement(winnerIcon);
    else if ( p1 > p2 ) adjustOpacity(player2,"0.5");
    else if ( p1 < p2 ) adjustOpacity(player1,"0.5");
    return p1>p2 ? p1Name + " is the winner!" : p1===p2 ? "It's draw!" : p2Name + " is the winner!";
}