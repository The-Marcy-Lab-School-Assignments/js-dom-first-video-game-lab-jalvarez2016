let square = document.getElementById("square");
let squareStyle = square.style;
let enemyBtn = document.getElementById("mkEnemy");
// console.log(square.style.left, square.style.top);

function move(e){
  let left = parseInt(squareStyle.left.replace("px", "")); //gets the int from the square left style
  let squareTop = parseInt(squareStyle.top.replace("px", "")); //gets the int from the square top style

  if (e.key === "ArrowUp") {
    if( squareTop - 10 < 0){
      squareStyle.top = `0px`;
    } else {
      squareStyle.top = `${squareTop - 10}px`;
    }
  } else if (e.key === "ArrowLeft") {
    if(left - 10 < 0){
      squareStyle.left = `0px`;
    } else {
      squareStyle.left = `${left - 10}px`;
    }
  } else if (e.key === "ArrowRight") {
    if(left + 10 + 50 > 350){
      squareStyle.left = `350px`;
    } else {
      squareStyle.left = `${left + 10}px`;
    }
  } else if (e.key === "ArrowDown") {
    if(squareTop + 10 + 50 > 350){
      squareStyle.top = `350px`;
    } else {
      squareStyle.top = `${squareTop + 10}px`;
    }
  }

  if(checkEnemyCollision().length > 0){
    destroyEnemy(checkEnemyCollision());
  }
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
  enemies.forEach(enemy => enemy.remove());
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

document.addEventListener("keydown", function(e) {
  move(e);
});

document.addEventListener("click", function(e) {
  changeColor(e);
  spawnEnemy(e);
});