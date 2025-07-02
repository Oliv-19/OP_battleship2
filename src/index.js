import Dom from "./dom"
import Ships from './ships'
import Gameboard from './gameboard'


Dom.init()

let gameboard= new Gameboard()
let shipsInfo=[['carrier', 5,], [ 'battleship',4], 
[ 'cruiser',3],[ 'submarine',3],[ 'destroyer',2]]

function generateShips(){
    
    let ship= shipsInfo.shift()
    let newShip= new Ships(1, ship[1], ship[0])
    return newShip
}


function placeShips(e){
    if(e.target.classList.contains('ship') == false){

        let ship= generateShips()
        let shipCoor = gameboard.placeShip(e.target.id, ship)
        Dom.displayShip(shipCoor)
    
        if(gameboard.allShipsPlaced()== true){
            let playerGrid= document.querySelector('.playerGrid')
        //     // let enemyGrid= document.querySelector('.enemyGrid')
            playerGrid.removeEventListener('click', placeShips)
            playerGrid.addEventListener('click', attack)
        }
    }
}
function attack(e){
    if(e.target.classList.contains('hit') == false || !e.target.classList.contains('miss') == false){
        let move=  gameboard.receiveAttack(e.target.id)
        Dom.displayAttack(e.target.id, move)
        if(gameboard.allShipsSunk()){
            let playerGrid= document.querySelector('.playerGrid')
            // let enemyGrid= document.querySelector('.enemyGrid')
            playerGrid.removeEventListener('click', attack)
        }

    }
    
}

function eventListeners(){
    let playerGrid= document.querySelector('.playerGrid')
    playerGrid.addEventListener('click', placeShips)
    
}


eventListeners()
