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
    // 복잡한 함수의 경우 임의의 값으로도 정상적으로 동작하는지 확인할 필요가 있다.
    asia.producers[0].production = 20   // 특정 조건을 setup, given, arrange

    expect(asia.shortfall)    // exercise, when, act
      .equal(-6)    // verify, then, assert
    expect(asia.profit).equal(292)
  })
})