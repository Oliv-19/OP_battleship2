const index = require('/src/index')


test('get ship ', ()=>{
    expect(index.getShip('carrier')).toEqual(['carrier',{size:5, start:[NaN, 0], end:[NaN, 0]}])
})
test('place ship ', ()=>{
    expect(index.placeShip('carrier', ['A', 1])).toEqual(['carrier',{size:5, start:['A', 1], end:['A', 5]}])
})