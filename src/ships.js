export default class Ships{
    constructor(player){
        this.player= player,
        this.ships=[['carrier', 5,], [ 'battleship',4], 
        [ 'cruiser',3],[ 'submarine',3],[ 'destroyer',2]]
        this.allShips=[]
        this.generateShips()
    }
    generateShips(){
        this.ships.forEach(ship=>{
            let template= [ship[0],{size:ship[1], start:[NaN, 0], end:[NaN, 0]}]
            this.allShips.push(template)
        })
    }
    getShip(name){
        return this.allShips.find(ship=>ship[0]==name)
    }
    placeShip(name, start){
        let curr= this.getShip(name)
        curr[1].start= start
        curr[1].end= [start[0], (start[1]+curr[1].size-1)]
        return curr
    }
    makeMove(move){
        console.log(move)
    }
    
}