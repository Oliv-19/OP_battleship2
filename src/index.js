import Dom from "./dom"
import Ships from './ships'
import Gameboard from './gameboard'
import Computer from "./computer"

let coor= Dom.genColumn()
let playerGrid= document.querySelector('.playerGrid')
let enemyGrid= document.querySelector('.enemyGrid')
let rdmBoardBtn= document.querySelector('.rdmBoard')

let playerGameboard= new Gameboard(coor.slice(0, 100))
let computerGameboard= new Gameboard(coor.slice(100))

let computerInstance= new Computer(playerGameboard, computerGameboard, Dom.displayAttack, getRandomCoor,generateRandomBoard, getPosiblePositions, Dom.displayShip)


let shipsInfo=[['carrier', 5,], [ 'battleship',4], 
[ 'cruiser',3],[ 'submarine',3],[ 'destroyer',2]]

let currShip
let currShipInfo
let currPosiblePositions
let isPlayerTurn = true
function changeTurn(){

    isPlayerTurn = !isPlayerTurn
    if(!isPlayerTurn){
        computerInstance.makeComputerMove(changeTurn)
    }else{
        enemyGrid.addEventListener('click', attack)
    }
    Dom.displayPlayerTurn(isPlayerTurn)
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
    let header= document.querySelector('.header')
    header.textContent= 'Place your '+ shipsInfo[0][0].toUpperCase() + ' ship'
    if(!e.target.classList.contains('ship') && !e.target.classList.contains('firstRow') && 
        !e.target.classList.contains('firstColumn')){
        playerGrid.removeEventListener('click', placePosiblePosition)
        rdmBoardBtn.style.display='none'
        currShipInfo= shipsInfo.length == 0 ? currShipInfo: shipsInfo.shift()
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

        computerInstance.placeComputerShip(generateShips(currShipInfo))
        
        if(playerGameboard.allShipsPlaced()){ 
            startGame()
        }else{
            playerGrid.addEventListener('click', placePosiblePosition)

        }
    }
}
function attack(e){
    //console.log(e.target)
    let id= e.target.id
    if(id.includes('E')){

        if(!e.target.classList.contains('hit') && !e.target.classList.contains('miss') && 
            !e.target.classList.contains('firstRow') && !e.target.classList.contains('firstColumn') 
            && !e.target.classList.contains('enemyGrid')){
    
            enemyGrid.removeEventListener('click', attack)
            let move=  computerGameboard.receiveAttack(e.target.id)
            Dom.displayAttack(e.target, move, 'Player')
            
            if(move.isHit){
                console.log('is hit')
                enemyGrid.addEventListener('click', attack)
                if(computerGameboard.allShipsSunk()){
                    console.log('shi')
                    //stoping the game before all ships are sunk
                    return enemyGrid.removeEventListener('click', attack)
                }
            }else{
                changeTurn()
            }
            //console.log(computerGameboard.allShipsSunk())
        }

    }else{

    }
    
}
function getRandomCoor(type){
    let coor
    if(type== 'placeShip'){
        coor= playerGameboard.coors[Math.floor(Math.random() * playerGameboard.coors.length)]
    }else if(type=='attack'){
        let index=Math.floor(Math.random() * playerGameboard.coors.length)
        coor= playerGameboard.coors.splice(index , 1)

    }else if(type== 'placeComputerShip'){
        coor= computerGameboard.coors[Math.floor(Math.random() * computerGameboard.coors.length)]
    }
    return  coor
}

function genRandom(){
    while(shipsInfo.length >0){
        currShipInfo= shipsInfo.shift()
        currShip= generateShips(currShipInfo)
        let ship= generateRandomBoard(playerGameboard, currShip)

        Dom.displayShip(ship.coor)
        computerInstance.placeComputerShip(generateShips(currShipInfo))
    }
    startGame()
}
function generateRandomBoard(gb, currShip){
   
    let coor= getRandomCoor('placeShip')
    let square= document.getElementById(coor)
    if(!square.classList.contains('ship')){
        currShip.addCoor(coor)
        let pos= getPosiblePositions(square, currShip.size)
        let endPos
        if(pos.length > 1){
            let num= Math.floor(Math.random() * pos.length) 
            endPos= pos[num]
        }else{
            endPos=pos[0]
        }
        gb.placeShip(endPos, currShip)
    }else{
        return generateRandomBoard(gb, currShip)
    }
    return currShip
}
function startGame(){
    playerGrid.removeEventListener('click', placePosiblePosition)
    rdmBoardBtn.removeEventListener('click', genRandom)
    let header= document.querySelector('.header')
    header.textContent= 'Player turn'
    rdmBoardBtn.style.display='none'
    return enemyGrid.addEventListener('click', attack)
}

function eventListeners(){
    playerGrid.addEventListener('click', placePosiblePosition)
    rdmBoardBtn.addEventListener('click', genRandom)
    
}
eventListeners()
