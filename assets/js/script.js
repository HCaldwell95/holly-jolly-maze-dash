<script src="assets/js/mazeBuilder.js"></script>


/* Source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/12646864#12646864" */










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