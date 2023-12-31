function makeMaze() {

    class MazeBuilder {

        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.cols = 2 * this.width + 1;
            this.rows = 2 * this.height + 1;
            this.maze = this.initArray([]);

            console.log('checkpoint 1');

            this.placeInitialWalls();

            /* Start partitioning */
            this.partition(1, this.height - 1, 1, this.width - 1);

            this.getStarLocation();
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
            return 2 * (x - 1) + 1;
        }

        posToWall(x) {
            return 2 * x;
        }

        placeInitialWalls() {
            console.log('checkpoint 2');
            for (let r = 0; r < this.rows; r++) {
                for (let c = 0; c < this.cols; c++) {
                    switch (r) {
                        case 0:
                        case this.rows - 1:
                            this.maze[r][c] = ['wall'];
                            break;

                        default:
                            if ((r % 2) == 1) {
                                if ((c == 0) || (c == this.cols - 1)) {
                                    this.maze[r][c] = ['wall'];
                                } 
                            
                                else if (c % 2 == 0) {
                                    this.maze[r][c] = ['wall'];
                                }
                            }  
                    }

                    if (r == 0) {
                        /* place tree in the top row */
                        let doorPos = this.posToSpace(this.rand(1, this.width));
                        this.maze[r][doorPos] = ['door', 'exit'];
                    }

                    if (r == this.rows - 1) {
                        /* place entrance in the bottom row */
                        let doorPos = this.posToSpace(this.rand(1, this.width));
                        this.maze[r][doorPos] = ['door', 'entrance'];
                    }

                }
            }
        }
        /* Shuffles an array in-place using the Fisher-Yates shuffle algorithm */

        shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }
        
        /**
        * Creates the partition walls via the recursive division method
        */
        partition(r1, r2, c1, c2) {
            console.log('checkpoint 3');

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
                vert = this.rand(start, end);
            }

            /* Create walls to partition the maze */
            for(let i = this.posToWall(r1)-1; i <= this.posToWall(r2)+1; i++) {
                for(let j = this.posToWall(c1)-1; j <= this.posToWall(c2)+1; j++) {
                    if((i == this.posToWall(horiz)) || (j == this.posToWall(vert))) {
                        this.maze[i][j] = ['wall'];
                    }
                }
            }
        
            /* Create gaps in partition walls */

            /* Shuffles the array to randomise gap positions */
            let gaps = this.shuffle([true, true, true, false]);

            /* Creates gaps in the walls based on the shuffled array */
            if(gaps[0]) {
                console.log('checkpoint 4');

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
            // Other methods...
        }

        /* Determines where openings or paths should be created in the maze */
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

        /* Out of bounds */
        inBounds(r, c) {
            if((typeof this.maze[r] == 'undefined') || (typeof this.maze[r][c] == 'undefined')) {
                return false;
            }
            return true;
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
        }
    
        /* Places star objective */
        placeStar() {
            let [fr, fc] = this.getStarLocation();
            this.maze[fr][fc] = ['star'];
        }
    
        display(id) {
            this.parentDiv = document.getElementById(id);
    
            if(!this.parentDiv) {
                console.error("Cannot initialise maze - no element found with id \"" + id + "\"");
                return false;
            }

            console.log("Parent div found:", this.parentDiv);
    
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
    }


    // Initialize the MazeBuilder instance after the class definition
    const myMazeBuilder = new MazeBuilder(5, 5);
    console.log(myMazeBuilder.maze);
}

makeMaze();
