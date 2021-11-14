const chai = require('chai')
const assert = chai.assert
const expect = chai.expect

// classes
const Province = require('./province')

// data
const sampleProvinceData = require('./main')

describe('Province', function() {
  /*
    const asia = new Province(sampleProvinceData())
    - 중복코드를 제거할 때 절대 이렇게 하면 안된다.
    - 왜냐하면 공유된 픽스처로 실행하는 테스트는 순서에 따라 결과가 달라질 수 있다.
  */

  let asia
  beforeEach(function() {
    /*
      각각의 테스트 바로 전에 실행되어 asia를 초기화
      모든 테스트들이 동일한 픽스처에 기반하여 검증을 수행하는 것을 명시
      하지만 테스트가 픽스처 값을 변경하지 않거나 불변임이 확실한 픽스처는 공유하기도 함
    */
    asia = new Province(sampleProvinceData())
  })


  it('shortfall', function() {
    expect(asia.shortfall).equal(5)
  })

  it('profit', function() {
    expect(asia.profit).equal(230)
  })
})