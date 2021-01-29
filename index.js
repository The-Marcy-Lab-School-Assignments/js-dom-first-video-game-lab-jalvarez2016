class Particles{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.XrepelForce = Math.random() * 20 -10;
    this.YrepelForce = Math.random() * 20 -10;
    this.particle = null
  }

  createParticle() {
      const particle =  document.createElement("div");
      this.particle = particle;
      particle.style.position = "absolute";
      particle.style.top = `${this.x}px`;
      particle.style.left = `${this.y}px`;
      particle.style.width = "10px";
      particle.style.height = "10px";
      particle.className = "particle";
      particle.style.backgroundColor = "#" + Math.floor(16777215 * Math.random()).toString(16);
      document.querySelector("#game").appendChild(particle)
  }

  display() {
      const particle = this.particle;
      particle.style.top = `${this.x}px`;
      particle.style.left = `${this.y}px`;
  }

  fall(){
    console.log("falling");
    this.x += this.XrepelForce;
    this.y += this.YrepelForce;
    if(this.x + 10 > 350 || this.x < 0 || this.y < 0 || this.y + 10 > 350){
      this.particle.remove();
    } else {
      this.display();
    }
  }
}

let square = document.getElementById("square");
let squareStyle = square.style;
let enemyBtn = document.getElementById("mkEnemy");

let moves = {
  up: false,
  down: false,
  left: false,
  right: false
}

const movementHandler = setInterval(()=>{
  move()
}, 50);

function move(){
  // console.log(moves);
  let left = parseInt(squareStyle.left.replace("px", "")); //gets the int from the square left style
  let squareTop = parseInt(squareStyle.top.replace("px", "")); //gets the int from the square top style
  if(moves["up"]){    
    if( squareTop - 10 < 0){
      squareStyle.top = `0px`;
    } else {
      squareStyle.top = `${squareTop - 10}px`;
    }
  }
  if(moves["left"]){    
    if(left - 10 < 0){
      squareStyle.left = `0px`;
    } else {
      squareStyle.left = `${left - 10}px`;
    }
  }
  if(moves["right"]){
    if(left >= 300){
      squareStyle.left = `300px`;
    } else {
      squareStyle.left = `${left + 10}px`;
    }
  }
  if(moves["down"]){
    if(squareTop >= 300){
      squareStyle.top = `300px`;
    } else {
      squareStyle.top = `${squareTop + 10}px`;
    }
  }
  
  if(checkEnemyCollision().length > 0){
    destroyEnemy(checkEnemyCollision());
  }
}

function updateKeys(e){
  if (e.key === "ArrowUp") {
    moves["up"] = true
  } else if (e.key === "ArrowLeft") {
    moves["left"] = true;
  } else if (e.key === "ArrowRight") {
    moves["right"] = true;
  } else if (e.key === "ArrowDown") {
    moves["down"] = true;
  }
  // console.log(`updated: ${moves}`)
  // console.log(checkEnemyCollision());
  if(checkEnemyCollision().length > 0){
    destroyEnemy(checkEnemyCollision());
  }
}

function deactivateKeys(e){

  if (e.key === "ArrowUp") {
    moves["up"] = false;
  } else if (e.key === "ArrowLeft") {
    moves["left"] = false;
  } else if (e.key === "ArrowRight") {
    moves["right"] = false;
  } else if (e.key === "ArrowDown") {
    moves["down"] = false;
  }
  // console.log(`deactived: ${moves}`)
}

function changeColor(e) {
  if(e.target === square){
    squareStyle.backgroundColor = "#" + Math.floor(16777215 * Math.random()).toString(16);
    //random hexadecimal number with 16777215 being the maximum number of possible hexidecimal
    // numbers with 6 digits per rgb
  }
}

function checkEnemyCollision() {  
  let left = parseInt(squareStyle.left.replace("px", "")); //gets the int from the square left style
  let top = parseInt(squareStyle.top.replace("px", "")); //gets the int from the square top style

  let enemies = document.querySelectorAll('.enemy');
  let enemiesHit = [];
  enemies.forEach(enemy => {
    let enLeft = parseInt(enemy.style.left.replace("px", ""));
    let enTop = parseInt(enemy.style.top.replace("px", ""));
    if (top + 50 > enTop && top < enTop + 50){
      if(left + 50 > enLeft && left < enLeft + 50){
        enemiesHit.push(enemy);
      }
    }
  });
  // console.log(enemiesHit);
  return enemiesHit;
}

function destroyEnemy(enemies) {
  // let parent = document.getElementById("game");
  // enemies.forEach(enemy => parent.removeChild(enemy));
  console.log("destroying");
  enemies.forEach(enemy => {
    let enLeft = parseInt(enemy.style.left.replace("px", ""));
    let enTop = parseInt(enemy.style.top.replace("px", ""));
    makeParticles({x:enTop, y:enLeft});
    enemy.remove();
  });
}

function spawnEnemy(e){
  if (e.target ===enemyBtn) {
    let en = document.createElement("div");
    en.style.width = "50px";
    en.style.height = `50px`;
    en.style.left = `${Math.floor(Math.random() * 300)}px` ;
    en.style.top = `${Math.floor(Math.random() * 300)}px`;
    en.style.position = "absolute";
    en.style.backgroundColor = "white";

    en.setAttribute("class","enemy");
    document.querySelector("#game").appendChild(en);
  }
  if(checkEnemyCollision().length > 0) {
    destroyEnemy(checkEnemyCollision());
    spawnEnemy(e);
  }
}

function makeParticles(startPos){
  console.log(startPos);
  const numParticles = Math.floor(Math.random() * 100);
  for(let i = 0; i<numParticles; i++){
    const particle = new Particles(startPos.x, startPos.y);
    particle.createParticle();
    let particleFall = setInterval(()=> {
      if(document.querySelectorAll(".particle").length < 1){
        clearInterval(particleFall);
      }
      particle.fall();
    }, 50);
  }
  
}

document.addEventListener("keydown", function(e) {
  updateKeys(e);
});

document.addEventListener("keyup", (e) => {
  deactivateKeys(e);
});

document.addEventListener("click", function(e) {
  changeColor(e);
  spawnEnemy(e);
});