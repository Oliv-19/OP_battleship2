export default class Gameboard{
    constructor(){
        this.empty=true
        this.num=-1
        this.shipsCoordinates= []
    }
    isEmpty(){
        if(Object.keys(this.shipsCoordinates).length == 0){
            this.empty= true
        }else{
            this.empty= false
        }
        return this.empty
    }
    placeShip(coor, shipSize){
        let coorStart= Number(coor[0])+shipSize
        this.num+=1
        
        for (let i = Number(coor[0]); i < coorStart; i++) {
            if(typeof this.shipsCoordinates[this.num] == 'object'){
                this.shipsCoordinates[this.num].push(String(i+coor[1]))
                
            }else{
                this.shipsCoordinates[this.num]= [String(i+coor[1])]
                
            }
        }
        return this.shipsCoordinates[this.num]
    }
    receiveAttack(coor){
        let result
        this.shipsCoordinates.forEach(arr=>{
            for (let i = 0; i < arr.length; i++) {
                
                if(arr[i]== coor)result= true
                else result= false
                return result
            }
       })
       return result
    }
}