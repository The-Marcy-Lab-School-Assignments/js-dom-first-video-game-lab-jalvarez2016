let square = document.getElementById("square");
let squareStyle = square.style;
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
}

function changeColor(e) {
  console.log(Math.floor(16777215 * Math.random()).toString(16));
  if(e.target === square){
    squareStyle.backgroundColor = "#" + Math.floor(16777215 * Math.random()).toString(16);
    //random hexadecimal number with 16777215 being the maximum number of possible hexidecimal
    // numbers with 6 digits per rgb
  }
}

document.addEventListener("keydown", function(e) {
  move(e);
});

document.addEventListener("click", function(e) {
  changeColor(e);
});