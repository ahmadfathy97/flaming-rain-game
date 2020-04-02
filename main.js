let player,
    flame,
    flames = [],
    end = false,
    score = 0,
    paused = true,
    funnyYells = [
      "اوعي كده",
      "حاسب كده",
      "عديني انا بس كده",
      "حاسب ام الطوباااا",
      "وسع كده",
      "مشيني انا بس كده"
    ];


let scoreElem = document.getElementById('score');
let fnycmnts = document.getElementById('funny-comments');
let gameOver = document.getElementById('game-over');
let finalScore = document.getElementById('final-score');
let rstbtn = document.getElementById('restart');

// start function
function start() {
  setTimeout(()=>{
    loop();
    paused = false
  }, 1000);
}


// creating the canvas and starting the game
function setup() {
  window.onresize = ()=>{
    createCanvas(innerWidth - 20, innerHeight - 20);
  }
  createCanvas(innerWidth - 20 , innerHeight- 20);
  noLoop();
  start();
  player = new Player((width/2) -40,height - 40, 40, 40);
  let randX = Math.floor(random(width)),
      randY = Math.floor(random(-150));
}

// creating new flames
setInterval(function(){
  if(!end && !paused){
    let randX = Math.floor(random(width)),
    randY = Math.floor(random(-150));

    flame = new Flame(randX, randY);
    flames.push(flame);
    if(flames.length > 150){
      flames = [...flames.slice(10, flames.length)]
    }
  }
}, 160);

// showing some funny comments
setInterval(function(){
  if(!end && !paused){
    fnycmnts.textContent = funnyYells[Math.floor(Math.random() * funnyYells.length)]
  }
}, 3000);

// keys control
function keyPressed(){
  if (keyCode === LEFT_ARROW){
    player.setMove(-3, 0)
  } else if(keyCode === RIGHT_ARROW){
    player.setMove(3, 0)
  } else if(keyCode === UP_ARROW){
    player.setMove(0, -3)
  } else if(keyCode === DOWN_ARROW){
    player.setMove(0, 3)
  }
}



// for mouse and touch
var dragging = false;
var rollover = false;
var offsetX, offsetY;

function mousePressed() {
  if (mouseX > player.x && mouseX < player.x + player.w && mouseY > player.y && mouseY < player.y + player.h) {
    dragging = true;
    offsetX = player.x-mouseX;
    offsetY = player.y-mouseY;
  }
}
function mouseReleased() {
  dragging = false;
}

function draw() {

  // for mouse and touch
  if (mouseX > player.x && mouseX < player.x + player.w && mouseY > player.y && mouseY < player.y + player.h) {
    rollover = true;
  }
  else {
    rollover = false;
  }
  if (dragging) {
    player.x = mouseX + offsetX;
    player.y = mouseY + offsetY;
  }

  //drawing the player and the flames
  background(220);
  player.show();
  player.move();
  flames.forEach((flame) => {
    flame.show();
    flame.down();
    if(flame.end(player.x, player.y)){
      noLoop();
      end = true;
      GameOverFn();
    }
  });

  // if player hit the walls
  if(player.killed(width, height)){
    noLoop();
    end = true;
    GameOverFn();
  }
  // increament the score by 5
  scoreElem.textContent = Math.round(score += 5);
}

// ending the game and show the score
function GameOverFn() {
  gameOver.style.display = "flex";
  finalScore.textContent = score
}

//restart btn
rstbtn.onclick = function(){
  gameOver.style.display = "none";
  score = 0;
  end= false;
  player = new Player((width/2) -40,height - 40, 40, 40);
  flames = [];
  loop();
}

// when the player click outside the game window, He will pause the game.
window.onblur = ()=>{
  if(!end){
    noLoop();
    paused = true;
  }
}

// when the player click return to the game, The game will be resumend after 1 second.
window.onfocus = ()=>{
  if(!end){
    start()
  }
}
