const chai = require('chai')
const assert = chai.assert
const expect = chai.expect

// classes
const Province = require('./province')

// data
const sampleProvinceData = require('./main')

describe('Province', function() {
  it('shortfall', function() {
    const asia = new Province(sampleProvinceData()) // fixture

    expect(asia.shortfall).equal(5)
  })
})