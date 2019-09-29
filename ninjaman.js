var world = document.querySelector("#world");
var map = [
  [0, 0, 0, 0, 0],
  [0, 1, 2, 1, 0],
  [0, 1, 0, 1, 0],
  [0, 1, 1, 1, 0],
  [0, 1, 1, 1, 0],
  [0, 1, 0, 1, 0],
  [0, 1, 1, 1, 0],
  [0, 1, 1, 1, 0],
  [0, 2, 0, 1, 0],
  [0, 1, 1, 2, 0],
  [0, 0, 0, 0, 0]
];

function drawWorld(worldArr) {
  var string = "";
  var dictionary = {
    0: "wall",
    1: "blank",
    2: "sushi",
    3: "onigiri"
  };
  for (i = 0; i < worldArr.length; i++) {
    string += "<div class='row'>";
    for (j = 0; j < worldArr[i].length; j++) {
      var cell = worldArr[i][j];
      string += "<div class='" + dictionary[cell] + "'></div>";
    }
    string += "</div>";
  }
  world.innerHTML = string;
  map = worldArr;
}

function createWorld(rows, columns) {
  //Another way...
  var worldArr = [];

  for (i = 0; i < rows; i++) {
    worldArr.push([]);
    for (j = 0; j < columns; j++) {
      if (i === 0 || i === rows - 1 || j === 0 || j === columns - 1) {
        worldArr[i].push(0);
      } else {
        var random = Math.floor(Math.random() * rows*columns);
        if (random <  .01*rows*columns) {
          worldArr[i].push(3);
        }
        else if (random === .01*rows*columns) {
          worldArr[i].push(2);
        }
        else if (random > rows*columns - .1*rows*columns) {
          worldArr[i].push(0);
        }
        else {
          worldArr[i].push(1);
        }
      }
    }
  }
  worldArr[1][1] = 1;
  worldArr[rows-2][columns-2] = 1;
  drawWorld(worldArr);

  // My way...
  // var string = "";
  // for (i=0; i<rows; i++) {
  //   string += "<div class='row'>";
  //   for (j=0; j <columns; j++) {
  //     if (i===0 || i === rows-1 || j===0 || j === columns-1) {
  //       string += "<div class='wall'></div>";
  //     }
  //     else {
  //       var random = Math.floor(Math.random()*100)
  //       if (random === 1) {
  //         string += "<div class='sushi'></div>"
  //       }
  //       else {
  //       string += "<div class='blank'></div>";
  //       }
  //     }
  //   }
  //   string += "</div>";
  //   world.innerHTML = string;
  // }
}

var ninjaman = {
  left: 1,
  top: 1
};

var bluey = {
  left: 18,
  top: 18
};

function drawNinjaman() {
  document.getElementById("ninjaman").style.left = ninjaman.left * 40 + "px";
  document.getElementById("ninjaman").style.top = ninjaman.top * 40 + 40 + "px";
  eat(map[ninjaman.top][ninjaman.left])
}

function drawBluey() {
  document.getElementById("ghost").style.left = bluey.left * 40 + "px";
  document.getElementById("ghost").style.top = (bluey.top * 40 + 40) + "px";
}

function eat(location) {
  var score = Number(document.querySelector("#score").textContent);
  switch(location) {
    case 2:
      score += 10;
      break;
    case 3:
      score += 5;
      break;
  }    
  document.querySelector("#score").textContent = score;
  map[ninjaman.top][ninjaman.left] = 1;
  drawWorld(map);
}

document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 37:
      if (map[ninjaman.top][ninjaman.left - 1] !== 0) {
        ninjaman.left--;
      }
      break;
    case 39:
      if (map[ninjaman.top][ninjaman.left + 1] !== 0) {
        ninjaman.left++;
      }
      break;
    case 38:
      if (map[ninjaman.top - 1][ninjaman.left] !== 0) {
        ninjaman.top--;
      }
      break;
    case 40:
      if (map[ninjaman.top + 1][ninjaman.left] !== 0) {
        ninjaman.top++;
      }
      break;
  }
  drawNinjaman();
};

function moveBluey() {
  //Basic idea: calculate the distance between Ninjaman and the ghost now, then check to see whether the distance decreases with the new moves.  If the distance decreases, and the new move is permissible, add it to an array. Randomly choose one of the moves from the array.
  var directions = [[bluey.top, bluey.left+1], [bluey.top, bluey.left-1], [bluey.top+1, bluey.left], [bluey.top-1, bluey.left]];
  moves = [];
  alternateMoves = [];
  var nl = ninjaman.left
  var nt = ninjaman.top;
  var bl = bluey.left;
  var bt = bluey.top;
  var currentDistance = Math.sqrt(Math.pow(nl-bl,2)+Math.pow(nt-bt,2));
  directions.forEach(function(move) {
    var newDistance = Math.sqrt(Math.pow(nl-move[1],2)+Math.pow(nt-move[0],2));
    if (map[move[0]][move[1]] !== 0) {
      if (newDistance < currentDistance) {
        moves.push(move);
      }
      else {
        alternateMoves.push(move);
      }
    }
  });
  if (moves.length > 0) {
    var random = Math.floor(Math.random()*moves.length);
    var choice = moves[random];
    bluey.top = choice[0];
    bluey.left = choice[1];
  }
  else {
    var random = Math.floor(Math.random()*alternateMoves.length);
    var choice = alternateMoves[random];
    bluey.top = choice[0];
    bluey.left = choice[1];
  }
  //New algorithm idea (see above): get all the available moves (non-wall spaces) in an array.  Choose randomly one of the moves that puts Bluey closer to the Ninja.
  
  // console.log(bluey.top, bluey.left, map[bluey.top][bluey.left], map[bluey.top], map[bluey.left]);
  // if (bluey.left > ninjaman.left && map[bluey.top][bluey.left-1] !== 0) {
  //   bluey.left--;  
  // }
  // else if (bluey.left < ninjaman.left && map[bluey.top][bluey.left+1] !== 0) {
  //     bluey.left++;
  // }
  // else if (bluey.top < ninjaman.top && map[bluey.top+1][bluey.left] !== 0) {
  //     bluey.top++;
  // }
  // else if (bluey.top > ninjaman.top && map[bluey.top-1][bluey.left] !== 0) {
  //     bluey.top--;
  // }
  // else if (bluey.top >= ninjaman.top && map[bluey.top-1][bluey.left] !== 0) {
  //   bluey.top--;
  // } 
  // else if (bluey.top< ninjaman.top && map[bluey.top+1][bluey.left] !== 0) {
  //   bluey.top++;
  // }
  drawBluey();
  checkDeath();
}

function newGame() {
  createWorld(20,20);
  stopBluey = setInterval(moveBluey, 250);
  stopFood = setInterval(addFood, 2000)
  bluey.left = 18;
  bluey.top = 18;
  ninjaman.left = 1;
  ninjaman.top = 1;
  drawNinjaman();
  drawBluey();
}

newGame();

function addFood() {
  var row = 0;
  var column = 0;
  while (map[row][column] !== 1) {
    row = Math.floor(Math.random()*map.length);
    column = Math.floor(Math.random()*map[0].length);
  }
  var random = (Math.floor(Math.random()*100))
  if (random < 9) {
    map[row][column] = 2;
  }
  else {
    map[row][column] = 3;
  }
  drawWorld(map);
}

function checkDeath() {
  if (bluey.top === ninjaman.top && bluey.left === ninjaman.left) {
    clearInterval(stopBluey);
    clearInterval(stopFood);
    var lives = document.querySelector("#lives");
    lives.textContent = Number(lives.textContent -1);
    if (Number(lives.textContent) > 0) {
      alert("You died...")
      newGame();
    }
    else {
      var score = document.querySelector("#score");
      alert("Your total score: " + score.textContent);
      score.textContent = 0;
      lives.textContent = 3;
      newGame();
    }
  }
}