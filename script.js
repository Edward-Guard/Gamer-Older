const board = document.getElementById('board')
const color2 = 'rgb(140, 85, 53)' //Azul
const color1 = 'rgb(216, 165, 121)' //Branco
const color3 = 'rgb(242, 198, 159)' //Ladrilho claro
const color4 = 'rgb(63, 48, 38)'//Madeira Escura





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
    let cor = color3
    for (let i = 0; i < 8; i += 1) {
        (cor == color3) ? cor = color4 : cor = color3;
        id = i;
        for (let l = 0; l < 8; l += 1) {
            (cor == color3) ? cor = color4 : cor = color3;
            id = (`${i}-${l}`);
            let promotion = ''
            if (i == 0) { promotion = 'p1' }
            if (i == 7) { promotion = 'p2' }

            board.appendChild(makeCells(id, cor, promotion))
        }
    }
}
function start() {
    
    const house = document.getElementById('board').children
    let count = 0
    for (let i = 1; i < 64; i += 1) {
        if (i < 24 && house[i].style.backgroundColor == color4) {
            count += 1 
            house[i].appendChild(makePiece(`b${count}`, color2))
        }
        if (i == 38) {
            count = 0
        }
        if (i > 39 && house[i].style.backgroundColor == color4) {
            count += 1
            house[i].appendChild(makePiece(`w${count}`, color1))
        }
    }
}
makeBoard();
start()

//Remover elemento selecionado
function rmSelected() {
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

    if (dama) {
        directions.push('a', 'b', 'c', 'd')
    } else if (color == color2) {
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
                    mvCap(opcion, nextCell)
                    if (nextCell && !nextCell.hasChildNodes()) {
                        cont += 1
                        markCap(nextCell)
                    }
                }
            });
            return cont
        }

        function mvCap(opcion, nextCell) {
            if (target && target == nextCell && !target.hasChildNodes()) {
                opcion.innerHTML = '';
                const score = $('#turn').prev().children().text()
                $('#turn').prev().children().text(Number(score) + 1)


                nextCell.appendChild(selected)
                const NCord = target.id.split('-').map(Number)
                if (checkAround(NCord) != 0) {
                    rmMarkeds()
                    checkAround(NCord)
                } else {
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

    const turnPlayer = $('.clock').css('backgroundColor')
    const ownerPiece = turnPlayer == alvo.style.backgroundColor
    console.log(turnPlayer);
    console.log(alvo.style.backgroundColor);
    console.log(ownerPiece);
    if (alvo.tagName === 'P' && ownerPiece) {

        const cell = alvo.parentElement.id.split('-').map(Number);
        if (selected) {
            rmSelected()
            if (selected != alvo) {
                alvo.classList.add('selected');
                const dame = $(".selected").hasClass('dame');

                moves(cell, alvo.style.backgroundColor, dame).forEach(e => {
                    e.classList.toggle('movs')
                });
                capture()

            }
        } else {
            alvo.classList.add('selected')
            const dame = $(".selected").hasClass('dame')

            moves(cell, alvo.style.backgroundColor, dame).forEach(e => {
                e.classList.toggle('movs')
            });
            capture()
        }
    } else if (alvo.tagName === 'DIV') { //Movimento
        if (selected) {
            const dame = $(".selected").hasClass('dame')

            const cellSelected = selected.parentElement.id.split('-').map(Number)
            const b = moves(cellSelected, selected.style.backgroundColor, dame)

            b.forEach(element => {
                if (element.id == alvo.id && $("#" + element.id).hasClass('movs')) {
                    document.getElementById(alvo.id).appendChild(selected)
                    changePlayer()
                    rmSelected()
                }
            });
            capture(alvo)

        }
    }
}



function changePlayer() {
    promotion()
    const clock = $('.relogio')

    if (clock.hasClass('change')) {
        clock.removeClass('change');   
    } else {
        clock.addClass('change');
    }
    winner()
}

function promotion() {
    //Peça branca chegar a linha 0
    //Peça azul chegar a linha 7
    const selected = $(".selected")
    const house = selected.parent().hasClass('p1')
    const house2 = selected.parent().hasClass('p2')
    const peça = selected.css('backgroundColor')

    if (peça == color1 && house && !selected.hasClass('dame')) {
        $('.selected').addClass('dame');
    }
    if (peça == color2 && house2 && !selected.hasClass('dame')) {
        $('.selected').addClass('dame');
    }
}

function winner() {
    const movs1 = countMoviments(color1)
    const movs2 = countMoviments(color2)

    if (movs2 == 0) {
        $('#result').text('Jogador 1 Venceu!').removeClass('ocult');
    } else if (movs1 == 0) {
        $('#result').text('Jogador 2 Venceu!').removeClass('ocult');
    }

}


function countMoviments(color) {
    const peao = $('.piece').filter(function () {
        return $(this).css('backgroundColor') === color
    })

    const moviment = [0];
    $.each(peao, function vl(i, val) {
        const pos = val.parentElement.id.split('-').map(Number)
        const cor = val.style.backgroundColor
        const dame = val.classList.contains('dame')

        moviment.push(checkCap(pos, cor).length)
        moviment.push(moves(pos, cor, dame).length)
    })
    const nMovs = moviment.reduce((a, b) => a + b)
    return nMovs
}

board.addEventListener('click', select)

function checkCap(position, color) {
    const capturas = []
    const directions = ['a', 'b', 'c', 'd']
    directions.forEach(dir => {
        const option = $('#' + direction(position, dir, 1))[0];
        if (option && option.hasChildNodes() && option.firstChild.style.backgroundColor != color) {
            const nextCell = $('#' + direction(position, dir, 2))[0]
            if (nextCell && !nextCell.hasChildNodes()) {
                capturas.push(nextCell)
            }
        }
    });
    return capturas
}

//const btnTeste = $('#tst').get(0)
//btnTeste.addEventListener('click', countMoviments)