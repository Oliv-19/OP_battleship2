import domInit from "./dom"
import Ships from './ships'
import Gameboard from './gameboard'

let gameboard= new Gameboard()
let shipsInfo=[['carrier', 5,], [ 'battleship',4], 
    [ 'cruiser',3],[ 'submarine',3],[ 'destroyer',2]]

let allShips=[]

domInit()

function generateShips(){
    shipsInfo.forEach(ship=>{
        let newShip= new Ships(1, ship[1], ship[0])
        allShips.push(newShip)
    })
}
function getClickedSquare(){
    let grid= document.querySelector('.playerGrid')
    grid.addEventListener('click', (e)=>{
        if(gameboard.isEmpty()== true ){
            allShips.forEach(ship=>{
                gameboard.placeShip(ship.shipName, e.target.id, ship.size)
            })
        }else{
            gameboard.receiveAttack(e.target.id)
        }
    })
}
generateShips()
getClickedSquare()


