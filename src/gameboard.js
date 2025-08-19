export default class Gameboard{
    constructor(coors){
        this.coors=coors
        this.allShips=[]
        this.sunkShips= [false,false,false,false, false]
    }
    allShipsPlaced(){
        return this.allShips.length == 5
    }
    allShipsSunk(){
        return this.sunkShips.every(ship=>ship==true)
    }
    calculateShipPath(startCoor, endCoor){
        let path = [];
        const startRow = startCoor[0];
        const startCol = startCoor.charCodeAt(1);
        const endRow = endCoor[0];
        const endCol = endCoor.charCodeAt(1);

        if (startRow === endRow) {
            const minCol = Math.min(startCol, endCol);
            const maxCol = Math.max(startCol, endCol);
            for (let i = minCol; i <= maxCol; i++) {
                path.push(startRow + String.fromCharCode(i));
            }
        }else if (startCol === endCol) {
            const minRow = Math.min(startRow, endRow);
            const maxRow = Math.max(startRow, endRow);
            for (let j = minRow; j <= maxRow; j++) {
                path.push(j + String.fromCharCode(startCol));
            }
        }
        return path;
    }
    placeShip(endCoor,startCoord,  ship, player){
        let shipPath= this.calculateShipPath(startCoord, endCoor)
        for (let i = 0; i < shipPath.length; i++) {
            const element = player=='player'? shipPath[i]: 'E'+shipPath[i]
            let square= document.getElementById(element)
            if( square.classList.contains('ship')){
                ship.coor= []
                return null
            }else{
                ship.addCoor(element)
            }
            
        }
        if(ship.coor.length !=0){
            this.allShips.push(ship)
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