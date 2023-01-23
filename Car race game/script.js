"use Strict"

const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');



startScreen.addEventListener('click', start);
let player = { speed : 10 , score : 0};



let keys = { ArrowUp : false , ArrowDown : false , ArrowLeft : false , ArrowRight : false }

document.addEventListener('keydown', keyDown)
document.addEventListener('keyup', keyUp)

function keyDown(e){
    e.preventDefault();
    keys[e.key] = true;
    // console.log(e.key);
    console.log(keys)
}
function keyUp(e){
    e.preventDefault();
    keys[e.key] = false;
    // console.log(e.key);
    console.log(keys)
}

function isCollide(a,b){
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
}

function moveLines(){
    let lines = document.querySelectorAll('.lines');
    lines.forEach(function(item){
        if(item.y > 750){
            item.y -= 750;
        }
        item.y += player.speed;
        item.style.top = item.y  + "px";
    })
}

function endGame(){
    player.start = false;
    startScreen.classList.remove('hide')
    startScreen.innerHTML = "Game Over <br> Your final Score is : " + player.score +"<br> Press Here to Restart Game"
}

function moveEnemy(car){
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function(item){

        if(isCollide(car, item)){
            endGame();
        }
        if(item.y > 750){
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 350  ) + "px";
        }
        item.y += player.speed;
        item.style.top = item.y  + "px";
    })
}

function gamePlay(){
    console.log('afjo');
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();
    if(player.start){

        moveLines();
        moveEnemy(car);
        if(keys.ArrowUp && player.y > (road.top + 80)){ player.y -= player.speed};
        if(keys.ArrowDown && player.y < (road.bottom - 85)){ player.y += player.speed};
        if(keys.ArrowLeft && player.x > 0){ player.x -= player.speed};
        if(keys.ArrowRight && player.x < (road.width - 65)){ player.x += player.speed};

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";

        window.requestAnimationFrame(gamePlay);

        player.score++;
        let ps = player.score - 1;
        score.innerText = "Score : " + ps;

        if(player.score > 500){
            player.speed = 12;
        }else if(player.score > 1000){
            player.speed = 14;
        }else if(player.score > 1500){
            player.speed = 16;
        }else if(player.score > 2000){
            player.speed = 18;
        }else if(player.score > 2500){
            player.speed = 20;
        }else{
            player.speed = 10;
        }
    }
    
    
}

function start(){
    // gameArea.classList.remove('hide')
    startScreen.classList.add('hide')
    gameArea.innerHTML = "";
    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay)


    for( x=0; x < 5; x++){
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'lines');
        roadLine.y = ( x*150);
        roadLine.style.top = roadLine.y  + "px";
        gameArea.appendChild(roadLine);
    }

    

    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    for( x=0; x < 3; x++){
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class', 'enemy');
        enemyCar.y = ((x+1) * 350) * -1;
        enemyCar.style.top = enemyCar.y  + "px";
        enemyCar.style.Color = randomColor();
        enemyCar.style.left = Math.floor(Math.random() * 350  ) + "px";
        gameArea.appendChild(enemyCar);
    }
}

function randomColor(){
    function c(){
        let hex = Math.floor(Math.random() * 256).toString(16);
        return ( "0" + String(hex)).slice(1);
    }
    return "#" + c()+c()+c();
}
