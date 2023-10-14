let grid;
let rows = 40
let cols = 40
let playing = false
let isDrawing = false;


let playbtn = document.getElementById("playbtn")
playbtn.addEventListener("click", e => {
    playing = !playing;

    // Update the button text based on the 'playing' state
    if (playing) {
        playbtn.textContent = "Pause";
    } else {
        playbtn.textContent = "Play";
    }
})



let cleargridbtn = document.getElementById("cleargridbtn")
cleargridbtn.addEventListener("click", e => {
    clearGrid()
})
let randombtn = document.getElementById("randombtn")
randombtn.addEventListener("click", e => {
    randomize()
})





function setup() {
    const canvasContainer = select('#canvasBox');
    const canvas = createCanvas(canvasContainer.width, canvasContainer.width);
    canvas.parent('canvasBox');
    frameRate(30)


    grid = createGrid(rows, cols);
    // randomize()

}

function draw() {
    background(220);


    if (playing) {
        updateGrid();

    }

    displayGrid();
}

function createGrid(rows, cols) {
    let grid = new Array(rows);
    for (let i = 0; i < rows; i++) {
        grid[i] = new Array(cols);
        for (let j = 0; j < cols; j++) {
            grid[i][j] = 0;
        }
    }
    return grid;
}
// function initializeObjects() {
//     grid[20][10] = 1;
//     grid[30][20] = 1;
// }

function randomize() {

    for (let i = 0; i < rows / 2; i++) {
        for (let j = 0; j < cols; j++) {
            if (random(1) < 0.5) {
                grid[i][j] = 1;
            }
        }
    }
}

function updateGrid() {

    // Block Cellular Automaton rules here
    automatonRules()

    // gravity
    // for (let i = rows - 2; i >= 0; i--) {
    //     for (let j = 0; j < cols; j++) {
    //         if (grid[i][j] === 1 && grid[i + 1][j] === 0) {
    //             grid[i][j] = 0;
    //             grid[i + 1][j] = 1;
    //         }
    //     }
    // }
}



function displayGrid() {
    let cellWidth = width / cols;
    let cellHeight = height / rows;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            fill(200); // Cell color
            stroke(240); // Border color (white)
            strokeWeight(1); // Border thickness
            rect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);



            if (grid[i][j] === 1) {
                fill(0);
                //   stroke(200); 
                //    strokeWeight(1);
                rect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
            }
        }
    }
}






function mousePressed() {
    isDrawing = true;
    updateCell(mouseX, mouseY);
}

function mouseReleased() {
    isDrawing = false;
}

function mouseDragged() {
    if (isDrawing) {
        updateCell(mouseX, mouseY);
    }
}

function updateCell(x, y) {

    let cellSize = width / cols;


    let i = Math.floor(y / cellSize);
    let j = Math.floor(x / cellSize);
    if (i >= 0 && i < rows && j >= 0 && j < cols) {
        grid[i][j] = 1;
    }
}


function clearGrid() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = 0;
        }
    }
}


function automatonRules() {
    for (let i = rows - 2; i >= 0; i--) {
        for (let j = 0; j < cols; j++) {
            // Extract values of the 2x2 block clockwise from the top-left cell
            let topLeft = grid[i][j];
            let topRight = grid[i][j + 1];
            let bottomRight = grid[i + 1][j + 1];
            let bottomLeft = grid[i + 1][j];

            // Create an array to represent the 2x2 block
            let block = [topLeft, topRight, bottomRight, bottomLeft];

            // Define rules for each possible block state

            if (arraysEqual(block, [0, 0, 0, 0])) {
                grid[i][j] = 0;
                grid[i][j + 1] = 0;
                grid[i + 1][j + 1] = 0;
                grid[i + 1][j] = 0;
            } else if (arraysEqual(block, [0, 0, 1, 0])) {
                grid[i][j] = 0;
                grid[i][j + 1] = 0;
                grid[i + 1][j + 1] = 1;
                grid[i + 1][j] = 0;
            } else if (arraysEqual(block, [0, 0, 0, 1])) {
                grid[i][j] = 0;
                grid[i][j + 1] = 0;
                grid[i + 1][j + 1] = 0;
                grid[i + 1][j] = 1;
            } else if (arraysEqual(block, [0, 0, 1, 1])) {
                grid[i][j] = 0;
                grid[i][j + 1] = 0;
                grid[i + 1][j + 1] = 1;
                grid[i + 1][j] = 1;
            } else if (arraysEqual(block, [0, 1, 0, 0])) {
                grid[i][j] = 0;
                grid[i][j + 1] = 0;
                grid[i + 1][j + 1] = 1;
                grid[i + 1][j] = 0;
            } else if (arraysEqual(block, [0, 1, 1, 0])) {
                grid[i][j] = 0;
                grid[i][j + 1] = 0;
                grid[i + 1][j + 1] = 1;
                grid[i + 1][j] = 1;
            } else if (arraysEqual(block, [0, 1, 0, 1])) {
                grid[i][j] = 0;
                grid[i][j + 1] = 0;
                grid[i + 1][j + 1] = 1;
                grid[i + 1][j] = 1;
            } else if (arraysEqual(block, [0, 1, 1, 1])) {
                grid[i][j] = 0;
                grid[i][j + 1] = 1;
                grid[i + 1][j + 1] = 1;
                grid[i + 1][j] = 1;
            } else if (arraysEqual(block, [1, 0, 0, 0])) {
                grid[i][j] = 0;
                grid[i][j + 1] = 0;
                grid[i + 1][j + 1] = 0;
                grid[i + 1][j] = 1;
            } else if (arraysEqual(block, [1, 0, 1, 0])) {
                grid[i][j] = 0;
                grid[i][j + 1] = 0;
                grid[i + 1][j + 1] = 1;
                grid[i + 1][j] = 1;
            } else if (arraysEqual(block, [1, 0, 0, 1])) {
                grid[i][j] = 0;
                grid[i][j + 1] = 0;
                grid[i + 1][j + 1] = 1;
                grid[i + 1][j] = 1;
            } else if (arraysEqual(block, [1, 0, 1, 1])) {
                grid[i][j] = 1;
                grid[i][j + 1] = 0;
                grid[i + 1][j + 1] = 1;
                grid[i + 1][j] = 1;
            } else if (arraysEqual(block, [1, 1, 0, 0])) {
                grid[i][j] = 0;
                grid[i][j + 1] = 0;
                grid[i + 1][j + 1] = 1;
                grid[i + 1][j] = 1;
            } else if (arraysEqual(block, [1, 1, 1, 0])) {
                grid[i][j] = 0;
                grid[i][j + 1] = 1;
                grid[i + 1][j + 1] = 1;
                grid[i + 1][j] = 1;
            } else if (arraysEqual(block, [1, 1, 0, 1])) {
                grid[i][j] = 1;
                grid[i][j + 1] = 0;
                grid[i + 1][j + 1] = 1;
                grid[i + 1][j] = 1;
            } else if (arraysEqual(block, [1, 1, 1, 1])) {
                grid[i][j] = 1;
                grid[i][j + 1] = 1;
                grid[i + 1][j + 1] = 1;
                grid[i + 1][j] = 1;
            }

            // Add more rules as needed
        }
    }
}

function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}
