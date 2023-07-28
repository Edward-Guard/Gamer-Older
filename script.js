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
        }
        alvo.classList.add('selected')
        if (alvo == selected) {
            alvo.classList.remove('selected')
        }

        let cell = alvo.parentElement.id.split(',');
        cell = cell.map(Number);
        
        //Movimentos possíveis
        if(alvo.style.backgroundColor == 'white'){
            document.getElementById(moviment(cell,'c')).classList.toggle('movs')
            document.getElementById(moviment(cell,'d')).classList.toggle('movs')
        }else if(alvo.style.backgroundColor == 'blue'){
            document.getElementById(moviment(cell,'a')).classList.toggle('movs')
            document.getElementById(moviment(cell,'b')).classList.toggle('movs')
        }
        
        

        //'Destaca as casas'
        // mv1.classList.toggle('movs')
        // mv2.classList.toggle('movs')
        // mv3.classList.toggle('movs')
        // mv4.classList.toggle('movs')
        
    }else if(alvo.tagName === 'DIV'){
        console.log(alvo.id);
    }
}

function moviment(posicion,direcion) {
    let newMoviment = [0,0];       //movimento Saida  

    switch (direcion) {
        case 'a':
            newMoviment[0] = posicion[0]+1;
            newMoviment[1] = posicion[1]+1;
            break;
        case 'b':
            newMoviment[0] = posicion[0]+1;
            newMoviment[1] = posicion[1]-1;
            break;
        case 'c':
            newMoviment[0] = posicion[0]-1;
            newMoviment[1] = posicion[1]-1;
            break;
        case 'd':
            newMoviment[0] = posicion[0]-1;
            newMoviment[1] = posicion[1]+1;
            break;
    
        default:
            console.log('erro');
            break;
    }
    return `${newMoviment[0]},${newMoviment[1]}`;
    //Pega a posição e retorna uma nova posição
    //1-"Mostra as possibilidades" 2-"Movimenta a peça para a nova posição"

    //4 direcoes a[x+1,y+1] b[x+1,y-1] c[x-1,y-1] d[x-1,y+1]
    //Branco 6,5 > 5,4 | 5,6 c[] e d[]
    //Azul a[] e b[]
}
//const teste1 = document.getElementById('teste')
//teste1.addEventListener('click',moviment)
board.addEventListener('click',select)
