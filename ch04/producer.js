class Producer {
  constructor(aProvince, data) {
    this._province = aProvince
    this._cost = data.cost
    this._name = data.name
    this._production = data.production || 0
  }

  get name() {
    return this._name
  }

  get cost() {
    return this._cost
  }

  set cost(arg) {
    this._cost = parseInt(arg)
  }

  get production() {
    return this._production
  }

  set production(amountStr) {
    // 계산 결과를 지역데이터(_province)에 갱신하는 코드를 바꾸고싶다. 일단 테스트코드 작성
    const amount = parseInt(amountStr)
    const newProduction = Number.isNaN(amount) ? 0 : amount

    this._province.totalProduction += newProduction - this._production
    this._production = newProduction
  }
}

module.exports = Producer