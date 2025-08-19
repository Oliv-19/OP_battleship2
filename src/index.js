import Dom from "./dom"
import Ships from './ships'
import Gameboard from './gameboard'
import Computer from "./computer"


class Manager{
    constructor(){
        this.playerGrid= document.querySelector('.playerGrid')
        this.enemyGrid= document.querySelector('.enemyGrid')
        this.rdmBoardBtn= document.querySelector('.rdmBoard')
        this.playAgainBtn= document.querySelector('.playAgain')
        this.header= document.querySelector('.header')
        this.shipsInfo=[['carrier', 5,], [ 'battleship',4], 
        [ 'cruiser',3],[ 'submarine',3],[ 'destroyer',2]]
        this.currShip
        this.currShipInfo
        this.currPosiblePositions
        this.isPlayerTurn = true
        this.startCoord 
        this.makeAttack= (e)=> this.attack(e)
        this.placeShip= (e)=> this.placePlayerShips(e)
        this.positionShip= (e)=> this.placePosiblePosition(e)
    }
    init(){
        this.coor= Dom.genColumn()
        this.playerGameboard= new Gameboard(this.coor.slice(0, 100))
        this.computerGameboard= new Gameboard(this.coor.slice(100))
        this.computerInstance= new Computer(this.playerGameboard, this.computerGameboard, Dom.displayAttack, getRandomCoor,generateRandomBoard, getPosiblePositions, this.gameOver.bind(this))
        this.playerGrid.addEventListener('click', this.positionShip)
        this.rdmBoardBtn.addEventListener('click', this.genRandom.bind(this))
    }
    startGame(){
        this.playerGrid.removeEventListener('click', this.positionShip)
        this.rdmBoardBtn.removeEventListener('click', this.genRandom)
        this.header.textContent= 'Player turn'
        this.rdmBoardBtn.style.display='none'
        return this.enemyGrid.addEventListener('click',this.makeAttack)
    }
    gameOver(){
        if(this.computerGameboard.allShipsSunk()){
            this.header.textContent= 'Player Wins!'
            this.playAgainBtn.style.display='block'
            this.playAgainBtn.addEventListener('click', this.playAgain)

            return this.enemyGrid.removeEventListener('click',this.makeAttack)
        }else if(this.playerGameboard.allShipsSunk()){
            this.header.textContent= 'Computer Wins!'
            this.playAgainBtn.style.display='block'
            this.playAgainBtn.addEventListener('click', this.playAgain)

            return this.enemyGrid.removeEventListener('click',this.makeAttack)
        }
    }
    playAgain(){
        this.playerGrid.textContent=''
        this.enemyGrid.textContent=''
        this.init()
    }
    changeTurn(){
        this.isPlayerTurn = !this.isPlayerTurn

        if(!this.isPlayerTurn){
            this.computerInstance.makeComputerMove(this.changeTurn.bind(this))
        }else{
            this.enemyGrid.addEventListener('click',this.makeAttack)
        }
        Dom.displayPlayerTurn(this.isPlayerTurn)
        this.gameOver()
    }
    placePosiblePosition(e){
        console.log(this)
        this.header.textContent= 'Place your '+ this.shipsInfo[0][0].toUpperCase() + ' ship'

        if(!e.target.classList.contains('ship') && !e.target.classList.contains('firstRow') && 
            !e.target.classList.contains('firstColumn')){

            this.playerGrid.removeEventListener('click', this.positionShip)
            this.rdmBoardBtn.style.display='none'
            this.currShipInfo= this.shipsInfo.shift()
            this.currShip= generateShips(this.currShipInfo)
            this.startCoord= e.target.id

            let posPositions= getPosiblePositions(e, this.currShip.size)
            
            this.currPosiblePositions= Dom.displayPosiblePositions(posPositions, e.target)
            this.currPosiblePositions.forEach(val=> val.addEventListener('click', this.placeShip))
        }
    } 
    placePlayerShips(e){
        if(!e.target.classList.contains('ship') && !e.target.classList.contains('firstRow') && 
            !e.target.classList.contains('firstColumn')){
            let shipCoor = this.playerGameboard.placeShip(e.target.id,this.startCoord, this.currShip, 'player')
                
            if(shipCoor){
                this.currPosiblePositions.forEach(val=> val.removeEventListener('click', this.placeShip))
                Dom.displayShip(shipCoor)

                this.computerInstance.placeComputerShip(generateShips(this.currShipInfo))
            
                if(this.playerGameboard.allShipsPlaced()){ 
                    this.startGame()
                }else{
                    this.playerGrid.addEventListener('click', this.positionShip)
                }
            }else{
                alert("No puedes colocar un barco sobre otro. Elige otro cuadro.");
                e.target.removeEventListener('click', this.placeShip)
                e.target.classList.remove('posShip')
            }
        
        }
    }  
    attack(e){
        let id= e.target.id
        if(id.includes('E')){

            if(!e.target.classList.contains('hit') && !e.target.classList.contains('miss') && 
                !e.target.classList.contains('firstRow') && !e.target.classList.contains('firstColumn') 
                && !e.target.classList.contains('enemyGrid')){
        
                this.enemyGrid.removeEventListener('click',this.makeAttack.bind(this))
                let move=  this.computerGameboard.receiveAttack(e.target.id)
                Dom.displayAttack(e.target, move, 'Player')
                
                if(move.isHit){
                    console.log('is hit')
                    this.enemyGrid.addEventListener('click',this.makeAttack.bind(this))
                    this.gameOver()
                }else{
                    this.changeTurn()
                }
            }

        }else{

        }
        
    }
    genRandom(){
        console.log(this.shipsInfo)
        while(this.shipsInfo.length >0){
            this.currShipInfo= this.shipsInfo.shift()
            this.currShip= generateShips(this.currShipInfo)
            let ship= generateRandomBoard(this.playerGameboard, this.currShip, 'player')

            Dom.displayShip(ship.coor)
            this.computerInstance.placeComputerShip(generateShips(this.currShipInfo))
        }
        this.startGame()
    }
}

const manager= new Manager()
manager.init()

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
function  getRandomCoor(type){
    let coor
    if(type== 'placeShip'){
        coor= manager.playerGameboard.coors[Math.floor(Math.random() * manager.playerGameboard.coors.length)]
    }else if(type=='attack'){
        let index=Math.floor(Math.random() * manager.playerGameboard.coors.length)
        coor= manager.playerGameboard.coors.splice(index , 1)

    }else if(type== 'placeComputerShip'){
        coor= manager.computerGameboard.coors[Math.floor(Math.random() * manager.computerGameboard.coors.length)]
    }
    return  coor
}

function generateRandomBoard(gb, currShip, player){
    let coor= getRandomCoor('placeShip')
    let square= document.getElementById(coor)
    if(!square.classList.contains('ship')){
        let pos= getPosiblePositions(square, currShip.size)
        let endPos
        if(pos.length > 1){
            let num= Math.floor(Math.random() * pos.length) 
            endPos= pos[num]
        }else{
            endPos=pos[0]
        }
        let shipCoords= gb.placeShip(endPos,coor, currShip, player)
        if(shipCoords == null){
            return generateRandomBoard(gb, currShip, player)
        }
        return currShip
    }else{
        return generateRandomBoard(gb, currShip, player)
    }
}