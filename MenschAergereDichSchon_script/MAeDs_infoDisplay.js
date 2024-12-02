let gameInfo = document.getElementById('game_infoField');
let first = true;
//Display of Game Information
function game_info_display_dice(player, dice) {
    let text = what_player(player);
    text += " hat eine " + dice[1] + " gewürfelt.";
    game_info_display_add(text, first);
    if (first) first = false;
}
function game_info_display_nextDice(player) {
    let text = what_player(player);
    text += " hat seinen Zug getätigt.";
    game_info_display_add(text, false);
}
function game_info_display_nextPlayer(player) {
    let text = what_player(player);
    text += " ist am Zug.";
    game_info_display_add(text, true);
}
function game_info_display_move() {
    let text = "Bitte wähle eine Spielfigur.";
    game_info_display_add(text, false);
}
function game_info_display_win(player) {
    let text = what_player(player);
    text += " hat das Spiel gewonnen."
    game_info_display_add(text, true);
    playerInfo.innerHTML = what_player(player);
    playerInfo.style.color = "var(--MAeDs_" + what_player_EN_lower(player) + ")";
    document.getElementById('this_player_info_turn').innerHTML = "hat das Spiel gewonnen";
    document.getElementById('win_player').innerHTML = what_player(player);
    document.getElementById('win_player').style.color = "var(--MAeDs_" + what_player_EN_lower(player) + ")";
    setTimeout(function (){
        document.getElementsByClassName('win')[0].style.display = "flex";
        document.getElementsByClassName('GameBoard')[0].style.opacity = "0.5";
    }, 2000);
}
function game_info_display_kill(player, killedPlayer, killedPlayerNr) {
    let text =
        "Spielstein " + killedPlayerNr + " von " + what_player(killedPlayer) +
        " wurde von " + what_player(player) + " geschlagen";
    game_info_display_add(text, false);
}
function what_player(player){
    let text = "";
    switch (player.name){
        case "B":{text = "Blau";break;}
        case "R":{text = "Rot";break;}
        case "Y":{text = "Gelb";break;}
        case "G":{text = "Grün";break;}
    }
    return text;
}
function what_player_EN(player){
    let text = "";
    switch (player.name){
        case "B":{text = "Blue";break;}
        case "R":{text = "Red";break;}
        case "Y":{text = "Yellow";break;}
        case "G":{text = "Green";break;}
    }
    return text;
}
function what_player_EN_lower(player){
    let text = "";
    switch (player.name){
        case "B":{text = "blue";break;}
        case "R":{text = "red";break;}
        case "Y":{text = "yellow";break;}
        case "G":{text = "green";break;}
    }
    return text;
}
function game_info_display_add(text, space) {
    let br = document.createElement("br");
    let hr = document.createElement("hr");
    let li = document.createElement("li");
    let textNode = document.createTextNode(text);
    li.appendChild(textNode);
    if (space){
        gameInfo.appendChild(hr)
        gameInfo.appendChild(br);
    }
    gameInfo.appendChild(li);
    gameInfo.scrollTop = gameInfo.scrollHeight;
}