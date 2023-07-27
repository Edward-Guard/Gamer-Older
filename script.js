const board = document.getElementById('board')

function makeCells(position, color) {
    const cell = document.createElement('div');
    cell.className = 'square'
    cell.style.backgroundColor = color
    cell.id = position
    return cell
}

function makePiece(id, color) {
    const piece = document.createElement('p');
    piece.style.backgroundColor = color
    piece.className = 'piece';
    piece.id = id
    return piece
}

function makeBoard() {
    let id = '0';
    let cor = 'white'
    for (let i = 0; i < 8; i += 1) {
        (cor == 'white') ? cor = 'black' : cor = 'white';
        id = i;
        for (let l = 0; l < 8; l += 1) {
            (cor == 'white') ? cor = 'black' : cor = 'white';
            id = (`${i},${l}`);
            board.appendChild(makeCells(id, cor))
        }
    }
}
makeBoard();
function start() {
    const house = document.getElementById('board').children
    let count = 0
    for (let i = 0; i < 64; i += 1) {
        if (i < 24 && house[i].style.backgroundColor == 'black') {
            count += 1
            house[i].appendChild(makePiece(`b${count}`, 'blue'))
        }
        if (i == 40) {
            count = 0
        }
        if (i > 39 && house[i].style.backgroundColor == 'black') {
            count += 1
            house[i].appendChild(makePiece(`w${count}`, 'white'))
        }
    }
}
start()

function select(e) {
    let alvo = e.target
    let mv1 = [0,0]
    let mv2 = [0,0]
    if (alvo.tagName === 'P') {
        let casa = alvo.parentElement.id.split(',');
        console.log(casa);
        //5,6 > 4,5 e 4,7
        mv1 = [casa[0] -1,casa[1]];
        mv2 = [casa[0] -1,casa[1]-1];
        console.log(mv1,mv2);
    }else if(alvo.tagName === 'DIV'){
        console.log(alvo.id);
    }
}

board.addEventListener('click',select)