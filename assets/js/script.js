<script src="assets/js/mazeBuilder.js"></script>

/* Out of bounds */
inBounds(r, c) {
    if((typeof this.maze[r] == 'undefined') || (typeof this.maze[r][c] == 'undefined')) {
        return false;
    }
    return true;
}

/* Source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/12646864#12646864" */

/**
 * Picks a random element for each original array element and excludes it from the next draw
 */
shuffle(array) {
    for(let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


    /**
     * Create gaps in partition walls
     */
    /* Shuffles the array to randomise gap positions */
    let gaps = this.shuffle([true, true, true, false]);

    /* Creates gaps in the walls based on the shuffled array */
    if(gaps[0]) {
    let gapPosition = this.rand(c1, vert);
    this.maze[this.posToWall(horiz)][this.posToSpace(gapPosition)] = [];
    }

    if(gaps[1]) {
        let gapPosition = this.rand(vert + 1, c2 + 1);
        this.maze[this.posToWall(horiz)][this.posToSpace(gapPosition)] = [];
    }

    if(gaps[2]) {
        let gapPosition = this.rand(r1, horiz);
        this.maze[this.posToWall(vert)][this.posToSpace(gapPosition)] = [];
    }

    if(gaps[3]) {
        let gapPosition = this.rand(horiz + 1, r2 + 2);
        this.maze[this.posToWall(vert)][this.posToSpace(gapPosition)] = [];
    }

    /**
     * Recursively partitions the newly created chambers
     */
    this.partition(r1, horiz - 1, c1, vert - 1);
    this.partition(horiz + 1, r2, c1, vert - 1);
    this.partition(r1, horiz - 1, vert + 1, c2);
    this.partition(horiz + 1, r2, vert + 1, c2);

/**
 * Determines where openings or paths should be created in the maze
 */
isGap(...cells) {
    return cells.every((array) => {
        let row, col;
        [row, col] = array;
        if (this.maze[row][col].length > 0) {
            if (!this.maze[row][col].includes('tree')) {
                return false;
            }
        }
        return true;
    });
}

/**
 * Function to count steps taking within the game from start to end
 */

countSteps(array, r, c, val, stop) {

    /* Checks if the current position (r, c) is out of bounds and returns false if it is */
    if(!this.inBounds(r, c)) {
        return false;
    }

    /** 
     * Checks if the step value at current position (r, c) is less than or equal to the 'val'
     * if true it means a shorter route to this position has already been mapped and function will return false
     */
    
    if(array[r][c] <= val) {
        return false;
    }

    /* Checks if the current position (r, c) is a gap, if it is not, function will return false */
    if(!this.isGap([r, c])) {
        return false;
    }

    /* Updates the step value at the current position with the provided 'val' */
    array[r][c] = val;

    /* Checks if the current position includes the 'stop' marker, if true it means the destination has been reached */
    if(this.maze[r][c].includes(stop)) {
        return true;
    }

    /**
     *  Recursively calls the 'countSteps' fucntion for neighbouring postions with incremented step values.
     * This continues until the destination is reached or no valid steps are possible 
     */

    this.countSteps(array, r-1, c, val+1, stop);
    this.countSteps(array, r, c+1, val+1, stop);
    this.countSteps(array, r+1, c, val+1, stop);
    this.countSteps(array, r, c-1, val+1, stop);


}

/* Counts steps from paths leading from the exit to the entrance */
getStarLocation() {
    let fromEntrance = this.initArray();
    let fromExit = this.initArray();

    this.totalSteps = 1;

    for(let j = 1; j < this.cols-1; j++) {
        if(this.maze[this.rows-1][j].includes("entrance")) {
            this.countSteps(fromExit, 0, j, 0, 'entrance');
        }
    }
}

/* Iterates through each cell to calculate a combined step count for a path from the entrance to the current cell and from the exit to the same cell */
let fc = -1, fr = -1;

this.maze.forEach((row, r) => {
    row.forEach((cell, c) => {
        if(typeof fromEntrance[r][c] == 'undefined') {
            return;
        }
        let stepCount = fromEntrance[r][c] + fromExit[r][c];
        if(stepCount > this.totalSteps) {
            fr = r;
            fc = c;
            this.totalSteps = stepCount;
        }
    });
});

/* Places star objective */
placeStar() {
    let fr, fc;
    [fr, fc] = this.getStarLocation();

    this.maze[fr][fc] = ['star'];
}

display(id) {
    this.parentDiv = document.getElementById(id);

    if(!this.parentDiv) {
        alert("Cannot initialise maze - no element found with id \"" + id + "\"");
        return false;
    }

    while(this.parentDiv.firstChild) {
        this.parentDiv.removeChild(this.parentDiv.firstChild);
    }

    const container = document.createElement('div');
    container.id = 'maze';
    container.dataset.steps = this.totalSteps;

    this.maze.forEach((row) => {
        let rowDiv = document.createElement('div');
        row.forEach((cell) => {
            let cellDiv = document.createElement('div');
            if(cell) {
                cellDiv.className = cell.join(" ");
            }
            rowDiv.appendChild(cellDiv);
        });
        container.appendChild(rowDiv);
    });

    this.parentDiv.appendChild(container);

    return true;
}
























/**
 * Toggles the message box visibility by revealing the hidden message-box
 */

function toggleVisibility(message) {
    var element = document.getElementById(message);
    if (element.style.display === 'none' || element.style.display === '') {
        element.style.display = 'block';
    } else {
        element.style.display = 'none';
    }
    
}