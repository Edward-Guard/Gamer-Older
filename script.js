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

function direction(posicion, option, increment) {
    let newMoviment = [0, 0];       //movimento Saida  

    switch (option) {
        case 'a':
            newMoviment[0] = posicion[0] + (increment || 1);
            newMoviment[1] = posicion[1] + (increment || 1);
            break;
        case 'b':
            newMoviment[0] = posicion[0] + (increment || 1);
            newMoviment[1] = posicion[1] - (increment || 1);
            break;
        case 'c':
            newMoviment[0] = posicion[0] - (increment || 1);
            newMoviment[1] = posicion[1] - (increment || 1);
            break;
        case 'd':
            newMoviment[0] = posicion[0] - (increment || 1);
            newMoviment[1] = posicion[1] + (increment || 1);
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

function possibility(posicion, color) {
    //a = cell b = corPeça c= ?Dama
    const possibilites = [];
    if (posicion[0] != 7 && posicion[1] != 7 && color == 'blue') {
        //Checamos se tem alguma peça naquela lugar
        const posicionA = document.getElementById(direction(posicion, 'a'))
        if (!posicionA.hasChildNodes()) {
            possibilites.push(posicionA)
        }else{
            if (!capture(posicionA,color,'a').hasChildNodes()) {
              //  captura.push(capture(posicionA,color,'a'));
            }
        }
    }
    if (posicion[0] != 7 && posicion[1] != 0 && color == 'blue') {
        const posicionB = document.getElementById(direction(posicion, 'b'))
        if (!posicionB.hasChildNodes()) {
            possibilites.push(posicionB)
        }else{
            if (!capture(posicionB,color,'b').hasChildNodes()) {
               // captura.push(capture(posicionB,color,'b'));
            }
        }

    }
    if (posicion[0] != 0 && posicion[1] != 0 && color == 'white') {
        const posicionC = document.getElementById(direction(posicion, 'c'))
        if (!posicionC.hasChildNodes()) {
            possibilites.push(posicionC)
        }else{
            if (!capture(posicionC,color,'c').hasChildNodes()) {
              //  captura.push(capture(posicionC,color,'c'));
            }
        }
    }
    if (posicion[0] != 0 && posicion[1] != 7 && color == 'white') {
        const posicionD = document.getElementById(direction(posicion, 'd'))
        if (!posicionD.hasChildNodes()) {
            possibilites.push(posicionD)
        }else{
            if (!capture(posicionD,color,'d').hasChildNodes()) {
              //  captura.push(capture(posicionD,color,'d'));
            }
        }
    }
    return possibilites
    //cell = Posição Peça //Direção=Novas posições //Possibilitity-
    //[a,b] => A=[a+1,b+1],B=[a-1,b+1],C=[-1,b-1],D=[a-1,b+1]
    //[C][-][D]     [4,5][---][4,7] 
    //[-][P][-]     [---][5,6][---]
    //[B][-][A]     [6,5][---][6,7]
    // a ou b = 7   
    //5,0 => 4,1
}
function capture(a,b,c) {
    const pedra = a.firstChild.style.backgroundColor
    const posicion = a.id.split(',').map(Number)
    if (pedra != b) {
        return document.getElementById(direction(posicion,c)); 
    }
}

function select(e) {
    let alvo = e.target
    const selected = document.querySelector(' .selected')

    if (alvo.tagName === 'P') {

        const cell = alvo.parentElement.id.split(',').map(Number);

        if (selected) {
            rmSelected(selected)
            if (selected != alvo) {
                alvo.classList.add('selected')
                possibility(cell, alvo.style.backgroundColor).forEach(e => {
                    e.classList.toggle('movs')
                });
            }

        } else {
            alvo.classList.add('selected')

            possibility(cell, alvo.style.backgroundColor).forEach(Element => {
                Element.classList.toggle('movs')
            });

        }
        //Movimento
    } else if (alvo.tagName === 'DIV') {
        if (selected) {
            const cellSelected = selected.parentElement.id.split(',').map(Number)
            const b = possibility(cellSelected, selected.style.backgroundColor)
            
            
            b.forEach(element => {
                if (element.id == alvo.id) {
                    document.getElementById(alvo.id).appendChild(selected)
                    rmSelected(selected)
                }
            });
        }
    }
}



//Remover elemento selecionado
function rmSelected(selected) {
    selected.classList.remove('selected')
    const mvSelected = document.getElementsByClassName('movs');
    const capSelected = document.getElementsByClassName('capture')
    if (length in mvSelected) {
        for (let i = 0; i <= mvSelected.length; i += 1) {
            mvSelected[0].classList.remove('movs')
        }
    }
    if (length in capSelected) {
        for (let i = 0; i <= capSelected.length; i += 1) {
            capSelected[0].classList.remove('capture')
        }
    }
     
}

board.addEventListener('click', select)
