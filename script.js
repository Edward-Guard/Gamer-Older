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
    const selected = document.querySelector(' .selected')
    
    if (alvo.tagName === 'P') {
        
        let cell = alvo.parentElement.id.split(',');
            cell = cell.map(Number);  
            

        const movA = document.getElementById(direction(cell, 'a'))
        const movB = document.getElementById(direction(cell, 'b'))
        const movC = document.getElementById(direction(cell, 'c'))
        const movD = document.getElementById(direction(cell, 'd'))
        
        //selected = alvo(rm) | alvo != selected e != null(rm e add) | selected =null(add)
        if (selected) {
            selected.classList.remove('selected')
            const mvSelected = document.getElementsByClassName('movs');
            //mvSelected[0].classList.remove('movs')
            //mvSelected[0].classList.remove('movs')

            if (selected != alvo) {
                alvo.classList.add('selected')
                possibility(cell[0],cell[1])
                if (alvo.style.backgroundColor == 'white') {
                    
                    //movC.classList.toggle('movs')
                    //movD.classList.toggle('movs')
                } else if (alvo.style.backgroundColor == 'blue') {
                    //movA.classList.toggle('movs')
                    //movB.classList.toggle('movs')
                }
            }
        }else{
            alvo.classList.add('selected')
            possibility(cell[0],cell[1])
            if (alvo.style.backgroundColor == 'white') {
                //movC.classList.toggle('movs')
                //movD.classList.toggle('movs')
            } else if (alvo.style.backgroundColor == 'blue') {
                //movA.classList.toggle('movs')
                //movB.classList.toggle('movs')
            }
        }
        //Movimento
    } else if (alvo.tagName === 'DIV') {
        if (selected) {
            const moviment = alvo.id
            const cellSelected = selected.parentElement.id.split(',').map(Number)
            console.log(cellSelected);
            if (selected.style.backgroundColor == 'white') {
                const option1 = direction(cellSelected,'c')
                const option2 = direction(cellSelected,'d')
                if(alvo.id == option1 || alvo.id == option2){
                    document.getElementById(alvo.id).appendChild(selected)
                }
                
            }else if(selected.style.backgroundColor == 'blue'){
                const option1 = direction(cellSelected,'a')
                const option2 = direction(cellSelected,'b')

                if(alvo.id == option1 || alvo.id == option2){
                    document.getElementById(alvo.id).appendChild(selected)
                }
            }
            
        }
    }
}

function direction(posicion, option) {
    let newMoviment = [0, 0];       //movimento Saida  

    switch (option) {
        case 'a':
            newMoviment[0] = posicion[0] + 1;
            newMoviment[1] = posicion[1] + 1;
            break;
        case 'b':
            newMoviment[0] = posicion[0] + 1;
            newMoviment[1] = posicion[1] - 1;
            break;
        case 'c':
            newMoviment[0] = posicion[0] - 1;
            newMoviment[1] = posicion[1] - 1;
            break;
        case 'd':
            newMoviment[0] = posicion[0] - 1;
            newMoviment[1] = posicion[1] + 1;
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

function possibility(a,b) {
    console.log(a,b);
    //5,0 => 4,1
    if(a == 0 || a == 7 || b == 0 || b == 7 ){
        console.log('Erro');
    }
}
const teste1 = document.getElementById('teste')
teste1.addEventListener('click',possibility)
board.addEventListener('click', select)
