import Gameboard from "../src/gameboard"
import Ships from "../src/ships"

let gb= new Gameboard()


describe('gameboard tests', ()=>{
    test('gameboard is empty', ()=>{
        expect(gb.allShipsPlaced()).toBe(false)
    })
    test('placeShip carrier ship', ()=>{
        let ship= new Ships(1, 5, 'carrier')
        ship.addCoor('1F')
        expect(gb.placeShip('5F', ship) ).toEqual(['1F','2F', '3F', '4F', '5F'])
    })
    test('placeShip destroyer ship reversed', ()=>{
        let ship= new Ships(1, 2, 'destroyer')
        ship.addCoor('6C')
        expect(gb.placeShip( '5C', ship)).toEqual( ['6C','5C'])
    })
    test('placeShip battleship horizontally', ()=>{
        let ship= new Ships(1, 4, 'battleship')
        ship.addCoor('5B')
        expect(gb.placeShip( '5E', ship)).toEqual( ['5B','5C', '5D', '5E'])
    })
    test('placeShip submarine horizontally reversed', ()=>{
        let ship= new Ships(1, 4, 'battleship')
        ship.addCoor('1J')
        expect(gb.placeShip( '1H', ship)).toEqual( ['1J','1I', '1H'])
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
    test('Add coordinate ', ()=>{
        let ship= new Ships(1, 2, 'destroyer')
        expect( ship.addCoor('1F')).toEqual(['1F'])
    })
})