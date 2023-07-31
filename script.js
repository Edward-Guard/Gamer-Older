const board = document.getElementById('board')

//Geradoras
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
            id = (`${i}-${l}`);
            board.appendChild(makeCells(id, cor))
        }
    }
}
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
makeBoard();
start()

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

function direction(position, option, increment) {

    const movements = {

        a: `${position[0] + increment}-${position[1] + increment}`,
        b: `${position[0] + increment}-${position[1] - increment}`,
        c: `${position[0] - increment}-${position[1] - increment}`,
        d: `${position[0] - increment}-${position[1] + increment}`,
    };
    return movements[option];
    //Pega a posição e retorna uma nova posição
    //1-"Mostra as possibilidades" 2-"Movimenta a peça para a nova posição"

    //4 direcoes a[x+1,y+1] b[x+1,y-1] c[x-1,y-1] d[x-1,y+1]
    //Branco 6,5 > 5,4 | 5,6 c[] e d[]
    //Azul a[] e b[]
}

function moves(position, color, dama) {
    //a = cell b = corPeça c= ?Dama
    const possibilites = [];
    const directions = [];

    if (color == 'blue') {
        directions.push('a', 'b')
    } else if (color == 'white') {
        directions.push('c', 'd')
    } else if (dama) {
        directions.push('a', 'b', 'c', 'd')
    }

    for (let i = 0; i < directions.length; i += 1) {
        const movement = $('#' + direction(position, directions[i], 1))[0];
        if (movement && !movement.hasChildNodes()) {
            possibilites.push(movement);
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

function capture(position, color, target) {
    const directions = ['a', 'b', 'c', 'd']
    const selected = $(".selected")[0]

    directions.forEach(element => {
        const direcao = $('#' + direction(position, element, 1))[0]
        if (direcao && direcao.hasChildNodes() && direcao.firstChild.style.backgroundColor != color ) {

            const capturePosition = $('#' + direction(position, element, 2))[0]
            if (!capturePosition.hasChildNodes()) {
                capturePosition.classList.add('capture');
            }

            if (target == capturePosition && !target.hasChildNodes()) {
                direcao.innerHTML = '';
                capturePosition.appendChild(selected)
                rmSelected(selected)
            }
        }
    });
}

function select(e) {
    let alvo = e.target
    const selected = document.querySelector(' .selected')

    //Escolher a pedra
    if (alvo.tagName === 'P') {
        const cell = alvo.parentElement.id.split('-').map(Number);
        if (selected) {
            rmSelected(selected)
            if (selected != alvo) {
                alvo.classList.add('selected')
                moves(cell, alvo.style.backgroundColor).forEach(e => {
                    e.classList.toggle('movs')
                });
                capture(cell, alvo.style.backgroundColor)
            }

        } else {
            alvo.classList.add('selected')
            moves(cell, alvo.style.backgroundColor).forEach(Element => {
                Element.classList.toggle('movs')
            });
            capture(cell, alvo.style.backgroundColor)

        }

    } else if (alvo.tagName === 'DIV') { //Movimento
        if (selected) {
            const cellSelected = selected.parentElement.id.split('-').map(Number)
            const b = moves(cellSelected, selected.style.backgroundColor)

            b.forEach(element => {
                if (element.id == alvo.id) {
                    document.getElementById(alvo.id).appendChild(selected)
                    rmSelected(selected)
                }
            });
            capture(cellSelected, selected.style.backgroundColor, alvo)
        }
    }
    //Captura

}



board.addEventListener('click', select)
