import "./style.css"
const Dom= {
    grids: document.querySelectorAll('.grids'),
    init:function(){
        Dom.generateGrid()
        Dom.genColumn()
    },
    generateGrid: function(parents= this.grids, name= 'row'){
        parents.forEach(elem => {
            for(let i=0; i< 11; i++){
                let square = document.createElement('div')
                square.className= name
                square.id=i
                
                if(name== 'column'){
                    square.id = elem.id + String.fromCharCode(65+i-1)
                    if(square.id == 0 + String.fromCharCode(65+i-1)){
                        console.log(name)
                        square.textContent = String.fromCharCode(65+i-1)
                    }
                }
                elem.appendChild(square)
                elem.children[0].textContent = elem.id == 0 ? ' ' : elem.id
            }
            
        });
    },
    genColumn:function(){
        let rows= document.querySelectorAll('.row')
        this.generateGrid(rows, 'column')
    },
    displayShip: function(shipCoor){
        for (let i = 0; i < shipCoor.length; i++) {
        
            let square= document.getElementById(shipCoor[i])
            square.classList.add('ship')
            //console.log(square)
        }
    },
    displayAttack: function(coor, attack){
            let square= document.getElementById(coor)
            if(attack.isHit){
                square.classList.add('hit')
            }else{
                square.classList.add('miss')
            }

            if(attack.isSunk== true){
                console.log(attack.shipName+ ' has been sunk!')
            }
        
    }
    
}

export default Dom