export default class Computer{
    constructor(playerGb, computerGb, domAttack, getRandomCoor,generateRandomBoard, getPosiblePositions, gameOver){
        this.computerGb= computerGb
        this.playerGb= playerGb
        this.domAttack= domAttack
        this.getRandomCoor= getRandomCoor
        this.generateRandomBoard= generateRandomBoard
        this.getPosiblePositions= getPosiblePositions
        this.gameOver= gameOver
    }
    attack(){
        let playInfo= this.getRandomCoor('attack')
        let square= document.getElementById(playInfo)
        let move
        if(!square.classList.contains('hit') && !square.classList.contains('miss')){
            move =  this.playerGb.receiveAttack(square.id) 
            this.domAttack(square, move, 'Computer')
        }else{
            return this.attack()
        }
        return move
    }
    placeComputerShip(ship){
        let currShip= this.generateRandomBoard(this.computerGb, ship, 'computer')
        let shipCoor= ship.coor
        for (let i = 0; i < shipCoor.length; i++) {
            let square= document.getElementById(shipCoor[i])
            square.classList.add('ship')
        }
    }
    makeComputerMove(changeTurn){
        setTimeout(()=>{
            let move= this.attack()
                if(move.isHit){
                    this.gameOver()
                    this.makeComputerMove(changeTurn)
                }else{
                    changeTurn()
                }
        }, 1000)
}
}