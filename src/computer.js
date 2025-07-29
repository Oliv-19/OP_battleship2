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
        let move=  this.playerGb.receiveAttack(square.id) 
        console.log(playInfo)
        if(!square.classList.contains('hit') && !square.classList.contains('miss')){
            this.domAttack(square, move, 'Computer')
        }
        return move
    }
    placeComputerShip(){
        let ship= this.generateRandomBoard(this.computerGb)
        //there is a problem with this
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
        
        // let playInfo= this.getRandomCoor('placeComputerShip')
        // let square= document.getElementById(playInfo)
        
        // if(!square.classList.contains('ship')){
        //     ship.addCoor(playInfo)
        //     let pos= this.getPosiblePositions(square, ship.size)
        //     let endPos
        //     if(pos.length > 1){
        //         let num= Math.floor(Math.random() * pos.length) 
        //         endPos= pos[num]
        //     }else{
        //         endPos=pos[0]
        //     }
        //     let shipCoor= this.computerGb.placeShip(endPos, ship)


        //     for (let i = 0; i < shipCoor.length; i++) {
        //         const element = shipCoor[i];
        //         shipCoor[i]= 'E'+element
        //         let square= document.getElementById(shipCoor[i])
        //         if(square.classList.contains('ship')){
        //             ship.coor= []
        //             this.placeComputerShip(ship)
        //             return
        //         }
                
        //     }
        //     this.displayComputerShip(shipCoor)
        // }else{
        //     this.placeComputerShip(ship)
        // }
    }
    displayComputerShip(shipCoor){
        for (let i = 0; i < shipCoor.length; i++) {
            let square= document.getElementById(shipCoor[i])
            square.classList.add('ship')
            console.log(square)
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