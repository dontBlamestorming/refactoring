const chai = require('chai')
const assert = chai.assert
const expect = chai.expect

// classes
const Province = require('./province')

// data
const sampleProvinceData = require('./main')

describe('Province', function() {
  let asia
  beforeEach(function() {
    asia = new Province(sampleProvinceData())
  })


  it('shortfall', function() {
    expect(asia.shortfall).equal(5)
  })

  it('profit', function() {
    expect(asia.profit).equal(230)
  })

  it('change production', function() {
    asia.producers[0].production = 20

    expect(asia.shortfall).equal(-6)
    expect(asia.profit).equal(292)
  })

  it('zero demand', function() {
    asia.demand = 0

    expect(asia.shortfall).equal(-25)
    expect(asia.profit).equal(0)
  })

  it('negative demand', function() {
    asia.demand = -1

    expect(asia.shortfall).equal(-26)
    expect(asia.profit).equal(-10)
    /*
      수요가 음수일 때 수익이 음수가 나온다는 것이 프로그램을 사용하는 사용자 입장에서 어색하다.
      수요 setter에 전달된 인수가 음수라면 수익은 Error or 0으로 나오는 것이 어색하지 않다.
      이렇게 경계를 확인하는 Test code는 처리해야하는 특정 상황에 대한 통찰을 주기도 한다.
    */
  })
})

describe('no producers', function() {
  let noProducers;

  beforeEach(function() {
    const data = {
      name: "No producers",
      producers: [],
      demand: 30,
      price: 20
    }

    noProducers = new Province(data)
  })

  it('shortfall', function() {
    expect(noProducers.shortfall).equal(30)
  })

  it('profit', function() {
    expect(noProducers.profit).equal(0)
  })

})