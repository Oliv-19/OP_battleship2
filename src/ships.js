export default class Ships{
    constructor(player, size, shipName){
        this.player= player
        this.size= size
        this.shipName= shipName
        this.hits= 0
        this.sunk= false
        this.posStart=[NaN, 0]
        this.posEnd=[NaN, 0]
    }
    hit(){
        this.hits+=1
        return this.hits
    }
    isSunk(){
        if(this.hits== this.size){
            this.sunk= true
        }
        return this.sunk
    }
}