// Game Constants 
let inputdir = { x: 0, y: 0 };
const foodaudio = new Audio('../music/food.mp3');
const gameoversound = new Audio('../music/gameover.mp3');
const move = new Audio('../music/move.mp3');
const music = new Audio('../music/music.mp3');
let score = 0;
let speed = 10;
let lastPaintTime = 0;
let SnakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 }
// Game Functions 
let main = (ctime) => {
    window.requestAnimationFrame(main)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) return;
    lastPaintTime = ctime;
    gameengine();

}
function iscollide(sarr) {
    for (let i = 1; i < sarr.length; i++) {
        // if snake bumps into himself 
        if (sarr[0].x === sarr[i].x && sarr[0].y === sarr[i].y) {
            return true
        }
    }
    // if snake touches any of the 4  walls }
    if (sarr[0].y <= 1 || sarr[0].y >= 18 || sarr[0].x <= 1 || sarr[0].x >= 18) {
        return true
    }

}
function gameengine() {
    // Part 1: updating the snake array and food
    if (iscollide(SnakeArr)) {
        gameoversound.play();
        music.pause();
        inputdir = { x: 0, y: 0 };
        alert('Game Over.Press any Key to play again!')
        SnakeArr = [{ x: 13, y: 15 }]
        music.play();
        score = 0;
    }
    // If Food is eaten increment the score and regenerate the food  
    if (SnakeArr[0].x === food.x && SnakeArr[0].y === food.y) {
        foodaudio.play();
        SnakeArr.unshift({ x: SnakeArr[0].x + inputdir.x, y: SnakeArr[0].y + inputdir.y })
        // let a = 2;
        // let b = 16;
        food = { x:Math.round((Math.random()*14)+2),y:Math.round((Math.random()*14)+2)}
        score++
        myscore.innerHTML = ` Score: ${score}`;
        if (score > highscore) {
            highscore = score;
            localStorage.setItem('highscore', highscore)
            hiscore.innerHTML = `HighScore:${highscore}`
        }
    }

    //Moving the snake
    for (let i = SnakeArr.length - 2; i >= 0; i--) {
        SnakeArr[i + 1] = { ...SnakeArr[i] };


    }

    SnakeArr[0].x += inputdir.x;
    SnakeArr[0].y += inputdir.y;



    //Part 2:Render/Display the snake 
    board.innerHTML = '';
    SnakeArr.forEach((e, index) => {
        snakeelement = document.createElement('div');
        if (index === 0) {
            snakeelement.classList.add('head');
        }
        else {
            snakeelement.classList.add('snake');

        }
        snakeelement.style.gridRowStart = e.y;
        snakeelement.style.gridColumnStart = e.x;
        board.appendChild(snakeelement);
    })
    // Display the Food 
    Foodelement = document.createElement('div');
    Foodelement.classList.add('food');
    Foodelement.style.gridRowStart = food.y;
    Foodelement.style.gridColumnStart = food.x;
    board.appendChild(Foodelement);


}
let highscore = localStorage.getItem('highscore');
if (highscore === null) {
    highscore = 0;
    localStorage.setItem('highscore', highscore)
}
else {
    hiscore.innerHTML = `HiScore:${highscore}`;
}


// Main logic starts here 
window.requestAnimationFrame(main);
window.addEventListener('keydown', ({ key }) => {
    // start the game
    inputdir = { x: 0, y: 1 }
    move.play();
    music.play();

    switch (key) {
        case 'ArrowUp':
            console.log('ArrowUP')
            inputdir.y = -1;
            inputdir.x = 0;
            break;
        case 'ArrowDown':
            console.log('ArrowDown')
            inputdir.y = 1;
            inputdir.x = 0;
            break;
        case 'ArrowLeft':
            console.log('ArrowLeft')
            inputdir.y = 0;
            inputdir.x = -1;
            break;
        case 'ArrowRight':
            console.log('ArrowRight')
            inputdir.y = 0;
            inputdir.x = 1;
            break;
        default:
            break;
    }




})












