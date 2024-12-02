function RollDice(color, dice, player) {
    if (playersTurn === player.playerNr && !gameOver) {
        dice[0].removeAttribute("onclick");
        dice[0].classList.add('spin');
        setTimeout(function () {
            dice[0].classList.remove('spin');
            document.getElementsByClassName('dice' + color + '_' + dice[1])[0].style.display = "none";
            // dice[1] = 1;
            dice[1] = Math.floor((Math.random() * 6) + 1);
            game_info_display_dice(player, dice);
            document.getElementsByClassName('dice' + color + '_' + dice[1])[0].style.display = "block";
            turn(color, dice, player);
        }, diceThrowTime);
    }
}
// Movable
function turn(color, dice, player) {
    if (dice[1] === 6 && !player.playerOnStart){
        for (let i = 1; i <= 4; i++) {
            if (!player.pieces[i - 1][3]) {
                document.getElementById('P' + player.name + '_' + i).classList.add('movable');
            }
        }
        game_info_display_move();
        document.getElementById('dice' + player.name).classList.remove('throwable');
        counterDice = 0;
    }
    else{
        if (counterDice < 2 && !anyPieceOutside(player) && !anyPieceHome(player)){
            dice[0].setAttribute("onclick", "RollDice('"+color+"', dice"+color+", player"+what_player_EN(player)+")");
            counterDice++;
        }
        else {
            counterDice = 0;
            let ct = 0;
            for (let i = 1; i <= 4; i++) {
                if (player.pieces[i - 1][1]) {
                    document.getElementById('P' + player.name + '_' + i).classList.add('movable');
                    moveShadowPlayer(player, i, dice);
                }//if in house look if movable
                else if (player.pieces[i - 1][3]){
                    let piecePosition = window.getComputedStyle(document.getElementsByClassName('player'+player.name)[i-1]).getPropertyValue('grid-area');
                    piecePosition = Number(piecePosition.substring(1));
                    if ((Number(piecePosition) + dice[1]) <= 8) {
                        document.getElementById('P' + player.name + '_' + i).classList.add('movable');
                        moveShadowPlayer(player, i, dice);
                    }
                    else{ct++;}
                }
                else ct++;
            }
            if (ct === 4) {
                nextDice(player, dice);
            } else game_info_display_move();
            document.getElementById('dice' + player.name).classList.remove('throwable');
        }
    }
    if (dice[1] === 6){
        for (let i = 1; i <= 4; i++) {
            if (player.pieces[i - 1][1]) {
                moveShadowPlayer(player, i, dice);
            }
        }
    }
}
// Mark next Dice
function nextDice(player, dice) {
    counterDice = 0;
    switch (player.name){
        case "B":{
            dice[0].setAttribute("onclick", "RollDice('B', diceB, playerBlue)");
            if (anzOfAllPlayers >= 3) {
                playerInfo.innerHTML = "Rot";
                playerInfo.style.color = "var(--MAeDs_red)";
                game_info_display_nextPlayer(playerRed);
                document.getElementById('diceR').classList.add('throwable');
            }
            else {
                playerInfo.innerHTML = "Gelb";
                playerInfo.style.color = "var(--MAeDs_yellow)";
                game_info_display_nextPlayer(playerYellow);
                document.getElementById('diceY').classList.add('throwable');
            }
            break;
        }
        case "R":{
            dice[0].setAttribute("onclick", "RollDice('R', diceR, playerRed)");
            playerInfo.innerHTML = "Gelb";
            playerInfo.style.color = "var(--MAeDs_yellow)";
            game_info_display_nextPlayer(playerYellow);
            document.getElementById('diceY').classList.add('throwable');
            break;
        }
        case "Y":{
            dice[0].setAttribute("onclick", "RollDice('Y', diceY, playerYellow)");
            if (anzOfAllPlayers === 4) {
                playerInfo.innerHTML = "Grün";
                playerInfo.style.color = "var(--MAeDs_green)";
                game_info_display_nextPlayer(playerGreen);
                document.getElementById('diceG').classList.add('throwable');
            }
            else{
                playerInfo.innerHTML = "Blau";
                playerInfo.style.color = "var(--MAeDs_blue)";
                game_info_display_nextPlayer(playerBlue);
                document.getElementById('diceB').classList.add('throwable');
            }
            break;
        }
        case "G":{
            dice[0].setAttribute("onclick", "RollDice('G', diceG, playerGreen)");
            playerInfo.innerHTML = "Blau";
            playerInfo.style.color = "var(--MAeDs_blue)";
            game_info_display_nextPlayer(playerBlue);
            document.getElementById('diceB').classList.add('throwable');
            break;
        }
    }
    if (anzOfAllPlayers === 3){
        if (player.name === 'Y'){playersTurn = 0;}
        else{playersTurn++;}
    }
    else if (anzOfAllPlayers === 2){
        if (player.name === "Y"){playersTurn = 0;}
        else{playersTurn++;}
    }
    else {
        if (player.name === "G"){playersTurn = 0;}
        else{playersTurn++;}
    }
}