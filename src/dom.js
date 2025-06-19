import "./style.css"
const Dom= {
    grids: document.querySelectorAll('.grids'),
    generateGrid: function(parents= this.grids, name= 'row'){
        parents.forEach(elem => {
            for(let i=0; i< 11; i++){
                let square = document.createElement('div')
                square.className= name
                elem.appendChild(square)
            }
        });
    },
    genColumn:function(){
        let rows= document.querySelectorAll('.row')
        this.generateGrid(rows, 'column')
    },
    nameRows: function(){
        let rows= document.querySelectorAll('.row')
        rows.forEach((row, i)=>{
            if(i==0||i==11){
                row.classList.add('firstColumn')
            }else{

                row.children[0].classList.add('firstSquare')
                if(i>10){
                    row.children[0].textContent= i-11
                }else{
                    row.children[0].textContent= i
                }
            }
        })
    },
    nameColums: function(){
        let columns= document.querySelectorAll('.firstColumn')
        columns.forEach(row=>{
            for (let i = 0; i <row.children.length-1; i++) {
                row.children[i+1].textContent= String.fromCharCode(65+i)
                
            }
        })
    },
}
export default function init(){
    Dom.generateGrid()
    Dom.genColumn()
    Dom.nameRows()
    Dom.nameColums() 
}