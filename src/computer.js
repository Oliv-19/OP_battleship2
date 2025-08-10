export default class Computer{
    constructor(playerGb, computerGb, domAttack, getRandomCoor,generateRandomBoard, getPosiblePositions){
        this.computerGb= computerGb
        this.playerGb= playerGb
        this.domAttack= domAttack
        this.getRandomCoor= getRandomCoor
        this.generateRandomBoard= generateRandomBoard
        this.getPosiblePositions= getPosiblePositions
    }
    attack(){
        let playInfo= this.getRandomCoor('attack')
        let square= document.getElementById(playInfo)
        let move
        if(!square.classList.contains('hit') && !square.classList.contains('miss')){
            move =  this.playerGb.receiveAttack(square.id) 
            //console.log(playInfo)
            this.domAttack(square, move, 'Computer')
        }else{
            return this.attack()
        }
        return move
    }
    placeComputerShip(ship){
        let currShip= this.generateRandomBoard(this.computerGb, ship)
        let shipCoor= ship.coor
            for (let i = 0; i < shipCoor.length; i++) {
                const element = shipCoor[i];
                shipCoor[i]= 'E'+element
                let square= document.getElementById(shipCoor[i])
                if(square.classList.contains('ship')){
                    ship.coor= []
                    this.placeComputerShip(ship)
                    return
                }
                
            }
            this.displayComputerShip(shipCoor)
        
    }
    displayComputerShip(shipCoor){
        for (let i = 0; i < shipCoor.length; i++) {
            let square= document.getElementById(shipCoor[i])
            square.classList.add('ship')
            //console.log(square)
        }
    }
    makeComputerMove(changeTurn){
        setTimeout(()=>{
            let move= this.attack()
                if(move.isHit){
                    this.makeComputerMove(changeTurn)
                }else{
                    changeTurn()
                }
        }, 1000)
}
}