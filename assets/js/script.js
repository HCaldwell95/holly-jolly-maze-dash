

class MazeBuilder {

    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.cols = 2 * this.width + 1;
        this.rows = 2 * this.height + 1;

        this.maze = this.initArray([]);

        /* place initial walls */
        this.maze.forEach((row, r) => {
            row.forEach((cell, c) => {
                switch(r)
                {
                    case 0:
                    case this.rows - 1:
                        this.maze[r][c] = ['wall'];
                        break;

                    default:
                        if((r % 2) == 1) {
                            if((c == 0) || (c == this.cols - 1)) {
                                this.maze[r][c] = ['wall'];
                            }
                        } else if(c % 2 == 0) {
                            this.maze[r][c] = ['wall'];
                        }
                }
            });

            if(r == 0) {
                /* place tree in top row */
                let treePos = this.posToSpace(this.rand(1, this.width));
                this.maze[r][treePos] = ['tree', 'entrance'];
            }

            if(r == this.rows - 1) {
                /* place entrance in bottom row */
                let treePos = this.posToSpace(this.rand(1, this.width));
                this.maze[r][treePos] = ['tree', 'entrance']
            }
        })
        /* Start partitioning */
        this.partition(1, this.height - 1, 1, this.width - 1);
    }

}
/**
 * Creates a matrix with my specified number of rows and columns
 * and fills each element with a value
 */
initArray(value) {
    return new Array(this.rows).fill().map(() => new Array(this.cols).fill(value));
}

rand(min, max) {
    return min + Math.floor(Math.random() * (1 + max - min));
}

posToSpace(x) {
    return 2 * (x-1) + 1;
}

posToWall(x) {
    return 2 * x;
}

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
 * Creates the partition walls via the recursive division method
 */
partition(r1, r2, c1, c2) {
    /* Source: en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_division_method */

    let horiz, vert, x, y, start, end;

    /* If the region is too small, stop deviding */
    if((r2 < r1) || (c2 < c1)) {
        return false;
    }

    /* Decide whether to create a horizonal or vertical wall */
    if(r1 == r2) {
        horiz = r1;
    } else {
        x = r1+1;
        y = r2+1;
        start = Math.round(x + (y - x) / 4);
        end = Math.round(x + 3*(y - x) / 4);
        horiz = this.rand(start, end);
    }

    if(c1 == c2) {
        vert = c1;
    } else {
        x = c1 + 1;
        y = c2 + 1;
        start = Math.round(x + (y - x) / 3);
        end = Math.round(x + 2 * (y - x) / 3);
        horiz = this.rand(start, end);
    }

    /* Create walls to partition the maze */
    for(let i = this.posToWall(r1)-1; i <= this.posToWall(r2)+1; i++) {
        for(let j = this.posToWall(c1)-1; j <= this.posToWall(c2)+1; j++) {
            if((i == this.posToWall(horiz)) || (j == this.posToWall(vert))) {
                this.maze[i][j] = ['wall'];
            }
        }
    }

    let gaps = this.shuffle([true, true, true, false]);
    


























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