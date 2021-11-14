const chai = require('chai')
const assert = chai.assert
const expect = chai.expect

// classes
const Province = require('./province')

// data
const sampleProvinceData = require('./main')

describe('Province', function() {
  it('shortfall', function() {
    const asia = new Province(sampleProvinceData())

    expect(asia.shortfall).equal(5)
  })

  it('profit', function() {
    const asia = new Province(sampleProvinceData())

    expect(asia.profit).equal(230)
    /*
      1. 임의의 기대값 설정 후 테스트
      2. 검증단계를 거친 실제값을 넣고 다시 테스트
      3. 대상(함수)에 일부러 오류를 집어넣고 테스트
      4. 잘 걸러지면 검증단계를 거친 실제값을 사용
    */
  })
})