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
                        square.classList.add('square')
                        square.id =  'E'+(elem.id-1) + String.fromCharCode(65+i-1)
                        
                    }else{
                        square.classList.add('square')
                        square.id =  elem.id-1 + String.fromCharCode(65+i-1)
                    }
                    if(square.id == -1 + String.fromCharCode(65+i-1) ||square.id ==  'E'+ -1 + String.fromCharCode(65+i-1)){
                        square.classList.add('firstRow')
                        square.textContent = String.fromCharCode(65+i-1)
                    }
                }
                elem.appendChild(square)
                if(elem.id == 0){
                    elem.children[0].textContent= ' '
                }else{
                    elem.children[0].textContent= Number(elem.id)
                    elem.children[0].classList.add('firstColumn')
                }
            }
        });
    },
    genColumn:function(){
        let rows= document.querySelectorAll('.row')
        this.generateGrid(rows, 'column')
    },
    displayPosiblePositions:function(posPositions, currPos){
        let squares=[]
        currPos.classList.add('posShip')
        posPositions.forEach(val=>{
            let square= document.getElementById(val)
            if(square.classList.contains('ship')){
                return
            }
            square.classList.add('posShip')
            squares.push(square)
        })
        return squares
    },
    displayShip: function(shipCoor){
        let posPosition= document.querySelectorAll('.posShip')
        posPosition.forEach(val=>{
            val.classList.remove('posShip')

        })
        for (let i = 0; i < shipCoor.length; i++) {
            
            let square= document.getElementById(shipCoor[i])
            square.classList.add('ship')
            square.classList.add('playerShip')
        }
    },
    displayAttack: function(coor, attack){
        let result= document.querySelector('.result')
        if(attack.isHit){
            coor.classList.add('hit')
            result.textContent= 'Hit! '
        }else{
            coor.classList.add('miss')
            result.textContent= 'Miss '
        }

        if(attack.isSunk== true){
            result.textContent+= attack.shipName+ ' has been sunk!'
        }
        
    },
    displayPlayerTurn:function(turn){
        let header= document.querySelector('.header')
        if(turn){
            header.textContent= 'Player turn'
            
        }else header.textContent= 'Computer turn'
    }
    
    
}

export default Dom