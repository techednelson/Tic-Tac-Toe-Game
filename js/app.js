/*
// Credits
// The code just for the impossible level is base on Medium Article "How to make your Tic Tac Toe game unbeatable by using the minimax algorithm", written by ahmad abdolsaheb.
// Thanks to his article I can understand & apply the minimax algorithm for random games
// https://medium.freecodecamp.org/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37
*/

'use strict';
/*-- uiTableBoard Controller --*/
const uiBoard = (() => {
    
    const ux = (reset) => {
        if(!reset) {
            document.querySelector(`table`).style.visibility = `hidden`;
            document.getElementById(`firstWindow`).style.visibility = `visible`;
            document.getElementById(`resetAll`).style.display = `none`;
            document.getElementById(`playerTurn`).style.visibility= `hidden`;
        } else {
            document.querySelector(`table`).style.visibility = `visible`;
            document.getElementById(`firstWindow`).style.visibility = `hidden`;
            document.getElementById(`resetAll`).style.display = `block`;
            document.getElementById(`playerTurn`).style.visibility= `visible`;
        }
        document.getElementById(`winWindow`).style.visibility= `hidden`;
        document.getElementById(`thirdWindow`).style.visibility = `hidden`;
        const cells = document.querySelectorAll(`.cell`); 
        for(const cell of cells) {
            cell.style.background = `#296261`;
            cell.innerHTML = ``;
        }
    };
    
    const onePlayer = (index, player, window) => {
    
            
        index !== null ? document.getElementById(index).innerHTML = player : index;
        
        switch(window) {
            case `first`:
                document.getElementById(`firstWindow`).style.visibility = `hidden`;
                document.getElementById(`secondWindow`).style.visibility = `visible`;
                document.getElementById(`resetAll`).style.display = `block`;
                break;
            
            case `back`:
                document.getElementById(`firstWindow`).style.visibility = `visible`;
                document.getElementById(`secondWindow`).style.visibility = `hidden`;
                document.getElementById(`resetAll`).style.display = `none`;
                break;
            
            case `second`:
                document.getElementById(`secondWindow`).style.visibility = `hidden`;
                document.getElementById(`thirdWindow`).style.visibility = `visible`;
                document.getElementById(`resetAll`).style.display = `block`;
                break;
            
            case `back2`:
                document.getElementById(`secondWindow`).style.visibility = `visible`;
                document.getElementById(`thirdWindow`).style.visibility = `hidden`;
                document.getElementById(`resetAll`).style.display = `block`;
                break;
                
            case `third`:
                document.getElementById(`thirdWindow`).style.visibility = `hidden`;
                document.querySelector(`table`).style.visibility = `visible`;
                document.getElementById(`playerTurn`).style.visibility = `visible`;
                document.getElementById(`playerTurn`).innerHTML = `${player} It's your turn!`;
                document.getElementById(`resetAll`).style.display = `block`;
                break;
        }
        
    };
    
    const twoPlayer = (index, playerInTurn) => {
        document.getElementById(`firstWindow`).style.visibility = `hidden`;
        document.querySelector(`table`).style.visibility = `visible`;
        if(index !== null) {
            document.getElementById(index).innerHTML = playerInTurn;
            playerInTurn === `O` ? playerInTurn = `X` : playerInTurn = `O`;
            document.getElementById(`playerTurn`).innerHTML = `${playerInTurn} It's your turn!`;
        } else {
            document.getElementById(`playerTurn`).style.visibility= `visible`;
            document.getElementById(`playerTurn`).innerHTML = `O It's your turn!`;
        }
        document.getElementById(`resetAll`).style.display = `block`;
    };
    
    /*-- Function Expression to print winner for 1 or 2 Players --*/
    const printWinner = (wc, wp, msn) => {
        const delayAlert = (winning, player) => {
            if(winning !== 9) {
                switch (msn) {
                case `Hoops You Lost!`:
                    window.setTimeout(() => {
                        document.getElementById(`winWindow`).style.visibility = `visible`;
                        document.getElementById(`winWindow`).innerHTML = `Game Over You Lost!`;
                    }, 650);
                    break;
                default:
                    window.setTimeout(() => {
                        document.getElementById(`winWindow`).style.visibility = `visible`;
                        document.getElementById(`winWindow`).innerHTML = `Game Over ${player} Won!`;
                    }, 650);
                }
            } else {
                window.setTimeout(() => {
                    document.getElementById(`winWindow`).innerHTML = `Game Over is a Draw!`;
                    document.getElementById(`winWindow`).style.visibility = `visible`;
                },650);
            }
        };

        switch (wc) {
        case 1: {
            for (let i = 0; i < 3; i++) {document.getElementById(i).style.background = `#34888B`;}
            delayAlert(wc, wp);
            break;
        }
        case 2:
            for (let i = 3; i < 6; i++) {document.getElementById(i).style.background = `#34888B`;}
            delayAlert(wc, wp);
            break;
        case 3:
            for (let i = 6; i < 9; i++) {document.getElementById(i).style.background = `#34888B`;}
            delayAlert(wc, wp);
            break;
        case 4:
            for (let i = 0; i < 7; i = i + 3) {document.getElementById(i).style.background = `#34888B`;}
            delayAlert(wc, wp);
            break;
        case 5:
            for (let i = 1; i < 8;i = i + 3) {document.getElementById(i).style.background = `#34888B`;}
            delayAlert(wc, wp);
            break;
        case 6:
            for (let i = 2; i < 9;i = i + 3) {document.getElementById(i).style.background = `#34888B`;}
            delayAlert(wc, wp);
            break;
        case 7:
            for (let i = 0; i < 9;i = i + 4) {document.getElementById(i).style.background = `#34888B`;}
            delayAlert(wc, wp);
            break;
        case 8:
            for (let i = 2; i < 7;i = i + 2) {document.getElementById(i).style.background = `#34888B`;}
            delayAlert(wc, wp);
            break;
        case 9:
            delayAlert(wc);
            break;

        }  // Closing switch conditional
    };
   /*-- Function Expression to print winner for 1 or 2 Players --*/
    
    return {
        ux: ux,
        onePlayer: onePlayer,
        twoPlayer: twoPlayer,
        printWinner: printWinner
    };
    
})();
/*-- /uiBoard Controller --*/

/*-- boardLogic Controller --*/
const logicBoard = (() => {
    let tableBoard;
    let winCom = 0;
    /*-- Function Expression to check  if game is over for 1 or 2 Players --*/
    const gameOver = (board, player, reset) => {
        if(!reset) {
            // check horizontal winning combinations: return 0,1 or 2
            for(let i = 0; i < 9; i = i+3) {
                if(board[i] === player && board[i] === board[i+1] && board[i] === board[i+2]) {
                    i === 0 ? winCom = 1: winCom;
                    i === 3 ? winCom = 2: winCom;
                    i === 6 ? winCom = 3: winCom;
                    tableBoard = [0,1,2,3,4,5,6,7,8];
                    return {
                        true: true,
                        winCom: winCom,
                        player: player
                    };
                }
            }
            //check vertical winning combinations: return 3,4 or 5
            for(let i = 0; i < 3; i++) {
                if(board[i] === player && board[i] === board[i+3] && board[i] === board[i+6]) {
                    i === 0 ? winCom = 4: winCom;
                    i === 1 ? winCom = 5: winCom;
                    i === 2 ? winCom = 6: winCom;
                    tableBoard = [0,1,2,3,4,5,6,7,8];
                    return {
                        true: true,
                        winCom: winCom,
                        player: player
                    };
                }
            }
            // check x combinartions: return 6 or 7
            if(board[0] === player && board[0] === board[4] && board[0] === board[8]) {
                winCom = 7;
                tableBoard = [0,1,2,3,4,5,6,7,8];
                return {
                    true: true,
                    winCom: winCom,
                    player: player
                };
            } else if (board[2] === player && board[2] === board[4]  && board[2] === board[6]) {
                winCom = 8;
                tableBoard = [0,1,2,3,4,5,6,7,8];
                return {
                    true: true,
                    winCom: winCom,
                    player: player
                };
            } else {
                return false;
            }  
        } else {
            winCom = 0;
            tableBoard = [0,1,2,3,4,5,6,7,8];
        }   
    };
    /*-- Function Expression to check  if game is over for 1 or 2 Players --*/
    
    return {
        gameOver: gameOver
    };
 
})();
/*-- /boardLogic Controller --*/

/*-- App Controller --*/
const controller = ((uiCtrl, logicCtrl) => {
    
    const setupEvenetListeners = () => {
        //Flag to start listeners depending on player and difficulty selected
        let oneEasy = false, oneHard = false, twoP = false;
        
        //global variables for whole module
        let winner = 0, board = [0,1,2,3,4,5,6,7,8];
        const cells = document.querySelectorAll(`.cell`);
        let gameOver = false;
        
        //variables for 1 pleayer easy
        let pcCount = 0, huCount = 0, huPlayer, computer, currentPlayerOne;
        
        //variables for 1 pleayer hard
        let iter = 0, round = 0, aiPlayer; // Plus pcCount, huCount & currentPlayerOne
        
        //variables for 2 player module
        const player1 = `O`, player2 = `X`;
        let currentPlayerTwo = player1, twoPlayerCounter = 0;
        
        //eventListener 1 for selecting player(2)
        document.addEventListener(`click`, function (e) { 
            switch(e.target.id) {
                case `resetAll`:
                    uiCtrl.ux(false);
                    oneEasy = false;
                    oneHard = false;
                    twoP = false;
                    break;
                    
                //windows for 1 player game
                case `onePlayer`:
                    uiCtrl.onePlayer(null, null, `first`);
                    break;
                
                case `x`:
                    uiCtrl.onePlayer(null, null, `second`);
                    huPlayer = `X`;
                    break;
                    
                case `o`:
                    uiCtrl.onePlayer(null, null, `second`);
                    huPlayer = `O`;
                    break;
                    
                case `back`:
                    uiCtrl.onePlayer(null, null, `back`);
                    break;
                
                case `easy`:
                    board = [0,1,2,3,4,5,6,7,8];
                    pcCount = 0;
                    huCount = 0;
                    huPlayer === `O` ? computer = `X` : computer = `O`;
                    currentPlayerOne = huPlayer;
                    uiCtrl.onePlayer(null, currentPlayerOne, `third`);
                    oneEasy = true;
                    break;
                    
                case `hard`:
                    board = [0,1,2,3,4,5,6,7,8];
                    winner = 0;
                    iter = 0; 
                    round = 0;
                    huPlayer === `O` ? aiPlayer = `X` : aiPlayer = `O`;
                    currentPlayerOne = huPlayer;
                    uiCtrl.onePlayer(null, currentPlayerOne, `third`);
                    oneHard = true;
                    break;
                    
                case `back2`:
                    uiCtrl.onePlayer(null, null, `back2`);
                    break;
                    
                //windows for 2 player game
                case `twoPlayers`: { //
                    board = [0,1,2,3,4,5,6,7,8];
                    winner = 0;
                    currentPlayerTwo = player1;
                    uiCtrl.twoPlayer(null);
                    logicCtrl.gameOver(board, currentPlayerTwo, true);
                    twoP = true;
                    break; 
                } //close case `twoPlayers`
            }
        }, false); //close eventListener 1
   
        //eventListener3 for 1 player - easy module
        for(const cell of cells) {
            cell.addEventListener('click', function(e) {
                if(oneEasy) {
                    const index = e.target.id;
                    if (board[index] !== `X` && board[index] !== `O` && gameOver === false) {
                        huCount++;
                        currentPlayerOne = huPlayer;
                        board[index] = currentPlayerOne; 
                        uiCtrl.onePlayer(index, currentPlayerOne);
                        winner = logicCtrl.gameOver(board, currentPlayerOne, false);
                        if(winner.true) {
                            uiCtrl.printWinner(winner.winCom, huPlayer);
                            gameOver = true;
                            restart();
                        } else {
                            let pcPlayed = false;
                            while (!pcPlayed && pcCount < 4) { //computer can play max 4 times
                                const random = Math.floor(Math.random() * (8 - 0)) + 0;
                                if (board[random] !== `X` && board[random] !== `O`) {
                                    board[random] = computer;
                                    uiCtrl.onePlayer(random, computer);
                                    winner = logicCtrl.gameOver(board, computer, false);
                                    if(winner.true) {
                                        uiCtrl.printWinner(winner.winCom, computer);
                                        gameOver = true;
                                        restart();
                                    }
                                    currentPlayerOne = computer;
                                    pcPlayed = true;
                                    pcCount++; 
                                }
                            } //closing while 
                        }

                        // verify if there was a tie or human won in the last play
                        if (pcCount === 4 && huCount === 5) {
                            winner = logicCtrl.gameOver(board, currentPlayerOne, false);
                            if (winner) {
                                uiCtrl.printWinner(winner.winCom, winner.player);
                                gameOver = true;
                                restart();
                            } else {
                                uiCtrl.printWinner(9);
                                gameOver = true;
                                restart();
                            }
                        } // closing if
                    }
                }//close if oneEasy
            }, false);//close eventListener2
        }//close for loop inside eventListener2
        
        //eventListener4 for 1 player - hard module
        for(const cell of cells) {
            cell.addEventListener('click', function(e) {
                if(oneHard) {
                    //available spots
                    const avail = (reboard) => {
                        return reboard.filter( (s) => s != `O` && s != `X`);
                    };    
                    
                    const minimax = (reboard, player) => {
                        iter += 1;
                        let array = avail(reboard);
                        if (logicCtrl.gameOver(reboard, huPlayer).true) {
                            return {
                                score: -10
                            };
                        } else if (logicCtrl.gameOver(reboard, aiPlayer).true) {
                            return {
                                score: 10
                            };
                        } else if (array.length === 0) {
                            return {
                                score: 0
                            };
                        }

                        const moves = [];
                        for (let i = 0; i < array.length; i++) {
                            const move = {};
                            move.index = reboard[array[i]];
                            reboard[array[i]] = player;
                            if (player == aiPlayer) {
                                const g = minimax(reboard, huPlayer);
                                move.score = g.score;
                            } else {
                                const g = minimax(reboard, aiPlayer);
                                move.score = g.score;
                            }
                            reboard[array[i]] = move.index;
                            moves.push(move);
                        }

                        let bestMove;
                        if (player === aiPlayer) {
                            let bestScore = -10000;
                            for (let i = 0; i < moves.length; i++) {
                                if (moves[i].score > bestScore) {
                                    bestScore = moves[i].score;
                                    bestMove = i;
                                }
                            }
                        } else {
                            let bestScore = 10000;
                            for (let i = 0; i < moves.length; i++) {
                                if (moves[i].score < bestScore) {
                                    bestScore = moves[i].score;
                                    bestMove = i;
                                }
                            }
                        }

                        return moves[bestMove];
                    };
                    
                    const move = (element, player) => {
                        if (board[element.target.id] !== `X` && board[element.target.id] !== `O` && gameOver === false) {
                            round++;
                            uiCtrl.onePlayer(element.target.id, player);
                            board[element.target.id] = player;
                            winner = logicCtrl.gameOver(board, player);
                            if (winner.true) {
                                uiCtrl.printWinner(winner.winCom, winner.player, `Great You Won!`);
                                gameOver = true;
                                restart();
                            } else if (round > 8) {
                                uiCtrl.printWinner(9);
                                gameOver = true;
                                restart();
                            } else {
                                round++;
                                let index = minimax(board, aiPlayer).index;
                                uiCtrl.onePlayer(index, aiPlayer);
                                board[index] = aiPlayer;
                                winner = logicCtrl.gameOver(board, aiPlayer);
                                if (winner.true) {
                                    uiCtrl.printWinner(winner.winCom, winner.player, `Hoops You Lost!`);
                                    gameOver = true;
                                    restart();
                                } else if (round === 0) {
                                    uiCtrl.printWinner(9);
                                    gameOver = true;
                                    restart();
                                }
                            }
                        }
                    };
                    
                    move(e, huPlayer);
          
                }//close 1 pleayer - hard module
            }, false);//close eventListener4
        }//close for loop inside eventListener4
        
        //eventListener2 for 2 players
        for(const cell of cells) {
            cell.addEventListener('click', function(e) {
                if(twoP) {
                    const index = e.target.id;
                    if (board[index] !== `X` && board[index] !== `O` && gameOver === false) {
                        board[index] = currentPlayerTwo;
                        uiCtrl.twoPlayer(index, currentPlayerTwo);
                        twoPlayerCounter++;
                        winner = logicCtrl.gameOver(board, currentPlayerTwo, false);
                        currentPlayerTwo === player1 ? currentPlayerTwo = player2 : currentPlayerTwo = player1;
                        //check if there is a winner
                        if(winner.true) {
                            twoPlayerCounter = 0;
                            uiCtrl.printWinner(winner.winCom, winner.player);
                            gameOver = true;
                            restart();
                        } else if (winner === false && twoPlayerCounter === 9) {
                            twoPlayerCounter = 0;
                            uiCtrl.printWinner(9);
                            gameOver = true;
                            restart();
                        }
                    }
                } //close if twoP
            }, false);//close eventListener2
        }//close for loop inside eventListener2
        
        //restart the game as soon as there is a winner
        const restart = () => {
            setTimeout(() =>{
                //global variables
                board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
                winner = 0;
                gameOver = false;
                for(let i = 0; i < 9; i ++) {
                    const cell = document.getElementById(i);
                    cell.innerHTML = ``;
                    cell.style.background = `#296261`;
                    document.getElementById(`winWindow`).style.visibility = `hidden`;
                }
                //variables for 2 players module
                twoPlayerCounter = 0;
                logicCtrl.gameOver(board, currentPlayerTwo, true);
                uiCtrl.ux(true);
                //variables for 1 player easy module
                currentPlayerOne === undefined ? currentPlayerOne = `O` : currentPlayerOne;
                uiCtrl.onePlayer(null, currentPlayerOne, `third`);
                pcCount = 0, 
                huCount = 0;
                //variables for 1 player hard module
                round = 0;
                
            }, 3000);
        };
        
    };//close setUpEventListeners 
    
    return {
        init: () => {
            console.log(`Application has started`);
            setupEvenetListeners();
        }
    };
    
})(uiBoard, logicBoard);
/*-- App Controller --*/

/*-- Controller Init --*/
controller.init();
/*-- /Controller Init --*/