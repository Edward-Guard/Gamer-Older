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
function rmSelected() {
    const selected = $(".selected")[0]
    selected.classList.remove('selected')
    rmMarkeds()
}
function rmMarkeds() {
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

//Lógica de movimentação
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

function capture(target) {
    const selected = $(".selected")[0]
    if (selected) {
        const color = selected.style.backgroundColor
        const cord = selected.parentElement.id.split('-').map(Number)
        const directions = ['a', 'b', 'c', 'd']
        checkAround(cord)
        //1-Pegar as coordenadas da peça.
        //2-Checar se tem peças inimigas ao redor.
        // for diretions in cord=> 4 vizinhos => Checar se existem e se há filhos com cord adversária.
        //3-Checar se o espaço seguinte existe e está livre.
        //Se o click for igual a esse espaço fazer mudar a posição.
        //4-Chamar novamente de 1-3

        /*Capture = 3códigos 1-Checa se há peças inimigas ao redor com espaço livre seguinte a elas.
                             2-Pinta as casas livres
                             3-Se houver um target == ao espaço livre muda a peça de posição e elimina a rival.
        */
        function markCap(cell) {
                cell.classList.add('capture');
        }

        function checkAround(position) {
            let cont = 0
            directions.forEach(dir => {
                const opcion = $('#' + direction(position, dir, 1))[0];
                if (opcion && opcion.hasChildNodes() && opcion.firstChild.style.backgroundColor != color) {
                    const nextCell = $('#' + direction(position, dir, 2))[0] 
                    mvCap(opcion,nextCell)
                    if (nextCell && !nextCell.hasChildNodes()) {
                        cont +=1
                        markCap(nextCell)
                    }
                }
            });
            return cont
        }
        
        function mvCap(opcion,nextCell) {
            if(target && target == nextCell && !target.hasChildNodes()){
                opcion.innerHTML = '';
                nextCell.appendChild(selected)
                const NCord= target.id.split('-').map(Number)
                if (checkAround(NCord) != 0) {
                    rmMarkeds()
                    checkAround(NCord)
                }else{
                    rmSelected()
                }           
            }
        }
        
    }
}

//Lógica de seleção de peça e direção do movimento
function select(e) {
    
    let alvo = e.target
    const selected = $(".selected")[0]

    //Escolher a pedra
    if (alvo.tagName === 'P') {
        const cell = alvo.parentElement.id.split('-').map(Number);
        if (selected) {
            rmSelected()
            if (selected != alvo) {
                alvo.classList.add('selected')
                moves(cell, alvo.style.backgroundColor).forEach(e => {
                    e.classList.toggle('movs')
                });
                capture()
                changePlayer()

            }
        } else {
            alvo.classList.add('selected')
            moves(cell, alvo.style.backgroundColor).forEach(e => {
                e.classList.toggle('movs')
            });
            capture()
        }
    } else if (alvo.tagName === 'DIV') { //Movimento
        if (selected) {
            const cellSelected = selected.parentElement.id.split('-').map(Number)
            const b = moves(cellSelected, selected.style.backgroundColor)

            b.forEach(element => {
                if (element.id == alvo.id && $("#"+element.id).hasClass('movs')) {
                    document.getElementById(alvo.id).appendChild(selected)
                    rmSelected()
                    
                }
            });
            capture(alvo)
        }
    }
}

function changePlayer(){
    const turnPlayer = $("#turn")
    const player1 = $('.player-1')
    const player2 = $('.player-2')
    
    if (player1.get(0) == turnPlayer.parent().get(0)) {
       player2.append(turnPlayer)
    }else{
        player1.append(turnPlayer)
    }
    console.log(turnPlayer);
    console.log(player1);
}


board.addEventListener('click', select)
