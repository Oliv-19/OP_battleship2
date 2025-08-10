import "./style.css"
const Dom= {
    grids: document.querySelectorAll('.grids'),
    generateGrid: function(parents= this.grids, name= 'row'){
        let coor=[]
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
                    }else{
                        if(!square.id.includes('@'))
                        coor.push(square.id)

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
        
        return coor
    },
    genColumn:function(){
        Dom.generateGrid()
        let rows= document.querySelectorAll('.row')
        let coor= this.generateGrid(rows, 'column')
        return coor
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
    displayAttack: function(coor, attack, player){
        let result= document.querySelector('.result')
        if(attack.isHit){
            coor.classList.add('hit')
            result.textContent= player +' Hit! '
        }else{
            coor.classList.add('miss')
            result.textContent= player +' Miss '
        }

        if(attack.isSunk== true){
            result.textContent+= attack.shipName+ ' has been sunk!'
        }
        
    },
    displayPlayerTurn:function(turn){
        let header= document.querySelector('.header')
        if(turn){
            header.textContent= 'Player turn'
            this.grids[1].style.outline= '#76e7e7 3px solid'
            this.grids[0].style.outline= 'none'
        }else{
            header.textContent= 'Computer turn'
            this.grids[0].style.outline= '#76e7e7 3px solid'
            this.grids[1].style.outline= 'none'
        }
    }
    
    
}

export default Dom