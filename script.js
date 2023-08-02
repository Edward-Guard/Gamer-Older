const board = document.getElementById('board')
const color2 = 'rgb(110, 122, 219)'
const color1 = 'white'

$(".player-1").get(0).style.backgroundColor = 'white'
$(".player-2").get(0).style.backgroundColor = 'rgb(110, 122, 219)'

//Geradoras
function makeCells(position, color, promotion) {
    const cell = document.createElement('div');
    cell.className = `square ${promotion}`
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
            let promotion = ''
            if (i == 0) {promotion = 'p1'}
            if (i == 7) {promotion = 'p2'}

            board.appendChild(makeCells(id, cor, promotion))
        }
    }
}
function start() {
    const house = document.getElementById('board').children
    let count = 0
    for (let i = 0; i < 64; i += 1) {
        if (i < 24 && house[i].style.backgroundColor == 'black') {
            count += 1
            house[i].appendChild(makePiece(`b${count}`, color2))
        }
        if (i == 40) {
            count = 0
        }
        if (i > 39 && house[i].style.backgroundColor == 'black') {
            count += 1
            house[i].appendChild(makePiece(`w${count}`, color1))
        }
    }
    $('#w12').addClass('dame');
    $('#b12').addClass('dame');
}
makeBoard();
start()

//Remover elemento selecionado
function rmSelected() {
    promotion()
    $(".selected").removeClass('selected');
    rmMarkeds()
    
}
function rmMarkeds() {  
    $('.movs').removeClass('movs');
    $('.capture').removeClass('capture');
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
    console.log(dama);

    if (dama) {
        directions.push('a', 'b', 'c', 'd')
    } else if(color == color2) {
        directions.push('a', 'b')
    } else if (color == color1) {
        directions.push('c', 'd')
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
                    changePlayer()
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
    const turnPlayer = $("#turn").parent().get(0).style.backgroundColor
    const ownerPiece = turnPlayer == alvo.style.backgroundColor
    
    

    //Escolher a pedra
    if (alvo.tagName === 'P' && ownerPiece) {
    
        const cell = alvo.parentElement.id.split('-').map(Number);
        if (selected) {
            rmSelected()
            if (selected != alvo) {
                alvo.classList.add('selected');
                const dame = $(".selected").hasClass('dame');

                moves(cell, alvo.style.backgroundColor,dame).forEach(e => {
                    e.classList.toggle('movs')
                });
                capture()

            }
        } else {
            alvo.classList.add('selected')
            const dame = $(".selected").hasClass('dame')

            moves(cell, alvo.style.backgroundColor,dame).forEach(e => {
                e.classList.toggle('movs')
            });
            capture()
        }
    } else if (alvo.tagName === 'DIV') { //Movimento
        if (selected) {
            const dame = $(".selected").hasClass('dame')

            const cellSelected = selected.parentElement.id.split('-').map(Number)
            const b = moves(cellSelected, selected.style.backgroundColor,dame)

            b.forEach(element => {
                if (element.id == alvo.id && $("#"+element.id).hasClass('movs')) {
                    document.getElementById(alvo.id).appendChild(selected)
                    changePlayer()
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
}

function promotion() {
    //Peça branca chegar a linha 0
    //Peça azul chegar a linha 7
    const selected = $(".selected")
    const house = selected.parent().hasClass('p1')
    console.log(selected);
    console.log(house);
}

board.addEventListener('click', select)
