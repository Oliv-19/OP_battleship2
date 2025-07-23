import Dom from "./dom"
import Ships from './ships'
import Gameboard from './gameboard'
import Player from "./player"
import Computer from "./computer"

Dom.init()
let playerGrid= document.querySelector('.playerGrid')
let enemyGrid= document.querySelector('.enemyGrid')

let playerGameboard= new Gameboard()
let computerGameboard= new Gameboard()

let player= new Player('player',playerGameboard, playerGrid)
let computer= new Player('computer', computerGameboard, enemyGrid)

let computerInstance= new Computer(computer, playerGameboard, computerGameboard, Dom.displayAttack)


let shipsInfo=[['carrier', 5,], [ 'battleship',4], 
[ 'cruiser',3],[ 'submarine',3],[ 'destroyer',2]]

let currPlayer= player
let currShip
let currShipInfo
let currPosiblePositions
let isPlayerTurn = true

function changeTurn(){

    isPlayerTurn = !isPlayerTurn
    if(!isPlayerTurn){
        makeComputerMove()
    }else{
        enemyGrid.addEventListener('click', attack)
    }
    console.log('isplayerturn:' +isPlayerTurn)
}

function makeComputerMove(){
    setTimeout(()=>{
        let move= computerInstance.attack()
        if(move.isHit){
           makeComputerMove()
        }else{
            changeTurn()
        }
        //changeTurn()
    }, 1000)
}

function generateShips(ship){
    
    let newShip= new Ships(1, ship[1], ship[0])
    return newShip
}

function getPosiblePositions(e, shipSize){
    let id= e.target ? e.target.id : e.id

    let result=[]

    let coorYPos = (Number(id[0])+(shipSize-1) ) >9 ? null :(Number(id[0])+(shipSize-1) ) +id[1] 
    let coorYNeg = (Number(id[0])-(shipSize-1) )<0 ?null: (Number(id[0])-(shipSize-1) )+id[1] 
    let coorXPos = id[0]+ String.fromCharCode(id[1].charCodeAt(0)+(shipSize-1))
    let coorXNeg = id[0]+ String.fromCharCode(id[1].charCodeAt(0)- (shipSize-1))

    if (coorXNeg.charCodeAt(1) >= 65) result.push(coorXNeg)
    if(coorXPos.charCodeAt(1) <= 74) result.push(coorXPos)
    if( coorYPos != null){
        if(Number(coorYPos[0]) <= 9) result.push(coorYPos)
    }
    if( coorYNeg != null){
        if(Number(coorYNeg[0]) >= 0 ) result.push(coorYNeg)
    }
    return result

}
function placePosiblePosition(e){
    if(e.target.classList.contains('ship') == false){
        playerGrid.removeEventListener('click', placePosiblePosition)

        currShipInfo= shipsInfo.shift()
        currShip= generateShips(currShipInfo)
        currShip.addCoor(e.target.id)

        let posPositions= getPosiblePositions(e, currShip.size)
        currPosiblePositions= Dom.displayPosiblePositions(posPositions)
        currPosiblePositions.forEach(val=> val.addEventListener('click', placePlayerShips))
    }
}

function placePlayerShips(e){
    if(e.target.classList.contains('ship') == false){
        currPosiblePositions.forEach(val=> val.removeEventListener('click', placePlayerShips))
        let shipCoor = playerGameboard.placeShip(e.target.id, currShip, 'player')
        Dom.displayShip(shipCoor)

        computerInstance.placeComputerShip(generateShips(currShipInfo), Dom.displayShip, getPosiblePositions)
        
        if(playerGameboard.allShipsPlaced()== true){ 
            playerGrid.removeEventListener('click', placePosiblePosition)
            return enemyGrid.addEventListener('click', attack)
        }
        playerGrid.addEventListener('click', placePosiblePosition)
    }
}
function attack(e){
    if(!e.target.classList.contains('hit') && !e.target.classList.contains('miss') ){
        enemyGrid.removeEventListener('click', attack)
        let move=  computerGameboard.receiveAttack(e.target.id)
    // if(move.isHit== true){
        //     currPlayer=  changeTurn()
        // }
        Dom.displayAttack(e.target, move)
        if(computerGameboard.allShipsSunk()){
            enemyGrid.removeEventListener('click', attack)
        }
        console.log(move.isHit)
        if(move.isHit){
            enemyGrid.addEventListener('click', attack)
        }else{

            changeTurn()
        }
    }
    
}

function eventListeners(){
    playerGrid.addEventListener('click', placePosiblePosition)
    
}


eventListeners()
