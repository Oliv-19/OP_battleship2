import Gameboard from "../src/gameboard"
import Ships from "../src/ships"

let gb= new Gameboard()


describe('gameboard tests', ()=>{
    test('gameboard is empty', ()=>{
        expect(gb.allShipsPlaced()).toBe(false)
    })
    test('placeShip carrier ship', ()=>{
        let ship= new Ships(1, 5, 'carrier')
        expect(gb.placeShip('1F', ship) ).toEqual(['1F','2F', '3F', '4F', '5F'])
    })
    test('placeShip battleship ship', ()=>{
        let ship= new Ships(1, 4, 'battleship')
        expect(gb.placeShip( '2B', ship)).toEqual( ['2B','3B', '4B', '5B'])
    })
    test('attack ship coordinates', ()=>{
        expect(gb.receiveAttack('2F')).toEqual({isHit: true, isSunk:false, shipName: 'carrier'})
        expect(gb.receiveAttack('3F')).toEqual({isHit: true, isSunk:false, shipName: 'carrier'})
        expect(gb.receiveAttack('4F')).toEqual({isHit: true, isSunk:false, shipName: 'carrier'})
        expect(gb.receiveAttack('5F')).toEqual({isHit: true, isSunk:false, shipName: 'carrier'})
        expect(gb.receiveAttack('1F')).toEqual({isHit: true, isSunk:true, shipName: 'carrier'})
    })
    test('save sunk ships', ()=>{
        expect(gb.sunkShips).toEqual([true,false,false,false,false])
    })
    test('miss attack coordinates', ()=>{
        expect(gb.receiveAttack('8F')).toEqual({isHit:false, isSunk:false, shipName: null})
    })
    
})
describe('ship tests', ()=>{
    test('sunk ship ', ()=>{
        let ship= new Ships(1, 2, 'destroyer')
        ship.hit()
        ship.hit()
        expect(ship.isSunk()).toBe(true)
    })
})
