import "./style.css"
const Dom= {
    grids: document.querySelectorAll('.grids'),
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
    getClickedSquare(){
        let grid= document.querySelector('.playerGrid')
        grid.addEventListener('click', (e)=>{
            return e.target.id
        })
    }
}
function init(){
    Dom.generateGrid()
    Dom.genColumn()
}
export {init}