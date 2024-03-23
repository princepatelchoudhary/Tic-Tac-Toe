const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".gameInfo");
const newGameBtn=document.querySelector(".btn");

let currentPlayer;
let gameGrid;
let winningPosition=[
    [0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]
]
initGame();

//initialise game
function initGame(){
    currentPlayer = 'X';
    gameGrid =["","","","","","","","",""];

    boxes.forEach((box)=>{
        box.innerHTML="";
        box.style.pointerEvents='all'
        box.classList.remove('win');
    })

    newGameBtn.classList.remove('active');
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}
boxes.forEach((box,index)=>{
    box.addEventListener('click',()=>{
        handleClick(index);
    })
})

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer="O";
    }
    else{
        currentPlayer="X"
    }
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    // newGameBtn.classList.add("active");
    let ans="";
    winningPosition.forEach((index)=>{
        if(gameGrid[index[0]]!=="" && gameGrid[index[0]] === gameGrid[index[1]] && gameGrid[index[2]] === gameGrid[index[1]])
        {
            if(gameGrid[index[0]]==="X")
                ans="X";
            else
                ans="O";
            boxes[index[0]].classList.add("win");
            boxes[index[1]].classList.add("win");
            boxes[index[2]].classList.add("win");

            boxes.forEach((box)=>box.style.pointerEvents="none")
        }
    });
    if(ans!==""){
        gameInfo.innerHTML=`Winner Player - ${ans}`;
        newGameBtn.classList.add("active");
        return;
    }

    //when no winner and game tied
    let count=0;
    gameGrid.forEach((box)=>{
        if(box===""){
            count=1;
            return;
        }
    })
    if(!count){
        gameInfo.innerHTML="Game Tied !"
        newGameBtn.classList.add("active");
    }
}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerHTML=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";
        //swap turn
        swapTurn();
        //winning
        checkGameOver();
    }
}

newGameBtn.addEventListener('click',initGame);