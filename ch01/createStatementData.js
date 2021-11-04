/*
  목표 - 연극의 장르를 추가하고 각 장르마다 공연료와 적립포인트 계산법을 다르게 적용하자.
        이를 위해서는 조건부 로직을 다형성을 통해 변환시키는 것이 좋다.
        상속계층을 구성하여 희극 서브클래스와 비극 서브클래스가 각자의 구체적인 계산로직을 정의하는 것이다.
*/

function createPerformanceCalculator(aPerformance, aPlay) {
  return new PerformanceCalculator(aPerformance, aPlay)
}

export default function createStatementData(invoice, plays) {
  const result = {}
  result.customer = invoice.customer
  result.performances = invoice.performances.map(enrichPerformance)
  result.totalAmount = totalAmount(result)
  result.totalVolumeCredits = totalVolumeCredits(result)

  return result

  function enrichPerformance(aPerformance) { // ***
    const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance)) // <-- 생성자 대신 팩터리 함수 사용
    const result = Object.assign({}, aPerformance)
    result.play = calculator.play
    result.amount = calculator.amount
    result.volumeCredits = calculator.volumeCredits

    return result
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function totalVolumeCredits(data) {
    return data.performances.reduce((total, p) => total + p.amount, 0)
  }

  function totalAmount(data) {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0)
  }
}

class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance
    this.play = aPlay
  }

  get amount() { // <-- amountFor() 함수의 코드를 계산기 클래스로 복사
    let result = 0;

    switch (this.play.type) {
      case "tragedy":
        result = 40000;
        if (this.performance.audience > 30) result += 1000 * (this.performance.audience - 30)
        break;

      case "comedy":
        result = 30000;
        if (this.performance.audience > 20) result += 1000 + 500 * (this.performance.audience - 30)
        result += 300 * this.performance.audience
        break;

      default:
        throw new Error(`알 수 없는 장르: ${this.play.type}`)
    }

    return result
  }

  get volumeCredits() {
    let result = 0;
    result += Math.max(this.performance.audience - 30, 0);

    if ("comedy" === this.play.type) result += Math.floor(this.performance.audience / 5)

    return result
  }
}