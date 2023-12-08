

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