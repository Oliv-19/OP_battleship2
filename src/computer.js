export default class Computer{
    constructor(player,playerGb, computerGb, domAttack){
        this.player= player
        this.computerGb= computerGb
        this.playerGb= playerGb
        this.domAttack= domAttack
    }
    makePlay(type='attack'){
        let num= Math.floor(Math.random() * 10) 
        let letter=String.fromCharCode(65+Math.floor(Math.random() * 10) + 1-1)
        let square
        if(type== 'placeShip'){
            square= document.getElementById('E'+num+letter)
        }else{
            square= document.getElementById(num+letter)
        }
        if( square.classList.contains('miss')== true){
            return this.makePlay(type)
        }
        return  num+letter
    }
    attack(){
        let playInfo= this.makePlay('attack')
        let square= document.getElementById(playInfo)
        let move=  this.playerGb.receiveAttack(square.id) 
        console.log(playInfo)
        if(!square.classList.contains('hit') && !square.classList.contains('miss')){
            this.domAttack(square, move)
        }
        return move
    }
    placeComputerShip(ship, displayShip , getPosiblePositions){
        let playInfo= this.makePlay('placeShip')
        let square= document.getElementById(playInfo)
        
        if(square.classList.contains('ship') == false){
            ship.addCoor(playInfo)
            let pos= getPosiblePositions(square, ship.size)
            let endPos
            if(pos.length > 1){
                let num= Math.floor(Math.random() * pos.length) 
                endPos= pos[num]
            }else{
                endPos=pos[0]
            }
            let shipCoor= this.computerGb.placeShip(endPos, ship, 'computer')


            for (let i = 0; i < shipCoor.length; i++) {
                const element = shipCoor[i];
                shipCoor[i]= 'E'+element
                let square= document.getElementById(shipCoor[i])
                if(square.classList.contains('ship')){
                    ship.coor= []
                    this.placeComputerShip(ship, displayShip , getPosiblePositions)
                    return
                }
                
            }
            this.displayComputerShip(shipCoor)
        }else{
            this.placeComputerShip(ship, displayShip , getPosiblePositions)
        }
    }
    displayComputerShip(shipCoor){
        for (let i = 0; i < shipCoor.length; i++) {
            let square= document.getElementById(shipCoor[i])
            square.classList.add('ship')
        }
    }
}