/*
  목표 - 연극의 장르를 추가하고 각 장르마다 공연료와 적립포인트 계산법을 다르게 적용하자.
        이를 위해서는 조건부 로직을 다형성을 통해 변환시키는 것이 좋다.
        상속계층을 구성하여 희극 서브클래스와 비극 서브클래스가 각자의 구체적인 계산로직을 정의하는 것이다.
*/

function createPerformanceCalculator(aPerformance, aPlay) {
  switch (aPlay.type) {
    case "tragedy": return new TragedyCalculator(aPerformance, aPlay)
    case "comedy": return new ComedyCalculator(aPerformance, aPlay)
    default:
      throw new Error(`알 수 없는 장르: ${aPlay.type}`)
  }
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

  get amount() {
    throw new Error('서브클래스에서 처리하도록 설계되었습니다.')
  }

  get volumeCredits() {
    let result = 0;
    result += Math.max(this.performance.audience - 30, 0);

    if ("comedy" === this.play.type) result += Math.floor(this.performance.audience / 5)

    return result
  }
}

class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 40000;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30)
    }

    return result
  }
}

class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 30000;
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20)
    }
    result += 300 * this.performance.audience

    return result
  }
}