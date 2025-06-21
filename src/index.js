import { init} from "./dom"
import Ships from './ships'

let ship= new Ships(1)
init()
function getClickedSquare(){
    let grid= document.querySelector('.playerGrid')
    grid.addEventListener('click', (e)=>{
        ship.makeMove(e.target.id)
    })
}
console.log(getClickedSquare())
export {ship}

