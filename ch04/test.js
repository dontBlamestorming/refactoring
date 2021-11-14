const assert = require('assert');

// classes
const Province = require('./province')

// data
const sampleProvinceData = require('./main')

describe('Province', function() {
  it('shortfall', function() {
    const asia = new Province(sampleProvinceData()) // fixture

    assert.equal(asia.shortfall, 5) // 검증
  })
})