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
    Dom.displayPlayerTurn(isPlayerTurn)
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
    console.log(playerGrid)
    let header= document.querySelector('.header')
    header.textContent= 'Place your '+ shipsInfo[0][0].toUpperCase() + ' ship'
    if(!e.target.classList.contains('ship') && !e.target.classList.contains('firstRow') && 
        !e.target.classList.contains('firstColumn')){
        playerGrid.removeEventListener('click', placePosiblePosition)

        currShipInfo= shipsInfo.shift()
        currShip= generateShips(currShipInfo)
        currShip.addCoor(e.target.id)

        let posPositions= getPosiblePositions(e, currShip.size)
        currPosiblePositions= Dom.displayPosiblePositions(posPositions, e.target)
        currPosiblePositions.forEach(val=> val.addEventListener('click', placePlayerShips))
    }
}

function placePlayerShips(e){
    if(!e.target.classList.contains('ship') && !e.target.classList.contains('firstRow') && 
        !e.target.classList.contains('firstColumn')){
        currPosiblePositions.forEach(val=> val.removeEventListener('click', placePlayerShips))
        let shipCoor = playerGameboard.placeShip(e.target.id, currShip, 'player')
        Dom.displayShip(shipCoor)

        computerInstance.placeComputerShip(generateShips(currShipInfo), Dom.displayShip, getPosiblePositions)
        
        if(playerGameboard.allShipsPlaced()== true){ 
            playerGrid.removeEventListener('click', placePosiblePosition)
            let header= document.querySelector('.header')
            header.textContent= 'Player turn'
            return enemyGrid.addEventListener('click', attack)
        }
        playerGrid.addEventListener('click', placePosiblePosition)
    }
}
function attack(e){
    console.log(e.target)
    let id= e.target.id
    if(id.includes('E')){

        if(!e.target.classList.contains('hit') && !e.target.classList.contains('miss') && 
            !e.target.classList.contains('firstRow') && !e.target.classList.contains('firstColumn') 
            && !e.target.classList.contains('enemyGrid')){
    
            enemyGrid.removeEventListener('click', attack)
            let move=  computerGameboard.receiveAttack(e.target.id)
            Dom.displayAttack(e.target, move)
            
            if(move.isHit){
                enemyGrid.addEventListener('click', attack)
                if(computerGameboard.allShipsSunk()){
                    return enemyGrid.removeEventListener('click', attack)
                }
            }else{
                changeTurn()
            }
            console.log(computerGameboard.allShipsSunk())
        }

    }else{

    }
    
}

function eventListeners(){
    playerGrid.addEventListener('click', placePosiblePosition)
    
}
eventListeners()
