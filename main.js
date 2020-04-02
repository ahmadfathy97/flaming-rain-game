let player, flame,flames = [],end = false,score = 0,
funnyYells = [
  "اوعي كده",
  "حاسب كده",
  "عديني انا بس كده",
  "حاسب ام الطوباااا",
  "وسع كده"
];


let scoreElem = document.getElementById('score');
let fnycmnts = document.getElementById('funny-comments');
let gameOver = document.getElementById('game-over');
let finalScore = document.getElementById('final-score');
let rstbtn = document.getElementById('restart');

var dragging = false;
var rollover = false;
var offsetX, offsetY;


function setup() {
  window.onresize = ()=>{
    createCanvas(innerWidth - 20, innerHeight - 20);
  }
  createCanvas(innerWidth - 20 , innerHeight- 20);

  player = new Player((width/2) -40,height - 40, 40, 40);
  let randX = Math.floor(random(width)),
      randY = Math.floor(random(-150));
}
let interval = setInterval(function(){
  if(!end){
    let randX = Math.floor(random(width)),
    randY = Math.floor(random(-150));

    flame = new Flame(randX, randY);
    flames.push(flame);
    if(flames.length > 150){
      flames = [...flames.slice(10, flames.length)]
    }
  }
}, 160);

let interval2 = setInterval(function(){
  if(!end){
    fnycmnts.textContent = funnyYells[Math.floor(Math.random() * funnyYells.length)]
  }
}, 3000);
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



/////////////////
// for mobile

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

/////////////////////////

function draw() {
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

  stroke(0);
  if (dragging) {
    fill (50);
  } else if (rollover) {
    fill(100);
  } else {
    fill(175, 200);
  }
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
  if(player.killed(width, height)){
    noLoop();
    end = true;
    GameOverFn();
  }
  scoreElem.textContent = Math.round(score += 5);
}


function GameOverFn() {
  gameOver.style.display = "flex";
  finalScore.textContent = score
}

rstbtn.onclick = function(){
  gameOver.style.display = "none";
  score = 0;
  end= false;
  player = new Player((width/2) -40,height - 40, 40, 40);
  flames = [];
  loop();
}
