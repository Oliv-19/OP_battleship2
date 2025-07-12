export default class Computer{
    constructor(player,playerGb, computerGb, domAttack){
        this.player= player
        this.computerGb= computerGb
        this.playerGb= playerGb
        this.domAttack= domAttack
    }
    makePlay(){
        let num= Math.floor(Math.random() * 10) + 1
        let letter=String.fromCharCode(65+Math.floor(Math.random() * 10) + 1-1)
        let square= document.getElementById(num+letter)
        if( square.classList.contains('miss')== true){
            return this.makePlay()
        }
        return [square, num+letter]
    }
    attack(){
        let playInfo= this.makePlay()
        
        let move=  this.playerGb.receiveAttack(playInfo[0].id)
        //console.log(move)
        // if(move.isHit== true){
            
        // }
        if(square.classList.contains('hit') == false || !square.classList.contains('miss') == false){
            this.domAttack(square, move)
        }
    }
    placeComputerShip(ship, displayShip){
        let playInfo= this.makePlay()
        let shipCoor= this.computerGb.placeShip(playInfo[1], ship, 'computer')
        console.log(shipCoor)
        displayShip(shipCoor)
    }
}