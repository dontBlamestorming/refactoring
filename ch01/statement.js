const invoices = require('./invoices.json')
const plays = require('./plays.json')

/*
  목표 - statement()의 HTML 버전을 만들자.
  문제 - 기존의 statement()에서 계산코드를 모두 분리해내었지만 중첩함수이다.
        이 함수들을 모두 그대로 복사하여 HTML버전을 만드는 데에 중복해서 넣고싶지 않다.
        일반 TEXT 버전과 HTML 모두 동일한 계산함수들을 사용하고 싶다.
  해결 - 단계를 쪼개자. statement()에서 필요한 데이터에 대한 계산을 하고 이 결과를 TEXT or HTML로 표현하면 될 것 같다.
*/

function statement(invoice, plays) {
  const statementData = {} // 중간 데이터
  statementData.customer = invoice.customer // 고객데이터를 중간데이터로
  statementData.performances = invoice.performances.map(enrichPerformance)
  statementData.totalAmount = totalAmount(statementData)
  statementData.totalVolumeCredits = totalVolumeCredits(statementData)


  function enrichPerformance(aPerformance) {
    const result = Object.assign({}, aPerformance)
    result.play = playFor(result) // 중간 데이터에 연극 정보 저장
    result.amount = amountFor(result)
    result.volumeCredits = volumeCreditsFor(result)

    return result
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function amountFor(aPerformance) { // 값이 바뀌지 않는 변수는 매개변수로 전달
    let result = 0; // 변수를 초기화 && 명확한 이름으로 변경

    switch (aPerformance.play.type) {
      case "tragedy":
        result = 40000;
        if (aPerformance.audience > 30) result += 1000 * (aPerformance.audience - 30)
        break;

      case "comedy":
        result = 30000;
        if (aPerformance.audience > 20) result += 1000 * (aPerformance.audience - 30)
        break;

      default:
        throw new Error(`알 수 없는 장르: ${aPerformance.play.type}`)
    }

    return result
  }

  function volumeCreditsFor(aPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);

    if ("comedy" === aPerformance.play.type) result += Math.floor(aPerformance.audience / 5)

    return result
  }

  function totalVolumeCredits(data) {
    let result = 0;

    for (let perf of data.performances) {
      result += perf.volumeCredits;
    }

    return result
  }

  function totalAmount(data) {
    let result = 0;

    for (let perf of data.performances) {
      result += perf.amount
    }

    return result
  }

  return renderPlainText(statementData, plays)
}

function renderPlainText(data, plays) { // 필요 없어진 invoice 삭제
  let result = `청구 내역 (고객명: ${data.customer})\n`; // 중간데이터로부터 고객데이터 확보

  for (let perf of data.performances) {
    result += `${perf.play.name}: ${perf.amount} (${perf.audience}석)\n`
  }

  result += `총액: ${usd(data.totalAmount)}\n`
  result += `적립 포인트: ${data.totalVolumeCredits}점\n`

  return result

  function usd(aNumber) {
    return new Intl.NumberFormat("es-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    }).format(aNumber / 100)
  }



}

const result = statement(invoices, plays)
console.log(result)
