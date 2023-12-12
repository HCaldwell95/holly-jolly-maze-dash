class MazeBuilder {

    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.cols = 2 * this.width + 1;
        this.rows = 2 * this.height + 1;
        this.maze = this.initArray([]);

        this.placeInitialWalls();

        /* Start partitioning */
        this.partition(1, this.height - 1, 1, this.width - 1);
    }

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
        this.maze.forEach((row, r) => {
            row.forEach((cell, c) => {
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
                        } else if (c % 2 == 0) {
                            this.maze[r][c] = ['wall'];
                        }
                }

                if (r == 0) {
                    /* place tree in top row */
                    let entrancePos = this.posToSpace(this.rand(1, this.width));
                    this.maze[r][entrancePos] = ['tree', 'entrance'];
                }

                if (r == this.rows - 1) {
                    /* place entrance in bottom row */
                    let treePos = this.posToSpace(this.rand(1, this.width));
                    this.maze[r][treePos] = ['tree', 'entrance'];
                }
            });
        });
    }

    partition(r1, r2, c1, c2) {
        // Implement your partitioning logic here...
    }
}

const myMazeBuilder = new MazeBuilder(5, 5);
console.log(myMazeBuilder.maze);

/**
 * MazeBuilder is factually correct in this file.. Issues persist elsewhere
 */