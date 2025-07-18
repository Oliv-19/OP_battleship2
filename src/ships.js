export default class Ships{
    constructor(player, size, shipName){
        this.player= player
        this.size= size
        this.shipName= shipName
        this.hits= 0
        this.sunk= false
        this.coor=[]
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
    addCoor(coordinate){
        this.coor.push(coordinate)
        return this.coor
    }
}