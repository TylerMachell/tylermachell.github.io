<script type='text/javascript'>
    var score = 0;
    var world = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 2, 0, 0, 0, 1, 2, 2, 0, 0, 1],
        [1, 0, 1, 2, 0, 0, 1, 2, 2, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 3, 3, 3, 0, 0, 0, 3, 3, 0, 0, 1],
        [1, 3, 1, 3, 0, 0, 0, 3, 3, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 2, 0, 0, 0, 2, 2, 0, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    ];

    var worldDict = {
        0: 'blank',
        1: 'wall',
        2: 'sushi',
        3: 'onigiri'
    }

    function drawWorld() {
        output = "";

        for (var row = 0; row < world.length; row++) {
            output += "<div class='row'></div>"
            for (var x = 0; x < world[row].length; x++) {
                output += "<div class = '" + worldDict[world[row][x]] + "'></div>"
            }
            output += "</div>"
        }
        document.getElementById('world').innerHTML = output;
    }
    drawWorld();

    var ninjaman = {
        x: 1,
        y: 1
    }

    function drawNinjaman() {
        document.getElementById('ninjaman').style.top = ninjaman.y * 40 + 'px'
        document.getElementById('ninjaman').style.left = ninjaman.x * 40 + 'px'
    }
    drawNinjaman();

    document.onkeydown = function (e) {
        if (e.keyCode == 37) { //left
            if (world[ninjaman.y][ninjaman.x - 1] != 1) {
                ninjaman.x--;
            }
        }
        if (e.keyCode == 39) { //right
            if (world[ninjaman.y][ninjaman.x + 1] != 1)
                ninjaman.x++;
        }
        if (e.keyCode == 38) { //up
            if (world[ninjaman.y - 1][ninjaman.x] != 1)
                ninjaman.y--;
            if (world[ninjaman.y][ninjaman.x] == 2) {
                score = score + 10;
            }
        }
        if (e.keyCode == 40) { //down
            if (world[ninjaman.y + 1][ninjaman.x] != 1)
                ninjaman.y++;
        }
        if (world[ninjaman.y][ninjaman.x] == 2) {
            score = score + 10;
            world[ninjaman.y][ninjaman.x] = 0;
        }
        if (world[ninjaman.y][ninjaman.x] == 3) {
            score = score + 5;
            world[ninjaman.y][ninjaman.x] = 0;
        }

        drawNinjaman();
        drawWorld();
        document.getElementById('score').textContent = score;
    }