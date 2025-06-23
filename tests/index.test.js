import Gameboard from "../src/gameboard"
import Ships from "../src/ships"

let gb= new Gameboard()

describe('gameboard tests', ()=>{
    test('gameboard is empty', ()=>{
        expect(gb.isEmpty()).toBe(true)
    })
    
    test('placeShip', ()=>{
        let ship= new Ships(1, 2, 'destroyer')
        expect(gb.placeShip('2B', ship.size)).toEqual(['2B','3B'])
    })
    
    test('placeShip 2', ()=>{
        let ship= new Ships(1, 4, 'battleship')
        expect(gb.placeShip('2B', ship.size)).toEqual( ['2B','3B', '4B', '5B'])
    })
    test('gameboard is empty 2', ()=>{
        expect(gb.isEmpty()).toBe(false)
    })
    test('attack coordinates', ()=>{
        expect(gb.receiveAttack('2B')).toBe(true)
    })

})
describe('ship tests', ()=>{

})