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
    placeShip(endCoor, ship, player){
        this.allShips.push(ship)
        let shipStart= ship.coor[0]
        
        if(shipStart[0] == endCoor[0]){
            if(endCoor.charCodeAt(1) <  shipStart.charCodeAt(1)){
                for (let i =shipStart.charCodeAt(1)-1; i > endCoor.charCodeAt(1); i--) {
                    if(player=='player'){
                        ship.addCoor(String(endCoor[0]+String.fromCharCode(i)))
                    }
                }

            }else{
                for (let i =shipStart.charCodeAt(1)+1; i < endCoor.charCodeAt(1); i++) {
                    if(player=='player'){
                        ship.addCoor(String(endCoor[0]+String.fromCharCode(i)))
                    }
                }
            }  
            
        }else {
            if(shipStart[0] < endCoor[0]){
                for (let i = Number(shipStart[0])+1; i < endCoor[0]; i++) {
                    if(player=='player'){
                        ship.addCoor(String(i+shipStart[1]))
                    }
                }
            }else{
                for (let i = Number(endCoor[0])+1; i < shipStart[0]; i++) {
                    if(player=='player'){
                        ship.addCoor(String(i+shipStart[1]))
                    }
                }
            }

        }
        ship.addCoor(endCoor)
        
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