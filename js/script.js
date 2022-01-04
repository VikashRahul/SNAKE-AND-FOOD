// Game Constants & Variables
let inputDir = {x: 0, y: 0};    /* initial direcn of snake*/
const foodSound = new Audio('assets/food.mp3');
const gameOverSound = new Audio('assets/gameover.mp3');
const moveSound = new Audio('assets/move.mp3');
const musicSound = new Audio('assets/music.mp3');
let speed = 10;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [    //snake array for head of snake
    {x: 13, y: 15}
];
 
food = {x: 6, y: 7};  //not an array

// Game Functions
function main(ctime) {   //current time
    window.requestAnimationFrame(main);   //call this function continuously and no flickering
    //console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){  //to check when last time the screen is painted -- lastpainttime(in mm)
        return;
    }
    lastPaintTime = ctime;
    gameEngine();   //to run the game
}

function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}

function gameEngine(){
    // Part 1: Updating the snake array & Food
    if(isCollide(snakeArr)){  //if collapse
        gameOverSound.play();
        musicSound.pause();
        inputDir =  {x: 0, y: 0}; 
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0; 
    }

    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        foodSound.play();
        score += 1;
        if(score>highscoreval){
            highscoreval = score;
            localStorage.setItem("highscore", JSON.stringify(highscoreval));
            highscoreBox.innerHTML = "HighScore: " + highscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
          //to create random food b/w a and b
    }

    // Moving the snake  , each segment replaces its previous one
    for (let i = snakeArr.length - 2; i>=0; i--) {  //opposite for loop
        snakeArr[i+1] = {...snakeArr[i]}; //refrencing problem..so new object
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake and Food

    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;   //adding css to add at row no. y
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head'); //creating a class
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}


// Main logic starts here
musicSound.play();
let highscore = localStorage.getItem("highscore");
if(highscore === null){
    highscoreval = 0;
    localStorage.setItem("highscore", JSON.stringify(highscoreval))
}
else{
    highscoreval = JSON.parse(highscore);
    highscoreBox.innerHTML = "HighScore: " + highscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{ //if keydown button pushed
    inputDir = {x: 0, y: 1} // Start the game
    moveSound.play();
    switch (e.key) {   //event to check which button is pressed
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;   //decreasing if its goes up
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});