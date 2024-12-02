//Dices
let diceB = [document.getElementById('diceB'), 6];
let diceR = [document.getElementById('diceR'), 6];
let diceY = [document.getElementById('diceY'), 6];
let diceG = [document.getElementById('diceG'), 6];

//Player

class Player {
    playerOnStart = false;
    playerNr = 0;

    constructor(name, piecesClass, playerNr) {
        this.pieces = Array.from(document.getElementsByClassName(piecesClass)).map((piece, i) => {
            return [window.getComputedStyle(piece).getPropertyValue('grid-area'), false, `${name}${i + 1}`, false];
        });
        this.name = name;
        this.playerNr = playerNr;
    }
}

let playerBlue = new Player("B", 'playerB', 0);
let playerRed = new Player("R", 'playerR', 1);
let playerYellow = new Player("Y", 'playerY', 2);
let playerGreen = new Player("G", 'playerG', 3);
let allPlayersIDs = [
    "PB_1", "PB_2", "PB_3", "PB_4",
    "PR_1", "PR_2", "PR_3", "PR_4",
    "PY_1", "PY_2", "PY_3", "PY_4",
    "PG_1", "PG_2", "PG_3", "PG_4",
    // Shadow Players
    "SPB_1", "SPB_2", "SPB_3", "SPB_4",
    "SPR_1", "SPR_2", "SPR_3", "SPR_4",
    "SPY_1", "SPY_2", "SPY_3", "SPY_4",
    "SPG_1", "SPG_2", "SPG_3", "SPG_4"
];

//general

let gameOver = false;
let playersTurn = 0; //0 = Blue; 1 = Red; 2 = Yellow; 3 = Green
let diceThrowTime = 500;
let counterDice = 0;
let anzOfAllPlayers = 4;
//Info

let playerInfo = document.getElementById('this_player_info');

//Console Title
function gameTitleInConsole() {
    let banner =
        "                                    _     _                                              \n" +
        " __  __                     _      (_) _ (_)                              _ _      _     \n" +
        "|  \\/  | ___ _ __  ___  ___| |__      / \\   _ __ __ _  ___ _ __ ___    __| (_) ___| |__  \n" +
        "| |\\/| |/ _ \\ '_ \\/ __|/ __| '_ \\    / _ \\ | '__/ _` |/ _ \\ '__/ _ \\  / _` | |/ __| '_ \\ \n" +
        "| |  | |  __/ | | \\__ \\ (__| | | |  / ___ \\| | | (_| |  __/ | |  __/ | (_| | | (__| | | |\n" +
        "|_|  |_|\\___|_| |_|___/\\___|_| |_| /_/   \\_\\_|  \\__, |\\___|_|  \\___|  \\__,_|_|\\___|_| |_|\n" +
        "                                                |___/                                    \n" +
        "          _                 \n" +
        " ___  ___| |__   ___  _ __  \n" +
        "/ __|/ __| '_ \\ / _ \\| '_ \\ \n" +
        "\\__ \\ (__| | | | (_) | | | |_\n" +
        "|___/\\___|_| |_|\\___/|_| |_(_)\n" +
        " \n" +
        " _                  _    _                          _             \n" +
        "| |__  _   _       / \\  | | _____  ____ _ _ __   __| | ___ _ __   \n" +
        "| '_ \\| | | |     / _ \\ | |/ _ \\ \\/ / _` | '_ \\ / _` |/ _ \\ '__|  \n" +
        "| |_) | |_| |_   / ___ \\| |  __/>  < (_| | | | | (_| |  __/ |     \n" +
        "|_.__/ \\__, (_) /_/   \\_\\_|\\___/_/\\_\\__,_|_| |_|\\__,_|\\___|_|     \n" +
        "       |___/                                                              \n"
    console.info(banner);
}

gameTitleInConsole();