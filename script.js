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
    let mv1 = [0,0]
    let mv2 = [0,0]
    let mv3 = [0,0]
    let mv4 = [0,0]

function select(e) {
    let alvo = e.target
    if (alvo.tagName === 'P') {
        const selected = document.querySelector(' .selected')
        if (selected) {
            selected.classList.remove('selected')
        //    mv1.classList.toggle('movs') 
        //     mv2.classList.toggle('movs')
        //     mv3.classList.toggle('movs')
        //     mv4.classList.toggle('movs')
        }
        alvo.classList.add('selected')
        if (alvo == selected) {
            alvo.classList.remove('selected')
        //     mv1.classList.toggle('movs')
        //     mv2.classList.toggle('movs')
        //     mv3.classList.toggle('movs')
        //     mv4.classList.toggle('movs')
        }

        let cell = alvo.parentElement.id.split(',');
        cell = cell.map(Number);
        
        // mv1 = [cell[0]-1,cell[1]+1] 
        // mv2 = [cell[0]-1,cell[1]-1] 
        // mv3 = [cell[0]+1,cell[1]+1] 
        // mv4 = [cell[0]+1,cell[1]-1] 
    

        //Captura a casa com o id
        // mv1 = document.getElementById(`${mv1}`)
        // mv2 = document.getElementById(`${mv2}`)
        // mv3 = document.getElementById(`${mv3}`)
        // mv4 = document.getElementById(`${mv4}`)

        //'Destaca as casas'
        // mv1.classList.toggle('movs')
        // mv2.classList.toggle('movs')
        // mv3.classList.toggle('movs')
        // mv4.classList.toggle('movs')
        
    }else if(alvo.tagName === 'DIV'){
        console.log(alvo.id);
    }
}

board.addEventListener('click',select)