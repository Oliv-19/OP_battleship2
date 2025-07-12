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
                    if(elem.parentElement.classList.contains('enemyGrid')== true){
                        square.id =  'E'+(elem.id-1) + String.fromCharCode(65+i-1)
                        
                    }else{
                        square.id =  elem.id-1 + String.fromCharCode(65+i-1)
                    }
                    if(square.id == -1 + String.fromCharCode(65+i-1) ||square.id ==  'E'+ -1 + String.fromCharCode(65+i-1)){
                        
                        square.textContent = String.fromCharCode(65+i-1)
                    }
                }
                elem.appendChild(square)
                elem.children[0].textContent = elem.id == 0? ' ' : Number(elem.id)
            }
        });
    },
    genColumn:function(){
        let rows= document.querySelectorAll('.row')
        this.generateGrid(rows, 'column')
    },
    displayPosiblePositions:function(posPositions){
        let squares=[]
        posPositions.forEach(val=>{
            let square= document.getElementById(val)
            if(square.classList.contains('ship')){
                return
            }
            square.classList.add('posShip')
            squares.push(square)
        })
        console.log(squares)
        return squares
    },
    displayShip: function(shipCoor){
        let posPosition= document.querySelectorAll('.posShip')
        //console.log(posPosition)
        posPosition.forEach(val=>{
            val.classList.remove('posShip')

        })
        for (let i = 0; i < shipCoor.length; i++) {
            
            let square= document.getElementById(shipCoor[i])
            //console.log(shipCoor)
            square.classList.add('ship')
            //console.log(square)
        }
    },
    displayAttack: function(coor, attack){
            if(attack.isHit){
                coor.classList.add('hit')
            }else{
                coor.classList.add('miss')
            }

            if(attack.isSunk== true){
                console.log(attack.shipName+ ' has been sunk!')
            }
        
    }
    
}

export default Dom