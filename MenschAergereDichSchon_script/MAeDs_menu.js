let choosingArrow = document.getElementById('startArrow');
const root = document.querySelector(':root');

function numberOfPlayers(anz) {
    document.getElementsByClassName('numberOfPlayers')[0].style.display = "none";
    document.getElementsByClassName('startingPlayer')[0].style.display = "flex";
    let max = 4;
    let startPlayer = 0;
    if (anz < 4) {
        for (let i = 1; i <= 4; i++) {
            document.getElementById('PG_' + i).classList.add('disabled');
            document.getElementById('G' + i).classList.add('disabled');
            document.getElementById('G' + (i + 4)).classList.add('disabled');
        }
        document.getElementById('diceG').classList.add('disabled');
        document.getElementById('ArrowG').classList.add('disabled');
        document.getElementById('F30').classList.remove('greenStart');
        document.getElementById('startG').classList.add('disabled');
        playerGreen.playerNr = -1;
        max = 3;
        anzOfAllPlayers--;
    }
    if (anz < 3) {
        for (let i = 1; i <= 4; i++) {
            document.getElementById('PR_' + i).classList.add('disabled');
            document.getElementById('R' + i).classList.add('disabled');
            document.getElementById('R' + (i + 4)).classList.add('disabled');
        }
        document.getElementById('diceR').classList.add('disabled');
        document.getElementById('ArrowR').classList.add('disabled');
        document.getElementById('F10').classList.remove('redStart');
        document.getElementById('startR').classList.add('disabled');
        playerRed.playerNr = -1;
        playerYellow.playerNr = 1;
        max = 2;
        startPlayer = Math.floor(Math.random() * max);
        anzOfAllPlayers--;
        switch (startPlayer) {
            case 0: {
                document.getElementById('diceB').classList.add('throwable');
                playerInfo.innerHTML = "Blau";
                playerInfo.style.color = "var(--MAeDs_blue)";
                break;
            }
            case 1: {
                document.getElementById('diceY').classList.add('throwable');
                playerInfo.innerHTML = "Gelb";
                playerInfo.style.color = "var(--MAeDs_yellow)";
                break;
            }
        }
    } else {
        startPlayer = Math.floor(Math.random() * max);
        switch (startPlayer) {
            case 0: {
                document.getElementById('diceB').classList.add('throwable');
                playerInfo.innerHTML = "Blau";
                playerInfo.style.color = "var(--MAeDs_blue)";
                break;
            }
            case 1: {
                document.getElementById('diceR').classList.add('throwable');
                playerInfo.innerHTML = "Rot";
                playerInfo.style.color = "var(--MAeDs_red)";
                break;
            }
            case 2: {
                document.getElementById('diceY').classList.add('throwable');
                playerInfo.innerHTML = "Gelb";
                playerInfo.style.color = "var(--MAeDs_yellow)";
                break;
            }
            case 3: {
                document.getElementById('diceG').classList.add('throwable');
                playerInfo.innerHTML = "Grün";
                playerInfo.style.color = "var(--MAeDs_green)";
                break;
            }
        }
    }
    playersTurn = startPlayer;
    let choosePlayerTime = 4; //in sec
    let newLeft = '0';
    let newColor = 'blue';
    switch (anzOfAllPlayers) {
        case 2: {
            changeAnimationVar('200px', '400px', '200px', '400px');
            root.style.setProperty('--MAeDs_menu_color_red', 'yellow');
            root.style.setProperty('--MAeDs_menu_color_green', 'yellow');
            root.style.setProperty('--MAeDs_menu_color_yellow', 'blue');
            newLeft = '200px'
            if (startPlayer === 1) {
                newLeft = '400px';
                newColor = 'yellow';
            }
            break;
        }
        case 3: {
            newLeft = '100px'
            choosingArrow.style.animation = 'swing_3Player 2s infinite'
            changeAnimationVar('100px', '300px', '500px', '500px');
            switch (startPlayer) {
                case 1: {
                    newLeft = '300px';
                    newColor = 'red';
                    break;
                }
                case 2: {
                    newLeft = '500px';
                    newColor = 'yellow';
                    break;
                }
            }
            break;
        }
        default: {
            switch (startPlayer) {
                case 1: {
                    newLeft = '200px';
                    if (anz === 2) newColor = 'yellow';
                    else newColor = 'red';
                    break;
                }
                case 2: {
                    newLeft = '400px';
                    newColor = 'yellow';
                    break;
                }
                case 3: {
                    newLeft = '600px';
                    newColor = 'green';
                    break;
                }
            }
            break;
        }
    }
    setTimeout(function () {
        root.style.setProperty('--MAeDs_menu_left_0', newLeft);
        root.style.setProperty('--MAeDs_menu_color_blue', newColor);
        choosingArrow.addEventListener('animationiteration', function () {
            choosingArrow.style.animationPlayState = 'paused';
            if (anzOfAllPlayers >= 3) document.getElementsByClassName('startPlayer_div')[startPlayer].style.color = newColor;
            else {
                if (startPlayer === 0) document.getElementsByClassName('startPlayer_div')[startPlayer].style.color = newColor;
                else document.getElementsByClassName('startPlayer_div')[startPlayer + 1].style.color = newColor;
            }
        });
        setTimeout(function () {
            document.getElementsByClassName('GameMenu')[0].style.display = "none";
            document.getElementsByClassName('GameBoard')[0].style.display = "flex";
        }, (choosePlayerTime * 1000) / 2);
    }, ((choosePlayerTime * 1000) * 4) / 3);
}

function changeAnimationVar(L0, L1, L2, L3) {
    let values = [L0, L1, L2, L3];
    for (const key in values) {
        root.style.setProperty('--MAeDs_menu_left_' + key, values[key]);
    }
}