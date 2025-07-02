export default class Gameboard{
    constructor(){
        this.allShips= []
        this.sunkShips= [false,false,false,false, false]
    }
    allShipsPlaced(){
        return this.allShips.length == 5
    }
    allShipsSunk(){
        return this.sunkShips.every(ship=>ship==true)
    }
    placeShip(coor, ship){
        this.allShips.push(ship)
        let coorStart= Number(coor[0])+ship.size
        
        for (let i = Number(coor[0]); i < coorStart; i++) {
            ship.addCoor(String(i+coor[1]))
        }
        
        return ship.coor
    }
    receiveAttack(coor){
        let result= {
            isHit:false, 
            isSunk:false,
            shipName:null
        }
        for (let i = 0; i < this.allShips.length; i++) {
           let ship = this.allShips[i].coor.find((val)=>val== coor) == undefined? result: this.allShips[i]
           if(ship == this.allShips[i]){
               ship.hit()
               result.isHit= true
               result.isSunk=ship.isSunk()
               if(ship.isSunk()){
                    this.sunkShips[i]= true
               }
               result.shipName=ship.shipName
            }
            
        }
       return result
    }
}