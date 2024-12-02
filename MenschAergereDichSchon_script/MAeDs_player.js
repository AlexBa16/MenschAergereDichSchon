// Move Player
function clickOnPlayer(player, dice, pieceNr) {
    pieceNr -= 1;
    let this_piece = document.getElementsByClassName('player' + player.name)[pieceNr];
    let piecePosition = window.getComputedStyle(document.getElementsByClassName('player' + player.name)[pieceNr]).getPropertyValue('grid-area');
    piecePosition = Number(piecePosition.substring(1));
    if (this_piece.classList.contains('movable') === true) {
        let newPos = 0;
        if (player.pieces[pieceNr][1] === true) {//if on Field
            if (player.playerOnStart) {//change playerOnStart if player is moved away from his starting Field
                switch (player.name) {
                    case "B": {
                        if (piecePosition === 0) {
                            player.playerOnStart = false;
                        }
                        break;
                    }
                    case "R": {
                        if (piecePosition === 10) {
                            player.playerOnStart = false;
                        }
                        break;
                    }
                    case "Y": {
                        if (piecePosition === 20) {
                            player.playerOnStart = false;
                        }
                        break;
                    }
                    case "G": {
                        if (piecePosition === 30) {
                            player.playerOnStart = false;
                        }
                        break;
                    }
                }
            }
            let rangeBegin_start = 4;
            switch (player.name) {
                case "Y":
                    rangeBegin_start += 10;
                    break;
                case "G":
                    rangeBegin_start += 20;
                    break;
                case "B":
                    rangeBegin_start += 30;
                    break;
            }
            if (((piecePosition + dice[1]) >= (rangeBegin_start + 6) && (piecePosition + dice[1]) <= (rangeBegin_start + 9)) && !(piecePosition >= (rangeBegin_start + 6)) && !player.pieces[pieceNr][3]) { //true if in range & not in House
                player.pieces[pieceNr][3] = true;
                player.pieces[pieceNr][1] = false;
                newPos = (piecePosition + dice[1]) - rangeBegin_start - 1;
                killPiece(player.name + newPos, player);
                this_piece.style.gridArea = player.name + newPos;
            } else {
                newPos = Number(piecePosition) + dice[1];
                if (newPos >= 40) newPos -= 40;
                killPiece('F' + newPos, player);
                this_piece.style.gridArea = 'F' + newPos;
            }
        } else if (player.pieces[pieceNr][3]) {
            newPos = piecePosition + dice[1];
            killPiece(player.name + newPos, player);
            this_piece.style.gridArea = player.name + newPos;
        } else {//place Player on Starting Field
            player.playerOnStart = true;
            player.pieces[pieceNr][1] = true;
            switch (player.name) {
                case "B": {
                    newPos = 0;
                    break;
                }
                case "R": {
                    newPos = 10;
                    break;
                }
                case "Y": {
                    newPos = 20;
                    break;
                }
                case "G": {
                    newPos = 30;
                    break;
                }
            }
            killPiece('F' + newPos, player);
            this_piece.style.gridArea = 'F' + newPos;
        }
        // Remove the Movable and shadow class from all pieces
        for (const id in allPlayersIDs) {
            document.getElementById(allPlayersIDs[id]).classList.remove('movable');
            document.getElementById(allPlayersIDs[id]).classList.remove('shadow');
        }
        game_info_display_nextDice(player);
        nextDice(player, dice);
    }
    checkGameOver(player);
}

function moveShadowPlayer(player, pieceNr, dice) {
    let shadowPiece = document.getElementById('SP' + player.name + '_' + pieceNr);
    shadowPiece.classList.add('shadow');
    pieceNr -= 1;
    let this_piece = document.getElementsByClassName('player' + player.name)[pieceNr];
    let piecePosition = window.getComputedStyle(document.getElementsByClassName('player' + player.name)[pieceNr]).getPropertyValue('grid-area');
    piecePosition = Number(piecePosition.substring(1));
    if (this_piece.classList.contains('movable')) {
        let newPos = 0;
        if (player.pieces[pieceNr][1]) {//if on Field
            let rangeBegin_start = 4;
            switch (player.name) {
                case "Y":
                    rangeBegin_start += 10;
                    break;
                case "G":
                    rangeBegin_start += 20;
                    break;
                case "B":
                    rangeBegin_start += 30;
                    break;
            }
            if (((piecePosition + dice[1]) >= (rangeBegin_start + 6) && (piecePosition + dice[1]) <= (rangeBegin_start + 9)) && !(piecePosition >= (rangeBegin_start + 6)) && !player.pieces[pieceNr][3]) { //true if in range & not in House
                newPos = (piecePosition + dice[1]) - rangeBegin_start - 1;
                shadowPiece.style.gridArea = player.name + newPos;
            } else {
                newPos = Number(piecePosition) + dice[1];
                if (newPos >= 40) newPos -= 40;
                shadowPiece.style.gridArea = 'F' + newPos;
            }
        } else if (player.pieces[pieceNr][3]) {
            newPos = piecePosition + dice[1];
            shadowPiece.style.gridArea = player.name + newPos;
        }
    }
}

//Checks if any piece of a player is outside his starting field
function anyPieceOutside(player) { //returns true if any piece is on any field (excluded: start & finish Fields)
    let out = false;
    for (let i = 0; i < 4; i++) {
        if (player.pieces[i][1]) out = true;
    }
    return out;
}

function anyPieceHome(player) { //returns true if any piece is in his Home (Finish Fields)
    let out = false;
    for (let i = 0; i < 4; i++) {
        if (player.pieces[i][3]) out = true;
    }
    return out;
}

function checkGameOver(player) {
    let houseFull = true;
    for (let i = 0; i < 4; i++) {
        if (!player.pieces[i][3]) houseFull = false;
    }
    if (houseFull) {
        game_info_display_win(player);
        gameOver = true;
    }
    // /*temporary test*/let temp  = document.getElementsByClassName('player');for (const tempKey in temp) {temp[tempKey].style.display = "none";}
}

// Kill Pieces if on Finish Field
function killPiece(position, this_player) {
    let playerBlue_temp = new Player("B", 'playerB');
    let playerRed_temp = new Player("R", 'playerR');
    let playerYellow_temp = new Player("Y", 'playerY');
    let playerGreen_temp = new Player("G", 'playerG');
    let originalPos_temp = [
        playerBlue_temp.pieces[0][0],
        playerBlue_temp.pieces[1][0],
        playerBlue_temp.pieces[2][0],
        playerBlue_temp.pieces[3][0],
        playerRed_temp.pieces[0][0],
        playerRed_temp.pieces[1][0],
        playerRed_temp.pieces[2][0],
        playerRed_temp.pieces[3][0],
        playerYellow_temp.pieces[0][0],
        playerYellow_temp.pieces[1][0],
        playerYellow_temp.pieces[2][0],
        playerYellow_temp.pieces[3][0],
        playerGreen_temp.pieces[0][0],
        playerGreen_temp.pieces[1][0],
        playerGreen_temp.pieces[2][0],
        playerGreen_temp.pieces[3][0]
    ];
    for (const originalPosKey in originalPos_temp) {
        if (originalPos_temp[originalPosKey] === position) {
            if (originalPosKey < 4) {
                document.getElementsByClassName('playerB')[originalPosKey].style.gridArea = playerBlue_temp.pieces[originalPosKey][2];
                playerBlue.pieces[originalPosKey][1] = false;
                playerBlue.pieces[originalPosKey][3] = false;
                game_info_display_kill(this_player, playerBlue_temp, Number(originalPosKey) + 1);
                if (position === 'F0') {
                    playerBlue.playerOnStart = false;
                }
            } else if (originalPosKey < 8) {
                document.getElementsByClassName('playerR')[originalPosKey - 4].style.gridArea = playerRed_temp.pieces[originalPosKey - 4][2];
                playerRed.pieces[originalPosKey - 4][1] = false;
                playerRed.pieces[originalPosKey - 4][3] = false;
                game_info_display_kill(this_player, playerRed_temp, (Number(originalPosKey) - 4) + 1);
                if (position === 'F10') {
                    playerRed.playerOnStart = false;
                }
            } else if (originalPosKey < 12) {
                document.getElementsByClassName('playerY')[originalPosKey - 8].style.gridArea = playerYellow_temp.pieces[originalPosKey - 8][2];
                playerYellow.pieces[originalPosKey - 8][1] = false;
                playerYellow.pieces[originalPosKey - 8][3] = false;
                game_info_display_kill(this_player, playerYellow_temp, (Number(originalPosKey) - 8) + 1);
                if (position === 'F20') {
                    playerYellow.playerOnStart = false;
                }
            } else {
                document.getElementsByClassName('playerG')[originalPosKey - 12].style.gridArea = playerGreen_temp.pieces[originalPosKey - 12][2];
                playerGreen.pieces[originalPosKey - 12][1] = false;
                playerGreen.pieces[originalPosKey - 12][3] = false;
                game_info_display_kill(this_player, playerRed_temp, (Number(originalPosKey) - 12) + 1);
                if (position === 'F30') {
                    playerGreen.playerOnStart = false;
                }
            }
            break;
        }
    }
}

/*Move Player Manually*/
function mp(playerName, pieceNr, number) {
    document.getElementById('P' + playerName + '_' + pieceNr).classList.add('movable');
    switch (playerName) {
        case 'B': {
            diceB[1] = number;
            clickOnPlayer(playerBlue, diceB, pieceNr);
            break;
        }
        case 'R': {
            diceR[1] = number;
            clickOnPlayer(playerRed, diceR, pieceNr);
            break;
        }
        case 'Y': {
            diceY[1] = number;
            clickOnPlayer(playerYellow, diceY, pieceNr);
            break;
        }
        case 'G': {
            diceG[1] = number;
            clickOnPlayer(playerGreen, diceG, pieceNr);
            break;
        }
    }
}