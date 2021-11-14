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
})

describe('no producers', function() {
  //  이 프로그램의 핵심 data인 producers가 없는 경우라면?
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
    expect(noProducers.shortfall).equal(30)   // 생산자가 없으므로 생산부족분은 수요와 동일하다.
  })

  it('profit', function() {
    expect(noProducers.profit).equal(0)   // 생산량이 없으므로 이윤도 없다.
  })

})